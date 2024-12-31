"use server";
import { Session } from "@/types/session";
import { jwtVerify } from "jose";
import { JWT } from "./constants";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const encodedKey = new TextEncoder().encode(JWT);

export async function createSession(token: string) {
  const expiredAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const cookie = await cookies();
  cookie.set("token", token, {
    expires: expiredAt,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
}

export async function getSession() {
  const cookie = await cookies();
  const cookieValue = cookie.get("token")?.value;

  if (!cookieValue) return null;

  try {
    const { payload } = await jwtVerify(cookieValue, encodedKey, {
      algorithms: ["HS256"],
    });

    return payload as Session;
  } catch (error) {
    console.log(error);
    redirect("/login");
  }
}

export async function logout() {
  const cookie = await cookies();
  cookie.delete("token");
  redirect("/login");
}
