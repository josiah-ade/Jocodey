import { Button } from "@/components/Form/Button/Button";
import React from "react";
import { FaSpinner } from "react-icons/fa";

interface Props {
  name?: string;
  isLoading?: boolean;
  onSelect: (status: boolean) => void;
}

function ConfirmModal({ name, onSelect, isLoading }: Props) {
  const propmt = name || "item";

  return (
    <>
      <p className="text-center mt-2  mb-10 text-15 text-black">
        Are you sure you want to delete <br />
        <strong>{propmt}</strong> ?
      </p>

      <div className="flex gap-4 items-center justify-between">
        <Button className="w-full text-black" onClick={() => onSelect(true)}>
          {isLoading ? (
            <FaSpinner className="animate-spin h-5 w-5 font-semibold" />
          ) : (
            "Confirm"
          )}
        </Button>
        <Button
          className="w-full !border bg-red-500 !border-border-b text-white"
          onClick={() => onSelect(false)}
          disabled={isLoading}
        >
          Cancel
        </Button>
      </div>
    </>
  );
}

export default ConfirmModal;
