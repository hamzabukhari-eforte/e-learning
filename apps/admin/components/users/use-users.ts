"use client";

import { useCallback, useState } from "react";
import { usePagedList } from "@/components/shared/use-paged-list";
import {
  createUser,
  deleteUser,
  listUsers,
  updateUser,
} from "@/data/users/users";
import type { PlatformUser, PlatformUserInput } from "@/data/users/types";

const EMPTY: PlatformUserInput = {
  name: "",
  email: "",
  loginId: "",
  role: "admin",
  status: "active",
};

export function useUsers() {
  const listFn = useCallback(
    (params: { search: string; page: number; pageSize: number }) =>
      listUsers(params),
    [],
  );
  const list = usePagedList<PlatformUser>(listFn);
  const [values, setValues] = useState<PlatformUserInput>(EMPTY);
  const [editing, setEditing] = useState<PlatformUser | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function startEdit(row: PlatformUser) {
    setEditing(row);
    setValues({
      name: row.name,
      email: row.email,
      loginId: row.loginId,
      role: row.role,
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
      ? await updateUser(editing.id, values)
      : await createUser(values);
    setPending(false);
    if (!result.ok) {
      setError(result.message);
      return;
    }
    cancelEdit();
    list.reload();
  }

  async function handleDelete(row: PlatformUser) {
    if (!window.confirm(`Delete user "${row.loginId}"?`)) return;
    const result = await deleteUser(row.id);
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
