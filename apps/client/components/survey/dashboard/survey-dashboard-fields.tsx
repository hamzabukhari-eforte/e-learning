"use client";

import type { FormEvent } from "react";
import { SearchableSelect } from "@/components/registration/searchable-select";
import { Button } from "@/components/ui/button";
import type { SurveyDashboardFilter } from "@/data/survey/dashboard-types";
import type { SelectOption } from "@/data/registration/types";

type SurveyDashboardFieldsProps = {
  values: SurveyDashboardFilter;
  forms: SelectOption[];
  assignedForms: SelectOption[];
  pending?: boolean;
  error?: string | null;
  onChange: (values: SurveyDashboardFilter) => void;
  onSubmit: () => void;
};

export function SurveyDashboardFields({
  values,
  forms,
  assignedForms,
  pending,
  error,
  onChange,
  onSubmit,
}: SurveyDashboardFieldsProps) {
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form className="grid gap-4 md:grid-cols-3" onSubmit={handleSubmit}>
      <SearchableSelect
        id="dashboard-form"
        label="Select Form"
        placeholder="Select form"
        searchPlaceholder="Search form..."
        value={values.formId}
        options={forms}
        onChange={(formId) => onChange({ formId, assignedFormId: "" })}
        required
      />
      <SearchableSelect
        id="dashboard-assigned-form"
        label="Select Assigned Form"
        placeholder="Select assigned form"
        searchPlaceholder="Search assigned form..."
        value={values.assignedFormId}
        options={assignedForms}
        onChange={(assignedFormId) => onChange({ ...values, assignedFormId })}
        required
      />
      <div className="flex flex-col items-end justify-end gap-2">
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <Button type="submit" className="min-w-36" disabled={pending}>
          {pending ? "Loading..." : "Show Report"}
        </Button>
      </div>
    </form>
  );
}
