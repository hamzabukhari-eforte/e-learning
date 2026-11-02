import type { Metadata } from "next";
import { ForgotPasswordView } from "@/components/forgot-password/forgot-password-view";

export const metadata: Metadata = {
  title: "Change Password | E-Learning",
  description: "Reset your E-Learning account password",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordView />;
}
