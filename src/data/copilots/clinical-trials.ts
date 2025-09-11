
import { CoPilotDetailContent } from '@/types/copilot-types';

export const clinicalTrialsData: CoPilotDetailContent = {
    slug: "clinical-trials",
    pageTitle: "Clinical Trials Co‑Pilot: In‑Silico Trial Matching",
    heroSubtitle: "Find matching trials in minutes. Clear eligibility and a shareable one‑pager (research‑mode).",
    vision: "Turn a patient profile into a short, trustworthy trial shortlist. See who likely fits, why, and what to do next—then share it with one click.",

    // Website value props (plain)
    valueProps: [
      {
        audience: 'For Clinicians & Trial Offices',
        icon: 'Search',
        points: [
          'Fast shortlist: relevant trials in minutes, not days.',
          'Clear eligibility: Likely / Potential / Unlikely with a short “why.”',
          'Shareable one‑pager with sources (RUO).'
        ]
      },
      {
        audience: 'For Research Teams',
        icon: 'Database',
        points: [
          'Fresh results when connected; reliable snapshots otherwise.',
          'Understands synonyms and biomarkers—not just keywords.',
          'Exports and run IDs for clean handoffs and tracking.'
        ]
      }
    ],

    buildsOn: "What this runs on (today vs roadmap)",
    buildsOnStackPoints: [
      "**Today:** Smart trial search and clear eligibility summaries.",
      "**Optional today:** Live refresh; reliable local snapshot fallback.",
      "**Roadmap:** EHR links, guideline cues, multi‑registry feeds."
    ],

    kpis: [
      { label: 'ClinVar AUROC (total n=53,210)', value: '0.957' },
      { label: 'Coding SNVs (n=14,319)', value: '0.957' },
      { label: 'Non‑coding SNVs (n=34,761)', value: '0.958 (SOTA)' },
      { label: 'Coding non‑SNVs (n=1,236)', value: '0.939 (SOTA)' },
      { label: 'Non‑coding non‑SNVs (n=3,894)', value: '0.918' },
      { label: 'SpliceVarDB AUROC (n=4,950)', value: '0.825–0.826' },
      { label: 'Target VUS 40% → 15%', value: '≈$2.1M saved/program' },
      { label: 'Shortlist compression', value: '50+ → 5–12 trials' },
      { label: 'Time‑to‑first‑trial', value: '−60% to −65%' },
      { label: 'Evo2 context window', value: '1M tokens (single‑nucleotide resolution)' }
    ],

    observedOutcomes: [
      {
        title: "Shortlist Compression",
        keyMetric: "50+ → 5–12 trials",
        description: "Shortlists shrink from 50+ to ~5–12 with clear Likely/Potential/Unlikely labels, dramatically reducing decision fatigue and improving focus on viable options.",
        icon: "Target",
        color: "blue"
      },
      {
        title: "Time-to-First-Trial Acceleration",
        keyMetric: "−60% to −65%",
        description: "Time‑to‑first‑trial decreases by ~60–65% in pilot runs, enabling faster patient enrollment and reducing time-to-treatment decisions.",
        icon: "TrendingUp",
        color: "teal"
      },
      {
        title: "Eligibility Clarity Enhancement",
        keyMetric: "Fewer 'unclear' criteria",
        description: "Eligibility clarity improves; fewer 'unclear' due to synonym/biomarker mapping, providing definitive inclusion/exclusion guidance.",
        icon: "ShieldCheck",
        color: "indigo"
      },
      {
        title: "VUS Reduction & Confidence",
        keyMetric: "40% → 15% VUS",
        description: "Confidence improves when variant/evidence signals align (VUS reduced toward ~15%), enabling clearer inclusion/exclusion calls and saving ≈$2.1M/program.",
        icon: "Activity",
        color: "blue"
      },
      {
        title: "Cross-Team Alignment",
        keyMetric: "Shareable one‑pagers",
        description: "Shareable one‑pagers speed cross‑team alignment and patient briefings, reducing communication overhead and improving decision consistency.",
        icon: "Users",
        color: "teal"
      }
    ],

    genomicInsightsOverview: "You get a compact trials view: ranked list, a clear eligibility label, a short ‘why,’ and a shareable summary—plus run ID.",
    coreProblemIntro: "Trial search takes time and returns noise. We bring speed, clarity, and a summary you can act on.",
    coreProblemPoints: [
      "Takes too long to find relevant trials.",
      "Keyword search misses synonyms/biomarkers.",
      "No simple one‑pager to brief patients and boards."
    ],

    genomicUseCasesGrid: [
      { label: "Real‑time extraction (when connected)", iconName: "RefreshCw", color: "text-blue-400" },
      { label: "Semantic trial search", iconName: "Search", color: "text-green-400" },
      { label: "Structured eligibility", iconName: "ListChecks", color: "text-purple-400" },
      { label: "Shareable summary", iconName: "FileText", color: "text-orange-400" }
    ],

    keyCapabilities: [
      {
        title: "Fresh Results (optional)",
        technical: {
          title: "Technical Approach",
          keyMetric: "Live Refresh + Snapshot Fallback",
          description: "Pull new trials when connected; otherwise use a reliable local snapshot.",
          icon: "Settings",
          color: "blue",
          components: [
            { title: "Live Refresh", subtitle: "Real-time trial updates", iconName: "RefreshCw", color: "blue", features: ["Real-time extraction", "Live trial database", "Automatic updates", "Connection monitoring"] },
            { title: "Snapshot Fallback", subtitle: "Reliable local cache", iconName: "Database", color: "teal", features: ["Local trial cache", "Offline capability", "Reliable snapshots", "Data consistency"] },
            { title: "Connection Management", subtitle: "Smart connectivity", iconName: "Activity", color: "indigo", features: ["Connection status", "Automatic fallback", "Error handling", "Retry logic"] }
          ],
          features: ["Live refresh", "Snapshot fallback", "Connection management", "Data consistency"]
        },
        scientific: {
          title: "Scientific Impact",
          keyMetric: "Current Data Access",
          description: "Shortlists stay current without extra work.",
          icon: "Microscope",
          color: "teal",
          components: [
            { title: "Data Freshness", subtitle: "Always current trials", iconName: "Clock", color: "blue", features: ["Real-time updates", "Current trial data", "Fresh results", "Timely information"] },
            { title: "Reliability", subtitle: "Consistent access", iconName: "ShieldCheck", color: "teal", features: ["Reliable access", "Consistent results", "Fallback mechanisms", "Data integrity"] },
            { title: "Efficiency", subtitle: "No manual updates", iconName: "Zap", color: "indigo", features: ["Automated updates", "No manual work", "Seamless operation", "Time savings"] }
          ],
          features: ["Data freshness", "Reliability", "Efficiency", "Automated updates"]
        },
        business: {
          title: "Business Value",
          keyMetric: "Speed + Reliability",
          description: "- **Speed:** Less waiting, more doing.",
          icon: "Briefcase",
          color: "indigo",
          components: [
            { title: "Speed", subtitle: "Less waiting, more doing", iconName: "Zap", color: "blue", features: ["Faster results", "Reduced waiting", "Immediate access", "Time savings"] },
            { title: "Reliability", subtitle: "Consistent performance", iconName: "ShieldCheck", color: "teal", features: ["Consistent access", "Reliable results", "No downtime", "Dependable service"] },
            { title: "Efficiency", subtitle: "Streamlined workflow", iconName: "TrendingUp", color: "indigo", features: ["Workflow optimization", "Process efficiency", "Resource optimization", "Productivity gains"] }
          ],
          features: ["Speed", "Reliability", "Efficiency", "Workflow optimization"]
        },
        genomicUseCasesParagraph: "Today: \n1. **Refresh** when connected; **snapshot** when not."
      },
      {
        title: "Smarter Search & Clear Eligibility",
        technical: {
          title: "Technical Approach",
          keyMetric: "Semantic Search + AI Labeling",
          description: "Understands synonyms and biomarkers; labels each trial as Likely / Potential / Unlikely with a short 'why.'",
          icon: "Settings",
          color: "blue",
          components: [
            { title: "Semantic Search", subtitle: "Understanding context", iconName: "Search", color: "blue", features: ["Context understanding", "Synonym mapping", "Biomarker recognition", "Intelligent search"] },
            { title: "AI Labeling", subtitle: "Likely/Potential/Unlikely", iconName: "Target", color: "teal", features: ["Eligibility scoring", "Confidence levels", "Clear labels", "Rationale generation"] },
            { title: "Explanation Engine", subtitle: "Short 'why' reasoning", iconName: "MessageSquare", color: "indigo", features: ["Reasoning explanation", "Clear rationale", "Transparent logic", "Decision support"] }
          ],
          features: ["Semantic search", "AI labeling", "Explanation engine", "Context understanding"]
        },
        scientific: {
          title: "Scientific Impact",
          keyMetric: "Decision Aid Transformation",
          description: "Turns free‑text criteria into a usable decision aid.",
          icon: "Microscope",
          color: "teal",
          components: [
            { title: "Criteria Interpretation", subtitle: "Free-text to structured", iconName: "FileText", color: "blue", features: ["Text interpretation", "Structured criteria", "Clear requirements", "Standardized format"] },
            { title: "Decision Support", subtitle: "Usable decision aid", iconName: "Target", color: "teal", features: ["Decision guidance", "Clear recommendations", "Actionable insights", "Clinical support"] },
            { title: "Transparency", subtitle: "Explainable AI", iconName: "Eye", color: "indigo", features: ["Transparent reasoning", "Explainable decisions", "Audit trails", "Trust building"] }
          ],
          features: ["Criteria interpretation", "Decision support", "Transparency", "Explainable AI"]
        },
        business: {
          title: "Business Value",
          keyMetric: "Better Matching + Explanation",
          description: "- **Better matching:** Finds relevant trials and explains why.",
          icon: "Briefcase",
          color: "indigo",
          components: [
            { title: "Better Matching", subtitle: "Finds relevant trials", iconName: "Target", color: "blue", features: ["Improved accuracy", "Relevant results", "Better fit", "Quality matching"] },
            { title: "Clear Explanation", subtitle: "Explains why", iconName: "MessageSquare", color: "teal", features: ["Clear reasoning", "Transparent logic", "Understandable results", "Trust building"] },
            { title: "Time Savings", subtitle: "Faster decisions", iconName: "Clock", color: "indigo", features: ["Faster decisions", "Reduced analysis time", "Quick insights", "Efficiency gains"] }
          ],
          features: ["Better matching", "Clear explanation", "Time savings", "Quality results"]
        },
        genomicUseCasesParagraph: "Today: \n1. **Smart search** over titles/summaries/criteria. \n2. **Clear labels** with met/unmet/unclear reasons."
      },
      {
        title: "Knowledge‑Aware Matching",
        technical: {
          title: "Technical Approach",
          keyMetric: "Synonym Maps + Metadata",
          description: "Built‑in synonym maps for genes, variants, and diseases improve recall and consistency.",
          icon: "Settings",
          color: "blue",
          components: [
            { title: "Synonym Mapping", subtitle: "Gene/variant/disease synonyms", iconName: "Database", color: "blue", features: ["Gene synonyms", "Variant mapping", "Disease aliases", "Terminology standardization"] },
            { title: "Metadata Integration", subtitle: "Rich contextual data", iconName: "Layers", color: "teal", features: ["Rich metadata", "Contextual information", "Data enrichment", "Enhanced search"] },
            { title: "Run ID Tracking", subtitle: "Provenance and trust", iconName: "FileText", color: "indigo", features: ["Run ID generation", "Provenance tracking", "Audit trails", "Trust building"] }
          ],
          features: ["Synonym mapping", "Metadata integration", "Run ID tracking", "Terminology standardization"]
        },
        scientific: {
          title: "Scientific Impact",
          keyMetric: "Comparable Results",
          description: "Makes results comparable across runs and teams.",
          icon: "Microscope",
          color: "teal",
          components: [
            { title: "Consistency", subtitle: "Standardized results", iconName: "RefreshCw", color: "blue", features: ["Consistent results", "Standardized output", "Reliable comparisons", "Quality assurance"] },
            { title: "Comparability", subtitle: "Cross-run comparison", iconName: "BarChart", color: "teal", features: ["Cross-run analysis", "Result comparison", "Trend analysis", "Performance tracking"] },
            { title: "Reproducibility", subtitle: "Repeatable outcomes", iconName: "Repeat", color: "indigo", features: ["Reproducible results", "Consistent methodology", "Reliable outcomes", "Scientific rigor"] }
          ],
          features: ["Consistency", "Comparability", "Reproducibility", "Quality assurance"]
        },
        business: {
          title: "Business Value",
          keyMetric: "Consistency + Trust",
          description: "- **Consistency:** Fewer misses, easier review.",
          icon: "Briefcase",
          color: "indigo",
          components: [
            { title: "Consistency", subtitle: "Fewer misses", iconName: "ShieldCheck", color: "blue", features: ["Reduced errors", "Fewer misses", "Consistent quality", "Reliable results"] },
            { title: "Easier Review", subtitle: "Streamlined review", iconName: "Eye", color: "teal", features: ["Simplified review", "Clear presentation", "Easy assessment", "Time savings"] },
            { title: "Trust Building", subtitle: "Reliable outcomes", iconName: "Award", color: "indigo", features: ["Trust building", "Reliable outcomes", "Confidence building", "Quality assurance"] }
          ],
          features: ["Consistency", "Easier review", "Trust building", "Quality assurance"]
        },
        genomicUseCasesParagraph: "Today: \n1. **Synonyms & metadata** improve retrieval; **run ID** adds trust."
      },
      {
        title: "Share & Track",
        technical: {
          title: "Technical Approach",
          keyMetric: "Run ID + Export System",
          description: "Every shortlist has a run ID; export the one‑pager for handoffs.",
          icon: "Settings",
          color: "blue",
          components: [
            { title: "Run ID System", subtitle: "Unique identification", iconName: "Hash", color: "blue", features: ["Unique run IDs", "Traceability", "Audit trails", "Version control"] },
            { title: "Export Engine", subtitle: "One-pager generation", iconName: "Download", color: "teal", features: ["One-pager export", "PDF generation", "Shareable formats", "Document creation"] },
            { title: "Handoff Support", subtitle: "Team collaboration", iconName: "Users", color: "indigo", features: ["Team handoffs", "Collaboration tools", "Shared access", "Workflow integration"] }
          ],
          features: ["Run ID system", "Export engine", "Handoff support", "Traceability"]
        },
        scientific: {
          title: "Scientific Impact",
          keyMetric: "Reusability + Review",
          description: "Simple to reuse and review later.",
          icon: "Microscope",
          color: "teal",
          components: [
            { title: "Reusability", subtitle: "Easy reuse", iconName: "RefreshCw", color: "blue", features: ["Easy reuse", "Template system", "Consistent format", "Efficiency gains"] },
            { title: "Review Capability", subtitle: "Later review", iconName: "Eye", color: "teal", features: ["Later review", "Historical access", "Audit capability", "Quality control"] },
            { title: "Documentation", subtitle: "Complete records", iconName: "FileText", color: "indigo", features: ["Complete records", "Documentation", "Historical tracking", "Compliance support"] }
          ],
          features: ["Reusability", "Review capability", "Documentation", "Quality control"]
        },
        business: {
          title: "Business Value",
          keyMetric: "Shareable + Quick Briefing",
          description: "- **Shareable:** Brief patients and boards quickly.",
          icon: "Briefcase",
          color: "indigo",
          components: [
            { title: "Shareable", subtitle: "Quick sharing", iconName: "Share", color: "blue", features: ["Quick sharing", "Easy distribution", "Team collaboration", "Communication efficiency"] },
            { title: "Quick Briefing", subtitle: "Patient/board briefs", iconName: "MessageSquare", color: "teal", features: ["Quick briefings", "Patient communication", "Board presentations", "Time savings"] },
            { title: "Workflow Integration", subtitle: "Seamless handoffs", iconName: "Workflow", color: "indigo", features: ["Workflow integration", "Seamless handoffs", "Process efficiency", "Team coordination"] }
          ],
          features: ["Shareable", "Quick briefing", "Workflow integration", "Communication efficiency"]
        },
        genomicUseCasesParagraph: "Today: \n1. **Exports** and **run IDs** by default."
      }
    ],

    valuePropositionSections: [
      {
        audience: "For the Care Team",
        points: [
          "Relevant trials in minutes with a simple ‘why’.",
          "Eligibility labeled and explained (RUO).",
          "One‑page, source‑backed brief you can share."
        ]
      }
    ],

    conclusion: "Trial matching that's fast to read and easy to share. Shortlist. Clear eligibility. Sources included (RUO)."
};
