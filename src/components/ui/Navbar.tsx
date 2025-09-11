'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Rocket, BookOpen, PenTool, Briefcase, Mail, Users } from 'lucide-react';
import ToggleButton from './ToggleButton';
import { coPilotDetailsData } from '@/data/coPilotDetails';

const NAV_CONFIG = {
  brandEmoji: "🧬",
  brandName: "CrisPRO",
  brandSubtitle: "Oncology Co-Pilot",
};

// --- DYNAMIC SUB-LINK GENERATION ---
const generatePlatformSubLinks = () => {
  return Object.entries(coPilotDetailsData).map(([slug, data]) => ({
    href: `/platform/${slug}`,
    label: data.pageTitle || data.slug
  }));
};

// --- SUB-LINK DEFINITIONS ---
const platformSubLinks = generatePlatformSubLinks();

const doctrineSubLinks = [
  { href: '/doctrine/vus-annihilation', label: 'VUS Annihilation' },
  { href: '/doctrine/metastasis-prevention', label: 'Metastasis Prevention' },
  { href: '/doctrine/de-sci-and-ip-nfts', label: 'DeSci & IP-NFTs' },
  { href: '/kill-chain', label: 'The \'In Silico\' Kill Chain' },
];

const useCasesSubLinks = [
  { href: '/use-cases/multiple-myeloma', label: 'Multiple Myeloma' },
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
    href: '/insilico',
    label: 'In-Silico',
    icon: <Rocket className="inline-block h-4 w-4" />,
    subLinks: platformSubLinks,
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
  {
    href: '/learn',
    label: 'Cancer 101',
    icon: <BookOpen className="inline-block h-4 w-4" />,
  },
  {
    href: '/blog',
    label: 'Blog',
    icon: <PenTool className="inline-block h-4 w-4" />,
  },
  {
    href: '/use-cases',
    label: 'Use Cases',
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
}

interface NavMenu extends NavLink {
  subLinks?: NavLink[];
  icon?: React.ReactNode;
}

const DropdownMenu: React.FC<{ menu: NavMenu }> = ({ menu }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link
        href={menu.href}
        className="flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-white transition-colors"
      >
        {menu.label}
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </Link>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 z-50"
          >
            <div className="p-2">
              {menu.subLinks?.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 rounded-md transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
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
  const pathname = usePathname();

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
    : 'bg-transparent';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navClass} ${isScrolled ? 'transform -translate-y-full' : 'transform translate-y-0'}`}>
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
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-200"
          >
            <div className="px-4 pt-2 pb-4 space-y-2">
              {NAV_LINKS.map((link) => (
                <div key={link.label}>
                    <Link
                      href={('subLinks' in link && link.subLinks) ? '#' : link.href}
                      onClick={() => !('subLinks' in link && link.subLinks) && setIsOpen(false)}
                      className="block py-2 text-base font-medium text-slate-700 hover:text-primary"
                    >
                      {link.icon} {link.label}
                    </Link>
                    {('subLinks' in link && link.subLinks) ? (
                        <div className="pl-4 mt-1 space-y-1 border-l border-slate-200">
                        {(link as any).subLinks.map((sub: any) => (
                            <Link
                                key={sub.href}
                                href={sub.href}
                                onClick={() => setIsOpen(false)}
                                className="block py-1.5 text-sm text-slate-600 hover:text-primary"
                            >
                            - {sub.label}
                            </Link>
                        ))}
                        </div>
                    ) : null}
                </div>
              ))}
              <div className="flex items-stretch gap-2 pt-4">
                <div className="flex-1">
                  <ToggleButton href="/platform">
                    Research Use Only
                  </ToggleButton>
                </div>
              
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
