export const renderMarkdown = (markdown: string | undefined): { __html: string } => {
  if (!markdown) return { __html: '' };

  // 1. Basic markdown replacements with enhanced styling
  let processedMarkdown = markdown
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-white/95">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">$1</a>')
    .replace(/`(.*?)`/g, '<code class="bg-slate-700/70 text-amber-300 rounded-md px-1.5 py-1 text-sm font-mono">$1</code>');

  // 2. Split into lines and build HTML sequentially for lists and paragraphs
  const lines = processedMarkdown.split('\n');
  let html = '';
  let inList = false;

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (trimmedLine === '') continue; // Skip empty lines

    const isListItem = /^\d+\.\s/.test(trimmedLine);

    if (isListItem) {
      if (!inList) {
        // Start of a new list
        html += '<ul class="list-none p-0 mt-3 space-y-1">';
        inList = true;
      }
      // Add the list item, stripping the number
      const itemContent = trimmedLine.replace(/^\d+\.\s/, '');
      html += `<li class="flex items-start mb-2">
                 <span class="text-primary mr-2 mt-1 flex-shrink-0"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></span>
                 <span>${itemContent}</span>
               </li>`;
    } else {
      // Not a list item
      if (inList) {
        // End of the previous list
        html += '</ul>';
        inList = false;
      }
      // Add as a paragraph
      html += `<p class="mb-3">${trimmedLine}</p>`;
    }
  }

  if (inList) {
    // Make sure to close the list if the text ends with it
    html += '</ul>';
  }

  return { __html: html };
}; 