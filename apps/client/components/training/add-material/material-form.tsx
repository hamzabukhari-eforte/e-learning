"use client";

import type { FormEvent } from "react";
import { SearchableSelect } from "@/components/registration/searchable-select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MATERIAL_TYPE_OPTIONS,
  type MaterialType,
} from "@/data/training/types";
import type { SelectOption } from "@/data/registration/types";

export type MaterialFormValues = {
  trainingId: string;
  subTrainingId: string;
  materialType: MaterialType | "";
};

type MaterialFormProps = {
  values: MaterialFormValues;
  trainings: SelectOption[];
  subTrainings: SelectOption[];
  pending?: boolean;
  onChange: (values: MaterialFormValues) => void;
  onSubmit: () => void;
};

export function MaterialForm({
  values,
  trainings,
  subTrainings,
  pending,
  onChange,
  onSubmit,
}: MaterialFormProps) {
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form className="grid gap-4 md:grid-cols-3" onSubmit={handleSubmit}>
      <SearchableSelect
        id="material-training"
        label="Select Training"
        placeholder="Select training"
        searchPlaceholder="Search training..."
        value={values.trainingId}
        options={trainings}
        onChange={(trainingId) =>
          onChange({ trainingId, subTrainingId: "", materialType: values.materialType })
        }
        required
      />
      <SearchableSelect
        id="material-subtraining"
        label="Select Sub training"
        placeholder="Select sub training"
        searchPlaceholder="Search sub training..."
        value={values.subTrainingId}
        options={subTrainings}
        onChange={(subTrainingId) => onChange({ ...values, subTrainingId })}
        required
      />
      <div className="space-y-2">
        <Label htmlFor="material-type">Select material type</Label>
        <Select
          value={values.materialType || undefined}
          onValueChange={(materialType) =>
            onChange({ ...values, materialType: materialType as MaterialType })
          }
          required
        >
          <SelectTrigger id="material-type" aria-label="Material type">
            <SelectValue placeholder="Select material type" />
          </SelectTrigger>
          <SelectContent>
            {MATERIAL_TYPE_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-end md:col-span-3">
        <Button type="submit" className="min-w-28" disabled={pending}>
          {pending ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  );
}
