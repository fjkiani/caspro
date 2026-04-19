export function getNavTheme(isDarkMode: boolean) {
  return {
    navSurface: isDarkMode
      ? 'bg-[#020408]/95 border-zinc-800/90 text-zinc-100'
      : 'bg-white border-slate-300 text-slate-900 shadow-sm',
    navMuted: isDarkMode ? 'text-zinc-400' : 'text-slate-600',
    navHover: isDarkMode ? 'hover:text-zinc-100' : 'hover:text-slate-900',
    brandBorder: isDarkMode ? 'border-zinc-800' : 'border-slate-200',
  };
}

export type NavTheme = ReturnType<typeof getNavTheme>;
