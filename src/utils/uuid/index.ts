import { v4 as uuidv4 } from "uuid";

/**
 * Generates a Cloudinary public ID with a given prefix.
 * @param prefix - Folder or identifier prefix like "staffs/staff"
 * @returns A string like "staffs/staff-123e4567-e89b-12d3-a456-426614174000"
 */
export function generateCloudinaryPublicId(prefix: string): string {
  return `${prefix}-${uuidv4()}`;
}

// utils/order-id.ts
export function generateOrderId(prefix = "ORD"): string {
  const date = new Date();

  // YYYYMMDD
  const datePart = [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("");

  // Random alphanumeric 6 chars
  const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();

  return `${prefix}-${datePart}-${randomPart}`;
}
