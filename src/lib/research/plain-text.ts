/** Strip HTML/markdown noise from Hygraph excerpts for card previews. */
export function plainPreviewText(raw: string | null | undefined, maxLen = 140): string {
  if (!raw?.trim()) return '';
  const text = raw
    .replace(/<[^>]*>/g, ' ')
    .replace(/[#*_`>[\]]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (text.length <= maxLen) return text;
  return `${text.slice(0, maxLen).trim()}…`;
}
