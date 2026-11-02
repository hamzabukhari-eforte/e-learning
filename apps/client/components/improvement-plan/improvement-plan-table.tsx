"use client";

import { IMPROVEMENT_PLAN_EXPORT_COLUMNS } from "@/components/improvement-plan/improvement-plan-export";
import { ExportButtons } from "@/components/survey/export-buttons";
import { DataTableShell } from "@/components/system-setup/data-table-shell";
import type { PageSizeOption } from "@/components/system-setup/use-paged-list";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import type { ImprovementPlan } from "@/data/improvement-plan/types";
import { formatDate, formatDateTime } from "@/lib/datetime";

type ImprovementPlanTableProps = {
  rows: ImprovementPlan[];
  page: number;
  pageSize: number;
  totalPages: number;
  total: number;
  search: string;
  onSearchChange: (value: string) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: PageSizeOption) => void;
  onEdit: (row: ImprovementPlan) => void;
  onViewRespond: (row: ImprovementPlan) => void;
  getExportRows: () => Promise<ImprovementPlan[]>;
};

export function ImprovementPlanTable({
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
  onViewRespond,
  getExportRows,
}: ImprovementPlanTableProps) {
  return (
    <DataTableShell
      search={search}
      onSearchChange={onSearchChange}
      searchPlaceholder="Search improvement plans..."
      headers={[
        "Serial #",
        "Training",
        "Sub training",
        "Sent date",
        "Message",
        "End date",
        "Sent to",
        "View Respond",
        "Action",
      ]}
      page={page}
      pageSize={pageSize}
      totalPages={totalPages}
      total={total}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      toolbar={
        <ExportButtons
          title="Employee Improvement Plan"
          filename="employee-improvement-plan"
          columns={IMPROVEMENT_PLAN_EXPORT_COLUMNS}
          getRows={getExportRows}
        />
      }
    >
      {rows.length === 0 ? (
        <TableRow>
          <TableCell colSpan={9} className="py-8 text-center text-zinc-500">
            No improvement plans found.
          </TableCell>
        </TableRow>
      ) : (
        rows.map((row, index) => (
          <TableRow key={row.id}>
            <TableCell>{(page - 1) * pageSize + index + 1}</TableCell>
            <TableCell className="whitespace-nowrap">{row.trainingName}</TableCell>
            <TableCell className="whitespace-nowrap">{row.subTrainingName}</TableCell>
            <TableCell className="whitespace-nowrap">
              {formatDateTime(row.sentAt)}
            </TableCell>
            <TableCell className="max-w-xs truncate" title={row.taskMaterial}>
              {row.taskMaterial}
            </TableCell>
            <TableCell className="whitespace-nowrap">
              {formatDate(row.targetCompletionDate)}
            </TableCell>
            <TableCell className="max-w-xs truncate" title={row.employeeNames.join(", ")}>
              {row.employeeNames.join(", ")}
            </TableCell>
            <TableCell>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-9"
                onClick={() => onViewRespond(row)}
              >
                View Respond
              </Button>
            </TableCell>
            <TableCell>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-9"
                onClick={() => onEdit(row)}
              >
                Edit
              </Button>
            </TableCell>
          </TableRow>
        ))
      )}
    </DataTableShell>
  );
}
