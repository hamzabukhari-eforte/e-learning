"use client";

import { motion } from "framer-motion";
import { LoginHero } from "@/components/login/login-hero";
import { LoginForm } from "@/components/login/login-form";
import { LoginLogo } from "@/components/login/login-logo";

export function LoginView() {
  return (
    <motion.main
      className="flex min-h-screen w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      <LoginHero />
      <section className="flex min-h-screen w-full flex-col items-center justify-center bg-[#F7F7F8] px-6 py-10 lg:w-1/2">
        <div className="mb-8 lg:hidden">
          <LoginLogo />
        </div>
        <LoginForm />
      </section>
    </motion.main>
  );
}
