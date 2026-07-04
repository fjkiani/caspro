/**
 * Related links map for orphan pages.
 * Each orphan page gets a list of contextually relevant internal links
 * rendered by the <RelatedLinks> component at the bottom of the page.
 * This addresses the audit finding: orphan pages with no inbound internal links.
 */

export interface RelatedLink {
  href: string;
  label: string;
}

export const RELATED_LINKS: Record<string, RelatedLink[]> = {
  "/genome-editing": [
    { href: "/platform", label: "Platform" },
    { href: "/products/research", label: "Research Products" },
  ],
  "/kill-chain": [
    { href: "/engine", label: "Engines" },
    { href: "/products/oncology", label: "Oncology Products" },
  ],
  "/knowledge-graph": [
    { href: "/platform", label: "Platform" },
    { href: "/docs", label: "Documentation" },
  ],
  "/metastasis-interception": [
    { href: "/engine/target-lock", label: "Target Lock Engine" },
  ],
  "/resistance": [
    { href: "/products/oncology", label: "Oncology Products" },
    { href: "/engine/mechanism-alignment", label: "Mechanism Alignment Engine" },
  ],
  "/target-validation": [
    { href: "/engine/target-lock", label: "Target Lock Engine" },
    { href: "/research", label: "Research" },
  ],
  "/drug-development": [
    { href: "/products/r-d", label: "R&D Products" },
  ],
  "/moa": [
    { href: "/engine/mechanism-alignment", label: "Mechanism Alignment Engine" },
    { href: "/docs", label: "Documentation" },
  ],
  "/insilico": [
    { href: "/products/forge", label: "Forge Product" },
  ],
  "/cohort": [
    { href: "/research", label: "Research" },
    { href: "/products/oncology", label: "Oncology Products" },
  ],
  "/terms": [
    { href: "/privacy", label: "Privacy" },
    { href: "/security", label: "Security overview" },
    { href: "/contact", label: "Contact" },
  ],
  "/security-overview": [
    { href: "/security", label: "Security" },
    { href: "/hipaa-statement", label: "HIPAA statement" },
    { href: "/privacy", label: "Privacy" },
  ],
  "/privacy": [
    { href: "/terms", label: "Terms" },
    { href: "/security", label: "Security" },
    { href: "/hipaa-statement", label: "HIPAA statement" },
  ],
};
