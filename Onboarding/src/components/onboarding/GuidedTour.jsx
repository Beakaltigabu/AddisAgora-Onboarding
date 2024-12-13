import React, { useState, useEffect } from 'react';
import Joyride, { STATUS, ACTIONS, EVENTS } from 'react-joyride';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useMediaQuery } from 'react-responsive';

const WelcomeOverlay = ({ onStart, onSkip }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]"
  >
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      className="bg-white p-8 rounded-xl max-w-md mx-4"
    >
      <h2 className="text-2xl font-bold text-primary mb-4">Welcome to AddisAgora! 👋</h2>
      <p className="text-gray-600 mb-6">
        Your journey to becoming a confident speaker starts here. Let us show you around our platform
        and help you discover all the amazing features we offer.
      </p>
      <div className="flex gap-4">
        <button
          onClick={onStart}
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
        >
          Start Tour
        </button>
        <button
          onClick={onSkip}
          className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Skip
        </button>
      </div>
    </motion.div>
  </motion.div>
);

const steps = [
  {
    target: '.floating-nav',
    content: 'This is your navigation hub. Click here to access all sections quickly.',
    placement: 'left',
    spotlightPadding: 20,
    disableOverlayClose: true,
    disableBeacon: true,
    styles: {
      options: {
        zIndex: 10000
      }
    }
  },
  {
    target: '#hero',
    content: 'Start your journey here. Learn about our mission and what we offer.',
    placement: 'bottom'
  },
  {
    target: '#educational',
    title: 'Educational Journey',
    content: 'Explore our structured learning paths designed to enhance your communication skills.',
    placement: 'bottom'
  },
  {
    target: '#roles',
    title: 'Meeting Roles',
    content: 'Discover various roles you can take on during our sessions.',
    placement: 'bottom'
  },
  {
    target: '#community',
    title: 'Join Our Community',
    content: 'Connect with fellow members and participate in engaging activities.',
    placement: 'bottom'
  },
  {
    target: '#improvement',
    title: 'Track Your Progress',
    content: 'Monitor your growth and celebrate achievements.',
    placement: 'bottom'
  }
];

const mobileSteps = steps.map(step => ({
  ...step,
  placement: 'center',
  spotlightPadding: 10
}));

const GuidedTour = () => {
  const [showWelcome, setShowWelcome] = useState(false);
  const [run, setRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  useEffect(() => {
    const hasSeenTour = localStorage.getItem('hasSeenTour');
    if (!hasSeenTour) {
      setShowWelcome(true);
    }
  }, []);

  const handleJoyrideCallback = (data) => {
    const { action, index, status, type } = data;

    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      localStorage.setItem('hasSeenTour', 'true');
      celebrateTourCompletion();
    }

    if (type === EVENTS.STEP_AFTER) {
      setStepIndex(index + 1);
    }
  };

  const celebrateTourCompletion = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const startTour = () => {
    setShowWelcome(false);
    setRun(true);
  };

  const skipTour = () => {
    setShowWelcome(false);
    localStorage.setItem('hasSeenTour', 'true');
  };

  return (
    <>
      <AnimatePresence>
        {showWelcome && (
          <WelcomeOverlay onStart={startTour} onSkip={skipTour} />
        )}
      </AnimatePresence>

      <Joyride
        steps={isMobile ? mobileSteps : steps}
        run={run}
        continuous
        showProgress
        showSkipButton
        callback={handleJoyrideCallback}
        stepIndex={stepIndex}
        styles={{
          options: {
            primaryColor: '#43506D',
            zIndex: 1000,
            arrowColor: '#fff',
            backgroundColor: '#fff',
            overlayColor: 'rgba(0, 0, 0, 0.5)',
            textColor: '#333',
            width: isMobile ? 290 : 450
          },
          tooltip: {
            animation: '300ms ease-in-out',
            borderRadius: '8px',
            fontSize: isMobile ? '14px' : '16px'
          },
          tooltipTitle: {
            fontSize: isMobile ? '16px' : '18px',
            fontWeight: 600
          },
          buttonNext: {
            backgroundColor: '#43506D',
            fontSize: isMobile ? '14px' : '16px',
            padding: '8px 16px'
          },
          buttonBack: {
            color: '#43506D',
            fontSize: isMobile ? '14px' : '16px',
            marginRight: '8px'
          },
          buttonSkip: {
            color: '#666',
            fontSize: isMobile ? '14px' : '16px'
          }
        }}
        floaterProps={{
          disableAnimation: false,
          styles: {
            floater: {
              filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.1))'
            }
          }
        }}
      />
    </>
  );
};

export default GuidedTour;
