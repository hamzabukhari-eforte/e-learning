"use client";

import { ModulePage } from "@/components/shared/module-page";
import { UserFields } from "@/components/users/user-fields";
import { UserTable } from "@/components/users/user-table";
import { useUsers } from "@/components/users/use-users";

export function ManageUsersModule() {
  const users = useUsers();

  return (
    <ModulePage
      title="Manage Users"
      entityLabel="User"
      isEditing={Boolean(users.editing)}
      form={
        <UserFields
          values={users.values}
          pending={users.pending}
          error={users.error}
          isEditing={Boolean(users.editing)}
          onChange={users.setValues}
          onSubmit={users.handleSubmit}
          onCancel={users.cancelEdit}
        />
      }
      table={
        <UserTable
          rows={users.rows}
          search={users.search}
          page={users.page}
          pageSize={users.pageSize}
          total={users.total}
          totalPages={users.totalPages}
          onSearchChange={users.updateSearch}
          onPageChange={users.setPage}
          onEdit={users.startEdit}
          onDelete={users.handleDelete}
        />
      }
    />
  );
}
