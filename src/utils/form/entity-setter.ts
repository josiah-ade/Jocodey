import { deleteContact } from "@/app/admin/contact/[id]/actions";
import { deleteUser } from "@/app/admin/users/[id]/edit/actions";

import { useApiDataStore } from "@/store/api/data";

export function getEntitySetter(apiPath: string) {
  const store = useApiDataStore.getState();

  const map: Record<string, (data: any) => void> = {
    user: store.setUserData,
    contact: store.setContactsData,
    contactAnalytics: store.setContactAnalyticsData,
  };

  return map[apiPath];
}

export const deleteActionMap = {
  contact: deleteContact,
  user: deleteUser,
} as const;

export type DeleteEntityType = keyof typeof deleteActionMap;
