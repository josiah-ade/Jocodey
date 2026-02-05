import { GetContactStatsResDto } from "@/services/analytics/dto/contact.analytics.dto";
import { GetContactDataProps, GetUserDataProps } from "./types";

export interface ApiDataStore {
  loading: boolean;

  contactData: GetContactDataProps;
  setContactsData: (contacData: GetContactDataProps) => void;
  
  userData: GetUserDataProps;
  setUserData: (userData: GetUserDataProps) => void;

  contactAnalyticsData: GetContactStatsResDto | null;
  setContactAnalyticsData: (
    ContactAnalyticsData: GetContactStatsResDto
  ) => void;
}
