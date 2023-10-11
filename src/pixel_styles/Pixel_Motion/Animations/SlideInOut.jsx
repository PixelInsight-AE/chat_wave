import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const SlideInOut = ({ children }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: "100vw" }}
        animate={{ x: "0%" }}
        exit={{ x: "100vw" }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default SlideInOut;
