// Define all application routes in one place
export const ROUTES = {
  HOME: '/',
  PRIVACY: '/privacy',
  TERMS: '/terms',
  HIPAA: '/hipaa-statement',
  SECURITY: '/security-overview',
  ABOUT: '/about',
  CAREERS: '/careers',
  BLOG: '/blog',
  
  // Anchor links on main page
  FEATURES: '#features',
  SCIENCE: '#science',
  TEAM: '#team',
  CONTACT: '#contact'
};

// Legal/info pages configuration
export const LEGAL_PAGES = [
  {
    id: 'privacy',
    path: ROUTES.PRIVACY,
    title: 'Privacy Policy',
    filePath: 'privacyPolicy.md',
    subtitle: 'How we collect, use, and protect your information'
  },
  {
    id: 'terms',
    path: ROUTES.TERMS,
    title: 'Terms of Service',
    filePath: 'terms.md',
    subtitle: 'Rules and guidelines for using our platform'
  },
  {
    id: 'hipaa',
    path: ROUTES.HIPAA,
    title: 'HIPAA Statement',
    filePath: 'hipaa.md',
    subtitle: 'Our commitment to protecting health information'
  },
  {
    id: 'security',
    path: ROUTES.SECURITY,
    title: 'Security Overview',
    filePath: 'security.md',
    subtitle: 'How we safeguard your data'
  },
  {
    id: 'about',
    path: ROUTES.ABOUT,
    title: 'About Us',
    filePath: 'company.md',
    subtitle: 'Our mission, vision, and values'
  }
];

// Navigation categories for footer and other sections
export const NAV_CATEGORIES = {
  QUICK_LINKS: [
    { href: ROUTES.FEATURES, label: 'Features' },
    { href: ROUTES.SCIENCE, label: 'Technology' },
    { href: ROUTES.TEAM, label: 'Our Team' },
    { href: ROUTES.CONTACT, label: 'Contact Us' },
    { href: ROUTES.BLOG, label: 'Blog & News' }
  ],
  LEGAL_LINKS: [
    { href: ROUTES.PRIVACY, label: 'Privacy Policy' },
    { href: ROUTES.TERMS, label: 'Terms of Service' },
    { href: ROUTES.HIPAA, label: 'HIPAA Statement' },
    { href: ROUTES.SECURITY, label: 'Security Overview' }
  ],
  COMPANY_LINKS: [
    { href: ROUTES.ABOUT, label: 'About Us' },
    { href: ROUTES.CAREERS, label: 'Careers' }
  ],
  SOCIAL_LINKS: [
    { href: "#", label: "LinkedIn", icon: "FiLinkedin" },
    { href: "#", label: "Twitter", icon: "FiTwitter" },
    { href: "mailto:contact@caspro.dev", label: "Email", icon: "FiMail" }
  ]
}; 