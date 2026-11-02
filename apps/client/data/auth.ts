export type LoginRole = "admin" | "trainer" | "employee";

export type SessionUser = {
  id: string;
  name: string;
  role: LoginRole;
};

export type LoginPayload = {
  role: LoginRole | null;
  userId: string;
  password: string;
  rememberMe: boolean;
};

export type AuthResult =
  | { ok: true; user: SessionUser }
  | { ok: false; message: string };

export type SimpleResult = { ok: true } | { ok: false; message: string };

const SESSION_KEY = "elearning.session";

function toDisplayName(userId: string) {
  return userId
    .trim()
    .replace(/[._-]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

/** Auth API boundary — replace bodies with real endpoints when available. */
export async function login(payload: LoginPayload): Promise<AuthResult> {
  if (!payload.role) {
    return { ok: false, message: "Please select a role to login as." };
  }
  if (!payload.userId.trim() || !payload.password.trim()) {
    return { ok: false, message: "User ID and password are required." };
  }

  await new Promise((resolve) => setTimeout(resolve, 400));

  const user: SessionUser = {
    id: payload.userId.trim(),
    name: toDisplayName(payload.userId),
    role: payload.role,
  };

  if (typeof window !== "undefined") {
    const storage = payload.rememberMe ? localStorage : sessionStorage;
    storage.setItem(SESSION_KEY, JSON.stringify(user));
    if (payload.rememberMe) sessionStorage.removeItem(SESSION_KEY);
    else localStorage.removeItem(SESSION_KEY);
  }

  return { ok: true, user };
}

export async function getSession(): Promise<SessionUser | null> {
  if (typeof window === "undefined") return null;
  const raw =
    sessionStorage.getItem(SESSION_KEY) ?? localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SessionUser;
  } catch {
    return null;
  }
}

export async function logout(): Promise<void> {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(SESSION_KEY);
}

export async function sendPasswordResetCode(
  email: string,
): Promise<SimpleResult> {
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
): Promise<SimpleResult> {
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
