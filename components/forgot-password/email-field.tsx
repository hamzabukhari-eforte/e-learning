"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type EmailFieldProps = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

export function EmailField({ value, onChange, disabled }: EmailFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="reset-email">Email</Label>
      <Input
        id="reset-email"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="Enter Email Address"
        className="border-zinc-200 bg-zinc-100"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
        required
      />
    </div>
  );
}
