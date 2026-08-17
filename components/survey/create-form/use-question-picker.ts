"use client";

import { useCallback, useState } from "react";
import { usePagedList } from "@/components/system-setup/use-paged-list";
import { listQuestions } from "@/data/survey/questions";
import type {
  FormQuestion,
  QuestionType,
  SurveyQuestion,
} from "@/data/survey/types";

export function useQuestionPicker(
  type: QuestionType,
  initialSelected: FormQuestion[],
  limit: number,
) {
  const [selected, setSelected] = useState<FormQuestion[]>(initialSelected);
  const [error, setError] = useState<string | null>(null);
  const listFn = useCallback(
    (params: { search: string; page: number; pageSize: number }) =>
      listQuestions({ ...params, type }),
    [type],
  );
  const list = usePagedList<SurveyQuestion>(listFn);
  const maxSequence = Math.max(limit, 1);

  function toggle(row: SurveyQuestion) {
    setError(null);
    const exists = selected.find((item) => item.questionId === row.id);
    if (exists) {
      setSelected(selected.filter((item) => item.questionId !== row.id));
      return;
    }
    if (selected.length >= limit) {
      setError(`You can select up to ${limit} question(s).`);
      return;
    }
    const used = new Set(selected.map((item) => item.sequence));
    const sequence =
      Array.from({ length: maxSequence }, (_, i) => i + 1).find((n) => !used.has(n)) ??
      selected.length + 1;
    setSelected([
      ...selected,
      { questionId: row.id, sequence, question: row.question },
    ]);
  }

  function setSequence(questionId: string, sequence: number) {
    setSelected(
      selected.map((item) =>
        item.questionId === questionId ? { ...item, sequence } : item,
      ),
    );
  }

  function validateSave() {
    const sequences = selected.map((item) => item.sequence);
    if (!selected.length) {
      setError("Select at least one question.");
      return false;
    }
    if (new Set(sequences).size !== sequences.length) {
      setError("Each selected question must have a unique sequence.");
      return false;
    }
    if (sequences.some((sequence) => sequence < 1 || sequence > maxSequence)) {
      setError(`Sequence must be between 1 and ${maxSequence}.`);
      return false;
    }
    return true;
  }

  return { selected, error, list, maxSequence, toggle, setSequence, validateSave };
}
