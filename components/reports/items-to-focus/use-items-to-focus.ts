"use client";

import { useCallback, useEffect, useState } from "react";
import { usePagedList } from "@/components/system-setup/use-paged-list";
import { listAssignedTrainingOptions } from "@/data/exams/assigned-quizzes";
import { listItemsToFocus } from "@/data/reports/items-to-focus";
import type {
  FocusItem,
  ItemsToFocusFilter,
} from "@/data/reports/items-to-focus-types";
import { listEmployeeOptions } from "@/data/registration/employees";
import type { SelectOption } from "@/data/registration/types";
import { listSubTrainingOptions } from "@/data/system-setup/sub-trainings";
import { listTrainingOptions } from "@/data/system-setup/trainings";

const EMPTY: ItemsToFocusFilter = {
  dateFrom: "",
  dateTo: "",
  trainingId: "",
  subTrainingId: "",
  assignedTrainingId: "",
  employeeId: "",
};

const EMPTY_PAGE = {
  items: [] as FocusItem[],
  total: 0,
  page: 1,
  pageSize: 10,
  totalPages: 1,
};

export function useItemsToFocus() {
  const [values, setValues] = useState<ItemsToFocusFilter>(EMPTY);
  const [applied, setApplied] = useState<ItemsToFocusFilter | null>(null);
  const [trainings, setTrainings] = useState<SelectOption[]>([]);
  const [subTrainings, setSubTrainings] = useState<SelectOption[]>([]);
  const [assignedTrainings, setAssignedTrainings] = useState<SelectOption[]>(
    [],
  );
  const [employees, setEmployees] = useState<SelectOption[]>([]);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const listFn = useCallback(
    async (params: { search: string; page: number; pageSize: number }) => {
      if (!applied) return { ...EMPTY_PAGE, pageSize: params.pageSize };
      return listItemsToFocus({ filter: applied, ...params });
    },
    [applied],
  );
  const list = usePagedList<FocusItem>(listFn);

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

  useEffect(() => {
    if (
      !values.trainingId ||
      !values.subTrainingId ||
      !values.dateFrom ||
      !values.dateTo
    ) {
      setAssignedTrainings([]);
      return;
    }
    void listAssignedTrainingOptions({
      trainingId: values.trainingId,
      subTrainingId: values.subTrainingId,
      dateFrom: values.dateFrom,
      dateTo: values.dateTo,
    }).then(setAssignedTrainings);
  }, [
    values.trainingId,
    values.subTrainingId,
    values.dateFrom,
    values.dateTo,
  ]);

  function handleShowReport() {
    if (
      !values.dateFrom ||
      !values.dateTo ||
      !values.trainingId ||
      !values.subTrainingId ||
      !values.assignedTrainingId ||
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
    return listItemsToFocus({
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
    assignedTrainings,
    employees,
    pending,
    error,
    list,
    handleShowReport,
    getExportRows,
  };
}
