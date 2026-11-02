"use client";

type DocumentLinksProps = {
  names: string[];
};

function downloadDocument(fileName: string) {
  const blob = new Blob([`Document: ${fileName}`], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function DocumentLinks({ names }: DocumentLinksProps) {
  if (names.length === 0) {
    return <span className="text-zinc-500">—</span>;
  }

  return (
    <div className="flex flex-col gap-1">
      {names.map((name) => (
        <button
          key={name}
          type="button"
          onClick={() => downloadDocument(name)}
          className="cursor-pointer text-left text-sm text-[#0b6bcb] underline hover:text-[#084e94]"
        >
          {name}
        </button>
      ))}
    </div>
  );
}
