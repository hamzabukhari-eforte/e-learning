"use client";

import { useCallback, useEffect, useState } from "react";
import { usePagedList } from "@/components/system-setup/use-paged-list";
import { useConfirm } from "@/components/ui/use-confirm";
import { getSession } from "@/data/auth";
import {
  createExamQuestion,
  deleteExamQuestion,
  listExamQuestions,
  updateExamQuestion,
} from "@/data/exams/questions";
import type { ExamQuestion, ExamQuestionInput } from "@/data/exams/types";
import type { SelectOption } from "@/data/registration/types";
import { listSubTrainingOptions } from "@/data/system-setup/sub-trainings";
import { listTrainingOptions } from "@/data/system-setup/trainings";
import { EMPTY_MCQ_OPTIONS } from "@/data/survey/types";

const EMPTY: ExamQuestionInput = {
  trainingId: "",
  subTrainingId: "",
  type: "",
  question: "",
  options: EMPTY_MCQ_OPTIONS,
};

export function useExamQuestions() {
  const [values, setValues] = useState<ExamQuestionInput>(EMPTY);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formKey, setFormKey] = useState(0);
  const [trainings, setTrainings] = useState<SelectOption[]>([]);
  const [subTrainings, setSubTrainings] = useState<SelectOption[]>([]);
  const { confirm, dialog } = useConfirm();
  const listFn = useCallback(
    (params: { search: string; page: number; pageSize: number }) =>
      listExamQuestions(params),
    [],
  );
  const list = usePagedList<ExamQuestion>(listFn);

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
    setFormKey((key) => key + 1);
  }

  async function handleSubmit() {
    const filled = values.options.map((o) => o.trim()).filter(Boolean);
    if (values.type === "mcq" && filled.length < 2) {
      setError("Add at least two options for MCQ's.");
      return;
    }
    setPending(true);
    setError(null);
    const session = await getSession();
    if (editingId) await updateExamQuestion(editingId, values);
    else await createExamQuestion(values, session?.name ?? "Trainer");
    setPending(false);
    resetForm();
    list.refreshFromStart();
  }

  function handleEdit(row: ExamQuestion) {
    setEditingId(row.id);
    setError(null);
    setValues({
      trainingId: row.trainingId,
      subTrainingId: row.subTrainingId,
      type: row.type,
      question: row.question,
      options: row.type === "mcq" ? row.options : [],
      fileName: row.fileName,
    });
  }

  async function handleDelete(row: ExamQuestion) {
    const ok = await confirm({
      title: "Delete question",
      description:
        "Are you sure you want to delete this question? This action cannot be undone.",
      confirmLabel: "Delete",
    });
    if (!ok) return;
    await deleteExamQuestion(row.id);
    await list.reload();
  }

  function getExportRows() {
    return listExamQuestions({
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
    formKey,
    dialog,
  };
}
