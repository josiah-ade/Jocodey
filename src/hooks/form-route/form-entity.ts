import { FormProps } from "@/const/admin/Form";
import { FieldFormData, Mode } from "@/interface/admin/form";
import { handleError } from "@/lib/http/handle-error";
import { buildInitialFormData, prepareFormData } from "@/utils/form";
import { navigateWithProgress } from "@/utils/navigation";
import { showError, showSuccess } from "@/utils/toast";
import { generateCloudinaryPublicId } from "@/utils/uuid";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

type EntityType = "staff" | "apprentice" | "shop";

interface UseEntityFormOptions {
  mode: Mode;
  entity: EntityType;
  formFields: FormProps[];
  initialData?: FieldFormData;
  redirectPath: string;
}

export function useEntityForm({
  mode,
  entity,
  formFields,
  initialData,
  redirectPath,
}: UseEntityFormOptions) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(() =>
    mode === "edit" && initialData?.image ? String(initialData.image) : null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      const num = Number(value);
      numericValue = num < 0 ? 0 : num;
    }

    setFormData((prev) => {
      const updated = { ...prev, [name]: numericValue }; 

      // Training page calculation
      if (["caution_fee", "fee", "deposit"].includes(name)) {
        const total =
          Number(updated.caution_fee || 0) + Number(updated.fee || 0);
        const deposit = Number(updated.deposit || 0);
        updated.total = total;
        updated.outstanding = total - deposit;
      }

      return updated;
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const imageId = imageFile
      ? generateCloudinaryPublicId(`${entity}s/${entity}`)
      : undefined;
    const form = prepareFormData(formData, imageFile, imageId);

    const url =
      mode === "create"
        ? `/api/admin/${entity}`
        : `/api/admin/${entity}/${initialData?.id}`;
    const method = mode === "create" ? "POST" : "PATCH";

    try {
      const res = await fetch(url, { method, body: form });
      const data = await res.json();

      if (!res.ok || !data.success)
        throw new Error(data.message || "Something went wrong");

      showSuccess(data.message || "Success");
      navigateWithProgress(router, redirectPath);
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
    handleImageChange,
    imagePreview,
    handleUploadClick: () => fileInputRef.current?.click(),
    fileInputRef,
  };
}
