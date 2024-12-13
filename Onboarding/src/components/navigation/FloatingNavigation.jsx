import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bars3Icon, XMarkIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import confetti from 'canvas-confetti';

const sections = [
  { id: 'hero', label: 'Welcome', icon: '👋' },
  { id: 'discover', label: 'Discover', icon: '🔍' },
  { id: 'educational', label: 'Education', icon: '📚' },
  { id: 'roles', label: 'Meeting Roles', icon: '🎭' },
  { id: 'community', label: 'Community', icon: '👥' },
  { id: 'improvement', label: 'Improvement', icon: '📈' },
  { id: 'recognition', label: 'Recognition', icon: '🏆' },
  { id: 'resources', label: 'Resources', icon: '📑' },
  { id: 'getting-started', label: 'Get Started', icon: '🚀' },
  { id: 'feedback', label: 'Feedback', icon: '✍️' }
];

const RippleEffect = () => (
  <motion.span
    className="absolute inset-0 bg-primary/20 rounded-full"
    initial={{ scale: 0 }}
    animate={{ scale: 2, opacity: 0 }}
    transition={{ duration: 0.5 }}
  />
);

const FloatingParticles = () => (
  <motion.div
    className="absolute -inset-4 pointer-events-none"
    animate={{
      background: [
        "radial-gradient(circle, rgba(67,80,109,0.1) 0%, transparent 50%)",
        "radial-gradient(circle, rgba(67,80,109,0.2) 20%, transparent 70%)",
      ]
    }}
    transition={{ duration: 2, repeat: Infinity }}
  />
);

const FloatingNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showRipple, setShowRipple] = useState(false);
  const menuRef = useRef(null);
  const viewedSections = useRef(new Set(['hero']));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            viewedSections.current.add(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
    setShowRipple(true);
    setTimeout(() => setShowRipple(false), 500);

    if (!hasInteracted) {
      setHasInteracted(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { x: 0.9, y: 0.1 }
      });
    }
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <div className="fixed right-8 top-8 z-50 floating-nav">
      <motion.div
        animate={{
          y: [0, -8, 0],
          transition: {
            duration: 2,
            repeat: !hasInteracted ? Infinity : 0,
            repeatType: "reverse"
          }
        }}
      >
        <motion.button
          className="w-16 h-16 rounded-full bg-white text-primary shadow-lg
                     flex items-center justify-center relative border-2 border-primary
                     overflow-hidden"
          onClick={handleButtonClick}
          whileHover={{
            scale: 1.1,
            rotate: 180,
            transition: { duration: 0.3 }
          }}
          whileTap={{ scale: 0.9 }}
          animate={{
            boxShadow: !hasInteracted ? [
              "0 4px 6px rgba(67, 80, 109, 0.1)",
              "0 8px 12px rgba(67, 80, 109, 0.2)",
              "0 4px 6px rgba(67, 80, 109, 0.1)"
            ] : "0 4px 6px rgba(67, 80, 109, 0.1)",
          }}
        >
          <FloatingParticles />
          {showRipple && <RippleEffect />}

          <motion.div
            animate={{
              rotate: isOpen ? 180 : 0,
              scale: isOpen ? 1.2 : 1
            }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? (
              <XMarkIcon className="w-8 h-8" />
            ) : (
              <Bars3Icon className="w-8 h-8" />
            )}
          </motion.div>

          {!hasInteracted && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-primary"
              initial={{ scale: 1, opacity: 0 }}
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0, 0.8, 0],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            className="absolute top-20 right-0 bg-white rounded-lg shadow-xl p-4 w-72"
          >
            {sections.map((section, index) => (
              <motion.button
                key={section.id}
                data-section={section.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`flex items-center w-full p-3 rounded-lg transition-colors relative
                  ${activeSection === section.id
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-neutral-100 text-neutral-500'}`}
                onClick={() => scrollToSection(section.id)}
                whileHover={{
                  x: 10,
                  backgroundColor: "rgba(67,80,109,0.15)",
                  transition: { type: "spring", stiffness: 300 }
                }}
              >
                <span className="mr-3 text-xl">{section.icon}</span>
                <span className="font-medium">{section.label}</span>
                {viewedSections.current.has(section.id) && (
                  <motion.div
                    className="absolute right-2 w-2 h-2 bg-green-400 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  />
                )}
                {activeSection === section.id && (
                  <ChevronUpIcon className="w-4 h-4 ml-auto" />
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingNavigation;
