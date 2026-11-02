"use client";

import { useEffect, useMemo, useState } from "react";
import { ATTEMPT_DETAIL_EXPORT_COLUMNS } from "@/components/reports/training-summary/attempt-detail-export";
import { SearchField } from "@/components/system-setup/search-field";
import { TablePagination } from "@/components/system-setup/table-pagination";
import type { PageSizeOption } from "@/components/system-setup/use-paged-list";
import { ExportButtons } from "@/components/survey/export-buttons";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { TrainingAttemptEmployee } from "@/data/reports/training-summary-types";
import { formatDateTime } from "@/lib/datetime";

type ViewAttemptDetailModalProps = {
  open: boolean;
  mode?: "assigned" | "attempted";
  averageTimeSpent: string;
  rows: TrainingAttemptEmployee[];
  onClose: () => void;
  onViewAttemptDetail: (row: TrainingAttemptEmployee) => void;
  onAssignFeedback: (row: TrainingAttemptEmployee) => void;
};

function displayDateTime(value: string) {
  return value ? formatDateTime(value) : "—";
}

export function ViewAttemptDetailModal({
  open,
  mode = "assigned",
  averageTimeSpent,
  rows,
  onClose,
  onViewAttemptDetail,
  onAssignFeedback,
}: ViewAttemptDetailModalProps) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<PageSizeOption>(10);
  const title =
    mode === "attempted" ? "View Training Attempted" : "View Attempt Detail";
  const emptyMessage =
    mode === "attempted"
      ? "No training attempts found."
      : "No assigned employees found.";
  const exportFilename =
    mode === "attempted" ? "training-attempted" : "attempt-detail";

  useEffect(() => {
    if (!open) {
      setSearch("");
      setPage(1);
      setPageSize(10);
    }
  }, [open]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return rows;
    return rows.filter((row) =>
      [
        row.name,
        row.employeeNo,
        row.subTrainingName,
        row.totalTimeSpent,
        row.totalTimeExpected,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
  }, [rows, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paged = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  return (
    <Modal open={open} title={title} onClose={onClose} size="xl">
      <div className="space-y-4">
        <p className="text-sm font-medium text-zinc-700">
          Average Time Spent On This Training Is:{" "}
          <span className="text-[#042954]">{averageTimeSpent}</span>
        </p>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <ExportButtons
            title={title}
            filename={exportFilename}
            columns={ATTEMPT_DETAIL_EXPORT_COLUMNS}
            getRows={async () => filtered}
          />
          <SearchField
            value={search}
            onChange={(value) => {
              setSearch(value);
              setPage(1);
            }}
            placeholder="Search..."
          />
        </div>
        <Table>
          <TableHeader>
            <TableRow className="border-0 bg-[#042954] hover:bg-[#042954]">
              {[
                "Sr.No",
                "Employee Name",
                "Employee#",
                "Sub-Training",
                "Start DateTime",
                "End DateTime",
                "Total Slides Attached",
                "Total Slides Attempts",
                "1st Attempt Date",
                "Total Time Expected",
                "Total Time Spent",
                "Action",
              ].map((header) => (
                <TableHead key={header}>{header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paged.length === 0 ? (
              <TableRow>
                <TableCell colSpan={12} className="py-8 text-center text-zinc-500">
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              paged.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell>
                    {(currentPage - 1) * pageSize + index + 1}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">{row.name}</TableCell>
                  <TableCell>{row.employeeNo}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    {row.subTrainingName}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {displayDateTime(row.startDateTime)}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {displayDateTime(row.endDateTime)}
                  </TableCell>
                  <TableCell>{row.totalSlidesAttached}</TableCell>
                  <TableCell>{row.totalSlidesAttempts}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    {displayDateTime(row.firstAttemptDate)}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {row.totalTimeExpected}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {row.totalTimeSpent}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-9"
                        onClick={() => onViewAttemptDetail(row)}
                      >
                        View Attempt Detail
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-9"
                        onClick={() => onAssignFeedback(row)}
                      >
                        Assign Feedback
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <TablePagination
          page={currentPage}
          pageSize={pageSize}
          totalPages={totalPages}
          total={filtered.length}
          onPageChange={setPage}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setPage(1);
          }}
          pageSizeId="attempt-detail-page-size"
        />
        <div className="flex justify-end">
          <Button type="button" variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
}
