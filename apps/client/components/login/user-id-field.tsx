"use client";

import { FaUser } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type UserIdFieldProps = {
  value: string;
  onChange: (value: string) => void;
};

export function UserIdField({ value, onChange }: UserIdFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="user-id">User ID</Label>
      <div className="relative">
        <FaUser
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#FFA901]"
          aria-hidden
        />
        <Input
          id="user-id"
          name="userId"
          autoComplete="username"
          placeholder="Enter your user ID"
          className="pl-10"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          required
        />
      </div>
    </div>
  );
}
