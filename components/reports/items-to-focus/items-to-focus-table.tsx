"use client";

import { ITEMS_TO_FOCUS_EXPORT_COLUMNS } from "@/components/reports/items-to-focus/items-to-focus-export";
import { DataTableShell } from "@/components/system-setup/data-table-shell";
import type { PageSizeOption } from "@/components/system-setup/use-paged-list";
import { ExportButtons } from "@/components/survey/export-buttons";
import { TableCell, TableRow } from "@/components/ui/table";
import type { FocusItem } from "@/data/reports/items-to-focus-types";
import { QUESTION_TYPE_LABEL } from "@/data/survey/types";

const HEADERS = ["Serial #", "Question", "Question Type", "Category"];

type ItemsToFocusTableProps = {
  rows: FocusItem[];
  page: number;
  pageSize: number;
  totalPages: number;
  total: number;
  search: string;
  onSearchChange: (value: string) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: PageSizeOption) => void;
  getExportRows: () => Promise<FocusItem[]>;
};

export function ItemsToFocusTable({
  rows,
  page,
  pageSize,
  totalPages,
  total,
  search,
  onSearchChange,
  onPageChange,
  onPageSizeChange,
  getExportRows,
}: ItemsToFocusTableProps) {
  return (
    <DataTableShell
      search={search}
      onSearchChange={onSearchChange}
      searchPlaceholder="Search items to focus on..."
      headers={HEADERS}
      page={page}
      pageSize={pageSize}
      totalPages={totalPages}
      total={total}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      toolbar={
        <ExportButtons
          title="Items to Focus On"
          filename="items-to-focus"
          columns={ITEMS_TO_FOCUS_EXPORT_COLUMNS}
          getRows={getExportRows}
        />
      }
    >
      {rows.length === 0 ? (
        <TableRow>
          <TableCell
            colSpan={HEADERS.length}
            className="py-8 text-center text-zinc-500"
          >
            No records found. Adjust filters and click Show Report.
          </TableCell>
        </TableRow>
      ) : (
        rows.map((row, index) => (
          <TableRow key={row.id}>
            <TableCell>{(page - 1) * pageSize + index + 1}</TableCell>
            <TableCell className="max-w-md">{row.question}</TableCell>
            <TableCell className="whitespace-nowrap">
              {QUESTION_TYPE_LABEL[row.questionType]}
            </TableCell>
            <TableCell className="whitespace-nowrap">{row.category}</TableCell>
          </TableRow>
        ))
      )}
    </DataTableShell>
  );
}
