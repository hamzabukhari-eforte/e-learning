"use client";

import { useCallback } from "react";
import { ModulePage } from "@/components/system-setup/module-page";
import { usePagedList } from "@/components/system-setup/use-paged-list";
import { SurveyResultsTable } from "@/components/survey/results/survey-results-table";
import { listSurveyResults } from "@/data/survey/sent-forms";
import type { SurveyResult } from "@/data/survey/types";

export function SurveyResultsModule() {
  const listFn = useCallback(
    (params: { search: string; page: number; pageSize: number }) =>
      listSurveyResults(params),
    [],
  );
  const list = usePagedList<SurveyResult>(listFn);

  return (
    <ModulePage
      title="Survey Results"
      entityLabel="Result"
      sectionLabel="Survey"
      table={
        <SurveyResultsTable
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
            listSurveyResults({
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
