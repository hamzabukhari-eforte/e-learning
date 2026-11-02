"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/data/auth";

export function LoginForm() {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(null);
    const result = await login({ userId, password, rememberMe });
    setPending(false);
    if (!result.ok) {
      setError(result.message);
      return;
    }
    router.push("/dashboard");
  }

  return (
    <motion.div
      className="flex w-full max-w-md flex-col"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-black">Super Admin Login</h2>
        <p className="mt-2 text-sm text-zinc-500">
          Sign in to the platform console
        </p>
      </div>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Label htmlFor="admin-user-id">User ID</Label>
          <Input
            id="admin-user-id"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter user ID"
            autoComplete="username"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="admin-password">Password</Label>
          <Input
            id="admin-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            autoComplete="current-password"
            required
          />
        </div>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-700">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="size-4 accent-[#042954]"
          />
          Remember me
        </label>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <Button type="submit" variant="solid" className="w-full" disabled={pending}>
          {pending ? "Signing in..." : "Login"}
        </Button>
      </form>
    </motion.div>
  );
}
