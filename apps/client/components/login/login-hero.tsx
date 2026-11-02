"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaBookOpen, FaChartLine, FaAward } from "react-icons/fa6";
import { LoginLogo } from "@/components/login/login-logo";
import { LoginFeatureCard } from "@/components/login/login-feature-card";

const FEATURES = [
  {
    icon: FaBookOpen,
    title: "Structured Courses",
    description: "Curated learning paths for every role and skill level.",
  },
  {
    icon: FaChartLine,
    title: "Progress Tracking",
    description: "Monitor completion rates and learner performance in real time.",
  },
  {
    icon: FaAward,
    title: "Certifications",
    description: "Issue and verify credentials when training is complete.",
  },
] as const;

export function LoginHero() {
  return (
    <section className="relative hidden min-h-screen w-full overflow-hidden lg:flex lg:w-1/2">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
      >
        <Image
          src="/assets/images/login-bg.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="50vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-br from-[#042954]/75 via-[#042954]/50 to-[#042954]/70" />
      <div className="pointer-events-none absolute -left-20 top-16 size-72 rounded-full bg-[#FFA901]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 bottom-10 size-80 rounded-full bg-black/20 blur-3xl" />

      <div className="relative z-10 flex w-full flex-col justify-center gap-12 px-10 py-12 xl:gap-14 xl:px-14">
        <LoginLogo />

        <div className="max-w-xl">
          <motion.p
            className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#FFA901]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            Learn. Grow. Excel.
          </motion.p>
          <motion.h1
            className="text-3xl font-bold leading-tight text-white xl:text-[2.6rem] xl:leading-[1.15]"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
          >
            E-Learning & Training Management Platform
          </motion.h1>
          <motion.p
            className="mt-4 max-w-lg text-base leading-relaxed text-white/85 xl:text-lg"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.38, ease: "easeOut" }}
          >
            Deliver courses, track progress, and empower your teams with
            secure, role-based learning access.
          </motion.p>
        </div>

        <div>
          <div className="grid grid-cols-3 gap-3.5">
            {FEATURES.map((feature, index) => (
              <LoginFeatureCard key={feature.title} index={index} {...feature} />
            ))}
          </div>
          <motion.p
            className="mt-8 text-xs text-white/65"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.95 }}
          >
            © {new Date().getFullYear()} E-Learning Platform. All rights
            reserved.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
