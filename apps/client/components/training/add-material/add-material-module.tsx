"use client";

import { useCallback, useEffect, useState } from "react";
import { ModulePage } from "@/components/system-setup/module-page";
import { usePagedList } from "@/components/system-setup/use-paged-list";
import { useConfirm } from "@/components/ui/use-confirm";
import { EditSequenceModal } from "@/components/training/add-material/edit-sequence-modal";
import {
  MaterialForm,
  type MaterialFormValues,
} from "@/components/training/add-material/material-form";
import { MaterialTable } from "@/components/training/add-material/material-table";
import { ViewMaterialModal } from "@/components/training/add-material/view-material-modal";
import { listSubTrainingOptions } from "@/data/system-setup/sub-trainings";
import { listTrainingOptions } from "@/data/system-setup/trainings";
import {
  createTrainingMaterial,
  deleteTrainingMaterial,
  listTrainingMaterials,
  updateMaterialSlides,
} from "@/data/training/materials";
import type { MaterialSlide, TrainingMaterial } from "@/data/training/types";
import type { SelectOption } from "@/data/registration/types";

const EMPTY: MaterialFormValues = {
  trainingId: "",
  subTrainingId: "",
  materialType: "",
};

export function AddMaterialModule() {
  const [values, setValues] = useState<MaterialFormValues>(EMPTY);
  const [pending, setPending] = useState(false);
  const [trainings, setTrainings] = useState<SelectOption[]>([]);
  const [subTrainings, setSubTrainings] = useState<SelectOption[]>([]);
  const [sequenceMaterial, setSequenceMaterial] = useState<TrainingMaterial | null>(null);
  const [viewMaterial, setViewMaterial] = useState<TrainingMaterial | null>(null);
  const [sequencePending, setSequencePending] = useState(false);
  const { confirm, dialog } = useConfirm();
  const listFn = useCallback(
    (params: { search: string; page: number; pageSize: number }) =>
      listTrainingMaterials(params),
    [],
  );
  const list = usePagedList<TrainingMaterial>(listFn);

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
    if (!values.materialType) return;
    setPending(true);
    await createTrainingMaterial({
      trainingId: values.trainingId,
      subTrainingId: values.subTrainingId,
      materialType: values.materialType,
    });
    setPending(false);
    setValues(EMPTY);
    list.refreshFromStart();
  }

  async function handleDelete(row: TrainingMaterial) {
    const ok = await confirm({
      title: "Delete training material",
      description: `Are you sure you want to delete material for "${row.subTrainingTitle}"? This action cannot be undone.`,
      confirmLabel: "Delete",
    });
    if (!ok) return;
    await deleteTrainingMaterial(row.id);
    await list.reload();
  }

  async function handleSaveSequence(slides: MaterialSlide[]) {
    if (!sequenceMaterial) return;
    setSequencePending(true);
    await updateMaterialSlides(sequenceMaterial.id, slides);
    setSequencePending(false);
    setSequenceMaterial(null);
    await list.reload();
  }

  async function getExportRows() {
    const result = await listTrainingMaterials({
      search: list.search,
      page: 1,
      pageSize: 10000,
    });
    return result.items;
  }

  return (
    <>
      <ModulePage
        title="Add Training Material"
        entityLabel="Training Material"
        sectionLabel="Training"
        form={
          <MaterialForm
            values={values}
            trainings={trainings}
            subTrainings={subTrainings}
            pending={pending}
            onChange={setValues}
            onSubmit={handleSave}
          />
        }
        table={
          <MaterialTable
            rows={list.rows}
            page={list.page}
            pageSize={list.pageSize}
            totalPages={list.totalPages}
            total={list.total}
            search={list.search}
            onSearchChange={list.updateSearch}
            onPageChange={list.setPage}
            onPageSizeChange={list.updatePageSize}
            onEdit={setSequenceMaterial}
            onView={setViewMaterial}
            onDelete={handleDelete}
            getExportRows={getExportRows}
          />
        }
      />
      <EditSequenceModal
        open={Boolean(sequenceMaterial)}
        material={sequenceMaterial}
        pending={sequencePending}
        onClose={() => setSequenceMaterial(null)}
        onSave={handleSaveSequence}
      />
      <ViewMaterialModal
        open={Boolean(viewMaterial)}
        material={viewMaterial}
        onClose={() => setViewMaterial(null)}
      />
      {dialog}
    </>
  );
}
