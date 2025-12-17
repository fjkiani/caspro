'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Rocket, BookOpen, PenTool, Briefcase, Mail, Users, GitCompare, Heart, Zap } from 'lucide-react';
import ToggleButton from './ToggleButton';

const NAV_CONFIG = {
  brandEmoji: "🧬",
  brandName: "CrisPRO",
  brandSubtitle: "AI-Powered Precision Oncology",
};

// --- SUB-LINK DEFINITIONS ---
const industrySubLinks = [
  { href: '/industry/healthcare', label: 'Healthcare & Clinical Oncology' },
  { href: '/industry/biotech', label: 'Biotech & Pharma R&D' },
  { href: '/industry/research', label: 'Research Institutions' },
  { href: '/industry/genetic-testing', label: 'Genetic Testing Labs' },
];

const doctrineSubLinks = [
  { href: '/doctrine/vus-annihilation', label: 'VUS Annihilation' },
  { href: '/doctrine/metastasis-prevention', label: 'Metastasis Prevention' },
  { href: '/doctrine/de-sci-and-ip-nfts', label: 'DeSci & IP-NFTs' },
];

const useCasesSubLinks = [
  // Discriminative Use Cases
  { href: '/use-cases/hereditary_breast_cancer', label: 'Hereditary Breast Cancer', divider: true },
  { href: '/use-cases/oncogene_activation', label: 'Oncogene Activation' },
  { href: '/use-cases/therapeutic_targeting', label: 'Therapeutic Targeting' },
  // Generative Use Cases
  { href: '/use-cases/crispr_therapy_design', label: 'CRISPR Therapy Design', divider: true },
  { href: '/use-cases/protein_therapy_design', label: 'Protein Therapy Design' },
  { href: '/use-cases/gene_therapy_vector_design', label: 'Gene Therapy Vector' },
  { href: '/use-cases/personalized_cancer_therapy', label: 'Personalized Cancer Therapy' },
  // Legacy
  { href: '/use-cases/multiple-myeloma', label: 'Multiple Myeloma', divider: true },
];

const metricsSubLinks = [
  { href: '/metrics/brca', label: 'BRCA1/2' },
  { href: '/metrics/snv', label: 'SNV Prediction' },
  { href: '/metrics/splice', label: 'Splice Variants' },
  { href: '/metrics/vus', label: 'VUS Resolution' },
  { href: '/metrics/generative', label: 'Generative AI' },
  { href: '/metrics/business', label: 'Business Impact' },
];

const investorSubLinks = [
  { href: '/investors/thesis', label: 'The Investment Thesis' },
  { href: '/investors/market-landscape', label: 'Market Landscape Analysis' },
];

// --- PRIMARY NAVIGATION: THE BATTLE PLAN ---
export const NAV_LINKS = [
  {
    href: '/about',
    label: 'About',
    icon: <BookOpen className="inline-block h-4 w-4" />,
  },
  {
    href: '/products',
    label: 'Products',
    icon: <Rocket className="inline-block h-4 w-4" />,
    subLinks: [
      { href: '/products/oncology', label: 'Oncology', divider: true },
      { href: '/products/r-d', label: 'R&D' },
      { href: '/products/research', label: 'Research' },
      { href: '/products/patient', label: 'For Patients' },
    ],
  },
  {
    href: '/ai-engines',
    label: 'AI Engines',
    icon: <Zap className="inline-block h-4 w-4" />,
    subLinks: [
      { href: '/products/oracle', label: 'Oracle (Discriminative AI)' },
      { href: '/products/forge', label: 'Forge (Generative AI)' },
    ],
  },
  {
    href: '/industry',
    label: 'Industry',
    icon: <Briefcase className="inline-block h-4 w-4" />,
    subLinks: industrySubLinks,
  },
  {
    href: '/comparisons/patient',
    label: 'Compare',
    icon: <GitCompare className="inline-block h-4 w-4" />,
    subLinks: [
      { href: '/comparisons/patient', label: 'Patient Scenarios' },
      // Future: { href: '/comparisons/biotech', label: 'Biotech Scenarios' },
      // Future: { href: '/comparisons/clinical', label: 'Clinical Scenarios' },
    ],
  },
  {
    href: '/evidence',
    label: 'Evidence',
    icon: <BookOpen className="inline-block h-4 w-4" />,
    subLinks: [
      { href: '/evidence', label: 'Evidence Intelligence' },
      { href: '/evidence/spe-fusion', label: 'S/P/E Fusion' },
      { href: '/evidence/data-lab', label: 'Data Lab' },
      { href: '/evidence/sae-intelligence', label: 'SAE Intelligence' },
      { href: '/cohort', label: 'Cohort Context' },
    ],
  },
  // {
  //   href: '/learn',
  //   label: 'Cancer 101',
  //   icon: <BookOpen className="inline-block h-4 w-4" />,
  // },
  {
    href: '/blog',
    label: 'Blog',
    icon: <PenTool className="inline-block h-4 w-4" />,
  },
  {
    href: '/use-cases',
    label: 'Success Stories',
    icon: <Briefcase className="inline-block h-4 w-4" />,
    subLinks: useCasesSubLinks,
  },
  {
    href: '/metrics',
    label: 'Metrics',
    icon: <PenTool className="inline-block h-4 w-4" />,
    subLinks: metricsSubLinks,
  },
  {
    href: '/contact',
    label: 'Contact',
    icon: <Mail className="inline-block h-4 w-4" />,
  },
];

interface NavLink {
  href: string;
  label: string;
  external?: boolean;
  divider?: boolean; // For visual separation in dropdowns
}

interface NavMenu extends NavLink {
  subLinks?: NavLink[];
  icon?: React.ReactNode;
}

const DropdownMenu: React.FC<{ menu: NavMenu }> = ({ menu }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="relative group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="flex items-center py-2 px-2 -mx-2">
        <Link
          href={menu.href}
          className="flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-white transition-colors"
        >
          {menu.label}
        </Link>
        <ChevronDown className={`h-4 w-4 text-slate-300 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} ml-1`} />
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-56 bg-white rounded-lg shadow-lg border border-slate-200 z-50"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            <div className="p-2">
              {menu.subLinks?.map((link, index) => (
                <React.Fragment key={link.href || index}>
                  {link.divider && index > 0 && (
                    <div className="my-1 border-t border-slate-200" />
                  )}
                  {link.href !== '#' ? (
                    <Link
                      href={link.href}
                      className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 rounded-md transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      {link.label}
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check if we're on a learn page (light background)
  const isLearnPage = pathname.startsWith('/learn');
  
  const navClass = isLearnPage
    ? 'bg-slate-900/80 backdrop-blur-lg border-b border-slate-700/50'
    : isScrolled 
      ? 'bg-slate-900/90 backdrop-blur-lg border-b border-slate-700/50'
      : 'bg-slate-900/80 backdrop-blur-lg';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navClass}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="text-3xl transition-transform duration-300 group-hover:rotate-12">
                {NAV_CONFIG.brandEmoji}
              </div>
              <div>
                <span className="text-xl font-bold text-white">{NAV_CONFIG.brandName}</span>
                <span className="block text-xs text-slate-400 -mt-1">{NAV_CONFIG.brandSubtitle}</span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <nav className="flex items-center gap-6">
              {NAV_LINKS.map((link) =>
                ('subLinks' in link && link.subLinks) ? (
                  <DropdownMenu key={link.label} menu={link as any} />
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>
          </div>
          
          <div className="hidden md:flex items-center gap-2 flex-shrink-0">
            <ToggleButton href="/platform">
              Research Use Only
            </ToggleButton>
          
          </div>

          {/* Mobile Nav Toggle */}
          <div className="md:hidden relative z-[100]">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-white p-2 hover:bg-slate-800 rounded transition-colors touch-manipulation"
              aria-label="Toggle menu"
              type="button"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Menu - Render as portal to avoid z-index issues */}
      {mounted && isOpen && createPortal(
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed top-20 left-0 right-0 bottom-0 bg-black/50 z-[60] md:hidden"
          />
          
          {/* Mobile Menu - Scrollable */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed top-20 left-0 right-0 bottom-0 bg-white z-[70] overflow-y-auto"
          >
              <div className="px-4 pt-4 pb-6">
                {NAV_LINKS.map((link) => {
                  const hasSubLinks = 'subLinks' in link && link.subLinks;
                  const isExpanded = expandedItems.has(link.label);
                  
                  return (
                    <div key={link.label} className="border-b border-slate-100 last:border-b-0">
                      {hasSubLinks ? (
                        <>
                          {/* Expandable Item with Sub-links */}
                          <button
                            onClick={() => {
                              const newExpanded = new Set(expandedItems);
                              if (isExpanded) {
                                newExpanded.delete(link.label);
                              } else {
                                newExpanded.add(link.label);
                              }
                              setExpandedItems(newExpanded);
                            }}
                            className="w-full flex items-center justify-between py-3 text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 -mx-4 px-4 transition-colors"
                          >
                            <div className="flex items-center gap-2">
                              {link.icon}
                              <span>{link.label}</span>
                            </div>
                            <ChevronDown 
                              className={`w-5 h-5 text-slate-500 transition-transform duration-200 ${
                                isExpanded ? 'rotate-180' : ''
                              }`} 
                            />
                          </button>
                          
                          {/* Sub-links - Collapsible */}
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="pl-6 pb-2 space-y-0.5 border-l-2 border-slate-200 ml-4">
                                  {(link as any).subLinks.map((sub: any, subIndex: number) => (
                                    <React.Fragment key={sub.href || subIndex}>
                                      {sub.divider && subIndex > 0 && (
                                        <div className="my-1 -mx-4 border-t border-slate-200" />
                                      )}
                                      {sub.href !== '#' ? (
                                        <Link
                                          href={sub.href}
                                          onClick={() => setIsOpen(false)}
                                          className="block py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 -mx-4 px-4 rounded transition-colors"
                                        >
                                          {sub.label}
                                        </Link>
                                      ) : (
                                        <div className="py-2 -mx-4 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                          {sub.label}
                                        </div>
                                      )}
                                    </React.Fragment>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        /* Regular Link - No Sub-links */
                        <Link
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-2 py-3 text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 -mx-4 px-4 transition-colors"
                        >
                          {link.icon}
                          <span>{link.label}</span>
                        </Link>
                      )}
                    </div>
                  );
                })}
                
                {/* Toggle Button */}
                <div className="pt-4 mt-4 border-t border-slate-200">
                  <ToggleButton href="/platform">
                    Research Use Only
                  </ToggleButton>
                </div>
              </div>
          </motion.div>
        </>,
        document.body
      )}
    </nav>
  );
};

export default Navbar;
