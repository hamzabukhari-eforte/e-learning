"use client";

import { SearchableSelect } from "@/components/registration/searchable-select";
import type { SelectOption } from "@/data/registration/types";

type AssignTrainerFieldsProps = {
  trainerId: string;
  trainers: SelectOption[];
  onTrainerChange: (trainerId: string) => void;
};

export function AssignTrainerFields({
  trainerId,
  trainers,
  onTrainerChange,
}: AssignTrainerFieldsProps) {
  return (
    <div className="max-w-md">
      <SearchableSelect
        id="assign-trainer"
        label="Select Trainer"
        placeholder="Select trainer"
        searchPlaceholder="Search trainer..."
        value={trainerId}
        options={trainers}
        onChange={onTrainerChange}
        required
      />
    </div>
  );
}
