"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import type { ReactNode } from "react";
import { FaXmark } from "react-icons/fa6";

type ModalProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  size?: "md" | "lg" | "xl";
  /** Stack nested modals above the parent (default 50). */
  zIndex?: number;
};

export function Modal({
  open,
  title,
  onClose,
  children,
  size = "lg",
  zIndex = 50,
}: ModalProps) {
  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center p-4"
      style={{ zIndex }}
    >
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 cursor-pointer bg-black/40"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={`relative z-10 flex max-h-[90vh] w-full flex-col rounded-lg border border-zinc-200 bg-white shadow-lg ${
          size === "md"
            ? "max-w-lg"
            : size === "xl"
              ? "max-w-7xl"
              : "max-w-6xl"
        }`}
      >
        <div className="flex items-center justify-between gap-3 border-b border-zinc-200 px-5 py-4">
          <h2
            id="modal-title"
            className="text-base font-semibold text-[#042954]"
          >
            {title}
          </h2>
          <button
            type="button"
            aria-label="Close"
            className="cursor-pointer rounded p-1 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800"
            onClick={onClose}
          >
            <FaXmark className="size-4" />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-auto p-5">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
