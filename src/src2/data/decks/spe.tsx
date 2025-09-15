// Consolidated imports for all components in this file
import React, { useMemo, useEffect, useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import {
  FlaskConical, Dna, ArrowRight, FileText, CheckCircle, Lightbulb, Microscope,
  ShieldCheck, GitBranch, BadgeInfo, Stethoscope, Sparkles, Zap, Gem, Lock,
  BookA, CircleCheckBig, GitMerge, Code2, Scale
} from "lucide-react";

// ui/dnaTheme.ts
export const dnaTheme = {
    colors: {
      bg: "bg-slate-950",
      panel: "bg-slate-900/60",
      border: "border-slate-800",
      card: "bg-slate-900/70",
      text: "text-slate-200",
      subtext: "text-slate-300",
      accentA: "from-cyan-400 to-teal-400",
      accentB: "from-purple-400 to-pink-400",
      accentC: "from-emerald-400 to-lime-400",
      dnaCyan: "text-cyan-400",
      dnaIndigo: "text-indigo-400",
      calloutGood: "text-green-400",
      calloutWarn: "text-yellow-400",
      calloutRisk: "text-red-400",
    },
    shadow: "shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)]",
    ring: "ring-1 ring-white/10",
  };
// ui/backgrounds/DNABackground.tsx

export const DNABackground = () => {
  const reduce = useReducedMotion();

  // generate strand offsets for layered depth
  const strands = useMemo(
    () => Array.from({ length: 5 }, (_, i) => ({
      id: i,
      delay: i * 0.6,
      opacity: 0.08 + i * 0.02,
      scale: 1 + i * 0.05,
      blur: i * 2,
    })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* base gradient wash */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/15 via-slate-900 to-slate-950" />
      {/* subtle noise */}
      <div className="absolute inset-0 opacity-[0.07] mix-blend-soft-light pointer-events-none"
           style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 opacity=%220.75%22 width=%224%22 height=%224%22><rect width=%221%22 height=%221%22 fill=%22%23ffffff%22/></svg>')" }} />
      {/* dot grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:18px_18px] opacity-[0.08]" />

      {/* DNA helix layers */}
      {strands.map((s) => (
        <motion.div
          key={s.id}
          className="absolute inset-x-0 top-1/2 -translate-y-1/2"
          initial={{ x: -40, opacity: 0 }}
          animate={{
            x: [ -40, 40, -40 ],
            opacity: s.opacity,
            scale: s.scale,
          }}
          transition={{
            duration: reduce ? 0 : 16 + s.id * 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: reduce ? 0 : s.delay,
          }}
          style={{ filter: `blur(${s.blur}px)` }}
        >
          <DNAStrand height={260 + s.id * 40} amplitude={26 + s.id * 4} />
        </motion.div>
      ))}

      {/* soft vignettes */}
      <div className="absolute -top-24 -left-24 w-[40rem] h-[40rem] rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-[40rem] h-[40rem] rounded-full bg-indigo-500/10 blur-3xl" />
    </div>
  );
};

const DNAStrand = ({ height = 240, amplitude = 24 }:{height?:number; amplitude?:number}) => {
  // simple SVG sine-curve double-helix illusion
  const path = (phase=0) => `
    M 0 ${height/2}
    C 160 ${height/2 - amplitude*Math.cos(phase)}, 320 ${height/2 + amplitude*Math.cos(phase)}, 480 ${height/2}
    C 640 ${height/2 - amplitude*Math.cos(phase)}, 800 ${height/2 + amplitude*Math.cos(phase)}, 960 ${height/2}
  `;
  return (
    <svg viewBox={`0 0 960 ${height}`} className="w-[120rem] mx-auto opacity-90">
      <defs>
        <linearGradient id="dnaA" x1="0" x2="1">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#818cf8" stopOpacity="0.45" />
        </linearGradient>
        <linearGradient id="dnaB" x1="0" x2="1">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.35" />
        </linearGradient>
      </defs>
      <path d={path(0)} stroke="url(#dnaA)" strokeWidth="2" fill="none" />
      <path d={path(Math.PI)} stroke="url(#dnaB)" strokeWidth="2" fill="none" />
    </svg>
  );
};
// ui/Slide.tsx

export const Slide = ({ children }:{children: React.ReactNode}) => (
  <motion.section
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.4 }}
    className={`relative inset-0 min-h-screen ${dnaTheme.colors.bg} text-slate-200 overflow-hidden`}
  >
    <DNABackground />
    <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">{children}</div>
  </motion.section>
);

export const SlideHeader = ({
  title,
  subtitle,
  gradient="from-cyan-400 to-teal-400",
  center=true
}:{title:string; subtitle?:string; gradient?:string; center?:boolean}) => (
  <div className={`space-y-3 ${center ? "text-center" : "text-left"}`}>
    <h1 className={`text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r ${gradient}`}>
      {title}
    </h1>
    {subtitle && (
      <p className="text-xl md:text-2xl font-light text-slate-300">{subtitle}</p>
    )}
  </div>
);
// ui/Primitives.tsx

export const Panel = ({ children }:{children: React.ReactNode}) => (
  <div className={`rounded-2xl ${dnaTheme.colors.panel} ${dnaTheme.colors.border} border ${dnaTheme.shadow} backdrop-blur-md`}>
    {children}
  </div>
);

export const FeatureCard = ({
  icon,
  title,
  body,
  accent="sky",
}:{icon: React.ReactNode; title:string; body:string; accent?: "sky"|"purple"|"green"|"red"|"indigo"}) => {
  const ringMap = {
    sky: "border-sky-500",
    purple: "border-purple-500",
    green: "border-emerald-500",
    red: "border-rose-500",
    indigo: "border-indigo-500",
  } as const;
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.4 }}
      className={`relative p-6 rounded-2xl border ${dnaTheme.colors.border} ${dnaTheme.colors.card}`}
    >
      <div className={`mb-4 inline-flex items-center justify-center rounded-xl border ${ringMap[accent]}/50 bg-black/20 p-3`}>
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-slate-100">{title}</h3>
      <p className="mt-2 text-lg text-slate-300">{body}</p>
    </motion.div>
  );
};

export const FlowStep = ({
  step,
  title,
  body,
  icon,
  accentBorder="border-l-4 border-cyan-500",
}:{step:number; title:string; body:string; icon:React.ReactNode; accentBorder?:string}) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.35 }}
    className={`relative flex items-start gap-4 p-5 rounded-2xl ${dnaTheme.colors.card} border ${dnaTheme.colors.border} ${accentBorder}`}
  >
    <div className="shrink-0">{icon}</div>
    <div>
      <div className="text-slate-400 text-sm font-semibold tracking-wide">Step {step}</div>
      <h4 className="text-xl font-bold text-slate-100">{title}</h4>
      <p className="mt-1 text-slate-300">{body}</p>
    </div>
  </motion.div>
);

export const LiveJsonBlock = ({ code }:{code:string}) => (
  <div className={`relative p-4 md:p-5 rounded-xl ${dnaTheme.colors.card} border ${dnaTheme.colors.border} overflow-auto`}>
    <div className="absolute right-3 top-3 text-[10px] uppercase tracking-wide text-slate-400">Live JSON</div>
    <pre className="text-sm md:text-[15px] leading-relaxed text-slate-200">
      <code>{code}</code>
    </pre>
  </div>
);

export const IconBadge = ({ children }:{children:React.ReactNode}) => (
  <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm bg-white/5 border border-white/10 text-slate-200">
    {children}
  </div>
);


const Brand = () => (
  <div className="absolute bottom-6 right-6 z-20 text-lg font-semibold text-slate-400/80">
    CrisPRO.ai 🧬
  </div>
);

/* Intro */
const IntroSlide = () => (
  <Slide>
    <SlideHeader
      title="The Precision Medicine Dilemma"
      subtitle="Turning a deluge of data into confident clinical guidance."
      gradient="from-teal-400 to-green-400"
    />
    <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-center gap-6">
      <FeatureCard
        icon={<FlaskConical className="text-rose-400" size={48} />}
        title="The Problem"
        body="A flood of research-grade data with no clear path to action."
      />
      <div className="hidden lg:flex items-center justify-center">
        <ArrowRight className="text-slate-400" size={42} />
      </div>
      <FeatureCard
        icon={<CheckCircle className="text-emerald-400" size={48} />}
        title="The Solution"
        body='An evidence-backed "Yes GO" verdict that provides a confident decision boundary.'
      />
    </div>
  </Slide>
);

/* Achievement */
const TheAchievementSlide = () => (
  <Slide>
    <SlideHeader
      title='From Hypothesis to "Yes GO"'
      subtitle="A New Era in Precision Medicine"
      gradient="from-teal-400 to-green-400"
    />
    <div className="max-w-3xl mx-auto mt-10">
      <Panel>
        <div className="p-8 text-center">
          <Sparkles size={56} className="mx-auto text-emerald-400 mb-6" />
          <p className="text-xl text-slate-100">
            We turned a research-grade hypothesis engine into a guidance-first system that returns a clear, evidence-backed clinical verdict: <strong>the "Yes GO"</strong>.
          </p>
          <p className="text-lg text-slate-300 mt-5">
            This shifts from probabilistic signals to actionable, confident guidance.
          </p>
        </div>
      </Panel>
    </div>
  </Slide>
);

/* For Clinicians */
const ForCliniciansSlide = () => (
  <Slide>
    <SlideHeader
      title="For Clinicians: Clarity and Confidence"
      subtitle="Transforming Patient Care on the Front Lines"
      gradient="from-blue-400 to-indigo-400"
    />
    <div className="mt-10 flex flex-col lg:flex-row items-center justify-center gap-8 max-w-5xl mx-auto">
      <FeatureCard
        icon={<Lightbulb size={48} className="text-yellow-400" />}
        title="End Diagnostic Uncertainty"
        body='Get a definitive verdict on a <strong>"Variant of Uncertain Significance" (VUS)</strong> in minutes.'
      />
      <ArrowRight size={40} className="text-slate-400 rotate-90 lg:rotate-0" />
      <FeatureCard
        icon={<Stethoscope size={48} className="text-sky-400" />}
        title="Precision Treatment Selection"
        body="Confirm mutation dependency for high-confidence targeted therapy selection."
      />
      <ArrowRight size={40} className="text-slate-400 rotate-90 lg:rotate-0" />
      <FeatureCard
        icon={<ShieldCheck size={48} className="text-green-400" />}
        title="Proactive Strategy"
        body="Predict efficacy and safety before administration to enable predictive care."
      />
    </div>
  </Slide>
);

/* For Biotechs */
const ForBiotechsSlide = () => (
  <Slide>
    <SlideHeader
      title="For Biotechs: De-Risking R&D"
      subtitle="A Fundamental Shift in Drug Development Economics"
      gradient="from-rose-500 to-orange-500"
    />
    <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-6 max-w-5xl mx-auto">
      <FeatureCard
        icon={<FlaskConical size={48} className="text-rose-400" />}
        title="Eliminate Early-Stage Failure"
        body='Get a decisive "GO/NO-GO" on targets before preclinical spend.'
        accent="red"
      />
      <div className="hidden lg:flex items-center justify-center">
        <ArrowRight className="text-slate-400" size={42} />
      </div>
      <FeatureCard
        icon={<Gem size={48} className="text-purple-400" />}
        title="Engineer Best-in-Class"
        body="Generative tools design therapeutics with superior efficacy and safety."
        accent="purple"
      />
      <div className="hidden lg:flex items-center justify-center">
        <ArrowRight className="text-slate-400" size={42} />
      </div>
      <FeatureCard
        icon={<Zap size={48} className="text-orange-400" />}
        title="Accelerate to Clinic"
        body="Convert risk into a computationally validated, de-risked asset."
        accent="orange"
      />
    </div>
    <div className="max-w-4xl mx-auto mt-10">
      <Panel>
        <p className="p-6 text-left text-lg text-slate-300">
          Transform high-risk R&D into fundable assets with high-certainty evidence and faster discovery-to-clinic timelines.
        </p>
      </Panel>
    </div>
  </Slide>
);

/* Chemotherapy Use-Case */
const ChemotherapySlide = () => (
  <Slide>
    <SlideHeader
      title='Chemotherapy: A "Yes GO" in Action'
      subtitle="Predicting Chemo Sensitivity with AI-Driven Logic"
      gradient="from-sky-400 to-cyan-400"
    />
    <div className="mt-10 space-y-6 max-w-3xl mx-auto">
      <FlowStep
        step={1}
        title="Find the Damage"
        body="Analyze mutations; confirm catastrophic loss-of-function in key repair genes like BRCA1 or TP53."
        icon={<Dna size={42} className="text-rose-400" />}
        accentBorder="border-l-4 border-rose-400"
      />
      <ArrowRight size={36} className="mx-auto text-slate-400 rotate-90" />
      <FlowStep
        step={2}
        title="Confirm the Vulnerability"
        body="Simulate the broken repair state to prove a critical therapeutic vulnerability."
        icon={<Microscope size={42} className="text-yellow-400" />}
        accentBorder="border-l-4 border-yellow-400"
      />
      <ArrowRight size={36} className="mx-auto text-slate-400 rotate-90" />
      <FlowStep
        step={3}
        title='The "Yes GO" Verdict'
        body="Predict high sensitivity to DNA-damaging chemotherapy when the cancer’s shield is down."
        icon={<CheckCircle size={42} className="text-emerald-400" />}
        accentBorder="border-l-4 border-emerald-400"
      />
    </div>
  </Slide>
);

/* Guidance Engine */
const TheGuidanceEngineSlide = () => (
  <Slide>
    <SlideHeader
      title="The Guidance Engine"
      subtitle='Our pipeline for an actionable "Yes GO" verdict'
      gradient="from-sky-400 to-cyan-400"
    />
    <div className="mt-10 flex flex-col items-center gap-8 max-w-2xl mx-auto">
      <FlowStep
        step={1}
        title="Guidance Router"
        body="Core backend orchestrator ensuring reliable delivery."
        icon={<GitBranch size={48} className="text-sky-400" />}
        accentBorder="border-l-4 border-sky-500"
      />
      <ArrowRight size={36} className="text-slate-400 rotate-90" />
      <FlowStep
        step={2}
        title="Clinical Gates"
        body="Server-side rules that translate raw data into tiered recommendations."
        icon={<CheckCircle size={48} className="text-emerald-400" />}
        accentBorder="border-l-4 border-emerald-500"
      />
      <ArrowRight size={36} className="text-slate-400 rotate-90" />
      <FlowStep
        step={3}
        title="FDA Integration"
        body="Align each verdict with FDA and DailyMed guidance for actionability."
        icon={<BadgeInfo size={48} className="text-indigo-400" />}
        accentBorder="border-l-4 border-indigo-500"
      />
    </div>
  </Slide>
);

/* S/P/E Framework */
const TheSPEFrameworkSlide = () => (
  <Slide>
    <SlideHeader
      title="The S/P/E Framework"
      subtitle="Transparent pipeline for unprecedented insights"
      gradient="from-purple-400 to-pink-400"
    />
    <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto text-left">
      <FeatureCard
        icon={<Dna size={48} className="text-sky-400" />}
        title="S: Sequence Disruption"
        body="Calibrated gene-specific scores, exon windows, and functionality predictions measure variant impact."
        accent="sky"
      />
      <FeatureCard
        icon={<GitBranch size={48} className="text-purple-400" />}
        title="P: Pathway Alignment"
        body="MoA-weighted pathway buckets reveal clinically relevant dependencies."
        accent="purple"
      />
      <FeatureCard
        icon={<FileText size={48} className="text-emerald-400" />}
        title="E: External Evidence"
        body="Integrates ClinVar and PubMed context for trusted validation."
        accent="green"
      />
    </div>
    <div className="max-w-5xl mx-auto mt-10">
      <Panel>
        <div className="p-6 flex items-start gap-4">
          <Lock size={48} className="text-rose-400" />
          <div>
            <h3 className="text-2xl font-bold text-slate-100">A Foundation of Trust</h3>
            <p className="text-lg text-slate-300 mt-1">
              Fully auditable outputs with run_signature and transparent rationale for safety and provenance.
            </p>
          </div>
        </div>
      </Panel>
    </div>
  </Slide>
);

/* Trustworthy Evidence Doctrine */
const TrustworthyEvidenceDoctrineSlide = () => (
  <Slide>
    <SlideHeader
      title="Trustworthy Evidence Doctrine (TED)"
      subtitle="Foundation for safe and reproducible variant assessment"
      gradient="from-rose-500 to-purple-500"
    />
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto text-left">
      <FeatureCard
        icon={<CheckCircle size={48} className="text-emerald-400" />}
        title="Evidence-First"
        body="Never overclaim from sequence-only signals; synthesize ClinVar and PubMed context."
        accent="green"
      />
      <FeatureCard
        icon={<Lock size={48} className="text-rose-400" />}
        title="Abstain Over Speculate"
        body='Default to "Unknown" at low confidence unless strong priors justify a nudge.'
        accent="red"
      />
      <FeatureCard
        icon={<FileText size={48} className="text-purple-400" />}
        title="Transparent Discrepancy"
        body="Surface model vs. evidence discordance with reasons and confidence gaps."
        accent="purple"
      />
      <FeatureCard
        icon={<Gem size={48} className="text-orange-400" />}
        title="Full Reproducibility"
        body="Unique run signatures and provenance fields for complete audit trails."
        accent="orange"
      />
    </div>
  </Slide>
);

/* Multiple Myeloma */
const MultipleMyelomaSlide = () => (
  <Slide>
    <SlideHeader
      title="Multiple Myeloma: Live Use-Case"
      subtitle="Predicting drug response with Evo2-grounded signals"
      gradient="from-rose-500 to-purple-500"
    />
    <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto text-left">
      <FeatureCard
        icon={<Dna size={48} className="text-sky-400" />}
        title="Evo2 Delta"
        body='Quantify harmfulness by contextual "surprise"; negative zeta implies greater disruption.'
        accent="sky"
      />
      <FeatureCard
        icon={<GitMerge size={48} className="text-purple-400" />}
        title="Pathway Aggregation"
        body="Aggregate disruption across RAS/MAPK, TP53, and other critical pathways."
        accent="purple"
      />
      <FeatureCard
        icon={<ShieldCheck size={48} className="text-emerald-400" />}
        title="Confidence & Transparency"
        body="Expose confidence metrics; fail fast rather than fabricate."
        accent="green"
      />
    </div>
    <div className="max-w-4xl mx-auto mt-8">
      <Panel>
        <p className="p-6 text-left text-lg text-slate-300">
          Goal: predict therapy response by quantifying per-mutation harm to critical pathways.
        </p>
      </Panel>
    </div>
  </Slide>
);

/* Ovarian Case Study */
const OvarianCaseStudySlide = () => (
  <Slide>
    <SlideHeader
      title="Ovarian Cancer Case Study"
      subtitle="From essentiality to actionable guidance"
      gradient="from-purple-500 to-pink-500"
    />
    <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto items-start">
      <div>
        <h3 className="text-2xl font-bold text-slate-100 mb-3">Live JSON Output</h3>
        <Code2 size={22} className="text-slate-400 mb-3" />
        <LiveJsonBlock
          code={`{
  "essentiality_report": [{
    "gene": "BRCA1",
    "result": { "essentiality_score": 0.35, "confidence": 0.55 }
  }],
  "guidance": {
    "therapy": "BRAF inhibitor",
    "disease": "ovarian cancer",
    "on_label": false,
    "tier": "I",
    "strength": "moderate",
    "efficacy_score": 0.305,
    "confidence": 0.84,
    "rationale": ["MoA alignment: MAPK blockade", "evidence_strength=0.75"],
    "citations": ["40512670", "39845416"],
    "evidence_tier": "supported",
    "badges": ["ClinVar-Strong"]
  }
}`}
        />
      </div>
      <div className="space-y-5">
        <FeatureCard
          icon={<GitMerge size={48} className="text-purple-400" />}
          title="Essentiality ≠ Sensitivity"
          body="Low essentiality can still create new vulnerabilities; guidance layer captures this nuance."
          accent="purple"
        />
        <FeatureCard
          icon={<CheckCircle size={48} className="text-emerald-400" />}
          title="Actionable, Not Probabilistic"
          body='Tier I, high-confidence verdict even off-label; encodes clinical wisdom into clear actions.'
          accent="green"
        />
        <FeatureCard
          icon={<ShieldCheck size={48} className="text-sky-400" />}
          title="Total Transparency"
          body="Show essentiality and guidance rationale side-by-side for trust."
          accent="sky"
        />
      </div>
    </div>
  </Slide>
);

/* Melanoma Case Study */
const MelanomaCaseStudySlide = () => (
  <Slide>
    <SlideHeader
      title='Melanoma Case Study: The "Yes GO" in Action'
      subtitle="Aligning with FDA guidance for clarity"
      gradient="from-purple-500 to-pink-500"
    />
    <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto items-start">
      <div>
        <h3 className="text-2xl font-bold text-slate-100 mb-3">Live JSON Output</h3>
        <Code2 size={22} className="text-slate-400 mb-3" />
        <LiveJsonBlock
          code={`{
  "therapy": "BRAF inhibitor",
  "disease": "melanoma",
  "on_label": true,
  "tier": "I",
  "strength": "moderate",
  "efficacy_score": 0.261,
  "confidence": 0.51,
  "rationale": ["MoA alignment: MAPK blockade", "evidence_strength=0.6"],
  "citations": ["39866931", "40411938", "40484006"],
  "evidence_tier": "consider",
  "badges": [],
  "provenance": { "efficacy_run": "eee0cee0315c" }
}`}
        />
      </div>
      <div className="space-y-5">
        <FeatureCard
          icon={<CircleCheckBig size={48} className="text-emerald-400" />}
          title="Direct FDA Alignment"
          body='On-label status supports a decisive Tier I recommendation.'
          accent="green"
        />
        <FeatureCard
          icon={<GitBranch size={48} className="text-purple-400" />}
          title="Clinical Gating in Action"
          body='Moderate confidence can be promoted by strong evidence and on-label status.'
          accent="purple"
        />
        <FeatureCard
          icon={<FileText size={48} className="text-sky-400" />}
          title="Transparent Provenance"
          body="Citations and rationale make each step auditable."
          accent="sky"
        />
      </div>
    </div>
  </Slide>
);

/* Benchmark Results */
const BenchmarkResultsSlide = () => (
  <Slide>
    <SlideHeader
      title='Benchmark Results: Verifying the "Yes GO"'
      subtitle="Data-driven validation of system performance"
      gradient="from-teal-400 to-green-400"
    />
    <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto items-start">
      <div>
        <h3 className="text-2xl font-bold text-slate-100 mb-3">Live Evaluation Output</h3>
        <Code2 size={22} className="text-slate-400 mb-3" />
        <LiveJsonBlock
          code={`{
  "metrics": { "precision": 0.25, "recall": 0.333, "f1": 0.286 },
  "n": 7,
  "results": [{
    "input": { "disease": "melanoma", "therapy": "BRAF inhibitor", "on_label_truth": "true" },
    "prediction": {
      "therapy": "BRAF inhibitor", "disease": "melanoma", "on_label": true,
      "tier": "I", "strength": "moderate", "confidence": 0.51,
      "provenance": { "efficacy_run": "a02d6a540d4f" }
    }
  }]}
`}
        />
      </div>
      <div className="space-y-5">
        <FeatureCard
          icon={<Scale size={48} className="text-emerald-400" />}
          title="Aligned with Truth Data"
          body="Melanoma BRAF prediction matches ground truth on-label status."
          accent="green"
        />
        <FeatureCard
          icon={<CheckCircle size={48} className="text-purple-400" />}
          title="Confidence and Actionability"
          body='Tier "I" plus on-label translates complex data into clinical action.'
          accent="purple"
        />
        <FeatureCard
          icon={<Microscope size={48} className="text-sky-400" />}
          title="Reproducible Benchmark"
          body="Scripted evals and provenance ensure repeatable results."
          accent="sky"
        />
      </div>
    </div>
  </Slide>
);

/* Logic Flow */
const TheLogicFlowSlide = () => (
  <Slide>
    <SlideHeader
      title="From Data to Decision"
      subtitle="Two-stage process for actionable guidance"
      gradient="from-purple-400 to-pink-400"
    />
    <div className="mt-10 flex flex-col items-center gap-6 max-w-2xl mx-auto">
      <FlowStep
        step={1}
        title="Foundation"
        body="Sequence & MoA, evidence & insights are the base signals."
        icon={<BookA size={36} className="text-slate-300" />}
        accentBorder="border-l-4 border-slate-600"
      />
      <ArrowRight size={32} className="text-slate-400 rotate-90" />
      <FlowStep
        step={2}
        title="Hypothesis Stage"
        body="Generate mechanistic hypotheses from calibrated signals."
        icon={<FlaskConical size={36} className="text-cyan-400" />}
        accentBorder="border-l-4 border-cyan-500"
      />
      <ArrowRight size={32} className="text-slate-400 rotate-90" />
      <FlowStep
        step={3}
        title="Guidance Gating"
        body="Apply clinical gates to promote or abstain with transparency."
        icon={<GitBranch size={36} className="text-purple-400" />}
        accentBorder="border-l-4 border-purple-500"
      />
      <ArrowRight size={32} className="text-slate-400 rotate-90" />
      <FlowStep
        step={4}
        title='"Yes GO" Verdict'
        body="Deliver a concise, auditable recommendation for action."
        icon={<CheckCircle size={36} className="text-emerald-400" />}
        accentBorder="border-l-4 border-emerald-500"
      />
    </div>
  </Slide>
);

const slides = [
  IntroSlide,
  TheAchievementSlide,
  ForCliniciansSlide,
  ForBiotechsSlide,
  ChemotherapySlide,
  TheGuidanceEngineSlide,
  TheSPEFrameworkSlide,
  TrustworthyEvidenceDoctrineSlide,
  MultipleMyelomaSlide,
  OvarianCaseStudySlide,
  MelanomaCaseStudySlide,
  BenchmarkResultsSlide,
  TheLogicFlowSlide,
];

const App = () => {
  const [current, setCurrent] = useState(0);
  const next = () => setCurrent((p) => (p + 1) % slides.length);
  const prev = () => setCurrent((p) => (p - 1 + slides.length) % slides.length);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  const Current = slides[current];

  return (
    <div className="relative w-full h-screen bg-slate-950 overflow-hidden">
      <AnimatePresence mode="wait">
        <Current key={current} />
      </AnimatePresence>
      <Brand />
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-2 bg-slate-900/60 backdrop-blur-md px-3 py-2 rounded-full border border-slate-800">
        <button onClick={prev} className="px-3 py-1.5 text-slate-300 rounded-full hover:bg-white/5">
          &larr;
        </button>
        <span className="text-slate-200/90 font-semibold text-sm">
          Slide {current + 1} / {slides.length}
        </span>
        <button onClick={next} className="px-3 py-1.5 text-slate-300 rounded-full hover:bg-white/5">
          &rarr;
        </button>
      </div>
    </div>
  );
};

export default App;
