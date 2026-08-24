"use client";

import { useCallback } from "react";
import { ModulePage } from "@/components/system-setup/module-page";
import { usePagedList } from "@/components/system-setup/use-paged-list";
import { EmployeeReportTable } from "@/components/reports/employee/employee-report-table";
import { listEmployees } from "@/data/registration/employees";
import type { Employee } from "@/data/registration/types";

export function EmployeeReportModule() {
  const listFn = useCallback(
    (params: { search: string; page: number; pageSize: number }) =>
      listEmployees(params),
    [],
  );
  const list = usePagedList<Employee>(listFn);

  return (
    <ModulePage
      title="Employee Report"
      entityLabel="Employee"
      sectionLabel="Reports"
      table={
        <EmployeeReportTable
          rows={list.rows}
          page={list.page}
          pageSize={list.pageSize}
          totalPages={list.totalPages}
          total={list.total}
          search={list.search}
          onSearchChange={list.updateSearch}
          onPageChange={list.setPage}
          onPageSizeChange={list.updatePageSize}
          getExportRows={() =>
            listEmployees({
              search: list.search,
              page: 1,
              pageSize: 10000,
            }).then((result) => result.items)
          }
        />
      }
    />
  );
}
