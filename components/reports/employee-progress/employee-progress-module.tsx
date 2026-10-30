"use client";

import { ModulePage } from "@/components/system-setup/module-page";
import { EmployeeProgressFields } from "@/components/reports/employee-progress/employee-progress-fields";
import { EmployeeProgressTable } from "@/components/reports/employee-progress/employee-progress-table";
import { useEmployeeProgress } from "@/components/reports/employee-progress/use-employee-progress";

export function EmployeeProgressModule() {
  const {
    values,
    setValues,
    trainings,
    subTrainings,
    employees,
    pending,
    error,
    list,
    months,
    handleShowReport,
    getExportRows,
  } = useEmployeeProgress();

  return (
    <ModulePage
      title="Employee Progress Report"
      entityLabel="Report"
      sectionLabel="Reports"
      formTitle="Filter Report"
      form={
        <EmployeeProgressFields
          values={values}
          trainings={trainings}
          subTrainings={subTrainings}
          employees={employees}
          pending={pending}
          error={error}
          onChange={setValues}
          onSubmit={handleShowReport}
        />
      }
      table={
        <EmployeeProgressTable
          rows={list.rows}
          months={months}
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
