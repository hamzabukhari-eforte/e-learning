"use client";

import type { FormEvent } from "react";
import { SearchableSelect } from "@/components/registration/searchable-select";
import { DateRangeField } from "@/components/reports/date-range-field";
import { Button } from "@/components/ui/button";
import type { EmployeeProgressFilter } from "@/data/reports/employee-progress-types";
import type { SelectOption } from "@/data/registration/types";

type EmployeeProgressFieldsProps = {
  values: EmployeeProgressFilter;
  trainings: SelectOption[];
  subTrainings: SelectOption[];
  employees: SelectOption[];
  pending?: boolean;
  error?: string | null;
  onChange: (values: EmployeeProgressFilter) => void;
  onSubmit: () => void;
};

export function EmployeeProgressFields({
  values,
  trainings,
  subTrainings,
  employees,
  pending,
  error,
  onChange,
  onSubmit,
}: EmployeeProgressFieldsProps) {
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
      <DateRangeField
        id="progress-date-range"
        label="Date Range"
        dateFrom={values.dateFrom}
        dateTo={values.dateTo}
        onChange={(range) => onChange({ ...values, ...range })}
        required
      />
      <SearchableSelect
        id="progress-training"
        label="Select Training"
        placeholder="Select training"
        searchPlaceholder="Search training..."
        value={values.trainingId}
        options={trainings}
        onChange={(trainingId) =>
          onChange({ ...values, trainingId, subTrainingId: "" })
        }
        required
      />
      <SearchableSelect
        id="progress-sub-training"
        label="Select Sub Training"
        placeholder="Select sub training"
        searchPlaceholder="Search sub training..."
        value={values.subTrainingId}
        options={subTrainings}
        onChange={(subTrainingId) => onChange({ ...values, subTrainingId })}
        required
      />
      <SearchableSelect
        id="progress-employee"
        label="Select Employee"
        placeholder="Select employee"
        searchPlaceholder="Search employee..."
        value={values.employeeId}
        options={employees}
        onChange={(employeeId) => onChange({ ...values, employeeId })}
        required
      />
      <div className="flex items-end justify-end md:col-span-2">
        <div className="flex w-full flex-col items-end gap-2">
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <Button type="submit" className="min-w-36" disabled={pending}>
            {pending ? "Loading..." : "Show Report"}
          </Button>
        </div>
      </div>
    </form>
  );
}
