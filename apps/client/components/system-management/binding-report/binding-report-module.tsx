"use client";

import { useCallback, useState } from "react";
import { ModulePage } from "@/components/system-setup/module-page";
import { usePagedList } from "@/components/system-setup/use-paged-list";
import { BindingReportTable } from "@/components/system-management/binding-report/binding-report-table";
import { UnbindModal } from "@/components/system-management/binding-report/unbind-modal";
import {
  listBindingReports,
} from "@/data/assign-training/binding-reports";
import { unbindSubTrainings } from "@/data/assign-training/designation-bindings";
import type { BindingReportRow } from "@/data/assign-training/binding-types";

export function BindingReportModule() {
  const [target, setTarget] = useState<BindingReportRow | null>(null);
  const [pending, setPending] = useState(false);
  const listFn = useCallback(
    (params: { search: string; page: number; pageSize: number }) =>
      listBindingReports(params),
    [],
  );
  const list = usePagedList<BindingReportRow>(listFn);

  async function handleConfirm(subTrainingIds: string[]) {
    if (!target) return;
    setPending(true);
    await unbindSubTrainings(
      target.departmentId,
      target.designationId,
      subTrainingIds,
    );
    setPending(false);
    setTarget(null);
    await list.reload();
  }

  return (
    <>
      <ModulePage
        title="Training/Department Binding Report"
        entityLabel="Binding"
        sectionLabel="System Management"
        table={
          <BindingReportTable
            rows={list.rows}
            page={list.page}
            pageSize={list.pageSize}
            totalPages={list.totalPages}
            total={list.total}
            search={list.search}
            onSearchChange={list.updateSearch}
            onPageChange={list.setPage}
            onPageSizeChange={list.updatePageSize}
            onUnbind={setTarget}
          />
        }
      />
      {target ? (
        <UnbindModal
          key={target.id}
          open
          row={target}
          pending={pending}
          onClose={() => setTarget(null)}
          onConfirm={handleConfirm}
        />
      ) : null}
    </>
  );
}
