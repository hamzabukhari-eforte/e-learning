"use client";

import { useCallback, useEffect, useState } from "react";
import { ModulePage } from "@/components/system-setup/module-page";
import {
  CityForm,
  type CityFormValues,
} from "@/components/system-setup/city/city-form";
import { CityTable } from "@/components/system-setup/city/city-table";
import { usePagedList } from "@/components/system-setup/use-paged-list";
import { getAllCountries } from "@/data/system-setup/countries";
import {
  createCity,
  deleteCity,
  listCities,
  updateCity,
} from "@/data/system-setup/cities";
import type { City, Country } from "@/data/system-setup/types";

const EMPTY: CityFormValues = { countryId: "", name: "", status: "active" };

export function CityModule() {
  const [values, setValues] = useState<CityFormValues>(EMPTY);
  const [countries, setCountries] = useState<Country[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const listFn = useCallback(
    (params: { search: string; page: number; pageSize: number }) =>
      listCities(params),
    [],
  );
  const list = usePagedList<City>(listFn);

  useEffect(() => {
    void getAllCountries().then(setCountries);
  }, []);

  async function handleSubmit() {
    if (!values.countryId) return;
    setPending(true);
    if (editingId) await updateCity(editingId, values);
    else await createCity(values);
    setPending(false);
    setValues(EMPTY);
    setEditingId(null);
    list.refreshFromStart();
  }

  return (
    <ModulePage
      title="Define City"
      entityLabel="City"
      isEditing={Boolean(editingId)}
      form={
        <CityForm
          values={values}
          countries={countries}
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
        <CityTable
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
            setValues({
              countryId: row.countryId,
              name: row.name,
              status: row.status,
            });
          }}
          onDelete={async (row) => {
            if (!window.confirm(`Delete ${row.name}?`)) return;
            await deleteCity(row.id);
            await list.reload();
          }}
        />
      }
    />
  );
}
