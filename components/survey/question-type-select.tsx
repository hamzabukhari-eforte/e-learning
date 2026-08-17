"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { QuestionType } from "@/data/survey/types";

type QuestionTypeSelectProps = {
  id?: string;
  label?: string;
  value: QuestionType | "";
  onChange: (value: QuestionType) => void;
};

export function QuestionTypeSelect({
  id = "question-type",
  label = "Question Type",
  value,
  onChange,
}: QuestionTypeSelectProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Select
        value={value || undefined}
        onValueChange={(next) => onChange(next as QuestionType)}
      >
        <SelectTrigger id={id} aria-label={label}>
          <SelectValue placeholder="Select question type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="mcq">MCQ's</SelectItem>
          <SelectItem value="text">Text</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
