"use client";

import { Label } from "@/components/ui/label";

type QuestionFileFieldProps = {
  fileName?: string;
  onChange: (fileName?: string) => void;
};

export function QuestionFileField({
  fileName,
  onChange,
}: QuestionFileFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="question-file">Upload File</Label>
      <input
        id="question-file"
        type="file"
        className="block h-11 w-full cursor-pointer text-sm text-zinc-600 file:mr-3 file:h-10 file:cursor-pointer file:rounded-md file:border-0 file:bg-[#042954] file:px-3 file:text-sm file:font-medium file:text-white"
        onChange={(event) =>
          onChange(event.target.files?.[0]?.name)
        }
      />
      {fileName ? (
        <p className="text-xs text-zinc-500">{fileName}</p>
      ) : null}
    </div>
  );
}
