import React from 'react';
import { motion } from 'framer-motion';

const AwardCard = ({ title, description, icon, level }) => (
  <motion.div
    whileHover={{ y: -10 }}
    className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-primary"
  >
    <div className="text-4xl mb-4">{icon}</div>
    <h4 className="text-xl font-bold mb-2">{title}</h4>
    <span className="text-sm text-gray-500 mb-3 block">{level}</span>
    <p className="text-gray">{description}</p>
  </motion.div>
);

export default AwardCard;
