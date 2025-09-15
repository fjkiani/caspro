import React from 'react';

interface ImageContentProps {
  data: {
    src: string;
    alt: string;
    caption?: string;
    size?: 'sm' | 'md' | 'lg' | 'full';
  };
  layout: 'full' | 'split' | 'centered' | 'sidebar' | 'grid' | 'timeline';
}

const ImageContent: React.FC<ImageContentProps> = ({ data, layout }) => {
  const getContainerClass = () => {
    switch (layout) {
      case 'centered':
        return 'flex justify-center';
      case 'sidebar':
        return 'max-w-sm';
      case 'split':
        return 'max-w-lg';
      default:
        return 'w-full';
    }
  };

  const getImageClass = () => {
    const baseClass = 'rounded-lg shadow-md';
    switch (data.size) {
      case 'sm':
        return `${baseClass} max-w-xs`;
      case 'md':
        return `${baseClass} max-w-md`;
      case 'lg':
        return `${baseClass} max-w-lg`;
      case 'full':
        return `${baseClass} w-full`;
      default:
        return `${baseClass} max-w-md`;
    }
  };

  return (
    <div className={getContainerClass()}>
      <figure>
        <img 
          src={data.src} 
          alt={data.alt}
          className={getImageClass()}
        />
        {data.caption && (
          <figcaption className="mt-2 text-sm text-gray-600 text-center">
            {data.caption}
          </figcaption>
        )}
      </figure>
    </div>
  );
};

export default ImageContent; 