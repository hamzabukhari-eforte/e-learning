"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SequenceSelectProps = {
  value: number | "";
  max: number;
  disabled?: boolean;
  onChange: (value: number) => void;
};

export function SequenceSelect({
  value,
  max,
  disabled,
  onChange,
}: SequenceSelectProps) {
  const options = Array.from({ length: max }, (_, index) => index + 1);

  return (
    <Select
      value={value ? String(value) : undefined}
      onValueChange={(next) => onChange(Number(next))}
      disabled={disabled}
    >
      <SelectTrigger
        aria-label="Question Sequence"
        className="h-10 min-w-24"
        onClick={(event) => event.stopPropagation()}
      >
        <SelectValue placeholder="Sequence" />
      </SelectTrigger>
      <SelectContent className="z-[80]">
        {options.map((option) => (
          <SelectItem key={option} value={String(option)}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
