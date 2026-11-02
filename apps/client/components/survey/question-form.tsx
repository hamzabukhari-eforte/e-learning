"use client";

import type { FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormActions } from "@/components/system-setup/form-actions";
import { McqOptions } from "@/components/survey/mcq-options";
import { QuestionFileField } from "@/components/survey/question-file-field";
import { QuestionTypeSelect } from "@/components/survey/question-type-select";
import {
  EMPTY_MCQ_OPTIONS,
  type QuestionType,
  type SurveyQuestionInput,
} from "@/data/survey/types";

type QuestionFormProps = {
  values: SurveyQuestionInput;
  onChange: (values: SurveyQuestionInput) => void;
  isEditing: boolean;
  pending?: boolean;
  error?: string | null;
  onSubmit: () => void;
  onCancel: () => void;
};

export function QuestionForm({
  values,
  onChange,
  isEditing,
  pending,
  error,
  onSubmit,
  onCancel,
}: QuestionFormProps) {
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onSubmit();
  }

  function handleTypeChange(type: QuestionType) {
    onChange({
      ...values,
      type,
      options:
        type === "mcq"
          ? values.type === "mcq"
            ? values.options
            : EMPTY_MCQ_OPTIONS
          : [],
    });
  }

  return (
    <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
      <QuestionTypeSelect value={values.type} onChange={handleTypeChange} />
      <QuestionFileField
        fileName={values.fileName}
        onChange={(fileName) => onChange({ ...values, fileName })}
      />
      {values.type ? (
        <>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="question-text">Question</Label>
            <Input
              id="question-text"
              value={values.question}
              onChange={(event) =>
                onChange({ ...values, question: event.target.value })
              }
              placeholder="Enter question"
              required
            />
          </div>
          {values.type === "mcq" ? (
            <div className="md:col-span-2">
              <McqOptions
                options={values.options}
                onChange={(options) => onChange({ ...values, options })}
              />
            </div>
          ) : null}
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
        </>
      ) : null}
    </form>
  );
}
