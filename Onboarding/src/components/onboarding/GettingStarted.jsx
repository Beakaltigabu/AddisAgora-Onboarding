import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tab } from '@headlessui/react';

const gettingStartedContent = {
  attendMeetings: {
    title: 'Attend Meetings Regularly',
    description: 'Attend at least twice a month for consistent progress',
    points: [
      'Experience supportive and encouraging environment',
      'Practice speaking skills and receive feedback',
      'Learn from experienced members',
      'Observe different speaking styles'
    ]
  },
  getInvolved: {
    title: 'Get Involved',
    description: 'Take on roles and participate actively',
    roles: [
      {
        title: 'Timer',
        description: 'Keep track of time for speakers'
      },
      {
        title: 'Grammarian',
        description: 'Identify grammatical errors and provide suggestions'
      },
      {
        title: 'Filler-Word Counter',
        description: 'Track filler words to improve speech habits'
      },
      {
        title: 'Listners Post',
        description: 'Test audience attention and comprehension through questions'
      }
    ]
  },
  mentorship: {
    title: 'Connect with Your Mentor',
    description: 'Get personalized guidance for your journey',
    benefits: [
      'Guidance through initial projects',
      'Help with club integration',
      'Personalized feedback and support',
      'Goal setting assistance'
    ]
  },
  improvement: {
    title: 'Continuous Improvement',
    description: 'Follow our proven cycle for growth',
    cycle: [
      {
        phase: 'Learn',
        description: 'Study materials and observe speakers'
      },
      {
        phase: 'Prepare',
        description: 'Plan speeches and rehearse'
      },
      {
        phase: 'Practice',
        description: 'Deliver speeches and take on roles'
      },
      {
        phase: 'Feedback',
        description: 'Receive feedback and reflect'
      }
    ]
  }
};

const GettingStarted = () => {
  return (
    <section id="getting-started" className="section bg-background-secondary py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-text-heading mb-4">
            Getting Started
          </h2>
          <p className="text-lg text-text-body max-w-2xl mx-auto">
            Your journey to becoming a confident communicator begins here
          </p>
        </motion.div>

        <Tab.Group>
          <Tab.List className="flex space-x-2 rounded-xl bg-white/20 p-1 mb-8">
            {Object.keys(gettingStartedContent).map((key) => (
              <Tab
                key={key}
                className={({ selected }) =>
                  `w-full rounded-lg py-2.5 text-sm font-medium leading-5
                  ${selected
                    ? 'bg-primary text-white shadow'
                    : 'text-text-body hover:bg-white/[0.12] hover:text-text-heading'
                  }`
                }
              >
                {gettingStartedContent[key].title}
              </Tab>
            ))}
          </Tab.List>

          <Tab.Panels className="mt-2">
            {Object.values(gettingStartedContent).map((content, idx) => (
              <Tab.Panel
                key={idx}
                className="rounded-xl bg-white p-6 shadow-lg"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h3 className="text-xl font-bold text-text-heading mb-4">
                    {content.title}
                  </h3>
                  <p className="text-text-body mb-6">{content.description}</p>

                  {content.points && (
                    <ul className="space-y-2">
                      {content.points.map((point, index) => (
                        <li key={index} className="flex items-center text-text-body">
                          <span className="mr-2 text-primary">•</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}

                  {content.roles && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {content.roles.map((role, index) => (
                        <div key={index} className="p-4 bg-background-secondary rounded-lg">
                          <h4 className="font-semibold text-text-heading mb-2">
                            {role.title}
                          </h4>
                          <p className="text-sm text-text-body">{role.description}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {content.cycle && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {content.cycle.map((step, index) => (
                        <div key={index} className="text-center p-4 bg-background-secondary rounded-lg">
                          <h4 className="font-semibold text-text-heading mb-2">
                            {step.phase}
                          </h4>
                          <p className="text-sm text-text-body">{step.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </section>
  );
};

export default GettingStarted;
