/** Readable contrast tokens for mars / proof trial UI (body copy, not chrome). */
export function marsReadable(isDarkMode: boolean) {
  return {
    body: isDarkMode ? 'text-zinc-200' : 'text-slate-800',
    secondary: isDarkMode ? 'text-zinc-300' : 'text-slate-600',
    label: isDarkMode ? 'text-zinc-300' : 'text-slate-500',
    caption: isDarkMode ? 'text-zinc-400' : 'text-slate-500',
  };
}
