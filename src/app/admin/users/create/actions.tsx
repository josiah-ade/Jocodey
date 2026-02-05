"use server";

import { UserRole } from "@/generated/prisma";
import { API_AUTH } from "@/lib/auth/auth";
import {
  ActionResponse,
  buildErrorResponse,
  buildSuccessResponse,
} from "@/lib/http/response-builder";
import { prisma } from "@/lib/prisma";
import { userSchema } from "@/lib/schema/user.schema";
import { hashPassword } from "@/utils/auth/password";

export async function createUser(formData: FormData): Promise<ActionResponse> {
  await API_AUTH();
  try {
   

    const raw = Object.fromEntries(formData.entries());
    const parsed = userSchema.safeParse(raw);

    if (!parsed.success) {
      const errorMessages = parsed.error.issues
        .map((i) => i.message)
        .join(", ");
      return buildErrorResponse(errorMessages);
    }

    const input = parsed.data;

    if (input.password && input.password.length < 5) {
      return buildErrorResponse("Password must be minimum of 5 values");
    }

    // Check for duplicate email or phone number
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: input.email }, { phoneNumber: input.phoneNumber }],
      },
    });

    if (existingUser) {
      if (input.email && existingUser.email === input.email) {
        return buildErrorResponse("A user with this email already exists");
      }

      if (input.phoneNumber && existingUser.phoneNumber === input.phoneNumber) {
        return buildErrorResponse(
          "A user with this phone number already exists"
        );
      }
    }

    const newPassword = await hashPassword(input.password || "12345");

    await prisma.user.create({
      data: {
        name: input.name,
        email: input.email,
        phoneNumber: input.phoneNumber,
        gender: input.gender,
        address: input.address,
        password: newPassword,
        role: (input.role as UserRole) || UserRole.STAFF,
      },
    });

    return buildSuccessResponse(null, "User created successfully");
  } catch (error) {
    console.error("[Create User Error]", error);
    return buildErrorResponse("Failed to create user. Try again.");
  }
}
