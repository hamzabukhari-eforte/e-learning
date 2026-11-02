"use client";

import { Checkbox } from "@/components/ui/checkbox";
import type { SelectOption } from "@/data/registration/types";

type SearchableMultiOptionsProps = {
  options: SelectOption[];
  values: string[];
  onToggle: (id: string) => void;
};

export function SearchableMultiOptions({
  options,
  values,
  onToggle,
}: SearchableMultiOptionsProps) {
  if (options.length === 0) {
    return <p className="px-2 py-2 text-sm text-zinc-500">No results</p>;
  }

  return (
    <ul className="max-h-48 overflow-auto">
      {options.map((option) => (
        <li key={option.id}>
          <label className="flex cursor-pointer items-center gap-2 rounded px-2 py-2 text-sm hover:bg-[#042954]/5">
            <Checkbox
              checked={values.includes(option.id)}
              onCheckedChange={() => onToggle(option.id)}
            />
            {option.label}
          </label>
        </li>
      ))}
    </ul>
  );
}
