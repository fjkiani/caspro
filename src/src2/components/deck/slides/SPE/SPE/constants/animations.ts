// SPE Slide Animation Constants
// Centralized animation configurations for consistent timing and effects

export const SLIDE_ANIMATIONS = {
  // Base slide transitions
  slide: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.5 }
  },
  
  // Title animations
  title: {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { delay: 0.5, duration: 0.8, type: "spring", stiffness: 100 }
  },
  
  // Subtitle animations
  subtitle: {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { delay: 0.8, duration: 0.6 }
  },
  
  // Description animations
  description: {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { delay: 1.0, duration: 0.6 }
  },
  
  // Problem/Solution animations
  problemSolution: {
    left: {
      initial: { x: -50, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      transition: { delay: 1.2, duration: 0.6 }
    },
    right: {
      initial: { y: 30, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      transition: { delay: 1.4, duration: 0.6 }
    }
  },
  
  // Framework component animations
  frameworkComponents: {
    sequence: {
      initial: { y: 50, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      transition: { delay: 0.3, duration: 0.6 }
    },
    pathway: {
      initial: { y: 50, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      transition: { delay: 0.5, duration: 0.6 }
    },
    evidence: {
      initial: { y: 50, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      transition: { delay: 0.7, duration: 0.6 }
    }
  },
  
  // Component content animations
  componentContent: {
    title: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { delay: 0.6 }
    },
    description: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { delay: 0.8 }
    }
  },
  
  // Hero metrics animations
  heroMetrics: {
    container: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.8, delay: 0.3 }
    }
  },
  
  // Differentiators animations
  differentiators: {
    header: {
      initial: { opacity: 0, y: -20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.8 }
    },
    content: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { delay: 0.5, duration: 0.8 }
    }
  },
  
  // Hover effects
  hover: {
    scale: 1.02,
    y: -5
  },
  
  // Continuous animations
  continuous: {
    glow: {
      animate: { opacity: [0.1, 0.2, 0.1] },
      transition: { duration: 3, repeat: Infinity }
    },
    rotate: {
      animate: { rotate: [0, 5, -5, 0] },
      transition: { duration: 4, repeat: Infinity, delay: 1 }
    },
    scale: {
      animate: { scale: [1, 1.1, 1] },
      transition: { duration: 3, repeat: Infinity, delay: 2 }
    }
  }
};

export const STAGGER_DELAYS = {
  short: 0.2,
  medium: 0.3,
  long: 0.5
};

export const ANIMATION_DURATIONS = {
  fast: 0.4,
  normal: 0.6,
  slow: 0.8,
  spring: { duration: 0.8, type: "spring", stiffness: 100 }
};
