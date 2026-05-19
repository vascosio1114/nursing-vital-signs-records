import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const adminCookieName = "bp_admin_session";
const maxAgeSeconds = 60 * 60 * 8;

type AdminSession = {
  role: "admin";
  exp: number;
};

export async function createAdminSessionCookie() {
  const token = signSession({
    role: "admin",
    exp: Math.floor(Date.now() / 1000) + maxAgeSeconds,
  });

  const cookieStore = await cookies();
  cookieStore.set(adminCookieName, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: maxAgeSeconds,
  });
}

export async function clearAdminSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(adminCookieName);
}

export async function isAdminSessionValid() {
  const cookieStore = await cookies();
  const token = cookieStore.get(adminCookieName)?.value;
  return verifySession(token);
}

export function isCorrectAdminPassword(password: string) {
  const configuredPassword = process.env.ADMIN_PASSWORD;

  if (!configuredPassword) {
    return false;
  }

  return safeEqual(password, configuredPassword);
}

function signSession(session: AdminSession) {
  const payload = Buffer.from(JSON.stringify(session)).toString("base64url");
  const signature = createSignature(payload);
  return `${payload}.${signature}`;
}

function verifySession(token: string | undefined) {
  if (!token) {
    return false;
  }

  const [payload, signature] = token.split(".");
  if (!payload || !signature || !safeEqual(signature, createSignature(payload))) {
    return false;
  }

  try {
    const session = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    ) as AdminSession;

    return session.role === "admin" && session.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

function createSignature(payload: string) {
  const secret = process.env.AUTH_SECRET;

  if (!secret) {
    throw new Error("Missing AUTH_SECRET");
  }

  return createHmac("sha256", secret).update(payload).digest("base64url");
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);

  if (left.length !== right.length) {
    return false;
  }

  return timingSafeEqual(left, right);
}
