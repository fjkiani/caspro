// SPE Slide Styling Constants
// Centralized styling and color management for consistent visual design

export const COLORS = {
    primary: {
      teal: "from-teal-400 to-green-400",
      purple: "from-purple-400 to-pink-400", 
      cyan: "from-cyan-400 to-blue-400",
      sky: "from-sky-400 to-cyan-400"
    },
    
    accent: {
      red: "red-400",
      green: "green-400",
      blue: "blue-400",
      purple: "purple-400",
      cyan: "cyan-400",
      sky: "sky-400"
    },
    
    background: {
      primary: "bg-slate-900",
      secondary: "bg-slate-800/50",
      tertiary: "bg-slate-700/50",
      overlay: "bg-slate-800/50"
    },
    
    text: {
      primary: "text-slate-200",
      secondary: "text-slate-300", 
      tertiary: "text-slate-400",
      muted: "text-slate-500"
    },
    
    border: {
      primary: "border-slate-700",
      secondary: "border-slate-600",
      accent: "border-slate-500"
    }
  };
  
  export const GRADIENTS = {
    title: {
      teal: "text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-green-400",
      purple: "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400",
      cyan: "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400",
      sky: "text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-400"
    },
    
    glow: {
      sky: "bg-gradient-to-br from-sky-500 to-purple-500",
      purple: "bg-gradient-to-br from-purple-500 to-green-500",
      green: "bg-gradient-to-br from-green-500 to-blue-500"
    }
  };
  
  export const SIZES = {
    text: {
      xs: "text-xs",
      sm: "text-sm", 
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      "4xl": "text-4xl",
      "5xl": "text-5xl",
      "6xl": "text-6xl",
      "7xl": "text-7xl",
      "8xl": "text-8xl"
    },
    
    spacing: {
      xs: "space-y-2",
      sm: "space-y-4",
      md: "space-y-6", 
      lg: "space-y-8",
      xl: "space-y-12"
    },
    
    padding: {
      xs: "p-2",
      sm: "p-3",
      md: "p-4",
      lg: "p-6",
      xl: "p-8"
    },
    
    margin: {
      sm: "mt-2",
      md: "mt-4",
      lg: "mt-8",
      xl: "mt-12"
    }
  };
  
  export const LAYOUT = {
    container: "absolute inset-0 flex flex-col items-center justify-center text-center p-8",
    content: "relative z-10 w-full max-w-6xl space-y-12",
    grid: {
      "1col": "grid grid-cols-1",
      "2col": "grid grid-cols-1 lg:grid-cols-2", 
      "3col": "grid grid-cols-1 md:grid-cols-3",
      "responsive": "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
    },
    flex: {
      center: "flex items-center justify-center",
      between: "flex items-center justify-between",
      start: "flex items-start",
      end: "flex items-end"
    }
  };
  
  export const COMPONENT_STYLES = {
    card: {
      base: "relative p-6 rounded-2xl border border-slate-700 shadow-lg bg-slate-800/50 overflow-hidden group cursor-pointer",
      hover: "whileHover={{ scale: 1.02, y: -5 }}"
    },
    
    metricCard: {
      base: "bg-slate-800/50 p-6 rounded-xl border border-slate-600 text-center",
      value: "text-4xl md:text-5xl font-bold",
      label: "text-lg font-semibold text-slate-300",
      change: "text-sm text-slate-400"
    },
    
    featureHighlight: {
      base: "bg-slate-800/50 p-6 rounded-xl border border-slate-600",
      title: "text-2xl font-bold text-slate-200 mb-3",
      description: "text-lg text-slate-300 mb-4"
    },
    
    frameworkComponent: {
      base: "bg-slate-700/50 p-3 rounded-lg border",
      sequence: "border-sky-500/30 bg-sky-500/20",
      pathway: "border-purple-500/30 bg-purple-500/20", 
      evidence: "border-green-500/30 bg-green-500/20"
    }
  };
  
  export const ICON_SIZES = {
    sm: 24,
    md: 32,
    lg: 48,
    xl: 64
  };
  
  export const TRANSITIONS = {
    fast: { duration: 0.3 },
    normal: { duration: 0.5 },
    slow: { duration: 0.8 },
    spring: { duration: 0.8, type: "spring", stiffness: 100 }
  };