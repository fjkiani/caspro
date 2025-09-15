import React from 'react';

interface TextContentProps {
  data: {
    text: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    align?: 'left' | 'center' | 'right';
  };
  layout: 'full' | 'split' | 'centered' | 'sidebar' | 'grid' | 'timeline';
}

const TextContent: React.FC<TextContentProps> = ({ data, layout }) => {
  const getSizeClass = () => {
    switch (data.size) {
      case 'sm':
        return 'text-sm';
      case 'lg':
        return 'text-lg';
      case 'xl':
        return 'text-xl';
      default:
        return 'text-base';
    }
  };

  const getAlignClass = () => {
    switch (data.align) {
      case 'center':
        return 'text-center';
      case 'right':
        return 'text-right';
      default:
        return 'text-left';
    }
  };

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

  return (
    <div className={`${getLayoutClass()}`}>
      <p className={`${getSizeClass()} ${getAlignClass()} leading-relaxed`}>
        {data.text}
      </p>
    </div>
  );
};

export default TextContent; 