import Link from 'next/link';
import { FiLinkedin, FiTwitter, FiMail, FiNavigation } from 'react-icons/fi';
import React from 'react';
import { NAV_CATEGORIES, ROUTES } from '@/constants/routes';

// Constants for Footer configuration
const FOOTER_CONFIG = {
  brandEmoji: "🧬",
  brandName: "CasPro",
  brandSubtitle: "Oncology Co-Pilot",
  tagline: "Pioneering the future of precision oncology with AI-driven genomic insights and intelligent therapy design.",
  companyName: "CasPro HealthTech AI", // Slightly more formal for copyright
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
  quickLinks: NAV_CATEGORIES.QUICK_LINKS,
  legalLinks: NAV_CATEGORIES.LEGAL_LINKS,
  companyLinks: NAV_CATEGORIES.COMPANY_LINKS
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Company Info & Branding */}
          <div className="md:col-span-5 lg:col-span-4">
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
              {FOOTER_CONFIG.socialLinks.map(link => (
                <a key={link.label} href={link.href} className="text-slate-400 hover:text-primary transition-colors" aria-label={link.label}>
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden lg:block md:col-span-1"></div>

          {/* Quick Links */}
          <div className="md:col-span-3 lg:col-span-2">
            <h4 className="text-lg font-semibold mb-5 text-white">Explore</h4>
            <ul className="space-y-3">
              {FOOTER_CONFIG.quickLinks.map(link => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-primary transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Resources */}
          <div className="md:col-span-3 lg:col-span-2">
            <h4 className="text-lg font-semibold mb-5 text-white">Company</h4>
            <ul className="space-y-3">
              {FOOTER_CONFIG.legalLinks.map(link => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-primary transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
              {FOOTER_CONFIG.companyLinks.map(link => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-primary transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info - Optional direct contact, if not covered by form */}
          <div className="md:col-span-4 lg:col-span-3 mt-8 md:mt-0">
             <h4 className="text-lg font-semibold mb-5 text-white">Get In Touch</h4>
             <p className="text-sm mb-2">
                Have questions or need support?
             </p>
             <a href="mailto:support@caspro.dev" className="btn-outline text-sm py-2 px-4 inline-flex items-center gap-2">
                <FiMail /> Email Support
             </a>
             <p className="text-xs mt-4 text-slate-400">
                For demo requests, please use the form in our Contact section.
             </p>
          </div>

        </div>

        <hr className="border-slate-700 my-8" />

        <div className="text-center text-slate-400 text-sm">
          <p>&copy; {currentYear} {FOOTER_CONFIG.companyName}. All rights reserved. Built with AI and passion.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 