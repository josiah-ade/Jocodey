import { ApiDataStore } from "@/interface/api";
import { GetContactDataProps, GetUserDataProps } from "@/interface/api/types";
import { create } from "zustand";

const dataPagination = {
  data: [],
  totalRecords: 0,
  totalPages: 0,
  nextPage: 0,
  currentPage: 0,
  previousPage: 0,
};

export const useApiDataStore = create<ApiDataStore>((set) => ({
  loading: true,

  contactData: dataPagination,
  setContactsData: (contactData: GetContactDataProps) =>
    set({ contactData, loading: false }),
  userData: dataPagination,
  setUserData: (userData: GetUserDataProps) =>
    set({ userData, loading: false }),

  contactAnalyticsData: null,
  setContactAnalyticsData: (contactAnalyticsData) =>
    set({ contactAnalyticsData, loading: false }),
}));
