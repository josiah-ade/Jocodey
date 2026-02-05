"use server";

import { prisma } from "@/lib/prisma";
import { AuthUser } from "@/interface/admin/api";
import {
  buildErrorResponse,
  buildSuccessResponse,
} from "@/lib/http/response-builder";
import { verifyPassword } from "@/utils/auth/password";
import { createToken } from "@/utils/auth/token";
import { cookies } from "next/headers";

export async function loginUser(
  form: FormData
): Promise<
  | { success: true; data: AuthUser; message: string }
  | { success: false; message: string }
> {
  try {
    const email = form.get("email")?.toString() || "";
    const password = form.get("password")?.toString() || "";

    if (!email || !password) {
      return buildErrorResponse("Email and password are required");
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return buildErrorResponse("Invalid credentials");
    }

    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return buildErrorResponse("Invalid credentials");
    }

    const token = createToken({
      email: user.email,
      role: user.role,
      name: user.name,
      id: user.id,
    });

    const cookieStore = await cookies();
    cookieStore.set("access_token", token, {
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: Number(process.env.COOKIE_EXPIRE) || 60 * 60 * 12,
    });

    return buildSuccessResponse<AuthUser>(
      {
        token,
        email: user.email,
        name: user.name,
        id: user.id,
      },
      "Login successful"
    );
  } catch (err) {
    console.error("[Login Error]", err);
    return buildErrorResponse("Internal server error. Please try again later.");
  }
}

export async function logoutUser(): Promise<
  { success: true; message: string } | { success: false; message: string }
> {
  try {
    const cookieStore = await cookies();

    
    cookieStore.set("access_token", "", {
      httpOnly: true,
      path: "/",
      expires: new Date(0), // Expire immediately
      sameSite: "strict",
    });

    return buildSuccessResponse(null, "Logout successful");
  } catch (err) {
    console.error("[Logout Error]", err);
    return buildErrorResponse("Could not log out. Please try again.");
  }
}
