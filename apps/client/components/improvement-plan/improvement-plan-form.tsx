"use client";

import type { FormEvent } from "react";
import { DateRangeField } from "@/components/reports/date-range-field";
import { SearchableMultiSelect } from "@/components/registration/searchable-multi-select";
import { SearchableSelect } from "@/components/registration/searchable-select";
import { FormActions } from "@/components/system-setup/form-actions";
import { DateField } from "@/components/ui/date-field";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { ImprovementPlanInput } from "@/data/improvement-plan/types";
import type { SelectOption } from "@/data/registration/types";

type ImprovementPlanFormProps = {
  values: ImprovementPlanInput;
  trainings: SelectOption[];
  subTrainings: SelectOption[];
  employees: SelectOption[];
  isEditing: boolean;
  pending?: boolean;
  error?: string | null;
  onChange: (values: ImprovementPlanInput) => void;
  onSubmit: () => void;
  onCancel: () => void;
};

export function ImprovementPlanForm({
  values,
  trainings,
  subTrainings,
  employees,
  isEditing,
  pending,
  error,
  onChange,
  onSubmit,
  onCancel,
}: ImprovementPlanFormProps) {
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
      <DateRangeField
        id="improvement-date-range"
        label="Date Range (to show the list of employees)"
        dateFrom={values.dateFrom}
        dateTo={values.dateTo}
        onChange={(range) => onChange({ ...values, ...range })}
        required
      />
      <SearchableSelect
        id="improvement-training"
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
        id="improvement-subtraining"
        label="Select Sub Training"
        placeholder="Select sub training"
        searchPlaceholder="Search sub training..."
        value={values.subTrainingId}
        options={subTrainings}
        onChange={(subTrainingId) => onChange({ ...values, subTrainingId })}
        required
      />
      <SearchableMultiSelect
        id="improvement-employees"
        label="Select Employees"
        placeholder="Select employees"
        searchPlaceholder="Search employee..."
        values={values.employeeIds}
        options={employees}
        onChange={(employeeIds) => onChange({ ...values, employeeIds })}
        required
      />
      <DateField
        id="improvement-target-date"
        label="Target Completion Date"
        value={values.targetCompletionDate}
        onChange={(targetCompletionDate) =>
          onChange({ ...values, targetCompletionDate })
        }
        required
      />
      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="improvement-task-material">Write Task Material</Label>
        <Textarea
          id="improvement-task-material"
          value={values.taskMaterial}
          onChange={(event) =>
            onChange({ ...values, taskMaterial: event.target.value })
          }
          placeholder="Enter task material"
          rows={4}
          required
        />
      </div>
      {error ? (
        <p className="text-sm text-red-600 md:col-span-2">{error}</p>
      ) : null}
      <div className="md:col-span-2">
        <FormActions
          isEditing={isEditing}
          pending={pending}
          onCancel={onCancel}
        />
      </div>
    </form>
  );
}
