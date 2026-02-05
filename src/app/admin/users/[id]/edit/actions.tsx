"use server";

import { prisma } from "@/lib/prisma";
import { API_AUTH } from "@/lib/auth/auth";
import {
  buildErrorResponse,
  buildSuccessResponse,
} from "@/lib/http/response-builder";
import { userSchema } from "@/lib/schema/user.schema";
import { hashPassword } from "@/utils/auth/password";
import { PageOptionsDto } from "@/common/Dto/page-options.dto";
import { UserService } from "@/services/users/users";
import type { Uuid } from "@/common/types/common.types";
import { UserRole } from "@/generated/prisma";

export async function updateUser(id: Uuid, formData: FormData) {
  await API_AUTH();
  try {
    if (!id) {
      return buildErrorResponse("User ID not provided");
    }

    const raw = Object.fromEntries(formData.entries());
    const parsed = userSchema.safeParse(raw);

    if (!parsed.success) {
      const errorMessages = parsed.error.issues
        .map((i) => i.message)
        .join(", ");
      return buildErrorResponse(errorMessages);
    }

    const input = parsed.data;

    const existingUser = await prisma.user.findUnique({ where: { id } });
    if (!existingUser) {
      return buildErrorResponse("User not found");
    }

    // Check if email changed and is unique
    if (input.email && input.email !== existingUser.email) {
      const emailExists = await prisma.user.findUnique({
        where: { email: input.email },
      });
      if (emailExists) {
        return buildErrorResponse("A user with this email already exists");
      }
    }

    // Build update payload
    const updateData: any = {
      name: input.name ?? existingUser.name,
      email: input.email ?? existingUser.email,
      phoneNumber: input.phoneNumber ?? existingUser.phoneNumber,
      gender: input.gender ?? existingUser.gender,
      address: input.address ?? existingUser.address,
      role: (input.role as UserRole) ?? existingUser.role,
    };

    // Handle password if provided
    if (input.password && input.password.trim().length > 0) {
      if (input.password.length < 5) {
        return buildErrorResponse("Password must be a minimum of 5 characters");
      }
      updateData.password = await hashPassword(input.password);
    }

    await prisma.user.update({
      where: { id },
      data: updateData,
    });

    return buildSuccessResponse(null, "User updated successfully");
  } catch (error) {
    console.error("[Update User Error]", error);
    return buildErrorResponse("Failed to update user. Try again.");
  }
}

export async function deleteUser(id: Uuid) {
  await API_AUTH();
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return buildErrorResponse("User not found");
    }

    const userCount = await prisma.user.count();
    if (userCount <= 1) {
      return buildErrorResponse("Cannot delete the last remaining user");
    }

    await prisma.user.delete({ where: { id } });

    // Get updated list for UI refresh
    const response = await UserService.getAllUsers(new PageOptionsDto());
    const data = response?.data || [];
    const totalRecords = response?.meta.totalRecords || 0;

    return buildSuccessResponse(
      { data, totalRecords },
      "User deleted successfully"
    );
  } catch (error) {
    console.error("[Delete User Error]", error);
    return buildErrorResponse("Failed to delete user. Try again.");
  }
}
