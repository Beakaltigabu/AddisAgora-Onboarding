import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { recognitionData } from '../../data/completeEducationalData';
import Button from '../base/Button';

const Badge = ({ icon, title, level }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="flex flex-col items-center p-4 bg-white/50 rounded-lg"
  >
    <span className="text-4xl mb-2">{icon}</span>
    <span className="text-sm font-medium text-text-heading">{title}</span>
    {level && (
      <span className="text-xs text-primary mt-1 font-medium">
        {level}
      </span>
    )}
  </motion.div>
);

const AwardCard = ({ title, description, icon, badges, onClick }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white p-6 rounded-lg shadow-lg"
  >
    <span className="text-4xl mb-4 block">{icon}</span>
    <h3 className="text-xl font-bold text-text-heading mb-2">{title}</h3>
    <p className="text-text-body mb-6">{description}</p>

    {badges && badges.length > 0 && (
      <div className="grid grid-cols-3 gap-2 mb-6">
        {badges.map((badge, index) => (
          <Badge key={index} {...badge} />
        ))}
      </div>
    )}

    <Button
      variant="primary"
      onClick={onClick}
      className="w-full"
    >
      View Details
    </Button>
  </motion.div>
);

const Modal = ({ category, onClose }) => (
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
      className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      onClick={e => e.stopPropagation()}
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <span className="text-4xl mb-2 block">{category.icon}</span>
          <h3 className="text-2xl font-bold text-text-heading">
            {category.title}
          </h3>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
      </div>

      {category.badges && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 mb-8">
          {category.badges.map((badge, index) => (
            <Badge key={index} {...badge} />
          ))}
        </div>
      )}

      <div className="space-y-6">
        {category.awards.map((award, index) => (
          <div key={index} className="border-b pb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{award.badge}</span>
              <h4 className="text-xl font-semibold text-text-heading">
                {award.title}
              </h4>
              {award.level && (
                <span className="text-sm text-primary font-medium ml-auto">
                  {award.level}
                </span>
              )}
            </div>
            <p className="text-text-body mb-4">{award.description}</p>
            {award.requirements && (
              <div>
                <h5 className="font-semibold mb-2">Requirements:</h5>
                {Array.isArray(award.requirements) ? (
                  <ul className="list-disc list-inside space-y-1">
                    {award.requirements.map((req, idx) => (
                      <li key={idx} className="text-text-body">{req}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-text-body">{award.requirements}</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t">
        <h4 className="font-semibold mb-4">Digital Badges</h4>
        <p className="text-text-body mb-2">
          All awards come with digital badges that comply with the Open Badges standard:
        </p>

      </div>
    </motion.div>
  </motion.div>
);

const RecognitionSection = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <section id="recognition" className="section bg-background-secondary pb-20 py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-text-heading mb-4">
            Recognition & Awards
          </h2>
          <p className="text-lg text-text-body max-w-2xl mx-auto">
            Celebrate your achievements as you progress through your journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recognitionData.categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <AwardCard
                {...category}
                onClick={() => setSelectedCategory(category)}
              />
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedCategory && (
            <Modal
              category={selectedCategory}
              onClose={() => setSelectedCategory(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default RecognitionSection;
