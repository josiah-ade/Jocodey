import EditDelete from "@/components/Table/Compo/EditDelete";
import { renderContactStatus } from "@/components/Table/ContactStatusBadge";
import { ContactStatus } from "@/interface/admin/db";
import { GetContactResDto } from "@/services/contact/dto/get-contacts-res.dto";

import { formatDateWithOrdinal } from "@/utils/common/date-parser";
import { ColumnDef } from "@tanstack/react-table";

export const contactColumns: ColumnDef<GetContactResDto>[] = [
  {
    header: "#",
    cell: (info) => Number(info.row.index) + 1,
  },
  {
    accessorKey: "name",
    header: "Name",
    size: 200,
  },
  {
    accessorKey: "phone",
    header: "Phone Number",
    size: 250,
  },

  {
    accessorKey: "email",
    header: "Email",
    size: 200,
  },
  {
    accessorKey: "status",
    header: "Status",
    size: 200,
    cell: (info) => renderContactStatus(info.getValue() as ContactStatus),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: (info) => formatDateWithOrdinal(info.getValue() as string),
  },

  {
    header: "Action",
    cell: (info) => {
      const contact = info.row.original;
      return (
        <EditDelete
          id={contact.id}
          apiPath="contact"
          canEditLink={`/admin/contact/${contact.id}`}
          name={`${contact.name}'s Message`}
        />
      );
    },
  },
];
