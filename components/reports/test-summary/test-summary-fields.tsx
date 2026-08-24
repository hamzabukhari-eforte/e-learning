"use client";

import type { FormEvent } from "react";
import { SearchableSelect } from "@/components/registration/searchable-select";
import { DateRangeField } from "@/components/reports/date-range-field";
import { Button } from "@/components/ui/button";
import type { TestSummaryFilter } from "@/data/reports/types";
import type { SelectOption } from "@/data/registration/types";

type TestSummaryFieldsProps = {
  values: TestSummaryFilter;
  trainings: SelectOption[];
  subTrainings: SelectOption[];
  trainers: SelectOption[];
  pending?: boolean;
  error?: string | null;
  idPrefix?: string;
  onChange: (values: TestSummaryFilter) => void;
  onSubmit: () => void;
};

export function TestSummaryFields({
  values,
  trainings,
  subTrainings,
  trainers,
  pending,
  error,
  idPrefix = "summary",
  onChange,
  onSubmit,
}: TestSummaryFieldsProps) {
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
      <DateRangeField
        id={`${idPrefix}-date-range`}
        label="Date Range"
        dateFrom={values.dateFrom}
        dateTo={values.dateTo}
        onChange={(range) => onChange({ ...values, ...range })}
        required
      />
      <SearchableSelect
        id={`${idPrefix}-training`}
        label="Select Training"
        placeholder="Select training"
        searchPlaceholder="Search training..."
        value={values.trainingId}
        options={trainings}
        onChange={(trainingId) =>
          onChange({ ...values, trainingId, subTrainingId: "" })
        }
        required
      />
      <SearchableSelect
        id={`${idPrefix}-sub-training`}
        label="Select Sub Training"
        placeholder="Select sub training"
        searchPlaceholder="Search sub training..."
        value={values.subTrainingId}
        options={subTrainings}
        onChange={(subTrainingId) => onChange({ ...values, subTrainingId })}
        required
      />
      <SearchableSelect
        id={`${idPrefix}-trainer`}
        label="Select Trainer"
        placeholder="Select trainer"
        searchPlaceholder="Search trainer..."
        value={values.trainerId}
        options={trainers}
        onChange={(trainerId) => onChange({ ...values, trainerId })}
        required
      />
      <div className="flex items-end justify-end md:col-span-2">
        <div className="flex w-full flex-col items-end gap-2">
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <Button type="submit" className="min-w-36" disabled={pending}>
            {pending ? "Loading..." : "Show Report"}
          </Button>
        </div>
      </div>
    </form>
  );
}
