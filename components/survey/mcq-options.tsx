"use client";

import { FaTrash } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type McqOptionsProps = {
  options: string[];
  onChange: (options: string[]) => void;
};

export function McqOptions({ options, onChange }: McqOptionsProps) {
  function updateOption(index: number, value: string) {
    onChange(options.map((option, i) => (i === index ? value : option)));
  }

  function removeOption(index: number) {
    onChange(options.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-3">
      <Label>Options</Label>
      <div className="space-y-2">
        {options.map((option, index) => (
          <div key={index} className="flex items-center gap-2">
            <Input
              value={option}
              onChange={(event) => updateOption(index, event.target.value)}
              placeholder={`Option ${index + 1}`}
              required={index < 2}
            />
            <button
              type="button"
              className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-md text-red-600 hover:bg-red-50"
              onClick={() => removeOption(index)}
              aria-label={`Delete option ${index + 1}`}
            >
              <FaTrash className="size-3.5" />
            </button>
          </div>
        ))}
      </div>
      <Button
        type="button"
        variant="outline"
        className="min-w-28"
        onClick={() => onChange([...options, ""])}
      >
        Add Options
      </Button>
    </div>
  );
}
