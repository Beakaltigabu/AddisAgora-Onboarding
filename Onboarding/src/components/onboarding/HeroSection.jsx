import React from 'react';
import { motion } from 'framer-motion';
import { Heading1, BodyText } from '../base/Typography';
import Button from '../base/Button';
import Container from '../base/Container';

const HeroSection = () => {
  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 }
  };

  const scrollToNextSection = () => {
    document.getElementById('discover')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center">
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5 }}
      >
        <div className="relative w-full h-full">
          <img
            src="/hero-bg.jpeg"
            alt="Public Speaking"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40" />

          {/* Animated Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
        </div>
      </motion.div>

      {/* Content Container with Enhanced Glass Effect */}
      <Container className="relative z-10">
        <div className="max-w-3xl p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl">
          <motion.div {...fadeUp}>
            <span className="inline-block px-4 py-1 rounded-full bg-white/10 text-white/90 font-medium mb-6">
              Welcome to AddisAgora
            </span>
          </motion.div>

          <motion.div {...fadeUp} transition={{ delay: 0.2 }}>
            <Heading1 className="text-white mb-6 text-5xl md:text-6xl font-extrabold">
              Empower Your Voice,<br />
              <span className="text-primary-light">Shape Your Future</span>
            </Heading1>
          </motion.div>

          <motion.div {...fadeUp} transition={{ delay: 0.4 }}>
            <BodyText className="text-white/90 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl">
              Join a Vibrant platform and Community for mastering public speaking and leadership.
              Transform your communication skills, build confidence, and make a lasting impact
              in your community.
            </BodyText>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <Button
              variant="primary"
              className="group flex items-center gap-2"
              onClick={scrollToNextSection}
            >
              Start Your Journey
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </Button>
          </motion.div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <motion.button
          onClick={scrollToNextSection}
          className="absolute -bottom-24 left-1/2 -translate-x-1/2 cursor-pointer group"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="flex flex-col items-center text-white/80 hover:text-white transition-colors">
            <span className="text-xl font-medium mb-3 group-hover:transform group-hover:translate-y-1 transition-transform">
              Explore More
            </span>
            <svg
              className="w-10 h-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </motion.button>
      </Container>
    </section>
  );
};

export default HeroSection;
