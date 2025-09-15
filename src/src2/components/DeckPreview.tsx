import React from 'react';

interface DeckPreviewProps {
  component: any;
  width?: number;
  height?: number;
}

const DeckPreview: React.FC<DeckPreviewProps> = ({ 
  component: Component, 
  width = 400, 
  height = 300 
}) => {
  if (!Component) {
    return (
      <div 
        className="bg-slate-900 flex items-center justify-center text-slate-400"
        style={{ width, height }}
      >
        <div className="text-center">
          <div className="text-4xl mb-2">📊</div>
          <p>Preview</p>
        </div>
      </div>
    );
  }

  // Calculate scale to fit while maintaining aspect ratio
  const scaleX = width / 1920;
  const scaleY = height / 1080;
  const scale = Math.min(scaleX, scaleY);
  
  // Calculate centered positioning
  const scaledWidth = 1920 * scale;
  const scaledHeight = 1080 * scale;
  const offsetX = (width - scaledWidth) / 2;
  const offsetY = (height - scaledHeight) / 2;

  return (
    <div 
      className="overflow-hidden relative bg-slate-900"
      style={{ width, height }}
    >
      {/* Scale down and center the component */}
      <div 
        className="origin-top-left"
        style={{ 
          transform: `translate(${offsetX}px, ${offsetY}px) scale(${scale})`,
          width: '1920px',
          height: '1080px'
        }}
      >
        <Component />
      </div>
    </div>
  );
};

export default DeckPreview; 