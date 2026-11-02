"use client";

import type { FormEvent } from "react";
import { FormActions } from "@/components/shared/form-actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { DomainInput, DomainStatus } from "@/data/domains/types";

type DomainFieldsProps = {
  values: DomainInput;
  pending?: boolean;
  error?: string | null;
  isEditing?: boolean;
  onChange: (values: DomainInput) => void;
  onSubmit: () => void;
  onCancel?: () => void;
};

export function DomainFields({
  values,
  pending,
  error,
  isEditing,
  onChange,
  onSubmit,
  onCancel,
}: DomainFieldsProps) {
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <Label htmlFor="domain-name">Domain Name</Label>
        <Input
          id="domain-name"
          value={values.name}
          onChange={(e) => onChange({ ...values, name: e.target.value })}
          placeholder="e.g. Information Technology, CMU"
          required
        />
      </div>
      <div className="space-y-2">
        <Label>Status</Label>
        <Select
          value={values.status}
          onValueChange={(next) =>
            onChange({ ...values, status: next as DomainStatus })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-3 md:col-span-2">
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <FormActions
          isEditing={Boolean(isEditing)}
          pending={pending}
          createLabel="Create Domain"
          updateLabel="Update Domain"
          onCancel={onCancel}
        />
      </div>
    </form>
  );
}
