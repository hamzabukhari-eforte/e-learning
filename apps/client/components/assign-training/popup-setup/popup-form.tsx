"use client";

import type { FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatusSelect } from "@/components/system-setup/status-select";
import { FormActions } from "@/components/system-setup/form-actions";
import type { PopupSetupInput } from "@/data/assign-training/popup-setup";

function twoDigits(value: string) {
  return value.replace(/\D/g, "").slice(0, 2);
}

type PopupFormProps = {
  values: PopupSetupInput;
  onChange: (values: PopupSetupInput) => void;
  isEditing: boolean;
  pending?: boolean;
  onSubmit: () => void;
  onCancel: () => void;
};

export function PopupForm({
  values,
  onChange,
  isEditing,
  pending,
  onSubmit,
  onCancel,
}: PopupFormProps) {
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form className="grid gap-4 md:grid-cols-3" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <Label htmlFor="popup-minutes">Minutes</Label>
        <Input
          id="popup-minutes"
          type="text"
          inputMode="numeric"
          maxLength={2}
          pattern="[0-9]{1,2}"
          value={values.minutes}
          onChange={(e) =>
            onChange({ ...values, minutes: twoDigits(e.target.value) })
          }
          placeholder="e.g. 05"
          required
        />
        <p className="text-xs text-zinc-500">
          How many minutes later the popup will appear (max 2 digits)
        </p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="popup-seconds">Seconds</Label>
        <Input
          id="popup-seconds"
          type="text"
          inputMode="numeric"
          maxLength={2}
          pattern="[0-9]{1,2}"
          value={values.seconds}
          onChange={(e) =>
            onChange({ ...values, seconds: twoDigits(e.target.value) })
          }
          placeholder="e.g. 30"
          required
        />
        <p className="text-xs text-zinc-500">
          How many seconds the popup will last (max 2 digits)
        </p>
      </div>
      <StatusSelect
        id="popup-status"
        value={values.status}
        onChange={(status) => onChange({ ...values, status })}
      />
      <div className="md:col-span-3">
        <FormActions isEditing={isEditing} pending={pending} onCancel={onCancel} />
      </div>
    </form>
  );
}
