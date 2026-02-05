import { UserRole } from "@/generated/prisma";
import { FormProps } from "..";

export const userFields: FormProps[] = [
  { label: "", name: "id", type: "text", hidden: true },
  {
    label: "Name",
    name: "name",
    type: "text",
    required: true,
  },
  {
    label: "Email",
    name: "email",
    type: "email",
    required: true,
  },
  {
    label: "Phone Number",
    name: "phoneNumber",
    type: "text",
  },
  {
    label: "Gender",
    name: "gender",
    type: "select",
    options: ["Male", "Female", "Other"],
  },
  {
    label: "Address",
    name: "address",
    type: "textarea",
    fullWidth: true,
  },
  {
    label: "Password",
    name: "password",
    type: "password",
    required: true,
  },
  {
    label: "Role",
    name: "role",
    type: "select",
    options: Object.values(UserRole),
    defaultValue: UserRole.STAFF,
    required: true,
  },
];
