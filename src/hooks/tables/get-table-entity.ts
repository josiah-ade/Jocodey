"use client";

import { Uuid } from "@/common/types/common.types";
import { handleError } from "@/lib/http/handle-error";
import { ActionResponse } from "@/lib/http/response-builder";
import { getEntitySetter } from "@/utils/form/entity-setter";
import { showError } from "@/utils/toast";
import { useState, useEffect } from "react";

interface UseActionFormOptions {
  id: string;
  getData: (id: Uuid) => Promise<ActionResponse>;
  apiPath: string;
}

export function useEntityActionTable({
  getData,
  id,
  apiPath,
}: UseActionFormOptions) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        setLoading(true);

        const result = await getData(id as Uuid);

        if (!result.success) {
          throw new Error(result.message || "Check Your Internet Connection");
        }

        const setEntityData = getEntitySetter(apiPath);
        if (setEntityData) setEntityData(result.data);
        else console.warn(`No setter found for entity: ${apiPath}`);
      } catch (err: unknown) {
        if (isMounted) handleError(err, showError);
      } finally {
        if (isMounted) setLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [getData, id, apiPath]);

  return {
    loading,
  };
}
