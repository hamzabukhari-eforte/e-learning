"use client";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type RadioOption<T extends string> = {
  value: T;
  label: string;
};

type RadioGroupProps<T extends string> = {
  name: string;
  label: string;
  value: T;
  options: RadioOption<T>[];
  onChange: (value: T) => void;
};

export function RadioGroup<T extends string>({
  name,
  label,
  value,
  options,
  onChange,
}: RadioGroupProps<T>) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex h-11 items-center gap-5">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex cursor-pointer items-center gap-2 text-sm text-black"
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className={cn(
                "size-4 cursor-pointer accent-[#042954]",
              )}
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
}
