"use client";

import { useCallback, useEffect, useState } from "react";
import { TrainerNotificationForm } from "@/components/notification/trainer-notification-form";
import { TrainerNotificationTable } from "@/components/notification/trainer-notification-table";
import { ModulePage } from "@/components/system-setup/module-page";
import { usePagedList } from "@/components/system-setup/use-paged-list";
import { useConfirm } from "@/components/ui/use-confirm";
import {
  createTrainerNotification,
  deleteTrainerNotification,
  listTrainerNotifications,
  updateTrainerNotification,
} from "@/data/notification/trainer-notifications";
import type {
  TrainerNotification,
  TrainerNotificationInput,
} from "@/data/notification/trainer-types";
import type { SelectOption } from "@/data/registration/types";
import { listSubTrainingOptions } from "@/data/system-setup/sub-trainings";
import { listTrainingOptions } from "@/data/system-setup/trainings";

const EMPTY: TrainerNotificationInput = {
  dateFrom: "",
  dateTo: "",
  trainingId: "",
  subTrainingId: "",
  text: "",
};

export function TrainerNotificationModule() {
  const [values, setValues] = useState<TrainerNotificationInput>(EMPTY);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [trainings, setTrainings] = useState<SelectOption[]>([]);
  const [subTrainings, setSubTrainings] = useState<SelectOption[]>([]);
  const { confirm, dialog } = useConfirm();
  const listFn = useCallback(
    (params: { search: string; page: number; pageSize: number }) =>
      listTrainerNotifications(params),
    [],
  );
  const list = usePagedList<TrainerNotification>(listFn);

  useEffect(() => {
    void listTrainingOptions().then(setTrainings);
  }, []);

  useEffect(() => {
    if (!values.trainingId) {
      setSubTrainings([]);
      return;
    }
    void listSubTrainingOptions(values.trainingId).then(setSubTrainings);
  }, [values.trainingId]);

  function resetForm() {
    setValues(EMPTY);
    setEditingId(null);
    setError(null);
  }

  async function handleSubmit() {
    if (values.dateFrom && values.dateTo) {
      if (new Date(values.dateTo) < new Date(values.dateFrom)) {
        setError("Date range end must be on or after the start date.");
        return;
      }
    }
    if (!values.text.trim()) {
      setError("Please enter notification text.");
      return;
    }
    setPending(true);
    setError(null);
    const result = editingId
      ? await updateTrainerNotification(editingId, values)
      : await createTrainerNotification(values);
    setPending(false);
    if (!result) {
      setError("Please complete all fields before saving.");
      return;
    }
    resetForm();
    list.refreshFromStart();
  }

  function handleEdit(row: TrainerNotification) {
    setEditingId(row.id);
    setError(null);
    setValues({
      dateFrom: row.dateFrom,
      dateTo: row.dateTo,
      trainingId: row.trainingId,
      subTrainingId: row.subTrainingId,
      text: row.text,
    });
  }

  async function handleDelete(row: TrainerNotification) {
    const ok = await confirm({
      title: "Delete notification",
      description:
        "Are you sure you want to delete this notification? This action cannot be undone.",
      confirmLabel: "Delete",
    });
    if (!ok) return;
    await deleteTrainerNotification(row.id);
    if (editingId === row.id) resetForm();
    await list.reload();
  }

  function getExportRows() {
    return listTrainerNotifications({
      search: list.search,
      page: 1,
      pageSize: 10000,
    }).then((result) => result.items);
  }

  return (
    <>
      <ModulePage
        title="Notifications"
        entityLabel="Notification"
        sectionLabel="Notifications"
        isEditing={Boolean(editingId)}
        form={
          <TrainerNotificationForm
            values={values}
            trainings={trainings}
            subTrainings={subTrainings}
            isEditing={Boolean(editingId)}
            pending={pending}
            error={error}
            onChange={setValues}
            onSubmit={handleSubmit}
            onCancel={resetForm}
          />
        }
        table={
          <TrainerNotificationTable
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
            getExportRows={getExportRows}
          />
        }
      />
      {dialog}
    </>
  );
}
