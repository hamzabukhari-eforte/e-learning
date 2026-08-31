"use client";

import { useCallback, useEffect, useState } from "react";
import { ModulePage } from "@/components/system-setup/module-page";
import { usePagedList } from "@/components/system-setup/use-paged-list";
import {
  PublishForm,
} from "@/components/training/publish/publish-form";
import { PublishTable } from "@/components/training/publish/publish-table";
import { ViewEmployeesModal } from "@/components/training/publish/view-employees-modal";
import { listSubTrainingOptions } from "@/data/system-setup/sub-trainings";
import { listTrainingOptions } from "@/data/system-setup/trainings";
import {
  createPublishedTraining,
  listPublishedTrainings,
  togglePublishedTrainingStatus,
} from "@/data/training/published-trainings";
import type {
  PublishedTraining,
  PublishTrainingInput,
} from "@/data/training/publish-types";
import type { SelectOption } from "@/data/registration/types";

const EMPTY: PublishTrainingInput = {
  trainingId: "",
  subTrainingId: "",
  validityFrom: "",
  validityTo: "",
  employeeCount: "",
  purpose: "",
};

export function PublishModule() {
  const [values, setValues] = useState<PublishTrainingInput>(EMPTY);
  const [pending, setPending] = useState(false);
  const [trainings, setTrainings] = useState<SelectOption[]>([]);
  const [subTrainings, setSubTrainings] = useState<SelectOption[]>([]);
  const [viewPublish, setViewPublish] = useState<PublishedTraining | null>(null);
  const listFn = useCallback(
    (params: { search: string; page: number; pageSize: number }) =>
      listPublishedTrainings(params),
    [],
  );
  const list = usePagedList<PublishedTraining>(listFn);

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

  async function handleSave() {
    if (!values.purpose) return;
    setPending(true);
    await createPublishedTraining(values);
    setPending(false);
    setValues(EMPTY);
    list.refreshFromStart();
  }

  async function handleChangeStatus(row: PublishedTraining) {
    await togglePublishedTrainingStatus(row.id);
    await list.reload();
    if (viewPublish?.id === row.id) {
      const refreshed = (await listPublishedTrainings({ page: 1, pageSize: 1000 }))
        .items.find((item) => item.id === row.id);
      if (refreshed) setViewPublish(refreshed);
    }
  }

  function handleEmployeesUpdated(updated: PublishedTraining) {
    setViewPublish(updated);
    void list.reload();
  }

  return (
    <>
      <ModulePage
        title="Publish training"
        entityLabel="Published Training"
        sectionLabel="Training"
        form={
          <PublishForm
            values={values}
            trainings={trainings}
            subTrainings={subTrainings}
            pending={pending}
            onChange={setValues}
            onSubmit={handleSave}
          />
        }
        table={
          <PublishTable
            rows={list.rows}
            page={list.page}
            pageSize={list.pageSize}
            totalPages={list.totalPages}
            total={list.total}
            search={list.search}
            onSearchChange={list.updateSearch}
            onPageChange={list.setPage}
            onPageSizeChange={list.updatePageSize}
            onViewEmployees={setViewPublish}
            onChangeStatus={handleChangeStatus}
          />
        }
      />
      <ViewEmployeesModal
        open={Boolean(viewPublish)}
        publish={viewPublish}
        onClose={() => setViewPublish(null)}
        onUpdated={handleEmployeesUpdated}
      />
    </>
  );
}
