"use client";

import { DataTableShell } from "@/components/system-setup/data-table-shell";
import { ExportButtons } from "@/components/survey/export-buttons";
import { EMPLOYEE_REPORT_EXPORT_COLUMNS } from "@/components/reports/employee/employee-report-export";
import { EmployeeReportRow } from "@/components/reports/employee/employee-report-row";
import type { PageSizeOption } from "@/components/system-setup/use-paged-list";
import { TableCell, TableRow } from "@/components/ui/table";
import type { Employee } from "@/data/registration/types";

const HEADERS = [
  "Serial #",
  "Registration Date",
  "Employee No",
  "Employee Name",
  "Employee ID",
  "Employee Contact",
  "Employee Email",
  "Gender",
  "Status",
  "Document",
];

type EmployeeReportTableProps = {
  rows: Employee[];
  page: number;
  pageSize: number;
  totalPages: number;
  total: number;
  search: string;
  onSearchChange: (value: string) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: PageSizeOption) => void;
  getExportRows: () => Promise<Employee[]>;
};

export function EmployeeReportTable({
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
}: EmployeeReportTableProps) {
  return (
    <DataTableShell
      search={search}
      onSearchChange={onSearchChange}
      searchPlaceholder="Search employee report..."
      headers={HEADERS}
      page={page}
      pageSize={pageSize}
      totalPages={totalPages}
      total={total}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      toolbar={
        <ExportButtons
          title="Employee Report"
          filename="employee-report"
          columns={EMPLOYEE_REPORT_EXPORT_COLUMNS}
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
            No employees found.
          </TableCell>
        </TableRow>
      ) : (
        rows.map((row, index) => (
          <EmployeeReportRow
            key={row.id}
            row={row}
            serial={(page - 1) * pageSize + index + 1}
          />
        ))
      )}
    </DataTableShell>
  );
}
