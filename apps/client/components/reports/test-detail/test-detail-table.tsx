"use client";

import { DataTableShell } from "@/components/system-setup/data-table-shell";
import { ExportButtons } from "@/components/survey/export-buttons";
import { TEST_DETAIL_EXPORT_COLUMNS } from "@/components/reports/test-detail/test-detail-export";
import { TestDetailRow } from "@/components/reports/test-detail/test-detail-row";
import type { PageSizeOption } from "@/components/system-setup/use-paged-list";
import { TableCell, TableRow } from "@/components/ui/table";
import type { TestAttemptDetail } from "@/data/reports/types";

const HEADERS = [
  "Serial #",
  "Training",
  "Sub Training",
  "Trainer",
  "Employee No",
  "Employee Name",
  "Assign Date",
  "Test Name",
  "Test Type",
  "Valid From Date",
  "Valid Till Date",
  "No of Attempts",
];

type TestDetailTableProps = {
  rows: TestAttemptDetail[];
  page: number;
  pageSize: number;
  totalPages: number;
  total: number;
  search: string;
  onSearchChange: (value: string) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: PageSizeOption) => void;
  getExportRows: () => Promise<TestAttemptDetail[]>;
};

export function TestDetailTable({
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
}: TestDetailTableProps) {
  return (
    <DataTableShell
      search={search}
      onSearchChange={onSearchChange}
      searchPlaceholder="Search test attempt detail..."
      headers={HEADERS}
      page={page}
      pageSize={pageSize}
      totalPages={totalPages}
      total={total}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      toolbar={
        <ExportButtons
          title="Test Attempt Detail Report"
          filename="test-attempt-detail"
          columns={TEST_DETAIL_EXPORT_COLUMNS}
          getRows={getExportRows}
        />
      }
    >
      {rows.length === 0 ? (
        <TableRow>
          <TableCell
            colSpan={HEADERS.length}
            className="py-8 text-center text-zinc-500"
          >
            No records found. Adjust filters and click Show Report.
          </TableCell>
        </TableRow>
      ) : (
        rows.map((row, index) => (
          <TestDetailRow
            key={row.id}
            row={row}
            serial={(page - 1) * pageSize + index + 1}
          />
        ))
      )}
    </DataTableShell>
  );
}
