"use client";

import type { FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatusSelect } from "@/components/system-setup/status-select";
import { FormActions } from "@/components/system-setup/form-actions";
import type { EntityStatus } from "@/data/system-setup/types";

export type NameStatusValues = {
  name: string;
  status: EntityStatus;
};

type NameStatusFormProps = {
  nameLabel: string;
  namePlaceholder: string;
  values: NameStatusValues;
  onChange: (values: NameStatusValues) => void;
  isEditing: boolean;
  pending?: boolean;
  onSubmit: () => void;
  onCancel: () => void;
};

export function NameStatusForm({
  nameLabel,
  namePlaceholder,
  values,
  onChange,
  isEditing,
  pending,
  onSubmit,
  onCancel,
}: NameStatusFormProps) {
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <Label htmlFor="entity-name">{nameLabel}</Label>
        <Input
          id="entity-name"
          value={values.name}
          onChange={(event) =>
            onChange({ ...values, name: event.target.value })
          }
          placeholder={namePlaceholder}
          required
        />
      </div>
      <StatusSelect
        value={values.status}
        onChange={(status) => onChange({ ...values, status })}
      />
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
