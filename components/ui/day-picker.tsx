"use client";

import type { ChangeEvent } from "react";
import type { DropdownProps } from "react-day-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/** Blocks day clicks / outside-dismiss for a beat after month/year select. */
let suppressUntil = 0;

export function suppressCalendarInteract(ms = 400) {
  suppressUntil = Date.now() + ms;
}

export function isCalendarInteractSuppressed() {
  return Date.now() < suppressUntil;
}

/** Opaque, portaled month/year dropdown for DayPicker captions. */
export function DayPickerDropdown({
  options,
  value,
  onChange,
  disabled,
  "aria-label": ariaLabel,
}: DropdownProps) {
  const selected = options?.find((option) => option.value === Number(value));

  return (
    <Select
      value={value === undefined || value === "" ? undefined : String(value)}
      disabled={disabled}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) suppressCalendarInteract();
      }}
      onValueChange={(next) => {
        suppressCalendarInteract();
        onChange?.({
          target: { value: next },
        } as ChangeEvent<HTMLSelectElement>);
      }}
    >
      <SelectTrigger
        type="button"
        aria-label={ariaLabel}
        className="h-8 w-auto min-w-0 gap-1.5 border-zinc-200 bg-white px-2.5 text-sm font-semibold shadow-none focus:ring-[#042954]/20"
        onPointerDown={(event) => event.stopPropagation()}
      >
        <SelectValue>{selected?.label}</SelectValue>
      </SelectTrigger>
      <SelectContent
        data-calendar-select=""
        className="z-[80] max-h-56 min-w-[var(--radix-select-trigger-width)] border-zinc-200 bg-white shadow-lg"
        onCloseAutoFocus={(event) => event.preventDefault()}
      >
        {options?.map((option) => (
          <SelectItem
            key={option.value}
            value={String(option.value)}
            disabled={option.disabled}
            onPointerDown={(event) => event.stopPropagation()}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export const DAY_PICKER_COMPONENTS = {
  Dropdown: DayPickerDropdown,
};

export const DAY_PICKER_NAV_RANGE = {
  startMonth: new Date(new Date().getFullYear() - 20, 0),
  endMonth: new Date(new Date().getFullYear() + 10, 11),
};

export function isInsideCalendarUi(target: EventTarget | null) {
  if (!(target instanceof Element)) return false;
  return Boolean(
    target.closest("[data-calendar-root]") ||
      target.closest("[data-calendar-select]"),
  );
}
