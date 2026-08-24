"use client";

import { useCallback, useEffect, useState } from "react";
import { usePagedList } from "@/components/system-setup/use-paged-list";
import {
  listTestAttemptHistory,
  listTestOptions,
} from "@/data/reports/test-history";
import type {
  TestAttemptHistory,
  TestHistoryFilter,
} from "@/data/reports/types";
import { listTrainerOptions } from "@/data/registration/trainers";
import type { SelectOption } from "@/data/registration/types";
import { listSubTrainingOptions } from "@/data/system-setup/sub-trainings";
import { listTrainingOptions } from "@/data/system-setup/trainings";

const EMPTY: TestHistoryFilter = {
  dateFrom: "",
  dateTo: "",
  trainingId: "",
  subTrainingId: "",
  trainerId: "",
  testId: "",
};

const EMPTY_PAGE = {
  items: [] as TestAttemptHistory[], total: 0, page: 1, pageSize: 10, totalPages: 1,
};

export function useTestHistory() {
  const [values, setValues] = useState<TestHistoryFilter>(EMPTY);
  const [applied, setApplied] = useState<TestHistoryFilter | null>(null);
  const [trainings, setTrainings] = useState<SelectOption[]>([]);
  const [trainers, setTrainers] = useState<SelectOption[]>([]);
  const [subTrainings, setSubTrainings] = useState<SelectOption[]>([]);
  const [tests, setTests] = useState<SelectOption[]>([]);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const listFn = useCallback(
    (params: { search: string; page: number; pageSize: number }) =>
      applied
        ? listTestAttemptHistory({ filter: applied, ...params })
        : Promise.resolve({ ...EMPTY_PAGE, pageSize: params.pageSize }),
    [applied],
  );
  const list = usePagedList<TestAttemptHistory>(listFn);

  useEffect(() => {
    void Promise.all([listTrainingOptions(), listTrainerOptions()]).then(
      ([trainingOptions, trainerOptions]) => {
        setTrainings(trainingOptions);
        setTrainers(trainerOptions);
      },
    );
  }, []);

  useEffect(() => {
    if (!values.trainingId) return setSubTrainings([]);
    void listSubTrainingOptions(values.trainingId).then(setSubTrainings);
  }, [values.trainingId]);

  useEffect(() => {
    if (!values.subTrainingId) return setTests([]);
    void listTestOptions(values.subTrainingId).then(setTests);
  }, [values.subTrainingId]);

  function handleShowReport() {
    if (
      !values.dateFrom ||
      !values.dateTo ||
      !values.trainingId ||
      !values.trainerId ||
      !values.subTrainingId ||
      !values.testId
    ) {
      setError("Please fill all fields.");
      return;
    }
    if (new Date(values.dateTo) <= new Date(values.dateFrom)) {
      setError("Date Range To must be after Date Range From.");
      return;
    }
    setPending(true);
    setError(null);
    setApplied({ ...values });
    setPending(false);
  }

  function getExportRows() {
    if (!applied) return Promise.resolve([]);
    return listTestAttemptHistory({
      filter: applied, search: list.search, page: 1, pageSize: 10000,
    }).then((result) => result.items);
  }

  return { values, setValues, trainings, trainers, subTrainings, tests, pending, error, list, handleShowReport, getExportRows };
}
