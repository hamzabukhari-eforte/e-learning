"use client";

import { useCallback, useEffect, useState } from "react";
import type { PaginatedResult } from "@/data/system-setup/types";

export const PAGE_SIZE_OPTIONS = [10, 25, 50, 100] as const;
export type PageSizeOption = (typeof PAGE_SIZE_OPTIONS)[number];

type ListFn<T> = (params: {
  search: string;
  page: number;
  pageSize: number;
}) => Promise<PaginatedResult<T>>;

export function usePagedList<T>(listFn: ListFn<T>, initialPageSize: PageSizeOption = 10) {
  const [rows, setRows] = useState<T[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<PageSizeOption>(initialPageSize);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const applyResult = useCallback((result: PaginatedResult<T>) => {
    setRows(result.items);
    setTotal(result.total);
    setTotalPages(result.totalPages);
    setPage(result.page);
  }, []);

  const reload = useCallback(
    async (
      nextPage = page,
      nextSearch = search,
      nextPageSize = pageSize,
    ) => {
      const result = await listFn({
        search: nextSearch,
        page: nextPage,
        pageSize: nextPageSize,
      });
      applyResult(result);
    },
    [applyResult, listFn, page, pageSize, search],
  );

  useEffect(() => {
    void reload();
  }, [page, search, pageSize, listFn]); // eslint-disable-line react-hooks/exhaustive-deps

  function updateSearch(value: string) {
    setSearch(value);
    setPage(1);
  }

  function updatePageSize(size: PageSizeOption) {
    setPageSize(size);
    setPage(1);
  }

  async function refreshFromStart() {
    setPage(1);
    await reload(1, search, pageSize);
  }

  return {
    rows,
    search,
    page,
    pageSize,
    total,
    totalPages,
    setPage,
    updateSearch,
    updatePageSize,
    reload: () => reload(),
    refreshFromStart,
  };
}
