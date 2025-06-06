'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Rocket, BookOpen, Building, Mail, PenTool } from 'lucide-react';
import { coPilotDetailsData, CoPilotDetailContent } from '@/data/coPilotDetails';


const NAV_CONFIG = {
  brandEmoji: "🧬",
  brandName: "CrisPRO",
  brandSubtitle: "Oncology Co-Pilot",
};

interface NavLink {
  href: string;
  label: string;
  external?: boolean;
}

interface NavMenu extends NavLink {
  subLinks?: NavLink[];
  icon?: React.ReactNode;
}

const coPilotSubLinks: NavLink[] = Object.values(coPilotDetailsData).map(
  (pilot: CoPilotDetailContent) => ({
    href: `/co-pilot-app/${pilot.slug}`,
    label: pilot.pageTitle.split(':')[0],
  })
);

const companySubLinks: NavLink[] = [
  { href: '/about', label: 'About Us' },
  { href: '/careers', label: 'Careers' },
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms-of-service', label: 'Terms of Service' },
  { href: '/hipaa-statement', label: 'HIPAA Statement' },
  { href: '/security', label: 'Security Overview' },
];

const NAV_LINKS: NavMenu[] = [
  {
    href: '/co-pilot-app',
    label: 'Co-Pilots',
    icon: <Rocket className="inline-block h-4 w-4" />,
    subLinks: coPilotSubLinks,
  },
  {
    href: '/blog',
    label: 'Blog',
    icon: <PenTool className="inline-block h-4 w-4" />,
  },
  {
    href: '#',
    label: 'Learn',
    icon: <BookOpen className="inline-block h-4 w-4" />,
    subLinks: [
      { href: '/knowledge-graph', label: 'Knowledge Graph' },
      { href: '/visualization-demo', label: 'Visualization Demo' },
    ],
  },
  // {
  //   href: '/about',
  //   label: 'Company',
  //   icon: <Building className="inline-block h-4 w-4" />,
  //   subLinks: companySubLinks,
  // },
  {
    href: '/#contact',
    label: 'Contact Us',
    icon: <Mail className="inline-block h-4 w-4" />,
  },
];

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
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-slate-800 rounded-lg shadow-lg border border-slate-700 z-50"
          >
            <div className="p-2">
              {menu.subLinks?.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-3 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white rounded-md transition-colors"
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

  const navClass = isScrolled
    ? 'bg-slate-900/80 backdrop-blur-lg border-b border-slate-700/50'
    : 'bg-transparent';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navClass}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="text-3xl transition-transform duration-300 group-hover:rotate-12">
              {NAV_CONFIG.brandEmoji}
            </div>
            <div>
              <span className="text-xl font-bold text-white">{NAV_CONFIG.brandName}</span>
              <span className="block text-xs text-slate-400 -mt-1">{NAV_CONFIG.brandSubtitle}</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) =>
              link.subLinks ? (
                <DropdownMenu key={link.label} menu={link} />
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                  target={link.external ? '_blank' : '_self'}
                >
                  {link.label}
                </Link>
              )
            )}
            <div className="flex items-center gap-2 ml-4">
              <Link
                  href="/co-pilot-app"
                  className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-colors"
              >
                  Launch Co-Pilot
              </Link>
              <Link
                  href="/#contact"
                  className="bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-colors shadow-lg shadow-primary/20"
              >
                  Request a Demo
              </Link>
            </div>
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
            className="md:hidden bg-slate-900 border-t border-slate-700"
          >
            <div className="px-4 pt-2 pb-4 space-y-2">
              {NAV_LINKS.map((link) => (
                <div key={link.label}>
                    <Link
                      href={link.subLinks ? '#' : link.href}
                      onClick={() => !link.subLinks && setIsOpen(false)}
                      className="block py-2 text-base font-medium text-slate-200 hover:text-primary"
                    >
                      {link.icon} {link.label}
                    </Link>
                    {link.subLinks && (
                        <div className="pl-4 mt-1 space-y-1 border-l border-slate-700">
                        {link.subLinks.map(sub => (
                            <Link
                                key={sub.href}
                                href={sub.href}
                                onClick={() => setIsOpen(false)}
                                className="block py-1.5 text-sm text-slate-400 hover:text-primary"
                            >
                            - {sub.label}
                            </Link>
                        ))}
                        </div>
                    )}
                </div>
              ))}
              <div className="flex items-stretch gap-2 pt-4">
                <Link
                  href="/co-pilot-app"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 text-center bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 px-4 rounded-lg text-sm transition-colors"
                >
                    Launch Co-Pilot
                </Link>
                <Link
                  href="/#contact"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 text-center bg-primary hover:bg-primary/90 text-white font-semibold py-2.5 px-4 rounded-lg text-sm transition-colors"
                >
                    Request a Demo
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
