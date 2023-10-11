import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useContext, createContext } from "react";

const AccordionContext = createContext();

export const Accordion = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(-1);

  const value = {
    activeIndex,
    setActiveIndex,
  };

  return (
    <AccordionContext.Provider value={value}>
      <div id="accordion">{children}</div>
    </AccordionContext.Provider>
  );
};

export const AccordionItem = ({ index, title, children }) => {
  const { activeIndex, setActiveIndex } = useContext(AccordionContext);

  const handleClick = () => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  return (
    <motion.div className="accordion-item">
      <motion.div
        onClick={handleClick}
        initial={false}
        animate={{ backgroundColor: activeIndex === index ? "#eee" : "#fff" }}
        transition={{ duration: 0.2 }}
        className="accordion-title"
      >
        <h2>{title}</h2>
      </motion.div>

      <AnimatePresence initial={false}>
        {activeIndex === index && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.8 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
