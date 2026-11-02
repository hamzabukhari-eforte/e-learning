"use client";

import { DataTableShell } from "@/components/system-setup/data-table-shell";
import { EmployeeDetailsRow } from "@/components/system-management/employee-details/employee-details-row";
import type { PageSizeOption } from "@/components/system-setup/use-paged-list";
import { TableCell, TableRow } from "@/components/ui/table";
import type { Employee } from "@/data/registration/types";

const HEADERS = [
  "Serial #",
  "ID",
  "Name",
  "Employee No",
  "Email",
  "Contact",
  "Department",
  "Designation",
  "HOD",
  "Registration Date",
  "Gender",
  "Status",
  "Document",
  "Actions",
];

type EmployeeDetailsTableProps = {
  rows: Employee[];
  page: number;
  pageSize: number;
  totalPages: number;
  total: number;
  search: string;
  onSearchChange: (value: string) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: PageSizeOption) => void;
  onEdit: (row: Employee) => void;
  onUnregister: (row: Employee) => void;
};

export function EmployeeDetailsTable({
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
  onUnregister,
}: EmployeeDetailsTableProps) {
  return (
    <DataTableShell
      search={search}
      onSearchChange={onSearchChange}
      searchPlaceholder="Search employee..."
      headers={HEADERS}
      page={page}
      pageSize={pageSize}
      totalPages={totalPages}
      total={total}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
    >
      {rows.length === 0 ? (
        <TableRow>
          <TableCell colSpan={HEADERS.length} className="py-8 text-center text-zinc-500">
            No employees found.
          </TableCell>
        </TableRow>
      ) : (
        rows.map((row, index) => (
          <EmployeeDetailsRow
            key={row.id}
            row={row}
            serial={(page - 1) * pageSize + index + 1}
            onEdit={onEdit}
            onUnregister={onUnregister}
          />
        ))
      )}
    </DataTableShell>
  );
}
