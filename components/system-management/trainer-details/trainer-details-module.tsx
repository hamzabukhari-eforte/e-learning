"use client";

import { useCallback } from "react";
import { ModulePage } from "@/components/system-setup/module-page";
import { usePagedList } from "@/components/system-setup/use-paged-list";
import { useConfirm } from "@/components/ui/use-confirm";
import { TrainerDetailsTable } from "@/components/system-management/trainer-details/trainer-details-table";
import {
  deleteTrainer,
  listTrainers,
} from "@/data/registration/trainers";
import type { Trainer } from "@/data/registration/types";

export function TrainerDetailsModule() {
  const { confirm, dialog } = useConfirm();
  const listFn = useCallback(
    (params: { search: string; page: number; pageSize: number }) =>
      listTrainers(params),
    [],
  );
  const list = usePagedList<Trainer>(listFn);

  async function handleRemove(row: Trainer) {
    const ok = await confirm({
      title: "Remove from trainer list",
      description: `Are you sure you want to remove "${row.employeeName}" from the trainer list? This action cannot be undone.`,
      confirmLabel: "Remove",
    });
    if (!ok) return;
    await deleteTrainer(row.id);
    await list.reload();
  }

  return (
    <>
      <ModulePage
        title="Trainer Details"
        entityLabel="Trainer"
        sectionLabel="System Management"
        table={
          <TrainerDetailsTable
            rows={list.rows}
            page={list.page}
            pageSize={list.pageSize}
            totalPages={list.totalPages}
            total={list.total}
            search={list.search}
            onSearchChange={list.updateSearch}
            onPageChange={list.setPage}
            onPageSizeChange={list.updatePageSize}
            onRemove={handleRemove}
          />
        }
      />
      {dialog}
    </>
  );
}
