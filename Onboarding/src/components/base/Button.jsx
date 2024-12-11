import React from 'react';
import { motion } from 'framer-motion';

const Button = ({
  variant = 'primary',
  children,
  className = '',
  ...props
}) => {
  const baseStyles = "px-6 py-3 rounded-lg font-medium transition-all";

  const variants = {
    primary: "bg-[#d25417] text-white hover:bg-[#b84815]",
    secondary: "bg-[#d25417] text-white hover:bg-[#b84815]"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;

