import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heading2, BodyText } from '../base/Typography';
import Container from '../base/Container';
import { basicEducationalPath, advancedPaths } from '../../data/completeEducationalData';
import { XMarkIcon } from '@heroicons/react/24/outline';

const PathSection = ({ title, description, isRequired = false }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
    <h6 className="text-xl font-semibold text-text-heading mb-2">
      {title}
      {isRequired && (
        <span className="ml-2 text-sm text-primary font-normal">
          This is the foundation of the program and is mandatory. It consists of 16 projects. It teaches the fundamentals of public speaking and helps overcome fear of public speaking. It includes three sections: 'The Initial Projects', 'Basics of Speaking', and 'Speaking Techniques'.
After completing the Basic Educational Path, members receive the 'Qualified Speaker' award.
(Mandatory)
        </span>
      )}
    </h6>
    <p className="text-text-body">{description}</p>
  </div>
);

const ProjectCard = ({ project, onClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="bg-white rounded-lg shadow-lg p-4 md:p-6"
    whileHover={{ y: -5 }}
  >
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        {project.number && (
          <span className="text-sm text-primary-light">#{project.number}</span>
        )}
        <span className="text-primary font-semibold">
          {project.title}
        </span>
      </div>
      <span className="text-sm text-text-body">
        {project.duration || project.time}
      </span>
    </div>
    <p className="text-text-body text-sm line-clamp-2 mb-4">
      {project.description}
    </p>
    <button
      onClick={onClick}
      className="text-primary text-sm hover:underline flex items-center gap-1"
    >
      View Details
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </motion.div>
);

const ProjectModal = ({ project, onClose }) => (
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
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-text-heading">
            {project.title}
          </h3>
          {project.number && (
            <span className="text-sm text-primary-light">Project #{project.number}</span>
          )}
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
          <p className="text-text-body">{project.description}</p>
        </div>

        {project.certification && (
          <div>
            <h4 className="font-semibold mb-2">Certification</h4>
            <p className="text-text-body">{project.certification}</p>
          </div>
        )}

        {project.objective && (
          <div>
            <h4 className="font-semibold mb-2">Objective</h4>
            <p className="text-text-body">{project.objective}</p>
          </div>
        )}

        {project.deliverables && (
          <div>
            <h4 className="font-semibold mb-2">Deliverables</h4>
            <ul className="list-disc list-inside space-y-1">
              {project.deliverables.map((item, index) => (
                <li key={index} className="text-text-body">{item}</li>
              ))}
            </ul>
          </div>
        )}

        {project.tips && (
          <div>
            <h4 className="font-semibold mb-2">Tips</h4>
            <ul className="list-disc list-inside space-y-1">
              {project.tips.map((tip, index) => (
                <li key={index} className="text-text-body">{tip}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-wrap justify-between items-center gap-4 pt-4 border-t">
          {project.time && (
            <div>
              <span className="font-semibold">Time: </span>
              <span className="text-text-body">{project.time}</span>
            </div>
          )}
          {project.duration && (
            <div>
              <span className="font-semibold">Duration: </span>
              <span className="text-text-body">{project.duration}</span>
            </div>
          )}
          {project.tools && (
            <div>
              <span className="font-semibold">Tools: </span>
              <span className="text-text-body">{project.tools}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  </motion.div>
);

const EducationalJourney = () => {
  const [activePath, setActivePath] = useState('basic');
  const [selectedSection, setSelectedSection] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showMilestone, setShowMilestone] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState(null);

  const currentMilestone = selectedMilestone ?
    basicEducationalPath.sections[selectedSection]?.milestone :
    null;

  return (
    <section id="educational" className="section bg-background-secondary py-12 md:py-20">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <Heading2 className="mb-4">Your Educational Journey</Heading2>
          <BodyText className="max-w-2xl mx-auto">
          The Agora Educational Program is designed to improve communication and leadership skills. It consists of two tracks: the Public Speaking track and the Leadership track.
          </BodyText>
        </motion.div>

        {/* Path Selection */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActivePath('basic')}
            className={`px-6 py-3 rounded-lg transition-colors
              ${activePath === 'basic' ? 'bg-primary text-white' : 'bg-white text-primary hover:bg-primary/10'}`}
          >
            Basic Path
          </button>
          <button
            onClick={() => setActivePath('advanced')}
            className={`px-6 py-3 rounded-lg transition-colors
              ${activePath === 'advanced' ? 'bg-primary text-white' : 'bg-white text-primary hover:bg-primary/10'}`}
          >
            Advanced Paths
          </button>
        </div>

        {/* Path Content */}
        <AnimatePresence mode="wait">
          {activePath === 'basic' ? (
            <motion.div
              key="basic"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <PathSection
                title={basicEducationalPath.title}
                description={basicEducationalPath.description}
                isRequired={true}
              />

              {/* Section Navigation */}
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {basicEducationalPath.sections.map((section, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setSelectedSection(index)}
                    whileHover={{ scale: 1.05 }}
                    className={`px-4 py-2 rounded-lg transition-colors text-sm md:text-base
                      ${selectedSection === index ? 'bg-primary text-white' : 'bg-white text-primary hover:bg-primary/10'}`}
                  >
                    {section.title}
                  </motion.button>
                ))}
              </div>

              {/* Projects Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {basicEducationalPath.sections[selectedSection].projects.map((project) => (
                  <ProjectCard
                    key={project.number}
                    project={project}
                    onClick={() => setSelectedProject(project)}
                  />
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="advanced"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <PathSection
                title="Advanced Educational Paths"
                description="After completing the Basic Educational Path, choose from specialized paths to deepen your expertise. Each path offers unique certifications and recognition upon completion."
              />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {advancedPaths.map((path, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-6 rounded-lg shadow-lg"
                  >
                    <span className="text-3xl mb-4 block">{path.icon}</span>
                    <h3 className="text-lg font-semibold text-text-heading mb-2">
                      {path.title}
                    </h3>
                    <p className="text-text-body mb-4">{path.description}</p>
                    {path.certification && (
                      <p className="text-primary-light mb-2">
                        Certification: {path.certification}
                      </p>
                    )}
                    {path.duration && (
                      <p className="text-primary-light mb-4">
                        Duration: {path.duration}
                      </p>
                    )}
                    <div className="grid grid-cols-1 gap-4">
                      {path.projects?.map((project, projectIndex) => (
                        <ProjectCard
                          key={projectIndex}
                          project={{
                            ...project,
                            duration: path.duration,
                            certification: path.certification
                          }}
                          onClick={() => setSelectedProject({
                            ...project,
                            duration: path.duration,
                            certification: path.certification
                          })}
                        />
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <ProjectModal
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
            />
          )}
        </AnimatePresence>

        {/* Milestone Modal */}
        <AnimatePresence>
          {showMilestone && currentMilestone && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowMilestone(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white p-6 rounded-lg max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{currentMilestone.badge}</span>
                    <h3 className="text-xl font-semibold text-text-heading">
                      {currentMilestone.name}
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowMilestone(false)}
                    className="p-1 hover:bg-gray-100 rounded-full"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Requirements</h4>
                    <p className="text-text-body">{currentMilestone.requirements}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Benefits</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {currentMilestone.benefits.map((benefit, index) => (
                        <li key={index} className="text-text-body">{benefit}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </section>
  );
};

export default EducationalJourney;
