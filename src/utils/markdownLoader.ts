// This is a client-safe version of the markdown utilities
// It doesn't include the fs-dependent loading functions

// Extract the effective date from the markdown content if available
export function extractEffectiveDate(content: string): string | null {
  // Look for "Effective Date: [date]" in the content
  const match = content.match(/Effective Date: \[(.*?)\]/);
  if (match && match[1]) {
    return match[1] !== "Insert Date" ? match[1] : null;
  }
  return null;
}

// Process the content (client-safe version)
export function processMarkdownContent(content: string): string {
  // We're keeping a simplified version of this on the client side
  // Full processing happens on the server
  return content;
} 