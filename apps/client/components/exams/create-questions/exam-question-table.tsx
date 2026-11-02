"use client";

import { DataTableShell } from "@/components/system-setup/data-table-shell";
import { RowActions } from "@/components/system-setup/row-actions";
import { ExportButtons } from "@/components/survey/export-buttons";
import { QuestionCell } from "@/components/survey/question-cell";
import { EXAM_QUESTION_EXPORT_COLUMNS } from "@/components/exams/create-questions/exam-question-export";
import type { PageSizeOption } from "@/components/system-setup/use-paged-list";
import { TableCell, TableRow } from "@/components/ui/table";
import type { ExamQuestion } from "@/data/exams/types";
import { QUESTION_TYPE_LABEL } from "@/data/survey/types";

type ExamQuestionTableProps = {
  rows: ExamQuestion[];
  page: number;
  pageSize: number;
  totalPages: number;
  total: number;
  search: string;
  onSearchChange: (value: string) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: PageSizeOption) => void;
  onEdit: (row: ExamQuestion) => void;
  onDelete: (row: ExamQuestion) => void;
  getExportRows: () => Promise<ExamQuestion[]>;
};

export function ExamQuestionTable({
  rows,
  page,
  pageSize,
  totalPages,
  total,
  search,
  onSearchChange,
  onPageChange,
  onPageSizeChange,
  onEdit,
  onDelete,
  getExportRows,
}: ExamQuestionTableProps) {
  return (
    <DataTableShell
      search={search}
      onSearchChange={onSearchChange}
      searchPlaceholder="Search questions..."
      headers={[
        "Serial #",
        "Training",
        "Sub training",
        "Question type",
        "Question",
        "Created by",
        "Actions",
      ]}
      page={page}
      pageSize={pageSize}
      totalPages={totalPages}
      total={total}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      toolbar={
        <ExportButtons
          title="Create Questions"
          filename="exam-questions"
          columns={EXAM_QUESTION_EXPORT_COLUMNS}
          getRows={getExportRows}
        />
      }
    >
      {rows.length === 0 ? (
        <TableRow>
          <TableCell colSpan={7} className="py-8 text-center text-zinc-500">
            No questions found.
          </TableCell>
        </TableRow>
      ) : (
        rows.map((row, index) => (
          <TableRow key={row.id}>
            <TableCell>{(page - 1) * pageSize + index + 1}</TableCell>
            <TableCell className="whitespace-nowrap">{row.trainingName}</TableCell>
            <TableCell className="whitespace-nowrap">{row.subTrainingName}</TableCell>
            <TableCell>{QUESTION_TYPE_LABEL[row.type]}</TableCell>
            <TableCell>
              <QuestionCell row={row} />
            </TableCell>
            <TableCell>{row.createdBy}</TableCell>
            <TableCell>
              <RowActions
                onEdit={() => onEdit(row)}
                onDelete={() => onDelete(row)}
              />
            </TableCell>
          </TableRow>
        ))
      )}
    </DataTableShell>
  );
}
