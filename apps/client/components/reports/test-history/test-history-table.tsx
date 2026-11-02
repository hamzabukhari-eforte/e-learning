"use client";

import { DataTableShell } from "@/components/system-setup/data-table-shell";
import { ExportButtons } from "@/components/survey/export-buttons";
import { TEST_HISTORY_EXPORT_COLUMNS } from "@/components/reports/test-history/test-history-export";
import { TestHistoryRow } from "@/components/reports/test-history/test-history-row";
import type { PageSizeOption } from "@/components/system-setup/use-paged-list";
import { TableCell, TableRow } from "@/components/ui/table";
import type { TestAttemptHistory } from "@/data/reports/types";

const HEADERS = [
  "Serial #",
  "Assigned Quiz ID",
  "Training",
  "Sub Training",
  "Quiz Name",
  "Quiz Type",
  "Employee No",
  "Employee Name",
  "Assign Date",
  "Valid From Date",
  "Valid Till Date",
  "Submit Status",
  "Attempt Date",
  "Attempt No",
  "Check Status",
  "Total Marks",
  "Obtained Marks",
  "Percentage",
  "Grade",
];

type TestHistoryTableProps = {
  rows: TestAttemptHistory[];
  page: number;
  pageSize: number;
  totalPages: number;
  total: number;
  search: string;
  onSearchChange: (value: string) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: PageSizeOption) => void;
  getExportRows: () => Promise<TestAttemptHistory[]>;
};

export function TestHistoryTable({
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
}: TestHistoryTableProps) {
  return (
    <DataTableShell
      search={search}
      onSearchChange={onSearchChange}
      searchPlaceholder="Search test attempt history..."
      headers={HEADERS}
      page={page}
      pageSize={pageSize}
      totalPages={totalPages}
      total={total}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      toolbar={
        <ExportButtons
          title="Test Attempt History Report"
          filename="test-attempt-history"
          columns={TEST_HISTORY_EXPORT_COLUMNS}
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
          <TestHistoryRow
            key={row.id}
            row={row}
            serial={(page - 1) * pageSize + index + 1}
          />
        ))
      )}
    </DataTableShell>
  );
}
