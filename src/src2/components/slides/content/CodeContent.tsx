import React from 'react';

interface CodeContentProps {
  data: {
    code: string;
    language?: string;
    title?: string;
    showLineNumbers?: boolean;
  };
  layout: 'full' | 'split' | 'centered' | 'sidebar' | 'grid' | 'timeline';
}

const CodeContent: React.FC<CodeContentProps> = ({ data, layout }) => {
  const getContainerClass = () => {
    switch (layout) {
      case 'centered':
        return 'max-w-3xl mx-auto';
      case 'sidebar':
        return 'max-w-sm';
      case 'split':
        return 'max-w-lg';
      default:
        return 'w-full';
    }
  };

  const formatCode = () => {
    if (data.showLineNumbers) {
      return data.code.split('\n').map((line, index) => (
        <div key={index} className="flex">
          <span className="text-gray-400 text-sm w-8 flex-shrink-0 select-none">
            {index + 1}
          </span>
          <span className="flex-1">{line}</span>
        </div>
      ));
    }
    return data.code;
  };

  return (
    <div className={getContainerClass()}>
      {data.title && (
        <div className="bg-gray-700 text-white px-4 py-2 text-sm font-medium rounded-t-lg flex items-center justify-between">
          <span>{data.title}</span>
          {data.language && (
            <span className="text-gray-300 text-xs uppercase">{data.language}</span>
          )}
        </div>
      )}
      <pre className={`bg-gray-900 text-gray-100 p-4 overflow-x-auto ${data.title ? 'rounded-b-lg' : 'rounded-lg'}`}>
        <code className="text-sm font-mono">
          {formatCode()}
        </code>
      </pre>
    </div>
  );
};

export default CodeContent; 