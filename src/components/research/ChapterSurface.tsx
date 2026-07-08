'use client';

// ============================================================================
// <ChapterSurface chapter={...}/> — long-form reading layout for
// /research/chapters/[chapterSlug]/. Not a no-scroll surface — chapters are
// long-form content and need normal document flow. Not in the primary-surface
// list.
// ============================================================================

import Link from 'next/link';
import { ArrowLeft, ArrowRight, BookOpen, ChevronLeft } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { ZetaNavbar } from '@/components/ui/ZetaNavbar';
import type { ResearchChapter } from '@/data/chapters-index';
import { PATIENT_VECTOR_AXES, EVIDENCE_MODALITIES_7, EVIDENCE_TIERS_4, GOVERNANCE_GUARDRAILS } from '@/data/depth-layer';
import { CAPABILITY_REGISTRY } from '@/data/capability-registry';

interface ChapterSurfaceProps {
  chapter: ResearchChapter;
  prev?: ResearchChapter;
  next?: ResearchChapter;
}

function renderBoldMarkdown(text: string): (string | JSX.Element)[] {
  // simple **bold** -> <strong> parser (no full markdown, no HTML injection)
  const parts: (string | JSX.Element)[] = [];
  const regex = /\*\*(.+?)\*\*/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    parts.push(<strong key={key++}>{match[1]}</strong>);
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

export default function ChapterSurface({ chapter, prev, next }: ChapterSurfaceProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const surface = isDark ? 'bg-black text-white' : 'bg-[#FAF9F3] text-black';
  const muted = isDark ? 'text-white/70' : 'text-black/70';
  const border = isDark ? 'border-white/10' : 'border-black/10';
  const chip = isDark ? 'bg-white/5 border-white/10 text-white/70' : 'bg-black/5 border-black/10 text-black/70';

  // Resolve depth-layer links to display names
  const linkedAxes = chapter.linksIntoDepth.axes
    .map((slug) => PATIENT_VECTOR_AXES.find((a) => a.axis === slug))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));
  const linkedModalities = chapter.linksIntoDepth.modalities
    .map((slug) => EVIDENCE_MODALITIES_7.find((m) => m.modality === slug))
    .filter((m): m is NonNullable<typeof m> => Boolean(m));
  const linkedTiers = chapter.linksIntoDepth.tiers
    .map((slug) => EVIDENCE_TIERS_4.find((t) => t.tier === slug))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));
  const linkedCaps = chapter.linksIntoDepth.capabilities
    .map((slug) => CAPABILITY_REGISTRY.find((c) => c.slug === slug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  return (
    <div className={`min-h-screen ${surface}`}>
      <ZetaNavbar />

      {/* Chapter header */}
      <header className={`border-b ${border}`}>
        <div className="mx-auto max-w-3xl px-6 pt-10 pb-8">
          <Link
            href="/research/chapters/"
            className={`inline-flex items-center gap-1 text-xs uppercase tracking-widest ${muted} hover:opacity-100 opacity-80`}
          >
            <ChevronLeft className="h-3 w-3" /> All chapters
          </Link>
          <div className={`mt-6 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] uppercase tracking-widest ${chip}`}>
            <BookOpen className="h-3 w-3" /> Chapter {chapter.order} · {chapter.readMinutes} min read
          </div>
          <h1 className="mt-4 text-4xl md:text-5xl font-normal leading-tight tracking-tight">
            {chapter.title}
          </h1>
          <p className={`mt-3 text-lg ${muted}`}>{chapter.subtitle}</p>
          {chapter.publicAnchors.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {chapter.publicAnchors.map((a) => (
                <span
                  key={a}
                  className={`rounded-full border px-3 py-1 text-[10px] uppercase tracking-widest ${chip}`}
                >
                  {a}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Chapter body */}
      <article className="mx-auto max-w-3xl px-6 py-12">
        {chapter.sections.map((section) => (
          <section key={section.heading} className="mb-12">
            <h2 className="text-2xl font-normal tracking-tight mb-4">{section.heading}</h2>
            <div className="space-y-4">
              {section.body.map((para, i) => (
                <p key={i} className={`text-[15px] leading-relaxed ${muted}`}>
                  {renderBoldMarkdown(para)}
                </p>
              ))}
            </div>
          </section>
        ))}

        {/* Key insight callout */}
        <aside
          className={`mt-4 mb-16 rounded-xl border p-6 ${
            isDark ? 'border-[#E9ED4C]/40 bg-[#E9ED4C]/5' : 'border-[#75A025]/40 bg-[#75A025]/5'
          }`}
        >
          <div className={`text-[10px] uppercase tracking-widest ${muted} mb-2`}>Key insight</div>
          <p className="text-base leading-relaxed">{renderBoldMarkdown(chapter.keyInsight)}</p>
        </aside>

        {/* Links into depth */}
        <section className={`rounded-xl border ${border} p-6 mb-12`}>
          <h3 className="text-lg font-normal tracking-tight mb-4">What this chapter is used for</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {linkedCaps.length > 0 && (
              <div>
                <div className={`text-[10px] uppercase tracking-widest ${muted} mb-2`}>Product capabilities</div>
                <ul className="space-y-1">
                  {linkedCaps.map((c) => (
                    <li key={c.slug}>
                      <Link href={`/engine/#${c.slug}`} className="underline underline-offset-2 hover:opacity-80">
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {linkedAxes.length > 0 && (
              <div>
                <div className={`text-[10px] uppercase tracking-widest ${muted} mb-2`}>Biology axes covered</div>
                <ul className="space-y-1">
                  {linkedAxes.map((a) => (
                    <li key={a.axis} className={muted}>
                      {a.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {linkedModalities.length > 0 && (
              <div>
                <div className={`text-[10px] uppercase tracking-widest ${muted} mb-2`}>Evidence modalities</div>
                <ul className="space-y-1">
                  {linkedModalities.map((m) => (
                    <li key={m.modality} className={muted}>
                      {m.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {linkedTiers.length > 0 && (
              <div>
                <div className={`text-[10px] uppercase tracking-widest ${muted} mb-2`}>Evidence tiers</div>
                <ul className="space-y-1">
                  {linkedTiers.map((t) => (
                    <li key={t.tier} className={muted}>
                      {t.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        {/* Prev / Next navigation */}
        <nav className={`grid grid-cols-1 md:grid-cols-2 gap-4 border-t ${border} pt-8`}>
          {prev ? (
            <Link
              href={`/research/chapters/${prev.slug}/`}
              className={`group flex items-center gap-3 rounded-xl border ${border} p-4 hover:opacity-90`}
            >
              <ArrowLeft className="h-4 w-4 flex-none" />
              <div>
                <div className={`text-[10px] uppercase tracking-widest ${muted}`}>Previous chapter</div>
                <div className="mt-1 text-sm">{prev.title}</div>
              </div>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/research/chapters/${next.slug}/`}
              className={`group flex items-center justify-end gap-3 rounded-xl border ${border} p-4 hover:opacity-90 md:text-right`}
            >
              <div>
                <div className={`text-[10px] uppercase tracking-widest ${muted}`}>Next chapter</div>
                <div className="mt-1 text-sm">{next.title}</div>
              </div>
              <ArrowRight className="h-4 w-4 flex-none" />
            </Link>
          ) : (
            <div />
          )}
        </nav>
      </article>
    </div>
  );
}
