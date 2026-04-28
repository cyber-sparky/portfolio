import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ThemeToggle from '@/app/components/ThemeToggle';
import {
  writeups,
  categoryColors,
  difficultyColors,
} from '@/app/data/writeups';
import type { ContentBlock } from '@/app/data/writeups';
import { domains, absoluteWriteupUrl, isValidSlug } from '@/app/lib/domains';
import ShareButtons from './ShareButtons';
import StickyTOC from './StickyTOC';
import RelatedPosts from './RelatedPosts';
import { readingTime } from '@/app/lib/readingTime';
import CopyCodeButton from './CopyCodeButton';
import LightboxImage, { LightboxProvider } from './ImageLightbox';

export function generateStaticParams() {
  return writeups.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!isValidSlug(slug)) return { title: 'Post Not Found' };
  const writeup = writeups.find((w) => w.slug === slug);
  if (!writeup) return { title: 'Post Not Found' };

  const url = absoluteWriteupUrl(writeup.slug);
  const title = `${writeup.title} — ${writeup.ctfName}`;

  return {
    title,
    description: writeup.description,
    keywords: [...writeup.tags, writeup.category, writeup.ctfName, 'cybersparky'],
    authors: [{ name: 'Pranaw M' }],
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'article',
      title,
      description: writeup.description,
      url,
      siteName: 'cybersparky_',
      publishedTime: writeup.date,
      authors: ['Pranaw M'],
      tags: writeup.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: writeup.description,
      creator: '@cybersparky',
    },
  };
}

function extractHeadings(blocks: ContentBlock[]): string[] {
  return blocks
    .filter((b): b is ContentBlock & { type: 'heading' } => b.type === 'heading')
    .map((b) => b.value);
}

function extractImages(
  blocks: ContentBlock[]
): Array<{ src: string; alt: string }> {
  return blocks
    .filter((b): b is ContentBlock & { type: 'image' } => b.type === 'image')
    .map((b) => ({ src: b.src, alt: b.alt }));
}

function ContentRenderer({ blocks }: { blocks: ContentBlock[] }) {
  // Pre-compute block-index -> gallery-index mapping so we don't mutate
  // closure variables during render (React 19 / react-hooks/immutability).
  const imageIndexByBlock = new Map<number, number>();
  let runningIdx = 0;
  blocks.forEach((b, i) => {
    if (b.type === 'image') {
      imageIndexByBlock.set(i, runningIdx);
      runningIdx += 1;
    }
  });

  return (
    <div className="space-y-5">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'heading':
            return (
              <h2
                key={i}
                id={block.value.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
                className="text-xl sm:text-2xl font-bold font-mono text-primary mt-10 mb-3 scroll-mt-20"
              >
                <span className="text-neon-green mr-2" aria-hidden="true">#</span>
                {block.value}
              </h2>
            );
          case 'text':
            return (
              <p key={i} className="text-sm sm:text-base text-muted font-sans leading-relaxed">
                {block.value}
              </p>
            );
          case 'code':
            return (
              <div key={i} className="rounded-lg overflow-hidden border border-card-border">
                <div className="flex items-center justify-between px-4 py-2 bg-terminal-bar border-b border-card-border">
                  <span className="text-[10px] font-mono text-dimmed uppercase tracking-wider">
                    {block.language}
                  </span>
                  <CopyCodeButton code={block.value} />
                </div>
                <pre className="p-4 bg-card-bg overflow-x-auto">
                  <code className="text-xs sm:text-sm font-mono text-secondary whitespace-pre">
                    {block.value}
                  </code>
                </pre>
              </div>
            );
          case 'flag':
            return (
              <div
                key={i}
                className="mt-6 p-4 bg-neon-green/5 border border-neon-green/20 rounded-lg"
              >
                <div className="text-xs font-mono text-dimmed mb-1.5">
                  🚩 Flag
                </div>
                <code className="text-sm sm:text-base font-mono text-neon-green font-bold break-all">
                  {block.value}
                </code>
              </div>
            );
          case 'image': {
            const galleryIndex = imageIndexByBlock.get(i) ?? 0;
            return (
              <figure key={i} className="my-6">
                <LightboxImage
                  src={block.src}
                  alt={block.alt}
                  index={galleryIndex}
                />
                {block.alt && (
                  <figcaption className="mt-2 text-xs font-mono text-dimmed text-center">
                    {block.alt}
                  </figcaption>
                )}
              </figure>
            );
          }
          case 'info':
            return (
              <div
                key={i}
                className="p-4 sm:p-5 bg-card-bg border border-card-border rounded-lg mb-6"
              >
                <div className="text-xs font-mono text-dimmed uppercase tracking-widest mb-3">
                  Challenge Info
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {block.items.map((item) => (
                    <div key={item.label}>
                      <div className="text-[10px] font-mono text-faint uppercase tracking-wider">
                        {item.label}
                      </div>
                      <div className="text-sm font-mono text-secondary mt-0.5">
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          case 'callout': {
            const styles = {
              note: 'border-muted-cyan/30 bg-muted-cyan/5',
              tip: 'border-neon-green/30 bg-neon-green/5',
              warning: 'border-amber-400/30 bg-amber-400/5',
            };
            const icons = { note: '📌', tip: '💡', warning: '⚠️' };
            return (
              <div
                key={i}
                className={`mt-4 p-4 border rounded-lg ${styles[block.variant]}`}
              >
                <div className="text-xs font-mono text-dimmed uppercase tracking-wider mb-1.5">
                  {icons[block.variant]} {block.variant}
                </div>
                <p className="text-sm font-sans text-muted leading-relaxed">
                  {block.value}
                </p>
              </div>
            );
          }
          default:
            return null;
        }
      })}
    </div>
  );
}

export default async function WriteupDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isValidSlug(slug)) {
    notFound();
  }
  const writeup = writeups.find((w) => w.slug === slug);

  if (!writeup) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-bg">
      {/* Top bar */}
      <div className="sticky top-0 z-50 bg-bg/90 backdrop-blur-xl border-b border-card-border">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <a
            href={domains.writeups}
            className="font-mono text-neon-green text-sm hover:text-glow transition-all"
          >
            ← all posts
          </a>
          <div className="flex items-center gap-2">
            {writeup.externalUrl && (
              <a
                href={writeup.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs px-3 py-1.5 border border-card-border text-dimmed rounded hover:border-neon-green/30 hover:text-neon-green transition-all"
              >
                View original ↗
              </a>
            )}
            <ThemeToggle />
          </div>
        </div>
      </div>

      <article id="main" className="max-w-6xl mx-auto px-4 sm:px-8 py-10 sm:py-16">
        {/* Meta */}
        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span
              className={`px-2.5 py-1 text-xs font-mono rounded border ${
                categoryColors[writeup.category]
              }`}
            >
              {writeup.category}
            </span>
            <span
              className={`text-xs font-mono ${difficultyColors[writeup.difficulty]}`}
            >
              {writeup.difficulty}
            </span>
            <span className="text-faint text-xs font-mono">
              {writeup.date}
            </span>
            <span aria-hidden="true" className="text-faint text-xs">·</span>
            <span className="text-faint text-xs font-mono">
              {readingTime(writeup.content).minutes} min read
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-mono text-primary tracking-tight mb-2">
            {writeup.title}
          </h1>

          <p className="text-sm sm:text-base font-mono text-muted-cyan mb-4">
            {writeup.ctfName}
          </p>

          <p className="text-sm sm:text-base text-muted font-sans leading-relaxed">
            {writeup.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mt-4">
            {writeup.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-[10px] font-mono text-dimmed bg-overlay/5 rounded border border-card-border"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <hr className="border-card-border mb-10" />

        {/* Two-column layout: content + sticky TOC sidebar on lg+ */}
        <LightboxProvider images={extractImages(writeup.content)}>
          <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-10 lg:items-start">
            <aside className="lg:order-2">
              <StickyTOC headings={extractHeadings(writeup.content)} />
            </aside>

            <div className="lg:order-1 min-w-0">
              <ContentRenderer blocks={writeup.content} />
            </div>
          </div>
        </LightboxProvider>

        {/* Share buttons */}
        <ShareButtons
          title={`${writeup.title} — ${writeup.ctfName}`}
          url={absoluteWriteupUrl(writeup.slug)}
        />

        {/* Related posts */}
        <RelatedPosts current={writeup} />

        {/* Footer nav */}
        <div className="mt-12 pt-8 border-t border-card-border">
          <a
            href={domains.writeups}
            className="inline-flex items-center gap-2 text-sm font-mono text-muted hover:text-neon-green transition-colors"
          >
            ← Back to all posts
          </a>
        </div>
      </article>
    </div>
  );
}
