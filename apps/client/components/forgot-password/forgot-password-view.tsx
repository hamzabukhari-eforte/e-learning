"use client";

import { motion } from "framer-motion";
import { ForgotPasswordForm } from "@/components/forgot-password/forgot-password-form";
import { LoginLogo } from "@/components/login/login-logo";

export function ForgotPasswordView() {
  return (
    <motion.main
      className="flex min-h-screen w-full flex-col items-center justify-center bg-[#F7F7F8] px-4 py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      <div className="mb-6">
        <LoginLogo variant="dark" />
      </div>

      <motion.h1
        className="mb-6 text-center text-2xl font-bold text-black md:text-3xl"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        Change Password
      </motion.h1>

      <motion.div
        className="w-full max-w-2xl overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.08, ease: "easeOut" }}
      >
        <div className="border-b border-zinc-200 bg-zinc-100 px-6 py-3">
          <h2 className="text-sm font-semibold text-black">
            Change Password Process
          </h2>
        </div>
        <div className="px-6 py-6 md:px-8 md:py-8">
          <ForgotPasswordForm />
        </div>
      </motion.div>
    </motion.main>
  );
}
