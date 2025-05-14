'use client';

import { motion } from 'framer-motion';
import { FiLinkedin, FiMail, FiGlobe, FiGithub } from 'react-icons/fi';
import React from 'react';

// Constants for Team Section configuration
const TEAM_CONFIG = {
  sectionId: "team",
  title: "Meet Our Core Team",
  subtitle: "CasPro is spearheaded by a dedicated duo, combining deep AI expertise with critical clinical insight to redefine oncology solutions.",
  teamMembers: [
    {
      name: 'Fahad Kiani',
      role: 'Co-founder & Chief Technology Officer',
      bio: 'Expert in AI systems and software development, leveraging cutting-edge AI coding tools for rapid innovation and robust platform architecture.',
      image: '/images/placeholder-fahad.jpg', // Image data remains but won't be used
      socials: { linkedin: '#', web: '#', github: '#', email: 'mailto:fahad@caspro.dev' }
    },
    {
      name: 'Rahima ',
      role: 'Co-founder & Chief Clinical Officer',
      bio: 'Medical doctor bringing essential firsthand clinical experience, a deep understanding of patient needs, and invaluable domain expertise in oncology.',
      image: '/images/placeholder-rahima.jpg', // Image data remains but won't be used
      socials: { web: '#', linkedin: '#', email: 'mailto:rahima@caspro.dev' }
    }
  ],
  animationVariants: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: (delay: number = 0) => ({ duration: 0.5, delay })
  }
};

const TeamSection = () => {
  return (
    <section id={TEAM_CONFIG.sectionId} className="section bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={TEAM_CONFIG.animationVariants.initial}
          whileInView={TEAM_CONFIG.animationVariants.animate}
          viewport={{ once: true }}
          transition={TEAM_CONFIG.animationVariants.transition()}
          className="max-w-3xl mx-auto text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">{TEAM_CONFIG.title}</h2>
          <p className="text-lg text-slate-600">
            {TEAM_CONFIG.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 justify-center max-w-4xl mx-auto">
          {TEAM_CONFIG.teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={TEAM_CONFIG.animationVariants.initial}
              whileInView={TEAM_CONFIG.animationVariants.animate}
              viewport={{ once: true }}
              transition={TEAM_CONFIG.animationVariants.transition(index * 0.1 + 0.2)}
              className="bg-slate-50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full p-6 border border-slate-200"
            >
              <div className="flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-1 text-slate-900">{member.name}</h3>
                <p className="text-primary font-semibold mb-3 text-sm">{member.role}</p>
                <p className="text-slate-600 text-sm mb-4 flex-grow">{member.bio}</p>
                <div className="flex space-x-3 text-lg mt-auto pt-4 border-t border-slate-200">
                  {member.socials.linkedin && 
                    <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary transition-colors" aria-label={`${member.name} LinkedIn`}>
                      <FiLinkedin />
                    </a>
                  }
                  {member.socials.github && 
                    <a href={member.socials.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary transition-colors" aria-label={`${member.name} Github`}>
                      <FiGithub />
                    </a>
                  }
                  {member.socials.web && 
                    <a href={member.socials.web} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary transition-colors" aria-label={`${member.name} Website`}>
                      <FiGlobe />
                    </a>
                  }
                  {member.socials.email &&
                    <a href={member.socials.email} className="text-slate-400 hover:text-primary transition-colors" aria-label={`Email ${member.name}`}>
                      <FiMail />
                    </a>
                  }
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection; 