'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Menu, 
  X, 
  MessageSquare, 
  ChevronRight,
  Sparkles,
  Book,
  Code,
  Beaker,
  Command as CommandIcon
} from 'lucide-react';
import Link from 'next/link';
import AIAssistant from '@/components/docs/AIAssistant';

// Types
interface DocsLayoutProps {
  children: React.ReactNode;
}

interface NavItem {
  title: string;
  href: string;
  icon?: React.ReactNode;
  items?: NavItem[];
  badge?: string;
}

// Navigation structure
const navigation: { group: string; items: NavItem[] }[] = [
  {
    group: 'Getting Started',
    items: [
      { title: 'Introduction', href: '/docs' },
      { title: 'Quick Start', href: '/docs/quickstart' },
      { title: 'Authentication', href: '/docs/authentication' },
    ],
  },
  {
    group: 'Products',
    items: [
      { title: 'Oracle', href: '/docs/products/oracle', icon: <Sparkles className="w-4 h-4" />, badge: 'AI' },
      { title: 'Forge', href: '/docs/products/forge', icon: <Beaker className="w-4 h-4" />, badge: 'Generative' },
      { title: 'Boltz', href: '/docs/products/boltz', icon: <Code className="w-4 h-4" /> },
      { title: 'Command Center', href: '/docs/products/command-center', icon: <CommandIcon className="w-4 h-4" /> },
    ],
  },
  {
    group: 'Oracle APIs',
    items: [
      { title: 'Predict Variant Impact', href: '/docs/api/predict-variant-impact' },
      { title: 'Predict Gene Essentiality', href: '/docs/api/predict-gene-essentiality' },
      { title: 'Predict Protein Function', href: '/docs/api/predict-protein-functionality-change' },
      { title: 'Predict Chromatin Access', href: '/docs/api/predict-chromatin-accessibility' },
      { title: 'CRISPR Efficacy', href: '/docs/api/predict-crispr-spacer-efficacy' },
    ],
  },
  {
    group: 'Forge APIs',
    items: [
      { title: 'Generate Guide RNA', href: '/docs/api/generate-optimized-guide-rna' },
      { title: 'Generate Repair Template', href: '/docs/api/generate-repair-template' },
      { title: 'Generate Regulatory Element', href: '/docs/api/generate-regulatory-element' },
      { title: 'Generate Therapeutic Protein', href: '/docs/api/generate-therapeutic-protein' },
    ],
  },
  {
    group: 'Use Cases',
    items: [
      { title: 'Synthetic Lethality', href: '/docs/use-cases/synthetic-lethality-essentiality-agent' },
    ],
  },
];

export default function DocsLayout({ children }: DocsLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [aiPanelOpen, setAiPanelOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();

  // Keyboard shortcut for search (Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-slate-800 bg-[#0A0F1E]/80 backdrop-blur-xl">
        <div className="flex items-center justify-between h-full px-4 lg:px-6">
          {/* Left: Logo & Mobile Menu */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-slate-800 rounded-lg transition-colors"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <Link href="/docs" className="flex items-center gap-2">
              <span className="text-2xl">🧬</span>
              <span className="font-bold text-lg">CrisPRO</span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-400 text-sm">Docs</span>
            </Link>
          </div>

          {/* Center: Search */}
          <button
            onClick={() => setSearchOpen(true)}
            className="hidden md:flex items-center gap-3 px-4 py-2 bg-slate-800/50 hover:bg-slate-800 
                       border border-slate-700 rounded-lg transition-colors w-80"
          >
            <Search className="w-4 h-4 text-slate-400" />
            <span className="text-slate-400 text-sm flex-1 text-left">Search docs...</span>
            <kbd className="hidden lg:flex items-center gap-1 px-2 py-0.5 bg-slate-700 rounded text-xs text-slate-400">
              ⌘K
            </kbd>
          </button>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setAiPanelOpen(!aiPanelOpen)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                aiPanelOpen 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline text-sm">Ask AI</span>
            </button>
            <Link
              href="/"
              className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
            >
              Back to Site
            </Link>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex pt-16">
        {/* Sidebar */}
        <aside
          className={`fixed lg:sticky top-16 left-0 z-40 w-72 h-[calc(100vh-4rem)] 
                      overflow-y-auto border-r border-slate-800 bg-[#0A0F1E] 
                      transition-transform duration-300 lg:translate-x-0
                      ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <nav className="p-4 space-y-8">
            {navigation.map((section) => (
              <div key={section.group}>
                <h3 className="px-3 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {section.group}
                </h3>
                <ul className="space-y-1">
                  {section.items.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setSidebarOpen(false)}
                          className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all
                                     ${isActive 
                                       ? 'bg-blue-600/20 text-blue-400 border-l-2 border-blue-500' 
                                       : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}
                        >
                          {item.icon && <span className="text-slate-500">{item.icon}</span>}
                          <span className="flex-1">{item.title}</span>
                          {item.badge && (
                            <span className="px-1.5 py-0.5 text-xs bg-purple-500/20 text-purple-400 rounded">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className={`flex-1 min-w-0 transition-all duration-300 ${aiPanelOpen ? 'lg:mr-80' : ''}`}>
          <div className="max-w-4xl mx-auto px-4 lg:px-8 py-8">
            {children}
          </div>
        </main>

        {/* AI Assistant Panel */}
        <AnimatePresence>
          {aiPanelOpen && (
            <motion.aside
              initial={{ x: 320, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 320, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed right-0 top-16 z-40 w-80 h-[calc(100vh-4rem)] 
                         border-l border-slate-800 bg-[#0F1629] flex flex-col"
            >
              {/* AI Panel Header */}
              <div className="flex items-center justify-between p-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg 
                                  flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">CrisPRO Assistant</h3>
                    <p className="text-xs text-slate-500">Powered by AI</p>
                  </div>
                </div>
                <button
                  onClick={() => setAiPanelOpen(false)}
                  className="p-1.5 hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4 text-slate-400" />
                </button>
              </div>

              {/* AI Panel Content */}
              <div className="flex-1 overflow-hidden">
                <AIAssistant pageContext={pathname} />
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>

      {/* Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSearchOpen(false)}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed top-[20%] left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl mx-4"
            >
              <div className="bg-[#0F1629] border border-slate-700 rounded-xl shadow-2xl overflow-hidden">
                {/* Search Input */}
                <div className="flex items-center gap-3 px-4 py-4 border-b border-slate-800">
                  <Search className="w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    autoFocus
                    placeholder="Search documentation..."
                    className="flex-1 bg-transparent text-lg outline-none placeholder-slate-500"
                  />
                  <kbd className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-400">ESC</kbd>
                </div>

                {/* Search Results Placeholder */}
                <div className="max-h-96 overflow-y-auto p-2">
                  <p className="px-4 py-2 text-xs text-slate-500 uppercase">Quick Actions</p>
                  {[
                    { title: 'API Reference', desc: 'Browse all API endpoints', icon: Code },
                    { title: 'Oracle Documentation', desc: 'Discriminative AI capabilities', icon: Sparkles },
                    { title: 'Forge Documentation', desc: 'Generative AI capabilities', icon: Beaker },
                  ].map((item, i) => (
                    <button
                      key={i}
                      onClick={() => setSearchOpen(false)}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-lg transition-colors"
                    >
                      <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-slate-400" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-medium">{item.title}</p>
                        <p className="text-xs text-slate-500">{item.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Search Footer */}
                <div className="px-4 py-3 border-t border-slate-800 bg-slate-900/50">
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 bg-slate-800 rounded">↵</kbd> to select
                    </span>
                    <span className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 bg-slate-800 rounded">↑↓</kbd> to navigate
                    </span>
                    <span className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 bg-slate-800 rounded">esc</kbd> to close
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}


