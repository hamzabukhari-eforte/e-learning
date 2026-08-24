"use client";

import { ModulePage } from "@/components/system-setup/module-page";
import { TestHistoryFields } from "@/components/reports/test-history/test-history-fields";
import { TestHistoryTable } from "@/components/reports/test-history/test-history-table";
import { useTestHistory } from "@/components/reports/test-history/use-test-history";

export function TestHistoryModule() {
  const {
    values,
    setValues,
    trainings,
    trainers,
    subTrainings,
    tests,
    pending,
    error,
    list,
    handleShowReport,
    getExportRows,
  } = useTestHistory();

  return (
    <ModulePage
      title="Test Attempt History Report"
      entityLabel="Report"
      sectionLabel="Reports"
      formTitle="Filter Report"
      form={
        <TestHistoryFields
          values={values}
          trainings={trainings}
          trainers={trainers}
          subTrainings={subTrainings}
          tests={tests}
          pending={pending}
          error={error}
          onChange={setValues}
          onSubmit={handleShowReport}
        />
      }
      table={
        <TestHistoryTable
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
