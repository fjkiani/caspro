import { CoPilotDetailContent } from '../../types/copilot-types';

export const scribeIntelligenceData: CoPilotDetailContent = {
  slug: "scribe-intelligence",
  pageTitle: "Scribe Intelligence: Conversational AI Co-Pilot",
  heroSubtitle: "Ask questions naturally, get evidence-backed answers. Progressive disclosure means you get exactly the level of detail you need - start simple and drill down when ready.",

  vision: "Our vision is to eliminate the technical barrier between complex genomic intelligence and clinical decision-making. We deploy conversational AI that understands context, provides progressive disclosure, and delivers audience-appropriate explanations. We make advanced AI accessible to every clinician and researcher.",

  valueProps: [
    {
      audience: 'For Oncologists',
      icon: 'MessageSquare',
      points: [
        'Ask questions in plain English - no technical jargon required.',
        'Get audience-appropriate explanations tailored to your needs.',
        'Progressive disclosure: start simple, drill down when ready.'
      ]
    },
    {
      audience: 'For Patients & Families',
      icon: 'Heart',
      points: [
        'Understand complex genomic findings in simple, reassuring language.',
        'Get answers to questions as they arise during treatment.',
        'Progressive complexity based on your comfort level.'
      ]
    },
    {
      audience: 'For Researchers',
      icon: 'Search',
      points: [
        'Natural language queries for complex genomic analysis.',
        'Context-aware follow-up questions and clarifications.',
        'Multi-intent handling for sophisticated research workflows.'
      ]
    }
  ],

  coreProblemIntro: "The gap between AI capabilities and clinical usability creates significant barriers to adoption. Traditional interfaces require technical expertise and limit the questions users can ask:",
  coreProblemPoints: [
    "**Query Limitations:** Rigid interfaces limit the questions users can ask and how they can ask them.",
    "**Technical Barriers:** Users must understand API structures, technical terminology, and complex workflows.",
    "**Context Blindness:** Systems don't understand user context, audience needs, or progressive information requirements.",
    "**Answer Inflexibility:** One-size-fits-all responses don't adapt to different user expertise levels.",
    "**Follow-up Barriers:** Difficulty asking follow-up questions or clarifying complex topics."
  ],

  keyCapabilities: [
    {
      title: "Natural Language Processing",
      technical: "Advanced NLP with intent classification and context awareness for medical queries.",
      scientific: "Q2C Router automatically routes questions to appropriate analysis endpoints based on intent.",
      business: "Eliminates technical barriers - users ask questions in plain English, get structured responses."
    },
    {
      title: "Progressive Disclosure",
      technical: "Multi-level response architecture with expandable details and follow-up capabilities.",
      scientific: "Information architecture that starts simple and reveals complexity based on user interaction.",
      business: "Users get exactly the level of detail they need, when they need it, without information overload."
    },
    {
      title: "Audience-Appropriate Explanations",
      technical: "LLM-powered response generation with audience-specific formatting and terminology.",
      scientific: "Three distinct explanation modes: clinician (medical terminology), patient (simple analogies), researcher (molecular mechanisms).",
      business: "Each user type gets responses formatted for their expertise level and information needs."
    },
    {
      title: "Context Awareness",
      technical: "Sporadic cancer intelligence, treatment history, and user role integration.",
      scientific: "Maintains conversation state, understands clinical context, and provides role-appropriate guidance.",
      business: "Responses are personalized to user context, clinical situation, and information requirements."
    }
  ],

  buildsOn: "Scribe Intelligence builds on our complete AI stack, providing natural language access to all CrisPRO capabilities:",
  buildsOnStackPoints: [
    "**Unified Orchestration:** Single conversational interface to drugs + trials + food + monitoring + pharmacogenomics.",
    "**Sporadic-Aware Intelligence:** Automatic PARP rescue, IO boost recommendations, and germline exclusion logic.",
    "**Multi-Intent Handling:** Complex questions like 'Can turmeric help with my ovarian cancer?' get integrated responses.",
    "**Follow-up Question Support:** Context-aware responses to questions like 'Why is PARP inhibitor recommended over platinum?'",
    "**End-to-End Conversational Flow:** From initial diagnosis questions to complete care plan recommendations."
  ],

  genomicUseCasesGrid: [
    { "label": "Natural Language Queries", "iconName": "MessageSquare", "color": "text-blue-400" },
    { "label": "Progressive Disclosure", "iconName": "Layers", "color": "text-green-400" },
    { "label": "Audience Explanations", "iconName": "Users", "color": "text-purple-400" },
    { "label": "Context Awareness", "iconName": "Brain", "color": "text-red-400" },
    { "label": "Follow-up Questions", "iconName": "ArrowRight", "color": "text-orange-400" },
    { "label": "Integrated Care Plans", "iconName": "FileText", "color": "text-yellow-400" }
  ],

  valuePropositionSections: [
    {
      audience: "For Clinicians",
      points: [
        "Ask complex questions without learning technical interfaces.",
        "Get explanations you can share directly with patients.",
        "Access complete care plans through natural conversation.",
        "Progressive disclosure prevents information overload.",
        "Context-aware responses understand your clinical workflow."
      ]
    },
    {
      audience: "For Patients",
      points: [
        "Ask questions in plain English about your treatment and prognosis.",
        "Receive explanations using simple analogies and 8th-grade reading level.",
        "Get reassuring, honest answers without medical jargon.",
        "Progressive complexity based on your comfort level.",
        "Direct access to understanding your genomic results."
      ]
    },
    {
      audience: "For Researchers",
      points: [
        "Natural language access to complex genomic analysis workflows.",
        "Multi-intent questions handled seamlessly.",
        "Context-aware follow-up and clarification capabilities.",
        "Integration with existing research tools and databases.",
        "Audience-appropriate explanations for collaboration and publication."
      ]
    }
  ],

  conclusion: "Scribe Intelligence represents the future of human-AI interaction in healthcare: conversational, contextual, and clinically actionable. By combining advanced natural language processing with our complete AI stack, we make sophisticated genomic intelligence accessible to every clinician, patient, and researcher. No more technical barriers - just natural conversation leading to better healthcare decisions."
};
