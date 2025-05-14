'use client';

import { motion } from 'framer-motion';
import { FiLinkedin, FiMail, FiAward, FiUsers, FiCode, FiDatabase, FiGitMerge, FiGlobe, FiGithub } from 'react-icons/fi';
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
  foundationalTech: [
    {
      name: 'AlphaFold 3',
      origin: 'DeepMind by Google',
      description: 'Unparalleled predictive power in structural biology',
      icon: FiCode,
      link: 'https://alphafoldserver.com/welcome'
    },
    {
      name: 'Evo2',
      origin: 'Arc Institute',
      description: 'Deep DNA understanding and powerful generative capabilities',
      icon: FiDatabase,
      link: 'https://arcinstitute.org/tools/evo'
    },
    {
      name: 'CRISPR',
      origin: 'Research Leaders',
      description: 'Foundational principles enabling precise genomic modifications',
      icon: FiGitMerge,
      link: 'https://crisprtx.com/'
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
    <section id={TEAM_CONFIG.sectionId} className="section bg-white">
      <div className="container">
        <motion.div
          initial={TEAM_CONFIG.animationVariants.initial}
          whileInView={TEAM_CONFIG.animationVariants.animate}
          viewport={{ once: true }}
          transition={TEAM_CONFIG.animationVariants.transition()}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="heading-2 mb-6">{TEAM_CONFIG.title}</h2>
          <p className="subheading">
            {TEAM_CONFIG.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 justify-center max-w-4xl mx-auto">
          {TEAM_CONFIG.teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={TEAM_CONFIG.animationVariants.initial}
              whileInView={TEAM_CONFIG.animationVariants.animate}
              viewport={{ once: true }}
              transition={TEAM_CONFIG.animationVariants.transition(index * 0.1)}
              className="bg-slate-50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full p-6"
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

        <motion.div
          initial={TEAM_CONFIG.animationVariants.initial}
          whileInView={TEAM_CONFIG.animationVariants.animate}
          viewport={{ once: true }}
          transition={TEAM_CONFIG.animationVariants.transition(0.4)}
          className="mt-20 bg-slate-100 rounded-xl overflow-hidden"
        >
          {/* Core Philosophy Section */}
          <div className="p-8 md:p-12 text-center border-b border-slate-200">
            <div className="flex justify-center text-4xl text-primary mb-5">
              <FiUsers />
            </div>
            <h3 className="heading-3 mb-4 text-slate-800">Our Foundation & Collaborative Spirit</h3>
            <p className="text-lg max-w-3xl mx-auto text-slate-700">
              The true power of CasPro stems from the unique synergy of our team's deep technical AI knowledge 
              and critical firsthand clinical insight. This combination is the engine driving our innovative solutions.
            </p>
          </div>

          {/* Foundation Statement */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 md:p-12 text-center">
            <p className="text-xl font-light max-w-3xl mx-auto">
              Our Oncology Co-Pilot is proudly built upon the groundbreaking work and open-source contributions 
              from world-leading institutions and researchers in biological AI and gene editing.
            </p>
          </div>

          {/* Technologies Grid */}
          <div className="p-8 md:p-12 bg-white">
            <h4 className="text-xl font-semibold text-center mb-8 text-slate-800">
              Key Foundational Technologies
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {TEAM_CONFIG.foundationalTech.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={TEAM_CONFIG.animationVariants.initial}
                  whileInView={TEAM_CONFIG.animationVariants.animate}
                  viewport={{ once: true }}
                  transition={TEAM_CONFIG.animationVariants.transition(index * 0.1)}
                  className="bg-slate-50 p-6 rounded-lg border border-slate-200 hover:shadow-lg transition-shadow"
                >
                  <a 
                    href={tech.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:opacity-80 transition-opacity"
                  >
                    <div className="flex items-center mb-4">
                      <tech.icon className="text-2xl text-primary mr-3" />
                      <div>
                        <h5 className="font-bold text-slate-900">{tech.name}</h5>
                        <p className="text-sm text-primary">by {tech.origin}</p>
                      </div>
                    </div>
                    <p className="text-slate-600">{tech.description}</p>
                  </a>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Closing Statement */}
          <div className="bg-slate-50 p-8 md:p-12 text-center border-t border-slate-200">
            <p className="text-lg text-slate-700 max-w-3xl mx-auto">
              By ethically and responsibly integrating these powerful open-source tools, 
              CasPro is dedicated to accelerating discovery and personalizing design in 
              the future of precision oncology.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection; 