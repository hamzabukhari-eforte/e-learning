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
  value: QuestionType | "";
  onChange: (value: QuestionType) => void;
};

export function QuestionTypeSelect({
  value,
  onChange,
}: QuestionTypeSelectProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="question-type">Question Type</Label>
      <Select
        value={value || undefined}
        onValueChange={(next) => onChange(next as QuestionType)}
      >
        <SelectTrigger id="question-type" aria-label="Question Type">
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
