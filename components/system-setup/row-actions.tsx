"use client";

import { FaPencil, FaTrash } from "react-icons/fa6";

type RowActionsProps = {
  onEdit: () => void;
  onDelete: () => void;
};

export function RowActions({ onEdit, onDelete }: RowActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onEdit}
        className="cursor-pointer rounded-md p-2 text-[#042954] hover:bg-[#042954]/10"
        aria-label="Edit"
      >
        <FaPencil className="size-3.5" />
      </button>
      <button
        type="button"
        onClick={onDelete}
        className="cursor-pointer rounded-md p-2 text-red-600 hover:bg-red-50"
        aria-label="Delete"
      >
        <FaTrash className="size-3.5" />
      </button>
    </div>
  );
}
