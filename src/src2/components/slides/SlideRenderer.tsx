import React from 'react';
import type { Slide } from '../../types/slides';
import CustomReactContent from './content/CustomReactContent';
import { getSiteBlock, getDeckComponent, PROCESS_STEPPER } from './registry';

interface SlideRendererProps {
  slide: Slide;
}

const SlideRenderer: React.FC<SlideRendererProps> = ({ slide }) => {
  const renderContent = (content: any, index: number) => {
    switch (content.type) {
      case 'title':
      case 'title-slide':
        return <TitleContent key={index} data={content} slide={slide} />;
      case 'info-cards':
        return <InfoCardsContent key={index} data={content} />;
      case 'simple-block':
        return <SimpleBlockContent key={index} data={content} />;
      case 'crisis-comparison':
        return <CrisisComparisonContent key={index} data={content} />;
      case 'custom-react':
        return <CustomReactContent key={index} data={content.data} />;
      case 'process-steps':
        return <ProcessStepsContent key={index} data={content} />;
      case 'custom':
        return <CustomContent key={index} data={content} />;
      default:
        return (
          <div key={index} className="p-8 text-center">
            <div className="text-red-400 mb-2">Unsupported content type: {content.type}</div>
            <div className="text-slate-400 text-sm">Available types: title, crisis-comparison, info-cards, simple-block, custom, custom-react, process-steps</div>
            <div className="text-xs text-slate-500 mt-2">Content: {JSON.stringify(content, null, 2)}</div>
          </div>
        );
    }
  };

  // Apply slide-level styling
  const slideClasses = `w-full h-full ${slide.backgroundClass || 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'}`;

  // Handle both array and object content formats
  const contentArray = Array.isArray(slide.content) ? slide.content : [slide.content];

  return (
    <div className={slideClasses}>
      {contentArray.map((content, index) => renderContent(content, index))}
    </div>
  );
};

// Enhanced content components with proper styling
const TitleContent: React.FC<{ data: any; slide: any }> = ({ data, slide }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8">
      <h1 className={`${slide.titleClassName || 'from-cyan-400 to-blue-300'} text-6xl md:text-8xl font-bold bg-gradient-to-r bg-clip-text text-transparent text-center leading-none tracking-tight drop-shadow-2xl`}>
        {slide.title}
      </h1>
      {slide.subtitle && (
        <p className="text-xl md:text-2xl text-slate-300 mt-6 text-center max-w-4xl">
          {slide.subtitle}
        </p>
      )}
      {data.metrics && (
        <div className="flex flex-wrap gap-8 mt-8 justify-center">
          {data.metrics.map((metric: any, index: number) => (
            <div key={index} className="text-center">
              <div className={`text-3xl font-bold ${metric.className || 'text-white'}`}>
                {metric.value}
              </div>
              <div className="text-slate-400 text-sm mt-1">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      )}
      {data.tagline && (
        <p className="text-lg text-slate-400 mt-4 text-center">
          {data.tagline}
        </p>
      )}
    </div>
  );
};

const InfoCardsContent: React.FC<{ data: any }> = ({ data }) => {
  return (
    <div className="w-full h-full p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-full">
        {data.cards?.map((card: any, index: number) => (
          <div key={index} className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            {card.icon && (
              <div className={`w-12 h-12 rounded-lg bg-${card.color || 'blue'}-600 flex items-center justify-center mb-4`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
            )}
            <h3 className="text-lg font-semibold text-white mb-2">{card.title}</h3>
            <p className="text-slate-400 text-sm">{card.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const SimpleBlockContent: React.FC<{ data: any }> = ({ data }) => {
  return (
    <div className="w-full h-full flex items-center justify-center p-8">
      <div className="max-w-4xl text-center">
        {data.block?.icon && (
          <div className="flex justify-center mb-6">
            <data.block.icon className={`w-16 h-16 ${data.block.iconColor || 'text-cyan-400'}`} />
          </div>
        )}
        <p className="text-xl md:text-2xl text-white leading-relaxed mb-4">
          {data.block?.mainText}
        </p>
        {data.block?.subText && (
          <p className="text-lg text-slate-400">
            {data.block.subText}
          </p>
        )}
      </div>
    </div>
  );
};

const CustomContent: React.FC<{ data: any }> = ({ data }) => {
  // Handle custom with siteBlocks (e.g., from use-case slides)
  if (data.siteBlocks && Array.isArray(data.siteBlocks)) {
    return (
      <div className="w-full h-full p-6">
        {data.siteBlocks.map((block: any, index: number) => {
          const Component = getSiteBlock(block.kind);
          if (Component) {
            return <Component key={index} {...block.props} />;
          }
          return (
            <div key={index} className="text-red-400 mb-2">
              Unknown site block kind: {block.kind}
            </div>
          );
        })}
      </div>
    );
  }

  // Handle custom with component name (e.g., "ZetaOracleInAction")
  if (data.component) {
    const Component = getDeckComponent(data.component);
    if (Component) {
      return <Component {...(data.props || {})} />;
    }
    return (
      <div className="w-full h-full flex items-center justify-center p-8">
        <div className="text-center">
          <div className="text-red-400 mb-2">Unknown component: {data.component}</div>
          <div className="text-slate-400 text-sm">Available components: ZetaOracleInAction, ZetaForgeTwoColumn, StructuralGauntlet</div>
        </div>
      </div>
    );
  }

  // Handle render function
  if (data.render && typeof data.render === 'function') {
    return data.render();
  }

  return (
    <div className="w-full h-full flex items-center justify-center p-8">
      <div className="text-center">
        <div className="text-red-400 mb-2">Custom content render function not found</div>
        <div className="text-slate-400 text-sm">Content type: {data.type}</div>
        <div className="text-xs text-slate-500 mt-2">Data: {JSON.stringify(data, null, 2)}</div>
      </div>
    </div>
  );
};

const ProcessStepsContent: React.FC<{ data: any }> = ({ data }) => {
  // Convert process-steps data to ProcessStepper format
  const steps = data.steps?.map((step: any) => ({
    icon: step.icon,
    title: step.title,
    description: step.description,
    accent: (step.accentColor?.replace('text-', '').replace('-400', '') as any) || 'cyan'
  })) || [];

  return (
    <div className="w-full h-full flex items-center justify-center p-8">
      <PROCESS_STEPPER steps={steps} direction="row" />
    </div>
  );
};

const CrisisComparisonContent: React.FC<{ data: any }> = ({ data }) => {
  return (
    <div className="w-full h-full p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
        {/* Left side - Problem */}
        <div className={`rounded-lg p-6 border-2 ${data.left?.borderColor || 'border-red-500/30'} ${data.left?.bgColor || 'bg-red-900/20'}`}>
          <h3 className="text-2xl font-bold text-white mb-4">{data.left?.title || 'Problem'}</h3>
          <ul className="space-y-3">
            {data.left?.items?.map((item: string, index: number) => (
              <li key={index} className="text-slate-300 flex items-start">
                <span className="text-red-400 mr-2">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        
        {/* Right side - Solution */}
        <div className={`rounded-lg p-6 border-2 ${data.right?.borderColor || 'border-green-500/30'} ${data.right?.bgColor || 'bg-green-900/20'}`}>
          <h3 className="text-2xl font-bold text-white mb-4">{data.right?.title || 'Solution'}</h3>
          <ul className="space-y-3">
            {data.right?.items?.map((item: string, index: number) => (
              <li key={index} className="text-slate-300 flex items-start">
                <span className="text-green-400 mr-2">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SlideRenderer; 