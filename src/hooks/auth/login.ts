"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/app/(no layout)/admin/(auth)/login/actions";
import { showError, showSuccess } from "@/utils/toast";
import { saveAuthToLocalStorage } from "@/utils/auth/storage";
import { navigateWithProgress } from "@/utils/navigation";
import { useGeneralStore } from "@/store/general";
import { handleError } from "@/lib/http/handle-error";

export function useLoginForm() {
  const { lastRoute } = useGeneralStore();
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const form = new FormData();
      form.append("email", formData.email);
      form.append("password", formData.password);

      const response = await loginUser(form);

      if (response.success) {
        saveAuthToLocalStorage(response.data);
        showSuccess(response.message || "Login successful");
        navigateWithProgress(router, lastRoute || "/admin");
      } else {
        showError(response.message || "Invalid credentials");
      }
    } catch (err: unknown) {
      handleError(err, showError);
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    handleChange,
    handleSubmit,
  };
}
