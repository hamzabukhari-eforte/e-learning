"use client";

import type { FormEvent } from "react";
import { SearchableSelect } from "@/components/registration/searchable-select";
import { QuestionTypeSelect } from "@/components/survey/question-type-select";
import { FormActions } from "@/components/system-setup/form-actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ExamQuizInput } from "@/data/exams/types";
import type { SelectOption } from "@/data/registration/types";
import type { QuestionType } from "@/data/survey/types";

type CreateQuizFormProps = {
  values: ExamQuizInput;
  trainings: SelectOption[];
  subTrainings: SelectOption[];
  onChange: (values: ExamQuizInput) => void;
  isEditing: boolean;
  pending?: boolean;
  error?: string | null;
  onSubmit: () => void;
  onCancel: () => void;
};

export function CreateQuizForm({
  values,
  trainings,
  subTrainings,
  onChange,
  isEditing,
  pending,
  error,
  onSubmit,
  onCancel,
}: CreateQuizFormProps) {
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
      <SearchableSelect
        id="quiz-training"
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
        id="quiz-subtraining"
        label="Select Sub Training"
        placeholder="Select sub training"
        searchPlaceholder="Search sub training..."
        value={values.subTrainingId}
        options={subTrainings}
        onChange={(subTrainingId) => onChange({ ...values, subTrainingId })}
        required
      />
      <div className="space-y-2">
        <Label htmlFor="quiz-question-limit">
          No of question allowed in this paper
        </Label>
        <Input
          id="quiz-question-limit"
          type="number"
          min={1}
          value={values.questionLimit}
          onChange={(event) =>
            onChange({ ...values, questionLimit: event.target.value })
          }
          placeholder="Enter number of questions"
          required
        />
      </div>
      <QuestionTypeSelect
        id="quiz-question-type"
        label="Type of questions you want to add in this paper"
        value={values.questionType}
        onChange={(questionType: QuestionType) =>
          onChange({ ...values, questionType })
        }
      />
      {error ? (
        <p className="text-sm text-red-600 md:col-span-2">{error}</p>
      ) : null}
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
