"use client";

import { useCallback, useState } from "react";
import { ModulePage } from "@/components/system-setup/module-page";
import { usePagedList } from "@/components/system-setup/use-paged-list";
import { PopupForm } from "@/components/assign-training/popup-setup/popup-form";
import { PopupTable } from "@/components/assign-training/popup-setup/popup-table";
import {
  createPopupSetup,
  deletePopupSetup,
  listPopupSetups,
  updatePopupSetup,
  type PopupSetup,
  type PopupSetupInput,
} from "@/data/assign-training/popup-setup";

const EMPTY: PopupSetupInput = { minutes: "", seconds: "", status: "active" };

export function PopupModule() {
  const [values, setValues] = useState<PopupSetupInput>(EMPTY);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const listFn = useCallback(
    (params: { search: string; page: number; pageSize: number }) =>
      listPopupSetups(params),
    [],
  );
  const list = usePagedList<PopupSetup>(listFn);

  async function handleSubmit() {
    setPending(true);
    if (editingId) await updatePopupSetup(editingId, values);
    else await createPopupSetup(values);
    setPending(false);
    setValues(EMPTY);
    setEditingId(null);
    list.refreshFromStart();
  }

  function handleEdit(row: PopupSetup) {
    setEditingId(row.id);
    setValues({
      minutes: String(row.minutes),
      seconds: String(row.seconds),
      status: row.status,
    });
  }

  async function handleDelete(row: PopupSetup) {
    if (!window.confirm("Delete this popup setup?")) return;
    await deletePopupSetup(row.id);
    await list.reload();
  }

  return (
    <ModulePage
      title="Add Popup Setup"
      entityLabel="Popup Setup"
      sectionLabel="Assign Training"
      isEditing={Boolean(editingId)}
      form={
        <PopupForm
          values={values}
          onChange={setValues}
          isEditing={Boolean(editingId)}
          pending={pending}
          onSubmit={handleSubmit}
          onCancel={() => { setEditingId(null); setValues(EMPTY); }}
        />
      }
      table={
        <PopupTable
          rows={list.rows}
          page={list.page}
          pageSize={list.pageSize}
          totalPages={list.totalPages}
          total={list.total}
          search={list.search}
          onSearchChange={list.updateSearch}
          onPageChange={list.setPage}
          onPageSizeChange={list.updatePageSize}
          onEdit={handleEdit}
          onDelete={handleDelete}
          getExportRows={() =>
            listPopupSetups({ search: list.search, page: 1, pageSize: 10000 })
              .then((r) => r.items)
          }
        />
      }
    />
  );
}
