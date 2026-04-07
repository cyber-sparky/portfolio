import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import ThemeToggle from '@/app/components/ThemeToggle';
import {
  writeups,
  categoryColors,
  difficultyColors,
} from '@/app/data/writeups';
import type { ContentBlock } from '@/app/data/writeups';

export function generateStaticParams() {
  return writeups.map((w) => ({ slug: w.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const writeup = writeups.find((w) => w.slug === params.slug);
  if (!writeup) return { title: 'Writeup Not Found' };
  return {
    title: `${writeup.title} — ${writeup.ctfName} | cybersparky_`,
    description: writeup.description,
  };
}

function TableOfContents({ blocks }: { blocks: ContentBlock[] }) {
  const headings = blocks
    .filter((b): b is ContentBlock & { type: 'heading' } => b.type === 'heading')
    .map((b) => b.value);

  if (headings.length < 2) return null;

  return (
    <nav className="mb-10 p-5 bg-card-bg border border-card-border rounded-lg">
      <div className="text-xs font-mono text-dimmed uppercase tracking-widest mb-3">
        Table of Contents
      </div>
      <ol className="space-y-1.5">
        {headings.map((h, i) => (
          <li key={i} className="flex gap-2 text-sm font-mono">
            <span className="text-neon-green/50 shrink-0">
              {String(i + 1).padStart(2, '0')}.
            </span>
            <a
              href={`#${h.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
              className="text-muted hover:text-neon-green transition-colors"
            >
              {h}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function ContentRenderer({ blocks }: { blocks: ContentBlock[] }) {
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
                <span className="text-neon-green mr-2">#</span>
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
          case 'image':
            return (
              <figure key={i} className="my-6">
                <div className="rounded-lg overflow-hidden border border-card-border bg-card-bg">
                  <Image
                    src={block.src}
                    alt={block.alt}
                    width={900}
                    height={500}
                    className="w-full h-auto"
                    quality={85}
                  />
                </div>
                {block.alt && (
                  <figcaption className="mt-2 text-xs font-mono text-dimmed text-center">
                    {block.alt}
                  </figcaption>
                )}
              </figure>
            );
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

export default function WriteupDetail({ params }: { params: { slug: string } }) {
  const writeup = writeups.find((w) => w.slug === params.slug);

  if (!writeup) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-bg">
      {/* Top bar */}
      <div className="sticky top-0 z-50 bg-bg/90 backdrop-blur-xl border-b border-card-border">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            href="/writeups"
            className="font-mono text-neon-green text-sm hover:text-glow transition-all"
          >
            ← all writeups
          </Link>
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

      <article className="max-w-4xl mx-auto px-4 sm:px-8 py-10 sm:py-16">
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

        {/* Table of Contents */}
        <TableOfContents blocks={writeup.content} />

        {/* Content */}
        <ContentRenderer blocks={writeup.content} />

        {/* Footer nav */}
        <div className="mt-16 pt-8 border-t border-card-border">
          <Link
            href="/writeups"
            className="inline-flex items-center gap-2 text-sm font-mono text-muted hover:text-neon-green transition-colors"
          >
            ← Back to all writeups
          </Link>
        </div>
      </article>
    </div>
  );
}
