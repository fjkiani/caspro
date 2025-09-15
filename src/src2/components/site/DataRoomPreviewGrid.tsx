import React from 'react';
import type { SlideDeck } from '../../types/slides';

interface Props {
  decks: SlideDeck[];
  onOpen: (id: string) => void;
}

const DataRoomPreviewGrid: React.FC<Props> = ({ decks, onOpen }) => {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {decks.map(deck => (
          <div key={deck.id} className="border border-gray-200 rounded-xl p-6 bg-white cursor-pointer hover:shadow" onClick={() => onOpen(deck.id)}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="text-gray-900 font-semibold">{deck.title}</div>
                <div className="text-gray-600 text-sm">{deck.description}</div>
              </div>
            </div>
            {deck.metadata?.blurb && (
              <div className="mt-3 p-3 bg-slate-50 border border-slate-200 rounded">
                <div className="text-[10px] font-medium text-slate-600 mb-1 uppercase tracking-wide">Executive Summary</div>
                <div className="text-sm text-slate-700 whitespace-pre-line line-clamp-6">{deck.metadata.blurb}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default DataRoomPreviewGrid; 