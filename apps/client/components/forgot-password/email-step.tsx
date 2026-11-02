"use client";

import { EmailField } from "@/components/forgot-password/email-field";
import { Button } from "@/components/ui/button";

type EmailStepProps = {
  email: string;
  onEmailChange: (value: string) => void;
  onSend: () => void;
  sending: boolean;
};

export function EmailStep({
  email,
  onEmailChange,
  onSend,
  sending,
}: EmailStepProps) {
  return (
    <section className="space-y-4">
      <p className="text-sm leading-relaxed text-zinc-600">
        For changing password, first enter your registered email and press Send
        to get a verification code on your registered email address.
      </p>
      <EmailField value={email} onChange={onEmailChange} disabled={sending} />
      <div className="flex justify-end">
        <Button type="button" variant="solid" onClick={onSend} disabled={sending}>
          {sending ? "Sending..." : "Send"}
        </Button>
      </div>
    </section>
  );
}
