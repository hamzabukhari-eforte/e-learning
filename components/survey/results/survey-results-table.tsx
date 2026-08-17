"use client";

import { DataTableShell } from "@/components/system-setup/data-table-shell";
import { ExportButtons } from "@/components/survey/export-buttons";
import { SURVEY_RESULT_EXPORT_COLUMNS } from "@/components/survey/results/result-export";
import type { PageSizeOption } from "@/components/system-setup/use-paged-list";
import { TableCell, TableRow } from "@/components/ui/table";
import { SENT_FORM_TYPE_LABEL, type SurveyResult } from "@/data/survey/types";
import { formatDateTime, formatValidity } from "@/lib/datetime";

type SurveyResultsTableProps = {
  rows: SurveyResult[];
  page: number;
  pageSize: number;
  totalPages: number;
  total: number;
  search: string;
  onSearchChange: (value: string) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: PageSizeOption) => void;
  getExportRows: () => Promise<SurveyResult[]>;
};

export function SurveyResultsTable({
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
}: SurveyResultsTableProps) {
  return (
    <DataTableShell
      search={search}
      onSearchChange={onSearchChange}
      searchPlaceholder="Search survey results..."
      headers={[
        "S. No",
        "Form Name",
        "Form Type",
        "Assign Date",
        "Validity",
        "Assigned Employees",
        "Attempted Employees",
      ]}
      page={page}
      pageSize={pageSize}
      totalPages={totalPages}
      total={total}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      toolbar={
        <ExportButtons
          title="Survey Results"
          filename="survey-results"
          columns={SURVEY_RESULT_EXPORT_COLUMNS}
          getRows={getExportRows}
        />
      }
    >
      {rows.length === 0 ? (
        <TableRow>
          <TableCell colSpan={7} className="py-8 text-center text-zinc-500">
            No survey results found.
          </TableCell>
        </TableRow>
      ) : (
        rows.map((row, index) => (
          <TableRow key={row.id}>
            <TableCell>{(page - 1) * pageSize + index + 1}</TableCell>
            <TableCell>{row.formName}</TableCell>
            <TableCell>{SENT_FORM_TYPE_LABEL[row.formType]}</TableCell>
            <TableCell>{formatDateTime(row.assignedAt)}</TableCell>
            <TableCell>{formatValidity(row.validFrom, row.validTo)}</TableCell>
            <TableCell>{row.assignedCount}</TableCell>
            <TableCell>{row.attemptedCount}</TableCell>
          </TableRow>
        ))
      )}
    </DataTableShell>
  );
}
