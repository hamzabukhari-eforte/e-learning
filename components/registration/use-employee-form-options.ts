"use client";

import { useEffect, useState } from "react";
import {
  getEmployeeFormOptions,
  type SelectOption,
} from "@/data/registration/employee";

export function useEmployeeFormOptions() {
  const [departments, setDepartments] = useState<SelectOption[]>([]);
  const [designations, setDesignations] = useState<SelectOption[]>([]);
  const [hods, setHods] = useState<SelectOption[]>([]);
  const [countries, setCountries] = useState<SelectOption[]>([]);
  const [cities, setCities] = useState<SelectOption[]>([]);

  useEffect(() => {
    void getEmployeeFormOptions().then((options) => {
      setDepartments(options.departments);
      setDesignations(options.designations);
      setHods(options.hods);
      setCountries(options.countries);
      setCities(options.cities);
    });
  }, []);

  return { departments, designations, hods, countries, cities };
}
