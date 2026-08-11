"use client";

import { useCallback, useState } from "react";
import { ModulePage } from "@/components/system-setup/module-page";
import {
  NameStatusForm,
  type NameStatusValues,
} from "@/components/system-setup/name-status-form";
import { NameStatusTable } from "@/components/system-setup/name-status-table";
import { usePagedList } from "@/components/system-setup/use-paged-list";
import {
  createDepartment,
  deleteDepartment,
  listDepartments,
  updateDepartment,
} from "@/data/system-setup/departments";
import type { Department } from "@/data/system-setup/types";

const EMPTY: NameStatusValues = { name: "", status: "active" };

export function DepartmentModule() {
  const [values, setValues] = useState<NameStatusValues>(EMPTY);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const listFn = useCallback(
    (params: { search: string; page: number; pageSize: number }) =>
      listDepartments(params),
    [],
  );
  const list = usePagedList<Department>(listFn);

  async function handleSubmit() {
    setPending(true);
    if (editingId) await updateDepartment(editingId, values);
    else await createDepartment(values);
    setPending(false);
    setValues(EMPTY);
    setEditingId(null);
    list.refreshFromStart();
  }

  return (
    <ModulePage
      title="Define Department"
      entityLabel="Department"
      isEditing={Boolean(editingId)}
      form={
        <NameStatusForm
          nameLabel="Department Name"
          namePlaceholder="Enter department name"
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
          nameHeader="Department Name"
          emptyText="No departments found."
          searchPlaceholder="Search department..."
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
          onDelete={async (row) => {
            if (!window.confirm(`Delete ${row.name}?`)) return;
            await deleteDepartment(row.id);
            await list.reload();
          }}
        />
      }
    />
  );
}
