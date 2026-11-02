import type { Metadata } from "next";
import { LoginView } from "@/components/login/login-view";

export const metadata: Metadata = {
  title: "Login | Super Admin",
  description: "Sign in to the E-Learning super admin console",
};

export default function LoginPage() {
  return <LoginView />;
}
