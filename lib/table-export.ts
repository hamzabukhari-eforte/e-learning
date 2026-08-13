export type ExportColumn<T> = {
  header: string;
  getValue: (row: T, index: number) => string;
};

function toMatrix<T>(rows: T[], columns: ExportColumn<T>[]) {
  return [
    columns.map((column) => column.header),
    ...rows.map((row, index) =>
      columns.map((column) => column.getValue(row, index)),
    ),
  ];
}

function escapeCsv(value: string) {
  return `"${value.replace(/"/g, '""')}"`;
}

function downloadBlob(content: string, filename: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export async function copyTable<T>(rows: T[], columns: ExportColumn<T>[]) {
  const text = toMatrix(rows, columns)
    .map((line) => line.map((cell) => cell.replace(/\n/g, " | ")).join("\t"))
    .join("\n");
  await navigator.clipboard.writeText(text);
}

export function downloadCsv<T>(
  rows: T[],
  columns: ExportColumn<T>[],
  filename: string,
) {
  const csv = toMatrix(rows, columns)
    .map((line) => line.map(escapeCsv).join(","))
    .join("\n");
  downloadBlob(csv, `${filename}.csv`, "text/csv;charset=utf-8;");
}

export function downloadExcel<T>(
  rows: T[],
  columns: ExportColumn<T>[],
  filename: string,
) {
  const table = toMatrix(rows, columns)
    .map(
      (line) =>
        `<tr>${line
          .map(
            (cell) =>
              `<td>${escapeHtml(cell).replace(/\n/g, "<br/>")}</td>`,
          )
          .join("")}</tr>`,
    )
    .join("");
  const html = `<html><head><meta charset="utf-8" /></head><body><table>${table}</table></body></html>`;
  downloadBlob(html, `${filename}.xls`, "application/vnd.ms-excel");
}

export function printTable<T>(
  title: string,
  rows: T[],
  columns: ExportColumn<T>[],
) {
  const header = columns
    .map((column) => `<th>${escapeHtml(column.header)}</th>`)
    .join("");
  const body = rows
    .map(
      (row, index) =>
        `<tr>${columns
          .map(
            (column) =>
              `<td>${escapeHtml(column.getValue(row, index)).replace(/\n/g, "<br/>")}</td>`,
          )
          .join("")}</tr>`,
    )
    .join("");
  const win = window.open("", "_blank", "noopener,noreferrer");
  if (!win) return;
  win.document.write(`<!doctype html><html><head><title>${escapeHtml(title)}</title>
    <style>body{font-family:sans-serif;padding:24px}h1{font-size:18px}
    table{border-collapse:collapse;width:100%}th,td{border:1px solid #ccc;padding:8px;text-align:left;vertical-align:top}
    th{background:#042954;color:#fff}</style></head>
    <body><h1>${escapeHtml(title)}</h1><table><thead><tr>${header}</tr></thead>
    <tbody>${body}</tbody></table></body></html>`);
  win.document.close();
  win.focus();
  win.print();
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
