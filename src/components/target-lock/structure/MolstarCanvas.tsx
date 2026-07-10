'use client';

/**
 * MolstarCanvas
 * -------------
 * Minimal, dependency-heavy molstar viewer for AF DB / PDB structures.
 * Rendered client-side only via dynamic import from StructureViewer.tsx.
 *
 * Design choices:
 *  - Uses `mol-plugin` (headless) + a plain canvas — NOT the full `mol-plugin-ui`.
 *    Keeps bundle noise down and avoids molstar's React 18 UI stack conflicting
 *    with the app's React tree.
 *  - `auto` preset applies cartoon + chain-id coloring.
 *  - No auto-rotate; user drags to orient.
 *  - pLDDT number and band shown in the parent StructureViewer chip; we do
 *    NOT try to recolor by pLDDT here because that requires the model-archive
 *    quality-assessment extension which the default plugin spec doesn't include.
 *    The AF DB B-factor column still carries pLDDT if callers add a coloring
 *    extension later.
 */

import { useEffect, useRef, useState } from 'react';
import type { PluginContext } from 'molstar/lib/mol-plugin/context';

interface Props {
  modelPath: string;               // e.g. '/models/afdb/P04637.pdb' or '/models/pdb/7W6L.cif'
  format: 'pdb' | 'mmcif';
  height?: number;
}

export default function MolstarCanvas({
  modelPath,
  format,
  height = 320,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pluginRef = useRef<PluginContext | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function boot() {
      try {
        // Dynamic imports so this heavy dep is never bundled server-side.
        const { DefaultPluginSpec } = await import('molstar/lib/mol-plugin/spec');
        const { PluginContext } = await import('molstar/lib/mol-plugin/context');
        const { PluginConfig } = await import('molstar/lib/mol-plugin/config');

        if (cancelled) return;
        if (!containerRef.current) return;

        // Create a fresh canvas each mount
        const canvas = document.createElement('canvas');
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.display = 'block';
        containerRef.current.innerHTML = '';
        containerRef.current.appendChild(canvas);

        const spec = DefaultPluginSpec();
        spec.config = [
          [PluginConfig.General.DisableAntialiasing, false],
          [PluginConfig.Viewport.ShowExpand, false],
          [PluginConfig.Viewport.ShowSelectionMode, false],
          [PluginConfig.Viewport.ShowAnimation, false],
          [PluginConfig.Viewport.ShowControls, false],
          [PluginConfig.Viewport.ShowSettings, false],
        ];

        const plugin = new PluginContext(spec);
        await plugin.init();
        pluginRef.current = plugin;

        const initOk = await plugin.initViewerAsync(canvas, containerRef.current);
        if (!initOk) {
          setError('WebGL init failed');
          setLoading(false);
          return;
        }

        // Load the structure
        const data = await plugin.builders.data.download(
          { url: modelPath, isBinary: false },
          { state: { isGhost: true } },
        );

        const trajectory = await plugin.builders.structure.parseTrajectory(data, format);
        await plugin.builders.structure.hierarchy.applyPreset(trajectory, 'default', {
          representationPreset: 'auto',
        });

        if (!cancelled) setLoading(false);
      } catch (e: any) {
        console.error('[MolstarCanvas]', e);
        if (!cancelled) {
          setError(e?.message ?? 'Failed to load structure');
          setLoading(false);
        }
      }
    }

    void boot();

    return () => {
      cancelled = true;
      try {
        pluginRef.current?.dispose();
      } catch { /* noop */ }
      pluginRef.current = null;
    };
  }, [modelPath, format]);

  return (
    <div className="relative w-full overflow-hidden rounded-md border border-neutral-800 bg-black">
      <div ref={containerRef} style={{ width: '100%', height }} />
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center text-[11px] uppercase tracking-widest text-neutral-500">
          Loading structure…
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center px-4 text-center text-[11px] text-red-400">
          {error}
        </div>
      )}
    </div>
  );
}
