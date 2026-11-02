"use client";

import type { FormEvent } from "react";
import { SearchableSelect } from "@/components/registration/searchable-select";
import { DateField } from "@/components/ui/date-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  PURPOSE_OPTIONS,
  type AssignPurpose,
  type PublishTrainingInput,
} from "@/data/training/publish-types";
import type { SelectOption } from "@/data/registration/types";

type PublishFormProps = {
  values: PublishTrainingInput;
  trainings: SelectOption[];
  subTrainings: SelectOption[];
  pending?: boolean;
  onChange: (values: PublishTrainingInput) => void;
  onSubmit: () => void;
};

export function PublishForm({
  values,
  trainings,
  subTrainings,
  pending,
  onChange,
  onSubmit,
}: PublishFormProps) {
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onSubmit();
  }

  const validityFromDate = values.validityFrom
    ? new Date(values.validityFrom)
    : undefined;

  return (
    <form className="grid gap-4 md:grid-cols-3" onSubmit={handleSubmit}>
      <SearchableSelect
        id="publish-training"
        label="Select training"
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
        id="publish-subtraining"
        label="Select sub training"
        placeholder="Select sub training"
        searchPlaceholder="Search sub training..."
        value={values.subTrainingId}
        options={subTrainings}
        onChange={(subTrainingId) => onChange({ ...values, subTrainingId })}
        required
      />
      <DateField
        id="publish-validity-from"
        label="Validity from"
        value={values.validityFrom}
        onChange={(validityFrom) => onChange({ ...values, validityFrom })}
        required
      />
      <DateField
        id="publish-validity-to"
        label="Validity to"
        value={values.validityTo}
        onChange={(validityTo) => onChange({ ...values, validityTo })}
        minDate={validityFromDate}
        required
      />
      <div className="space-y-2">
        <Label htmlFor="publish-employee-count">No of employee</Label>
        <Input
          id="publish-employee-count"
          type="number"
          min={1}
          value={values.employeeCount}
          onChange={(event) =>
            onChange({ ...values, employeeCount: event.target.value })
          }
          placeholder="Enter number of employees"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="publish-purpose">Purpose of assign</Label>
        <Select
          value={values.purpose || undefined}
          onValueChange={(purpose) =>
            onChange({ ...values, purpose: purpose as AssignPurpose })
          }
          required
        >
          <SelectTrigger id="publish-purpose" aria-label="Purpose of assign">
            <SelectValue placeholder="Select purpose" />
          </SelectTrigger>
          <SelectContent>
            {PURPOSE_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-end md:col-span-3">
        <Button type="submit" className="min-w-28" disabled={pending}>
          {pending ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  );
}
