"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type TruncatedDescriptionProps = {
  text: string;
  className?: string;
};

/** Clamps to 2 lines; shows native tooltip only when text is truncated. */
export function TruncatedDescription({
  text,
  className,
}: TruncatedDescriptionProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [truncated, setTruncated] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    function measure() {
      if (!node) return;
      setTruncated(node.scrollHeight > node.clientHeight + 1);
    }

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [text]);

  return (
    <p
      ref={ref}
      className={cn("line-clamp-2 max-w-xs text-sm text-black", className)}
      title={truncated ? text : undefined}
    >
      {text}
    </p>
  );
}
