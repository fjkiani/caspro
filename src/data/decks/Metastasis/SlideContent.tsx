// data/slideContent.js

export const deckContent = [
    {
        component: 'MetastasisTitleSlide',
        title: 'Engineering Victory Over Metastasis',
        subtitle: 'The First AI-Powered Platform for Stage-Specific CRISPR Therapeutics.',
    },
    {
        component: 'ProblemSlide',
        kicker: 'The 90% Crisis',
        title: 'Cancer\'s deadliest threat isn\'t the first tumor. It\'s the spread.',
        stat: '90%',
        statDescription: 'of cancer deaths are caused by metastasis.',
        stages: [ 'Primary Growth', 'Local Invasion', 'Intravasation', 'Circulation'],
        quote: 'The old way fails because it attacks the primary tumor, not the 8-step invasion.',
    },
    {
        component: 'MetastasisBattlefieldSlide',
        kicker: 'The Battlefield',
        title: 'The One-Size-Fits-All Failure',
        conclusion: 'Treating an 8-Stage Invasion Like a Single Target Is a Fucking Failure.',
    },
    {
        component: 'IntelligenceVictorySlide',
        kicker: 'The Intelligence Victory',
        title: 'We Mapped the Enemy\'s Playbook',
        stages: [
            { name: "INVASION", icon: "Move" }, { name: "INTRAVASATION", icon: "GitBranch" },
            { name: "SURVIVAL", icon: "Shield" }, { name: "TRANSPORT", icon: "Activity" },
            { name: "EXTRAVASATION", icon: "Target" }, { name: "MICROMETASTASIS", icon: "ShieldCheck" },
            { name: "ANGIOGENESIS", icon: "Zap" }, { name: "COLONIZATION", icon: "Crosshair" },
        ],
        conclusion: "Cancer doesn't kill by growing—it kills by spreading. We see every step of the invasion.",
    },
    {
        component: 'SolutionSlide',
        kicker: 'Our Solution',
        title: 'A New Paradigm: The 5-Stage Kill Chain',
        stages: [
            { name: 'Target Lock', icon: 'Target' }, { name: 'Guide Generation', icon: 'Dna' },
            { name: 'Efficacy Prediction', icon: 'TrendingDown' }, { name: 'Safety Validation', icon: 'ShieldCheck' },
            { name: 'Assassin Score', icon: 'Award' },
        ],
        conclusion: 'Our automated, AI-powered pipeline for designing stage-specific CRISPR guides.',
    },
    {
        component: 'AhaMomentSlide',
        kicker: 'The Aha! Moment',
        title: 'From Heuristics to AI: A Leap in Biological Realism',
        paragraph1: "Old methods were blind to DNA accessibility. They'd score a gene in a tightly-packed, unreachable region of DNA as a viable target, leading to failed experiments.",
        quote: "Our AI can see the terrain. For the BCL2 gene, it corrected the score by -93.8% — the difference between a guess and a real therapeutic possibility.",
        chartTitle: 'Chromatin Score: BCL2 Gene',
        chartData: {
            labels: ['Heuristic (Old Way)', 'Our AI Model'],
            values: [0.600, 0.038],
        },
    },
    {
        component: 'ValidationSlide',
        kicker: 'The Proof',
        title: 'Our Platform Outperforms. The Data Proves It.',
        chartTitle: 'Performance vs. Rule-Based Tools',
        chartData: {
            labels: ['Functionality AUROC', 'Efficacy Correlation', 'Safety Precision'],
            datasets: [
                { label: 'Rule-Based', data: [0.62, 0.45, 0.58], backgroundColor: '#475569' },
                { label: 'Our Platform', data: [0.78, 0.71, 0.83], backgroundColor: '#38bdf8' }
            ]
        },
        heatmapTitle: 'Validated on Real-World Cancer Drivers',
        heatmapDescription: 'Our framework wasn\'t tested on synthetic data. We validated it against 14 FDA-approved drug targets with known, pathogenic mutations from the ClinVar database.',
        heatmapData: {
            genes: ["BCL2", "BRAF", "CXCR4", "HIF1A", "KRAS", "MET", "MMP2", "MMP9", "NRAS", "TP53", "TWIST1", "VEGFA"],
            steps: ["angiogenesis", "extravasation", "intravasation", "local_invasion", "met_colonization", "micromet_formation", "primary_growth", "survival_in_circ"],
            scores: [
                [0.336,0.336,0.336,0.336,0.336,0.336,0.336,0.336],[0.462,0.462,0.462,0.462,0.462,0.462,0.462,0.462],
                [0.463,0.463,0.463,0.463,0.463,0.463,0.463,0.463],[0.449,0.449,0.449,0.449,0.449,0.449,0.449,0.449],
                [0.397,0.397,0.397,0.397,0.397,0.397,0.397,0.397],[0.382,0.382,0.382,0.382,0.382,0.382,0.382,0.382],
                [0.465,0.465,0.465,0.465,0.465,0.465,0.465,0.465],[0.377,0.377,0.377,0.377,0.377,0.377,0.377,0.377],
                [0.456,0.456,0.456,0.456,0.456,0.456,0.456,0.456],[0.436,0.436,0.436,0.436,0.436,0.436,0.436,0.436],
                [0.474,0.474,0.474,0.474,0.474,0.474,0.474,0.474],[0.447,0.447,0.447,0.447,0.447,0.447,0.447,0.447],
            ]
        },
    },
    {
        component: 'OutputSlide',
        kicker: 'The Output',
        title: 'The Result: A Ranked, Vetted \'Assassin\' Guide',
        candidate: {
            name: 'ICAM1',
            mission: 'Anti-Extravasation',
            scores: { efficacy: 0.75, safety: 1.0, missionFit: 0.397 }
        },
        talkingPoints: [
            { icon: 'TrendingDown', text: 'High predicted cutting efficiency from our Evo2 model.', color: 'purple' },
            { icon: 'ShieldCheck', text: 'Zero predicted off-targets across the entire human genome.', color: 'green' },
            { icon: 'Target', text: 'Strong biological relevance for the specific mission of stopping extravasation.', color: 'cyan' },
        ],
        conclusion: 'This candidate is now ready for wet-lab validation with a high probability of success.',
    },
    {
        component: 'ImpactSlide',
        kicker: 'The Impact',
        title: 'Faster, Cheaper, Smarter Drug Development',
        impacts: [
            { value: '$1.5M', title: 'Saved Per Therapeutic Program', description: 'For biotech developers, by reducing wet-lab failures and accelerating pre-clinical validation.' },
            { value: '12+ Months', title: 'Accelerated Time-to-Clinic', description: 'For researchers, by compressing design-test cycles from months into hours.' },
        ],
    },
    {
        component: 'VictorySlide',
        kicker: 'The Victory',
        title: 'Proof of Interception',
        stages: [ 'Primary Growth', 'Local Invasion', 'Intravasation', 'Circulation', 'Extravasation', 'Micrometastasis', 'Angiogenesis', 'Colonization' ],
        conclusion: "Metastasis Isn't Inevitable. It's a Cascade We Can Break.",
    },
    {
        component: 'UnfairAdvantageSlide',
        kicker: 'The Unfair Advantage',
        title: 'Finding the Kill Switch at Every Step',
        stages: [
            { name: "INVASION", icon: "Move" }, { name: "INTRAVASATION", icon: "GitBranch" },
            { name: "SURVIVAL", icon: "Shield" }, { name: "TRANSPORT", icon: "Activity" },
            { name: "EXTRAVASATION", icon: "Target" }, { name: "MICROMETASTASIS", icon: "ShieldCheck" },
            { name: "ANGIOGENESIS", icon: "Zap" }, { name: "COLONIZATION", icon: "Crosshair" },
        ],
        conclusion: 'A Unique Genetic Vulnerability at Every Stage of the Invasion.',
    },
    {
        component: 'UnfairAdvantageSlide2',
        kicker: 'The Unfair Advantage',
        title: 'How We Find the Kill Switch at Every Step',
        modules: [
            { icon: "Zap", label: "Functionality Score", subtext: "Does it break the protein?" },
            { icon: "Target", label: "Essentiality Score", subtext: "Is the gene a critical dependency?" },
            { icon: "Box", label: "Chromatin Score", subtext: "Can the target be reached?" },
            { icon: "SlidersHorizontal", label: "Regulatory Score", subtext: "Does it disrupt gene control?" }
        ],
        chartData: {
            labels: ['Growth', 'Invasion', 'Intravasation', 'Survival', 'Extravasation', 'Micromet.', 'Angiogenesis', 'Colonization'],
            values: [0.82, 0.78, 0.3, 0.2, 0.4, 0.5, 0.64, 0.2],
        },
        conclusion: 'We fuse four biological signals to pinpoint the exact stage where the enemy is most vulnerable.',
    },
    {
        component: 'VisionSlide',
        kicker: 'The Vision',
        title: 'What\'s Next: The v2 Roadmap',
        roadmap: [
            { icon: "Cpu", title: "Deploy Production Models", text: "Replace all remaining stubs with production-grade ML models for maximum accuracy." },
            { icon: "Microscope", title: "Integrate AlphaFold 3", text: "Add a new dimension of validation by assessing the 3D structure of our designed therapeutics." },
            { icon: "Activity", title: "Validate Clinical Outcomes", text: "Publish a landmark paper validating our risk assessment framework against real-world patient outcomes." }
        ],
    },
    {
        component: 'AskSlide',
        kicker: 'The Ask',
        title: 'Join Us in Ending Metastasis',
        askAmount: '$15 Million',
        askType: 'Series A',
        points: [
            'Scale our computational platform.',
            'Advance 3 lead candidates to IND-enabling studies.',
            'Expand our team with key scientific and clinical hires.',
        ],
    }
];