"use client";

import type { FormEvent } from "react";
import { SearchableMultiSelect } from "@/components/registration/searchable-multi-select";
import { SearchableSelect } from "@/components/registration/searchable-select";
import { DateTimeField } from "@/components/survey/send-form/datetime-field";
import { FormActions } from "@/components/system-setup/form-actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { GroupChatInput } from "@/data/group-chat/types";
import type { SelectOption } from "@/data/registration/types";

type GroupChatFormProps = {
  values: GroupChatInput;
  departments: SelectOption[];
  employees: SelectOption[];
  isEditing: boolean;
  pending?: boolean;
  error?: string | null;
  onChange: (values: GroupChatInput) => void;
  onSubmit: () => void;
  onCancel: () => void;
};

export function GroupChatForm({
  values,
  departments,
  employees,
  isEditing,
  pending,
  error,
  onChange,
  onSubmit,
  onCancel,
}: GroupChatFormProps) {
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
      <DateTimeField
        id="group-chat-end"
        label="Conversation End date and time"
        value={values.endAt}
        disablePast
        onChange={(endAt) => onChange({ ...values, endAt })}
        required
      />
      <div className="space-y-2">
        <Label htmlFor="group-chat-title">Title</Label>
        <Input
          id="group-chat-title"
          value={values.title}
          onChange={(event) =>
            onChange({ ...values, title: event.target.value })
          }
          placeholder="Enter group title"
          required
        />
      </div>
      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="group-chat-description">Description</Label>
        <Textarea
          id="group-chat-description"
          value={values.description}
          onChange={(event) =>
            onChange({ ...values, description: event.target.value })
          }
          placeholder="Enter description"
          rows={3}
          required
        />
      </div>
      <SearchableSelect
        id="group-chat-department"
        label="Select Department"
        placeholder="Select department"
        searchPlaceholder="Search department..."
        value={values.departmentId}
        options={departments}
        onChange={(departmentId) =>
          onChange({ ...values, departmentId, employeeIds: [] })
        }
        required
      />
      <SearchableMultiSelect
        id="group-chat-employees"
        label="Select Employees"
        placeholder="Select employees"
        searchPlaceholder="Search employee..."
        values={values.employeeIds}
        options={employees}
        onChange={(employeeIds) => onChange({ ...values, employeeIds })}
        required
      />
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
