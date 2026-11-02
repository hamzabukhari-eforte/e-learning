"use client";

import { useCallback } from "react";
import { ModulePage } from "@/components/system-setup/module-page";
import { usePagedList } from "@/components/system-setup/use-paged-list";
import { useConfirm } from "@/components/ui/use-confirm";
import { AssignedTrainerTable } from "@/components/system-management/assigned-trainer/assigned-trainer-table";
import {
  listAssignedTrainers,
  unassignTrainer,
} from "@/data/assign-training/trainer-assignments";
import type { AssignedTrainer } from "@/data/assign-training/types";

export function AssignedTrainerModule() {
  const { confirm, dialog } = useConfirm();
  const listFn = useCallback(
    (params: { search: string; page: number; pageSize: number }) =>
      listAssignedTrainers(params),
    [],
  );
  const list = usePagedList<AssignedTrainer>(listFn);

  async function handleUnassign(row: AssignedTrainer) {
    const ok = await confirm({
      title: "Unassign trainer",
      description: `Are you sure you want to unassign all courses from "${row.name}"? This action cannot be undone.`,
      confirmLabel: "Unassign",
    });
    if (!ok) return;
    await unassignTrainer(row.trainerId);
    await list.reload();
  }

  return (
    <>
      <ModulePage
        title="Assigned Trainer"
        entityLabel="Assigned Trainer"
        sectionLabel="System Management"
        table={
          <AssignedTrainerTable
            rows={list.rows}
            page={list.page}
            pageSize={list.pageSize}
            totalPages={list.totalPages}
            total={list.total}
            search={list.search}
            onSearchChange={list.updateSearch}
            onPageChange={list.setPage}
            onPageSizeChange={list.updatePageSize}
            onUnassign={handleUnassign}
          />
        }
      />
      {dialog}
    </>
  );
}
