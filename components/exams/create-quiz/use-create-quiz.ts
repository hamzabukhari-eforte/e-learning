"use client";

import { useCallback, useEffect, useState } from "react";
import { usePagedList } from "@/components/system-setup/use-paged-list";
import { useConfirm } from "@/components/ui/use-confirm";
import { getSession } from "@/data/auth";
import {
  createExamQuiz,
  deleteExamQuiz,
  listExamQuizzes,
  updateExamQuiz,
} from "@/data/exams/quizzes";
import type { ExamQuiz, ExamQuizInput } from "@/data/exams/types";
import type { SelectOption } from "@/data/registration/types";
import { listSubTrainingOptions } from "@/data/system-setup/sub-trainings";
import { listTrainingOptions } from "@/data/system-setup/trainings";

const EMPTY: ExamQuizInput = {
  trainingId: "",
  subTrainingId: "",
  questionLimit: "",
  questionType: "",
};

export function useCreateQuiz() {
  const [values, setValues] = useState<ExamQuizInput>(EMPTY);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [trainings, setTrainings] = useState<SelectOption[]>([]);
  const [subTrainings, setSubTrainings] = useState<SelectOption[]>([]);
  const { confirm, dialog } = useConfirm();
  const listFn = useCallback(
    (params: { search: string; page: number; pageSize: number }) =>
      listExamQuizzes(params),
    [],
  );
  const list = usePagedList<ExamQuiz>(listFn);

  useEffect(() => {
    void listTrainingOptions().then(setTrainings);
  }, []);

  useEffect(() => {
    if (!values.trainingId) {
      setSubTrainings([]);
      return;
    }
    void listSubTrainingOptions(values.trainingId).then(setSubTrainings);
  }, [values.trainingId]);

  function resetForm() {
    setValues(EMPTY);
    setEditingId(null);
    setError(null);
  }

  async function handleSubmit() {
    const limit = Number(values.questionLimit);
    if (!values.questionType) {
      setError("Select the type of questions for this paper.");
      return;
    }
    if (!limit || limit < 1) {
      setError("Enter the number of questions allowed in this paper.");
      return;
    }
    setPending(true);
    setError(null);
    const session = await getSession();
    if (editingId) await updateExamQuiz(editingId, values);
    else await createExamQuiz(values, session?.name ?? "Trainer");
    setPending(false);
    resetForm();
    list.refreshFromStart();
  }

  function handleEdit(row: ExamQuiz) {
    setEditingId(row.id);
    setError(null);
    setValues({
      trainingId: row.trainingId,
      subTrainingId: row.subTrainingId,
      questionLimit: String(row.questionLimit),
      questionType: row.questionType,
    });
  }

  async function handleDelete(row: ExamQuiz) {
    const ok = await confirm({
      title: "Delete quiz",
      description: `Are you sure you want to delete "${row.name}"? This action cannot be undone.`,
      confirmLabel: "Delete",
    });
    if (!ok) return;
    await deleteExamQuiz(row.id);
    await list.reload();
  }

  function getExportRows() {
    return listExamQuizzes({
      search: list.search,
      page: 1,
      pageSize: 10000,
    }).then((result) => result.items);
  }

  return {
    values,
    setValues,
    editingId,
    pending,
    error,
    list,
    trainings,
    subTrainings,
    handleSubmit,
    resetForm,
    handleEdit,
    handleDelete,
    getExportRows,
    dialog,
  };
}
