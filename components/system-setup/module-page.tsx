"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

type ModulePageProps = {
  title: string;
  entityLabel: string;
  sectionLabel?: string;
  formTitle?: string;
  isEditing?: boolean;
  form: ReactNode;
  table: ReactNode;
};

export function ModulePage({
  title,
  entityLabel,
  sectionLabel = "System Setup",
  formTitle,
  isEditing = false,
  form,
  table,
}: ModulePageProps) {
  const heading =
    formTitle ?? (isEditing ? `Edit ${entityLabel}` : `Add New ${entityLabel}`);

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <p className="text-sm text-[#FFA901]">{sectionLabel}</p>
        <h1 className="text-2xl font-bold text-black">{title}</h1>
      </div>
      <section className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-black">{heading}</h2>
        {form}
      </section>
      <section className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm">
        {table}
      </section>
    </motion.div>
  );
}
