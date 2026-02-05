const isClient = typeof window !== "undefined";

export const localStorageProvider = {
  getItem: (name: string) => {
    if (!isClient) return null;
    const item = localStorage.getItem(name);
    return item ? JSON.parse(item) : null;
  },
  setItem: (name: string, value: any) => {
    if (!isClient) return;
    localStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name: string) => {
    if (!isClient) return;
    localStorage.removeItem(name);
  },
};


export type SideBarSection = "Browse" | "Materials" | "Wardrobe" | "Elements";