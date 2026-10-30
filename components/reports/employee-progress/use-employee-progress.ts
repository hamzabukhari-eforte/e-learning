"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePagedList } from "@/components/system-setup/use-paged-list";
import {
  listEmployeeProgress,
  monthsInDateRange,
} from "@/data/reports/employee-progress";
import type {
  EmployeeProgressFilter,
  EmployeeProgressRow,
  ProgressMonth,
} from "@/data/reports/employee-progress-types";
import { listEmployeeOptions } from "@/data/registration/employees";
import type { SelectOption } from "@/data/registration/types";
import { listSubTrainingOptions } from "@/data/system-setup/sub-trainings";
import { listTrainingOptions } from "@/data/system-setup/trainings";

const EMPTY: EmployeeProgressFilter = {
  dateFrom: "",
  dateTo: "",
  trainingId: "",
  subTrainingId: "",
  employeeId: "",
};

const EMPTY_PAGE = {
  items: [] as EmployeeProgressRow[],
  total: 0,
  page: 1,
  pageSize: 10,
  totalPages: 1,
};

export function useEmployeeProgress() {
  const [values, setValues] = useState<EmployeeProgressFilter>(EMPTY);
  const [applied, setApplied] = useState<EmployeeProgressFilter | null>(null);
  const [trainings, setTrainings] = useState<SelectOption[]>([]);
  const [subTrainings, setSubTrainings] = useState<SelectOption[]>([]);
  const [employees, setEmployees] = useState<SelectOption[]>([]);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const listFn = useCallback(
    async (params: { search: string; page: number; pageSize: number }) => {
      if (!applied) return { ...EMPTY_PAGE, pageSize: params.pageSize };
      return listEmployeeProgress({ filter: applied, ...params });
    },
    [applied],
  );
  const list = usePagedList<EmployeeProgressRow>(listFn);

  const months: ProgressMonth[] = useMemo(() => {
    if (!applied) return [];
    return monthsInDateRange(applied.dateFrom, applied.dateTo);
  }, [applied]);

  useEffect(() => {
    void listTrainingOptions().then(setTrainings);
    void listEmployeeOptions().then(setEmployees);
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
      !values.employeeId
    ) {
      setError("Please fill all fields.");
      return;
    }
    if (new Date(values.dateTo) < new Date(values.dateFrom)) {
      setError("Date Range To must be on or after Date Range From.");
      return;
    }
    setPending(true);
    setError(null);
    setApplied({ ...values });
    setPending(false);
  }

  function getExportRows() {
    if (!applied) return Promise.resolve([]);
    return listEmployeeProgress({
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
    employees,
    pending,
    error,
    list,
    months,
    handleShowReport,
    getExportRows,
  };
}
