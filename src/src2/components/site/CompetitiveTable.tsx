import React from 'react';
import type { CompetitiveRow } from '../../types/site';
import { useAccessibility } from '../../contexts/AccessibilityContext';

interface Props {
  rows: CompetitiveRow[];
  title?: string;
}

const CompetitiveTable: React.FC<Props> = ({ rows, title }) => {
  const { getTextSize } = useAccessibility();
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {title && <h3 className={`font-semibold text-gray-900 mb-4 ${getTextSize('text-xl')}`}>{title}</h3>}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 bg-white">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-2 text-gray-700">Name</th>
                <th className="text-left px-4 py-2 text-gray-700">Features</th>
                <th className="text-left px-4 py-2 text-gray-700">Limitations</th>
                <th className="text-left px-4 py-2 text-gray-700">Score</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className={r.highlight ? 'bg-amber-50' : ''}>
                  <td className="px-4 py-2 font-medium text-gray-900">{r.name}</td>
                  <td className="px-4 py-2 text-gray-700">
                    <ul className={`list-disc pl-5 ${getTextSize('text-sm')}`}>{r.features.map((f, j) => (<li key={j}>{f}</li>))}</ul>
                  </td>
                  <td className="px-4 py-2 text-gray-700">
                    {r.limitations && r.limitations.length > 0 ? (
                      <ul className={`list-disc pl-5 ${getTextSize('text-sm')}`}>{r.limitations.map((l, j) => (<li key={j}>{l}</li>))}</ul>
                    ) : (
                      <span className={`text-gray-500 ${getTextSize('text-sm')}`}>—</span>
                    )}
                  </td>
                  <td className="px-4 py-2 text-gray-700">{r.score || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default CompetitiveTable; 