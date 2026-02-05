import { useTableDeleteModalStore } from "@/store/Modal/Table/delete-item";
import Link from "next/link";
import { FaEdit, FaTrash } from "react-icons/fa";

interface Props {
  id: string;
  apiPath: string; 
  canEdit?: boolean;
  canEditLink?: string;
  canDelete?: boolean;
  name: string;
}

function EditDelete({
  id,
  apiPath,
  name,
  canEdit = true,
  canEditLink = "",
  canDelete = true,
}: Props) {
  const { setItem } = useTableDeleteModalStore();

  return (
    <div className="flex items-center justify-center gap-6">
      {canEdit && canEditLink && (
        <Link href={canEditLink}>
          <FaEdit className="w-5 h-5 text-green hover:opacity-80 cursor-pointer" />
        </Link>
      )}
      {canDelete && (
        <button onClick={() => setItem(id, apiPath, name)}>
          <FaTrash className="w-5 h-5 text-red-600 hover:text-red-800" />
        </button>
      )}
    </div>
  );
}

export default EditDelete;
