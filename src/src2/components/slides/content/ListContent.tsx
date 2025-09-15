import React from 'react';

interface ListContentProps {
  data: {
    items: string[];
    type?: 'bulleted' | 'numbered' | 'checked';
    style?: 'simple' | 'styled';
  };
  layout: 'full' | 'split' | 'centered' | 'sidebar' | 'grid' | 'timeline';
}

const ListContent: React.FC<ListContentProps> = ({ data, layout }) => {
  const getLayoutClass = () => {
    switch (layout) {
      case 'centered':
        return 'max-w-2xl mx-auto';
      case 'sidebar':
        return 'max-w-sm';
      case 'split':
        return 'max-w-lg';
      default:
        return 'w-full';
    }
  };

  const getListClass = () => {
    const baseClass = 'space-y-2';
    if (data.style === 'styled') {
      return `${baseClass} text-gray-700`;
    }
    return baseClass;
  };

  const renderListItem = (item: string, index: number) => {
    const itemClass = data.style === 'styled' 
      ? 'p-2 bg-gray-50 rounded border-l-4 border-blue-500' 
      : '';

    switch (data.type) {
      case 'numbered':
        return (
          <li key={index} className={`flex items-start ${itemClass}`}>
            <span className="font-semibold text-blue-600 mr-3">{index + 1}.</span>
            <span>{item}</span>
          </li>
        );
      case 'checked':
        return (
          <li key={index} className={`flex items-start ${itemClass}`}>
            <span className="text-green-500 mr-3">✓</span>
            <span>{item}</span>
          </li>
        );
      default:
        return (
          <li key={index} className={`flex items-start ${itemClass}`}>
            <span className="text-blue-500 mr-3">•</span>
            <span>{item}</span>
          </li>
        );
    }
  };

  return (
    <div className={getLayoutClass()}>
      <ul className={getListClass()}>
        {data.items.map((item, index) => renderListItem(item, index))}
      </ul>
    </div>
  );
};

export default ListContent; 