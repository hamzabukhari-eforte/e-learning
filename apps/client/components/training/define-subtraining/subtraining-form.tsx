"use client";

import type { FormEvent } from "react";
import { SearchableSelect } from "@/components/registration/searchable-select";
import { FormActions } from "@/components/system-setup/form-actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { SelectOption } from "@/data/registration/types";

export type SubtrainingFormValues = {
  trainingId: string;
  title: string;
  description: string;
  studyMaterialName: string;
};

type SubtrainingFormProps = {
  values: SubtrainingFormValues;
  trainings: SelectOption[];
  onChange: (values: SubtrainingFormValues) => void;
  isEditing: boolean;
  pending?: boolean;
  onSubmit: () => void;
  onCancel: () => void;
};

export function SubtrainingForm({
  values,
  trainings,
  onChange,
  isEditing,
  pending,
  onSubmit,
  onCancel,
}: SubtrainingFormProps) {
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
      <SearchableSelect
        id="subtraining-training"
        label="Training Courses List"
        placeholder="Select training course"
        searchPlaceholder="Search training..."
        value={values.trainingId}
        options={trainings}
        onChange={(trainingId) => onChange({ ...values, trainingId })}
        required
      />
      <div className="space-y-2">
        <Label htmlFor="subtraining-title">Subtraining title</Label>
        <Input
          id="subtraining-title"
          value={values.title}
          onChange={(event) =>
            onChange({ ...values, title: event.target.value })
          }
          placeholder="Enter subtraining title"
          required
        />
      </div>
      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="subtraining-description">Subtraining description</Label>
        <Textarea
          id="subtraining-description"
          value={values.description}
          onChange={(event) =>
            onChange({ ...values, description: event.target.value })
          }
          placeholder="Enter subtraining description"
          rows={4}
          required
        />
      </div>
      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="subtraining-material">Add study material</Label>
        <input
          id="subtraining-material"
          type="file"
          className="block h-11 w-full cursor-pointer text-sm text-zinc-600 file:mr-3 file:h-10 file:cursor-pointer file:rounded-md file:border-0 file:bg-[#042954] file:px-3 file:text-sm file:font-medium file:text-white"
          onChange={(event) =>
            onChange({
              ...values,
              studyMaterialName: event.target.files?.[0]?.name ?? "",
            })
          }
        />
        {values.studyMaterialName ? (
          <p className="text-xs text-zinc-500">{values.studyMaterialName}</p>
        ) : null}
      </div>
      <div className="md:col-span-2">
        <FormActions
          isEditing={isEditing}
          pending={pending}
          onCancel={onCancel}
        />
      </div>
    </form>
  );
}
