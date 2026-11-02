"use client";

import { useCallback, useState } from "react";
import { usePagedList } from "@/components/system-setup/use-paged-list";
import { useConfirm } from "@/components/ui/use-confirm";
import { getSession } from "@/data/auth";
import {
  createQuestion,
  deleteQuestion,
  listQuestions,
  updateQuestion,
} from "@/data/survey/questions";
import {
  EMPTY_MCQ_OPTIONS,
  type SurveyQuestion,
  type SurveyQuestionInput,
} from "@/data/survey/types";

const EMPTY: SurveyQuestionInput = {
  type: "",
  question: "",
  options: EMPTY_MCQ_OPTIONS,
};

export function useQuestionsModule() {
  const [values, setValues] = useState<SurveyQuestionInput>(EMPTY);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formKey, setFormKey] = useState(0);
  const { confirm, dialog } = useConfirm();
  const listFn = useCallback(
    (params: { search: string; page: number; pageSize: number }) =>
      listQuestions(params),
    [],
  );
  const list = usePagedList<SurveyQuestion>(listFn);

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
    if (editingId) await updateQuestion(editingId, values);
    else await createQuestion(values, session?.name ?? "Admin");
    setPending(false);
    resetForm();
    list.refreshFromStart();
  }

  function handleEdit(row: SurveyQuestion) {
    setEditingId(row.id);
    setError(null);
    setValues({
      type: row.type,
      question: row.question,
      options: row.type === "mcq" ? row.options : [],
      fileName: row.fileName,
    });
  }

  async function handleDelete(row: SurveyQuestion) {
    const ok = await confirm({
      title: "Delete question",
      description:
        "Are you sure you want to delete this question? This action cannot be undone.",
      confirmLabel: "Delete",
    });
    if (!ok) return;
    await deleteQuestion(row.id);
    await list.reload();
  }

  function getExportRows() {
    return listQuestions({
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
    handleSubmit,
    resetForm,
    handleEdit,
    handleDelete,
    getExportRows,
    formKey,
    dialog,
  };
}
