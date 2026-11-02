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
import type {
  PlatformUserInput,
  PlatformUserRole,
  PlatformUserStatus,
} from "@/data/users/types";

type UserFieldsProps = {
  values: PlatformUserInput;
  pending?: boolean;
  error?: string | null;
  isEditing?: boolean;
  onChange: (values: PlatformUserInput) => void;
  onSubmit: () => void;
  onCancel?: () => void;
};

export function UserFields({
  values,
  pending,
  error,
  isEditing,
  onChange,
  onSubmit,
  onCancel,
}: UserFieldsProps) {
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <Label htmlFor="user-name">Full Name</Label>
        <Input
          id="user-name"
          value={values.name}
          onChange={(e) => onChange({ ...values, name: e.target.value })}
          placeholder="Full name"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="user-login">Login ID</Label>
        <Input
          id="user-login"
          value={values.loginId}
          onChange={(e) => onChange({ ...values, loginId: e.target.value })}
          placeholder="login.id"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="user-email">Email</Label>
        <Input
          id="user-email"
          type="email"
          value={values.email}
          onChange={(e) => onChange({ ...values, email: e.target.value })}
          placeholder="user@example.com"
          required
        />
      </div>
      <div className="space-y-2">
        <Label>Role</Label>
        <Select
          value={values.role}
          onValueChange={(next) =>
            onChange({ ...values, role: next as PlatformUserRole })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="trainer">Trainer</SelectItem>
            <SelectItem value="employee">Employee</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Status</Label>
        <Select
          value={values.status}
          onValueChange={(next) =>
            onChange({ ...values, status: next as PlatformUserStatus })
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
          createLabel="Create User"
          updateLabel="Update User"
          onCancel={onCancel}
        />
      </div>
    </form>
  );
}
