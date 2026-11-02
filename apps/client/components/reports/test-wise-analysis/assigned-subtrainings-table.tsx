"use client";

import { DataTableShell } from "@/components/system-setup/data-table-shell";
import type { PageSizeOption } from "@/components/system-setup/use-paged-list";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import type { TestWiseSubTraining } from "@/data/reports/test-wise-analysis-types";

type AssignedSubTrainingsTableProps = {
  rows: TestWiseSubTraining[];
  page: number;
  pageSize: number;
  totalPages: number;
  total: number;
  search: string;
  onSearchChange: (value: string) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: PageSizeOption) => void;
  onViewAssessments: (row: TestWiseSubTraining) => void;
};

export function AssignedSubTrainingsTable({
  rows,
  page,
  pageSize,
  totalPages,
  total,
  search,
  onSearchChange,
  onPageChange,
  onPageSizeChange,
  onViewAssessments,
}: AssignedSubTrainingsTableProps) {
  return (
    <DataTableShell
      search={search}
      onSearchChange={onSearchChange}
      searchPlaceholder="Search sub-trainings..."
      headers={["Serial #", "Sub-Training", "Action"]}
      page={page}
      pageSize={pageSize}
      totalPages={totalPages}
      total={total}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      pageSizeId="test-wise-subtrainings-page-size"
    >
      {rows.length === 0 ? (
        <TableRow>
          <TableCell colSpan={3} className="py-8 text-center text-zinc-500">
            No assigned sub-trainings found.
          </TableCell>
        </TableRow>
      ) : (
        rows.map((row, index) => (
          <TableRow key={row.id}>
            <TableCell>{(page - 1) * pageSize + index + 1}</TableCell>
            <TableCell className="whitespace-nowrap">{row.name}</TableCell>
            <TableCell>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-9"
                onClick={() => onViewAssessments(row)}
              >
                View Assessments
              </Button>
            </TableCell>
          </TableRow>
        ))
      )}
    </DataTableShell>
  );
}
