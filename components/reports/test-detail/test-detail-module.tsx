"use client";

import { ModulePage } from "@/components/system-setup/module-page";
import { TestSummaryFields } from "@/components/reports/test-summary/test-summary-fields";
import { TestDetailTable } from "@/components/reports/test-detail/test-detail-table";
import { useTestDetail } from "@/components/reports/test-detail/use-test-detail";

export function TestDetailModule() {
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
  } = useTestDetail();

  return (
    <ModulePage
      title="Test Attempt Detail Report"
      entityLabel="Report"
      sectionLabel="Reports"
      formTitle="Filter Report"
      form={
        <TestSummaryFields
          idPrefix="detail"
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
        <TestDetailTable
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
