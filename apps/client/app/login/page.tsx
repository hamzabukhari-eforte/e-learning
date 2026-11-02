import type { Metadata } from "next";
import { LoginView } from "@/components/login/login-view";

export const metadata: Metadata = {
  title: "Login | E-Learning",
  description: "Sign in to the E-Learning platform",
};

export default function LoginPage() {
  return <LoginView />;
}
