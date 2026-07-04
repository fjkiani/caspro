/**
 * Related links map for orphan pages.
 * Each orphan page gets a list of contextually relevant internal links
 * rendered by the <RelatedLinks> component at the bottom of the page.
 * This addresses the audit finding: orphan pages with no inbound internal links.
 *
 * Round 3-D additions: wire R3 evidence/reference destinations
 * (/benchmarks, /glossary, /api/oracle.json, /openapi.json, /llms.txt) into
 * the topical mesh so they gain inbound link equity from hub pages
 * (platform overview, oracle-intelligence, evidence, capability pages).
 */

export interface RelatedLink {
  href: string;
  label: string;
}

export const RELATED_LINKS: Record<string, RelatedLink[]> = {
  // ---- Legacy orphan mesh (pre-R3) ----
  "/genome-editing": [
    { href: "/platform", label: "Platform" },
    { href: "/products/research", label: "Research Products" },
    { href: "/glossary", label: "Glossary" },
  ],
  "/kill-chain": [
    { href: "/engine", label: "Engines" },
    { href: "/products/oncology", label: "Oncology Products" },
  ],
  "/knowledge-graph": [
    { href: "/platform", label: "Platform" },
    { href: "/docs", label: "Documentation" },
    { href: "/openapi.json", label: "OpenAPI spec" },
  ],
  "/metastasis-interception": [
    { href: "/engine/target-lock", label: "Target Lock Engine" },
    { href: "/benchmarks", label: "Oracle benchmarks" },
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
    { href: "/glossary", label: "Glossary: mechanism terms" },
  ],
  "/insilico": [
    { href: "/products/forge", label: "Forge Product" },
  ],
  "/cohort": [
    { href: "/research", label: "Research" },
    { href: "/products/oncology", label: "Oncology Products" },
  ],

  // ---- Round 3-D: R3 destinations gain inbound equity ----

  // Hub → R3 evidence/reference
  "/platform": [
    { href: "/benchmarks", label: "Oracle benchmarks" },
    { href: "/glossary", label: "Glossary: variant & oncology terms" },
    { href: "/evidence", label: "Evidence intelligence" },
  ],
  "/platform/oracle-intelligence": [
    { href: "/benchmarks", label: "Oracle benchmarks (ClinVar, SpliceVarDB, BRCA1)" },
    { href: "/glossary", label: "Glossary: variant terms" },
    { href: "/api/oracle.json", label: "Oracle manifest (JSON)" },
    { href: "/openapi.json", label: "OpenAPI spec" },
  ],
  "/platform/forge-intelligence": [
    { href: "/benchmarks", label: "Oracle benchmarks" },
    { href: "/glossary", label: "Glossary: therapeutic design terms" },
  ],
  "/platform/scribe-intelligence": [
    { href: "/glossary", label: "Glossary: clinical documentation terms" },
    { href: "/openapi.json", label: "OpenAPI spec" },
  ],
  "/platform/crispr-intelligence": [
    { href: "/glossary", label: "Glossary: genome editing terms" },
    { href: "/benchmarks", label: "Oracle benchmarks" },
  ],
  "/evidence": [
    { href: "/benchmarks", label: "Oracle benchmarks" },
    { href: "/glossary", label: "Glossary" },
    { href: "/api/oracle.json", label: "Oracle manifest (JSON)" },
  ],
  "/research": [
    { href: "/benchmarks", label: "Oracle benchmarks" },
    { href: "/glossary", label: "Glossary" },
    { href: "/api/oracle.json", label: "Oracle manifest (JSON)" },
    { href: "/openapi.json", label: "OpenAPI spec" },
  ],
  "/products/oracle": [
    { href: "/benchmarks", label: "Oracle benchmarks" },
    { href: "/platform/oracle-intelligence", label: "Oracle Intelligence platform page" },
    { href: "/glossary", label: "Glossary: variant terms" },
  ],
  "/products/forge": [
    { href: "/platform/forge-intelligence", label: "Forge Intelligence platform page" },
    { href: "/glossary", label: "Glossary: therapeutic design terms" },
  ],

  // ---- Round 3-D: R3 destinations link back to hubs ----
  "/benchmarks": [
    { href: "/platform/oracle-intelligence", label: "Oracle Intelligence" },
    { href: "/products/oracle", label: "Oracle product" },
    { href: "/evidence", label: "Evidence intelligence" },
    { href: "/glossary", label: "Glossary" },
    { href: "/api/oracle.json", label: "Oracle manifest (JSON)" },
  ],
  "/glossary": [
    { href: "/benchmarks", label: "Oracle benchmarks" },
    { href: "/platform/oracle-intelligence", label: "Oracle Intelligence" },
    { href: "/platform", label: "Platform overview" },
    { href: "/api/oracle.json", label: "Oracle manifest (JSON)" },
  ],

  // ---- Round 3-D: 7 capability pages linked back to hubs + evidence ----
  "/platform/agentic-emr": [
    { href: "/platform", label: "Platform overview" },
    { href: "/benchmarks", label: "Oracle benchmarks" },
    { href: "/glossary", label: "Glossary" },
    { href: "/evidence", label: "Evidence intelligence" },
  ],
  "/platform/chemo": [
    { href: "/platform", label: "Platform overview" },
    { href: "/benchmarks", label: "Oracle benchmarks" },
    { href: "/glossary", label: "Glossary" },
    { href: "/platform/therapy-fit", label: "Therapy Fit" },
  ],
  "/platform/clinical-trials": [
    { href: "/platform", label: "Platform overview" },
    { href: "/benchmarks", label: "Oracle benchmarks" },
    { href: "/glossary", label: "Glossary" },
  ],
  "/platform/immunotherapy": [
    { href: "/platform", label: "Platform overview" },
    { href: "/benchmarks", label: "Oracle benchmarks" },
    { href: "/glossary", label: "Glossary" },
    { href: "/platform/toxicity-risk", label: "Toxicity Risk" },
  ],
  "/platform/pathway": [
    { href: "/platform", label: "Platform overview" },
    { href: "/benchmarks", label: "Oracle benchmarks" },
    { href: "/glossary", label: "Glossary" },
  ],
  "/platform/therapy-fit": [
    { href: "/platform", label: "Platform overview" },
    { href: "/benchmarks", label: "Oracle benchmarks" },
    { href: "/glossary", label: "Glossary" },
    { href: "/platform/chemo", label: "Chemo Co-Pilot" },
  ],
  "/platform/toxicity-risk": [
    { href: "/platform", label: "Platform overview" },
    { href: "/benchmarks", label: "Oracle benchmarks" },
    { href: "/glossary", label: "Glossary" },
    { href: "/platform/immunotherapy", label: "Immunotherapy Co-Pilot" },
  ],
};
