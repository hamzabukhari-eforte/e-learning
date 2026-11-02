"use client";

import { useCallback } from "react";
import { ModulePage } from "@/components/system-setup/module-page";
import { usePagedList } from "@/components/system-setup/use-paged-list";
import { TrainerReportTable } from "@/components/reports/trainer/trainer-report-table";
import { listTrainers } from "@/data/registration/trainers";
import type { Trainer } from "@/data/registration/types";

export function TrainerReportModule() {
  const listFn = useCallback(
    (params: { search: string; page: number; pageSize: number }) =>
      listTrainers(params),
    [],
  );
  const list = usePagedList<Trainer>(listFn);

  return (
    <ModulePage
      title="Trainer Report"
      entityLabel="Trainer"
      sectionLabel="Reports"
      table={
        <TrainerReportTable
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
            listTrainers({
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
