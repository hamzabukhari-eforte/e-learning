"use client";

import { StatusBadge } from "@/components/system-setup/status-badge";
import { EmployeeRowActions } from "@/components/system-management/employee-details/employee-row-actions";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  employeeFullName,
  type Employee,
} from "@/data/registration/types";

type EmployeeDetailsRowProps = {
  row: Employee;
  serial: number;
  onEdit: (row: Employee) => void;
  onUnregister: (row: Employee) => void;
};

function downloadDocument(fileName: string) {
  const blob = new Blob([`Document: ${fileName}`], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function EmployeeDetailsRow({
  row,
  serial,
  onEdit,
  onUnregister,
}: EmployeeDetailsRowProps) {
  return (
    <TableRow>
      <TableCell>{serial}</TableCell>
      <TableCell className="whitespace-nowrap">{row.id}</TableCell>
      <TableCell className="whitespace-nowrap">{employeeFullName(row)}</TableCell>
      <TableCell>{row.employeeNo}</TableCell>
      <TableCell className="whitespace-nowrap">{row.email}</TableCell>
      <TableCell className="whitespace-nowrap">{row.contactNumber}</TableCell>
      <TableCell className="whitespace-nowrap">{row.departmentName}</TableCell>
      <TableCell className="whitespace-nowrap">{row.designationName}</TableCell>
      <TableCell className="whitespace-nowrap">{row.hodName}</TableCell>
      <TableCell className="whitespace-nowrap">{row.registrationDate}</TableCell>
      <TableCell className="capitalize">{row.gender}</TableCell>
      <TableCell>
        <StatusBadge status={row.status} />
      </TableCell>
      <TableCell className="whitespace-nowrap">
        {row.documentNames.length === 0 ? (
          <span className="text-zinc-500">—</span>
        ) : (
          <div className="flex flex-col gap-1">
            {row.documentNames.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => downloadDocument(name)}
                className="cursor-pointer text-left text-sm text-[#0b6bcb] underline hover:text-[#084e94]"
              >
                {name}
              </button>
            ))}
          </div>
        )}
      </TableCell>
      <TableCell>
        <EmployeeRowActions
          onEdit={() => onEdit(row)}
          onUnregister={() => onUnregister(row)}
        />
      </TableCell>
    </TableRow>
  );
}
