import type { DateRange } from "react-day-picker";
import { isSameDay, toEndOfDayIso, toStartOfDayIso } from "@/lib/datetime";

export type DateRangeValue = { dateFrom: string; dateTo: string };

export function applyDateRangeSelect(
  range: DateRange | undefined,
  awaitingEnd: boolean,
): { value: DateRangeValue; awaitingEnd: boolean; close: boolean } {
  if (!range?.from) {
    return { value: { dateFrom: "", dateTo: "" }, awaitingEnd: false, close: false };
  }

  const { from, to } = range;
  if (!to || isSameDay(from, to)) {
    if (!awaitingEnd) {
      return {
        value: { dateFrom: toStartOfDayIso(from), dateTo: "" },
        awaitingEnd: true,
        close: false,
      };
    }
    return {
      value: {
        dateFrom: toStartOfDayIso(from),
        dateTo: toEndOfDayIso(to ?? from),
      },
      awaitingEnd: false,
      close: true,
    };
  }

  return {
    value: {
      dateFrom: toStartOfDayIso(from),
      dateTo: toEndOfDayIso(to),
    },
    awaitingEnd: false,
    close: true,
  };
}
