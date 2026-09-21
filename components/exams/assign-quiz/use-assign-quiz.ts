"use client";

import { useCallback, useEffect, useState } from "react";
import { usePagedList } from "@/components/system-setup/use-paged-list";
import {
  assignQuiz,
  listAssignedQuizzes,
} from "@/data/exams/assigned-quizzes";
import { listExamQuizOptions } from "@/data/exams/quizzes";
import type { AssignedQuiz, AssignQuizInput } from "@/data/exams/types";
import type { SelectOption } from "@/data/registration/types";
import { listEmployeesForTrainer } from "@/data/registration/trainers";
import { listSubTrainingOptions } from "@/data/system-setup/sub-trainings";
import { listTrainingOptions } from "@/data/system-setup/trainings";

const EMPTY: AssignQuizInput = {
  dateFrom: "",
  dateTo: "",
  trainingId: "",
  subTrainingId: "",
  employeeIds: [],
  quizId: "",
  quizType: "",
  validFrom: "",
  validTo: "",
  emailSubject: "",
  emailContent: "",
};

export function useAssignQuiz() {
  const [values, setValues] = useState<AssignQuizInput>(EMPTY);
  const [trainings, setTrainings] = useState<SelectOption[]>([]);
  const [subTrainings, setSubTrainings] = useState<SelectOption[]>([]);
  const [employees, setEmployees] = useState<SelectOption[]>([]);
  const [quizzes, setQuizzes] = useState<SelectOption[]>([]);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const listFn = useCallback(
    (params: { search: string; page: number; pageSize: number }) =>
      listAssignedQuizzes(params),
    [],
  );
  const list = usePagedList<AssignedQuiz>(listFn);

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
    if (!values.trainingId || !values.subTrainingId) {
      setQuizzes([]);
      return;
    }
    void listExamQuizOptions({
      trainingId: values.trainingId,
      subTrainingId: values.subTrainingId,
    }).then(setQuizzes);
  }, [values.trainingId, values.subTrainingId]);

  async function handleSubmit() {
    if (values.validFrom && values.validTo) {
      if (new Date(values.validTo) < new Date(values.validFrom)) {
        setError("Validity to must be on or after Validity from.");
        return;
      }
    }
    if (values.dateFrom && values.dateTo) {
      if (new Date(values.dateTo) < new Date(values.dateFrom)) {
        setError("Date range end must be on or after the start date.");
        return;
      }
    }
    setPending(true);
    setError(null);
    const result = await assignQuiz(values);
    setPending(false);
    if (!result) {
      setError("Please complete all fields before assigning.");
      return;
    }
    setValues(EMPTY);
    list.refreshFromStart();
  }

  function getExportRows() {
    return listAssignedQuizzes({
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
    quizzes,
    pending,
    error,
    list,
    handleSubmit,
    getExportRows,
  };
}
