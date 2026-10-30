"use client";

import { useEffect, useState } from "react";
import { NotificationModule } from "@/components/notification/notification-module";
import { TrainerNotificationModule } from "@/components/notification/trainer-notification-module";
import { getSession, type LoginRole } from "@/data/auth";

export function NotificationsGate() {
  const [role, setRole] = useState<LoginRole | null>(null);

  useEffect(() => {
    void getSession().then((session) => setRole(session?.role ?? null));
  }, []);

  if (role === "trainer") return <TrainerNotificationModule />;
  if (role === null) return null;
  return <NotificationModule />;
}
