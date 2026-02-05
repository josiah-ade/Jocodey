import { useState } from "react";
import { showSuccess, showError } from "@/utils/toast";
import { useTableDeleteModalStore } from "@/store/Modal/Table/delete-item";


import { ActionResponse } from "@/lib/http/response-builder";
import { Uuid } from "@/common/types/common.types";
import { handleError } from "@/lib/http/handle-error";
import { deleteActionMap, getEntitySetter } from "@/utils/form/entity-setter";

const ServerList = [
  "clients",
  "productions",
  "workRate",
  "category",
  "subCategory",
  "sales",
  "payroll",
  "expenseCategory",
  "expenses",
  "user",
  "contact",
];

export function useDeleteEntity() {
  const [loading, setLoading] = useState(false);
  const { close, id, apiPath } = useTableDeleteModalStore();

  const handleClick = async () => {
    setLoading(true);

    try {
      if (!id || !apiPath) {
        throw new Error("Missing delete parameters");
      }

      const useServerAction = ServerList.includes(apiPath);

      let result: ActionResponse;

      if (useServerAction) {
        const deleteAction =
          deleteActionMap[apiPath as keyof typeof deleteActionMap];
        if (!deleteAction)
          throw new Error(`No delete action found for: ${apiPath}`);
        result = await deleteAction(id as Uuid);
      } else {
        const res = await fetch(`/api/admin/${apiPath}/${id}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.message || "Something went wrong");
        }
        result = data;
      }

      if (!result.success) {
        throw new Error(result.message || "Delete failed");
      }

      showSuccess(result.message || "Deleted successfully");

      const setEntityData = getEntitySetter(apiPath);
      if (setEntityData) setEntityData(result.data);
      else console.warn(`No setter found for entity: ${apiPath}`);
    } catch (err: unknown) {
      handleError(err, showError);
    } finally {
      setLoading(false);
      close();
    }
  };

  return {
    loading,
    handleClick,
  };
}
