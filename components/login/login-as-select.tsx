"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import type { LoginRole } from "@/out/auth";

const ROLES: { value: LoginRole; label: string }[] = [
  { value: "admin", label: "Admin" },
  { value: "trainer", label: "Trainer" },
  { value: "employee", label: "Employee" },
];

type LoginAsSelectProps = {
  value: LoginRole | null;
  onChange: (value: LoginRole) => void;
};

export function LoginAsSelect({ value, onChange }: LoginAsSelectProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="login-as">Login As</Label>
      <Select
        value={value ?? undefined}
        onValueChange={(next) => onChange(next as LoginRole)}
      >
        <SelectTrigger id="login-as" aria-label="Login As">
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          {ROLES.map((role) => (
            <SelectItem key={role.value} value={role.value}>
              {role.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
