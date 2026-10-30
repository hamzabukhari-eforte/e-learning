"use client";

import type { FormEvent } from "react";
import { SearchableSelect } from "@/components/registration/searchable-select";
import { DateRangeField } from "@/components/reports/date-range-field";
import { Button } from "@/components/ui/button";
import type { ItemsToFocusFilter } from "@/data/reports/items-to-focus-types";
import type { SelectOption } from "@/data/registration/types";

type ItemsToFocusFieldsProps = {
  values: ItemsToFocusFilter;
  trainings: SelectOption[];
  subTrainings: SelectOption[];
  assignedTrainings: SelectOption[];
  employees: SelectOption[];
  pending?: boolean;
  error?: string | null;
  onChange: (values: ItemsToFocusFilter) => void;
  onSubmit: () => void;
};

export function ItemsToFocusFields({
  values,
  trainings,
  subTrainings,
  assignedTrainings,
  employees,
  pending,
  error,
  onChange,
  onSubmit,
}: ItemsToFocusFieldsProps) {
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
      <DateRangeField
        id="focus-date-range"
        label="Date Range"
        dateFrom={values.dateFrom}
        dateTo={values.dateTo}
        onChange={(range) =>
          onChange({ ...values, ...range, assignedTrainingId: "" })
        }
        required
      />
      <SearchableSelect
        id="focus-training"
        label="Select Training"
        placeholder="Select training"
        searchPlaceholder="Search training..."
        value={values.trainingId}
        options={trainings}
        onChange={(trainingId) =>
          onChange({
            ...values,
            trainingId,
            subTrainingId: "",
            assignedTrainingId: "",
          })
        }
        required
      />
      <SearchableSelect
        id="focus-sub-training"
        label="Select Sub Training"
        placeholder="Select sub training"
        searchPlaceholder="Search sub training..."
        value={values.subTrainingId}
        options={subTrainings}
        onChange={(subTrainingId) =>
          onChange({ ...values, subTrainingId, assignedTrainingId: "" })
        }
        required
      />
      <SearchableSelect
        id="focus-assigned-training"
        label="Select Assigned Trainings by Date Range"
        placeholder="Select assigned training"
        searchPlaceholder="Search assigned training..."
        value={values.assignedTrainingId}
        options={assignedTrainings}
        onChange={(assignedTrainingId) =>
          onChange({ ...values, assignedTrainingId })
        }
        required
      />
      <SearchableSelect
        id="focus-employee"
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
