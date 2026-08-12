"use client";

import { useRef } from "react";
import Image from "next/image";
import { LuPlus, LuUser } from "react-icons/lu";
import { Label } from "@/components/ui/label";

type ProfileImageUploadProps = {
  previewUrl: string | null;
  fileName: string | null;
  onChange: (file: File | null) => void;
};

export function ProfileImageUpload({
  previewUrl,
  fileName,
  onChange,
}: ProfileImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-3">
      <Label>Upload Profile Image</Label>
      <button
        type="button"
        className="relative flex size-36 cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-dashed border-[#FFA901]/60 bg-[#FFA901]/10"
        onClick={() => inputRef.current?.click()}
        aria-label="Upload profile image"
      >
        {previewUrl ? (
          <Image
            src={previewUrl}
            alt="Profile preview"
            fill
            className="object-cover"
            unoptimized
          />
        ) : (
          <LuUser className="size-20 text-[#FFA901]" aria-hidden />
        )}
        <span className="absolute bottom-2 right-2 flex size-8 items-center justify-center rounded-full bg-[#FFA901] text-white shadow">
          <LuPlus className="size-4" aria-hidden />
        </span>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="block w-full cursor-pointer text-sm text-zinc-600 file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:bg-[#042954] file:px-3 file:py-2 file:text-sm file:font-medium file:text-white"
        onChange={(event) => onChange(event.target.files?.[0] ?? null)}
      />
      {fileName ? (
        <p className="text-xs text-zinc-500">{fileName}</p>
      ) : null}
    </div>
  );
}
