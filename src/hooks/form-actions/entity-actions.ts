"use client";

import { Uuid } from "@/common/types/common.types";
import { FormProps } from "@/const/admin/Form";
import { FieldFormData, Mode } from "@/interface/admin/form";
import { handleError } from "@/lib/http/handle-error";
import { ActionResponse } from "@/lib/http/response-builder";
import {
  buildInitialFormData,
  prepareFormDataWithoutImage,
} from "@/utils/form";
import { getEntitySetter } from "@/utils/form/entity-setter";
import { navigateWithProgress } from "@/utils/navigation";
import { showError, showSuccess } from "@/utils/toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface UseActionFormOptions {
  mode: Mode;
  formFields: FormProps[];
  initialData?: FieldFormData;
  apiPath?: string;
  redirectPath?: string;
  baseData?: Record<string, any>;
  onCreate?: (form: FormData) => Promise<ActionResponse>;
  onUpdate?: (id: Uuid, form: FormData) => Promise<ActionResponse>;
  onSuccess?: () => void;
  shopList?: { id: string; name: string; price: number; quantity: number }[];
}

export function useEntityActionForm({
  mode,
  initialData,
  formFields,
  redirectPath,
  apiPath,
  baseData,
  onCreate,
  onUpdate,
  onSuccess,
  shopList,
}: UseActionFormOptions) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<FieldFormData>(() =>
    buildInitialFormData(formFields, initialData)
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;

    let numericValue: number | string = value;
    if (type === "number") {
      numericValue = value === "" ? 0 : Number(value);
    }

    setFormData((prev) => {
      const updated = { ...prev, [name]: numericValue };

      if (name === "item" && shopList?.length) {
        const selectedShop = shopList.find((shop) => shop.id === value);
        if (selectedShop) {
          updated.item_price = selectedShop.price;
          updated.available_quantity = selectedShop.quantity;
        } else {
          updated.item_price = "";
          updated.available_quantity = "";
        }
      }

      if (
        name === "item" ||
        name === "item_price" ||
        name === "quantity" ||
        name === "price"
      ) {
        const quantity = Number(updated.quantity || 1);
        const price = Number(updated.item_price || 0);
        updated.sales_total = quantity * price;
      }

      // Sales page calculation
      if (name === "sales_total" || name === "sales_deposit") {
        const total = Number(updated.sales_total || 0);
        const deposit = Number(updated.sales_deposit || 0);
        updated.sales_outstanding = total - deposit;
      }

      // Production page calculation
      if (name === "bill" || name === "deposit") {
        const bill = Number(updated.bill || 0);
        const deposit = Number(updated.deposit || 0);
        updated.outstanding = bill - deposit;
      }

      // Expenses page calculation
      if (name === "expenses_total" || name === "expenses_deposit") {
        const total = Number(updated.expenses_total || 0);
        const deposit = Number(updated.expenses_deposit || 0);
        updated.expenses_outstanding = total - deposit;
      }

      // Repayment page calculation
      if (name === "amount") {
        const total = Number(updated.total || 0);
        const deposit = Number(updated.deposit || 0);
        const amount = Number(updated.amount || 0);
        const newAmount = amount + deposit;
        updated.outstanding = total - newAmount;
      }

      // Payroll Calculations page calculation
      if (name === "payroll_amount" || name === "deduction") {
        const payroll_amount = Number(updated.payroll_amount || 0);
        const deductionPercent = Number(updated.deduction || 0);

        let deductionAmount = 0;
        let total = payroll_amount;

        if (deductionPercent > 0) {
          deductionAmount = (payroll_amount * deductionPercent) / 100;
          total = payroll_amount - deductionAmount;
        }

        updated.deduction_total = deductionAmount;
        updated.total = total;
      }

      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newData = baseData
        ? { ...baseData, ...initialData, ...formData }
        : formData;
      const form = prepareFormDataWithoutImage(newData);

      let result: ActionResponse;

      if (mode === "edit") {
        if (!onUpdate || !initialData) {
          throw new Error("Update handler not provided");
        }

        const id = initialData.id as Uuid;
        // console.log(initialData)
        result = await onUpdate(id, form);
      } else {
        if (!onCreate) {
          throw new Error("Create handler not provided");
        }
        result = await onCreate(form);
      }

      if (!result.success) {
        throw new Error(result.message || "Check Your Internet Connection");
      }

      showSuccess(result.message || "Success");
      if (apiPath) {
        const setEntityData = getEntitySetter(apiPath);
        if (setEntityData) setEntityData(result.data);
        else console.warn(`No setter found for entity: ${apiPath}`);
      } else {
        redirectPath && navigateWithProgress(router, redirectPath);
      }
      onSuccess?.();
    } catch (err: unknown) {
      handleError(err, showError);
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    setFormData,
    loading,
    handleChange,
    handleSubmit,
  };
}
