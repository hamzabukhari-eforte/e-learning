"use client";

import { useCallback, useState } from "react";
import { usePagedList } from "@/components/shared/use-paged-list";
import {
  createDomain,
  deleteDomain,
  listDomains,
  updateDomain,
} from "@/data/domains/domains";
import type {
  ClientDomain,
  DomainInput,
} from "@/data/domains/types";

const EMPTY: DomainInput = {
  name: "",
  status: "active",
};

export function useDomains() {
  const listFn = useCallback(
    (params: { search: string; page: number; pageSize: number }) =>
      listDomains(params),
    [],
  );
  const list = usePagedList<ClientDomain>(listFn);
  const [values, setValues] = useState<DomainInput>(EMPTY);
  const [editing, setEditing] = useState<ClientDomain | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function startEdit(row: ClientDomain) {
    setEditing(row);
    setValues({
      name: row.name,
      status: row.status,
    });
    setError(null);
  }

  function cancelEdit() {
    setEditing(null);
    setValues(EMPTY);
    setError(null);
  }

  async function handleSubmit() {
    setPending(true);
    setError(null);
    const result = editing
      ? await updateDomain(editing.id, values)
      : await createDomain(values);
    setPending(false);
    if (!result.ok) {
      setError(result.message);
      return;
    }
    cancelEdit();
    list.reload();
  }

  async function handleDelete(row: ClientDomain) {
    if (!window.confirm(`Delete domain "${row.name}"?`)) return;
    const result = await deleteDomain(row.id);
    if (!result.ok) {
      window.alert(result.message);
      return;
    }
    if (editing?.id === row.id) cancelEdit();
    list.reload();
  }

  return {
    ...list,
    values,
    setValues,
    editing,
    pending,
    error,
    startEdit,
    cancelEdit,
    handleSubmit,
    handleDelete,
  };
}
