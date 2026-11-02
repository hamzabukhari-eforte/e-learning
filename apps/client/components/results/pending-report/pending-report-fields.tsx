"use client";

import type { FormEvent } from "react";
import { DateRangeField } from "@/components/reports/date-range-field";
import { SearchableSelect } from "@/components/registration/searchable-select";
import { Button } from "@/components/ui/button";
import type { PendingResultFilter } from "@/data/results/types";
import type { SelectOption } from "@/data/registration/types";

type PendingReportFieldsProps = {
  values: PendingResultFilter;
  trainings: SelectOption[];
  subTrainings: SelectOption[];
  quizzes: SelectOption[];
  pending?: boolean;
  error?: string | null;
  onChange: (values: PendingResultFilter) => void;
  onSubmit: () => void;
};

export function PendingReportFields({
  values,
  trainings,
  subTrainings,
  quizzes,
  pending,
  error,
  onChange,
  onSubmit,
}: PendingReportFieldsProps) {
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
      <DateRangeField
        id="pending-date-range"
        label="Date Range"
        dateFrom={values.dateFrom}
        dateTo={values.dateTo}
        onChange={(range) => onChange({ ...values, ...range })}
      />
      <SearchableSelect
        id="pending-training"
        label="Select Training"
        placeholder="Select training"
        searchPlaceholder="Search training..."
        value={values.trainingId}
        options={trainings}
        onChange={(trainingId) =>
          onChange({
            ...values,
            trainingId,
            subTrainingId: "",
            quizId: "",
          })
        }
      />
      <SearchableSelect
        id="pending-subtraining"
        label="Select Sub training"
        placeholder="Select sub training"
        searchPlaceholder="Search sub training..."
        value={values.subTrainingId}
        options={subTrainings}
        onChange={(subTrainingId) =>
          onChange({ ...values, subTrainingId, quizId: "" })
        }
      />
      <SearchableSelect
        id="pending-quiz"
        label="Select Quiz"
        placeholder="Select quiz"
        searchPlaceholder="Search quiz..."
        value={values.quizId}
        options={quizzes}
        onChange={(quizId) => onChange({ ...values, quizId })}
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
