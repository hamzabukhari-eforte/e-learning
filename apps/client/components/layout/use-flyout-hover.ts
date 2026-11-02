"use client";

import { useEffect, useRef, useState } from "react";

export function useFlyoutHover(resetKey: string | boolean) {
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [flyoutOpen, setFlyoutOpen] = useState(false);

  useEffect(() => {
    setFlyoutOpen(false);
  }, [resetKey]);

  useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    },
    [],
  );

  function openFlyout() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setFlyoutOpen(true);
  }

  function scheduleCloseFlyout() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setFlyoutOpen(false), 120);
  }

  return { flyoutOpen, openFlyout, scheduleCloseFlyout };
}
