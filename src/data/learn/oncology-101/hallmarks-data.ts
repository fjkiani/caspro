export interface Hallmark {
  id: string;
  title: string;
  description: string;
  category: 'core' | 'enabling' | 'emerging';
  icon?: string;
  details?: string;
}

export const hallmarks: Hallmark[] = [
  {
    id: 'sustaining-proliferative-signaling',
    title: 'Sustaining Proliferative Signaling',
    description: 'Cancer cells activate oncogenes ("gas pedal") to constantly command growth and division.',
    category: 'core',
    details: 'Normal cells carefully control when they divide, but cancer cells hijack growth signals to divide continuously.'
  },
  {
    id: 'evading-growth-suppressors',
    title: 'Evading Growth Suppressors',
    description: 'They inactivate tumor suppressor genes ("brakes") to bypass cell cycle checkpoints.',
    category: 'core',
    details: 'Tumor suppressor genes like p53 and Rb normally prevent uncontrolled cell division.'
  },
  {
    id: 'resisting-cell-death',
    title: 'Resisting Cell Death',
    description: 'They avoid apoptosis, making them resistant to stresses that would kill normal cells.',
    category: 'core',
    details: 'Cancer cells develop mechanisms to avoid programmed cell death (apoptosis) even when damaged.'
  },
  {
    id: 'enabling-replicative-immortality',
    title: 'Enabling Replicative Immortality',
    description: 'They activate telomerase to maintain chromosome ends, allowing for unlimited divisions.',
    category: 'core',
    details: 'Normal cells can only divide a limited number of times (Hayflick limit), but cancer cells overcome this.'
  },
  {
    id: 'inducing-angiogenesis',
    title: 'Inducing Angiogenesis',
    description: 'They stimulate the formation of new blood vessels to supply nutrients and oxygen.',
    category: 'core',
    details: 'Tumors need their own blood supply to grow beyond a few millimeters in size.'
  },
  {
    id: 'activating-invasion-metastasis',
    title: 'Activating Invasion & Metastasis',
    description: 'They gain the ability to invade surrounding tissues and spread to distant sites.',
    category: 'core',
    details: 'This is what makes cancer truly dangerous - the ability to spread throughout the body.'
  },
  {
    id: 'deregulating-cellular-metabolism',
    title: 'Deregulating Cellular Metabolism',
    description: 'Cells reprogram energy production via the "Warburg Effect" to favor aerobic glycolysis, prioritizing the creation of biomass for rapid growth over efficient ATP production.',
    category: 'emerging',
    details: 'Cancer cells change how they produce energy, favoring rapid growth over efficiency.'
  },
  {
    id: 'avoiding-immune-destruction',
    title: 'Avoiding Immune Destruction',
    description: 'They evade the immune system by expressing proteins like PD-L1, which acts as an "off switch" for T-cells.',
    category: 'emerging',
    details: 'Cancer cells develop ways to hide from or suppress the immune system.'
  },
  {
    id: 'tumor-promoting-inflammation',
    title: 'Tumor-Promoting Inflammation',
    description: 'Cancer cells create a chronic inflammatory state, recruiting immune cells that fuel tumor growth instead of attacking it.',
    category: 'emerging',
    details: 'Paradoxically, inflammation can both fight and promote cancer depending on the context.'
  },
  {
    id: 'genome-instability-mutation',
    title: 'Genome Instability & Mutation',
    description: 'An enabling characteristic where defects in DNA repair accelerate the mutation rate, speeding up the acquisition of other hallmarks.',
    category: 'enabling',
    details: 'This creates a "mutator phenotype" that accelerates cancer evolution.'
  }
];

export const hallmarkCategories = {
  core: {
    title: 'Core Hallmarks',
    description: 'The original six hallmarks that define cancer behavior',
    color: 'cyan'
  },
  emerging: {
    title: 'Emerging Hallmarks',
    description: 'Additional capabilities that contribute to cancer development',
    color: 'purple'
  },
  enabling: {
    title: 'Enabling Characteristics',
    description: 'Fundamental traits that facilitate the acquisition of other hallmarks',
    color: 'amber'
  }
}; 