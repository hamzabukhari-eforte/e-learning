"use client";

import { DataTableShell } from "@/components/system-setup/data-table-shell";
import { ExportButtons } from "@/components/survey/export-buttons";
import { TEST_SUMMARY_EXPORT_COLUMNS } from "@/components/reports/test-summary/test-summary-export";
import { TestSummaryRow } from "@/components/reports/test-summary/test-summary-row";
import type { PageSizeOption } from "@/components/system-setup/use-paged-list";
import { TableCell, TableRow } from "@/components/ui/table";
import type { TestAttemptSummary } from "@/data/reports/types";

const HEADERS = [
  "Serial #",
  "Training",
  "Sub-Training",
  "Trainer",
  "Test Name",
  "Test Type",
  "Valid From",
  "Valid Till",
  "Total Assigned Employees",
  "Total Attempted Employee",
];

type TestSummaryTableProps = {
  rows: TestAttemptSummary[];
  page: number;
  pageSize: number;
  totalPages: number;
  total: number;
  search: string;
  onSearchChange: (value: string) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: PageSizeOption) => void;
  getExportRows: () => Promise<TestAttemptSummary[]>;
};

export function TestSummaryTable({
  rows, page, pageSize, totalPages, total,
  search, onSearchChange, onPageChange, onPageSizeChange, getExportRows,
}: TestSummaryTableProps) {
  return (
    <DataTableShell
      search={search}
      onSearchChange={onSearchChange}
      searchPlaceholder="Search test attempt summary..."
      headers={HEADERS}
      page={page}
      pageSize={pageSize}
      totalPages={totalPages}
      total={total}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      toolbar={
        <ExportButtons
          title="Test Attempt Summary Report"
          filename="test-attempt-summary"
          columns={TEST_SUMMARY_EXPORT_COLUMNS}
          getRows={getExportRows}
        />
      }
    >
      {rows.length === 0 ? (
        <TableRow>
          <TableCell colSpan={HEADERS.length} className="py-8 text-center text-zinc-500">
            No records found. Adjust filters and click Show Report.
          </TableCell>
        </TableRow>
      ) : (
        rows.map((row, index) => (
          <TestSummaryRow
            key={row.id}
            row={row}
            serial={(page - 1) * pageSize + index + 1}
          />
        ))
      )}
    </DataTableShell>
  );
}
