"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { TableCell, TableRow } from "@/components/ui/table";
import type { SubTraining } from "@/data/system-setup/types";
import { cn } from "@/lib/utils";

type BindingRowProps = {
  row: SubTraining;
  index: number;
  checked: boolean;
  onToggle: (id: string) => void;
};

export function BindingRow({ row, index, checked, onToggle }: BindingRowProps) {
  return (
    <TableRow
      className={cn("cursor-pointer", checked && "bg-[#042954]/5")}
      onClick={() => onToggle(row.id)}
    >
      <TableCell>{index + 1}</TableCell>
      <TableCell>{row.trainingName}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Checkbox
            checked={checked}
            onCheckedChange={() => onToggle(row.id)}
            onClick={(event) => event.stopPropagation()}
            aria-label={`Select ${row.name}`}
          />
          {row.name}
        </div>
      </TableCell>
    </TableRow>
  );
}
