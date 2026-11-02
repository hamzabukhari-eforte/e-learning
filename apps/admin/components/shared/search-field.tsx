"use client";

import { Input } from "@/components/ui/input";

type SearchFieldProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function SearchField({
  value,
  onChange,
  placeholder = "Search...",
}: SearchFieldProps) {
  return (
    <Input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="max-w-xs"
    />
  );
}
