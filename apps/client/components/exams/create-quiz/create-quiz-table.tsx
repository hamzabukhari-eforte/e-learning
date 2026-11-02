"use client";

import { QUIZ_EXPORT_COLUMNS } from "@/components/exams/create-quiz/quiz-export";
import { ExportButtons } from "@/components/survey/export-buttons";
import { DataTableShell } from "@/components/system-setup/data-table-shell";
import { RowActions } from "@/components/system-setup/row-actions";
import type { PageSizeOption } from "@/components/system-setup/use-paged-list";
import { TableCell, TableRow } from "@/components/ui/table";
import type { ExamQuiz } from "@/data/exams/types";
import { formatDate } from "@/lib/datetime";

type CreateQuizTableProps = {
  rows: ExamQuiz[];
  page: number;
  pageSize: number;
  totalPages: number;
  total: number;
  search: string;
  onSearchChange: (value: string) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: PageSizeOption) => void;
  onEdit: (row: ExamQuiz) => void;
  onDelete: (row: ExamQuiz) => void;
  getExportRows: () => Promise<ExamQuiz[]>;
};

export function CreateQuizTable({
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
}: CreateQuizTableProps) {
  return (
    <DataTableShell
      search={search}
      onSearchChange={onSearchChange}
      searchPlaceholder="Search quizzes..."
      headers={[
        "Serial #",
        "Sub training",
        "Training",
        "Quiz",
        "Created by",
        "Created date",
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
          title="Create Quiz"
          filename="exam-quizzes"
          columns={QUIZ_EXPORT_COLUMNS}
          getRows={getExportRows}
        />
      }
    >
      {rows.length === 0 ? (
        <TableRow>
          <TableCell colSpan={7} className="py-8 text-center text-zinc-500">
            No quizzes found.
          </TableCell>
        </TableRow>
      ) : (
        rows.map((row, index) => (
          <TableRow key={row.id}>
            <TableCell>{(page - 1) * pageSize + index + 1}</TableCell>
            <TableCell className="whitespace-nowrap">{row.subTrainingName}</TableCell>
            <TableCell className="whitespace-nowrap">{row.trainingName}</TableCell>
            <TableCell className="whitespace-nowrap">{row.name}</TableCell>
            <TableCell>{row.createdBy}</TableCell>
            <TableCell className="whitespace-nowrap">
              {formatDate(`${row.createdDate}T00:00:00`)}
            </TableCell>
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
