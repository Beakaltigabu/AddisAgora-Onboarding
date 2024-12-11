import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, className = '', ...props }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`bg-background-primary border border-border-primary rounded-lg p-6
                 shadow-sm hover:shadow-lg transition-shadow ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};



export default Card;
