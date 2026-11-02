"use client";

import { DomainFields } from "@/components/domains/domain-fields";
import { DomainTable } from "@/components/domains/domain-table";
import { useDomains } from "@/components/domains/use-domains";
import { ModulePage } from "@/components/shared/module-page";

export function ManageDomainModule() {
  const domain = useDomains();

  return (
    <ModulePage
      title="Manage Domain"
      entityLabel="Domain"
      isEditing={Boolean(domain.editing)}
      form={
        <DomainFields
          values={domain.values}
          pending={domain.pending}
          error={domain.error}
          isEditing={Boolean(domain.editing)}
          onChange={domain.setValues}
          onSubmit={domain.handleSubmit}
          onCancel={domain.cancelEdit}
        />
      }
      table={
        <DomainTable
          rows={domain.rows}
          search={domain.search}
          page={domain.page}
          pageSize={domain.pageSize}
          total={domain.total}
          totalPages={domain.totalPages}
          onSearchChange={domain.updateSearch}
          onPageChange={domain.setPage}
          onEdit={domain.startEdit}
          onDelete={domain.handleDelete}
        />
      }
    />
  );
}
