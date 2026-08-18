"use client";

import { useCallback, useEffect, useState } from "react";
import { usePagedList } from "@/components/system-setup/use-paged-list";
import { listTrainerOptions } from "@/data/registration/trainers";
import {
  assignTrainingsToTrainer,
  getAssignedTrainingIds,
} from "@/data/assign-training/trainer-assignments";
import { listTrainings } from "@/data/system-setup/trainings";
import type { SelectOption } from "@/data/registration/types";
import type { Training } from "@/data/system-setup/types";

export function useAssignTrainer() {
  const [trainerId, setTrainerId] = useState("");
  const [trainers, setTrainers] = useState<SelectOption[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const listFn = useCallback(
    (params: { search: string; page: number; pageSize: number }) =>
      listTrainings(params),
    [],
  );
  const list = usePagedList<Training>(listFn);

  useEffect(() => {
    void listTrainerOptions().then(setTrainers);
  }, []);

  async function handleTrainerChange(nextId: string) {
    setTrainerId(nextId);
    setError(null);
    setMessage(null);
    setSelectedIds(nextId ? await getAssignedTrainingIds(nextId) : []);
  }

  function toggleTraining(id: string) {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
    setMessage(null);
  }

  async function handleAssign() {
    if (!trainerId) {
      setError("Select a trainer first.");
      setMessage(null);
      return;
    }
    if (!selectedIds.length) {
      setError("Select at least one training.");
      setMessage(null);
      return;
    }
    setPending(true);
    setError(null);
    const result = await assignTrainingsToTrainer(trainerId, selectedIds);
    setPending(false);
    if (!result) {
      setError("Unable to assign training.");
      return;
    }
    setMessage("Training assigned successfully.");
  }

  return {
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
  };
}
