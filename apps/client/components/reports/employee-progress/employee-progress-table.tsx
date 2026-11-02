"use client";

import { buildEmployeeProgressExportColumns } from "@/components/reports/employee-progress/employee-progress-export";
import { SearchField } from "@/components/system-setup/search-field";
import { TablePagination } from "@/components/system-setup/table-pagination";
import type { PageSizeOption } from "@/components/system-setup/use-paged-list";
import { ExportButtons } from "@/components/survey/export-buttons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { metricsForMonth } from "@/data/reports/employee-progress";
import type {
  EmployeeProgressRow,
  ProgressMonth,
} from "@/data/reports/employee-progress-types";

type EmployeeProgressTableProps = {
  rows: EmployeeProgressRow[];
  months: ProgressMonth[];
  page: number;
  pageSize: number;
  totalPages: number;
  total: number;
  search: string;
  onSearchChange: (value: string) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: PageSizeOption) => void;
  getExportRows: () => Promise<EmployeeProgressRow[]>;
};

const STICKY =
  "sticky z-10 bg-inherit left-0 shadow-[2px_0_4px_-2px_rgba(0,0,0,0.15)]";

export function EmployeeProgressTable({
  rows,
  months,
  page,
  pageSize,
  totalPages,
  total,
  search,
  onSearchChange,
  onPageChange,
  onPageSizeChange,
  getExportRows,
}: EmployeeProgressTableProps) {
  const exportColumns = buildEmployeeProgressExportColumns(months);
  const colSpan = 3 + months.length * 3;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 px-4 py-3">
        <SearchField
          value={search}
          onChange={onSearchChange}
          placeholder="Search employee progress..."
        />
        <ExportButtons
          title="Employee Progress Report"
          filename="employee-progress-report"
          columns={exportColumns}
          getRows={getExportRows}
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow className="border-0 bg-[#042954] hover:bg-[#042954]">
            <TableHead
              rowSpan={months.length > 0 ? 2 : 1}
              className={`${STICKY} left-0 min-w-[9rem] bg-[#042954]`}
            >
              Employee No
            </TableHead>
            <TableHead
              rowSpan={months.length > 0 ? 2 : 1}
              className={`${STICKY} left-[9rem] min-w-[12rem] bg-[#042954]`}
            >
              Employee Name
            </TableHead>
            <TableHead
              rowSpan={months.length > 0 ? 2 : 1}
              className={`${STICKY} left-[21rem] min-w-[12rem] border-r border-white/20 bg-[#042954]`}
            >
              Sub-Training Name
            </TableHead>
            {months.map((month) => (
              <TableHead
                key={month.key}
                colSpan={3}
                className="border-l border-white/20 text-center"
              >
                {month.label}
              </TableHead>
            ))}
          </TableRow>
          {months.length > 0 ? (
            <TableRow className="border-0 bg-[#042954] hover:bg-[#042954]">
              {months.map((month) => (
                <MonthSubHeaders key={month.key} />
              ))}
            </TableRow>
          ) : null}
        </TableHeader>
        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={Math.max(colSpan, 3)}
                className="py-8 text-center text-zinc-500"
              >
                No records found. Adjust filters and click Show Report.
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row) => (
              <TableRow key={row.id} className="group">
                <TableCell
                  className={`${STICKY} left-0 min-w-[9rem] whitespace-nowrap bg-white group-hover:bg-zinc-50`}
                >
                  {row.employeeNo}
                </TableCell>
                <TableCell
                  className={`${STICKY} left-[9rem] min-w-[12rem] whitespace-nowrap bg-white group-hover:bg-zinc-50`}
                >
                  {row.employeeName}
                </TableCell>
                <TableCell
                  className={`${STICKY} left-[21rem] min-w-[12rem] whitespace-nowrap border-r border-zinc-200 bg-white group-hover:bg-zinc-50`}
                >
                  {row.subTrainingName}
                </TableCell>
                {months.map((month) => {
                  const metrics = metricsForMonth(row, month.key);
                  return (
                    <MonthCells key={month.key} metrics={metrics} />
                  );
                })}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <TablePagination
        page={page}
        pageSize={pageSize}
        totalPages={totalPages}
        total={total}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        pageSizeId="employee-progress-page-size"
      />
    </div>
  );
}

function MonthSubHeaders() {
  return (
    <>
      <TableHead className="border-l border-white/20 text-center">
        Total Assigned
      </TableHead>
      <TableHead className="text-center">Assignment</TableHead>
      <TableHead className="text-center">Time Dependant</TableHead>
    </>
  );
}

function MonthCells({
  metrics,
}: {
  metrics: { totalAssigned: number; assignment: number; timeDependant: number };
}) {
  return (
    <>
      <TableCell className="border-l border-zinc-100 text-center">
        {metrics.totalAssigned}
      </TableCell>
      <TableCell className="text-center">{metrics.assignment}</TableCell>
      <TableCell className="text-center">{metrics.timeDependant}</TableCell>
    </>
  );
}
