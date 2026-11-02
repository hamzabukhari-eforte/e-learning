"use client";

import type { FormEvent } from "react";
import { DateRangeField } from "@/components/reports/date-range-field";
import { SearchableMultiSelect } from "@/components/registration/searchable-multi-select";
import { SearchableSelect } from "@/components/registration/searchable-select";
import { DateField } from "@/components/ui/date-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { AssignQuizInput, QuizAssignType } from "@/data/exams/types";
import { QUIZ_ASSIGN_TYPE_LABEL } from "@/data/exams/types";
import type { SelectOption } from "@/data/registration/types";

type AssignQuizFormProps = {
  values: AssignQuizInput;
  trainings: SelectOption[];
  subTrainings: SelectOption[];
  employees: SelectOption[];
  quizzes: SelectOption[];
  pending?: boolean;
  error?: string | null;
  onChange: (values: AssignQuizInput) => void;
  onSubmit: () => void;
};

export function AssignQuizForm({
  values,
  trainings,
  subTrainings,
  employees,
  quizzes,
  pending,
  error,
  onChange,
  onSubmit,
}: AssignQuizFormProps) {
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onSubmit();
  }

  const validityFromDate = values.validFrom
    ? new Date(values.validFrom)
    : undefined;

  return (
    <form className="grid gap-4 md:grid-cols-3" onSubmit={handleSubmit}>
      <DateRangeField
        id="assign-quiz-date-range"
        label="Date Range"
        dateFrom={values.dateFrom}
        dateTo={values.dateTo}
        onChange={(range) => onChange({ ...values, ...range })}
        required
      />
      <SearchableSelect
        id="assign-quiz-training"
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
        required
      />
      <SearchableSelect
        id="assign-quiz-subtraining"
        label="Select Sub Training"
        placeholder="Select sub training"
        searchPlaceholder="Search sub training..."
        value={values.subTrainingId}
        options={subTrainings}
        onChange={(subTrainingId) =>
          onChange({ ...values, subTrainingId, quizId: "" })
        }
        required
      />
      <SearchableMultiSelect
        id="assign-quiz-employee"
        label="Select Employee"
        placeholder="Select employees"
        searchPlaceholder="Search employee..."
        values={values.employeeIds}
        options={employees}
        onChange={(employeeIds) => onChange({ ...values, employeeIds })}
        required
      />
      <SearchableSelect
        id="assign-quiz-assessment"
        label="Select Quiz/Assessment"
        placeholder="Select quiz/assessment"
        searchPlaceholder="Search quiz..."
        value={values.quizId}
        options={quizzes}
        onChange={(quizId) => onChange({ ...values, quizId })}
        required
      />
      <div className="space-y-2">
        <Label htmlFor="assign-quiz-type">Quiz Type</Label>
        <Select
          value={values.quizType || undefined}
          onValueChange={(quizType) =>
            onChange({ ...values, quizType: quizType as QuizAssignType })
          }
          required
        >
          <SelectTrigger id="assign-quiz-type" aria-label="Quiz Type">
            <SelectValue placeholder="Select quiz type" />
          </SelectTrigger>
          <SelectContent>
            {(Object.keys(QUIZ_ASSIGN_TYPE_LABEL) as QuizAssignType[]).map(
              (type) => (
                <SelectItem key={type} value={type}>
                  {QUIZ_ASSIGN_TYPE_LABEL[type]}
                </SelectItem>
              ),
            )}
          </SelectContent>
        </Select>
      </div>
      <DateField
        id="assign-quiz-valid-from"
        label="Validity from"
        value={values.validFrom}
        onChange={(validFrom) => onChange({ ...values, validFrom })}
        required
      />
      <DateField
        id="assign-quiz-valid-to"
        label="Validity to"
        value={values.validTo}
        onChange={(validTo) => onChange({ ...values, validTo })}
        minDate={validityFromDate}
        required
      />
      <div className="space-y-2">
        <Label htmlFor="assign-quiz-email-subject">Email Subject</Label>
        <Input
          id="assign-quiz-email-subject"
          value={values.emailSubject}
          onChange={(event) =>
            onChange({ ...values, emailSubject: event.target.value })
          }
          placeholder="Enter email subject"
          required
        />
      </div>
      <div className="space-y-2 md:col-span-3">
        <Label htmlFor="assign-quiz-email-content">Email Content</Label>
        <Textarea
          id="assign-quiz-email-content"
          value={values.emailContent}
          onChange={(event) =>
            onChange({ ...values, emailContent: event.target.value })
          }
          placeholder="Enter email content"
          rows={4}
          required
        />
      </div>
      {error ? (
        <p className="text-sm text-red-600 md:col-span-3">{error}</p>
      ) : null}
      <div className="flex justify-end md:col-span-3">
        <Button type="submit" className="min-w-28" disabled={pending}>
          {pending ? "Assigning..." : "Assign"}
        </Button>
      </div>
    </form>
  );
}
