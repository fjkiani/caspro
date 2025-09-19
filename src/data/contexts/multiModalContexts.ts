import type { MultiModalContext } from '../types/transformation';

export const multiModalContexts: MultiModalContext = {
  geneEssentiality: {
    biotech: {
      'target-prioritization': {
        title: 'Target Prioritization Across Cell Lines',
        description: 'Identify essential genes with therapeutic window across different cellular contexts',
        applicableProducts: ['oracle', 'forge'],
        data: {
          contexts: [
            { context: { cellLine: 'HeLa', mutations: [] }, score: 0.95 },
            { context: { cellLine: 'K562', mutations: [] }, score: 0.87 },
            { context: { cellLine: 'MCF7', mutations: [] }, score: 0.23 },
            { context: { cellLine: 'HEK293', mutations: [] }, score: 0.15 }
          ]
        },
        businessContext: {
          problem: 'Random target selection leads to 85% therapeutic failure in clinical trials',
          solution: 'Context-specific essentiality scoring identifies targets with optimal therapeutic windows',
          impact: 'Prioritize targets with 10x higher success rate and reduced off-target effects',
          metrics: [
            { label: 'Target success rate', value: '90%', subtitle: 'vs 15% random selection', improvement: '6x improvement' },
            { label: 'Development cost', value: '$2M', subtitle: 'per validated target', improvement: '90% reduction' },
            { label: 'Time to validation', value: '3 months', subtitle: 'vs 18 months traditional', improvement: '6x faster' },
            { label: 'Therapeutic window', value: '20x', subtitle: 'tumor vs normal selectivity', improvement: '4x wider' }
          ]
        }
      },
      'safety-profiling': {
        title: 'Safety Profiling Across Healthy Tissues',
        description: 'Predict off-target effects and toxicity in healthy tissue contexts',
        applicableProducts: ['oracle', 'boltz'],
        data: {
          contexts: [
            { context: { cellLine: 'Hepatocytes', mutations: [] }, score: 0.05 },
            { context: { cellLine: 'Cardiomyocytes', mutations: [] }, score: 0.12 },
            { context: { cellLine: 'Neurons', mutations: [] }, score: 0.08 },
            { context: { cellLine: 'Kidney', mutations: [] }, score: 0.15 }
          ]
        },
        businessContext: {
          problem: 'Unexpected toxicity causes 30% of clinical trial failures and $1B+ losses',
          solution: 'Comprehensive safety profiling across healthy tissue contexts',
          impact: 'Eliminate toxic candidates early and design safer therapeutics',
          metrics: [
            { label: 'Toxicity prediction', value: '95%', subtitle: 'accuracy in preclinical', improvement: 'vs 60% traditional' },
            { label: 'Clinical failure reduction', value: '70%', subtitle: 'fewer safety-related failures', improvement: '$700M saved' },
            { label: 'Safety margin', value: '100x', subtitle: 'therapeutic vs toxic dose', improvement: '10x improvement' }
          ]
        }
      }
    },
    clinical: {
      'tumor-selectivity': {
        title: 'Tumor vs Normal Tissue Selectivity',
        description: 'Identify cancer-specific essential genes for precision targeting',
        applicableProducts: ['oracle', 'forge'],
        data: {
          contexts: [
            { context: { cellLine: 'Tumor (Primary)', mutations: ['TP53', 'KRAS'] }, score: 0.92 },
            { context: { cellLine: 'Tumor (Metastatic)', mutations: ['TP53', 'KRAS', 'PIK3CA'] }, score: 0.89 },
            { context: { cellLine: 'Normal (Adjacent)', mutations: [] }, score: 0.18 },
            { context: { cellLine: 'Normal (Distant)', mutations: [] }, score: 0.12 }
          ]
        },
        businessContext: {
          problem: 'Broad cytotoxicity limits therapeutic options and causes severe side effects',
          solution: 'Tumor-selective essentiality mapping enables precision targeting',
          impact: 'Design therapies with minimal toxicity and maximum efficacy',
          metrics: [
            { label: 'Therapeutic window', value: '50x', subtitle: 'tumor vs normal selectivity', improvement: 'vs 3x standard therapy' },
            { label: 'Patient response rate', value: '75%', subtitle: 'objective response', improvement: 'vs 25% broad therapy' },
            { label: 'Adverse events', value: '-80%', subtitle: 'grade 3+ toxicities', improvement: 'vs standard care' },
            { label: 'Progression-free survival', value: '+12 months', subtitle: 'median improvement', improvement: '2x extension' }
          ]
        }
      },
      'vus-resolution': {
        title: 'VUS Resolution with Zero-Shot Prediction',
        description: 'Transform variants of uncertain significance into actionable pathogenicity classifications',
        applicableProducts: ['oracle'],
        data: {
          contexts: [
            { context: { cellLine: 'BRCA1 Variant', mutations: ['c.123A>T'] }, score: 0.94 },
            { context: { cellLine: 'TP53 Variant', mutations: ['c.456G>A'] }, score: 0.957 },
            { context: { cellLine: 'MSH2 Variant', mutations: ['c.789C>T'] }, score: 0.91 },
            { context: { cellLine: 'APC Variant', mutations: ['c.321T>G'] }, score: 0.939 }
          ]
        },
        businessContext: {
          problem: '50% of genetic variants remain VUS, blocking clinical decision-making',
          solution: 'Zero-shot pathogenicity prediction with 95.7% AUROC accuracy',
          impact: 'Resolve 73% more variants with explainable evidence from Evo2',
          metrics: [
            { label: 'VUS resolution rate', value: '73%', subtitle: 'vs 50% traditional', improvement: '46% more variants resolved' },
            { label: 'ClinVar AUROC', value: '95.7%', subtitle: 'zero-shot accuracy', improvement: 'State-of-the-art performance' },
            { label: 'BRCA1 AUROC', value: '94%', subtitle: 'supervised performance', improvement: 'Clinical-grade accuracy' },
            { label: 'Time to classification', value: '5 min', subtitle: 'vs 6 weeks traditional', improvement: '1,680x faster' }
          ]
        }
      },
      'variant-classification': {
        title: 'VUS Resolution in Genetic Testing',
        description: 'Classify variants of uncertain significance with calibrated confidence scores',
        applicableProducts: ['oracle'],
        data: {
          contexts: [
            { context: { cellLine: 'BRCA1 Variant', mutations: ['c.5266dupC'] }, score: 0.92 },
            { context: { cellLine: 'TP53 Variant', mutations: ['c.742C>T'] }, score: 0.88 },
            { context: { cellLine: 'MLH1 Variant', mutations: ['c.1852_1854del'] }, score: 0.15 },
            { context: { cellLine: 'ATM Variant', mutations: ['c.8147T>C'] }, score: 0.23 }
          ]
        },
        businessContext: {
          problem: '40-60% of genetic variants are classified as VUS, requiring expensive manual review',
          solution: 'Zero-shot variant classification with calibrated pathogenicity scores',
          impact: 'Reduce VUS rate from 40-60% to 15% with automated classification',
          metrics: [
            { label: 'VUS reduction', value: '73%', subtitle: '40-60% → 15% VUS rate', improvement: 'Massive patient impact' },
            { label: 'Turnaround time', value: '24 hours', subtitle: 'vs 2-4 weeks manual', improvement: '12x faster' },
            { label: 'Cost per variant', value: '$5', subtitle: 'vs $150 manual review', improvement: '97% cost reduction' },
            { label: 'Analyst productivity', value: '20x', subtitle: 'cases per week', improvement: 'Throughput revolution' }
          ]
        }
      },
      'resistance-mechanisms': {
        title: 'Drug Resistance Pathway Analysis',
        description: 'Understand essential gene networks driving therapeutic resistance',
        applicableProducts: ['oracle', 'forge', 'boltz'],
        data: {
          contexts: [
            { context: { cellLine: 'Treatment-naive', mutations: [] }, score: 0.85 },
            { context: { cellLine: 'Early resistance', mutations: ['EGFR-T790M'] }, score: 0.45 },
            { context: { cellLine: 'Late resistance', mutations: ['EGFR-T790M', 'MET-amp'] }, score: 0.25 },
            { context: { cellLine: 'Multi-resistant', mutations: ['EGFR-C797S', 'MET-amp', 'PIK3CA'] }, score: 0.15 }
          ]
        },
        businessContext: {
          problem: 'Drug resistance develops in 90% of patients, limiting treatment duration',
          solution: 'Predict resistance pathways and design preemptive combination therapies',
          impact: 'Extend treatment durability and prevent resistance evolution',
          metrics: [
            { label: 'Resistance prediction', value: '6 months early', subtitle: 'before clinical detection', improvement: 'Preemptive intervention' },
            { label: 'Treatment durability', value: '18 months', subtitle: 'median response', improvement: 'vs 6 months monotherapy' },
            { label: 'Combination success', value: '85%', subtitle: 'sustained response', improvement: 'vs 30% sequential' }
          ]
        }
      },
      'crispr-targeting': {
        title: 'CRISPR Guide Design for Essential Genes',
        description: 'Design high-efficacy CRISPR guides targeting context-essential oncogenes',
        applicableProducts: ['oracle', 'forge'],
        data: {
          contexts: [
            { context: { cellLine: 'KRAS-driven NSCLC', mutations: ['KRAS-G12C'] }, score: 0.94 },
            { context: { cellLine: 'EGFR-driven NSCLC', mutations: ['EGFR-L858R'] }, score: 0.89 },
            { context: { cellLine: 'Normal lung epithelium', mutations: [] }, score: 0.12 },
            { context: { cellLine: 'Normal hepatocytes', mutations: [] }, score: 0.08 }
          ]
        },
        businessContext: {
          problem: 'CRISPR therapies fail due to poor guide efficacy and off-target effects',
          solution: 'Combine gene essentiality prediction with CRISPR spacer efficacy optimization',
          impact: 'Design precision CRISPR therapies with 90%+ on-target efficacy and minimal toxicity',
          metrics: [
            { label: 'Guide efficacy', value: '92%', subtitle: 'on-target cutting efficiency', improvement: 'vs 65% random guides' },
            { label: 'Off-target risk', value: '0.3%', subtitle: 'predicted off-target rate', improvement: 'vs 15% unoptimized' },
            { label: 'Therapeutic window', value: '75x', subtitle: 'cancer vs normal selectivity', improvement: 'Safe therapeutic dosing' },
            { label: 'Clinical success rate', value: '85%', subtitle: 'predicted efficacy', improvement: 'vs 35% traditional design' }
          ]
        }
      }
    }
  },
  proteinFunctionalChange: {
    biotech: {
      'therapeutic-optimization': {
        title: 'Therapeutic Protein Engineering',
        description: 'Optimize protein therapeutics for enhanced stability, binding, and function',
        applicableProducts: ['oracle', 'forge'],
        data: {
          function: 0.85,
          stability: 0.92,
          foldingImpact: 0.15,
          notes: 'Enhanced binding affinity with improved thermostability'
        },
        businessContext: {
          problem: 'Protein therapeutics fail due to poor stability, short half-life, and weak binding',
          solution: 'AI-guided protein engineering optimizes multiple properties simultaneously',
          impact: 'Create superior protein drugs with enhanced efficacy and reduced dosing frequency',
          metrics: [
            { label: 'Binding affinity', value: '100x', subtitle: 'improved KD', improvement: 'vs wild-type' },
            { label: 'Protein stability', value: '+40°C', subtitle: 'melting temperature', improvement: 'Room temperature stable' },
            { label: 'Half-life extension', value: '10x', subtitle: 'in vivo duration', improvement: 'Weekly vs daily dosing' },
            { label: 'Manufacturing yield', value: '5x', subtitle: 'protein expression', improvement: '80% cost reduction' }
          ]
        }
      },
      'enzyme-design': {
        title: 'Industrial Enzyme Optimization',
        description: 'Engineer enzymes for improved catalytic efficiency and industrial conditions',
        applicableProducts: ['oracle', 'forge', 'boltz'],
        data: {
          function: 0.95,
          stability: 0.88,
          foldingImpact: 0.08,
          notes: 'Enhanced catalytic efficiency with industrial pH/temperature tolerance'
        },
        businessContext: {
          problem: 'Industrial enzymes lose activity under harsh conditions, limiting applications',
          solution: 'Design robust enzymes that maintain activity in industrial environments',
          impact: 'Enable new industrial processes with improved efficiency and sustainability',
          metrics: [
            { label: 'Catalytic efficiency', value: '50x', subtitle: 'kcat/KM improvement', improvement: 'vs natural enzyme' },
            { label: 'Temperature tolerance', value: '85°C', subtitle: 'optimal activity', improvement: 'vs 37°C natural' },
            { label: 'pH stability', value: '3-11', subtitle: 'active range', improvement: 'vs 6-8 natural' },
            { label: 'Process efficiency', value: '90%', subtitle: 'yield improvement', improvement: '$10M annual savings' }
          ]
        }
      }
    },
    clinical: {
      'resistance-prediction': {
        title: 'Drug Resistance Mutation Prediction',
        description: 'Anticipate resistance mutations and their functional impact before they occur',
        applicableProducts: ['oracle', 'boltz'],
        data: {
          function: -0.65,
          stability: -0.23,
          foldingImpact: -0.45,
          notes: 'Predicted resistance mutation reduces drug binding while maintaining protein function'
        },
        businessContext: {
          problem: 'Drug resistance mutations emerge unpredictably, causing treatment failure',
          solution: 'Predict likely resistance mutations and their functional consequences',
          impact: 'Design resistance-aware therapies and anticipate treatment evolution',
          metrics: [
            { label: 'Resistance prediction accuracy', value: '92%', subtitle: 'clinical validation', improvement: 'vs 45% empirical' },
            { label: 'Treatment planning', value: '6 months early', subtitle: 'resistance anticipation', improvement: 'Proactive vs reactive' },
            { label: 'Combination therapy success', value: '78%', subtitle: 'sustained response', improvement: 'vs 35% monotherapy' },
            { label: 'Patient outcomes', value: '+8 months', subtitle: 'progression-free survival', improvement: 'Resistance-aware design' }
          ]
        }
      },
      'complex-loci-analysis': {
        title: 'Complex Genomic Loci Processing',
        description: 'Handle challenging regions like HLA, immunoglobulin loci, and repetitive elements',
        applicableProducts: ['oracle'],
        data: {
          function: 0.75,
          stability: 0.82,
          foldingImpact: 0.18,
          notes: 'Long-context analysis resolves variants in complex genomic regions'
        },
        businessContext: {
          problem: 'Complex loci have 80% VUS rate due to short-read limitations and manual curation challenges',
          solution: '1M-token context windows enable comprehensive analysis of complex genomic regions',
          impact: 'Resolve variants in previously intractable genomic regions',
          metrics: [
            { label: 'Complex loci success', value: '75%', subtitle: 'vs 20% traditional', improvement: '3.75x improvement' },
            { label: 'Processing time', value: '2 hours', subtitle: 'vs 40 hours manual', improvement: '20x faster' },
            { label: 'Cost reduction', value: '90%', subtitle: 'per complex case', improvement: '$45K → $5K' },
            { label: 'Analyst productivity', value: '20x', subtitle: 'cases per week', improvement: 'Massive throughput gain' }
          ]
        }
      },
      'personalized-medicine': {
        title: 'Patient-Specific Protein Variant Analysis',
        description: 'Assess functional impact of patient-specific protein variants',
        applicableProducts: ['oracle', 'forge'],
        data: {
          function: -0.34,
          stability: 0.12,
          foldingImpact: -0.18,
          notes: 'Patient variant reduces function but maintains structural integrity'
        },
        businessContext: {
          problem: 'Patient genetic variants affect drug response unpredictably',
          solution: 'Analyze functional impact of patient-specific variants on drug targets',
          impact: 'Personalize therapy selection and dosing based on genetic background',
          metrics: [
            { label: 'Response prediction', value: '88%', subtitle: 'accuracy for patient variants', improvement: 'vs 55% population average' },
            { label: 'Dosing optimization', value: '3x', subtitle: 'personalized dose range', improvement: 'Precision vs standard' },
            { label: 'Adverse event reduction', value: '60%', subtitle: 'variant-aware dosing', improvement: 'vs standard protocols' },
            { label: 'Treatment success', value: '85%', subtitle: 'personalized therapy', improvement: 'vs 45% standard' }
          ]
        }
      },
      'variant-impact-correlation': {
        title: 'Variant Impact to Protein Function Correlation',
        description: 'Connect genomic variant predictions with protein-level functional consequences',
        applicableProducts: ['oracle'],
        data: {
          function: -0.89,
          stability: -0.45,
          foldingImpact: 0.76,
          notes: 'High-impact variant (Δ likelihood: -2.34) correlates with severe protein dysfunction'
        },
        businessContext: {
          problem: 'Genomic variants and protein function predictions are analyzed in isolation',
          solution: 'Integrate variant impact prediction with protein functionality analysis',
          impact: 'Provide comprehensive molecular understanding from DNA to protein to phenotype',
          metrics: [
            { label: 'Prediction correlation', value: '94%', subtitle: 'variant impact vs protein function', improvement: 'Molecular consistency' },
            { label: 'Mechanistic insight', value: '85%', subtitle: 'variants with explained mechanism', improvement: 'vs 30% traditional' },
            { label: 'Clinical actionability', value: '78%', subtitle: 'variants with therapeutic implications', improvement: 'vs 25% sequence-only' },
            { label: 'Drug development success', value: '3x', subtitle: 'target validation rate', improvement: 'Mechanism-informed design' }
          ]
        }
      }
    }
  },
  chromatinAccessibility: {
    biotech: {
      'enhancer-design': {
        title: 'Tissue-Specific Enhancer Engineering',
        description: 'Design regulatory elements for precise tissue-specific gene expression',
        applicableProducts: ['oracle', 'forge'],
        data: {
          context: 'Liver-specific expression',
          points: [
            { pos: 10, score: 0.95 },
            { pos: 25, score: 0.87 },
            { pos: 45, score: 0.23 },
            { pos: 60, score: 0.15 },
            { pos: 80, score: 0.92 }
          ]
        },
        businessContext: {
          problem: 'Gene therapies lack tissue specificity, causing off-target expression and toxicity',
          solution: 'Engineer tissue-specific enhancers for precise therapeutic gene expression',
          impact: 'Create safer gene therapies with targeted expression and reduced side effects',
          metrics: [
            { label: 'Tissue specificity', value: '100x', subtitle: 'target vs off-target', improvement: 'vs 5x viral promoters' },
            { label: 'Expression level', value: '50x', subtitle: 'enhanced transcription', improvement: 'vs minimal promoters' },
            { label: 'Safety margin', value: '20x', subtitle: 'therapeutic window', improvement: 'Reduced toxicity risk' },
            { label: 'Gene therapy efficacy', value: '90%', subtitle: 'target tissue coverage', improvement: 'vs 30% broad expression' }
          ]
        }
      },
      'promoter-optimization': {
        title: 'Synthetic Promoter Design',
        description: 'Create optimized promoters for enhanced gene expression in specific contexts',
        applicableProducts: ['oracle', 'forge', 'boltz'],
        data: {
          context: 'High-expression synthetic promoter',
          points: [
            { pos: 5, score: 0.88 },
            { pos: 15, score: 0.95 },
            { pos: 30, score: 0.92 },
            { pos: 50, score: 0.85 },
            { pos: 70, score: 0.78 }
          ]
        },
        businessContext: {
          problem: 'Natural promoters provide insufficient expression levels for therapeutic applications',
          solution: 'Design synthetic promoters with optimized regulatory element combinations',
          impact: 'Achieve therapeutic expression levels with predictable, tunable activity',
          metrics: [
            { label: 'Expression enhancement', value: '25x', subtitle: 'vs natural promoters', improvement: 'Therapeutic levels achieved' },
            { label: 'Tunability range', value: '100x', subtitle: 'dynamic expression control', improvement: 'Dose-dependent therapy' },
            { label: 'Consistency', value: '95%', subtitle: 'expression reproducibility', improvement: 'vs 60% natural variation' },
            { label: 'Manufacturing efficiency', value: '5x', subtitle: 'protein production yield', improvement: '80% cost reduction' }
          ]
        }
      }
    },
    clinical: {
      'regulatory-variants': {
        title: 'Regulatory Variant Impact Assessment',
        description: 'Understand how patient variants affect chromatin accessibility and gene regulation',
        applicableProducts: ['oracle'],
        data: {
          context: 'Patient regulatory variant analysis',
          points: [
            { pos: 12, score: 0.75 },
            { pos: 28, score: 0.45 },
            { pos: 42, score: 0.88 },
            { pos: 58, score: 0.32 },
            { pos: 75, score: 0.67 }
          ]
        },
        businessContext: {
          problem: 'Regulatory variants affect gene expression unpredictably, complicating diagnosis',
          solution: 'Predict chromatin accessibility changes from patient regulatory variants',
          impact: 'Understand disease mechanisms and personalize treatment based on regulatory profile',
          metrics: [
            { label: 'Variant interpretation', value: '85%', subtitle: 'regulatory VUS resolved', improvement: 'vs 20% traditional methods' },
            { label: 'Expression prediction', value: '78%', subtitle: 'accuracy for variant effects', improvement: 'vs 35% sequence-only' },
            { label: 'Disease mechanism insight', value: '90%', subtitle: 'regulatory pathways identified', improvement: 'Novel therapeutic targets' },
            { label: 'Treatment personalization', value: '65%', subtitle: 'patients with actionable insights', improvement: 'vs 15% standard analysis' }
          ]
        }
      },
      'assay-design': {
        title: 'Quality Control Assay Design',
        description: 'Generate synthetic positive and negative controls for genetic testing assay validation',
        applicableProducts: ['forge', 'oracle'],
        data: {
          context: 'Assay control design',
          points: [
            { pos: 10, score: 0.95 },
            { pos: 25, score: 0.88 },
            { pos: 40, score: 0.92 },
            { pos: 60, score: 0.15 },
            { pos: 80, score: 0.05 }
          ]
        },
        businessContext: {
          problem: 'Manual control design costs $50K per panel and fails 30% of the time due to population bias',
          solution: 'AI-designed synthetic controls with population-aware optimization',
          impact: 'Robust assay validation with 90% cost reduction and 95% population coverage',
          metrics: [
            { label: 'Control design cost', value: '$5K', subtitle: 'vs $50K manual', improvement: '90% cost reduction' },
            { label: 'Validation time', value: '2 weeks', subtitle: 'vs 6 months', improvement: '12x faster' },
            { label: 'Population coverage', value: '95%', subtitle: 'vs 70% manual', improvement: 'Global applicability' },
            { label: 'Assay failure rate', value: '5%', subtitle: 'vs 30% traditional', improvement: '6x more reliable' }
          ]
        }
      },
      'epigenetic-therapy': {
        title: 'Epigenetic Drug Target Identification',
        description: 'Identify chromatin accessibility patterns for epigenetic therapeutic targeting',
        applicableProducts: ['oracle', 'forge'],
        data: {
          context: 'Cancer epigenetic landscape',
          points: [
            { pos: 8, score: 0.92 },
            { pos: 22, score: 0.15 },
            { pos: 38, score: 0.87 },
            { pos: 55, score: 0.23 },
            { pos: 72, score: 0.91 }
          ]
        },
        businessContext: {
          problem: 'Epigenetic changes drive cancer but are difficult to target therapeutically',
          solution: 'Map chromatin accessibility to identify druggable epigenetic vulnerabilities',
          impact: 'Develop epigenetic therapies that reverse cancer-driving chromatin changes',
          metrics: [
            { label: 'Druggable targets identified', value: '15', subtitle: 'novel epigenetic vulnerabilities', improvement: 'vs 3 known targets' },
            { label: 'Therapeutic window', value: '30x', subtitle: 'cancer vs normal selectivity', improvement: 'Reduced toxicity' },
            { label: 'Combination potential', value: '85%', subtitle: 'synergy with existing drugs', improvement: 'Enhanced efficacy' },
            { label: 'Patient stratification', value: '70%', subtitle: 'epigenetic biomarker positive', improvement: 'Precision medicine approach' }
          ]
        }
      },
      'crispr-accessibility': {
        title: 'CRISPR Accessibility Optimization',
        description: 'Predict chromatin accessibility for optimal CRISPR guide delivery and cutting efficiency',
        applicableProducts: ['oracle', 'forge'],
        data: {
          context: 'CRISPR target accessibility analysis',
          points: [
            { pos: 15, score: 0.89 },
            { pos: 30, score: 0.95 },
            { pos: 45, score: 0.23 },
            { pos: 60, score: 0.78 },
            { pos: 85, score: 0.92 }
          ]
        },
        businessContext: {
          problem: 'CRISPR efficiency varies 100x due to chromatin accessibility differences',
          solution: 'Predict chromatin accessibility to optimize CRISPR guide design and delivery',
          impact: 'Achieve consistent CRISPR efficiency across diverse genomic targets',
          metrics: [
            { label: 'CRISPR efficiency prediction', value: '85%', subtitle: 'correlation with experimental', improvement: 'vs 40% sequence-only' },
            { label: 'Guide success rate', value: '90%', subtitle: 'accessible targets', improvement: 'vs 45% random selection' },
            { label: 'Delivery optimization', value: '5x', subtitle: 'improved targeting', improvement: 'Context-aware delivery' },
            { label: 'Therapeutic window', value: '20x', subtitle: 'on vs off-target accessibility', improvement: 'Enhanced safety' }
          ]
        }
      }
    }
  }
};

export default multiModalContexts; 