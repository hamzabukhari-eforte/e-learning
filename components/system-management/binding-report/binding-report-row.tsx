"use client";

import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import type { BindingReportRow } from "@/data/assign-training/binding-types";

type BindingReportRowProps = {
  row: BindingReportRow;
  serial: number;
  onUnbind: (row: BindingReportRow) => void;
};

export function BindingReportTableRow({
  row,
  serial,
  onUnbind,
}: BindingReportRowProps) {
  return (
    <TableRow>
      <TableCell>{serial}</TableCell>
      <TableCell className="whitespace-nowrap">{row.departmentName}</TableCell>
      <TableCell className="whitespace-nowrap">{row.designationName}</TableCell>
      <TableCell className="whitespace-nowrap">{row.trainingName}</TableCell>
      <TableCell>
        <ul className="list-inside list-disc space-y-0.5">
          {row.subTrainings.map((sub) => (
            <li key={sub.id}>{sub.name}</li>
          ))}
        </ul>
      </TableCell>
      <TableCell>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-9 border-red-600 text-red-600 hover:bg-red-50"
          onClick={() => onUnbind(row)}
        >
          Unbind
        </Button>
      </TableCell>
    </TableRow>
  );
}
