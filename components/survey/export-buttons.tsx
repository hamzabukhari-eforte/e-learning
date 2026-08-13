"use client";

import { useState } from "react";
import {
  FaCopy,
  FaFileCsv,
  FaFileExcel,
  FaFilePdf,
  FaPrint,
} from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import {
  copyTable,
  downloadCsv,
  downloadExcel,
  printTable,
  type ExportColumn,
} from "@/lib/table-export";

type ExportButtonsProps<T> = {
  title: string;
  filename: string;
  columns: ExportColumn<T>[];
  getRows: () => Promise<T[]>;
};

const ACTIONS = [
  { id: "copy", label: "Copy", icon: FaCopy },
  { id: "csv", label: "CSV", icon: FaFileCsv },
  { id: "excel", label: "Excel", icon: FaFileExcel },
  { id: "pdf", label: "PDF", icon: FaFilePdf },
  { id: "print", label: "Print", icon: FaPrint },
] as const;

export function ExportButtons<T>({
  title,
  filename,
  columns,
  getRows,
}: ExportButtonsProps<T>) {
  const [message, setMessage] = useState<string | null>(null);

  async function run(id: (typeof ACTIONS)[number]["id"]) {
    const rows = await getRows();
    if (id === "copy") {
      await copyTable(rows, columns);
      setMessage("Copied");
      window.setTimeout(() => setMessage(null), 1500);
      return;
    }
    if (id === "csv") downloadCsv(rows, columns, filename);
    if (id === "excel") downloadExcel(rows, columns, filename);
    if (id === "pdf" || id === "print") printTable(title, rows, columns);
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {ACTIONS.map((action) => (
        <Button
          key={action.id}
          type="button"
          variant="outline"
          className="gap-1.5 px-3"
          onClick={() => void run(action.id)}
        >
          <action.icon className="size-3.5 text-[#FFA901]" />
          {action.label}
        </Button>
      ))}
      {message ? (
        <span className="text-xs font-medium text-[#042954]">{message}</span>
      ) : null}
    </div>
  );
}
