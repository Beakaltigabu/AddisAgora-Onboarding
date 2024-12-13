import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
  {
    number: 1,
    title: 'Learn',
    description: 'Study materials and observe accomplished speakers',
    content: 'Master the fundamentals through our comprehensive educational materials, learn from experienced speakers, and engage with our global community of learners.',
    icon: '📚',
  },
  {
    number: 2,
    title: 'Prepare',
    description: 'Plan your speeches and rehearse thoroughly',
    content: 'Develop your content, structure your presentation, practice delivery, and receive guidance from your mentor to ensure maximum impact.',
    icon: '📝',
  },
  {
    number: 3,
    title: 'Practice',
    description: 'Deliver speeches and take on meeting roles',
    content: 'Put your skills into action by delivering speeches, taking on various meeting roles, and actively participating in club activities.',
    icon: '🎯',
  },
  {
    number: 4,
    title: 'Feedback',
    description: 'Receive constructive feedback and reflect on performance',
    content: 'Gain valuable insights from peers and mentors, reflect on your progress, and identify specific areas for continued improvement.',
    icon: '💭',
  }
];

const ConnectingLines = () => (
  <div className="absolute inset-0 before:absolute before:w-[70%] before:h-[70%] before:border-2 before:border-dashed before:border-primary/30 before:rounded-full before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2" />
);

const Node = ({ step, index, isActive, onClick, onHover, onLeave }) => {
  const positions = {
    0: { top: '0', left: '50%', transform: 'translate(-50%, 0)' },        // North
    1: { top: '50%', right: '0', transform: 'translate(0, -50%)' },       // East
    2: { bottom: '0', left: '50%', transform: 'translate(-50%, 0)' },     // South
    3: { top: '50%', left: '0', transform: 'translate(0, -50%)' }         // West
  };

  return (
    <motion.div
      className="absolute"
      style={positions[index]} // Keep the fixed positions
      onClick={onClick}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className={`
        relative w-20 h-20 bg-white rounded-full shadow-lg
        flex flex-col items-center justify-center cursor-pointer
        transition-all duration-300
        ${isActive ? 'ring-4 ring-[#d25417] ring-opacity-50' : ''}
      `}>
        <span className="text-sm font-bold text-[#d25417] mb-1">{step.number}</span>
        <span className="text-2xl">{step.icon}</span>
        <span className="text-xs font-medium text-text-heading">{step.title}</span>

        {isActive && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-[#d25417]"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 0 }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        )}
      </div>
    </motion.div>
  );
};





const Arrow = ({ fromAngle, toAngle }) => {
  const angleDiff = (toAngle - fromAngle) % 360;

  return (
    <motion.div
      className="absolute w-6 h-6"
      style={{
        transform: `rotate(${angleDiff}deg)`,
        top: '50%',
        left: '50%',
      }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      
    </motion.div>
  );
};

const ContentDisplay = ({ step, isVisible }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
    exit={{ opacity: 0, scale: 0.8 }}
    className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg max-w-[280px] text-center"
  >
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="text-text-body text-sm"
    >
      {step.content}
    </motion.p>
  </motion.div>
);

const ImprovementCycle = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [hoveredStep, setHoveredStep] = useState(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const totalSteps = steps.length;

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  return (
    <section id="improvement" className="section bg-background-secondary py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-text-heading mb-4">Continuous Improvement Cycle</h2>
          <p className="text-lg text-text-body max-w-2xl mx-auto">
            Our proven methodology for developing your communication skills
          </p>
        </motion.div>

        <div className="flex justify-center">
          <div className="relative w-[400px] h-[400px]">
            <ConnectingLines />
            <div className="absolute inset-0 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <ContentDisplay
                  key={hoveredStep ?? activeStep}
                  step={steps[hoveredStep ?? activeStep]}
                  isVisible={true}
                />
              </AnimatePresence>
            </div>

            {steps.map((step, index) => {
              const angle = (360 / totalSteps) * index; // Calculate angle for each node
              return (
                <Node
                  key={index}
                  step={step}
                  index={index}
                  isActive={index === (hoveredStep ?? activeStep)}
                  angle={angle}
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
                />
              );
            })}

            {/* Adding arrows between nodes */}
            {steps.map((step, index) => {
              const nextIndex = (index + 1) % steps.length;
              const fromAngle = (360 / totalSteps) * index;
              const toAngle = (360 / totalSteps) * nextIndex;
              return (
                <Arrow
                  key={`arrow-${index}`}
                  fromAngle={fromAngle}
                  toAngle={toAngle}
                />
              );
            })}
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
          <p className="text-text-body">{steps[hoveredStep ?? activeStep].description}</p>
        </motion.div>
      </div>
    </section>
  );
};

export default ImprovementCycle;
