"use client";

import type { FormEvent } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { FormActions } from "@/components/system-setup/form-actions";
import { StatusSelect } from "@/components/system-setup/status-select";
import { SearchableSelect } from "@/components/registration/searchable-select";
import type {
  SelectOption,
  TrainerInput,
  TrainerType,
} from "@/data/registration/types";

type TrainerFormProps = {
  values: TrainerInput;
  employees: SelectOption[];
  onChange: (values: TrainerInput) => void;
  isEditing: boolean;
  pending?: boolean;
  onSubmit: () => void;
  onCancel: () => void;
};

export function TrainerForm({
  values,
  employees,
  onChange,
  isEditing,
  pending,
  onSubmit,
  onCancel,
}: TrainerFormProps) {
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form className="grid gap-4 md:grid-cols-3" onSubmit={handleSubmit}>
      <SearchableSelect
        id="trainer-employee"
        label="Employee"
        placeholder="Select employee"
        value={values.employeeId}
        options={employees}
        onChange={(employeeId) => onChange({ ...values, employeeId })}
        required
      />
      <div className="space-y-2">
        <Label htmlFor="trainer-type">Trainer Type</Label>
        <Select
          value={values.trainerType || undefined}
          onValueChange={(trainerType) =>
            onChange({ ...values, trainerType: trainerType as TrainerType })
          }
        >
          <SelectTrigger id="trainer-type" aria-label="Trainer Type">
            <SelectValue placeholder="Select trainer type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="master">Master</SelectItem>
            <SelectItem value="departmental">Departmental</SelectItem>
          </SelectContent>
        </Select>
        <input
          className="sr-only"
          value={values.trainerType}
          required
          readOnly
          tabIndex={-1}
          aria-hidden
        />
      </div>
      <StatusSelect
        value={values.status}
        onChange={(status) => onChange({ ...values, status })}
        id="trainer-status"
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
