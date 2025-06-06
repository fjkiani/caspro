'use client';

import { motion } from 'framer-motion';
import { FiLinkedin, FiMail, FiGlobe, FiGithub } from 'react-icons/fi';
import React from 'react';
import DoubleDnaHelix from '@/components/ui/DoubleDnaHelix';
import DnaBasePairStrip from '@/components/ui/DnaBasePairStrip';

// Constants for Team Section configuration
const TEAM_CONFIG = {
  sectionId: "team",
  title: "Meet Our Core Team",
  subtitle: "CrisPRO is spearheaded by a dedicated duo, combining deep AI expertise with critical clinical insight to redefine oncology solutions.",
  teamMembers: [
    {
      name: 'Fahad Kiani',
      role: 'Co-founder & Chief Technical Executive Officer',
      bio: 'Expert in AI systems and software development, leveraging cutting-edge AI coding tools for rapid innovation and robust platform architecture.',
      image: '/images/placeholder-fahad.jpg', // Image data remains but won't be used
      socials: { linkedin: 'https://www.linkedin.com/in/fjkiani', web: 'https://jedilabs.org/', email: 'mailto:fahad@jedilabs.org' }
    },
    {
      name: 'Dr.Rahima Nayeem ',
      role: 'Co-founder & Chief Clinical Officer',
      bio: 'Medical doctor bringing essential firsthand clinical experience, a deep understanding of patient needs, and invaluable domain expertise in oncology.',
      image: '/images/placeholder-rahima.jpg', // Image data remains but won't be used
      socials: { web: 'https://www.northwell.edu/find-care/find-a-doctor/dr-rahima-nayeem-md-11511786', email: 'mailto:nayeem.rahima@gmail.com' }
    },
    {
      name: 'Rasheed Shata ',
      role: 'Founding Scientist',
      bio: 'Doctor of Pharmacy, PharmD candidate at Rutgers University, with a passion for leveraging AI to advance healthcare.',
      image: '/images/placeholder-rahima.jpg', // Image data remains but won't be used
      socials: { linkedin: 'https://www.linkedin.com/in/rasheed-shata/', }
    },
    {
      name: 'Your Name Here',
      role: 'The Future of CrisPRO',
      bio: 'Scientist, Engineer, or Doctor interested in joining the CrisPRO team? We\'d love to hear from you!',
      image: '/images/placeholder-rahima.jpg', // Image data remains but won't be used
      socials: { email: 'mailto:jedi@jedilabs.org' , }
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
    <section id={TEAM_CONFIG.sectionId} className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-b from-orange-50 via-red-50 to-pink-50">
      {/* DNA Background Elements */}
      <div className="absolute left-6 top-16 w-20 h-3/5 opacity-25 pointer-events-none" style={{ perspective: '800px', transformStyle: 'preserve-3d' }}>
        <DoubleDnaHelix 
          className="w-full h-full" 
          baseCount={10}
          rotationSpeed={35}
          colors={{
            adenine: '#f97316',
            thymine: '#dc2626', 
            guanine: '#ea580c',
            cytosine: '#e11d48',
            backbone1: '#f97316',
            backbone2: '#dc2626'
          }}
        />
      </div>
      <div className="absolute right-6 top-24 w-16 h-2/3 opacity-20 pointer-events-none" style={{ perspective: '800px', transformStyle: 'preserve-3d' }}>
        <DoubleDnaHelix 
          className="w-full h-full" 
          baseCount={8}
          rotationSpeed={28}
          colors={{
            adenine: '#dc2626',
            thymine: '#f97316',
            guanine: '#e11d48', 
            cytosine: '#ea580c',
            backbone1: '#dc2626',
            backbone2: '#f97316'
          }}
        />
      </div>
      
      {/* DNA base pairs decorative element */}
      <DnaBasePairStrip className="absolute top-0 left-0 right-0" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={TEAM_CONFIG.animationVariants.initial}
          whileInView={TEAM_CONFIG.animationVariants.animate}
          viewport={{ once: true }}
          transition={TEAM_CONFIG.animationVariants.transition()}
          className="max-w-3xl mx-auto text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-red-700 to-pink-700">
              {TEAM_CONFIG.title}
            </span>
          </h2>
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
              className="relative bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col h-full p-6 border border-orange-200/50 hover:border-red-300/50"
            >
              {/* DNA-themed glowing border */}
              <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 opacity-60"></div>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-400 via-red-400 to-orange-400 opacity-60"></div>
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-400 via-red-400 to-pink-400 opacity-60"></div>
                <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-pink-400 via-red-400 to-orange-400 opacity-60"></div>
              </div>
              
              <div className="flex flex-col flex-grow relative z-10">
                <h3 className="text-xl font-bold mb-1">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-700">
                    {member.name}
                  </span>
                </h3>
                <p className="text-red-600 font-semibold mb-3 text-sm">{member.role}</p>
                <p className="text-slate-600 text-sm mb-4 flex-grow">{member.bio}</p>
                <div className="flex space-x-3 text-lg mt-auto pt-4 border-t border-red-200/50">
                  {member.socials.linkedin && 
                    <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-red-500 transition-colors" aria-label={`${member.name} LinkedIn`}>
                      <FiLinkedin />
                    </a>
                  }
                  {/* {member.socials.github && 
                    <a href={member.socials.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-red-500 transition-colors" aria-label={`${member.name} Github`}>
                      <FiGithub />
                    </a>
                  } */}
                  {member.socials.web && 
                    <a href={member.socials.web} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-red-500 transition-colors" aria-label={`${member.name} Website`}>
                      <FiGlobe />
                    </a>
                  }
                  {member.socials.email &&
                    <a href={member.socials.email} className="text-slate-400 hover:text-red-500 transition-colors" aria-label={`Email ${member.name}`}>
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