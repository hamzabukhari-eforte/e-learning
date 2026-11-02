"use client";

import type { FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatusSelect } from "@/components/system-setup/status-select";
import { FormActions } from "@/components/system-setup/form-actions";
import type { EntityStatus } from "@/data/system-setup/types";

export type TrainingFormValues = {
  trainingId: string;
  name: string;
  status: EntityStatus;
};

type TrainingFormProps = {
  values: TrainingFormValues;
  onChange: (values: TrainingFormValues) => void;
  isEditing: boolean;
  pending?: boolean;
  onSubmit: () => void;
  onCancel: () => void;
};

export function TrainingForm({
  values,
  onChange,
  isEditing,
  pending,
  onSubmit,
  onCancel,
}: TrainingFormProps) {
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form className="grid gap-4 md:grid-cols-3" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <Label htmlFor="training-id">Training ID</Label>
        <Input
          id="training-id"
          value={values.trainingId}
          onChange={(event) =>
            onChange({ ...values, trainingId: event.target.value })
          }
          placeholder="Enter training ID"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="training-name">Training Name</Label>
        <Input
          id="training-name"
          value={values.name}
          onChange={(event) =>
            onChange({ ...values, name: event.target.value })
          }
          placeholder="Enter training name"
          required
        />
      </div>
      <StatusSelect
        value={values.status}
        onChange={(status) => onChange({ ...values, status })}
      />
      <div className="md:col-span-3">
        <FormActions
          isEditing={isEditing}
          pending={pending}
          onCancel={onCancel}
        />
      </div>
    </form>
  );
}
