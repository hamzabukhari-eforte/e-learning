"use client";

import { useCallback, useEffect, useState } from "react";

type ListParams = { search: string; page: number; pageSize: number };

type ListResult<T> = {
  rows: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

export function usePagedList<T>(
  listFn: (params: ListParams) => Promise<ListResult<T>>,
) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [rows, setRows] = useState<T[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [pending, setPending] = useState(false);
  const [tick, setTick] = useState(0);

  const reload = useCallback(() => setTick((n) => n + 1), []);

  useEffect(() => {
    let active = true;
    setPending(true);
    void listFn({ search, page, pageSize }).then((result) => {
      if (!active) return;
      setRows(result.rows);
      setTotal(result.total);
      setTotalPages(result.totalPages);
      setPage(result.page);
      setPending(false);
    });
    return () => {
      active = false;
    };
  }, [listFn, search, page, pageSize, tick]);

  function updateSearch(value: string) {
    setSearch(value);
    setPage(1);
  }

  function updatePageSize(value: number) {
    setPageSize(value);
    setPage(1);
  }

  return {
    search,
    updateSearch,
    page,
    setPage,
    pageSize,
    updatePageSize,
    rows,
    total,
    totalPages,
    pending,
    reload,
  };
}
