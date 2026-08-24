"use client";

import type { FormEvent } from "react";
import { SearchableSelect } from "@/components/registration/searchable-select";
import { DateRangeField } from "@/components/reports/date-range-field";
import { Button } from "@/components/ui/button";
import type { TestHistoryFilter } from "@/data/reports/types";
import type { SelectOption } from "@/data/registration/types";

type TestHistoryFieldsProps = {
  values: TestHistoryFilter;
  trainings: SelectOption[];
  trainers: SelectOption[];
  subTrainings: SelectOption[];
  tests: SelectOption[];
  pending?: boolean;
  error?: string | null;
  onChange: (values: TestHistoryFilter) => void;
  onSubmit: () => void;
};

export function TestHistoryFields({
  values,
  trainings,
  trainers,
  subTrainings,
  tests,
  pending,
  error,
  onChange,
  onSubmit,
}: TestHistoryFieldsProps) {
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
      <DateRangeField
        id="history-date-range"
        label="Date Range"
        dateFrom={values.dateFrom}
        dateTo={values.dateTo}
        onChange={(range) => onChange({ ...values, ...range })}
        required
      />
      <SearchableSelect
        id="history-training"
        label="Select Training"
        placeholder="Select training"
        searchPlaceholder="Search training..."
        value={values.trainingId}
        options={trainings}
        onChange={(trainingId) =>
          onChange({ ...values, trainingId, subTrainingId: "", testId: "" })
        }
        required
      />
      <SearchableSelect
        id="history-trainer"
        label="Select Trainer"
        placeholder="Select trainer"
        searchPlaceholder="Search trainer..."
        value={values.trainerId}
        options={trainers}
        onChange={(trainerId) => onChange({ ...values, trainerId })}
        required
      />
      <SearchableSelect
        id="history-sub-training"
        label="Select Sub Training"
        placeholder="Select sub training"
        searchPlaceholder="Search sub training..."
        value={values.subTrainingId}
        options={subTrainings}
        onChange={(subTrainingId) =>
          onChange({ ...values, subTrainingId, testId: "" })
        }
        required
      />
      <SearchableSelect
        id="history-test"
        label="Select Test"
        placeholder="Select test"
        searchPlaceholder="Search test..."
        value={values.testId}
        options={tests}
        onChange={(testId) => onChange({ ...values, testId })}
        required
      />
      <div className="flex flex-col items-end justify-end gap-2">
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <Button type="submit" className="min-w-36" disabled={pending}>
          {pending ? "Loading..." : "Show Report"}
        </Button>
      </div>
    </form>
  );
}
