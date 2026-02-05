"use server";

import {
  ActionResponse,
  buildSuccessResponse,
  buildErrorResponse,
} from "@/lib/http/response-builder";
import {
  ContactStatsOptionsDto,
  getContactStats,
} from "@/services/analytics/contact.analytics";

export async function fetchContactStats(
  year?: number
): Promise<ActionResponse> {
  try {
    const options: ContactStatsOptionsDto = { year };
    const stats = await getContactStats(options);

    if (!stats) {
      return buildErrorResponse("Could not fetch contact statistics");
    }

    // console.log(stats);
    return buildSuccessResponse(stats);
  } catch (err: unknown) {
    const error = err as { message?: string };
    return buildErrorResponse(error.message || "Something went wrong");
  }
}
