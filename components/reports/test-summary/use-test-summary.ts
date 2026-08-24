"use client";

import { useCallback, useEffect, useState } from "react";
import { usePagedList } from "@/components/system-setup/use-paged-list";
import { listTestAttemptSummary } from "@/data/reports/test-summary";
import type {
  TestAttemptSummary,
  TestSummaryFilter,
} from "@/data/reports/types";
import { listTrainerOptions } from "@/data/registration/trainers";
import type { SelectOption } from "@/data/registration/types";
import { listSubTrainingOptions } from "@/data/system-setup/sub-trainings";
import { listTrainingOptions } from "@/data/system-setup/trainings";

const EMPTY: TestSummaryFilter = {
  dateFrom: "",
  dateTo: "",
  trainingId: "",
  subTrainingId: "",
  trainerId: "",
};

const EMPTY_PAGE = {
  items: [] as TestAttemptSummary[],
  total: 0,
  page: 1,
  pageSize: 10,
  totalPages: 1,
};

export function useTestSummary() {
  const [values, setValues] = useState<TestSummaryFilter>(EMPTY);
  const [applied, setApplied] = useState<TestSummaryFilter | null>(null);
  const [trainings, setTrainings] = useState<SelectOption[]>([]);
  const [subTrainings, setSubTrainings] = useState<SelectOption[]>([]);
  const [trainers, setTrainers] = useState<SelectOption[]>([]);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const listFn = useCallback(
    async (params: { search: string; page: number; pageSize: number }) => {
      if (!applied) return { ...EMPTY_PAGE, pageSize: params.pageSize };
      return listTestAttemptSummary({ filter: applied, ...params });
    },
    [applied],
  );
  const list = usePagedList<TestAttemptSummary>(listFn);

  useEffect(() => {
    void Promise.all([listTrainingOptions(), listTrainerOptions()]).then(
      ([trainingOptions, trainerOptions]) => {
        setTrainings(trainingOptions);
        setTrainers(trainerOptions);
      },
    );
  }, []);

  useEffect(() => {
    if (!values.trainingId) {
      setSubTrainings([]);
      return;
    }
    void listSubTrainingOptions(values.trainingId).then(setSubTrainings);
  }, [values.trainingId]);

  function handleShowReport() {
    if (
      !values.dateFrom ||
      !values.dateTo ||
      !values.trainingId ||
      !values.subTrainingId ||
      !values.trainerId
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
    return listTestAttemptSummary({
      filter: applied,
      search: list.search,
      page: 1,
      pageSize: 10000,
    }).then((result) => result.items);
  }

  return { values, setValues, trainings, subTrainings, trainers, pending, error, list, handleShowReport, getExportRows };
}
