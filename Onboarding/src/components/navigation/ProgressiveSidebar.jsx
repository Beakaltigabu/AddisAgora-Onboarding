import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const sections = [
  { id: 'hero', label: 'Welcome', icon: '👋' },
  { id: 'discover', label: 'Discover', icon: '🔍' },
  { id: 'educational', label: 'Education', icon: '📚' },
  { id: 'roles', label: 'Roles', icon: '🎭' },
  { id: 'community', label: 'Community', icon: '👥' },
  { id: 'improvement', label: 'Improvement', icon: '📈' },
  { id: 'recognition', label: 'Recognition', icon: '🏆' },
  { id: 'resources', label: 'Resources', icon: '📑' },
  { id: 'getting-started', label: 'Get Started', icon: '🚀' },
  { id: 'feedback', label: 'Feedback', icon: '✍️' }
];


const ProgressiveSidebar = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      setProgress((scrolled / documentHeight) * 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute left-4 top-0 w-0.5 h-full bg-neutral-300">
          <motion.div
            className="w-full bg-primary"
            style={{ height: `${progress}%` }}
          />
        </div>

        {/* Navigation Items */}
        {sections.map(({ id, label, icon }) => (
          <motion.button
            key={id}
            onClick={() => scrollToSection(id)}
            className={`flex items-center mb-8 relative group`}
          >
            {/* Dot Indicator */}
            <motion.div
              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center
                ${activeSection === id
                  ? 'border-primary bg-primary text-white'
                  : 'border-neutral-300 bg-white'}`}
            >
              {icon}
            </motion.div>

            {/* Label */}
            <span className={`ml-4 opacity-0 group-hover:opacity-100 transition-opacity
              ${activeSection === id ? 'text-primary' : 'text-neutral-500'}`}>
              {label}
            </span>
          </motion.button>
        ))}
      </div>
    </nav>
  );
};


export default ProgressiveSidebar;
