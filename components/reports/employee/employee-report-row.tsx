"use client";

import { StatusBadge } from "@/components/system-setup/status-badge";
import { DocumentLinks } from "@/components/reports/document-links";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  employeeFullName,
  type Employee,
} from "@/data/registration/types";

type EmployeeReportRowProps = {
  row: Employee;
  serial: number;
};

export function EmployeeReportRow({ row, serial }: EmployeeReportRowProps) {
  return (
    <TableRow>
      <TableCell>{serial}</TableCell>
      <TableCell className="whitespace-nowrap">{row.registrationDate}</TableCell>
      <TableCell>{row.employeeNo}</TableCell>
      <TableCell className="whitespace-nowrap">{employeeFullName(row)}</TableCell>
      <TableCell className="whitespace-nowrap">{row.id}</TableCell>
      <TableCell className="whitespace-nowrap">{row.contactNumber}</TableCell>
      <TableCell className="whitespace-nowrap">{row.email}</TableCell>
      <TableCell className="capitalize">{row.gender}</TableCell>
      <TableCell>
        <StatusBadge status={row.status} />
      </TableCell>
      <TableCell className="whitespace-nowrap">
        <DocumentLinks names={row.documentNames} />
      </TableCell>
    </TableRow>
  );
}
