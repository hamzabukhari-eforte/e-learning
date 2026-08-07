"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type VerificationCodeFieldProps = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

export function VerificationCodeField({
  value,
  onChange,
  disabled,
}: VerificationCodeFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="verification-code">Verification Code</Label>
      <Input
        id="verification-code"
        name="verificationCode"
        inputMode="numeric"
        autoComplete="one-time-code"
        placeholder="Enter Verification Code"
        className="border-zinc-200 bg-zinc-100"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
        required
      />
    </div>
  );
}
