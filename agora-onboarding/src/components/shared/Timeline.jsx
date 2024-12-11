import React from 'react'
import { motion } from 'framer-motion'

const TimelineItem = ({ title, description, index }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.2 }}
    className="relative pl-8 pb-8 border-l-2 border-primary last:border-l-0"
  >
    <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary" />
    <h4 className="text-xl font-semibold mb-2">{title}</h4>
    <p className="text-gray">{description}</p>
  </motion.div>
)

const Timeline = ({ items }) => (
  <div className="relative pl-4">
    {items.map((item, index) => (
      <TimelineItem key={index} {...item} index={index} />
    ))}
  </div>
)

export default Timeline
