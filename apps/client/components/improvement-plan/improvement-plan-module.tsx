"use client";

import { useCallback, useEffect, useState } from "react";
import { ImprovementPlanForm } from "@/components/improvement-plan/improvement-plan-form";
import { ImprovementPlanTable } from "@/components/improvement-plan/improvement-plan-table";
import { ViewRespondModal } from "@/components/improvement-plan/view-respond-modal";
import { ModulePage } from "@/components/system-setup/module-page";
import { usePagedList } from "@/components/system-setup/use-paged-list";
import {
  createImprovementPlan,
  listImprovementPlans,
  updateImprovementPlan,
} from "@/data/improvement-plan/plans";
import type {
  ImprovementPlan,
  ImprovementPlanInput,
} from "@/data/improvement-plan/types";
import type { SelectOption } from "@/data/registration/types";
import { listEmployeesForTrainer } from "@/data/registration/trainers";
import { listSubTrainingOptions } from "@/data/system-setup/sub-trainings";
import { listTrainingOptions } from "@/data/system-setup/trainings";

const EMPTY: ImprovementPlanInput = {
  dateFrom: "",
  dateTo: "",
  trainingId: "",
  subTrainingId: "",
  employeeIds: [],
  targetCompletionDate: "",
  taskMaterial: "",
};

export function ImprovementPlanModule() {
  const [values, setValues] = useState<ImprovementPlanInput>(EMPTY);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [trainings, setTrainings] = useState<SelectOption[]>([]);
  const [subTrainings, setSubTrainings] = useState<SelectOption[]>([]);
  const [employees, setEmployees] = useState<SelectOption[]>([]);
  const [viewPlan, setViewPlan] = useState<ImprovementPlan | null>(null);
  const listFn = useCallback(
    (params: { search: string; page: number; pageSize: number }) =>
      listImprovementPlans(params),
    [],
  );
  const list = usePagedList<ImprovementPlan>(listFn);

  useEffect(() => {
    void Promise.all([listTrainingOptions(), listEmployeesForTrainer()]).then(
      ([trainingOptions, employeeOptions]) => {
        setTrainings(trainingOptions);
        setEmployees(employeeOptions);
      },
    );
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
    setPending(true);
    setError(null);
    const result = editingId
      ? await updateImprovementPlan(editingId, values)
      : await createImprovementPlan(values);
    setPending(false);
    if (!result) {
      setError("Please complete all fields before saving.");
      return;
    }
    resetForm();
    list.refreshFromStart();
  }

  function handleEdit(row: ImprovementPlan) {
    setEditingId(row.id);
    setError(null);
    setValues({
      dateFrom: row.dateFrom,
      dateTo: row.dateTo,
      trainingId: row.trainingId,
      subTrainingId: row.subTrainingId,
      employeeIds: [...row.employeeIds],
      targetCompletionDate: row.targetCompletionDate,
      taskMaterial: row.taskMaterial,
    });
  }

  function getExportRows() {
    return listImprovementPlans({
      search: list.search,
      page: 1,
      pageSize: 10000,
    }).then((result) => result.items);
  }

  return (
    <>
      <ModulePage
        title="Employee Improvement Plan"
        entityLabel="Improvement Plan"
        sectionLabel="Employee Improvement Plan"
        isEditing={Boolean(editingId)}
        form={
          <ImprovementPlanForm
            values={values}
            trainings={trainings}
            subTrainings={subTrainings}
            employees={employees}
            isEditing={Boolean(editingId)}
            pending={pending}
            error={error}
            onChange={setValues}
            onSubmit={handleSubmit}
            onCancel={resetForm}
          />
        }
        table={
          <ImprovementPlanTable
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
            onViewRespond={setViewPlan}
            getExportRows={getExportRows}
          />
        }
      />
      <ViewRespondModal
        open={Boolean(viewPlan)}
        plan={viewPlan}
        onClose={() => setViewPlan(null)}
      />
    </>
  );
}
