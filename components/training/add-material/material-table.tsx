"use client";

import { DataTableShell } from "@/components/system-setup/data-table-shell";
import { ExportButtons } from "@/components/survey/export-buttons";
import { MaterialRowActions } from "@/components/training/add-material/material-row-actions";
import { MATERIAL_EXPORT_COLUMNS } from "@/components/training/add-material/material-export";
import type { PageSizeOption } from "@/components/system-setup/use-paged-list";
import { TableCell, TableRow } from "@/components/ui/table";
import type { TrainingMaterial } from "@/data/training/types";

type MaterialTableProps = {
  rows: TrainingMaterial[];
  page: number;
  pageSize: number;
  totalPages: number;
  total: number;
  search: string;
  onSearchChange: (value: string) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: PageSizeOption) => void;
  onEdit: (row: TrainingMaterial) => void;
  onView: (row: TrainingMaterial) => void;
  onDelete: (row: TrainingMaterial) => void;
  getExportRows: () => Promise<TrainingMaterial[]>;
};

export function MaterialTable({
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
  onView,
  onDelete,
  getExportRows,
}: MaterialTableProps) {
  return (
    <DataTableShell
      search={search}
      onSearchChange={onSearchChange}
      searchPlaceholder="Search training material..."
      headers={["Serial #", "Training title", "Sub training title", "Actions"]}
      page={page}
      pageSize={pageSize}
      totalPages={totalPages}
      total={total}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      toolbar={
        <ExportButtons
          title="Training Material"
          filename="training-material"
          columns={MATERIAL_EXPORT_COLUMNS}
          getRows={getExportRows}
        />
      }
    >
      {rows.length === 0 ? (
        <TableRow>
          <TableCell colSpan={4} className="py-8 text-center text-zinc-500">
            No training materials found.
          </TableCell>
        </TableRow>
      ) : (
        rows.map((row, index) => (
          <TableRow key={row.id}>
            <TableCell>{(page - 1) * pageSize + index + 1}</TableCell>
            <TableCell className="whitespace-nowrap">{row.trainingTitle}</TableCell>
            <TableCell className="whitespace-nowrap">{row.subTrainingTitle}</TableCell>
            <TableCell>
              <MaterialRowActions
                onEdit={() => onEdit(row)}
                onView={() => onView(row)}
                onDelete={() => onDelete(row)}
              />
            </TableCell>
          </TableRow>
        ))
      )}
    </DataTableShell>
  );
}
