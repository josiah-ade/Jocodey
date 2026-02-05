
import ConfirmModal from "@/components/Modal/Confirm/ConfirmModal";
import { useDeleteEntity } from "@/hooks/delete-entity";
import { useTableDeleteModalStore } from "@/store/Modal/Table/delete-item";
import { AnimatePresence, motion } from "framer-motion";

function DeleteItemModal() {
  const { isOpen, name, close } = useTableDeleteModalStore();
  const { loading, handleClick } = useDeleteEntity();

  const handleSelect = async (status: boolean) => {
    if (status) {
      handleClick();
    } else {
      close();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed left-0 right-0 bottom-0 top-0 bg-black/20 backdrop-blur-xs flex items-center justify-center z-50"
          onClick={() => {
            if (!loading) close();
          }}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white p-6 rounded-xl shadow-lg w-[350px]"
            onClick={(e) => e.stopPropagation()}
          >
            <ConfirmModal
              onSelect={handleSelect}
              name={name}
              isLoading={loading}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
export default DeleteItemModal;
