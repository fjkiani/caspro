/**
 * Global route transition loader (used by `src/app/loading.tsx`).
 * CSS-only spinner — works in light/dark via theme variables.
 */
export default function AppLoading({ label = 'Loading' }: { label?: string }) {
  return (
    <div
      className="flex min-h-[calc(100dvh-3.5rem)] w-full flex-col items-center justify-center gap-5 bg-background px-6 font-mono"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="relative flex h-14 w-14 items-center justify-center">
        <span className="absolute inset-0 rounded-full border-2 border-[var(--border)]" aria-hidden />
        <span className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-cyan-500 dark:border-t-[#00E5FF]" />
        <span className="text-2xl leading-none" aria-hidden>
          🧬
        </span>
      </div>
      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground">{label}</p>
    </div>
  );
}
