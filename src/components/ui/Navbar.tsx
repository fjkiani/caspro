'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiMenu, FiX } from 'react-icons/fi';
import { motion } from 'framer-motion';

// Constants for Navbar configuration
const NAV_CONFIG = {
  brandEmoji: "🧬", // DNA emoji as a placeholder logo element
  brandName: "CasPro",
  brandSubtitle: "Oncology Co-Pilot",
  navLinks: [
    { href: "#features", label: "Features" },
    { href: "#science", label: "Technology" },
    { href: "#team", label: "Team" },
  ],
  ctaLink: "#contact",
  ctaText: "Request Demo"
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white py-3 shadow-md sticky top-0 z-50 border-b border-slate-200">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2 group">
          <span className="text-3xl group-hover:scale-110 transition-transform duration-200">{NAV_CONFIG.brandEmoji}</span>
          <div>
            <div className="font-bold text-xl text-primary">
              {NAV_CONFIG.brandName}
            </div>
            <div className="text-xs text-slate-500 font-medium">
              {NAV_CONFIG.brandSubtitle}
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {NAV_CONFIG.navLinks.map(link => (
            <Link key={link.label} href={link.href} className="font-medium text-slate-700 hover:text-primary transition-colors">
              {link.label}
            </Link>
          ))}
          <Link href={NAV_CONFIG.ctaLink} className="btn-primary text-sm px-5 py-2.5">
            {NAV_CONFIG.ctaText}
          </Link>
        </div>

        {/* Mobile Navigation Button */}
        <button onClick={toggleMenu} className="md:hidden text-2xl text-slate-700 hover:text-primary">
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu - Improved Animation and Styling */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="md:hidden py-4 bg-white shadow-lg absolute top-full left-0 right-0 z-40 border-t border-slate-200"
        >
          <div className="container mx-auto flex flex-col space-y-3 px-4">
            {NAV_CONFIG.navLinks.map(link => (
              <Link key={link.label} href={link.href} className="font-medium text-slate-700 hover:text-primary py-2 transition-colors" onClick={toggleMenu}>
                {link.label}
              </Link>
            ))}
            <Link href={NAV_CONFIG.ctaLink} className="btn-primary text-center w-full mt-2 py-2.5" onClick={toggleMenu}>
              {NAV_CONFIG.ctaText}
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar; 