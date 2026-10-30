"use client";

import { useMemo, useState } from "react";
import { REPORT_CARD_ASSESSMENT_EXPORT } from "@/components/reports/employee-report-card/assessment-export";
import { SearchField } from "@/components/system-setup/search-field";
import { ExportButtons } from "@/components/survey/export-buttons";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { QUIZ_ASSIGN_TYPE_LABEL } from "@/data/exams/types";
import type { ReportCardAssessment } from "@/data/reports/employee-report-card-types";
import { formatDateTime } from "@/lib/datetime";

type AssessmentResultsTableProps = {
  rows: ReportCardAssessment[];
  onViewAttempt: (row: ReportCardAssessment) => void;
};

export function AssessmentResultsTable({
  rows,
  onViewAttempt,
}: AssessmentResultsTableProps) {
  const [search, setSearch] = useState("");
  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return rows;
    return rows.filter((row) =>
      [
        row.trainingName,
        row.subTrainingName,
        row.testName,
        QUIZ_ASSIGN_TYPE_LABEL[row.testType],
      ]
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
  }, [rows, search]);

  return (
    <section className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm">
      <div className="border-b border-zinc-200 px-4 py-3">
        <h2 className="text-base font-semibold text-[#042954]">
          Assessment Results
        </h2>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 px-4 py-3">
        <SearchField
          value={search}
          onChange={setSearch}
          placeholder="Search assessments..."
        />
        <ExportButtons
          title="Assessment Results"
          filename="employee-report-card-assessments"
          columns={REPORT_CARD_ASSESSMENT_EXPORT}
          getRows={async () => filtered}
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow className="border-0 bg-[#042954] hover:bg-[#042954]">
            {[
              "Sr.No",
              "Training",
              "SubTraining",
              "Test Name",
              "Test Type",
              "Valid From",
              "Valid Till",
              "Total Questions",
              "Total Wrong Questions",
              "Attempt No.",
              "Action",
            ].map((header) => (
              <TableHead key={header}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.length === 0 ? (
            <TableRow>
              <TableCell colSpan={11} className="py-8 text-center text-zinc-500">
                No data available in table.
              </TableCell>
            </TableRow>
          ) : (
            filtered.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="whitespace-nowrap">
                  {row.trainingName}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {row.subTrainingName}
                </TableCell>
                <TableCell className="whitespace-nowrap">{row.testName}</TableCell>
                <TableCell className="whitespace-nowrap">
                  {QUIZ_ASSIGN_TYPE_LABEL[row.testType]}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {formatDateTime(row.validFrom)}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {formatDateTime(row.validTill)}
                </TableCell>
                <TableCell>{row.totalQuestions}</TableCell>
                <TableCell>{row.totalWrongQuestions}</TableCell>
                <TableCell>{row.attemptNo}</TableCell>
                <TableCell>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-9"
                    onClick={() => onViewAttempt(row)}
                  >
                    View Attempt
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </section>
  );
}
