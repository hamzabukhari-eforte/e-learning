"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  SENT_FORM_TYPE_LABEL,
  type SentFormType,
} from "@/data/survey/types";

type FormTypeSelectProps = {
  value: SentFormType | "";
  onChange: (value: SentFormType) => void;
};

export function FormTypeSelect({ value, onChange }: FormTypeSelectProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="sent-form-type">Form Type</Label>
      <Select
        value={value || undefined}
        onValueChange={(next) => onChange(next as SentFormType)}
      >
        <SelectTrigger id="sent-form-type" aria-label="Form Type">
          <SelectValue placeholder="Select form type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="survey">{SENT_FORM_TYPE_LABEL.survey}</SelectItem>
          <SelectItem value="interview">
            {SENT_FORM_TYPE_LABEL.interview}
          </SelectItem>
        </SelectContent>
      </Select>
      <input className="sr-only" value={value} required readOnly tabIndex={-1} aria-hidden />
    </div>
  );
}
