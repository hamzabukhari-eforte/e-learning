"use client";

import { useCallback, useEffect, useState } from "react";
import { usePagedList } from "@/components/system-setup/use-paged-list";
import {
  bindTrainings,
  getBoundSubTrainingIds,
} from "@/data/assign-training/designation-bindings";
import { listDepartmentOptions } from "@/data/system-setup/departments";
import { listDesignationOptions } from "@/data/system-setup/designations";
import { listSubTrainings } from "@/data/system-setup/sub-trainings";
import type { SelectOption } from "@/data/registration/types";
import type { SubTraining } from "@/data/system-setup/types";

export function useDesignationBinding() {
  const [departmentId, setDepartmentId] = useState("");
  const [designationId, setDesignationId] = useState("");
  const [departments, setDepartments] = useState<SelectOption[]>([]);
  const [designations, setDesignations] = useState<SelectOption[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const listFn = useCallback(
    (params: { search: string; page: number; pageSize: number }) =>
      listSubTrainings(params),
    [],
  );
  const list = usePagedList<SubTraining>(listFn);

  useEffect(() => {
    void Promise.all([listDepartmentOptions(), listDesignationOptions()]).then(
      ([departmentOptions, designationOptions]) => {
        setDepartments(departmentOptions);
        setDesignations(designationOptions);
      },
    );
  }, []);

  async function loadBound(nextDepartmentId: string, nextDesignationId: string) {
    setError(null);
    setMessage(null);
    if (!nextDepartmentId || !nextDesignationId) {
      setSelectedIds([]);
      return;
    }
    setSelectedIds(await getBoundSubTrainingIds(nextDepartmentId, nextDesignationId));
  }

  function toggleSubTraining(id: string) {
    setSelectedIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
    setMessage(null);
  }

  async function handleBind() {
    if (!departmentId) return setError("Select a department first.");
    if (!designationId) return setError("Select a designation first.");
    if (!selectedIds.length) return setError("Select at least one sub training.");
    setPending(true);
    setError(null);
    const result = await bindTrainings(departmentId, designationId, selectedIds);
    setPending(false);
    if (!result) return setError("Unable to bind training.");
    setMessage("Training bound successfully.");
  }

  return {
    departmentId,
    designationId,
    departments,
    designations,
    selectedIds,
    pending,
    error,
    message,
    list,
    setDepartment: (id: string) => {
      setDepartmentId(id);
      void loadBound(id, designationId);
    },
    setDesignation: (id: string) => {
      setDesignationId(id);
      void loadBound(departmentId, id);
    },
    toggleSubTraining,
    handleBind,
  };
}
