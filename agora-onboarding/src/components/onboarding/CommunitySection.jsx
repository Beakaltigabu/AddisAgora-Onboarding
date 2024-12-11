import React from 'react';
import { motion } from 'framer-motion';
import { CalendarIcon, UserGroupIcon, AcademicCapIcon, SparklesIcon } from '@heroicons/react/24/outline';
import Button from '../base/Button';

const communityEvents = [
  {
    title: 'Masterclasses',
    description: 'Join expert-led workshops on advanced speaking techniques and leadership skills',
    icon: AcademicCapIcon,
    benefits: ['In-depth skill development', 'Expert guidance', 'Interactive learning']
  },
  {
    title: 'Networking Sessions',
    description: 'Connect with professionals and expand your network in engaging social settings',
    icon: UserGroupIcon,
    benefits: ['Professional connections', 'Knowledge sharing', 'Career opportunities']
  },
  {
    title: 'Guest Interviews',
    description: 'Learn from industry leaders and gain insights from their success stories',
    icon: SparklesIcon,
    benefits: ['Real-world insights', 'Success strategies', 'Inspiration']
  },
  {
    title: 'Group Activities',
    description: 'Build lasting relationships through workshops and social outings',
    icon: CalendarIcon,
    benefits: ['Team building', 'Practical experience', 'Social bonding']
  },
  {
    title: 'Mentorship Program',
    description: 'Get paired with experienced members who guide your growth journey',
    icon: UserGroupIcon,
    benefits: ['Personalized guidance', 'Accelerated learning', 'Continuous support']
  }
];

const EventCard = ({ title, description, icon: Icon, benefits }) => (
  <motion.div
    whileHover={{ y: -8 }}
    className="bg-white p-6 rounded-lg shadow-lg"
  >
    <div className="flex items-center mb-4">
      <div className="p-2 bg-[#d25417]/10 rounded-lg">
        <Icon className="w-6 h-6 text-[#d25417]" />
      </div>
      <h3 className="text-xl font-bold ml-3 text-text-heading">{title}</h3>
    </div>
    <p className="text-text-body mb-4">{description}</p>
    <ul className="space-y-2">
      {benefits.map((benefit, index) => (
        <li key={index} className="flex items-center text-sm text-text-body">
          <svg className="w-4 h-4 mr-2 text-[#d25417]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          {benefit}
        </li>
      ))}
    </ul>
  </motion.div>
);

const CommunitySection = () => {
  const scrollToFeedback = () => {
    const feedbackSection = document.getElementById('feedback');
    if(feedbackSection){
      feedbackSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="community" className="section py-12 md:py-20 bg-background-secondary">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-text-heading mb-4">
            Join Our Vibrant Community
          </h2>
          <p className="text-lg text-text-body max-w-2xl mx-auto">
            Immerse yourself in a dynamic environment where learning meets networking.
            Our regular events create opportunities for growth, connection, and leadership development.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {communityEvents.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <EventCard {...event} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-lg text-text-body max-w-2xl mx-auto mb-6">
            Experience the power of community-driven growth. Our events are designed to help you
            build confidence, develop leadership skills, and create lasting professional relationships.
          </p>
          <Button
            variant="primary"
            onClick={scrollToFeedback}
            className="px-8 py-3"
          >
            Join Our Next Event
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CommunitySection;
