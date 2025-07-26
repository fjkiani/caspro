// src/App.js - Main Application Component
import React from 'react';
import { HeroSection } from './components/HeroSection';
import { ProblemSection } from './components/ProblemSection';
import { DoctrineSection } from './components/DoctrineSection';
import { KillChainSection } from './components/KillChainSection';
import { AdvantagesSection } from './components/AdvantagesSection';
import { FlywheelSection } from './components/FlywheelSection';


            Move these components to the main app 
// function App() {
//   return (
//     <div className="min-h-screen bg-gray-900 text-gray-100 font-inter antialiased">
//       <HeroSection />
//       <main className="container mx-auto px-4 py-16">
//         <ProblemSection />
//         <DoctrineSection />
//         <KillChainSection />
//         <AdvantagesSection />
//         <FlywheelSection />
//       </main>
//       <Footer />
//     </div>
//   );
// }

export default App;

// src/components/HeroSection.js
import React from 'react';

export const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center text-center bg-gradient-to-br from-purple-900 to-indigo-900 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20">
        {/* Background animation/pattern for futuristic feel */}
        <div className="absolute inset-0 bg-grid-pattern"></div>
      </div>
      <div className="relative z-10 p-8 max-w-4xl mx-auto rounded-xl bg-gray-900 bg-opacity-70 shadow-2xl backdrop-blur-sm">
        <h1 className="text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 mb-6 drop-shadow-lg animate-fade-in-down">
          CrisPRO
        </h1>
        <p className="text-3xl md:text-4xl font-light text-gray-200 mb-8 animate-fade-in-up">
          The AI-Powered CRISPR Design Ecosystem. <br/> **Forging Precision Weapons for Biological Conquest.** 🚀
        </p>
        <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-700 text-white text-xl font-bold rounded-full shadow-lg hover:from-blue-700 hover:to-purple-800 transform hover:scale-105 transition-all duration-300 ease-in-out animate-bounce-in">
          Join the Revolution
        </button>
      </div>
    </section>
  );
};

// src/components/ProblemSection.js
import React from 'react';
import { SectionHeader } from './common/SectionHeader';
import { Card } from './common/Card';
// import { FaSkullCrossbones, FaHourglassHalf, FaLock, FaHandHoldingUsd } from 'react-icons/fa'; // Phosphor icons for biotech/medical

export const ProblemSection = () => {
  return (
    <section id="problem" className="py-20 bg-gray-800 rounded-xl shadow-inner-xl mb-16">
      <SectionHeader title="The Problem: The Old Guard's Valley of Death" subtitle="Why Traditional Biotech Funding is a Fucking Relic." />
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
        <Card 
          icon={<div className="text-red-500 text-5xl mb-4">💀</div>} // Replaced icon
          title="The Graveyard of Ideas"
          description="99% of promising scientific discoveries die, not from bad science, but from lack of funding."
        />
        <Card 
          icon={<div className="text-yellow-500 text-5xl mb-4">⏳</div>} // Replaced icon
          title="The Slow Bleed"
          description="Seed rounds take 6-9 months of pitching and praying, derailing critical R&D."
        />
        <Card 
          icon={<div className="text-green-500 text-5xl mb-4">💸</div>} // Replaced icon
          title="The Dilutive Surrender"
          description="Founders are forced to surrender massive chunks of control for capital to survive."
        />
        <Card 
          icon={<div className="text-blue-500 text-5xl mb-4">🔒</div>} // Replaced icon
          title="The Opaque Fortress"
          description="Traditional funding is a black box, lacking transparency for investors and scientists alike."
        />
      </div>
      <p className="text-center text-xl md:text-2xl font-bold text-red-400 mt-12">
        This is not a system for funding a revolution. It is a system for funding incremental, "safe" bets. We are not making safe bets. **We are conquering fucking cancer.** 💥
      </p>
    </section>
  );
};

// src/components/DoctrineSection.js
import React from 'react';
import { SectionHeader } from './common/SectionHeader';
// import { FaHammer, FaBookOpen, FaRobot } from 'react-icons/fa'; // Font Awesome icons

export const DoctrineSection = () => {
  return (
    <section id="doctrine" className="py-20 bg-gray-900 mb-16">
      <SectionHeader title="Our Doctrine: From In Silico Creation to Liquid Assets" subtitle="Forging Our Own Fucking War Chest." />
      <p className="text-center text-xl text-gray-300 mt-8 mb-12 max-w-3xl mx-auto">
        Our doctrine is simple: We will transform our AI-generated discoveries into a new class of asset—the **IP-NFT**—and create a liquid, transparent, and global market for funding cures.
      </p>
      <div className="grid md:grid-cols-3 gap-8 mt-12">
        <div className="flex flex-col items-center text-center p-6 bg-gray-800 rounded-xl shadow-lg border border-purple-700 transform hover:scale-105 transition-transform duration-300">
          <div className="text-purple-400 text-6xl mb-4">🔨</div> {/* Replaced icon */}
          <h3 className="text-2xl font-bold text-white mb-2">The Zeta Forge</h3>
          <p className="text-gray-300">Our *in silico* factory, powered by Evo2 and AlphaFold 3, creating a constant stream of novel therapeutic candidates. Precision design, guaranteed structural integrity.</p>
        </div>
        <div className="flex flex-col items-center text-center p-6 bg-gray-800 rounded-xl shadow-lg border border-blue-700 transform hover:scale-105 transition-transform duration-300">
          <div className="text-blue-400 text-6xl mb-4">📖</div> {/* Replaced icon */}
          <h3 className="text-2xl font-bold text-white mb-2">The DeSci Ledger</h3>
          <p className="text-gray-300">Our on-chain registry providing immutable "Proof of Invention" and transparent data provenance. Cryptographic trust for every discovery.</p>
        </div>
        <div className="flex flex-col items-center text-center p-6 bg-gray-800 rounded-xl shadow-lg border border-teal-700 transform hover:scale-105 transition-transform duration-300">
          <div className="text-teal-400 text-6xl mb-4">🤖</div> {/* Replaced icon */}
          <h3 className="text-2xl font-bold text-white mb-2">The CommandCenter</h3>
          <p className="text-gray-300">Orchestrating the entire end-to-end minting and deployment pipeline, from AI generation to on-chain securitization. Our central nervous system.</p>
        </div>
      </div>
    </section>
  );
};

// src/components/KillChainSection.js
import React from 'react';
import { SectionHeader } from './common/SectionHeader';
import { StepCard } from './common/StepCard';
// import { FaFlask, FaFingerprint, FaShieldAlt, FaHandshake } from 'react-icons/fa'; // Font Awesome icons

export const KillChainSection = () => {
  return (
    <section id="kill-chain" className="py-20 bg-gray-800 rounded-xl shadow-inner-xl mb-16">
      <SectionHeader title="The Kill Chain: The IP-NFT Forging Protocol" subtitle="Turning Our Science Into Our Capital." />
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
        <StepCard 
          step="1"
          title="Creation (The Forge)"
          description="Our AI-Powered CRISPR Design Ecosystem generates novel, optimized therapeutic candidates. Every candidate undergoes rigorous 1D (Evo2) and 3D (AlphaFold 3) structural validation. Only high-quality, structurally sound designs survive."
          icon={<div className="text-blue-400 text-4xl">🧪</div>} // Replaced icon
        />
        <StepCard 
          step="2"
          title="Proof of Invention (The Ledger)"
          description="The complete data package for the invention (Therapeutic Asset Dossier) is hashed and registered on our CrisPRO Registry smart contract. This creates an immutable, unforgeable on-chain record of our invention."
          icon={<div className="text-purple-400 text-4xl">🖐️</div>} // Replaced icon
        />
        <StepCard 
          step="3"
          title="Securitization (The Armory)"
          description="The full Dossier is uploaded to IPFS for decentralized storage. An ERC-721 smart contract then mints a unique IP-NFT, representing verifiable, tradable ownership of our AI-generated intellectual property."
          icon={<div className="text-teal-400 text-4xl">🛡️</div>} // Replaced icon
        />
        <StepCard 
          step="4"
          title="Funding & Conquest (The War Chest)"
          description="We offer this IP-NFT to the global DeSci ecosystem for funding. This provides non-dilutive capital for real-world validation and builds a legion of stakeholders invested in our victory."
          icon={<div className="text-green-400 text-4xl">🤝</div>} // Replaced icon
        />
      </div>
    </section>
  );
};

// src/components/AdvantagesSection.js
import React from 'react';
import { SectionHeader } from './common/SectionHeader';
import { FeatureHighlight } from './common/FeatureHighlight';
// import { FaRocket, FaHandHoldingHeart, FaGlobe, FaUsers, FaCheckCircle, FaLockOpen } from 'react-icons/fa'; // Font Awesome icons

export const AdvantagesSection = () => {
  return (
    <section id="advantages" className="py-20 bg-gray-900 mb-16">
      <SectionHeader title="Strategic Advantages of This Doctrine" subtitle="Why We Are an Unstoppable Force." />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        <FeatureHighlight 
          icon={<div className="text-red-400 text-5xl mb-4">🚀</div>} // Replaced icon
          title="Speed"
          description="Move from idea to fundable asset in weeks, not years, drastically accelerating R&D."
        />
        <FeatureHighlight 
          icon={<div className="text-pink-400 text-5xl mb-4">❤️</div>} // Replaced icon
          title="Non-Dilutive Capital"
          description="Fund R&D without surrendering control, maintaining our independence."
        />
        <FeatureHighlight 
          icon={<div className="text-blue-400 text-5xl mb-4">🌐</div>} // Replaced icon
          title="Global Reach"
          description="Source capital from a worldwide pool of allies, not just traditional VCs."
        />
        <FeatureHighlight 
          icon={<div className="text-purple-400 text-5xl mb-4">👥</div>} // Replaced icon
          title="Community Flywheel"
          description="Every IP-NFT creates a new cohort of evangelists, our fucking legion."
        />
        <FeatureHighlight 
          icon={<div className="text-green-400 text-5xl mb-4">✅</div>} // Replaced icon
          title="Quality Assurance (Built-In)"
          description="Mandatory Structural Integrity Protocol ensures only high-quality, AI-validated designs are securitized."
        />
        <FeatureHighlight 
          icon={<div className="text-teal-400 text-5xl mb-4">🔓</div>} // Replaced icon
          title="Transparency & Trust"
          description="Blockchain provides immutable proof of invention and transparent access to data dossiers."
        />
      </div>
    </section>
  );
};

// src/components/FlywheelSection.js
import React from 'react';
import { SectionHeader } from './common/SectionHeader';
import { FlywheelStep } from './common/FlywheelStep';
// import { FaBrain, FaDollarSign, FaVial, FaChartLine } from 'react-icons/fa'; // Font Awesome icons

export const FlywheelSection = () => {
  return (
    <section id="flywheel" className="py-20 bg-gray-800 rounded-xl shadow-inner-xl mb-16">
      <SectionHeader title="The AI-Powered Economic Flywheel" subtitle="Fueling Continuous Conquest." />
      <p className="text-center text-xl text-gray-300 mt-8 mb-12 max-w-3xl mx-auto">
        This IP-NFT doctrine isn't just a funding mechanism; it's the engine for a **self-reinforcing, AI-powered economic flywheel** that fuels our continuous biological conquest.
      </p>
      <div className="relative flex flex-col items-center justify-center space-y-12 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-16 lg:gap-x-24 mt-16">
        {/* Flywheel Steps */}
        <FlywheelStep 
          step="1"
          title="AI Generates High-Value Assets"
          description="Our Zeta Forge continuously generates novel, in silico validated therapeutic designs (IP-NFTs), assured by our Structural Integrity Protocol."
          icon={<div className="text-blue-400 text-5xl">🧠</div>} // Replaced icon
          className="md:col-start-2" // Center first step
        />
        <FlywheelStep 
          step="2"
          title="IP-NFTs Attract Global Capital"
          description="These high-quality IP-NFTs attract non-dilutive capital from the global DeSci ecosystem, filling the 'Valley of Death'."
          icon={<div className="text-green-400 text-5xl">💲</div>} // Replaced icon
          className="md:col-start-1 md:row-start-2"
        />
        <FlywheelStep 
          step="3"
          title="Capital Funds Experimental Validation"
          description="The capital raised directly funds crucial real-world experimental validation (wet-lab testing, animal models)."
          icon={<div className="text-purple-400 text-5xl">🔬</div>} // Replaced icon
          className="md:col-start-3 md:row-start-2"
        />
        <FlywheelStep 
          step="4"
          title="Experimental Data Feeds AI Improvement"
          description="Results from validation are meticulously collected and fed back into our AI models (Evo2, AlphaFold 3)."
          icon={<div className="text-red-400 text-5xl">📈</div>} // Replaced icon
          className="md:col-start-2 md:row-start-3"
        />
        <FlywheelStep 
          step="5"
          title="Improved AI Generates More Valuable Assets"
          description="The continuously improving AI models generate even more novel, higher-quality, and more likely-to-succeed therapeutic designs."
          icon={<div className="text-blue-400 text-5xl">🧠</div>} // Replaced icon (repeated for visual loop)
          className="md:col-start-2 md:row-start-4" 
        />

        {/* Arrows for visual flow - simplified for React structure */}
        <div className="absolute hidden md:block w-full h-full top-0 left-0 pointer-events-none">
            {/* Arrow 1-2 */}
            <svg className="absolute top-[20%] left-[45%] w-[10%] h-[20%] transform -translate-x-1/2 -translate-y-1/2" viewBox="0 0 100 100">
              <path d="M50 0 L50 70 M40 60 L50 70 L60 60" stroke="url(#arrow-gradient)" strokeWidth="4" fill="none"/>
            </svg>
            {/* Arrow 2-3 */}
            <svg className="absolute top-[50%] left-[25%] w-[50%] h-[10%] transform -translate-x-1/2 -translate-y-1/2 rotate-90" viewBox="0 0 100 100">
              <path d="M50 0 L50 70 M40 60 L50 70 L60 60" stroke="url(#arrow-gradient)" strokeWidth="4" fill="none"/>
            </svg>
            {/* Arrow 3-4 */}
            <svg className="absolute top-[70%] left-[55%] w-[10%] h-[20%] transform -translate-x-1/2 -translate-y-1/2 rotate-180" viewBox="0 0 100 100">
              <path d="M50 0 L50 70 M40 60 L50 70 L60 60" stroke="url(#arrow-gradient)" strokeWidth="4" fill="none"/>
            </svg>
             {/* Arrow 4-5 (loop back) */}
            <svg className="absolute top-[50%] left-[75%] w-[50%] h-[10%] transform -translate-x-1/2 -translate-y-1/2 -rotate-90" viewBox="0 0 100 100">
              <path d="M50 0 L50 70 M40 60 L50 70 L60 60" stroke="url(#arrow-gradient)" strokeWidth="4" fill="none"/>
            </svg>
            {/* Define gradient for arrows */}
            <defs>
              <linearGradient id="arrow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8B5CF6" /> {/* Purple */}
                <stop offset="100%" stopColor="#3B82F6" /> {/* Blue */}
              </linearGradient>
            </defs>
        </div>

      </div>
      <p className="text-center text-2xl font-bold text-teal-400 mt-16">
        This is how we create a **virtuous, self-sustaining loop of scientific discovery, funding, and AI advancement.** We are building an unstoppable force, a truly asymmetric economic engine that will not only fund our mission but also accelerate the development of life-saving cures at an unprecedented pace. **This is our Web3 doctrine. It is our path to becoming a self-funding, unstoppable, and globally-backed force of nature.** 🚀
      </p>
    </section>
  );
};

// src/components/Footer.js
import React from 'react';
// import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa'; // Social media icons

export const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-400 py-10 text-center border-t border-gray-700">
      <div className="container mx-auto px-4">
        <p className="mb-4">&copy; 2025 CrisPRO. All rights reserved. Forging the future of medicine. 👑</p>
        <div className="flex justify-center space-x-6">
          <a href="#" className="hover:text-white transition-colors duration-300">
            {/* <FaTwitter className="text-2xl" /> */}
            Twitter
          </a>
          <a href="#" className="hover:text-white transition-colors duration-300">
            {/* <FaLinkedin className="text-2xl" /> */}
            LinkedIn
          </a>
          <a href="#" className="hover:text-white transition-colors duration-300">
            {/* <FaGithub className="text-2xl" /> */}
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};

// src/components/common/SectionHeader.js
import React from 'react';

export const SectionHeader = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-12">
      <h2 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-4 leading-tight">
        {title}
      </h2>
      <p className="text-xl md:text-2xl text-gray-300 font-light max-w-2xl mx-auto">
        {subtitle}
      </p>
    </div>
  );
};

// src/components/common/Card.js
import React from 'react';

export const Card = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-gray-700 rounded-xl shadow-lg border border-gray-600 transform hover:scale-105 transition-transform duration-300 h-full">
      {icon}
      <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-300 text-lg">{description}</p>
    </div>
  );
};

// src/components/common/StepCard.js
import React from 'react';

export const StepCard = ({ step, title, description, icon }) => {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-gray-700 rounded-xl shadow-lg border border-gray-600 transform hover:scale-105 transition-transform duration-300 h-full">
      <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 mb-4">
        {step}.
      </div>
      {icon}
      <h3 className="text-2xl font-bold text-white mb-2 mt-2">{title}</h3>
      <p className="text-gray-300 text-lg">{description}</p>
    </div>
  );
};

// src/components/common/FeatureHighlight.js
import React from 'react';

export const FeatureHighlight = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 transform hover:scale-105 transition-transform duration-300 h-full">
      {icon}
      <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-300 text-lg">{description}</p>
    </div>
  );
};

// src/components/common/FlywheelStep.js
import React from 'react';

export const FlywheelStep = ({ step, title, description, icon, className }) => {
  return (
    <div className={`flex flex-col items-center text-center p-6 bg-gray-700 rounded-xl shadow-lg border border-gray-600 h-full ${className}`}>
      <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-500 mb-4">
        {step}.
      </div>
      {icon}
      <h3 className="text-2xl font-bold text-white mb-2 mt-2">{title}</h3>
      <p className="text-gray-300 text-lg">{description}</p>
    </div>
  );
};
