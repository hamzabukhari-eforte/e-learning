"use client";

import { motion } from "framer-motion";
import { EmployeeRegistrationForm } from "@/components/registration/employee-registration-form";

export function EmployeeRegistrationPage() {
  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <p className="text-sm text-[#FFA901]">Registration</p>
        <h1 className="text-2xl font-bold text-black">Employee Registration</h1>
      </div>
      <EmployeeRegistrationForm />
    </motion.div>
  );
}
