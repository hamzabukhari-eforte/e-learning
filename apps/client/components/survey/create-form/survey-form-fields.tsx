"use client";

import type { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormActions } from "@/components/system-setup/form-actions";
import { QuestionTypeSelect } from "@/components/survey/question-type-select";
import type { QuestionType, SurveyFormInput } from "@/data/survey/types";

type SurveyFormFieldsProps = {
  values: SurveyFormInput;
  onChange: (values: SurveyFormInput) => void;
  isEditing: boolean;
  pending?: boolean;
  error?: string | null;
  onSelectQuestions: () => void;
  onSubmit: () => void;
  onCancel: () => void;
};

export function SurveyFormFields({
  values,
  onChange,
  isEditing,
  pending,
  error,
  onSelectQuestions,
  onSubmit,
  onCancel,
}: SurveyFormFieldsProps) {
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onSubmit();
  }

  function handleTypeChange(questionType: QuestionType) {
    onChange({ ...values, questionType, questions: [] });
  }

  return (
    <form className="grid gap-4 md:grid-cols-3" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <Label htmlFor="form-name">Form Name</Label>
        <Input
          id="form-name"
          value={values.name}
          onChange={(event) => onChange({ ...values, name: event.target.value })}
          placeholder="Enter form name"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="question-limit">Number of Questions</Label>
        <Input
          id="question-limit"
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
        id="form-question-type"
        label="Type of Questions"
        value={values.questionType}
        onChange={handleTypeChange}
      />
      <div className="flex flex-wrap items-center justify-end gap-3 md:col-span-3">
        {values.questions.length > 0 ? (
          <p className="mr-auto text-sm text-[#042954]">
            {values.questions.length} question(s) selected
          </p>
        ) : null}
        <Button
          type="button"
          variant="outline"
          className="min-w-36"
          onClick={onSelectQuestions}
        >
          Select Questions
        </Button>
      </div>
      {error ? (
        <p className="text-sm text-red-600 md:col-span-3">{error}</p>
      ) : null}
      <div className="md:col-span-3">
        <FormActions isEditing={isEditing} pending={pending} onCancel={onCancel} />
      </div>
    </form>
  );
}
