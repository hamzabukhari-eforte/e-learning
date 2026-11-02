"use client";

import { ModulePage } from "@/components/system-setup/module-page";
import { AssignTrainingActions } from "@/components/assign-training/assign-training-actions";
import { BindingFields } from "@/components/assign-training/binding-fields";
import { BindingTable } from "@/components/assign-training/binding-table";
import { useDesignationBinding } from "@/components/assign-training/use-designation-binding";

export function DesignationBindingModule() {
  const {
    departmentId,
    designationId,
    departments,
    designations,
    selectedIds,
    pending,
    error,
    message,
    list,
    setDepartment,
    setDesignation,
    toggleSubTraining,
    handleBind,
  } = useDesignationBinding();

  return (
    <ModulePage
      title="Training & Designation Binding"
      entityLabel="Binding"
      formTitle="Bind Training"
      sectionLabel="Assign Training"
      form={
        <BindingFields
          departmentId={departmentId}
          designationId={designationId}
          departments={departments}
          designations={designations}
          onDepartmentChange={setDepartment}
          onDesignationChange={setDesignation}
        />
      }
      table={
        <>
          <BindingTable
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
            onToggle={toggleSubTraining}
          />
          <AssignTrainingActions
            selectedCount={selectedIds.length}
            pending={pending}
            error={error}
            message={message}
            actionLabel="Bind Training"
            pendingLabel="Binding..."
            itemLabel="sub training(s)"
            onAssign={() => void handleBind()}
          />
        </>
      }
    />
  );
}
