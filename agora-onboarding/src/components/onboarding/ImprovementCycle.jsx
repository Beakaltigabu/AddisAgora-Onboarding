import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
  {
    title: 'Learn',
    description: 'Study materials and observe accomplished speakers',
    content: 'Master the fundamentals through our comprehensive educational materials, learn from experienced speakers, and engage with our global community of learners.',
    icon: '📚',
    color: '#d25417'
  },
  {
    title: 'Prepare',
    description: 'Plan your speeches and rehearse thoroughly',
    content: 'Develop your content, structure your presentation, practice delivery, and receive guidance from your mentor to ensure maximum impact.',
    icon: '📝',
    color: '#d25417'
  },
  {
    title: 'Practice',
    description: 'Deliver speeches and take on meeting roles',
    content: 'Put your skills into action by delivering speeches, taking on various meeting roles, and actively participating in club activities.',
    icon: '🎯',
    color: '#d25417'
  },
  {
    title: 'Feedback',
    description: 'Receive constructive feedback and reflect on performance',
    content: 'Gain valuable insights from peers and mentors, reflect on your progress, and identify specific areas for continued improvement.',
    icon: '💭',
    color: '#d25417'
  }
];

const MovingDot = ({ pathRef }) => {
  return (
    <motion.circle
      r="4"
      fill="#d25417"
      animate={{
        offsetDistance: ["0%", "100%"],
        scale: [1, 1.5, 1],
        opacity: [0.5, 1, 0.5]
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "linear"
      }}
      style={{
        offsetPath: `path("${pathRef}")`,
        offsetRotate: "auto"
      }}
    />
  );
};


const CircularPath = ({ index }) => {
  const startAngle = (index * Math.PI) / 2;
  const endAngle = ((index + 1) * Math.PI) / 2;
  const radius = 150;

  const start = {
    x: Math.cos(startAngle) * radius + 150,
    y: Math.sin(startAngle) * radius + 150
  };

  const end = {
    x: Math.cos(endAngle) * radius + 150,
    y: Math.sin(endAngle) * radius + 150
  };

  const midX = (start.x + end.x) / 2 + (Math.cos((startAngle + endAngle) / 2) * 50);
  const midY = (start.y + end.y) / 2 + (Math.sin((startAngle + endAngle) / 2) * 50);

  return (
    <motion.path
      d={`M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`}
      stroke="#d25417"
      strokeWidth="2"
      fill="none"
      strokeDasharray="8 8"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    />
  );
};


const StepNode = ({ angle, isActive, onClick, onHover, onLeave, step }) => {
  const x = Math.cos(angle) * 150 + 150;
  const y = Math.sin(angle) * 150 + 150;

  return (
    <motion.g
      transform={`translate(${x}, ${y})`}
      whileHover={{ scale: 1.1 }}
      onClick={onClick}
      onHoverStart={onHover}
      onHoverEnd={onLeave}
      style={{ cursor: 'pointer' }}
    >
      <circle
        r="45"
        fill="white"
        stroke={isActive ? "#d25417" : "#d2541750"}
        strokeWidth="2"
      />
      <text
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="32"
        y="0"
      >
        {step.icon}
      </text>
      <text
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="14"
        y="35"
        fill="#43506D"
        fontWeight="500"
      >
        {step.title}
      </text>
      {isActive && (
        <motion.circle
          r="50"
          fill="none"
          stroke="#d25417"
          strokeWidth="2"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.2, opacity: 0 }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      )}
    </motion.g>
  );
};


const ContentCard = ({ content, isVisible }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
    exit={{ opacity: 0, scale: 0.8 }}
    className="absolute inset-0 flex items-center justify-center"
  >
    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg max-w-[250px]">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-text-body text-sm"
      >
        {content}
      </motion.p>
    </div>
  </motion.div>
);



const ImprovementCycle = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [hoveredStep, setHoveredStep] = useState(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  return (
    <section id="improvement" className="section bg-background-secondary">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-text-heading mb-4">
            Continuous Improvement Cycle
          </h2>
          <p className="text-lg text-text-body max-w-2xl mx-auto">
            Our proven methodology for developing your communication skills
          </p>
        </motion.div>

        <div className="relative w-[300px] h-[300px] mx-auto p-10 flex items-center justify-center">
          <svg
            width="350"
            height="350"
            viewBox="0 0 300 300"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            {steps.map((_, index) => (
              <CircularPath key={`path-${index}`} index={index} />
            ))}
            {steps.map((step, index) => (
              <StepNode
                key={`node-${index}`}
                angle={(Math.PI * index) / 2}
                isActive={activeStep === index || hoveredStep === index}
                onClick={() => {
                  setActiveStep(index);
                  setIsAutoPlaying(false);
                }}
                onHover={() => {
                  setHoveredStep(index);
                  setIsAutoPlaying(false);
                }}
                onLeave={() => {
                  setHoveredStep(null);
                  setIsAutoPlaying(true);
                }}
                step={step}
              />
            ))}
          </svg>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <AnimatePresence mode="wait">
              <ContentCard
                content={steps[hoveredStep ?? activeStep].content}
                isVisible={true}
              />
            </AnimatePresence>
          </div>
        </div>

        <motion.div
          key={hoveredStep ?? activeStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto mt-12"
        >
          <h3 className="text-xl font-bold mb-2 text-text-heading">
            {steps[hoveredStep ?? activeStep].title}
          </h3>
          <p className="text-text-body">
            {steps[hoveredStep ?? activeStep].description}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ImprovementCycle;
