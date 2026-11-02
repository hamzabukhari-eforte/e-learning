"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { FaCheck } from "react-icons/fa6";
import { cn } from "@/lib/utils";

export function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      className={cn(
        "peer size-4 shrink-0 cursor-pointer rounded border border-zinc-300 bg-white data-[state=checked]:border-[#042954] data-[state=checked]:bg-[#042954] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#042954]/30",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center text-white">
        <FaCheck className="size-2.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}
