/** Target Lock: intro at slug root; interactive workspace one level deeper. */

export const TARGET_LOCK_INTRO_PATH = '/engine/target-lock/';
export const TARGET_LOCK_WORKSPACE_PATH = '/engine/target-lock/workspace/';
/** Full FDA archive + Target Cascade tabs (previous simulator) */
export const TARGET_LOCK_ARCHIVE_PATH = '/engine/target-lock/archive/';

export function engineIntroPath(slug: string): string {
  return `/engine/${slug.replace(/^\/+|\/+$/g, '')}/`;
}

export function engineWorkspacePath(slug: string): string {
  const s = slug.replace(/^\/+|\/+$/g, '');
  if (s === 'target-lock') return TARGET_LOCK_WORKSPACE_PATH;
  return `/engine/${s}/`;
}
