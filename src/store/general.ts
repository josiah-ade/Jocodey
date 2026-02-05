import { localStorageProvider } from "@/const/store";
import { generalState } from "@/interface/general";
import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

export const useGeneralStore = create<generalState>()(
  persist(
    (set, get) => ({
      currentRoute: null,
      lastRoute: null,

      setRoute: (route: string) =>
        set({
          lastRoute:
            get().currentRoute !== "/admin/login" ? get().currentRoute : null,
          currentRoute: route,
        }),

      resetRoutes: () =>
        set({
          currentRoute: null,
          lastRoute: null,
        }),
    }),
    {
      name: "general-storage",
      storage: localStorageProvider as unknown,
    } as PersistOptions<generalState>
  )
);
