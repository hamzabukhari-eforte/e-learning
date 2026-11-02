"use client";

import { DataTableShell } from "@/components/system-setup/data-table-shell";
import { QuestionPickerRow } from "@/components/survey/create-form/question-picker-row";
import type { PageSizeOption } from "@/components/system-setup/use-paged-list";
import { TableCell, TableRow } from "@/components/ui/table";
import type { FormQuestion, SurveyQuestion } from "@/data/survey/types";

type QuestionPickerTableProps = {
  rows: SurveyQuestion[];
  selected: FormQuestion[];
  maxSequence: number;
  page: number;
  pageSize: number;
  totalPages: number;
  total: number;
  search: string;
  onSearchChange: (value: string) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: PageSizeOption) => void;
  onToggle: (row: SurveyQuestion) => void;
  onSequenceChange: (questionId: string, sequence: number) => void;
};

export function QuestionPickerTable({
  rows,
  selected,
  maxSequence,
  page,
  pageSize,
  totalPages,
  total,
  search,
  onSearchChange,
  onPageChange,
  onPageSizeChange,
  onToggle,
  onSequenceChange,
}: QuestionPickerTableProps) {
  return (
    <div className="overflow-hidden rounded-md border border-zinc-200">
      <DataTableShell
        search={search}
        onSearchChange={onSearchChange}
        searchPlaceholder="Search questions..."
        headers={["Serial #", "Questions", "Question Sequence"]}
        page={page}
        pageSize={pageSize}
        totalPages={totalPages}
        total={total}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        pageSizeId="picker-page-size"
      >
        {rows.length === 0 ? (
          <TableRow>
            <TableCell colSpan={3} className="py-8 text-center text-zinc-500">
              No questions found.
            </TableCell>
          </TableRow>
        ) : (
          rows.map((row, index) => (
            <QuestionPickerRow
              key={row.id}
              row={row}
              index={(page - 1) * pageSize + index}
              selected={selected.find((item) => item.questionId === row.id)}
              maxSequence={maxSequence}
              onToggle={onToggle}
              onSequenceChange={onSequenceChange}
            />
          ))
        )}
      </DataTableShell>
    </div>
  );
}
