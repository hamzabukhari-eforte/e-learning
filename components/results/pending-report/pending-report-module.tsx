"use client";

import { EmployeeListModal } from "@/components/results/pending-report/employee-list-modal";
import { PendingReportFields } from "@/components/results/pending-report/pending-report-fields";
import { PendingReportTable } from "@/components/results/pending-report/pending-report-table";
import { usePendingReport } from "@/components/results/pending-report/use-pending-report";
import { ViewDetailsModal } from "@/components/results/pending-report/view-details-modal";
import { ViewPaperModal } from "@/components/results/pending-report/view-paper-modal";
import { ModulePage } from "@/components/system-setup/module-page";

export function PendingReportModule() {
  const {
    values,
    setValues,
    trainings,
    subTrainings,
    quizzes,
    pending,
    error,
    list,
    employeeModal,
    setEmployeeModal,
    detailsRow,
    setDetailsRow,
    paperAttempt,
    setPaperAttempt,
    handleShowReport,
    getExportRows,
  } = usePendingReport();

  return (
    <>
      <ModulePage
        title="Pending Result's Report"
        entityLabel="Report"
        sectionLabel="Results"
        formTitle="Filter Report"
        form={
          <PendingReportFields
            values={values}
            trainings={trainings}
            subTrainings={subTrainings}
            quizzes={quizzes}
            pending={pending}
            error={error}
            onChange={setValues}
            onSubmit={handleShowReport}
          />
        }
        table={
          <PendingReportTable
            rows={list.rows}
            page={list.page}
            pageSize={list.pageSize}
            totalPages={list.totalPages}
            total={list.total}
            search={list.search}
            onSearchChange={list.updateSearch}
            onPageChange={list.setPage}
            onPageSizeChange={list.updatePageSize}
            onAssignedEmployees={(row) =>
              setEmployeeModal({
                title: `Assigned Employees — ${row.quizName}`,
                employees: row.assignedEmployees,
              })
            }
            onAttemptedEmployees={(row) =>
              setEmployeeModal({
                title: `Attempted Employees — ${row.quizName}`,
                employees: row.attemptedEmployees,
              })
            }
            onPendingEmployees={(row) =>
              setEmployeeModal({
                title: `Pending Employee Results — ${row.quizName}`,
                employees: row.pendingEmployees,
              })
            }
            onViewDetails={setDetailsRow}
            getExportRows={getExportRows}
          />
        }
      />
      <EmployeeListModal
        open={Boolean(employeeModal)}
        title={employeeModal?.title ?? "Employees"}
        employees={employeeModal?.employees ?? []}
        onClose={() => setEmployeeModal(null)}
      />
      <ViewDetailsModal
        open={Boolean(detailsRow)}
        title={
          detailsRow
            ? `View Details — ${detailsRow.quizName}`
            : "View Details"
        }
        attempts={detailsRow?.attempts ?? []}
        onClose={() => setDetailsRow(null)}
        onViewPaper={setPaperAttempt}
      />
      <ViewPaperModal
        open={Boolean(paperAttempt)}
        attempt={paperAttempt}
        quizName={detailsRow?.quizName}
        onClose={() => setPaperAttempt(null)}
      />
    </>
  );
}
