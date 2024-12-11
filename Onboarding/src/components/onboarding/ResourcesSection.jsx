import React from 'react';
import { motion } from 'framer-motion';
import Accordion from '../shared/Accordion';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';


const resources = [
  {
    title: 'Agora Wiki',
    content: 'Access comprehensive information about educational programs, meeting roles, and guidelines.',
    link: 'https://www.agoraspeakers.org/',
    isAvailable: true
  },
  {
    title: 'Video Tutorials',
    content: 'Watch instructional videos covering various aspects of public speaking and leadership.',
    comingSoon: true
  },
  {
    title: 'Online Platforms',
    content: 'Connect with members and mentors through our digital platforms and forums.',
    comingSoon: true
  }
];

const ResourcesSection = () => {
  return (
    <section id="resources" className="section bg-white py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-text-heading mb-4">
            Resources & Tools
          </h2>
          <p className="text-lg text-text-body max-w-2xl mx-auto">
            Everything you need to succeed in your journey
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {resources.map((resource, index) => (
            <Accordion key={index} title={resource.title}>
              <div className="flex flex-col space-y-4">
                <p className="text-text-body">{resource.content}</p>

                {resource.isAvailable && resource.link && (
                  <a
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary hover:underline font-medium"
                  >
                    Visit Agora Wiki
                    <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-2" />

                  </a>
                )}

                {resource.comingSoon && (
                  <div className="flex items-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                      Coming Very Soon
                    </span>
                  </div>
                )}
              </div>
            </Accordion>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;
