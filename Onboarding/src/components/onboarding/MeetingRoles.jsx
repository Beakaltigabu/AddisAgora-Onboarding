import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { meetingRoles } from '../../data/completeEducationalData';
import Button from '../base/Button';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const RoleCard = ({ role, onViewDetails }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="bg-white p-6 rounded-lg shadow-lg h-full"
  >
    <div className={`text-sm font-semibold mb-2 ${
      role.difficulty === 'Basic' ? 'text-green-600' :
      role.difficulty === 'Intermediate' ? 'text-blue-600' :
      'text-purple-600'
    }`}>
      {role.difficulty}
    </div>
    <h3 className="text-xl font-bold mb-3 text-text-heading">{role.title}</h3>
    <p className="text-text-body mb-4">{role.description}</p>
    <div className="flex justify-between items-center">
      <span className="text-sm text-text-body">Prep: {role.prepTime}</span>
      <Button
        variant="secondary"
        onClick={() => onViewDetails(role)}
        className="text-sm"
      >
        View Details
      </Button>
    </div>
  </motion.div>
);

const RoleModal = ({ role, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      className="bg-white p-6 rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto"
      onClick={e => e.stopPropagation()}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className={`text-sm font-semibold ${
            role.difficulty === 'Basic' ? 'text-green-600' :
            role.difficulty === 'Intermediate' ? 'text-blue-600' :
            'text-purple-600'
          }`}>
            {role.difficulty}
          </span>
          <h3 className="text-xl font-bold text-text-heading">{role.title}</h3>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="font-semibold mb-2">Description</h4>
          <p className="text-text-body">{role.description}</p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Key Tasks</h4>
          <ul className="list-disc list-inside space-y-1">
            {role.keyTasks.map((task, index) => (
              <li key={index} className="text-text-body">{task}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Skills Trained</h4>
          <ul className="list-disc list-inside space-y-1">
            {role.skillsTrained.map((skill, index) => (
              <li key={index} className="text-text-body">{skill}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Tips</h4>
          <ul className="list-disc list-inside space-y-1">
            {role.tips.map((tip, index) => (
              <li key={index} className="text-text-body">{tip}</li>
            ))}
          </ul>
        </div>

        <div className="pt-4 border-t flex justify-between text-sm text-text-body">
          <span>Preparation Time: {role.prepTime}</span>
          <span>Speaking Time: {role.speakingTime}</span>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

const MeetingRoles = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const allRoles = [...meetingRoles.basic, ...meetingRoles.intermediate, ...meetingRoles.advanced];

  return (
    <section className="section bg-background-secondary" id="roles">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-text-heading mb-4">
            Meeting Roles
          </h2>
          <p className="text-lg text-text-body max-w-2xl mx-auto mb-8">
            Experience different aspects of public speaking and leadership through
            various meeting roles.
          </p>
        </motion.div>

        <Swiper
          modules={[EffectCoverflow, Navigation, Pagination]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          navigation
          pagination={{ clickable: true }}
          className="px-4"
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
        >
          {allRoles.map((role, index) => (
            <SwiperSlide key={index} className="max-w-sm">
              <RoleCard role={role} onViewDetails={setSelectedRole} />
            </SwiperSlide>
          ))}
        </Swiper>

        <AnimatePresence>
          {selectedRole && (
            <RoleModal role={selectedRole} onClose={() => setSelectedRole(null)} />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default MeetingRoles;
