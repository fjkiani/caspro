import { notFound } from 'next/navigation';
import { parseSyntheticLethalityUseCase } from '@/lib/docs/parser/parseUseCaseMDC';
import { Beaker, Target, Zap, CheckCircle, ArrowRight, Clock, Users } from 'lucide-react';

interface UseCasePageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return [
    { slug: 'synthetic-lethality-essentiality-agent' },
  ];
}

export default async function UseCasePage({ params }: UseCasePageProps) {
  let useCase;
  
  if (params.slug === 'synthetic-lethality-essentiality-agent') {
    useCase = await parseSyntheticLethalityUseCase();
  } else {
    notFound();
  }

  if (!useCase) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-sm">
            Use Case
          </div>
          <div className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm">
            {useCase.industry}
          </div>
          <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm">
            {useCase.difficulty}
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{useCase.title}</h1>
        <div className="flex items-center gap-6 text-slate-400 text-sm">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{useCase.estimatedTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>{useCase.industry}</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <div 
        className="prose prose-invert max-w-none mb-12 text-slate-300"
        dangerouslySetInnerHTML={{ __html: useCase.description.html }}
      />

      {/* Steps */}
      {useCase.steps.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">How It Works</h2>
          <div className="space-y-4">
            {useCase.steps.map((step, index) => (
              <div
                key={step.order}
                className="p-6 bg-slate-800/50 border border-slate-700 rounded-xl"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center font-bold">
                    {step.order}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                    <div
                      className="text-slate-400 prose prose-invert max-w-none"
                      dangerouslySetInnerHTML={{ __html: step.description.html }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Outcomes */}
      {useCase.outcomes.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Key Outcomes</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {useCase.outcomes.map((outcome, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 bg-slate-800/30 border border-slate-700 rounded-lg"
              >
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300">{outcome}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Prerequisites */}
      {useCase.prerequisites && useCase.prerequisites.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Prerequisites</h2>
          <div className="space-y-2">
            {useCase.prerequisites.map((prereq, index) => (
              <div key={index} className="flex items-center gap-3 text-slate-400">
                <ArrowRight className="w-4 h-4 text-slate-500" />
                <span>{prereq}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="mt-12 p-8 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-xl">
        <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-slate-400 mb-6">
          Explore the API endpoints used in this use case and start building your own synthetic lethality analysis.
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="/docs/api/predict-gene-essentiality"
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition-colors"
          >
            <Target className="w-4 h-4" />
            View Gene Essentiality API
          </a>
          <a
            href="/docs"
            className="flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg font-medium transition-colors"
          >
            <Beaker className="w-4 h-4" />
            Browse All APIs
          </a>
        </div>
      </section>
    </div>
  );
}




