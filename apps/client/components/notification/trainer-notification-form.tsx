"use client";

import type { FormEvent } from "react";
import { DateRangeField } from "@/components/reports/date-range-field";
import { SearchableSelect } from "@/components/registration/searchable-select";
import { FormActions } from "@/components/system-setup/form-actions";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { TrainerNotificationInput } from "@/data/notification/trainer-types";
import type { SelectOption } from "@/data/registration/types";

const MAX_LENGTH = 1000;

type TrainerNotificationFormProps = {
  values: TrainerNotificationInput;
  trainings: SelectOption[];
  subTrainings: SelectOption[];
  isEditing: boolean;
  pending?: boolean;
  error?: string | null;
  onChange: (values: TrainerNotificationInput) => void;
  onSubmit: () => void;
  onCancel: () => void;
};

export function TrainerNotificationForm({
  values,
  trainings,
  subTrainings,
  isEditing,
  pending,
  error,
  onChange,
  onSubmit,
  onCancel,
}: TrainerNotificationFormProps) {
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
      <DateRangeField
        id="trainer-notification-date-range"
        label="Date Range (to show the list of employees)"
        dateFrom={values.dateFrom}
        dateTo={values.dateTo}
        onChange={(range) => onChange({ ...values, ...range })}
        required
      />
      <SearchableSelect
        id="trainer-notification-training"
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
        id="trainer-notification-subtraining"
        label="Select Subtraining"
        placeholder="Select subtraining"
        searchPlaceholder="Search subtraining..."
        value={values.subTrainingId}
        options={subTrainings}
        onChange={(subTrainingId) => onChange({ ...values, subTrainingId })}
        required
      />
      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="trainer-notification-text">Notification Text</Label>
        <Textarea
          id="trainer-notification-text"
          value={values.text}
          maxLength={MAX_LENGTH}
          required
          rows={4}
          placeholder="Enter notification text"
          onChange={(event) =>
            onChange({
              ...values,
              text: event.target.value.slice(0, MAX_LENGTH),
            })
          }
        />
        <p className="text-right text-xs text-zinc-500">
          {values.text.length}/{MAX_LENGTH}
        </p>
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
