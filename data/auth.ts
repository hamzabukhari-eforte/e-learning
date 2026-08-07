export type LoginRole = "admin" | "trainer" | "employee";

export type LoginPayload = {
  role: LoginRole | null;
  userId: string;
  password: string;
  rememberMe: boolean;
};

export type AuthResult = { ok: true } | { ok: false; message: string };

/** Auth API boundary — replace bodies with real endpoints when available. */
export async function login(payload: LoginPayload): Promise<AuthResult> {
  if (!payload.role) {
    return { ok: false, message: "Please select a role to login as." };
  }
  if (!payload.userId.trim() || !payload.password.trim()) {
    return { ok: false, message: "User ID and password are required." };
  }

  await new Promise((resolve) => setTimeout(resolve, 400));
  console.info("[auth] login attempt", {
    role: payload.role,
    userId: payload.userId,
    rememberMe: payload.rememberMe,
  });

  return { ok: true };
}

export async function sendPasswordResetCode(
  email: string,
): Promise<AuthResult> {
  if (!email.trim()) {
    return { ok: false, message: "Email address is required." };
  }

  await new Promise((resolve) => setTimeout(resolve, 400));
  console.info("[auth] send password reset code", { email });
  return { ok: true };
}

export async function verifyPasswordResetCode(
  email: string,
  code: string,
): Promise<AuthResult> {
  if (!email.trim() || !code.trim()) {
    return {
      ok: false,
      message: "Email and verification code are required.",
    };
  }

  await new Promise((resolve) => setTimeout(resolve, 400));
  console.info("[auth] verify password reset code", { email, code });
  return { ok: true };
}
