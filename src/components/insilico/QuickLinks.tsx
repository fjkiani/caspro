'use client';

import React from 'react';

const QuickLinks = () => {
  return React.createElement('div', { className: 'py-20' },
    React.createElement('div', { className: 'container mx-auto px-6' },
      React.createElement('div', { className: 'text-center mb-16' },
        React.createElement('h2', { className: 'text-4xl font-bold text-gray-800 mb-6' }, 'Quick Links'),
        React.createElement('p', { className: 'text-xl text-gray-600 max-w-4xl mx-auto' },
          'Access doctrine documents, API endpoints, and testing resources'
        )
      ),
      React.createElement('div', { className: 'mb-16' },
        React.createElement('h3', { className: 'text-2xl font-bold text-gray-800 mb-8 text-center' }, 'Doctrine Documents'),
        React.createElement('div', { className: 'grid grid-cols-1 md:grid-cols-3 gap-6' },
          React.createElement('div', { className: 'bg-white rounded-2xl p-6 shadow-lg border border-gray-100' },
            React.createElement('h4', { className: 'text-lg font-bold text-gray-800 mb-2' }, 'Chemotherapy Copilot'),
            React.createElement('p', { className: 'text-gray-600 text-sm mb-4' }, 'AI-powered chemotherapy selection and ranking'),
            React.createElement('button', { className: 'px-4 py-2 bg-teal-100 text-teal-700 rounded-lg text-sm font-medium' }, 'View Doctrine')
          ),
          React.createElement('div', { className: 'bg-white rounded-2xl p-6 shadow-lg border border-gray-100' },
            React.createElement('h4', { className: 'text-lg font-bold text-gray-800 mb-2' }, 'Precision Radiation'),
            React.createElement('p', { className: 'text-gray-600 text-sm mb-4' }, 'Radiosensitivity and toxicity risk assessment'),
            React.createElement('button', { className: 'px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg text-sm font-medium' }, 'View Doctrine')
          ),
          React.createElement('div', { className: 'bg-white rounded-2xl p-6 shadow-lg border border-gray-100' },
            React.createElement('h4', { className: 'text-lg font-bold text-gray-800 mb-2' }, 'CRISPR Intelligence'),
            React.createElement('p', { className: 'text-gray-600 text-sm mb-4' }, 'CRISPR design and feasibility analysis'),
            React.createElement('button', { className: 'px-4 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium' }, 'View Doctrine')
          )
        )
      ),
      React.createElement('div', null,
        React.createElement('h3', { className: 'text-2xl font-bold text-gray-800 mb-8 text-center' }, 'API Endpoints'),
        React.createElement('div', { className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6' },
          React.createElement('div', { className: 'bg-white rounded-2xl p-6 shadow-lg border border-gray-100' },
            React.createElement('h4', { className: 'text-lg font-bold text-gray-800 mb-2' }, 'Insights API'),
            React.createElement('p', { className: 'text-gray-600 text-sm mb-4' }, 'Variant functionality prediction'),
            React.createElement('div', { className: 'bg-gray-50 rounded-lg p-3 mb-4' },
              React.createElement('code', { className: 'text-sm text-gray-700' }, 'insights.py')
            ),
            React.createElement('button', { className: 'px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium w-full' }, 'Test API')
          ),
          React.createElement('div', { className: 'bg-white rounded-2xl p-6 shadow-lg border border-gray-100' },
            React.createElement('h4', { className: 'text-lg font-bold text-gray-800 mb-2' }, 'Efficacy API'),
            React.createElement('p', { className: 'text-gray-600 text-sm mb-4' }, 'Therapy fit and radiation readiness'),
            React.createElement('div', { className: 'bg-gray-50 rounded-lg p-3 mb-4' },
              React.createElement('code', { className: 'text-sm text-gray-700' }, 'efficacy.py')
            ),
            React.createElement('button', { className: 'px-4 py-2 bg-teal-100 text-teal-700 rounded-lg text-sm font-medium w-full' }, 'Test API')
          ),
          React.createElement('div', { className: 'bg-white rounded-2xl p-6 shadow-lg border border-gray-100' },
            React.createElement('h4', { className: 'text-lg font-bold text-gray-800 mb-2' }, 'Evidence API'),
            React.createElement('p', { className: 'text-gray-600 text-sm mb-4' }, 'Citations and source attribution'),
            React.createElement('div', { className: 'bg-gray-50 rounded-lg p-3 mb-4' },
              React.createElement('code', { className: 'text-sm text-gray-700' }, 'evidence.py')
            ),
            React.createElement('button', { className: 'px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium w-full' }, 'Test API')
          ),
          React.createElement('div', { className: 'bg-white rounded-2xl p-6 shadow-lg border border-gray-100' },
            React.createElement('h4', { className: 'text-lg font-bold text-gray-800 mb-2' }, 'Design API'),
            React.createElement('p', { className: 'text-gray-600 text-sm mb-4' }, 'CRISPR design and analysis'),
            React.createElement('div', { className: 'bg-gray-50 rounded-lg p-3 mb-4' },
              React.createElement('code', { className: 'text-sm text-gray-700' }, 'design.py')
            ),
            React.createElement('button', { className: 'px-4 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium w-full' }, 'Test API')
          )
        )
      )
    )
  );
};

export default QuickLinks;