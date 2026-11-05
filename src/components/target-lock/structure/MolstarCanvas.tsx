'use client';

/**
 * MolstarCanvas
 * -------------
 * Minimal, dependency-heavy molstar viewer for AF DB / PDB structures.
 * Rendered client-side only via dynamic import from StructureViewer.tsx.
 *
 * Design choices:
 *  - Uses `mol-plugin` (headless) + a plain canvas — NOT the full `mol-plugin-ui`.
 *  - `auto` preset applies cartoon + chain-id coloring.
 *  - Optional residue-range focus: dim / isolate outside residues + camera zoom.
 *  - Optional auto-rotate via trackball spin.
 *  - pLDDT number and band shown in the parent StructureViewer chip.
 */

import { useEffect, useRef, useState } from 'react';
import type { PluginContext } from 'molstar/lib/mol-plugin/context';

export type ResidueFocus = {
  start: number;
  end: number;
  /** `isolate` nearly hides the rest; `highlight` keeps context faintly visible. */
  mode?: 'isolate' | 'highlight';
};

interface Props {
  modelPath: string;
  format: 'pdb' | 'mmcif';
  height?: number;
  autoRotate?: boolean;
  focus?: ResidueFocus | null;
}

export default function MolstarCanvas({
  modelPath,
  format,
  height = 320,
  autoRotate = false,
  focus = null,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pluginRef = useRef<PluginContext | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function boot() {
      try {
        const { DefaultPluginSpec } = await import('molstar/lib/mol-plugin/spec');
        const { PluginContext } = await import('molstar/lib/mol-plugin/context');
        const { PluginConfig } = await import('molstar/lib/mol-plugin/config');
        const { PluginCommands } = await import('molstar/lib/mol-plugin/commands');
        const { Vec3 } = await import('molstar/lib/mol-math/linear-algebra');
        const { Script } = await import('molstar/lib/mol-script/script');
        const { StructureSelection } = await import('molstar/lib/mol-model/structure');
        const { setStructureTransparency } = await import(
          'molstar/lib/mol-plugin-state/helpers/structure-transparency'
        );

        if (cancelled) return;
        if (!containerRef.current) return;

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

        const data = await plugin.builders.data.download(
          { url: modelPath, isBinary: false },
          { state: { isGhost: true } },
        );

        const trajectory = await plugin.builders.structure.parseTrajectory(data, format);
        await plugin.builders.structure.hierarchy.applyPreset(trajectory, 'default', {
          representationPreset: 'auto',
        });

        if (focus && focus.end >= focus.start) {
          const structure =
            plugin.managers.structure.hierarchy.current.structures[0]?.cell.obj?.data;
          const structureRef = plugin.managers.structure.hierarchy.current.structures[0];
          if (structure && structureRef) {
            const { start, end } = focus;
            const mode = focus.mode ?? 'isolate';

            const focusSel = Script.getStructureSelection(
              (Q) =>
                Q.struct.generator.atomGroups({
                  'residue-test': Q.core.rel.inRange([
                    Q.struct.atomProperty.macromolecular.label_seq_id(),
                    start,
                    end,
                  ]),
                  'group-by': Q.struct.atomProperty.macromolecular.residueKey(),
                }),
              structure,
            );
            const focusLoci = StructureSelection.toLociWithSourceUnits(focusSel);

            if (!StructureSelection.isEmpty(focusSel)) {
              const outsideSel = Script.getStructureSelection(
                (Q) =>
                  Q.struct.generator.atomGroups({
                    'residue-test': Q.core.logic.not([
                      Q.core.rel.inRange([
                        Q.struct.atomProperty.macromolecular.label_seq_id(),
                        start,
                        end,
                      ]),
                    ]),
                    'group-by': Q.struct.atomProperty.macromolecular.residueKey(),
                  }),
                structure,
              );
              const outsideLoci = StructureSelection.toLociWithSourceUnits(outsideSel);
              const transparency = mode === 'isolate' ? 0.92 : 0.72;
              await setStructureTransparency(
                plugin,
                structureRef.components,
                transparency,
                async () => outsideLoci,
              );

              plugin.managers.camera.focusLoci(focusLoci);
              plugin.managers.interactivity.lociHighlights.highlightOnly({ loci: focusLoci });
            }
          }
        }

        if (autoRotate && plugin.canvas3d) {
          const trackball = plugin.canvas3d.props.trackball;
          await PluginCommands.Canvas3D.SetSettings(plugin, {
            settings: {
              trackball: {
                ...trackball,
                animate: {
                  name: 'spin',
                  params: { speed: 0.05, axis: Vec3.create(0, 1, 0) },
                },
              },
            },
          });
        }

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
      } catch {
        /* noop */
      }
      pluginRef.current = null;
    };
  }, [modelPath, format, autoRotate, focus?.start, focus?.end, focus?.mode]);

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
