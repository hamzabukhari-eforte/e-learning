"use client";

import { useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SearchableMultiOptions } from "@/components/registration/searchable-multi-options";
import { cn } from "@/lib/utils";
import type { SelectOption } from "@/data/registration/types";

type SearchableMultiSelectProps = {
  id: string;
  label: string;
  placeholder: string;
  values: string[];
  options: SelectOption[];
  onChange: (values: string[]) => void;
  required?: boolean;
  searchPlaceholder?: string;
};

export function SearchableMultiSelect({
  id,
  label,
  placeholder,
  values,
  options,
  onChange,
  required,
  searchPlaceholder,
}: SearchableMultiSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const selected = options.filter((option) => values.includes(option.id));
  const q = query.trim().toLowerCase();
  const filtered = q
    ? options.filter((option) => option.label.toLowerCase().includes(q))
    : options;
  const summary =
    selected.length === 0
      ? placeholder
      : selected.length <= 2
        ? selected.map((item) => item.label).join(", ")
        : `${selected.length} employees selected`;

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  return (
    <div className="space-y-2" ref={rootRef}>
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <button
          type="button"
          id={id}
          className={cn(
            "flex h-11 w-full cursor-pointer items-center justify-between rounded-md border border-zinc-300 bg-white px-3 text-sm",
            selected.length ? "text-black" : "text-zinc-400",
          )}
          onClick={() => setOpen((current) => !current)}
          aria-expanded={open}
        >
          <span className="truncate">{summary}</span>
          <FaChevronDown className="size-3.5 shrink-0 text-[#FFA901]" />
        </button>
        {open ? (
          <div className="absolute z-20 mt-1 w-full rounded-md border border-zinc-200 bg-white p-2 shadow-lg">
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={searchPlaceholder ?? placeholder}
              autoFocus
              className="mb-2"
            />
            <SearchableMultiOptions
              options={filtered}
              values={values}
              onToggle={(optionId) =>
                onChange(
                  values.includes(optionId)
                    ? values.filter((id) => id !== optionId)
                    : [...values, optionId],
                )
              }
            />
          </div>
        ) : null}
      </div>
      {required ? (
        <input className="sr-only" value={values.join(",")} required readOnly tabIndex={-1} aria-hidden />
      ) : null}
    </div>
  );
}
