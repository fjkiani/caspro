import React from 'react';

interface QuoteContentProps {
  data: {
    quote: string;
    author?: string;
    source?: string;
    style?: 'default' | 'highlighted' | 'minimal';
  };
  layout: 'full' | 'split' | 'centered' | 'sidebar' | 'grid' | 'timeline';
}

const QuoteContent: React.FC<QuoteContentProps> = ({ data, layout }) => {
  const getContainerClass = () => {
    const baseClass = layout === 'centered' ? 'max-w-2xl mx-auto' : 'w-full';
    
    switch (data.style) {
      case 'highlighted':
        return `${baseClass} bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg`;
      case 'minimal':
        return `${baseClass} border-l-2 border-gray-300 pl-6`;
      default:
        return `${baseClass} bg-gray-50 p-6 rounded-lg border border-gray-200`;
    }
  };

  return (
    <div className={getContainerClass()}>
      <blockquote>
        <p className="text-lg italic text-gray-800 mb-4">
          "{data.quote}"
        </p>
        {(data.author || data.source) && (
          <footer className="text-sm text-gray-600">
            {data.author && <span className="font-semibold">— {data.author}</span>}
            {data.source && <span className="ml-2">{data.source}</span>}
          </footer>
        )}
      </blockquote>
    </div>
  );
};

export default QuoteContent; 