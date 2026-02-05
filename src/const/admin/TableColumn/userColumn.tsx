import EditDelete from "@/components/Table/Compo/EditDelete";
import { GetUsersResDto } from "@/services/users/dto/get-users.dto";
import { ColumnDef } from "@tanstack/react-table";

export const userColumns: ColumnDef<GetUsersResDto>[] = [
  {
    header: "#",
    cell: (info) => Number(info.row.index) + 1,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone ",
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    header: "Action",
    cell: (info) => {
      const user = info.row.original;
      return (
        <EditDelete
          id={user.id}
          apiPath="user"
          canEditLink={`/admin/users/${user.id}/edit`}
          name={user.name}
        />
      );
    },
  },
];
