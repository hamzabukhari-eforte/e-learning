"use client";

import { ModulePage } from "@/components/system-setup/module-page";
import { ItemsToFocusFields } from "@/components/reports/items-to-focus/items-to-focus-fields";
import { ItemsToFocusTable } from "@/components/reports/items-to-focus/items-to-focus-table";
import { useItemsToFocus } from "@/components/reports/items-to-focus/use-items-to-focus";

export function ItemsToFocusModule() {
  const {
    values,
    setValues,
    trainings,
    subTrainings,
    assignedTrainings,
    employees,
    pending,
    error,
    list,
    handleShowReport,
    getExportRows,
  } = useItemsToFocus();

  return (
    <ModulePage
      title="Items to Focus On"
      entityLabel="Report"
      sectionLabel="Reports"
      formTitle="Filter Report"
      form={
        <ItemsToFocusFields
          values={values}
          trainings={trainings}
          subTrainings={subTrainings}
          assignedTrainings={assignedTrainings}
          employees={employees}
          pending={pending}
          error={error}
          onChange={setValues}
          onSubmit={handleShowReport}
        />
      }
      table={
        <ItemsToFocusTable
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
