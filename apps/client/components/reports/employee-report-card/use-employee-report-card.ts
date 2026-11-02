"use client";

import { useEffect, useState } from "react";
import { getEmployeeReportCard } from "@/data/reports/employee-report-card";
import type { EmployeeReportCard } from "@/data/reports/employee-report-card-types";
import { listEmployeeOptions } from "@/data/registration/employees";
import type { SelectOption } from "@/data/registration/types";

export function useEmployeeReportCard() {
  const [employeeId, setEmployeeId] = useState("");
  const [appliedId, setAppliedId] = useState<string | null>(null);
  const [report, setReport] = useState<EmployeeReportCard | null>(null);
  const [employees, setEmployees] = useState<SelectOption[]>([]);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void listEmployeeOptions().then(setEmployees);
  }, []);

  useEffect(() => {
    if (!appliedId) {
      setReport(null);
      return;
    }
    let active = true;
    setPending(true);
    void getEmployeeReportCard(appliedId).then((result) => {
      if (!active) return;
      setReport(result);
      setPending(false);
      if (!result) setError("No report found for the selected employee.");
    });
    return () => {
      active = false;
    };
  }, [appliedId]);

  function handleShowReport() {
    if (!employeeId) {
      setError("Please select an employee.");
      return;
    }
    setError(null);
    setAppliedId(employeeId);
  }

  return {
    employeeId,
    setEmployeeId,
    employees,
    pending,
    error,
    report,
    handleShowReport,
  };
}
