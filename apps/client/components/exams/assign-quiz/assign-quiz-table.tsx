"use client";

import { ASSIGNED_QUIZ_EXPORT_COLUMNS } from "@/components/exams/assign-quiz/assign-quiz-export";
import { ExportButtons } from "@/components/survey/export-buttons";
import { DataTableShell } from "@/components/system-setup/data-table-shell";
import type { PageSizeOption } from "@/components/system-setup/use-paged-list";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  QUIZ_ASSIGN_TYPE_LABEL,
  type AssignedQuiz,
} from "@/data/exams/types";
import { formatDate, formatDateTime } from "@/lib/datetime";

type AssignQuizTableProps = {
  rows: AssignedQuiz[];
  page: number;
  pageSize: number;
  totalPages: number;
  total: number;
  search: string;
  onSearchChange: (value: string) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: PageSizeOption) => void;
  getExportRows: () => Promise<AssignedQuiz[]>;
};

export function AssignQuizTable({
  rows,
  page,
  pageSize,
  totalPages,
  total,
  search,
  onSearchChange,
  onPageChange,
  onPageSizeChange,
  getExportRows,
}: AssignQuizTableProps) {
  return (
    <DataTableShell
      search={search}
      onSearchChange={onSearchChange}
      searchPlaceholder="Search assigned quizzes..."
      headers={[
        "Serial #",
        "Assigned quiz id",
        "Quiz name",
        "Type",
        "Assign date",
        "Validity",
      ]}
      page={page}
      pageSize={pageSize}
      totalPages={totalPages}
      total={total}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      toolbar={
        <ExportButtons
          title="Assign Quiz"
          filename="assigned-quizzes"
          columns={ASSIGNED_QUIZ_EXPORT_COLUMNS}
          getRows={getExportRows}
        />
      }
    >
      {rows.length === 0 ? (
        <TableRow>
          <TableCell colSpan={6} className="py-8 text-center text-zinc-500">
            No assigned quizzes found.
          </TableCell>
        </TableRow>
      ) : (
        rows.map((row, index) => (
          <TableRow key={row.id}>
            <TableCell>{(page - 1) * pageSize + index + 1}</TableCell>
            <TableCell className="whitespace-nowrap">{row.assignedQuizId}</TableCell>
            <TableCell className="whitespace-nowrap">{row.quizName}</TableCell>
            <TableCell>{QUIZ_ASSIGN_TYPE_LABEL[row.quizType]}</TableCell>
            <TableCell className="whitespace-nowrap">
              {formatDateTime(row.assignedAt)}
            </TableCell>
            <TableCell className="whitespace-nowrap">
              {formatDate(row.validFrom)} – {formatDate(row.validTo)}
            </TableCell>
          </TableRow>
        ))
      )}
    </DataTableShell>
  );
}
