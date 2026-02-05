"use client";

import { Uuid } from "@/common/types/common.types";
import { handleError } from "@/lib/http/handle-error";
import { ActionResponse } from "@/lib/http/response-builder";
import { getEntitySetter } from "@/utils/form/entity-setter";
import { showError } from "@/utils/toast";
import { useEffect, useState } from "react";

interface UseActionFormOptions {
  year: number;
  id: Uuid;
  getData: (year: number, id: Uuid) => Promise<ActionResponse>;
  apiPath: string;
}

export function useEntityActionPersonalAnalytics({
  getData,
  year,
  id,
  apiPath,
}: UseActionFormOptions) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        setLoading(true);

        const result = await getData(year, id);

        if (!result.success) {
          throw new Error(result.message || "Check Your Internet Connection");
        }

        // console.log(result.data);
        const setEntityData = getEntitySetter(apiPath);
        if (setEntityData) setEntityData(result.data);
        else console.warn(`No setter found for entity: ${apiPath}`);
      } catch (err: unknown) {
       
        if (isMounted)  handleError(err, showError);
      } finally {
        if (isMounted) setLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [getData, apiPath]);

  return {
    loading,
  };
}
