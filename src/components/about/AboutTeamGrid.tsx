import Image from 'next/image';
import { FiGithub, FiGlobe, FiLinkedin, FiMail } from 'react-icons/fi';
import type { CmsTeamMember, CmsTeamMemberLink } from '@/lib/docs/hygraph/about-types';

function LinkIcon({ kind }: { kind: CmsTeamMemberLink['kind'] }) {
  switch (kind) {
    case 'linkedin':
      return <FiLinkedin className="w-4 h-4" />;
    case 'github':
      return <FiGithub className="w-4 h-4" />;
    case 'email':
      return <FiMail className="w-4 h-4" />;
    default:
      return <FiGlobe className="w-4 h-4" />;
  }
}

function memberHref(link: CmsTeamMemberLink): string {
  if (link.kind === 'email' && !link.url.startsWith('mailto:')) {
    return `mailto:${link.url.replace(/^mailto:/i, '')}`;
  }
  return link.url;
}

type AboutTeamGridProps = {
  title: string;
  subtitle: string;
  members: CmsTeamMember[];
};

export default function AboutTeamGrid({ title, subtitle, members }: AboutTeamGridProps) {
  if (!members.length) {
    return (
      <section id="team" className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">{title}</h2>
          <p className="text-slate-600 text-sm sm:text-base">{subtitle}</p>
          <p className="mt-6 text-slate-500 text-sm">
            No published team members yet. Add entries in Hygraph under{' '}
            <span className="font-medium text-slate-700">TeamMember</span>, set{' '}
            <span className="font-medium text-slate-700">order</span>, publish, and attach{' '}
            <span className="font-medium text-slate-700">portfolioAsset</span> rows for links (e.g. title
            &quot;LinkedIn&quot;, projectUrl = profile URL).
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="team" className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">{title}</h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{subtitle}</p>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {members.map((member) => (
            <li
              key={member.id}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4 mb-4">
                {member.imageUrl ? (
                  <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 ring-2 ring-slate-100">
                    <Image
                      src={member.imageUrl}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                ) : (
                  <div
                    className="w-16 h-16 rounded-full shrink-0 bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-bold text-lg"
                    aria-hidden
                  >
                    {member.name
                      .split(/\s+/)
                      .map((p) => p[0])
                      .join('')
                      .slice(0, 2)
                      .toUpperCase()}
                  </div>
                )}
                <div className="min-w-0">
                  <h3 className="text-lg font-bold text-slate-900">{member.name}</h3>
                  {member.role && (
                    <p className="text-sm font-medium text-blue-700 mt-0.5">{member.role}</p>
                  )}
                </div>
              </div>

              {member.bioText && (
                <p className="text-sm text-slate-600 leading-relaxed flex-grow line-clamp-6">
                  {member.bioText}
                </p>
              )}

              {member.stats.length > 0 && (
                <dl className="mt-4 grid grid-cols-2 gap-2">
                  {member.stats.map((stat) => (
                    <div
                      key={`${member.id}-${stat.label}`}
                      className="rounded-lg bg-slate-50 px-3 py-2 border border-slate-100"
                    >
                      <dt className="text-xs text-slate-500">{stat.label}</dt>
                      <dd className="text-sm font-semibold text-slate-800">{stat.value}</dd>
                    </div>
                  ))}
                </dl>
              )}

              {member.links.length > 0 && (
                <div className="flex flex-wrap gap-3 mt-5 pt-4 border-t border-slate-100">
                  {member.links.map((link) => (
                    <a
                      key={`${member.id}-${link.url}`}
                      href={memberHref(link)}
                      target={link.kind === 'email' ? undefined : '_blank'}
                      rel={link.kind === 'email' ? undefined : 'noopener noreferrer'}
                      className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-600 transition-colors"
                      aria-label={`${member.name} — ${link.label}`}
                    >
                      <LinkIcon kind={link.kind} />
                      <span>{link.label}</span>
                    </a>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
