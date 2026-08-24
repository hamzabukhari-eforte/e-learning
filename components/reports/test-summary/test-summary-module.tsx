"use client";

import { ModulePage } from "@/components/system-setup/module-page";
import { TestSummaryFields } from "@/components/reports/test-summary/test-summary-fields";
import { TestSummaryTable } from "@/components/reports/test-summary/test-summary-table";
import { useTestSummary } from "@/components/reports/test-summary/use-test-summary";

export function TestSummaryModule() {
  const {
    values,
    setValues,
    trainings,
    subTrainings,
    trainers,
    pending,
    error,
    list,
    handleShowReport,
    getExportRows,
  } = useTestSummary();

  return (
    <ModulePage
      title="Test Attempt Summary Report"
      entityLabel="Report"
      sectionLabel="Reports"
      formTitle="Filter Report"
      form={
        <TestSummaryFields
          values={values}
          trainings={trainings}
          subTrainings={subTrainings}
          trainers={trainers}
          pending={pending}
          error={error}
          onChange={setValues}
          onSubmit={handleShowReport}
        />
      }
      table={
        <TestSummaryTable
          rows={list.rows}
          page={list.page}
          pageSize={list.pageSize}
          totalPages={list.totalPages}
          total={list.total}
          search={list.search}
          onSearchChange={list.updateSearch}
          onPageChange={list.setPage}
          onPageSizeChange={list.updatePageSize}
          getExportRows={getExportRows}
        />
      }
    />
  );
}
