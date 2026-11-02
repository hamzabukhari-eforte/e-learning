"use client";

import { useCallback, useState } from "react";
import { ModulePage } from "@/components/system-setup/module-page";
import {
  NameStatusForm,
  type NameStatusValues,
} from "@/components/system-setup/name-status-form";
import { NameStatusTable } from "@/components/system-setup/name-status-table";
import { usePagedList } from "@/components/system-setup/use-paged-list";
import { useConfirm } from "@/components/ui/use-confirm";
import {
  createDesignation,
  deleteDesignation,
  listDesignations,
  updateDesignation,
} from "@/data/system-setup/designations";
import type { Designation } from "@/data/system-setup/types";

const EMPTY: NameStatusValues = { name: "", status: "active" };

export function DesignationModule() {
  const [values, setValues] = useState<NameStatusValues>(EMPTY);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const { confirm, dialog } = useConfirm();
  const listFn = useCallback(
    (params: { search: string; page: number; pageSize: number }) =>
      listDesignations(params),
    [],
  );
  const list = usePagedList<Designation>(listFn);

  async function handleSubmit() {
    setPending(true);
    if (editingId) await updateDesignation(editingId, values);
    else await createDesignation(values);
    setPending(false);
    setValues(EMPTY);
    setEditingId(null);
    list.refreshFromStart();
  }

  async function handleDelete(row: Designation) {
    const ok = await confirm({
      title: "Delete designation",
      description: `Are you sure you want to delete "${row.name}"? This action cannot be undone.`,
      confirmLabel: "Delete",
    });
    if (!ok) return;
    await deleteDesignation(row.id);
    await list.reload();
  }

  return (
    <>
      <ModulePage
        title="Define Designation"
        entityLabel="Designation"
        isEditing={Boolean(editingId)}
        form={
          <NameStatusForm
            nameLabel="Designation Name"
            namePlaceholder="Enter designation name"
            values={values}
            onChange={setValues}
            isEditing={Boolean(editingId)}
            pending={pending}
            onSubmit={handleSubmit}
            onCancel={() => {
              setEditingId(null);
              setValues(EMPTY);
            }}
          />
        }
        table={
          <NameStatusTable
            nameHeader="Designation Name"
            emptyText="No designations found."
            searchPlaceholder="Search designation..."
            rows={list.rows}
            page={list.page}
            pageSize={list.pageSize}
            totalPages={list.totalPages}
            total={list.total}
            search={list.search}
            onSearchChange={list.updateSearch}
            onPageChange={list.setPage}
            onPageSizeChange={list.updatePageSize}
            onEdit={(row) => {
              setEditingId(row.id);
              setValues({ name: row.name, status: row.status });
            }}
            onDelete={handleDelete}
          />
        }
      />
      {dialog}
    </>
  );
}
