"use client";

import { useCallback, useState } from "react";
import { usePagedList } from "@/components/system-setup/use-paged-list";
import { getSession } from "@/data/auth";
import { createForm, deleteForm, listForms, updateForm } from "@/data/survey/forms";
import type { SurveyForm, SurveyFormInput } from "@/data/survey/types";

export const EMPTY_SURVEY_FORM: SurveyFormInput = {
  name: "",
  questionLimit: "",
  questionType: "",
  questions: [],
};

export function useSurveyForms() {
  const [values, setValues] = useState<SurveyFormInput>(EMPTY_SURVEY_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const listFn = useCallback(
    (params: { search: string; page: number; pageSize: number }) => listForms(params),
    [],
  );
  const list = usePagedList<SurveyForm>(listFn);

  function resetForm() {
    setValues(EMPTY_SURVEY_FORM);
    setEditingId(null);
    setError(null);
  }

  async function openPicker() {
    const limit = Number(values.questionLimit);
    if (!values.questionType) return setError("Select the type of questions first.");
    if (!limit || limit < 1) {
      return setError("Enter the number of questions allowed in this form.");
    }
    setError(null);
    setPickerOpen(true);
  }

  async function handleSubmit() {
    const limit = Number(values.questionLimit);
    if (!values.questions.length) return setError("Select questions for this form.");
    if (values.questions.length > limit) {
      return setError(`Select at most ${limit} question(s).`);
    }
    setPending(true);
    setError(null);
    const session = await getSession();
    if (editingId) await updateForm(editingId, values);
    else await createForm(values, session?.name ?? "Admin");
    setPending(false);
    resetForm();
    list.refreshFromStart();
  }

  function handleEdit(row: SurveyForm) {
    setEditingId(row.id);
    setError(null);
    setValues({
      name: row.name,
      questionLimit: String(row.questionLimit),
      questionType: row.questionType,
      questions: row.questions,
    });
  }

  async function handleDelete(row: SurveyForm) {
    if (!window.confirm(`Delete form ${row.name}?`)) return;
    await deleteForm(row.id);
    await list.reload();
  }

  return {
    values, setValues, editingId, pending, error, list,
    pickerOpen, openPicker,
    closePicker: () => setPickerOpen(false),
    handleSubmit, resetForm, handleEdit, handleDelete,
  };
}
