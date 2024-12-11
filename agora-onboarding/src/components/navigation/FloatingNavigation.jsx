import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bars3Icon, XMarkIcon, ChevronUpIcon } from '@heroicons/react/24/solid';

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

const FloatingNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [hasInteracted, setHasInteracted] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
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

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  const pulseAnimation = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  const bounceAnimation = {
    initial: { y: 0 },
    animate: {
      y: [-8, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  return (
    <div className="fixed right-8 bottom-8 z-50">
      <motion.div
        variants={bounceAnimation}
        initial="initial"
        animate={!hasInteracted ? "animate" : "initial"}
      >
        <motion.button
          className="w-14 h-14 rounded-full bg-primary text-white shadow-lg
                     flex items-center justify-center relative"
          onClick={() => {
            setIsOpen(!isOpen);
            setHasInteracted(true);
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          variants={!hasInteracted ? pulseAnimation : {}}
          initial="initial"
          animate="animate"
        >
          {isOpen ? (
            <XMarkIcon className="w-6 h-6" />
          ) : (
            <Bars3Icon className="w-6 h-6" />
          )}

          {!hasInteracted && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-primary"
              initial={{ scale: 1, opacity: 0 }}
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
          )}
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="absolute bottom-20 right-0 bg-white rounded-lg shadow-xl p-4 w-64"
          >
            {sections.map((section, index) => (
              <motion.button
                key={section.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`flex items-center w-full p-3 rounded-lg transition-colors
                  ${activeSection === section.id
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-neutral-100 text-neutral-500'}`}
                onClick={() => scrollToSection(section.id)}
              >
                <span className="mr-3 text-xl">{section.icon}</span>
                <span className="font-medium">{section.label}</span>
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
