"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { StatusBadge } from "@/components/system-setup/status-badge";
import { TableCell, TableRow } from "@/components/ui/table";
import type { Training } from "@/data/system-setup/types";
import { cn } from "@/lib/utils";

type AssignTrainingRowProps = {
  row: Training;
  index: number;
  checked: boolean;
  onToggle: (id: string) => void;
};

export function AssignTrainingRow({
  row,
  index,
  checked,
  onToggle,
}: AssignTrainingRowProps) {
  return (
    <TableRow
      className={cn("cursor-pointer", checked && "bg-[#042954]/5")}
      onClick={() => onToggle(row.id)}
    >
      <TableCell>
        <div className="flex items-center gap-2">
          <Checkbox
            checked={checked}
            onCheckedChange={() => onToggle(row.id)}
            onClick={(event) => event.stopPropagation()}
            aria-label={`Select ${row.name}`}
          />
          {index + 1}
        </div>
      </TableCell>
      <TableCell>{row.trainingId}</TableCell>
      <TableCell>{row.name}</TableCell>
      <TableCell>
        <StatusBadge status={row.status} />
      </TableCell>
    </TableRow>
  );
}
