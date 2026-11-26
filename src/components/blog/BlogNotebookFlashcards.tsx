'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { UniversalCard } from '@/types/universal-content';

interface BlogNotebookFlashcardsProps {
  cards: UniversalCard[];
  title?: string;
}

export default function BlogNotebookFlashcards({
  cards,
  title = 'Flashcards',
}: BlogNotebookFlashcardsProps) {
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});

  if (!cards.length) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        {cards.map((card, index) => {
          const id = card.id || `fc-${index}`;
          const content =
            typeof card.content === 'object'
              ? card.content
              : { front: String(card.content), back: '' };
          const isFlipped = Boolean(flipped[id]);
          return (
            <button
              key={id}
              type="button"
              onClick={() => setFlipped((prev) => ({ ...prev, [id]: !prev[id] }))}
              className="relative h-48 w-full text-left [perspective:1000px]"
            >
              <motion.div
                className="absolute inset-0 rounded-xl border border-slate-200 shadow-sm dark:border-slate-700"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.45 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div
                  className="absolute inset-0 flex flex-col justify-center rounded-xl bg-gradient-to-br from-sky-50 to-white p-5 dark:from-slate-800 dark:to-slate-900"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-sky-700 dark:text-sky-300">
                    Front
                  </p>
                  <p className="mt-2 text-sm font-medium text-slate-800 dark:text-slate-100">
                    {content.front}
                  </p>
                </div>
                <div
                  className="absolute inset-0 flex flex-col justify-center rounded-xl bg-white p-5 dark:bg-slate-900"
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
                    Back
                  </p>
                  <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">{content.back}</p>
                </div>
              </motion.div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
