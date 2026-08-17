"use client";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import {
  WEEKDAYS,
  addMonths,
  isSameDay,
  monthDays,
} from "@/lib/datetime";
import { cn } from "@/lib/utils";

type DateTimeCalendarProps = {
  cursor: Date;
  selected?: Date | null;
  minDate?: Date;
  onCursorChange: (date: Date) => void;
  onSelectDay: (date: Date) => void;
};

export function DateTimeCalendar({
  cursor,
  selected,
  minDate,
  onCursorChange,
  onSelectDay,
}: DateTimeCalendarProps) {
  const today = new Date();
  const label = cursor.toLocaleString("en-GB", { month: "long", year: "numeric" });

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          className="flex size-8 cursor-pointer items-center justify-center rounded-md hover:bg-[#042954]/5"
          onClick={() => onCursorChange(addMonths(cursor, -1))}
          aria-label="Previous month"
        >
          <FaChevronLeft className="size-3 text-[#FFA901]" />
        </button>
        <p className="text-sm font-semibold text-[#042954]">{label}</p>
        <button
          type="button"
          className="flex size-8 cursor-pointer items-center justify-center rounded-md hover:bg-[#042954]/5"
          onClick={() => onCursorChange(addMonths(cursor, 1))}
          aria-label="Next month"
        >
          <FaChevronRight className="size-3 text-[#FFA901]" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-medium text-zinc-500">
        {WEEKDAYS.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>
      <div className="mt-1 grid grid-cols-7 gap-1">
        {monthDays(cursor).map((day) => {
          const outside = day.getMonth() !== cursor.getMonth();
          const disabled = minDate
            ? day < new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())
            : false;
          const picked = selected ? isSameDay(day, selected) : false;
          const isToday = isSameDay(day, today);
          return (
            <button
              key={day.toISOString()}
              type="button"
              disabled={disabled}
              onClick={() => onSelectDay(day)}
              className={cn(
                "h-8 cursor-pointer rounded-md text-xs",
                outside && "text-zinc-400",
                disabled && "cursor-not-allowed opacity-40",
                picked && "bg-[#042954] font-semibold text-white",
                !picked && isToday && "border border-[#FFA901] text-[#042954]",
                !picked && !disabled && "hover:bg-[#042954]/10",
              )}
            >
              {day.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
