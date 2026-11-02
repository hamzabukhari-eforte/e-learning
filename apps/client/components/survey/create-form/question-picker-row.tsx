"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { SequenceSelect } from "@/components/survey/create-form/sequence-select";
import { QuestionCell } from "@/components/survey/question-cell";
import { TableCell, TableRow } from "@/components/ui/table";
import type { FormQuestion } from "@/data/survey/types";
import type { SurveyQuestion } from "@/data/survey/types";
import { cn } from "@/lib/utils";

type QuestionPickerRowProps = {
  row: SurveyQuestion;
  index: number;
  selected?: FormQuestion;
  maxSequence: number;
  onToggle: (row: SurveyQuestion) => void;
  onSequenceChange: (questionId: string, sequence: number) => void;
};

export function QuestionPickerRow({
  row,
  index,
  selected,
  maxSequence,
  onToggle,
  onSequenceChange,
}: QuestionPickerRowProps) {
  const isSelected = Boolean(selected);

  return (
    <TableRow
      className={cn("cursor-pointer", isSelected && "bg-[#042954]/5")}
      onClick={() => onToggle(row)}
    >
      <TableCell>
        <div className="flex items-center gap-2">
          <Checkbox
            checked={isSelected}
            onCheckedChange={() => onToggle(row)}
            onClick={(event) => event.stopPropagation()}
            aria-label={`Select question ${index + 1}`}
          />
          {index + 1}
        </div>
      </TableCell>
      <TableCell>
        <QuestionCell row={row} />
      </TableCell>
      <TableCell>
        <SequenceSelect
          value={selected?.sequence ?? ""}
          max={maxSequence}
          disabled={!isSelected}
          onChange={(sequence) => onSequenceChange(row.id, sequence)}
        />
      </TableCell>
    </TableRow>
  );
}
