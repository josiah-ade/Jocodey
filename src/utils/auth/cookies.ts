// src/utils/auth/cookies.ts
"use server";

import { cookies } from "next/headers";

export async function setAuthCookie(token: string) {
  try {
    const maxAge = Number(process.env.COOKIE_EXPIRE) || 60 * 60 * 12; // 12 hours
    if (isNaN(maxAge)) {
      throw new Error("Invalid COOKIE_EXPIRE value");
    }

    const cookieStore = await cookies();
    cookieStore.set("access_token", token, {
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict", // Changed to "strict" for better security
      maxAge,
    });
  } catch (error) {
    console.error("[SetAuthCookie Error]", error);
    throw new Error("Failed to set authentication cookie");
  }
}
