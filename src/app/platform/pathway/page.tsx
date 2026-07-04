import { notFound } from 'next/navigation';
import CapabilityDeepDive from '@/components/co-pilot-detail/CapabilityDeepDive';
import RelatedLinks from '@/components/shared/RelatedLinks';
import { CAPABILITY_DEEP_DIVE_MAP } from '@/data/capability-deep-dives';
import { BreadcrumbListJsonLd } from '@/components/SEO/BreadcrumbListJsonLd';
import { FaqPageJsonLd } from '@/components/SEO/FaqPageJsonLd';
import { SoftwareApplicationJsonLd } from '@/components/SEO/SoftwareApplicationJsonLd';

const SLUG = 'pathway';
const SITE_URL = 'https://crispro.ai';

export default function PathwayPage() {
  const content = CAPABILITY_DEEP_DIVE_MAP[SLUG];
  if (!content) {
    notFound();
  }

  const canonical = `${SITE_URL}/platform/${SLUG}`;

  return (
    <>
      <BreadcrumbListJsonLd
        id="pathway-breadcrumb-jsonld"
        items={[
          { name: 'Home', item: SITE_URL },
          { name: 'Platform', item: `${SITE_URL}/platform` },
          { name: 'Pathway', item: canonical },
        ]}
      />
      <FaqPageJsonLd
        id="pathway-faq-jsonld"
        entries={content.faq.map((f) => ({ question: f.question, answer: f.answer }))}
      />
      <SoftwareApplicationJsonLd
        id="pathway-software-jsonld"
        name={content.title.split(':')[0]}
        description={content.tagline}
        url={canonical}
        applicationCategory="HealthApplication"
        operatingSystem="Web"
        featureList={content.featureList}
      />
      <CapabilityDeepDive content={content} />
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <RelatedLinks route={`/platform/${SLUG}`} />
      </div>
    </>
  );
}
