'use client';

import Link from 'next/link';
import { FiLinkedin, FiTwitter, FiMail, FiNavigation } from 'react-icons/fi';
import React from 'react';
import { NAV_CATEGORIES, ROUTES } from '@/constants/routes';
import { NAV_LINKS } from './Navbar';

// Constants for Footer configuration
const FOOTER_CONFIG = {
  brandEmoji: "🧬",
  brandName: "CrisPRO",
  brandSubtitle: "Oncology Co-Pilot",
  tagline: "Pioneering the future of precision oncology with AI-driven genomic insights and intelligent therapy design.",
  companyName: "CrisPRO HealthTech AI", // Slightly more formal for copyright
  // Dynamically map icons to their components
  socialLinks: NAV_CATEGORIES.SOCIAL_LINKS.map(link => {
    const iconMap: Record<string, React.ReactNode> = {
      'FiLinkedin': React.createElement(FiLinkedin),
      'FiTwitter': React.createElement(FiTwitter),
      'FiMail': React.createElement(FiMail)
    };
    return {
      ...link,
      icon: iconMap[link.icon] || React.createElement(FiMail)
    };
  }),
  quickLinks: NAV_LINKS,
  legalLinks: NAV_CATEGORIES.LEGAL_LINKS,
  companyLinks: NAV_CATEGORIES.COMPANY_LINKS
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info & Branding */}
          <div className="md:col-span-2 lg:col-span-1">
            <Link href={ROUTES.HOME} className="flex items-center space-x-2 mb-4 group">
              <span className="text-4xl text-primary group-hover:scale-105 transition-transform duration-200">{FOOTER_CONFIG.brandEmoji}</span>
              <div>
                <div className="font-bold text-2xl text-white">
                  {FOOTER_CONFIG.brandName}
                </div>
                <div className="text-sm text-primary font-medium">
                  {FOOTER_CONFIG.brandSubtitle}
                </div>
              </div>
            </Link>
            <p className="mb-6 text-sm leading-relaxed">
              {FOOTER_CONFIG.tagline}
            </p>
            <div className="flex space-x-4 text-xl">
              {/* {FOOTER_CONFIG.socialLinks.map(link => (
                <a key={link.label} href={link.href} className="text-slate-400 hover:text-primary transition-colors" aria-label={link.label}>
                  {link.icon}
                </a>
              ))} */}
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-lg font-semibold mb-5 text-white">Explore</h4>
            <ul className="space-y-3">
              {FOOTER_CONFIG.quickLinks.map(link => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-primary transition-colors text-sm">
                    {link.label}
                  </Link>
                  {link.subLinks && (
                    <ul className="mt-2 space-y-1">
                      {link.subLinks.map(subLink => (
                        <li key={subLink.label}>
                          <Link href={subLink.href} className="hover:text-primary transition-colors text-xs text-slate-400">
                            {subLink.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-5 text-white">Company</h4>
            <ul className="space-y-3">
              {[...FOOTER_CONFIG.companyLinks, ...FOOTER_CONFIG.legalLinks].map(link => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-primary transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="text-right">
             <h4 className="text-lg font-semibold mb-5 text-white">Get In Touch</h4>
             <p className="text-sm mb-4">
                Have questions or need support?
             </p>
             <a href="mailto:jedi@jedilabs.org" className="btn-outline text-sm py-2 px-4 inline-flex items-center gap-2 hover:bg-primary hover:text-white transition-all">
                <FiMail /> Email Support
             </a>
             <p className="text-xs mt-4 text-slate-400">
                For demo requests, please visit our Contact page.
             </p>
          </div>

        </div>

        <hr className="border-slate-700 my-8" />

        <div className="text-center text-slate-400 text-sm">
          <p>
            &copy; {currentYear} {FOOTER_CONFIG.companyName}. All rights reserved. 
            Built by <a href="https://jedilabs.org/" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-primary transition-colors">Jedi Labs (100x Engine)</a>.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 