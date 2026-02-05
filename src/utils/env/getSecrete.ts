export function getJwtSecret(): string {
  const secret = process.env.ACCESS_TOKEN_SECRET;
  if (!secret) {
    throw new Error("Missing ACCESS_TOKEN_SECRET in environment");
  }
  return secret;
}
