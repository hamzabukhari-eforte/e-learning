"use client";

import type { FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatusSelect } from "@/components/system-setup/status-select";
import { FormActions } from "@/components/system-setup/form-actions";
import type { EntityStatus } from "@/data/system-setup/types";

export type CountryFormValues = {
  name: string;
  status: EntityStatus;
};

type CountryFormProps = {
  values: CountryFormValues;
  onChange: (values: CountryFormValues) => void;
  isEditing: boolean;
  pending?: boolean;
  onSubmit: () => void;
  onCancel: () => void;
};

export function CountryForm({
  values,
  onChange,
  isEditing,
  pending,
  onSubmit,
  onCancel,
}: CountryFormProps) {
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <Label htmlFor="country-name">Country Name</Label>
        <Input
          id="country-name"
          value={values.name}
          onChange={(event) =>
            onChange({ ...values, name: event.target.value })
          }
          placeholder="Enter country name"
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
