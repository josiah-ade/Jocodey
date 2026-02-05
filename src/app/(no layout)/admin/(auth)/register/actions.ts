"use server";

import { prisma } from "@/lib/prisma";
import { AuthUser } from "@/interface/admin/api";
import {
  buildErrorResponse,
  buildSuccessResponse,
} from "@/lib/http/response-builder";
import { hashPassword } from "@/utils/auth/password";
import { createToken } from "@/utils/auth/token";
import { cookies } from "next/headers";

export async function registerUser(
  form: FormData,
): Promise<
  | { success: true; data: AuthUser; message: string }
  | { success: false; message: string }
> {
  try {
    const name = form.get("name")?.toString() || "";
    const email = form.get("email")?.toString() || "";
    const password = form.get("password")?.toString() || "";

    if (!name || !email || !password) {
      return buildErrorResponse("All fields are required");
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return buildErrorResponse("User already exists");
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "ADMIN",
      },
    });

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
      "Registration successful",
    );
  } catch (err) {
    console.error("[Register Error]", err);
    return buildErrorResponse("Internal server error. Please try again later.");
  }
}
