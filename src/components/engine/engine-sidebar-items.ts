'use client';

import { getActiveEngines } from '@/data/engine-registry';
import { getEngineIcon } from './engine-icons';

/** EngineItem rows for EngineSidebar (icons resolved on client). */
export const toSidebarItems = () =>
  getActiveEngines().map((e) => ({
    id: e.id,
    label: e.label,
    icon: getEngineIcon(e.slug),
    desc: e.desc,
    status: e.status,
    color: 'bg-cyan-500/10 border-cyan-500/50',
    border: 'border-cyan-400/30',
  }));
