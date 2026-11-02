"use client";

import { useState } from "react";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type PasswordFieldProps = {
  value: string;
  onChange: (value: string) => void;
};

export function PasswordField({ value, onChange }: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="space-y-2">
      <Label htmlFor="password">Password</Label>
      <div className="relative">
        <FaLock
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#FFA901]"
          aria-hidden
        />
        <Input
          id="password"
          name="password"
          type={visible ? "text" : "password"}
          autoComplete="current-password"
          placeholder="Enter your password"
          className="px-10"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          required
        />
        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-zinc-500 hover:text-[#042954]"
          onClick={() => setVisible((prev) => !prev)}
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? (
            <FaEyeSlash className="size-4" />
          ) : (
            <FaEye className="size-4" />
          )}
        </button>
      </div>
    </div>
  );
}
