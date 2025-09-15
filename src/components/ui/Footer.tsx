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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-12">
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
              {FOOTER_CONFIG.socialLinks.map(link => (
                <a 
                  key={link.label} 
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-primary transition-colors" 
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Core Co-Pilots */}
          <div>
            <h4 className="text-lg font-semibold mb-5 text-white">Core Co-Pilots</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/platform/chemo" className="hover:text-primary transition-colors text-sm">
                  Chemo Co-Pilot
                </Link>
                <p className="text-xs text-slate-400 mt-1">In-silico chemotherapy guidance</p>
              </li>
              <li>
                <Link href="/platform/clinical-trials" className="hover:text-primary transition-colors text-sm">
                  Clinical Trials Co-Pilot
                </Link>
                <p className="text-xs text-slate-400 mt-1">Trial matching & eligibility</p>
              </li>
              <li>
                <Link href="/platform/crispr-intelligence" className="hover:text-primary transition-colors text-sm">
                  CRISPR Intelligence
                </Link>
                <p className="text-xs text-slate-400 mt-1">Genome editing guidance</p>
              </li>
              <li>
                <Link href="/platform/therapy-fit" className="hover:text-primary transition-colors text-sm">
                  Therapy Fit Co-Pilot
                </Link>
                <p className="text-xs text-slate-400 mt-1">Treatment optimization</p>
              </li>
            </ul>
          </div>

          {/* Evidence Intelligence */}
          <div>
            <h4 className="text-lg font-semibold mb-5 text-white">Evidence Intelligence</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/evidence/spe-fusion" className="hover:text-primary transition-colors text-sm">
                  S/P/E Fusion
                </Link>
                <p className="text-xs text-slate-400 mt-1">Sequence, Pathway, Evidence</p>
              </li>
              <li>
                <Link href="/evidence/sae-intelligence" className="hover:text-primary transition-colors text-sm">
                  SAE Intelligence
                </Link>
                <p className="text-xs text-slate-400 mt-1">Serious adverse events</p>
              </li>
              <li>
                <Link href="/evidence/data-lab" className="hover:text-primary transition-colors text-sm">
                  Data Lab
                </Link>
                <p className="text-xs text-slate-400 mt-1">Research data management</p>
              </li>
              <li>
                <Link href="/cohort" className="hover:text-primary transition-colors text-sm">
                  Cohort Context
                </Link>
                <p className="text-xs text-slate-400 mt-1">Population insights</p>
              </li>
            </ul>
          </div>

          {/* Research Tools */}
          <div>
            <h4 className="text-lg font-semibold mb-5 text-white">Research Tools</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/metrics" className="hover:text-primary transition-colors text-sm">
                  Performance Metrics
                </Link>
                <p className="text-xs text-slate-400 mt-1">BRCA, SNV, VUS, Generative AI</p>
              </li>
              <li>
                <Link href="/use-cases" className="hover:text-primary transition-colors text-sm">
                  Use Cases
                </Link>
                <p className="text-xs text-slate-400 mt-1">Multiple myeloma & more</p>
              </li>
              <li>
                <Link href="/platform/pathway" className="hover:text-primary transition-colors text-sm">
                  Pathway Analysis
                </Link>
                <p className="text-xs text-slate-400 mt-1">Biological pathway insights</p>
              </li>
              <li>
                <Link href="/platform/toxicity-risk" className="hover:text-primary transition-colors text-sm">
                  Toxicity Risk
                </Link>
                <p className="text-xs text-slate-400 mt-1">Safety assessment tools</p>
              </li>
            </ul>
          </div>

          {/* Company */}
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

        {/* Compliance & Disclaimer Stickers */}
        <div className="flex flex-col items-center gap-3 mt-6">
          {/* HIPAA Compliance Sticker */}
          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-600/30 rounded-lg px-4 py-2 flex items-center gap-2 text-xs text-slate-300">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>HIPAA Compliant</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">Powered by Supabase</span>
          </div>
          
          {/* Research Use Disclaimer */}
          <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-500/40 rounded-lg px-4 py-2 flex items-center gap-2 text-xs text-slate-200">
            <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
            <span className="font-medium">⚠️ Research Use Only</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-300">Not intended for clinical decision-making</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-300">Consult healthcare professionals</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 