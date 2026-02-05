"use server";

import type { Uuid } from "@/common/types/common.types";
import { API_AUTH } from "@/lib/auth/auth";
import {
  ActionResponse,
  buildErrorResponse,
  buildSuccessResponse,
} from "@/lib/http/response-builder";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { PageOptionsDto } from "@/common/Dto/page-options.dto";
import { ContactService } from "@/services/contact/contact";
import { ContactStatus } from "@/generated/prisma";

// Define Zod schema for validation
const updateContactStatusSchema = z.object({
  status: z.string().min(1, "Select contact status"),
});

export async function updateContactStatus(
  id: Uuid,
  formData: FormData
): Promise<ActionResponse> {
  await API_AUTH();
  try {
    if (!id) {
      return buildErrorResponse("ID is required");
    }

    // Parse and validate form data
    const raw = Object.fromEntries(formData.entries());
    const parsed = updateContactStatusSchema.safeParse(raw);

    if (!parsed.success) {
      const errorMessages = parsed.error.issues
        .map((i) => i.message)
        .join(", ");
      return buildErrorResponse(errorMessages);
    }

    const status = parsed.data.status as ContactStatus;

    // Find contact by ID
    const contact = await prisma.contactMessage.findUnique({
      where: { id },
    });

    if (!contact) {
      return buildErrorResponse("Contact not found");
    }

    // Update status
    await prisma.contactMessage.update({
      where: { id },
      data: { status },
    });

    return buildSuccessResponse(null, `Contact status updated to ${status}`);
  } catch (error) {
    console.error("[Update Contact Status Error]", error);
    return buildErrorResponse("Failed to update contact status. Try again.");
  }
}

export async function deleteContact(id: string): Promise<ActionResponse> {
  try {
    await API_AUTH();

    if (!id) {
      return buildErrorResponse("Contact ID is required");
    }

    // Check if contact exists
    const contact = await prisma.contactMessage.findUnique({
      where: { id },
    });

    if (!contact) {
      return buildErrorResponse("Contact not found");
    }

    // Delete contact
    await prisma.contactMessage.delete({
      where: { id },
    });

    // Optional: refetch updated list
    const response = await ContactService.getAllContacts(new PageOptionsDto());
    const data = response?.data || [];
    const totalRecords = response?.meta.totalRecords || 0;
    const resData = { data, totalRecords };

    return buildSuccessResponse(resData, "Contact deleted successfully");
  } catch (error) {
    console.error("[Delete Contact Error]", error);
    return buildErrorResponse("Failed to delete Contact. Try again.");
  }
}
