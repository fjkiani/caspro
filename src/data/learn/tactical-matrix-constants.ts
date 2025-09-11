// Constants for Tactical Capability Matrix components

export const ASPECT_TITLES = ['Technical Approach', 'Scientific Impact', 'Business Value'] as const;
export const ASPECT_ICONS = ['Settings', 'Microscope', 'Briefcase'] as const;
export const ASPECT_COLORS = ['blue', 'teal', 'indigo'] as const;

export const COLOR_VARIANTS = {
  'blue': 'from-blue-50 to-blue-100 border-blue-200 text-blue-700',
  'teal': 'from-teal-50 to-teal-100 border-teal-200 text-teal-700',
  'indigo': 'from-indigo-50 to-indigo-100 border-indigo-200 text-indigo-700',
} as const;

export const COLOR_BADGE_CLASSES = {
  'blue': 'bg-blue-100 text-blue-700',
  'teal': 'bg-teal-100 text-teal-700',
  'indigo': 'bg-indigo-100 text-indigo-700',
} as const;

export const DEFAULT_COLOR_CLASS = 'from-slate-50 to-slate-100 border-slate-200 text-slate-700';

export const ICON_COMPONENTS_MAP = {
  Settings: 'Settings',
  Microscope: 'Microscope',
  Briefcase: 'Briefcase',
  Database: 'Database',
  Target: 'Target',
  FileText: 'FileText',
  Users: 'Users',
  ShieldCheck: 'ShieldCheck',
  TrendingUp: 'TrendingUp',
  Activity: 'Activity',
  AlertTriangle: 'AlertTriangle',
  Layers: 'Layers',
  CheckCircle: 'CheckCircle',
} as const;
