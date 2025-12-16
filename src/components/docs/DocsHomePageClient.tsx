'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Search, 
  Sparkles, 
  Beaker, 
  Code2, 
  Command, 
  ArrowRight, 
  Zap,
  Shield,
  Brain,
  Dna,
  ChevronRight,
  BookOpen,
  PlayCircle,
  MessageSquare,
  Target
} from 'lucide-react';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

// Product cards data - will be populated dynamically
const getProducts = (oracleEndpoints: any[], forgeEndpoints: any[]) => [
  {
    id: 'oracle',
    name: 'Oracle',
    description: 'Zero-shot variant impact prediction with biological reasoning',
    icon: Sparkles,
    color: 'from-blue-500 to-cyan-500',
    metrics: '95.7% AUROC',
    href: oracleEndpoints.length > 0 ? `/docs/api/${oracleEndpoints[0].id}` : '#',
    apis: oracleEndpoints.slice(0, 3).map((e: any) => e.path.replace('/', '')),
  },
  {
    id: 'forge',
    name: 'Forge',
    description: 'Agentic therapeutic design for cancer immunotherapies',
    icon: Beaker,
    color: 'from-purple-500 to-pink-500',
    metrics: '70% Pfam-hit rate',
    href: forgeEndpoints.length > 0 ? `/docs/api/${forgeEndpoints[0].id}` : '#',
    apis: forgeEndpoints.slice(0, 3).map((e: any) => e.path.replace('/', '')),
  },
  {
    id: 'boltz',
    name: 'Boltz',
    description: '3D structural validation and binding affinity prediction',
    icon: Code2,
    color: 'from-emerald-500 to-teal-500',
    metrics: '83% confidence',
    href: '#',
    apis: [],
  },
  {
    id: 'command',
    name: 'Command Center',
    description: 'Workflow orchestration with provenance tracking',
    icon: Command,
    color: 'from-amber-500 to-orange-500',
    metrics: 'Full audit trail',
    href: '#',
    apis: [],
  },
];

// Quick links - only show links that exist
const quickLinks = [
  { title: 'API Reference', desc: 'Complete endpoint documentation', icon: Code2, href: '#api-reference' },
  { title: 'Synthetic Lethality', desc: 'Use case: Identify double-hit vulnerabilities', icon: Brain, href: '/docs/use-cases/synthetic-lethality-essentiality-agent' },
];

// Popular questions
const popularQuestions = [
  'How do I predict variant pathogenicity?',
  'What is the difference between Oracle and Forge?',
  'How do I design optimized guide RNA?',
  'What performance metrics does Oracle achieve?',
  'How do I authenticate API requests?',
  'Can I use CrisPRO for clinical decisions?',
];

interface DocsHomePageClientProps {
  oracleEndpoints: any[];
  forgeEndpoints: any[];
}

export default function DocsHomePageClient({ 
  oracleEndpoints, 
  forgeEndpoints 
}: DocsHomePageClientProps) {
  const products = getProducts(oracleEndpoints, forgeEndpoints);
  
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="text-center space-y-6 pt-8"
      >
        <motion.div variants={fadeIn} className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm">
            <Dna className="w-4 h-4" />
            <span>Documentation</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent">
              CrisPRO.ai Documentation
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Everything you need to transform therapeutic development with AI-powered intelligence
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div variants={fadeIn} className="max-w-xl mx-auto">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
            <button className="relative w-full flex items-center gap-3 px-5 py-4 bg-slate-800/80 hover:bg-slate-800 
                              border border-slate-700 rounded-xl transition-all">
              <Search className="w-5 h-5 text-slate-400" />
              <span className="flex-1 text-left text-slate-400">Search documentation or ask a question...</span>
              <kbd className="hidden md:flex items-center gap-1 px-2 py-1 bg-slate-700 rounded-lg text-xs text-slate-400">
                ⌘K
              </kbd>
            </button>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={fadeIn} className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="#api-reference"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 
                       rounded-lg text-sm font-medium transition-colors"
          >
            <PlayCircle className="w-4 h-4" />
            Browse APIs
          </a>
          {oracleEndpoints.length > 0 && (
            <Link
              href={`/docs/api/${oracleEndpoints[0].id}`}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 
                         border border-slate-700 rounded-lg text-sm font-medium transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              Try Variant Impact
            </Link>
          )}
        </motion.div>
      </motion.section>

      {/* API Endpoints - Live from MDC */}
      {(oracleEndpoints.length > 0 || forgeEndpoints.length > 0) && (
        <motion.section
          id="api-reference"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="space-y-6"
        >
          <motion.div variants={fadeIn} className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">API Reference</h2>
            <span className="text-sm text-slate-500">
              {oracleEndpoints.length + forgeEndpoints.length} endpoints available
            </span>
          </motion.div>

          {/* Oracle Endpoints */}
          {oracleEndpoints.length > 0 && (
            <motion.div variants={fadeIn} className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-semibold text-blue-400">Oracle APIs (Discriminative AI)</h3>
                <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded">
                  {oracleEndpoints.length} endpoints
                </span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {oracleEndpoints.map((endpoint) => (
                  <Link
                    key={endpoint.id}
                    href={`/docs/api/${endpoint.id}`}
                    className="group p-4 bg-slate-800/30 border border-slate-700 rounded-xl 
                              hover:border-blue-500/50 hover:bg-slate-800/50 transition-all"
                  >
                    <div className="flex items-start gap-3 mb-2">
                      <Target className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm text-white group-hover:text-blue-400 transition-colors truncate">
                          {endpoint.name}
                        </h4>
                        <code className="text-xs text-slate-500 font-mono truncate block mt-1">
                          {endpoint.path}
                        </code>
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-2">
                      {endpoint.description?.text?.slice(0, 100) || endpoint.description?.html?.slice(0, 100) || 'API endpoint documentation'}...
                    </p>
                    <div className="mt-3 flex items-center gap-2 text-xs text-blue-400">
                      <span>View docs</span>
                      <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}

          {/* Forge Endpoints */}
          {forgeEndpoints.length > 0 && (
            <motion.div variants={fadeIn} className="space-y-4 mt-8">
              <div className="flex items-center gap-2 mb-3">
                <Beaker className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg font-semibold text-purple-400">Forge APIs (Generative AI)</h3>
                <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 text-xs rounded">
                  {forgeEndpoints.length} endpoints
                </span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {forgeEndpoints.map((endpoint) => (
                  <Link
                    key={endpoint.id}
                    href={`/docs/api/${endpoint.id}`}
                    className="group p-4 bg-slate-800/30 border border-slate-700 rounded-xl 
                              hover:border-purple-500/50 hover:bg-slate-800/50 transition-all"
                  >
                    <div className="flex items-start gap-3 mb-2">
                      <Beaker className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm text-white group-hover:text-purple-400 transition-colors truncate">
                          {endpoint.name}
                        </h4>
                        <code className="text-xs text-slate-500 font-mono truncate block mt-1">
                          {endpoint.path}
                        </code>
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-2">
                      {endpoint.description?.text?.slice(0, 100) || endpoint.description?.html?.slice(0, 100) || 'API endpoint documentation'}...
                    </p>
                    <div className="mt-3 flex items-center gap-2 text-xs text-purple-400">
                      <span>View docs</span>
                      <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </motion.section>
      )}

      {/* Products Grid */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="space-y-6"
      >
        <motion.h2 variants={fadeIn} className="text-2xl font-bold">
          Products
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-4">
          {products.map((product) => (
            <motion.div key={product.id} variants={fadeIn}>
              {product.href !== '#' ? (
                <Link href={product.href} className="group block">
                  <div className="relative p-6 bg-slate-800/50 border border-slate-700/50 rounded-xl 
                                 hover:border-slate-600 transition-all overflow-hidden">
                    {/* Gradient background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-0 
                                    group-hover:opacity-5 transition-opacity`} />
                    
                    <div className="relative space-y-4">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${product.color} 
                                          flex items-center justify-center`}>
                            <product.icon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg group-hover:text-blue-400 transition-colors">
                              {product.name}
                            </h3>
                            <p className="text-xs text-slate-500">{product.metrics}</p>
                          </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-blue-400 
                                             group-hover:translate-x-1 transition-all" />
                      </div>

                      {/* Description */}
                      <p className="text-sm text-slate-400">{product.description}</p>

                      {/* API endpoints preview */}
                      {product.apis.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {product.apis.slice(0, 3).map((api) => (
                            <span
                              key={api}
                              className="px-2 py-1 bg-slate-900/50 border border-slate-700 
                                       rounded text-xs font-mono text-slate-400"
                            >
                              /{api}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="group block opacity-50 cursor-not-allowed">
                  <div className="relative p-6 bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-0`} />
                    
                    <div className="relative space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${product.color} 
                                          flex items-center justify-center`}>
                            <product.icon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg text-slate-500">
                              {product.name}
                            </h3>
                            <p className="text-xs text-slate-600">{product.metrics}</p>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-slate-500">{product.description}</p>
                      <p className="text-xs text-slate-600 italic">Coming soon</p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Use Cases Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="space-y-6"
      >
        <motion.h2 variants={fadeIn} className="text-2xl font-bold">
          Use Cases
        </motion.h2>
        <motion.div variants={fadeIn}>
          <Link
            href="/docs/use-cases/synthetic-lethality-essentiality-agent"
            className="group block p-6 bg-slate-800/50 border border-slate-700 rounded-xl hover:border-purple-500/50 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg group-hover:text-purple-400 transition-colors">
                    Synthetic Lethality & Essentiality Agent
                  </h3>
                  <p className="text-xs text-slate-500">Clinical • Intermediate</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
            </div>
            <p className="text-sm text-slate-400 mb-4">
              Identify double-hit vulnerabilities and score gene essentiality for precision drug targeting. When cancer cells lose one pathway (e.g., HR), they become dependent on backup pathways (e.g., PARP) - we identify these dependencies and target them with precision drugs.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded">
                50% drug match accuracy
              </span>
              <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">
                100% Evo2 usage
              </span>
              <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded">
                ✅ Implementation Complete
              </span>
            </div>
          </Link>
        </motion.div>
      </motion.section>

      {/* Quick Links */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="space-y-6"
      >
        <motion.h2 variants={fadeIn} className="text-2xl font-bold">
          Quick Links
        </motion.h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickLinks.map((link) => (
            <motion.div key={link.title} variants={fadeIn}>
              {link.href.startsWith('#') ? (
                <a
                  href={link.href}
                  className="group flex items-start gap-3 p-4 bg-slate-800/30 border border-slate-800 
                            rounded-xl hover:border-slate-700 hover:bg-slate-800/50 transition-all"
                >
                  <div className="p-2 bg-slate-800 rounded-lg group-hover:bg-slate-700 transition-colors">
                    <link.icon className="w-4 h-4 text-slate-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm group-hover:text-blue-400 transition-colors">
                      {link.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">{link.desc}</p>
                  </div>
                </a>
              ) : (
                <Link
                  href={link.href}
                  className="group flex items-start gap-3 p-4 bg-slate-800/30 border border-slate-800 
                            rounded-xl hover:border-slate-700 hover:bg-slate-800/50 transition-all"
                >
                  <div className="p-2 bg-slate-800 rounded-lg group-hover:bg-slate-700 transition-colors">
                    <link.icon className="w-4 h-4 text-slate-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm group-hover:text-blue-400 transition-colors">
                      {link.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">{link.desc}</p>
                  </div>
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Popular Questions */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="space-y-6"
      >
        <motion.h2 variants={fadeIn} className="text-2xl font-bold">
          Popular Questions
        </motion.h2>
        <motion.div variants={fadeIn} className="grid sm:grid-cols-2 gap-3">
          {popularQuestions.map((question) => (
            <button
              key={question}
              className="flex items-center gap-3 px-4 py-3 bg-slate-800/30 border border-slate-800 
                        rounded-lg hover:border-blue-500/50 hover:bg-blue-500/5 text-left transition-all group"
            >
              <MessageSquare className="w-4 h-4 text-slate-500 group-hover:text-blue-400 flex-shrink-0" />
              <span className="text-sm text-slate-400 group-hover:text-white transition-colors">
                {question}
              </span>
              <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-blue-400 ml-auto flex-shrink-0" />
            </button>
          ))}
        </motion.div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="relative p-8 md:p-12 text-center space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold">
            Ready to transform therapeutic development?
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Start building with CrisPRO.ai APIs and experience the future of AI-powered drug discovery
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            {oracleEndpoints.length > 0 && (
              <Link
                href={`/docs/api/${oracleEndpoints[0].id}`}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 
                          rounded-lg font-medium transition-colors"
              >
                Try Predict Variant Impact
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
            <Link
              href="/contact"
              className="flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 
                        border border-slate-700 rounded-lg font-medium transition-colors"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

