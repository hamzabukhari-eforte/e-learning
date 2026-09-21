"use client";

import type { FormEvent } from "react";
import { DateRangeField } from "@/components/reports/date-range-field";
import { SearchableSelect } from "@/components/registration/searchable-select";
import { Button } from "@/components/ui/button";
import type { PersonalizedAssessmentInput } from "@/data/exams/types";
import type { SelectOption } from "@/data/registration/types";

type PersonalizedAssessmentFormProps = {
  values: PersonalizedAssessmentInput;
  trainings: SelectOption[];
  subTrainings: SelectOption[];
  assignedTrainings: SelectOption[];
  employees: SelectOption[];
  pending?: boolean;
  error?: string | null;
  onChange: (values: PersonalizedAssessmentInput) => void;
  onSubmit: () => void;
};

export function PersonalizedAssessmentForm({
  values,
  trainings,
  subTrainings,
  assignedTrainings,
  employees,
  pending,
  error,
  onChange,
  onSubmit,
}: PersonalizedAssessmentFormProps) {
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
      <SearchableSelect
        id="pa-training"
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
        id="pa-subtraining"
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
      <DateRangeField
        id="pa-date-range"
        label="Date Range"
        dateFrom={values.dateFrom}
        dateTo={values.dateTo}
        onChange={(range) =>
          onChange({ ...values, ...range, assignedTrainingId: "" })
        }
        required
      />
      <SearchableSelect
        id="pa-assigned-training"
        label="Select Assigned Training by Date Range"
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
        id="pa-employee"
        label="Select Employee"
        placeholder="Select employee"
        searchPlaceholder="Search employee..."
        value={values.employeeId}
        options={employees}
        onChange={(employeeId) => onChange({ ...values, employeeId })}
        required
      />
      {error ? (
        <p className="text-sm text-red-600 md:col-span-2">{error}</p>
      ) : null}
      <div className="flex justify-end md:col-span-2">
        <Button type="submit" className="min-w-28" disabled={pending}>
          {pending ? "Assigning..." : "Assign"}
        </Button>
      </div>
    </form>
  );
}
