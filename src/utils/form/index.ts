import { FormProps } from "@/const/admin/Form";
import { FieldFormData } from "@/interface/admin/form";


export function buildInitialFormData(
  fields: FormProps[],
  initialData?: FieldFormData
): FieldFormData {
  return Object.fromEntries(
    fields.map(({ name, type, defaultValue }) => {
      const val = initialData?.[name] ?? defaultValue ?? "";

      return [
        name,
        type === "date" && val
          ? new Date(val).toISOString().split("T")[0]
          : val,
      ];
    })
  ) as FieldFormData;
}

export function prepareFormData(
  data: FieldFormData,
  imageFile?: File | null,
  imageId?: string
): FormData {
  const form = new FormData();

  Object.entries(data).forEach(([key, val]) => {
    if (val !== null && val !== undefined) {
      form.append(key, String(val));
    }
  });

  if (imageFile) {
    form.append("file", imageFile);
    if (imageId) {
      form.append("imageId", imageId);
    }
  }

  return form;
}

export function prepareFormDataWithoutImage(data: FieldFormData): FormData {
  const form = new FormData();

  Object.entries(data).forEach(([key, val]) => {
    if (val !== null && val !== undefined) {
      form.append(key, String(val));
    }
  });

  return form;
}

export function buildFormDataFromDto<T extends Record<string, any>>(
  dto: T,
  formFields: FormProps[]
): FieldFormData {
  const result: FieldFormData = {};

  for (const field of formFields) {
    const key = field.name;
    const value = dto[key];

    if (value !== undefined) {
      result[key] = value;
    }
  }

  return result;
}
