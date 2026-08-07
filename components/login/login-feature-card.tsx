"use client";

import type { IconType } from "react-icons";
import { motion } from "framer-motion";

type LoginFeatureCardProps = {
  icon: IconType;
  title: string;
  description: string;
  index: number;
};

export function LoginFeatureCard({
  icon: Icon,
  title,
  description,
  index,
}: LoginFeatureCardProps) {
  return (
    <motion.div
      className="group cursor-default rounded-2xl border border-white/15 bg-white/10 p-4 shadow-[0_8px_30px_rgba(0,0,0,0.18)] backdrop-blur-md transition-colors hover:border-[#FFA901]/45 hover:bg-white/15"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.55 + index * 0.12, ease: "easeOut" }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <span className="mb-3 flex size-10 items-center justify-center rounded-xl bg-[#042954]/45 ring-1 ring-[#FFA901]/35">
        <Icon className="size-5 text-[#FFA901]" aria-hidden />
      </span>
      <h3 className="mb-1.5 text-sm font-semibold text-white">{title}</h3>
      <p className="text-xs leading-relaxed text-white/75">{description}</p>
    </motion.div>
  );
}
