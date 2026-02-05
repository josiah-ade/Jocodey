"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/app/(no layout)/admin/(auth)/register/actions";
import { showError, showSuccess } from "@/utils/toast";
import { saveAuthToLocalStorage } from "@/utils/auth/storage";
import { navigateWithProgress } from "@/utils/navigation";
 
export function useRegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData();
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("password", formData.password);

    const response = await registerUser(form);

    if (response.success) {
      saveAuthToLocalStorage(response.data);
      showSuccess(response.message || "Registration successful");
      setFormData({ name: "", email: "", password: "" });
      navigateWithProgress(router, "/admin");
    } else {
      showError(response.message || "Something went wrong");
    }

    setLoading(false);
  };

  return {
    formData,
    loading,
    handleChange,
    handleSubmit,
  };
}
