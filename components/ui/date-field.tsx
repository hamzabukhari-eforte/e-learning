"use client";

import { useEffect, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import { FaCalendarDays } from "react-icons/fa6";
import { Label } from "@/components/ui/label";
import { formatDate } from "@/lib/datetime";
import { cn } from "@/lib/utils";
import "react-day-picker/style.css";

type DateFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  minDate?: Date;
};

export function DateField({
  id,
  label,
  value,
  onChange,
  required,
  minDate,
}: DateFieldProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const selected = value ? new Date(value) : undefined;

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  return (
    <div className="relative space-y-2" ref={rootRef}>
      <Label htmlFor={id}>{label}</Label>
      <button
        type="button"
        id={id}
        className={cn(
          "flex h-11 w-full cursor-pointer items-center justify-between rounded-md border border-zinc-300 bg-white px-3 text-sm",
          value ? "text-black" : "text-zinc-400",
        )}
        onClick={() => setOpen((current) => !current)}
      >
        <span>{value ? formatDate(value) : "Select date"}</span>
        <FaCalendarDays className="size-3.5 text-[#FFA901]" />
      </button>
      {open ? (
        <div className="absolute z-30 mt-1 rounded-md border border-zinc-200 bg-white p-3 shadow-lg">
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={(date) => {
              if (!date) return;
              onChange(date.toISOString());
              setOpen(false);
            }}
            disabled={minDate ? { before: minDate } : undefined}
            defaultMonth={selected ?? minDate ?? new Date()}
          />
        </div>
      ) : null}
      {required ? (
        <input
          className="sr-only"
          value={value}
          required
          readOnly
          tabIndex={-1}
          aria-hidden
        />
      ) : null}
    </div>
  );
}
