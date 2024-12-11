import React from 'react';
import { motion } from 'framer-motion';
import { Heading2, BodyText } from '../base/Typography';
import Container from '../base/Container';
import Card from '../base/Card';

const DiscoverSection = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 }
  };

  const benefits = [
    {
      title: "Global Impact",
      description: "Join 150+ clubs across 70+ countries, building a worldwide community of leaders since 2016.",
      icon: "🌍"
    },
    {
      title: "Free Education",
      description: "Access all materials and training completely free, with no membership fees or hidden costs.",
      icon: "💫"
    },
    {
      title: "Skill Development",
      description: "Master public speaking, critical thinking, and leadership through practical experience.",
      icon: "📈"
    },
    {
      title: "Community Impact",
      description: "Lead real-world projects and make lasting positive changes in your community.",
      icon: "🤝"
    }
  ];

  return (
    <section id="discover" className="section bg-background-secondary py-20">
      <Container>
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeIn} className="text-center mb-12">
            <Heading2 className="mb-6">
              Empowering Future Leaders
            </Heading2>
            <BodyText className="text-lg mb-4">
              Agora Speakers International Foundation is a  secular educational
              non-profit organization transforming individuals into brilliant communicators and confident
              leaders who actively build a better world.
            </BodyText>
            <BodyText className="text-lg">
              Our unique peer-learning approach combines online resources with practical
              experience in a supportive club environment, helping you develop essential
              skills while making real impact.
            </BodyText>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="h-full">
                  <div className="flex items-start space-x-4">
                    <span className="text-3xl">{benefit.icon}</span>
                    <div>
                      <h3 className="text-lg font-semibold text-text-heading mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-text-body">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            {...fadeIn}
            className="mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10"
          >
            <h3 className="text-lg font-semibold text-text-heading mb-4 text-center">
              What You'll Gain
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Effective communication skills",
                "Enhanced leadership abilities",
                "Improved critical thinking",
                "Greater self-confidence",
                "Strong debating capabilities",
                "Valuable networking opportunities"
              ].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-2"
                >
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-text-body">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default DiscoverSection;
