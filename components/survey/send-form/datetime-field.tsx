"use client";

import { useEffect, useRef, useState } from "react";
import { FaCalendarDays } from "react-icons/fa6";
import { Label } from "@/components/ui/label";
import { DateTimeCalendar } from "@/components/survey/send-form/datetime-calendar";
import { DateTimeClock } from "@/components/survey/send-form/datetime-clock";
import { applyTime, formatDateTime, startOfMonth, toIso } from "@/lib/datetime";
import { cn } from "@/lib/utils";

type DateTimeFieldProps = {
  id: string;
  label: string;
  value: string;
  minValue?: string;
  onChange: (value: string) => void;
  required?: boolean;
};

export function DateTimeField({
  id,
  label,
  value,
  minValue,
  onChange,
  required,
}: DateTimeFieldProps) {
  const selected = value ? new Date(value) : null;
  const [open, setOpen] = useState(false);
  const [cursor, setCursor] = useState(startOfMonth(selected ?? new Date()));
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  function selectDay(day: Date) {
    const base = selected ?? new Date();
    onChange(toIso(applyTime(day, base.getHours(), base.getMinutes())));
  }

  function selectTime(hours: number, minutes: number) {
    const base = selected ?? new Date();
    onChange(toIso(applyTime(base, hours, minutes)));
  }

  return (
    <div className="relative space-y-2" ref={rootRef}>
      <Label htmlFor={id}>{label}</Label>
      <button
        type="button"
        id={id}
        className={cn(
          "flex h-11 w-full cursor-pointer items-center justify-between rounded-md border border-zinc-300 bg-white px-3 text-sm",
          selected ? "text-black" : "text-zinc-400",
        )}
        onClick={() => setOpen((current) => !current)}
      >
        <span>{selected ? formatDateTime(value) : "Select date and time"}</span>
        <FaCalendarDays className="size-3.5 text-[#FFA901]" />
      </button>
      {open ? (
        <div className="absolute z-30 mt-1 w-72 rounded-md border border-zinc-200 bg-white p-3 shadow-lg">
          <DateTimeCalendar
            cursor={cursor}
            selected={selected}
            minDate={minValue ? new Date(minValue) : undefined}
            onCursorChange={setCursor}
            onSelectDay={selectDay}
          />
          <DateTimeClock
            hours={selected?.getHours() ?? 9}
            minutes={selected?.getMinutes() ?? 0}
            onChange={selectTime}
          />
        </div>
      ) : null}
      {required ? (
        <input className="sr-only" value={value} required readOnly tabIndex={-1} aria-hidden />
      ) : null}
    </div>
  );
}
