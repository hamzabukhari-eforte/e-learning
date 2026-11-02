"use client";

import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import type { AssignedTrainer } from "@/data/assign-training/types";

type AssignedTrainerRowProps = {
  row: AssignedTrainer;
  serial: number;
  onUnassign: (row: AssignedTrainer) => void;
};

export function AssignedTrainerRow({
  row,
  serial,
  onUnassign,
}: AssignedTrainerRowProps) {
  return (
    <TableRow>
      <TableCell>{serial}</TableCell>
      <TableCell className="whitespace-nowrap">{row.trainerId}</TableCell>
      <TableCell className="whitespace-nowrap">{row.name}</TableCell>
      <TableCell>
        {row.courses.length === 0 ? (
          <span className="text-zinc-500">—</span>
        ) : (
          <ul className="list-inside list-disc space-y-0.5">
            {row.courses.map((course) => (
              <li key={course}>{course}</li>
            ))}
          </ul>
        )}
      </TableCell>
      <TableCell>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-9 border-red-600 text-red-600 hover:bg-red-50"
          onClick={() => onUnassign(row)}
        >
          Unassign
        </Button>
      </TableCell>
    </TableRow>
  );
}
