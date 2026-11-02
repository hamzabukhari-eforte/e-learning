"use client";

import { useCallback, useEffect, useState } from "react";
import { GroupChatForm } from "@/components/group-chat/group-chat-form";
import { GroupChatTable } from "@/components/group-chat/group-chat-table";
import { SentListModal } from "@/components/group-chat/sent-list-modal";
import { ViewMessageModal } from "@/components/group-chat/view-message-modal";
import { ModulePage } from "@/components/system-setup/module-page";
import { usePagedList } from "@/components/system-setup/use-paged-list";
import { getSession } from "@/data/auth";
import {
  createGroupChat,
  listGroupChats,
  sendGroupChatMessage,
  updateGroupChat,
} from "@/data/group-chat/group-chats";
import type { GroupChat, GroupChatInput } from "@/data/group-chat/types";
import { listEmployeeOptionsByDepartment } from "@/data/registration/employees";
import type { SelectOption } from "@/data/registration/types";
import { listDepartmentOptions } from "@/data/system-setup/departments";

const EMPTY: GroupChatInput = {
  endAt: "",
  title: "",
  description: "",
  departmentId: "",
  employeeIds: [],
};

export function GroupChatModule() {
  const [values, setValues] = useState<GroupChatInput>(EMPTY);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [messagePending, setMessagePending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [departments, setDepartments] = useState<SelectOption[]>([]);
  const [employees, setEmployees] = useState<SelectOption[]>([]);
  const [sentListChat, setSentListChat] = useState<GroupChat | null>(null);
  const [messageChat, setMessageChat] = useState<GroupChat | null>(null);
  const listFn = useCallback(
    (params: { search: string; page: number; pageSize: number }) =>
      listGroupChats(params),
    [],
  );
  const list = usePagedList<GroupChat>(listFn);

  useEffect(() => {
    void listDepartmentOptions().then(setDepartments);
  }, []);

  useEffect(() => {
    if (!values.departmentId) {
      setEmployees([]);
      return;
    }
    void listEmployeeOptionsByDepartment(values.departmentId).then((items) =>
      setEmployees(items.map((item) => ({ id: item.id, label: item.label }))),
    );
  }, [values.departmentId]);

  function resetForm() {
    setValues(EMPTY);
    setEditingId(null);
    setError(null);
  }

  async function handleSubmit() {
    if (values.endAt && new Date(values.endAt) < new Date()) {
      setError("Conversation end date and time cannot be in the past.");
      return;
    }
    setPending(true);
    setError(null);
    const result = editingId
      ? await updateGroupChat(editingId, values)
      : await createGroupChat(values);
    setPending(false);
    if (!result) {
      setError("Please complete all fields before saving.");
      return;
    }
    resetForm();
    list.refreshFromStart();
  }

  function handleEdit(row: GroupChat) {
    setEditingId(row.id);
    setError(null);
    setValues({
      endAt: row.endAt,
      title: row.title,
      description: row.description,
      departmentId: row.departmentId,
      employeeIds: row.members.map((member) => member.id),
    });
  }

  async function handleSendMessage(text: string) {
    if (!messageChat) return;
    setMessagePending(true);
    const session = await getSession();
    const updated = await sendGroupChatMessage(
      messageChat.id,
      text,
      session?.name ?? "Trainer",
    );
    setMessagePending(false);
    if (!updated) return;
    setMessageChat(updated);
    await list.reload();
  }

  function getExportRows() {
    return listGroupChats({
      search: list.search,
      page: 1,
      pageSize: 10000,
    }).then((result) => result.items);
  }

  return (
    <>
      <ModulePage
        title="Group chat"
        entityLabel="Group Chat"
        sectionLabel="Group chat"
        isEditing={Boolean(editingId)}
        form={
          <GroupChatForm
            values={values}
            departments={departments}
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
          <GroupChatTable
            rows={list.rows}
            page={list.page}
            pageSize={list.pageSize}
            totalPages={list.totalPages}
            total={list.total}
            search={list.search}
            onSearchChange={list.updateSearch}
            onPageChange={list.setPage}
            onPageSizeChange={list.updatePageSize}
            onSentList={setSentListChat}
            onViewMessage={setMessageChat}
            onEdit={handleEdit}
            getExportRows={getExportRows}
          />
        }
      />
      <SentListModal
        open={Boolean(sentListChat)}
        chat={sentListChat}
        onClose={() => setSentListChat(null)}
      />
      <ViewMessageModal
        open={Boolean(messageChat)}
        chat={messageChat}
        pending={messagePending}
        onClose={() => setMessageChat(null)}
        onSend={handleSendMessage}
      />
    </>
  );
}
