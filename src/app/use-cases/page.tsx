import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, PlayCircle, Dna, FlaskConical } from 'lucide-react';

// Import use cases directly to avoid potential circular dependency issues
import { discriminativeUseCases } from '@/data/use-cases/discriminative';
import { generativeUseCases } from '@/data/use-cases/generative';

const allUseCases = [...discriminativeUseCases, ...generativeUseCases];

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Use Cases & Demos | CrisPRO',
    description: 'Explore end-to-end AI-powered workflows that solve real problems in drug development and precision medicine.',
  };
}

const categoryIcons = {
  discriminative: Dna,
  generative: FlaskConical,
};

const categoryColors = {
  discriminative: {
    bg: 'from-blue-900/20 to-blue-800/20',
    border: 'border-blue-700/50',
    text: 'text-blue-300',
    badge: 'bg-blue-600',
  },
  generative: {
    bg: 'from-purple-900/20 to-purple-800/20',
    border: 'border-purple-700/50',
    text: 'text-purple-300',
    badge: 'bg-purple-600',
  },
};

export default function UseCasesIndexPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto px-6 py-20 space-y-16">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-900/30 border border-blue-700/50 rounded-full">
            <PlayCircle className="w-5 h-5 text-blue-400" />
            <span className="text-blue-300 font-medium">Interactive Demos</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Use Cases & Guided Demos
            </span>
          </h1>
          
          <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
            Explore end-to-end demos that combine multiple AI endpoints to solve real problems. 
            Each use case runs step-by-step with explanations, evidence, and a final dossier.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="text-center p-4 bg-slate-800/50 border border-slate-600 rounded-xl">
            <div className="text-3xl font-black text-blue-400">{allUseCases.length}</div>
            <div className="text-sm text-slate-300">Total Use Cases</div>
          </div>
          <div className="text-center p-4 bg-slate-800/50 border border-slate-600 rounded-xl">
            <div className="text-3xl font-black text-purple-400">
              {allUseCases.filter(uc => uc.category === 'discriminative').length}
            </div>
            <div className="text-sm text-slate-300">Discriminative AI</div>
          </div>
          <div className="text-center p-4 bg-slate-800/50 border border-slate-600 rounded-xl">
            <div className="text-3xl font-black text-pink-400">
              {allUseCases.filter(uc => uc.category === 'generative').length}
            </div>
            <div className="text-sm text-slate-300">Generative AI</div>
          </div>
          <div className="text-center p-4 bg-slate-800/50 border border-slate-600 rounded-xl">
            <div className="text-3xl font-black text-cyan-400">
              {allUseCases.reduce((sum, uc) => sum + uc.steps.length, 0)}
            </div>
            <div className="text-sm text-slate-300">Total API Calls</div>
          </div>
        </div>

        {/* Use Case Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allUseCases.map((useCase) => {
            const colors = categoryColors[useCase.category];
            const Icon = categoryIcons[useCase.category];
            const apis = Array.from(new Set(useCase.steps.map(s => s.id)));

            return (
              <Link
                key={useCase.id}
                href={`/use-cases/${useCase.id}`}
                className="group block"
              >
                <div className={`h-full bg-gradient-to-br ${colors.bg} border ${colors.border} rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}>
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <Icon className={`w-8 h-8 ${colors.text}`} />
                    <span className={`px-3 py-1 ${colors.badge} text-white text-xs font-semibold rounded-full`}>
                      {useCase.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                    {useCase.name}
                  </h2>

                  {/* Summary */}
                  <p className="text-slate-300 text-sm mb-4 line-clamp-3">
                    {useCase.summary}
                  </p>

                  {/* Tags */}
                  {useCase.tags && useCase.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {useCase.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="px-2 py-1 bg-slate-700/50 text-slate-300 text-xs rounded-md">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* APIs Used */}
                  <div className="space-y-2 mb-4">
                    <h3 className="text-xs font-semibold text-slate-400 uppercase">APIs Used ({apis.length})</h3>
                    <div className="flex flex-wrap gap-2">
                      {apis.slice(0, 2).map(api => (
                        <span key={api} className="px-2 py-1 bg-slate-800 border border-slate-600 text-slate-300 text-xs rounded font-mono">
                          /{api}
                        </span>
                      ))}
                      {apis.length > 2 && (
                        <span className="px-2 py-1 bg-slate-800 border border-slate-600 text-slate-400 text-xs rounded">
                          +{apis.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-blue-400 group-hover:text-blue-300 font-semibold">
                    <span>Run Demo</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Footer CTA */}
        <div className="text-center space-y-6 pt-8">
          <h3 className="text-2xl font-bold text-white">Build Custom Workflows</h3>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Explore our API documentation to combine endpoints for your research needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/products/oracle"
              className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold transition-colors"
            >
              Explore Oracle API
            </Link>
            <Link 
              href="/products/forge"
              className="px-8 py-3 border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white rounded-lg font-semibold transition-colors"
            >
              Explore Forge API
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
