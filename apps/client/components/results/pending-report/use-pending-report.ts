"use client";

import { useCallback, useEffect, useState } from "react";
import { usePagedList } from "@/components/system-setup/use-paged-list";
import { listExamQuizOptions } from "@/data/exams/quizzes";
import { listPendingResults } from "@/data/results/pending-report";
import type {
  PendingResultAttempt,
  PendingResultEmployee,
  PendingResultFilter,
  PendingResultRow,
} from "@/data/results/types";
import type { SelectOption } from "@/data/registration/types";
import { listSubTrainingOptions } from "@/data/system-setup/sub-trainings";
import { listTrainingOptions } from "@/data/system-setup/trainings";

const EMPTY: PendingResultFilter = {
  dateFrom: "",
  dateTo: "",
  trainingId: "",
  subTrainingId: "",
  quizId: "",
};

type EmployeeModalState = {
  title: string;
  employees: PendingResultEmployee[];
} | null;

export function usePendingReport() {
  const [values, setValues] = useState<PendingResultFilter>(EMPTY);
  const [applied, setApplied] = useState<PendingResultFilter>(EMPTY);
  const [trainings, setTrainings] = useState<SelectOption[]>([]);
  const [subTrainings, setSubTrainings] = useState<SelectOption[]>([]);
  const [quizzes, setQuizzes] = useState<SelectOption[]>([]);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [employeeModal, setEmployeeModal] = useState<EmployeeModalState>(null);
  const [detailsRow, setDetailsRow] = useState<PendingResultRow | null>(null);
  const [paperAttempt, setPaperAttempt] = useState<PendingResultAttempt | null>(
    null,
  );

  const listFn = useCallback(
    async (params: { search: string; page: number; pageSize: number }) =>
      listPendingResults({ filter: applied, ...params }),
    [applied],
  );
  const list = usePagedList<PendingResultRow>(listFn);

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

  useEffect(() => {
    if (!values.trainingId || !values.subTrainingId) {
      setQuizzes([]);
      return;
    }
    void listExamQuizOptions({
      trainingId: values.trainingId,
      subTrainingId: values.subTrainingId,
    }).then(setQuizzes);
  }, [values.trainingId, values.subTrainingId]);

  function handleShowReport() {
    if (values.dateFrom && values.dateTo) {
      if (new Date(values.dateTo) < new Date(values.dateFrom)) {
        setError("Date range end must be on or after the start date.");
        return;
      }
    }
    setPending(true);
    setError(null);
    setApplied({ ...values });
    setPending(false);
  }

  function getExportRows() {
    return listPendingResults({
      filter: applied,
      search: list.search,
      page: 1,
      pageSize: 10000,
    }).then((result) => result.items);
  }

  return {
    values,
    setValues,
    trainings,
    subTrainings,
    quizzes,
    pending,
    error,
    list,
    employeeModal,
    setEmployeeModal,
    detailsRow,
    setDetailsRow,
    paperAttempt,
    setPaperAttempt,
    handleShowReport,
    getExportRows,
  };
}
