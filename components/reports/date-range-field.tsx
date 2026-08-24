"use client";

import { useEffect, useRef, useState } from "react";
import { DayPicker, type DateRange } from "react-day-picker";
import { FaCalendarDays } from "react-icons/fa6";
import { applyDateRangeSelect } from "@/components/reports/date-range-select";
import { Label } from "@/components/ui/label";
import { formatDate } from "@/lib/datetime";
import { cn } from "@/lib/utils";
import "react-day-picker/style.css";

type DateRangeFieldProps = {
  id: string;
  label?: string;
  dateFrom: string;
  dateTo: string;
  onChange: (range: { dateFrom: string; dateTo: string }) => void;
  required?: boolean;
};

export function DateRangeField({
  id,
  label = "Date Range",
  dateFrom,
  dateTo,
  onChange,
  required,
}: DateRangeFieldProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const awaitingEnd = useRef(false);
  const selected: DateRange | undefined =
    dateFrom || dateTo
      ? {
          from: dateFrom ? new Date(dateFrom) : undefined,
          to: dateTo ? new Date(dateTo) : undefined,
        }
      : undefined;
  const display =
    dateFrom && dateTo
      ? `${formatDate(dateFrom)} – ${formatDate(dateTo)}`
      : dateFrom
        ? `${formatDate(dateFrom)} – …`
        : "Select date range";

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  function handleSelect(range: DateRange | undefined) {
    const result = applyDateRangeSelect(range, awaitingEnd.current);
    awaitingEnd.current = result.awaitingEnd;
    onChange(result.value);
    if (result.close) setOpen(false);
  }

  return (
    <div className="relative space-y-2" ref={rootRef}>
      <Label htmlFor={id}>{label}</Label>
      <button
        type="button"
        id={id}
        className={cn(
          "flex h-11 w-full cursor-pointer items-center justify-between rounded-md border border-zinc-300 bg-white px-3 text-sm",
          dateFrom && dateTo ? "text-black" : "text-zinc-400",
        )}
        onClick={() =>
          setOpen((current) => {
            if (!current) awaitingEnd.current = Boolean(dateFrom && !dateTo);
            return !current;
          })
        }
      >
        <span>{display}</span>
        <FaCalendarDays className="size-3.5 text-[#FFA901]" />
      </button>
      {open ? (
        <div className="absolute z-30 mt-1 rounded-md border border-zinc-200 bg-white p-3 shadow-lg">
          <DayPicker
            mode="range"
            selected={selected}
            onSelect={handleSelect}
            numberOfMonths={1}
            defaultMonth={selected?.from ?? new Date()}
          />
        </div>
      ) : null}
      {required ? (
        <input
          className="sr-only"
          value={dateFrom && dateTo ? `${dateFrom}|${dateTo}` : ""}
          required
          readOnly
          tabIndex={-1}
          aria-hidden
        />
      ) : null}
    </div>
  );
}
