export const coPilotDetailsData: Record<string, CoPilotDetailContent> = {
    "precision-rad": {
      slug: "precision-rad",
      pageTitle: "PrecisionRad™ Intelligence: Predictive Radiation Oncology",
      heroSubtitle: "In‑silico radiation insight: see how a patient's genetics may respond to radiation—before treatment. Clear signals, confidence, and sources (research‑mode).",
      vision: "Turn genetics into plain, useful guidance for radiation planning: a radiosensitivity hint, a potential side‑effect risk hint, and an audit‑ready summary you can share with your team.",
      
      valueProps: [
        {
          audience: 'For Radiation Oncologists',
          icon: 'Users',
          points: [
            'Know if the tumor looks easier or harder to control with radiation (radiosensitivity hint).',
            'Spot patients who may be more prone to side effects (toxicity risk hint).',
            'Share a one‑page, source‑backed summary to align the team (RUO).'
          ]
        },
        {
          audience: 'For Medical Physicists',
          icon: 'Microscope',
          points: [
            'Add simple biology signals alongside dose metrics—no workflow changes.',
            'Get consistent, auditable outputs with run IDs and sources.',
            'Roadmap: imaging‑driven adaptation hooks when ready.'
          ]
        }
      ],
      
      buildsOn: "What this runs on (today vs roadmap)",
      buildsOnStackPoints: [
        "**Today:** Genetics → simple signals with confidence and sources.",
        "**Today (optional):** Small cohort snapshots to add context.",
        "**Roadmap:** Imaging and treatment‑change hooks."
      ],
      
      genomicInsightsOverview: "Our platform's core S/P/E + insights pipeline (research-mode) personalizes radiation context. It uses live endpoints to estimate radiosensitivity from somatic variants and forecast normal tissue risk from germline context. These signals are transparent and auditable, designed to inform planning discussions (not to prescribe care).",
      
      coreProblemIntro: "Conventional radiotherapy is powerful, but it often treats all patients with the same condition in the same way, failing to account for critical biological differences. PrecisionRad™ Intelligence was built to solve these fundamental challenges:",
      coreProblemPoints: [
        "Same plan for different biology: treatment strength doesn't reflect the tumor's genetics.",
        "Side‑effects are hard to foresee: little visibility into patient‑specific risk.",
        "Data is scattered: hard to turn genetics and history into one clear story."
      ],
      
      genomicUseCasesGrid: [
        { label: "Radiosensitivity hint", iconName: "Activity", color: "text-blue-400" },
        { label: "Toxicity risk hint", iconName: "Shield", color: "text-red-400" },
        { label: "Dose painting (idea)", iconName: "Layers", color: "text-green-400" },
        { label: "VUS context", iconName: "Lightbulb", color: "text-yellow-400" },
        { label: "Therapy fit hint", iconName: "Beaker", color: "text-purple-400" },
        { label: "Cohort context (optional)", iconName: "Users", color: "text-orange-400" }
      ],
      
      keyCapabilities: [
        {
          title: "Biology‑Aware Planning Signals (research‑mode)",
          technical: "Today we show clear radiosensitivity and toxicity hints with confidence and sources in a simple card. Imaging planning is a later phase.",
          scientific: "Signals translate genetics into plain planning context with full provenance. RUO: informs discussion, not medical advice.",
          business: "Increase efficiency with explainable biology alongside dosimetry. Improve quality with consistent, auditable summaries with provenance.",
          genomicUseCasesParagraph: "Research‑mode examples today: Planning context with DDR‑heavy variants (BRCA1/2, ATM, TP53) raising higher‑sensitivity hypothesis; Normal tissue caution with germline variants in repair/inflammation pathways; QA narrative with rationale citing which signals contributed with run IDs."
        },
        {
          title: "Radio‑Genomics & Biomarkers (live now; radiomics = roadmap)",
          technical: "Live: genetics‑first signals with chips, prior checks, and optional cohort context. Roadmap: imaging features to strengthen the picture.",
          scientific: "Today gives simple biology context; imaging comes later.",
          business: "Accelerate research by stratifying patients more effectively for clinical trials. Attract patients seeking advanced, personalized treatment options.",
          genomicUseCasesParagraph: "Today: Tumor radiosensitivity hypothesis from DDR/cell‑cycle/apoptosis variant burden; Normal tissue risk hint from germline context; VUS enrichment to move 'unknown' toward 'understood' for planning context."
        },
        {
          title: "Intelligent Adaptive Radiotherapy (roadmap, Phase II)",
          technical: "Planned: hooks for on‑treatment changes and re‑planning triggers.",
          scientific: "Future: combine imaging changes with biology to prioritize adaptation.",
          business: "Lead in advanced responsive adaptive cancer treatment. Improve patient outcomes through proactive treatment management.",
          genomicUseCasesParagraph: "Roadmap examples: genomic signatures indicating rapid evolution could raise adaptation priority; new variants detected mid‑course could update radiosensitivity hypothesis for re‑planning."
        },
        {
          title: "Outcome & Toxicity Prediction (research concept)",
          technical: "Planned: augment TCP/NTCP style models with genomic risk factors. Today we surface qualitative radiosensitivity/toxicity hypotheses with confidence and evidence tier.",
          scientific: "Current goal: support shared decision‑making with explainable signals; quantitative prognostics are roadmap.",
          business: "Enhance patient counseling with improved communication and personalized predictions. Drive quality improvement using data for internal benchmarking.",
          genomicUseCasesParagraph: "Today: qualitative radiosensitivity and toxicity caution chips inform discussions; future: calibrated TCP/NTCP augmentation with genomic factors."
        },
        {
          title: "Knowledge Integration & Research Support (live, expanding)",
          technical: "Co-Pilot + Evidence services provide literature/ClinVar priors, badges, and rationale with provenance; Cohort Lab adds small extracts/benchmarks. Trials/guidelines automation can be layered as a guidance agent (roadmap).",
          scientific: "Supports evidence‑based practice and research with auditable, multi‑modal context; expands as provider keys and guidance agents come online.",
          business: "Elevate the institution's contribution to oncological knowledge. Attract top talent and research funding through data-driven practice.",
          genomicUseCasesParagraph: "Today: standardized, auditable variant impact signals and priors; near‑term: curated guidance signals (on‑label/guideline stubs) to lift tiers with citations."
        }
      ],
      
      valuePropositionSections: [
        {
          audience: "For the Radiation Oncologist",
          points: [
            "A quick, plain radiosensitivity hint to guide discussion.",
            "A simple toxicity risk hint to plan conservatively when needed.",
            "A one‑page, source‑backed summary you can share (RUO)."
          ]
        },
        {
          audience: "For the Patient",
          points: [
            "Care that considers your genetics—not just imaging.",
            "Clear explanations you can understand and discuss.",
            "Research‑mode tools that aim to reduce risk and uncertainty."
          ]
        },
        {
          audience: "For the Institution",
          points: [
            "Faster, more consistent planning discussions with provenance.",
            "Reusable, auditable outputs for QA and research.",
            "A safe path to imaging‑driven adaptation when ready."
          ]
        }
      ],
      
      conclusion: "In‑silico radiation insight that's simple to read and easy to share. Plain signals. Clear confidence. Sources included. Research‑mode by design."
    }
  }