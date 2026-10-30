"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AssessmentResultsTable } from "@/components/reports/employee-report-card/assessment-results-table";
import { EmployeeReportCardFields } from "@/components/reports/employee-report-card/employee-report-card-fields";
import { FeedbackTable } from "@/components/reports/employee-report-card/feedback-table";
import { ImprovementPlanTable } from "@/components/reports/employee-report-card/improvement-plan-table";
import { ProfileDetailCard } from "@/components/reports/employee-report-card/profile-detail-card";
import { ProgressReportTable } from "@/components/reports/employee-report-card/progress-report-table";
import { useEmployeeReportCard } from "@/components/reports/employee-report-card/use-employee-report-card";
import { ViewAttemptModal } from "@/components/reports/employee-report-card/view-attempt-modal";
import type { ReportCardAssessment } from "@/data/reports/employee-report-card-types";

export function EmployeeReportCardModule() {
  const {
    employeeId,
    setEmployeeId,
    employees,
    pending,
    error,
    report,
    handleShowReport,
  } = useEmployeeReportCard();
  const [attemptTarget, setAttemptTarget] =
    useState<ReportCardAssessment | null>(null);

  return (
    <>
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div>
          <p className="text-sm text-[#FFA901]">Reports</p>
          <h1 className="text-2xl font-bold text-black">Employee Report Card</h1>
        </div>

        <section className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-base font-semibold text-black">
            Filter Report
          </h2>
          <EmployeeReportCardFields
            employeeId={employeeId}
            employees={employees}
            pending={pending}
            error={error}
            onChange={setEmployeeId}
            onSubmit={handleShowReport}
          />
        </section>

        {report ? (
          <div className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <ProfileDetailCard profile={report.profile} />
              <FeedbackTable rows={report.feedback} />
            </div>
            <ImprovementPlanTable rows={report.improvementPlans} />
            <AssessmentResultsTable
              rows={report.assessments}
              onViewAttempt={setAttemptTarget}
            />
            <ProgressReportTable
              rows={report.progress}
              months={report.progressMonths}
            />
          </div>
        ) : (
          <section className="rounded-lg border border-zinc-200 bg-white p-8 text-center text-sm text-zinc-500 shadow-sm">
            Select an employee and click Show Report to view the report card.
          </section>
        )}
      </motion.div>
      <ViewAttemptModal
        open={Boolean(attemptTarget)}
        assessment={attemptTarget}
        onClose={() => setAttemptTarget(null)}
      />
    </>
  );
}
