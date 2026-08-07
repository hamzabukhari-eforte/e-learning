"use client";

import { Button } from "@/components/ui/button";

type NavbarProps = {
  name: string;
  onLogout: () => void;
  loggingOut?: boolean;
};

export function Navbar({ name, onLogout, loggingOut }: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-14 w-full shrink-0 items-center justify-between border-b border-zinc-200 bg-white px-6">
      <p className="text-base font-medium text-zinc-700">
        Welcome, <span className="font-semibold text-black">{name}</span>
      </p>
      <Button
        type="button"
        variant="outline"
        onClick={onLogout}
        disabled={loggingOut}
      >
        {loggingOut ? "Logging out..." : "Logout"}
      </Button>
    </header>
  );
}
