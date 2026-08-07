"use client";

import { useState } from "react";
import Link from "next/link";
import { FaAngleLeft } from "react-icons/fa6";
import { EmailStep } from "@/components/forgot-password/email-step";
import { VerificationStep } from "@/components/forgot-password/verification-step";
import { Button } from "@/components/ui/button";
import {
  sendPasswordResetCode,
  verifyPasswordResetCode,
} from "@/data/auth";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);

  async function handleSend() {
    setSending(true);
    setError(null);
    setMessage(null);
    const result = await sendPasswordResetCode(email);
    setSending(false);
    if (!result.ok) {
      setError(result.message);
      return;
    }
    setCodeSent(true);
    setMessage("Verification code sent to your registered email.");
  }

  async function handleVerify() {
    setVerifying(true);
    setError(null);
    setMessage(null);
    const result = await verifyPasswordResetCode(email, code);
    setVerifying(false);
    if (!result.ok) {
      setError(result.message);
      return;
    }
    setMessage("Verification successful. You can set a new password next.");
  }

  return (
    <div className="space-y-8">
      <EmailStep
        email={email}
        onEmailChange={setEmail}
        onSend={handleSend}
        sending={sending}
      />
      <VerificationStep
        code={code}
        onCodeChange={setCode}
        onVerify={handleVerify}
        enabled={codeSent}
        verifying={verifying}
      />
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      {message ? <p className="text-sm text-[#042954]">{message}</p> : null}
      <Button asChild variant="outline">
        <Link href="/login" className="cursor-pointer">
          <FaAngleLeft className="size-3.5" aria-hidden />
          Previous
        </Link>
      </Button>
    </div>
  );
}
