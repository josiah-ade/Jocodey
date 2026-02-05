import { ModalStateTableImage } from "@/interface/modal";
import { create } from "zustand";

export const useTableImageModalStore = create<ModalStateTableImage>((set) => ({
  isOpen: false,
  url: "",
  setUrl: (url: string) => set({ isOpen: true, url }),
  close: () => set({ isOpen: false }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));
