import type { CmsAboutStory } from '@/lib/docs/hygraph/about-types';

type AboutCmsStoryProps = {
  story: CmsAboutStory;
};

export default function AboutCmsStory({ story }: AboutCmsStoryProps) {
  const hasHtml = !!story.html?.trim();

  return (
    <section id="mission" className="py-16 sm:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-4">
          {story.title}
        </h2>
        {story.excerpt && (
          <p className="text-lg text-blue-700 font-medium text-center mb-6">{story.excerpt}</p>
        )}
        {hasHtml ? (
          <div
            className="prose prose-slate max-w-none prose-headings:text-slate-900 prose-a:text-blue-600"
            dangerouslySetInnerHTML={{ __html: story.html! }}
          />
        ) : story.text ? (
          <p className="text-slate-700 leading-relaxed text-base sm:text-lg whitespace-pre-line">
            {story.text}
          </p>
        ) : null}
      </div>
    </section>
  );
}
