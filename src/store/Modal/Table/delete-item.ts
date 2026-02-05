import { ModalStateTableDelete } from "@/interface/modal";
import { create } from "zustand";

export const useTableDeleteModalStore = create<ModalStateTableDelete>(
  (set) => ({
    isOpen: false,
    id: "",
    name: "",
    apiPath: "",
    setItem: (id: string, apiPath: string, name?: string) =>
      set({ isOpen: true, id, apiPath, name }),
    close: () => set({ isOpen: false, name: "", id: "", apiPath: "" }),
    toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  })
);
