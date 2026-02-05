import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ZoomAnimationProps {
  children: ReactNode;
  scale?: number;
  duration?: number;
  className?: string;
}

function ZoomAnimation({
  children,
  scale = 0.95,
  duration = 0.3,
  className = "",
}: ZoomAnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale }}
      transition={{ duration, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default ZoomAnimation;
