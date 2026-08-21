"use client";

import { useCallback, useEffect, useState } from "react";
import { ModulePage } from "@/components/system-setup/module-page";
import { usePagedList } from "@/components/system-setup/use-paged-list";
import { useConfirm } from "@/components/ui/use-confirm";
import { TrainerForm } from "@/components/registration/trainer/trainer-form";
import { TrainerTable } from "@/components/registration/trainer/trainer-table";
import {
  createTrainer,
  deleteTrainer,
  listEmployeesForTrainer,
  listTrainers,
  updateTrainer,
} from "@/data/registration/trainers";
import type { SelectOption, Trainer, TrainerInput } from "@/data/registration/types";

const EMPTY: TrainerInput = {
  employeeId: "",
  trainerType: "",
  status: "active",
};

export function TrainerModule() {
  const [values, setValues] = useState<TrainerInput>(EMPTY);
  const [employees, setEmployees] = useState<SelectOption[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const { confirm, dialog } = useConfirm();
  const listFn = useCallback(
    (params: { search: string; page: number; pageSize: number }) =>
      listTrainers(params),
    [],
  );
  const list = usePagedList<Trainer>(listFn);

  useEffect(() => {
    void listEmployeesForTrainer().then(setEmployees);
  }, []);

  async function handleSubmit() {
    if (!values.employeeId || !values.trainerType) return;
    setPending(true);
    if (editingId) await updateTrainer(editingId, values);
    else await createTrainer(values);
    setPending(false);
    setValues(EMPTY);
    setEditingId(null);
    list.refreshFromStart();
  }

  async function handleDelete(row: Trainer) {
    const ok = await confirm({
      title: "Remove trainer",
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
        title="Add Trainer"
        entityLabel="Trainer"
        sectionLabel="Registration"
        isEditing={Boolean(editingId)}
        form={
          <TrainerForm
            values={values}
            employees={employees}
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
          <TrainerTable
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
                employeeId: row.employeeId,
                trainerType: row.trainerType,
                status: row.status,
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
