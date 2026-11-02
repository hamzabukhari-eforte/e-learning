"use client";

import { DocumentUpload } from "@/components/registration/document-upload";

type EmployeeDocumentsSectionProps = {
  fileNames: string[];
  onChange: (files: FileList | null) => void;
};

export function EmployeeDocumentsSection({
  fileNames,
  onChange,
}: EmployeeDocumentsSectionProps) {
  return (
    <section className="space-y-4 border-t border-zinc-200 pt-6">
      <h2 className="text-xl font-bold text-[#042954]">Employee Documents</h2>
      <DocumentUpload fileNames={fileNames} onChange={onChange} />
    </section>
  );
}
