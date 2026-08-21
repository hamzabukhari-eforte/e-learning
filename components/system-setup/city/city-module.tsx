"use client";

import { useCallback, useEffect, useState } from "react";
import { ModulePage } from "@/components/system-setup/module-page";
import {
  CityForm,
  type CityFormValues,
} from "@/components/system-setup/city/city-form";
import { CityTable } from "@/components/system-setup/city/city-table";
import { usePagedList } from "@/components/system-setup/use-paged-list";
import { useConfirm } from "@/components/ui/use-confirm";
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
  const { confirm, dialog } = useConfirm();
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

  async function handleDelete(row: City) {
    const ok = await confirm({
      title: "Delete city",
      description: `Are you sure you want to delete "${row.name}"? This action cannot be undone.`,
      confirmLabel: "Delete",
    });
    if (!ok) return;
    await deleteCity(row.id);
    await list.reload();
  }

  return (
    <>
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
            onDelete={handleDelete}
          />
        }
      />
      {dialog}
    </>
  );
}
