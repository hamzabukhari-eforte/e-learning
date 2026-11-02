"use client";

import { useCallback, useEffect, useState } from "react";
import { usePagedList } from "@/components/system-setup/use-paged-list";
import { listAssignedTrainingOptions } from "@/data/exams/assigned-quizzes";
import {
  createPersonalizedAssessment,
  listPersonalizedAssessments,
} from "@/data/exams/personalized-assessments";
import type {
  PersonalizedAssessment,
  PersonalizedAssessmentInput,
} from "@/data/exams/types";
import type { SelectOption } from "@/data/registration/types";
import { listEmployeesForTrainer } from "@/data/registration/trainers";
import { listSubTrainingOptions } from "@/data/system-setup/sub-trainings";
import { listTrainingOptions } from "@/data/system-setup/trainings";

const EMPTY: PersonalizedAssessmentInput = {
  trainingId: "",
  subTrainingId: "",
  dateFrom: "",
  dateTo: "",
  assignedTrainingId: "",
  employeeId: "",
};

export function usePersonalizedAssessments() {
  const [values, setValues] = useState<PersonalizedAssessmentInput>(EMPTY);
  const [trainings, setTrainings] = useState<SelectOption[]>([]);
  const [subTrainings, setSubTrainings] = useState<SelectOption[]>([]);
  const [assignedTrainings, setAssignedTrainings] = useState<SelectOption[]>([]);
  const [employees, setEmployees] = useState<SelectOption[]>([]);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const listFn = useCallback(
    (params: { search: string; page: number; pageSize: number }) =>
      listPersonalizedAssessments(params),
    [],
  );
  const list = usePagedList<PersonalizedAssessment>(listFn);

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

  async function handleSubmit() {
    if (values.dateFrom && values.dateTo) {
      if (new Date(values.dateTo) < new Date(values.dateFrom)) {
        setError("Date range end must be on or after the start date.");
        return;
      }
    }
    setPending(true);
    setError(null);
    const result = await createPersonalizedAssessment(values);
    setPending(false);
    if (!result) {
      setError("Please complete all fields before assigning.");
      return;
    }
    setValues(EMPTY);
    list.refreshFromStart();
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
    handleSubmit,
  };
}
