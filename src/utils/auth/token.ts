import jwt, { SignOptions } from "jsonwebtoken";
import { getJwtSecret } from "../env/getSecrete";

export function createToken(
  payload: Record<string, any>,
  options: SignOptions = {
    expiresIn: Number(process.env.TOKEN_EXPIRE) || "12h",
  }
): string {
  const secret = getJwtSecret();
  return jwt.sign(payload, secret, options);
}

export function verifyToken<T = any>(token: string): T {
  const secret = getJwtSecret();
  return jwt.verify(token, secret) as T;
}

export function decodeToken<T = any>(token: string): T {
  return jwt.decode(token) as T;
}

