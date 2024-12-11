import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Button from '../base/Button';

const FormInput = ({ label, type, register, error, required }) => (
  <div className="mb-4">
    <label className="block text-text-heading mb-2">{label}</label>
    <input
      type={type}
      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary/50
        ${error ? 'border-red-500' : 'border-gray-300'}`}
      {...register}
    />
    {error && <span className="text-red-500 text-sm">{error.message}</span>}
  </div>
);

const SuccessModal = ({ isOpen, onClose }) => (
  <AnimatePresence>
    {isOpen && (
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
          className="bg-white p-8 rounded-lg max-w-md w-full"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex justify-between items-start mb-4">
            <span className="text-4xl">🎉</span>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          <h3 className="text-2xl font-bold text-text-heading mb-4">
            Thank You for Your Interest!
          </h3>

          <p className="text-text-body mb-6">
            Your feedback is invaluable to us. We're excited to have you join our community of aspiring communicators and leaders. Our team will review your message and get back to you soon.
          </p>

          <div className="space-y-4">
            <p className="text-text-body">
              While you wait:
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-body">
              <li>Explore our educational paths</li>
              <li>Connect with us on social media</li>
              <li>Visit our wiki for more resources</li>
            </ul>
          </div>

          <Button
            variant="primary"
            className="w-full mt-6"
            onClick={onClose}
          >
            Continue Exploring
          </Button>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const FeedbackForm = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,
          ...data,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setShowSuccess(true);
        reset();
      }
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="feedback" className="section bg-background-secondary pb-20">
      <div className="container mx-auto max-w-2xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          <h2 className="text-3xl font-bold text-text-heading mb-6 text-center">
            We're Building Something Exciting!
          </h2>
          <p className="text-text-body text-center mb-8">
            Share your thoughts and help us make Agora even better.
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              label="Full Name *"
              type="text"
              register={register('name', { required: 'Name is required' })}
              error={errors.name}
            />
            <FormInput
              label="Email Address *"
              type="email"
              register={register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              error={errors.email}
            />
            <FormInput
              label="Phone Number"
              type="tel"
              register={register('phone')}
            />

            <div className="mb-4">
              <label className="block text-text-heading mb-2">
                Feedback or Suggestions
              </label>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg h-32 focus:ring-2 focus:ring-primary/50"
                {...register('message')}
              />
            </div>

            <div className="mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  {...register('subscribe')}
                />
                <span className="text-text-body">
                  Keep me updated about exciting developments at Agora
                </span>
              </label>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Your Feedback'}
            </Button>
          </form>
        </motion.div>
      </div>

      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
      />
    </section>
  );
};

export default FeedbackForm;
