"use client";

import { DataTableShell } from "@/components/system-setup/data-table-shell";
import type { PageSizeOption } from "@/components/system-setup/use-paged-list";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  QUIZ_ASSIGN_TYPE_LABEL,
  type PersonalizedAssessment,
} from "@/data/exams/types";
import { formatDate } from "@/lib/datetime";

type PersonalizedAssessmentTableProps = {
  rows: PersonalizedAssessment[];
  page: number;
  pageSize: number;
  totalPages: number;
  total: number;
  search: string;
  onSearchChange: (value: string) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: PageSizeOption) => void;
};

export function PersonalizedAssessmentTable({
  rows,
  page,
  pageSize,
  totalPages,
  total,
  search,
  onSearchChange,
  onPageChange,
  onPageSizeChange,
}: PersonalizedAssessmentTableProps) {
  return (
    <DataTableShell
      search={search}
      onSearchChange={onSearchChange}
      searchPlaceholder="Search personalized assessments..."
      headers={[
        "Serial #",
        "Training",
        "Sub training",
        "Test name",
        "Test type",
        "Validity",
        "Total questions",
        "Total wrong questions",
        "Attempt no",
      ]}
      page={page}
      pageSize={pageSize}
      totalPages={totalPages}
      total={total}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
    >
      {rows.length === 0 ? (
        <TableRow>
          <TableCell colSpan={9} className="py-8 text-center text-zinc-500">
            No personalized assessments found.
          </TableCell>
        </TableRow>
      ) : (
        rows.map((row, index) => (
          <TableRow key={row.id}>
            <TableCell>{(page - 1) * pageSize + index + 1}</TableCell>
            <TableCell className="whitespace-nowrap">{row.trainingName}</TableCell>
            <TableCell className="whitespace-nowrap">{row.subTrainingName}</TableCell>
            <TableCell className="whitespace-nowrap">{row.testName}</TableCell>
            <TableCell>{QUIZ_ASSIGN_TYPE_LABEL[row.testType]}</TableCell>
            <TableCell className="whitespace-nowrap">
              {formatDate(row.validFrom)} – {formatDate(row.validTo)}
            </TableCell>
            <TableCell>{row.totalQuestions}</TableCell>
            <TableCell>{row.totalWrongQuestions}</TableCell>
            <TableCell>{row.attemptNo}</TableCell>
          </TableRow>
        ))
      )}
    </DataTableShell>
  );
}
