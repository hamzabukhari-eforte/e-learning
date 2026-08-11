"use client";

import { useCallback, useState } from "react";
import { ModulePage } from "@/components/system-setup/module-page";
import {
  CountryForm,
  type CountryFormValues,
} from "@/components/system-setup/country/country-form";
import { CountryTable } from "@/components/system-setup/country/country-table";
import { usePagedList } from "@/components/system-setup/use-paged-list";
import {
  createCountry,
  deleteCountry,
  listCountries,
  updateCountry,
} from "@/data/system-setup/countries";
import type { Country } from "@/data/system-setup/types";

const EMPTY: CountryFormValues = { name: "", status: "active" };

export function CountryModule() {
  const [values, setValues] = useState<CountryFormValues>(EMPTY);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const listFn = useCallback(
    (params: { search: string; page: number; pageSize: number }) =>
      listCountries(params),
    [],
  );
  const list = usePagedList<Country>(listFn);

  async function handleSubmit() {
    setPending(true);
    if (editingId) await updateCountry(editingId, values);
    else await createCountry(values);
    setPending(false);
    setValues(EMPTY);
    setEditingId(null);
    list.refreshFromStart();
  }

  return (
    <ModulePage
      title="Define Country"
      entityLabel="Country"
      isEditing={Boolean(editingId)}
      form={
        <CountryForm
          values={values}
          onChange={setValues}
          isEditing={Boolean(editingId)}
          pending={pending}
          onSubmit={handleSubmit}
          onCancel={() => {
            setEditingId(null);
            setValues(EMPTY);
          }}
        />
      }
      table={
        <CountryTable
          rows={list.rows}
          page={list.page}
          pageSize={list.pageSize}
          totalPages={list.totalPages}
          total={list.total}
          search={list.search}
          onSearchChange={list.updateSearch}
          onPageChange={list.setPage}
          onPageSizeChange={list.updatePageSize}
          onEdit={(row) => {
            setEditingId(row.id);
            setValues({ name: row.name, status: row.status });
          }}
          onDelete={async (row) => {
            if (!window.confirm(`Delete ${row.name}?`)) return;
            await deleteCountry(row.id);
            await list.reload();
          }}
        />
      }
    />
  );
}
