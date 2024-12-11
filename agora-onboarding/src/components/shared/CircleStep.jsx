import React from 'react';
import { motion } from 'framer-motion';

const CircleStep = ({ title, description, angle, isActive, onClick }) => {
  const radius = 150;
  const x = radius * Math.cos(angle);
  const y = radius * Math.sin(angle);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2`}
      style={{ left: `${x + radius}px`, top: `${y + radius}px` }}
      onClick={onClick}
    >
      <div className={`p-4 rounded-full ${isActive ? 'bg-primary text-white' : 'bg-white'}`}>
        {title}
      </div>
    </motion.div>
  );
};

export default CircleStep;
