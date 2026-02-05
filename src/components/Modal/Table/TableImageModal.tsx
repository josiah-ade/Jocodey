"use client";

import { useTableImageModalStore } from "@/store/Modal/Table/table-image";
import { AnimatePresence, motion } from "framer-motion";

function TableImageModal() {
  const { isOpen, close, url } = useTableImageModalStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed left-0 right-0 bottom-0 top-0 bg-black/20 backdrop-blur-xs flex items-center justify-center z-50"
          onClick={close}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-darker-bg rounded-xl shadow-black/50 w-[70vw] h-[70vh] md:w-[500px] md:h-[500px] border border-border1"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={url}
              alt="Image"
              className="w-full h-full object-contain"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default TableImageModal;
