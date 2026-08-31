"use client";

import { useCallback, useEffect, useState } from "react";
import { ModulePage } from "@/components/system-setup/module-page";
import {
  SubtrainingForm,
  type SubtrainingFormValues,
} from "@/components/training/define-subtraining/subtraining-form";
import { SubtrainingTable } from "@/components/training/define-subtraining/subtraining-table";
import { usePagedList } from "@/components/system-setup/use-paged-list";
import { useConfirm } from "@/components/ui/use-confirm";
import {
  createSubTraining,
  deleteSubTraining,
  listSubTrainings,
  updateSubTraining,
} from "@/data/system-setup/sub-trainings";
import { listTrainingOptions } from "@/data/system-setup/trainings";
import type { SubTraining } from "@/data/system-setup/types";
import type { SelectOption } from "@/data/registration/types";

const EMPTY: SubtrainingFormValues = {
  trainingId: "",
  title: "",
  description: "",
  studyMaterialName: "",
};

export function DefineSubtrainingModule() {
  const [values, setValues] = useState<SubtrainingFormValues>(EMPTY);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [trainings, setTrainings] = useState<SelectOption[]>([]);
  const { confirm, dialog } = useConfirm();
  const listFn = useCallback(
    (params: { search: string; page: number; pageSize: number }) =>
      listSubTrainings(params),
    [],
  );
  const list = usePagedList<SubTraining>(listFn);

  useEffect(() => {
    void listTrainingOptions().then(setTrainings);
  }, []);

  async function handleSubmit() {
    setPending(true);
    if (editingId) await updateSubTraining(editingId, values);
    else await createSubTraining(values);
    setPending(false);
    setValues(EMPTY);
    setEditingId(null);
    list.refreshFromStart();
  }

  async function handleDelete(row: SubTraining) {
    const ok = await confirm({
      title: "Delete subtraining",
      description: `Are you sure you want to delete "${row.name}"? This action cannot be undone.`,
      confirmLabel: "Delete",
    });
    if (!ok) return;
    await deleteSubTraining(row.id);
    await list.reload();
  }

  return (
    <>
      <ModulePage
        title="Define Subtraining"
        entityLabel="Subtraining"
        sectionLabel="Training"
        isEditing={Boolean(editingId)}
        form={
          <SubtrainingForm
            values={values}
            trainings={trainings}
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
          <SubtrainingTable
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
                title: row.name,
                description: row.description,
                studyMaterialName: row.studyMaterialName,
              });
            }}
            onDelete={handleDelete}
          />
        }
      />
      {dialog}
    </>
  );
}
