"use client";

import { useEffect, useState } from "react";
import { ModulePage } from "@/components/system-setup/module-page";
import { SurveyDashboardCharts } from "@/components/survey/dashboard/survey-dashboard-charts";
import { SurveyDashboardFields } from "@/components/survey/dashboard/survey-dashboard-fields";
import {
  getSurveyDashboardReport,
  listAssignedFormOptions,
  listSurveyFormOptions,
} from "@/data/survey/dashboard";
import type {
  SurveyDashboardFilter,
  SurveyDashboardReport,
} from "@/data/survey/dashboard-types";
import type { SelectOption } from "@/data/registration/types";

const EMPTY: SurveyDashboardFilter = { formId: "", assignedFormId: "" };

export function SurveyDashboardModule() {
  const [values, setValues] = useState<SurveyDashboardFilter>(EMPTY);
  const [forms, setForms] = useState<SelectOption[]>([]);
  const [assignedForms, setAssignedForms] = useState<SelectOption[]>([]);
  const [report, setReport] = useState<SurveyDashboardReport | null>(null);
  const [hasRequested, setHasRequested] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void listSurveyFormOptions().then(setForms);
  }, []);

  useEffect(() => {
    if (!values.formId) {
      setAssignedForms([]);
      return;
    }
    void listAssignedFormOptions(values.formId).then(setAssignedForms);
  }, [values.formId]);

  async function handleShowReport() {
    if (!values.formId || !values.assignedFormId) {
      setError("Please select form and assigned form.");
      return;
    }
    setPending(true);
    setError(null);
    const next = await getSurveyDashboardReport(values);
    setReport(next);
    setHasRequested(true);
    setPending(false);
    if (!next) setError("Unable to load report for this selection.");
  }

  return (
    <ModulePage
      title="Survey Dashboard"
      entityLabel="Dashboard"
      sectionLabel="Survey"
      formTitle="Filter Report"
      form={
        <SurveyDashboardFields
          values={values}
          forms={forms}
          assignedForms={assignedForms}
          pending={pending}
          error={error}
          onChange={setValues}
          onSubmit={handleShowReport}
        />
      }
      table={
        <SurveyDashboardCharts report={report} hasRequested={hasRequested} />
      }
    />
  );
}
