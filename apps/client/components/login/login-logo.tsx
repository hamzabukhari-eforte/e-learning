"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type LoginLogoProps = {
  variant?: "default" | "dark";
};

const LOGO_SRC = {
  default: "/assets/images/SES-logo.png",
  dark: "/assets/images/SES-logo-dark.png",
} as const;

export function LoginLogo({ variant = "default" }: LoginLogoProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Image
        src={LOGO_SRC[variant]}
        alt="SES — A Supernet Company"
        width={100}
        height={100}
        priority
        className="h-20 w-auto object-contain"
      />
    </motion.div>
  );
}
