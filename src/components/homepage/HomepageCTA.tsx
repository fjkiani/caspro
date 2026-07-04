import Link from 'next/link';

/**
 * Final homepage call-to-action. Closes the page with a single, high-intent
 * conversion path: book a demo or tour the platform. Pure server, no client
 * JS, no decorative noise — the audit explicitly flagged missing conversion
 * scaffolding on the root URL.
 */

export default function HomepageCTA() {
  return (
    <section
      aria-labelledby="homepage-cta-heading"
      className="bg-gradient-to-b from-[#0A0A0F] to-black border-t border-zinc-800/60 px-6 py-24"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-zinc-500">
          Next step
        </p>
        <h2
          id="homepage-cta-heading"
          className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl"
        >
          Ready to see CrisPRO.ai on your problem?
        </h2>
        <p className="mt-5 text-base leading-relaxed text-zinc-400">
          Bring a target, a dataset, or a clinical question. We&apos;ll show
          you how Oracle, Forge, and the engines reason about it — with full
          receipts.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            href="/contact/"
            className="inline-flex items-center gap-2 rounded-sm bg-white px-6 py-3 text-[12px] font-black uppercase tracking-widest text-black transition hover:bg-zinc-200"
          >
            Book a demo
            <span aria-hidden>→</span>
          </Link>
          <Link
            href="/platform/"
            className="inline-flex items-center gap-2 rounded-sm border border-zinc-700 px-6 py-3 text-[12px] font-black uppercase tracking-widest text-zinc-300 transition hover:border-white hover:text-white"
          >
            Tour the platform
            <span aria-hidden>→</span>
          </Link>
        </div>

        <p className="mt-8 text-xs text-zinc-600">
          Or email{' '}
          <a
            href="mailto:fahad@crispro.ai"
            className="font-mono text-zinc-400 underline-offset-4 hover:underline"
          >
            fahad@crispro.ai
          </a>
          .
        </p>
      </div>
    </section>
  );
}
