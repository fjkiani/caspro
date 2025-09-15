import React from 'react';
import { motion } from 'framer-motion';

// Reusable Components for CrisPRO Slides

export const MetricCard = ({ value, label, change, color = "cyan", size = "large" }) => (
  <motion.div
    className={`bg-slate-800/60 p-6 rounded-xl border border-slate-700 shadow-lg text-center ${
      size === "large" ? "min-h-[120px]" : "min-h-[100px]"
    }`}
    whileHover={{ scale: 1.02, y: -2 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <div className={`text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-${color}-400 to-${color}-300 mb-2`}>
      {value}
    </div>
    <div className="text-slate-300 font-semibold mb-1">{label}</div>
    {change && (
      <div className="flex items-center justify-center space-x-1 text-green-400">
        <span className="text-sm font-medium">{change}</span>
      </div>
    )}
  </motion.div>
);

export const FeatureHighlight = ({ icon: Icon, title, description, color = "cyan", metrics }) => (
  <motion.div
    className="relative p-6 rounded-2xl border border-slate-700 shadow-lg bg-slate-800/50 overflow-hidden"
    initial={{ y: 50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.6 }}
  >
    <motion.div
      className={`absolute inset-0 z-0 opacity-10 blur-xl bg-gradient-to-br from-${color}-500 to-${color}-600`}
      animate={{ opacity: [0.1, 0.2, 0.1] }}
      transition={{ duration: 3, repeat: Infinity }}
    />
    <div className="relative z-10">
      <motion.div
        className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-${color}-500/20 mb-4`}
        whileHover={{ scale: 1.1, rotate: 5 }}
      >
        {typeof Icon === 'string' ? <span className={`text-3xl text-${color}-400`}>{Icon}</span> : <Icon className={`text-${color}-400`} size={32} />}
      </motion.div>
      <motion.h3
        className="text-2xl font-bold text-slate-200 mb-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {title}
      </motion.h3>
      <motion.p
        className="text-lg text-slate-300 mb-4 leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {description}
      </motion.p>
      {metrics && (
        <div className="grid grid-cols-3 gap-3 text-center">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-slate-700/50 p-3 rounded-lg">
              <div className={`text-xl font-bold text-${color}-400`}>{metric.value}</div>
              <div className="text-xs text-slate-400">{metric.label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  </motion.div>
);

export const ComparisonCard = ({ title, items, color = "green" }) => (
  <motion.div
    className={`bg-gradient-to-br from-${color}-500/20 to-${color}-600/20 p-8 rounded-xl border border-${color}-500/30`}
    whileHover={{ scale: 1.02 }}
  >
    <div className="text-center mb-4">
      <div className="text-4xl mb-2">✅</div>
      <h3 className={`text-2xl font-bold text-${color}-400`}>{title}</h3>
    </div>
    <div className="space-y-3">
      {items.map((item, index) => (
        <p key={index} className="text-lg text-slate-300">• <strong>{item}</strong></p>
      ))}
    </div>
  </motion.div>
);

export const ProcessStep = ({ step, title, description, icon }) => (
  <motion.div
    className="bg-gradient-to-br from-slate-500/20 to-slate-400/20 p-6 rounded-xl border border-slate-500/30"
    whileHover={{ scale: 1.01 }}
  >
    <div className="flex items-center space-x-3 mb-3">
      <div className="w-3 h-3 bg-slate-400 rounded-full"></div>
      <p className="text-xl font-bold text-slate-400">{step}</p>
    </div>
    <div className="ml-6">
      <h4 className="text-lg font-semibold text-slate-300 mb-2">{title}</h4>
      <p className="text-base text-slate-400 leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

// Enhanced Reusable Components for Scalable Slide Development

export const SlideHeader = ({
  title,
  subtitle,
  gradient = "from-cyan-400 to-blue-400",
  size = "large"
}) => (
  <motion.div
    className="text-center space-y-4 mb-8"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >
    <h1 className={`font-black text-transparent bg-clip-text bg-gradient-to-r ${gradient} leading-tight ${
      size === "large" ? "text-6xl md:text-8xl" : "text-4xl md:text-6xl"
    }`}>
      {title}
    </h1>
    {subtitle && (
      <p className="text-xl md:text-3xl font-light text-slate-300 max-w-4xl mx-auto leading-relaxed">
        {subtitle}
      </p>
    )}
  </motion.div>
);

export const ContentSection = ({
  title,
  children,
  background = "bg-slate-800/30",
  border = "border-slate-700/50"
}) => (
  <motion.div
    className={`${background} p-8 rounded-2xl border ${border} shadow-lg`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    {title && (
      <h3 className="text-2xl md:text-3xl font-bold text-slate-200 mb-6 text-center">
        {title}
      </h3>
    )}
    {children}
  </motion.div>
);

export const DataPoint = ({
  value,
  label,
  description,
  color = "cyan",
  trend
}) => (
  <motion.div
    className={`bg-gradient-to-br from-${color}-500/10 to-${color}-600/10 p-6 rounded-xl border border-${color}-500/30 text-center`}
    whileHover={{ scale: 1.02 }}
  >
    <div className={`text-3xl md:text-4xl font-black text-${color}-400 mb-2`}>
      {value}
    </div>
    <div className="text-lg font-semibold text-slate-300 mb-1">{label}</div>
    {description && (
      <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
    )}
    {trend && (
      <div className="flex items-center justify-center mt-2">
        <span className="text-green-400 text-sm font-medium">{trend}</span>
      </div>
    )}
  </motion.div>
);

export const FeatureGrid = ({ features, columns = 2 }) => {
  // Defensive programming: ensure features is an array
  if (!Array.isArray(features)) {
    console.error('FeatureGrid: features prop is not an array:', features);
    return <div className="text-red-400 p-4">Error: Features data is not available</div>;
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-${columns} gap-6`}>
      {features.map((feature, index) => (
      <motion.div
        key={index}
        className="bg-slate-800/50 p-6 rounded-xl border border-slate-700"
        whileHover={{ scale: 1.01 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        {feature.icon && (
          <div className="text-4xl mb-4">{feature.icon}</div>
        )}
        <h4 className="text-xl font-bold text-slate-200 mb-2">{feature.title}</h4>
        <p className="text-slate-300 leading-relaxed">{feature.description}</p>
        {feature.metrics && (
          <div className="mt-4 grid grid-cols-2 gap-3">
            {feature.metrics.map((metric, i) => (
              <div key={i} className="bg-slate-700/50 p-2 rounded text-center">
                <div className="text-lg font-bold text-cyan-400">{metric.value}</div>
                <div className="text-xs text-slate-400">{metric.label}</div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    ))}
  </div>
  );
};

// Slide Factory for Creating Similar Slides
export const createStandardSlide = (config) => {
  const {
    title,
    subtitle,
    gradient,
    metrics,
    features,
    content,
    backgroundComponent = null
  } = config;

  return () => (
    <motion.section
      key={title.toLowerCase().replace(/\s+/g, '-')}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-slate-900 text-slate-200"
    >
      {backgroundComponent}

      <div className="relative z-10 w-full max-w-6xl space-y-12">
        <SlideHeader
          title={title}
          subtitle={subtitle}
          gradient={gradient}
        />

        {metrics && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {metrics.map((metric, index) => (
              <MetricCard
                key={index}
                value={metric.value}
                label={metric.label}
                change={metric.change}
                color={metric.color}
              />
            ))}
          </div>
        )}

        {features && (
          <FeatureGrid features={features} />
        )}

        {content && (
          <ContentSection>
            {content}
          </ContentSection>
        )}
      </div>
    </motion.section>
  );
};
