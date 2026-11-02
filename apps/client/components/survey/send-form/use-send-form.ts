"use client";

import { useCallback, useEffect, useState } from "react";
import { usePagedList } from "@/components/system-setup/use-paged-list";
import { listEmployeesForTrainer } from "@/data/registration/trainers";
import { getAllForms } from "@/data/survey/forms";
import { listSentForms, sendForm } from "@/data/survey/sent-forms";
import type { SelectOption } from "@/data/registration/types";
import type { SendFormInput, SentForm } from "@/data/survey/types";

const EMPTY: SendFormInput = {
  employeeIds: [],
  formId: "",
  formType: "",
  validFrom: "",
  validTo: "",
};

export function useSendForm() {
  const [values, setValues] = useState<SendFormInput>(EMPTY);
  const [employees, setEmployees] = useState<SelectOption[]>([]);
  const [forms, setForms] = useState<SelectOption[]>([]);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const listFn = useCallback(
    (params: { search: string; page: number; pageSize: number }) =>
      listSentForms(params),
    [],
  );
  const list = usePagedList<SentForm>(listFn);

  useEffect(() => {
    void Promise.all([listEmployeesForTrainer(), getAllForms()]).then(
      ([employeeOptions, formItems]) => {
        setEmployees(employeeOptions);
        setForms(formItems.map((item) => ({ id: item.id, label: item.name })));
      },
    );
  }, []);

  async function handleSubmit() {
    if (values.validFrom && values.validTo) {
      if (new Date(values.validTo) <= new Date(values.validFrom)) {
        setError("Validity To must be after Validity From.");
        return;
      }
    }
    setPending(true);
    setError(null);
    const result = await sendForm(values);
    setPending(false);
    if (!result) {
      setError("Please complete all fields before sending.");
      return;
    }
    setValues(EMPTY);
    list.refreshFromStart();
  }

  function getExportRows() {
    return listSentForms({
      search: list.search,
      page: 1,
      pageSize: 10000,
    }).then((result) => result.items);
  }

  return {
    values,
    setValues,
    employees,
    forms,
    pending,
    error,
    list,
    handleSubmit,
    getExportRows,
  };
}
