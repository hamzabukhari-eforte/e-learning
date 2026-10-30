"use client";

import { useCallback, useEffect, useState } from "react";
import { usePagedList } from "@/components/system-setup/use-paged-list";
import { getSession } from "@/data/auth";
import {
  addFeedbackComment,
  assignFeedback,
  listAssignedFeedback,
} from "@/data/feedback/assigned-feedback";
import type {
  AssignedFeedback,
  AssignFeedbackInput,
} from "@/data/feedback/types";
import type { SelectOption } from "@/data/registration/types";
import { listEmployeesForTrainer } from "@/data/registration/trainers";
import { listSubTrainingOptions } from "@/data/system-setup/sub-trainings";
import { listTrainingOptions } from "@/data/system-setup/trainings";
import { listPublishedTrainingOptions } from "@/data/training/published-trainings";

const EMPTY: AssignFeedbackInput = {
  trainingId: "",
  subTrainingId: "",
  dateFrom: "",
  dateTo: "",
  assignedTrainingId: "",
  employeeId: "",
  status: "",
  details: "",
};

export function useAssignFeedback() {
  const [values, setValues] = useState<AssignFeedbackInput>(EMPTY);
  const [trainings, setTrainings] = useState<SelectOption[]>([]);
  const [subTrainings, setSubTrainings] = useState<SelectOption[]>([]);
  const [assignedTrainings, setAssignedTrainings] = useState<SelectOption[]>([]);
  const [employees, setEmployees] = useState<SelectOption[]>([]);
  const [pending, setPending] = useState(false);
  const [commentPending, setCommentPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [addTarget, setAddTarget] = useState<AssignedFeedback | null>(null);
  const [viewTarget, setViewTarget] = useState<AssignedFeedback | null>(null);
  const listFn = useCallback(
    (params: { search: string; page: number; pageSize: number }) =>
      listAssignedFeedback(params),
    [],
  );
  const list = usePagedList<AssignedFeedback>(listFn);

  useEffect(() => {
    void Promise.all([listTrainingOptions(), listEmployeesForTrainer()]).then(
      ([trainingOptions, employeeOptions]) => {
        setTrainings(trainingOptions);
        setEmployees(employeeOptions);
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
    void listPublishedTrainingOptions({
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

  async function handleSubmit() {
    if (values.dateFrom && values.dateTo) {
      if (new Date(values.dateTo) < new Date(values.dateFrom)) {
        setError("Date range end must be on or after the start date.");
        return;
      }
    }
    setPending(true);
    setError(null);
    const result = await assignFeedback(values);
    setPending(false);
    if (!result) {
      setError("Please complete all fields before assigning.");
      return;
    }
    setValues(EMPTY);
    list.refreshFromStart();
  }

  async function handleSaveComment(comment: string) {
    if (!addTarget) return;
    setCommentPending(true);
    const session = await getSession();
    const updated = await addFeedbackComment(
      addTarget.id,
      comment,
      session?.name ?? "Trainer",
    );
    setCommentPending(false);
    if (!updated) return;
    setAddTarget(null);
    if (viewTarget?.id === updated.id) setViewTarget(updated);
    await list.reload();
  }

  function getExportRows() {
    return listAssignedFeedback({
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
    commentPending,
    error,
    list,
    addTarget,
    setAddTarget,
    viewTarget,
    setViewTarget,
    handleSubmit,
    handleSaveComment,
    getExportRows,
  };
}
