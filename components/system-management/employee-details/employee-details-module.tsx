"use client";

import { useCallback, useState } from "react";
import { ModulePage } from "@/components/system-setup/module-page";
import { usePagedList } from "@/components/system-setup/use-paged-list";
import { useConfirm } from "@/components/ui/use-confirm";
import { EmployeeDetailsTable } from "@/components/system-management/employee-details/employee-details-table";
import { EmployeeEditModal } from "@/components/system-management/employee-details/employee-edit-modal";
import { useEmployeeFormOptions } from "@/components/registration/use-employee-form-options";
import {
  listEmployees,
  unregisterEmployee,
  updateEmployee,
} from "@/data/registration/employees";
import {
  employeeFullName,
  type Employee,
  type EmployeeRegistrationInput,
} from "@/data/registration/types";

export function EmployeeDetailsModule() {
  const options = useEmployeeFormOptions();
  const { confirm, dialog } = useConfirm();
  const [editing, setEditing] = useState<Employee | null>(null);
  const [pending, setPending] = useState(false);
  const listFn = useCallback(
    (params: { search: string; page: number; pageSize: number }) =>
      listEmployees(params),
    [],
  );
  const list = usePagedList<Employee>(listFn);

  async function handleSave(values: EmployeeRegistrationInput) {
    if (!editing) return;
    setPending(true);
    await updateEmployee(editing.id, values, {
      departmentName:
        options.departments.find((d) => d.id === values.departmentId)?.label ??
        editing.departmentName,
      designationName:
        options.designations.find((d) => d.id === values.designationId)?.label ??
        editing.designationName,
      hodName:
        options.hods.find((d) => d.id === values.hodId)?.label ?? editing.hodName,
    });
    setPending(false);
    setEditing(null);
    await list.reload();
  }

  async function handleUnregister(row: Employee) {
    const ok = await confirm({
      title: "Unregister employee",
      description: `Are you sure you want to unregister "${employeeFullName(row)}"? This action cannot be undone.`,
      confirmLabel: "Unregister",
    });
    if (!ok) return;
    await unregisterEmployee(row.id);
    await list.reload();
  }

  return (
    <>
      <ModulePage
        title="Employee Details"
        entityLabel="Employee"
        sectionLabel="System Management"
        table={
          <EmployeeDetailsTable
            rows={list.rows}
            page={list.page}
            pageSize={list.pageSize}
            totalPages={list.totalPages}
            total={list.total}
            search={list.search}
            onSearchChange={list.updateSearch}
            onPageChange={list.setPage}
            onPageSizeChange={list.updatePageSize}
            onEdit={setEditing}
            onUnregister={handleUnregister}
          />
        }
      />
      {editing ? (
        <EmployeeEditModal
          key={editing.id}
          open
          employee={editing}
          pending={pending}
          onClose={() => setEditing(null)}
          onSave={handleSave}
        />
      ) : null}
      {dialog}
    </>
  );
}
