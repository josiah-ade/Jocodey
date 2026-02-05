import { decodeToken, verifyToken } from "@/utils/auth/token";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function API_AUTH() {
  const token = (await cookies()).get("access_token");

  const accessToken = token?.value;
  if (!accessToken) redirect("/admin/login");

  const isVerify = verifyToken(accessToken);
  if (!isVerify) redirect("/admin/login");

  const decode = decodeToken(accessToken);

  return decode;
}
