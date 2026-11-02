export type SuperAdminSession = {
  id: string;
  name: string;
  email: string;
};

export type LoginPayload = {
  userId: string;
  password: string;
  rememberMe: boolean;
};

export type AuthResult =
  | { ok: true; user: SuperAdminSession }
  | { ok: false; message: string };

const SESSION_KEY = "elearning.admin.session";

function toDisplayName(userId: string) {
  return userId
    .trim()
    .replace(/[._-]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

/** Super-admin auth — separate from client app session. */
export async function login(payload: LoginPayload): Promise<AuthResult> {
  if (!payload.userId.trim() || !payload.password.trim()) {
    return { ok: false, message: "User ID and password are required." };
  }

  await new Promise((resolve) => setTimeout(resolve, 400));

  const user: SuperAdminSession = {
    id: payload.userId.trim(),
    name: toDisplayName(payload.userId),
    email: `${payload.userId.trim().toLowerCase().replace(/\s+/g, ".")}@ses.local`,
  };

  if (typeof window !== "undefined") {
    const storage = payload.rememberMe ? localStorage : sessionStorage;
    storage.setItem(SESSION_KEY, JSON.stringify(user));
    if (payload.rememberMe) sessionStorage.removeItem(SESSION_KEY);
    else localStorage.removeItem(SESSION_KEY);
  }

  return { ok: true, user };
}

export async function getSession(): Promise<SuperAdminSession | null> {
  if (typeof window === "undefined") return null;
  const raw =
    sessionStorage.getItem(SESSION_KEY) ?? localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SuperAdminSession;
  } catch {
    return null;
  }
}

export async function logout(): Promise<void> {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(SESSION_KEY);
}
