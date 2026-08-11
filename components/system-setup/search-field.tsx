"use client";

import { FaMagnifyingGlass } from "react-icons/fa6";
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
    <div className="relative max-w-sm">
      <FaMagnifyingGlass
        className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-[#FFA901]"
        aria-hidden
      />
      <Input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="pl-9"
        aria-label="Search"
      />
    </div>
  );
}
