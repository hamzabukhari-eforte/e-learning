"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { LoginAsSelect } from "@/components/login/login-as-select";
import { UserIdField } from "@/components/login/user-id-field";
import { PasswordField } from "@/components/login/password-field";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { login, type LoginRole } from "@/data/auth";

export function LoginForm() {
  const router = useRouter();
  const [role, setRole] = useState<LoginRole | null>(null);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(null);
    const result = await login({ role, userId, password, rememberMe });
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
        <h2 className="text-3xl font-bold text-black">Welcome back</h2>
        <p className="mt-2 text-sm text-zinc-500">
          Sign in to your account to continue
        </p>
      </div>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <LoginAsSelect value={role} onChange={setRole} />
        <UserIdField value={userId} onChange={setUserId} />
        <PasswordField value={password} onChange={setPassword} />
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Checkbox
              id="remember-me"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked === true)}
            />
            <Label htmlFor="remember-me" className="cursor-pointer font-normal">
              Remember me
            </Label>
          </div>
          <Link
            href="/forgot-password"
            className="cursor-pointer text-sm font-medium text-[#042954] hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <Button type="submit" variant="solid" className="w-full" disabled={pending}>
          {pending ? "Signing in..." : "Login"}
        </Button>
      </form>
      <p className="mt-8 text-center text-xs text-zinc-400">
        Protected by enterprise-grade security. Contact IT for access issues.
      </p>
    </motion.div>
  );
}
