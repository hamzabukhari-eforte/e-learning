"use client";

import { ModulePage } from "@/components/system-setup/module-page";
import { AssignTrainerFields } from "@/components/assign-training/assign-trainer-fields";
import { AssignTrainingActions } from "@/components/assign-training/assign-training-actions";
import { AssignTrainingTable } from "@/components/assign-training/assign-training-table";
import { useAssignTrainer } from "@/components/assign-training/use-assign-trainer";

export function AssignTrainerModule() {
  const {
    trainerId,
    trainers,
    selectedIds,
    pending,
    error,
    message,
    list,
    handleTrainerChange,
    toggleTraining,
    handleAssign,
  } = useAssignTrainer();

  return (
    <ModulePage
      title="Assign Training To Trainer"
      entityLabel="Assignment"
      formTitle="Assign Training"
      sectionLabel="Assign Training"
      form={
        <AssignTrainerFields
          trainerId={trainerId}
          trainers={trainers}
          onTrainerChange={(id) => void handleTrainerChange(id)}
        />
      }
      table={
        <>
          <AssignTrainingTable
            rows={list.rows}
            selectedIds={selectedIds}
            page={list.page}
            pageSize={list.pageSize}
            totalPages={list.totalPages}
            total={list.total}
            search={list.search}
            onSearchChange={list.updateSearch}
            onPageChange={list.setPage}
            onPageSizeChange={list.updatePageSize}
            onToggle={toggleTraining}
          />
          <AssignTrainingActions
            selectedCount={selectedIds.length}
            pending={pending}
            error={error}
            message={message}
            onAssign={() => void handleAssign()}
          />
        </>
      }
    />
  );
}
