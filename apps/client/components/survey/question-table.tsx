"use client";

import { DataTableShell } from "@/components/system-setup/data-table-shell";
import { RowActions } from "@/components/system-setup/row-actions";
import { ExportButtons } from "@/components/survey/export-buttons";
import { QuestionCell } from "@/components/survey/question-cell";
import { QUESTION_EXPORT_COLUMNS } from "@/components/survey/question-export";
import type { PageSizeOption } from "@/components/system-setup/use-paged-list";
import { TableCell, TableRow } from "@/components/ui/table";
import { QUESTION_TYPE_LABEL, type SurveyQuestion } from "@/data/survey/types";

type QuestionTableProps = {
  rows: SurveyQuestion[];
  page: number;
  pageSize: number;
  totalPages: number;
  total: number;
  search: string;
  onSearchChange: (value: string) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: PageSizeOption) => void;
  onEdit: (row: SurveyQuestion) => void;
  onDelete: (row: SurveyQuestion) => void;
  getExportRows: () => Promise<SurveyQuestion[]>;
};

export function QuestionTable({
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
  onDelete,
  getExportRows,
}: QuestionTableProps) {
  return (
    <DataTableShell
      search={search}
      onSearchChange={onSearchChange}
      searchPlaceholder="Search questions..."
      headers={["Serial #", "Questions Type", "Questions", "Created By", "Actions"]}
      page={page}
      pageSize={pageSize}
      totalPages={totalPages}
      total={total}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      toolbar={
        <ExportButtons
          title="Create Questions"
          filename="survey-questions"
          columns={QUESTION_EXPORT_COLUMNS}
          getRows={getExportRows}
        />
      }
    >
      {rows.length === 0 ? (
        <TableRow>
          <TableCell colSpan={5} className="py-8 text-center text-zinc-500">
            No questions found.
          </TableCell>
        </TableRow>
      ) : (
        rows.map((row, index) => (
          <TableRow key={row.id}>
            <TableCell>{(page - 1) * pageSize + index + 1}</TableCell>
            <TableCell>{QUESTION_TYPE_LABEL[row.type]}</TableCell>
            <TableCell>
              <QuestionCell row={row} />
            </TableCell>
            <TableCell>{row.createdBy}</TableCell>
            <TableCell>
              <RowActions
                onEdit={() => onEdit(row)}
                onDelete={() => onDelete(row)}
              />
            </TableCell>
          </TableRow>
        ))
      )}
    </DataTableShell>
  );
}
