"use client";

import { useCallback, useState } from "react";
import { ModulePage } from "@/components/system-setup/module-page";
import {
  TrainingForm,
  type TrainingFormValues,
} from "@/components/system-setup/training/training-form";
import { TrainingTable } from "@/components/system-setup/training/training-table";
import { usePagedList } from "@/components/system-setup/use-paged-list";
import {
  createTraining,
  deleteTraining,
  listTrainings,
  updateTraining,
} from "@/data/system-setup/trainings";
import type { Training } from "@/data/system-setup/types";

const EMPTY: TrainingFormValues = {
  trainingId: "",
  name: "",
  status: "active",
};

export function TrainingModule() {
  const [values, setValues] = useState<TrainingFormValues>(EMPTY);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const listFn = useCallback(
    (params: { search: string; page: number; pageSize: number }) =>
      listTrainings(params),
    [],
  );
  const list = usePagedList<Training>(listFn);

  async function handleSubmit() {
    setPending(true);
    if (editingId) await updateTraining(editingId, values);
    else await createTraining(values);
    setPending(false);
    setValues(EMPTY);
    setEditingId(null);
    list.refreshFromStart();
  }

  return (
    <ModulePage
      title="Define Training"
      entityLabel="Training"
      isEditing={Boolean(editingId)}
      form={
        <TrainingForm
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
        <TrainingTable
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
            setValues({
              trainingId: row.trainingId,
              name: row.name,
              status: row.status,
            });
          }}
          onDelete={async (row) => {
            if (!window.confirm(`Delete ${row.name}?`)) return;
            await deleteTraining(row.id);
            await list.reload();
          }}
        />
      }
    />
  );
}
