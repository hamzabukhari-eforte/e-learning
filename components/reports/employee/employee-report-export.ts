import {
  employeeFullName,
  type Employee,
} from "@/data/registration/types";
import type { ExportColumn } from "@/lib/table-export";

export const EMPLOYEE_REPORT_EXPORT_COLUMNS: ExportColumn<Employee>[] = [
  { header: "Serial #", getValue: (_row, index) => String(index + 1) },
  { header: "Registration Date", getValue: (row) => row.registrationDate },
  { header: "Employee No", getValue: (row) => row.employeeNo },
  { header: "Employee Name", getValue: (row) => employeeFullName(row) },
  { header: "Employee ID", getValue: (row) => row.id },
  { header: "Employee Contact", getValue: (row) => row.contactNumber },
  { header: "Employee Email", getValue: (row) => row.email },
  { header: "Gender", getValue: (row) => row.gender },
  { header: "Status", getValue: (row) => row.status },
  {
    header: "Document",
    getValue: (row) =>
      row.documentNames.length > 0 ? row.documentNames.join(", ") : "—",
  },
];
