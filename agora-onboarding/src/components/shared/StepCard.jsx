import React from 'react';
import { motion } from 'framer-motion';

const StepCard = ({ step, title, description, isActive, onClick }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    onClick={onClick}
    className={`cursor-pointer p-6 rounded-lg border-2 transition-all ${
      isActive ? 'border-primary bg-primary/5' : 'border-gray/20'
    }`}
  >
    <div className="flex items-start gap-4">
      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
        {step}
      </span>
      <div>
        <h4 className="text-xl font-bold mb-2">{title}</h4>
        <p className="text-gray">{description}</p>
      </div>
    </div>
  </motion.div>
);

export default StepCard;
