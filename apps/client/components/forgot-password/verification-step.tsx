"use client";

import { VerificationCodeField } from "@/components/forgot-password/verification-code-field";
import { Button } from "@/components/ui/button";

type VerificationStepProps = {
  code: string;
  onCodeChange: (value: string) => void;
  onVerify: () => void;
  enabled: boolean;
  verifying: boolean;
};

export function VerificationStep({
  code,
  onCodeChange,
  onVerify,
  enabled,
  verifying,
}: VerificationStepProps) {
  return (
    <section className="space-y-4">
      <p className="text-sm leading-relaxed text-zinc-600">
        Enter the verification code you recently received at your registered
        email address and press Verify.
      </p>
      <VerificationCodeField
        value={code}
        onChange={onCodeChange}
        disabled={!enabled || verifying}
      />
      <div className="flex justify-end">
        <Button
          type="button"
          variant="solid"
          onClick={onVerify}
          disabled={!enabled || verifying}
        >
          {verifying ? "Verifying..." : "Verify"}
        </Button>
      </div>
    </section>
  );
}
