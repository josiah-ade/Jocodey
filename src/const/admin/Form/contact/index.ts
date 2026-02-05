import { ContactStatus } from "@/generated/prisma";
import { FormProps } from "..";

export const contactFields: FormProps[] = [
  // Hidden ID
  { label: "", name: "id", type: "text", hidden: true },

  {
    label: "Full Name",
    name: "name",
    type: "text",
    required: true,
    readonly: true,
  },
  {
    label: "Email",
    name: "email",
    type: "email",
    required: true,
    readonly: true,
  },
  {
    label: "Phone Number",
    name: "phone",
    type: "text",
    readonly: true,
  },
  {
    label: "Update Status",
    name: "status",
    type: "select",
    options: Object.values(ContactStatus),
  },
  {
    label: "Date",
    name: "createdAt",
    type: "date",
    readonly: true,
    hidden: true,
  },
  {
    label: "Message",
    name: "message",
    type: "textarea",
    readonly: true,
    required: true,
    fullWidth: true,
  },
];
