"use client";

import { Label } from "@/components/ui/label";

type DocumentUploadProps = {
  fileNames: string[];
  onChange: (files: FileList | null) => void;
};

export function DocumentUpload({ fileNames, onChange }: DocumentUploadProps) {
  return (
    <div className="max-w-md space-y-2">
      <Label htmlFor="employee-documents">Upload Documents</Label>
      <input
        id="employee-documents"
        type="file"
        multiple
        className="block w-full cursor-pointer text-sm text-zinc-600 file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:bg-[#042954] file:px-3 file:py-2 file:text-sm file:font-medium file:text-white"
        onChange={(event) => onChange(event.target.files)}
      />
      {fileNames.length > 0 ? (
        <ul className="space-y-1 text-xs text-zinc-500">
          {fileNames.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
