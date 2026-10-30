"use client";

import type { FormEvent } from "react";
import { DateRangeField } from "@/components/reports/date-range-field";
import { SearchableSelect } from "@/components/registration/searchable-select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FEEDBACK_STATUS_OPTIONS,
  type AssignFeedbackInput,
  type FeedbackStatus,
} from "@/data/feedback/types";
import type { SelectOption } from "@/data/registration/types";

type AssignFeedbackFormProps = {
  values: AssignFeedbackInput;
  trainings: SelectOption[];
  subTrainings: SelectOption[];
  assignedTrainings: SelectOption[];
  employees: SelectOption[];
  pending?: boolean;
  error?: string | null;
  onChange: (values: AssignFeedbackInput) => void;
  onSubmit: () => void;
};

export function AssignFeedbackForm({
  values,
  trainings,
  subTrainings,
  assignedTrainings,
  employees,
  pending,
  error,
  onChange,
  onSubmit,
}: AssignFeedbackFormProps) {
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
      <SearchableSelect
        id="feedback-training"
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
        id="feedback-subtraining"
        label="Select Sub-training"
        placeholder="Select sub-training"
        searchPlaceholder="Search sub-training..."
        value={values.subTrainingId}
        options={subTrainings}
        onChange={(subTrainingId) =>
          onChange({ ...values, subTrainingId, assignedTrainingId: "" })
        }
        required
      />
      <DateRangeField
        id="feedback-date-range"
        label="Date Range (Training start and end)"
        dateFrom={values.dateFrom}
        dateTo={values.dateTo}
        onChange={(range) =>
          onChange({ ...values, ...range, assignedTrainingId: "" })
        }
        required
      />
      <SearchableSelect
        id="feedback-assigned-training"
        label="Assigned Trainings by Date Range"
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
        id="feedback-employee"
        label="Select Employee"
        placeholder="Select employee"
        searchPlaceholder="Search employee..."
        value={values.employeeId}
        options={employees}
        onChange={(employeeId) => onChange({ ...values, employeeId })}
        required
      />
      <div className="space-y-2">
        <Label htmlFor="feedback-status">Select Feedback OK Status</Label>
        <Select
          value={values.status || undefined}
          onValueChange={(status) =>
            onChange({ ...values, status: status as FeedbackStatus })
          }
          required
        >
          <SelectTrigger id="feedback-status" aria-label="Feedback status">
            <SelectValue placeholder="Select feedback status" />
          </SelectTrigger>
          <SelectContent>
            {FEEDBACK_STATUS_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="feedback-details">Feedback Details</Label>
        <Textarea
          id="feedback-details"
          value={values.details}
          onChange={(event) =>
            onChange({ ...values, details: event.target.value })
          }
          placeholder="Enter feedback details"
          rows={4}
          required
        />
      </div>
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
