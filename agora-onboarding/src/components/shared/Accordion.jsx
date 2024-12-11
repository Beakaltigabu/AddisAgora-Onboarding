import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray/20">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex justify-between items-center"
      >
        <span className="font-semibold">{title}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="text-primary"
        >
          ↓
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pb-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Accordion;
