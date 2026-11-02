"use client";

import { useCallback, useEffect, useState } from "react";
import { ModulePage } from "@/components/system-setup/module-page";
import { usePagedList } from "@/components/system-setup/use-paged-list";
import { NotificationForm } from "@/components/notification/notification-form";
import { NotificationTable } from "@/components/notification/notification-table";
import {
  listNotifications,
  sendNotification,
} from "@/data/notification/notifications";
import type {
  AppNotification,
  NotificationInput,
} from "@/data/notification/types";
import { listDepartmentOptions } from "@/data/system-setup/departments";
import type { SelectOption } from "@/data/registration/types";

const EMPTY: NotificationInput = {
  departmentId: "",
  receiverType: "",
  text: "",
};

export function NotificationModule() {
  const [values, setValues] = useState<NotificationInput>(EMPTY);
  const [departments, setDepartments] = useState<SelectOption[]>([]);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const listFn = useCallback(
    (params: { search: string; page: number; pageSize: number }) =>
      listNotifications(params),
    [],
  );
  const list = usePagedList<AppNotification>(listFn);

  useEffect(() => {
    void listDepartmentOptions().then(setDepartments);
  }, []);

  async function handleSubmit() {
    if (!values.departmentId || !values.receiverType || !values.text.trim()) {
      setError("Please fill all fields.");
      return;
    }
    setPending(true);
    setError(null);
    const result = await sendNotification(values);
    setPending(false);
    if (!result) {
      setError("Unable to send notification.");
      return;
    }
    setValues(EMPTY);
    list.refreshFromStart();
  }

  return (
    <ModulePage
      title="Notifications"
      entityLabel="Notifications"
      sectionLabel="Notifications"
      formTitle="Send Notifications"
      form={
        <div className="space-y-3">
          <NotificationForm
            values={values}
            departments={departments}
            pending={pending}
            onChange={setValues}
            onSubmit={handleSubmit}
          />
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
        </div>
      }
      table={
        <NotificationTable
          rows={list.rows}
          page={list.page}
          pageSize={list.pageSize}
          totalPages={list.totalPages}
          total={list.total}
          search={list.search}
          onSearchChange={list.updateSearch}
          onPageChange={list.setPage}
          onPageSizeChange={list.updatePageSize}
        />
      }
    />
  );
}
