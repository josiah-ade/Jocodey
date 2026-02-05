export interface AuthData {
  token: string;
  email: string;
  name: string;
  id: string;
}

const AUTH_KEY = "auth";

export const saveAuthToLocalStorage = (authData: AuthData): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(AUTH_KEY, JSON.stringify(authData));
  }
};

export const getAuthFromLocalStorage = (): AuthData | null => {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem(AUTH_KEY);
    return data ? JSON.parse(data) : null;
  }
  return null;
};

export const clearAuthFromLocalStorage = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(AUTH_KEY);
  }
};

export function getFirstName(fullName?: string): string {
  if (!fullName) return "";
  return fullName.split(" ")[0];
}
