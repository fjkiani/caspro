// ==============================================================================
// /contact/ — engagement entry point. Vague-safe. Routes to concrete offerings.
// ==============================================================================
import type { VerticalPageData } from '@/components/audience/VerticalSurface';
import { MessagesSquare, ClipboardList, Handshake, Users } from 'lucide-react';

export const CONTACT_PAGE_DATA: VerticalPageData = {
  eyebrow: 'Contact',
  title: 'Talk to the team.',
  subtitle:
    'Every conversation starts with a scoped question, not a form. Pick the surface that fits your engagement, and the reply will come back within one working week.',
  sections: [
    {
      id: 'sponsor',
      label: 'Sponsors',
      eyebrow: 'Channel 1 · Sponsors & BD',
      headline: 'For pharma BD, franchise diligence, and portfolio review.',
      Icon: Handshake,
      body: [
        'For sponsors, BD teams, and franchise strategists, the fastest way in is to send a scoped question (drug + mechanism + population, or franchise + target class). CrisPRO returns a mechanism-alignment audit, a next-step offering, and a scoped engagement letter.',
      ],
      cta: { label: 'See the pipeline of offerings', href: '/pipeline/' },
    },
    {
      id: 'clinical',
      label: 'Clinical',
      eyebrow: 'Channel 2 · Clinical & IST',
      headline: 'For tumor-board leads, IST PIs, and clinical program leads.',
      Icon: ClipboardList,
      body: [
        'For clinical program leads and IST PIs, engagement is typically scoped around a specific mechanism-alignment gate or a retrospective co-stratification question. Academic-hosted engagements can be pro-bono when the ledger already contains the relevant program.',
      ],
      cta: { label: 'See IST Design Support', href: '/pipeline/?offer=ist-design-support' },
    },
    {
      id: 'advocacy',
      label: 'Advocacy',
      eyebrow: 'Channel 3 · Advocacy & patients',
      headline: 'Advocacy engagements are a first-class use case.',
      Icon: Users,
      body: [
        'For advocacy groups and family members working on responder-subgroup arguments or trial-design challenges, CrisPRO runs the analysis pro-bono when the ledger already contains the relevant program. Turnaround typically inside a two-week window.',
      ],
      cta: { label: 'Open the patients hub', href: '/patients/' },
    },
    {
      id: 'general',
      label: 'General',
      eyebrow: 'Channel 4 · General inquiries',
      headline: 'For everything else.',
      Icon: MessagesSquare,
      body: [
        'For press, academic collaboration, guideline participation, or partnership discussions, use the general inquiry channel. Reply within one working week.',
      ],
      cta: { label: 'Open the partners page', href: '/partners/' },
    },
  ],
};
