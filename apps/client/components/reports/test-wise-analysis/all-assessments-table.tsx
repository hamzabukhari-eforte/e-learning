"use client";

import { TEST_WISE_ASSESSMENT_EXPORT_COLUMNS } from "@/components/reports/test-wise-analysis/test-wise-assessment-export";
import { DataTableShell } from "@/components/system-setup/data-table-shell";
import type { PageSizeOption } from "@/components/system-setup/use-paged-list";
import { ExportButtons } from "@/components/survey/export-buttons";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { QUIZ_ASSIGN_TYPE_LABEL } from "@/data/exams/types";
import type { TestWiseAssessment } from "@/data/reports/test-wise-analysis-types";
import { formatDateTime } from "@/lib/datetime";

const HEADERS = [
  "Sr.No",
  "Test Name",
  "Test Type",
  "Valid From",
  "Valid Till",
  "Assigned Date",
  "Total Assigned Employees",
  "Total Attempted Employees",
  "Average Score",
  "Action",
];

type AllAssessmentsTableProps = {
  rows: TestWiseAssessment[];
  page: number;
  pageSize: number;
  totalPages: number;
  total: number;
  search: string;
  onSearchChange: (value: string) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: PageSizeOption) => void;
  getExportRows: () => Promise<TestWiseAssessment[]>;
  onViewDetails: (row: TestWiseAssessment) => void;
};

export function AllAssessmentsTable({
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
  onViewDetails,
}: AllAssessmentsTableProps) {
  return (
    <DataTableShell
      search={search}
      onSearchChange={onSearchChange}
      searchPlaceholder="Search assessments..."
      headers={HEADERS}
      page={page}
      pageSize={pageSize}
      totalPages={totalPages}
      total={total}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      pageSizeId="test-wise-assessments-page-size"
      toolbar={
        <ExportButtons
          title="All Assessments"
          filename="test-wise-assessments"
          columns={TEST_WISE_ASSESSMENT_EXPORT_COLUMNS}
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
            No data available in table.
          </TableCell>
        </TableRow>
      ) : (
        rows.map((row, index) => (
          <TableRow key={row.id}>
            <TableCell>{(page - 1) * pageSize + index + 1}</TableCell>
            <TableCell className="max-w-[10rem] truncate" title={row.testName}>
              {row.testName}
            </TableCell>
            <TableCell className="whitespace-nowrap">
              {QUIZ_ASSIGN_TYPE_LABEL[row.testType]}
            </TableCell>
            <TableCell className="whitespace-nowrap">
              {formatDateTime(row.validFrom)}
            </TableCell>
            <TableCell className="whitespace-nowrap">
              {formatDateTime(row.validTill)}
            </TableCell>
            <TableCell className="whitespace-nowrap">
              {formatDateTime(row.assignedDate)}
            </TableCell>
            <TableCell>{row.totalAssignedEmployees}</TableCell>
            <TableCell>{row.totalAttemptedEmployees}</TableCell>
            <TableCell>{row.averageScore}</TableCell>
            <TableCell>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-9"
                onClick={() => onViewDetails(row)}
              >
                View Details
              </Button>
            </TableCell>
          </TableRow>
        ))
      )}
    </DataTableShell>
  );
}
