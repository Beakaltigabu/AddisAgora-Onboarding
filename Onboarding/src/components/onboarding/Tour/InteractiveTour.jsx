import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import confetti from 'canvas-confetti';

gsap.registerPlugin(ScrollToPlugin);

const sections = [
  { id: 'discover', label: 'Discover', position: { x: window.innerWidth - 80, y: 80 } },
  { id: 'educational', label: 'Education', position: { x: window.innerWidth - 80, y: 120 } },
  { id: 'roles', label: 'Meeting Roles', position: { x: window.innerWidth - 80, y: 160 } },
  { id: 'community', label: 'Community', position: { x: window.innerWidth - 80, y: 200 } },
  { id: 'improvement', label: 'Improvement', position: { x: window.innerWidth - 80, y: 240 } },
  { id: 'recognition', label: 'Recognition', position: { x: window.innerWidth - 80, y: 280 } },
  { id: 'resources', label: 'Resources', position: { x: window.innerWidth - 80, y: 320 } },
  { id: 'getting-started', label: 'Get Started', position: { x: window.innerWidth - 80, y: 360 } },
  { id: 'feedback', label: 'Feedback', position: { x: window.innerWidth - 80, y: 400 } }
];

const moveCursor = async (startPosition, endPosition, duration = 1000) => {
  const startTime = Date.now();

  return new Promise(resolve => {
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const currentX = startPosition.x + (endPosition.x - startPosition.x) * progress;
      const currentY = startPosition.y + (endPosition.y - startPosition.y) * progress;

      setCursorPosition({ x: currentX, y: currentY });

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        resolve();
      }
    };

    requestAnimationFrame(animate);
  });
};


const Cursor = ({ position }) => (
  <motion.div
    className="w-8 h-8 fixed pointer-events-none z-[100]"
    animate={position}
    transition={{ type: "spring", duration: 0.6 }}
  >
    <motion.div
      className="w-full h-full"
      animate={{ scale: [1, 0.8, 1] }}
      transition={{ duration: 0.3, times: [0, 0.5, 1] }}
    >
      <svg viewBox="0 0 24 24" className="w-full h-full">
        <path
          fill="#43506D"
          d="M5.5,2.5L21.5,18.5L18.5,21.5L2.5,5.5L5.5,2.5M7,4L4,7L17,20L20,17L7,4Z"
        />
      </svg>
    </motion.div>
  </motion.div>
);

const ClickRipple = ({ position }) => (
  <motion.div
    className="fixed pointer-events-none z-[99] w-8 h-8 -translate-x-1/2 -translate-y-1/2"
    style={{ left: position.x, top: position.y }}
    initial={{ scale: 0, opacity: 1 }}
    animate={{ scale: 2, opacity: 0 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="w-full h-full rounded-full bg-primary/30" />
  </motion.div>
);

const TourMessage = ({ message }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="fixed z-[150] bg-primary text-white p-6 rounded-xl shadow-xl max-w-sm"
    style={{
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)'
    }}
  >
    <p className="text-lg text-center font-medium">{message}</p>
  </motion.div>
);



const WelcomePrompt = ({ onStart, onSkip }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100]"
  >
    <motion.div
      initial={{ scale: 0.9, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0.9, y: 20 }}
      className="bg-white rounded-2xl p-8 max-w-md mx-4"
    >
      <div className="text-5xl mb-4">👋</div>
      <h2 className="text-2xl font-bold text-primary mb-4">
        Welcome to AddisAgora!
      </h2>
      <p className="text-gray-600 mb-6">
        Let's take a quick tour to help you get started.
      </p>
      <div className="flex gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="px-6 py-3 bg-primary text-white rounded-lg"
        >
          Start Tour
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onSkip}
          className="px-6 py-3 border border-gray-200 rounded-lg"
        >
          Skip
        </motion.button>
      </div>
    </motion.div>
  </motion.div>
);

const InteractiveTour = () => {
  const [showWelcome, setShowWelcome] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [showClickRipple, setShowClickRipple] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const hasSeenTour = localStorage.getItem('hasSeenTour');
    if (!hasSeenTour) {
      setShowWelcome(true);
    }
  }, []);

  const simulateClick = async (element, position) => {
    if (!element) return;

    // Add smooth cursor movement
    const startPosition = cursorPosition;
    const startTime = Date.now();
    const duration = 1000;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const currentX = startPosition.x + (position.x - startPosition.x) * progress;
      const currentY = startPosition.y + (position.y - startPosition.y) * progress;

      setCursorPosition({ x: currentX, y: currentY });

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);

    await new Promise(resolve => setTimeout(resolve, 1000));
    setShowClickRipple(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    setShowClickRipple(false);
    element.click();
  };


  const simulateMenuNavigation = async () => {
    // Introduce menu button
    setCursorPosition({ x: window.innerWidth - 80, y: 40 });
    setMessage("Let's explore the Page! First, click this menu button on the top right corner to navigate");
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Click menu button
    const menuButton = document.querySelector('.floating-nav button');
    await simulateClick(menuButton, { x: window.innerWidth - 80, y: 40 });
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Discover section
    const discoverButton = document.querySelector('[data-section="discover"]');
    setMessage("Let's start with discovering what Agora offers");
    await simulateClick(discoverButton, { x: window.innerWidth - 80, y: 80 });
    await gsap.to(window, {
      duration: 2,
      scrollTo: { y: '#discover', offsetY: 100 },
      ease: "power2.inOut"
    });
    setMessage("Here you'll learn about our  Agora ");
    await new Promise(resolve => setTimeout(resolve, 4000));

    // Education section
    await simulateClick(menuButton, { x: window.innerWidth - 80, y: 40 });
    await new Promise(resolve => setTimeout(resolve, 1500));
    const educationButton = document.querySelector('[data-section="educational"]');
    setMessage("Next, you can explore our educational paths");
    await simulateClick(educationButton, { x: window.innerWidth - 80, y: 120 });
    await gsap.to(window, {
      duration: 2,
      scrollTo: { y: '#educational', offsetY: 100 },
      ease: "power2.inOut"
    });
    setMessage("Here you'll find infomation about the structured learning paths designed for your growth");
    await new Promise(resolve => setTimeout(resolve, 4000));

    // Roles section
    await simulateClick(menuButton, { x: window.innerWidth - 80, y: 40 });
    await new Promise(resolve => setTimeout(resolve, 1500));
    const rolesButton = document.querySelector('[data-section="roles"]');
    setMessage("Finally, here you can check out the different roles you can take on");
    await simulateClick(rolesButton, { x: window.innerWidth - 80, y: 160 });
    await gsap.to(window, {
      duration: 2,
      scrollTo: { y: '#roles', offsetY: 100 },
      ease: "power2.inOut"
    });
    setMessage("These roles will help you develop various skills in public speaking");
    await new Promise(resolve => setTimeout(resolve, 4000));


    const completeTour = () => {
      setMessage("Congratulations! You've completed the tour. You're ready to start your Exploration! 🎉");

      setTimeout(() => {
        gsap.to(window, {
          duration: 2,
          scrollTo: { y: 0, ease: "power2.inOut" }
        });

        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });

        localStorage.setItem('hasSeenTour', 'true');
        setCurrentStep(-1);
        setMessage('');
      }, 3000);
    };
completeTour();

    // Complete tour
    setMessage("That's it! You now know how to navigate through the page");
    await new Promise(resolve => setTimeout(resolve, 3000));
    completeTour();
  };


  const startTour = async () => {
    setShowWelcome(false);
    await new Promise(resolve => setTimeout(resolve, 500));
    simulateMenuNavigation();
  };

  const completeTour = () => {
    gsap.to(window, {
      duration: 2,
      scrollTo: { y: 0, ease: "power2.inOut" }
    });

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    localStorage.setItem('hasSeenTour', 'true');
    setCurrentStep(-1);
  };

  const skipTour = () => {
    setShowWelcome(false);
    localStorage.setItem('hasSeenTour', 'true');
  };
  return (
    <>
      <AnimatePresence>
        {showWelcome && (
          <WelcomePrompt onStart={startTour} onSkip={skipTour} />
        )}
        {message && (
          <TourMessage message={message} />
        )}
        <Cursor position={cursorPosition} />
        {showClickRipple && <ClickRipple position={cursorPosition} />}
      </AnimatePresence>
    </>
  );

};

export default InteractiveTour;
