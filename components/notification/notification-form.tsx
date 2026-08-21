"use client";

import type { FormEvent } from "react";
import { SearchableSelect } from "@/components/registration/searchable-select";
import { OptionSelect } from "@/components/registration/option-select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { NotificationInput } from "@/data/notification/types";
import type { SelectOption } from "@/data/registration/types";

const RECEIVER_OPTIONS: SelectOption[] = [
  { id: "all-employees", label: "Send to All Employees" },
  { id: "trainer", label: "Send to Trainer" },
];

const MAX_LENGTH = 1000;

type NotificationFormProps = {
  values: NotificationInput;
  departments: SelectOption[];
  pending?: boolean;
  onChange: (values: NotificationInput) => void;
  onSubmit: () => void;
};

export function NotificationForm({
  values,
  departments,
  pending,
  onChange,
  onSubmit,
}: NotificationFormProps) {
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
      <SearchableSelect
        id="notification-department"
        label="Select Department"
        placeholder="Select department"
        searchPlaceholder="Search department..."
        value={values.departmentId}
        options={departments}
        onChange={(departmentId) => onChange({ ...values, departmentId })}
        required
      />
      <OptionSelect
        id="notification-receiver"
        label="Select Notification Receiver Type"
        placeholder="Select receiver type"
        value={values.receiverType}
        options={RECEIVER_OPTIONS}
        onChange={(receiverType) =>
          onChange({
            ...values,
            receiverType: receiverType as NotificationInput["receiverType"],
          })
        }
      />
      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="notification-text">Notification Text</Label>
        <Textarea
          id="notification-text"
          value={values.text}
          maxLength={MAX_LENGTH}
          required
          placeholder="Enter notification text"
          onChange={(event) =>
            onChange({ ...values, text: event.target.value.slice(0, MAX_LENGTH) })
          }
        />
        <p className="text-right text-xs text-zinc-500">
          {values.text.length}/{MAX_LENGTH}
        </p>
      </div>
      <div className="flex justify-end md:col-span-2">
        <Button type="submit" className="min-w-28" disabled={pending}>
          {pending ? "Sending..." : "Send"}
        </Button>
      </div>
    </form>
  );
}
