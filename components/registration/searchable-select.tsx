"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { SelectOption } from "@/data/registration/types";

type SearchableSelectProps = {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  required?: boolean;
};

export function SearchableSelect({
  id,
  label,
  placeholder,
  value,
  options,
  onChange,
  required,
}: SearchableSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const selected = options.find((option) => option.id === value);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, query]);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  function pick(optionId: string) {
    onChange(optionId);
    setQuery("");
    setOpen(false);
  }

  return (
    <div className="space-y-2" ref={rootRef}>
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <button
          type="button"
          id={id}
          className={cn(
            "flex h-11 w-full cursor-pointer items-center justify-between rounded-md border border-zinc-300 bg-white px-3 text-sm",
            selected ? "text-black" : "text-zinc-400",
          )}
          onClick={() => setOpen((current) => !current)}
          aria-expanded={open}
        >
          <span className="truncate">{selected?.label ?? placeholder}</span>
          <FaChevronDown className="size-3.5 shrink-0 text-[#FFA901]" />
        </button>
        {open ? (
          <div className="absolute z-20 mt-1 w-full rounded-md border border-zinc-200 bg-white p-2 shadow-lg">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search employee..."
              autoFocus
              className="mb-2"
            />
            <ul className="max-h-48 overflow-auto">
              {filtered.length === 0 ? (
                <li className="px-2 py-2 text-sm text-zinc-500">No results</li>
              ) : (
                filtered.map((option) => (
                  <li key={option.id}>
                    <button
                      type="button"
                      className="w-full cursor-pointer rounded px-2 py-2 text-left text-sm hover:bg-[#042954]/5"
                      onClick={() => pick(option.id)}
                    >
                      {option.label}
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
        ) : null}
      </div>
      {required ? (
        <input className="sr-only" value={value} required readOnly tabIndex={-1} aria-hidden />
      ) : null}
    </div>
  );
}
