import Link from 'next/link';
import {
  writeups,
  categoryColors,
  type Writeup,
} from '@/app/data/writeups';
import { writeupUrl } from '@/app/lib/domains';
import { readingTime } from '@/app/lib/readingTime';

const MAX_RELATED = 3;

function score(current: Writeup, other: Writeup): number {
  let s = 0;
  if (other.category === current.category) s += 5;
  const tagOverlap = other.tags.filter((t) =>
    current.tags.some((c) => c.toLowerCase() === t.toLowerCase())
  ).length;
  s += tagOverlap * 2;
  if (other.ctfName === current.ctfName) s += 1;
  return s;
}

function pickRelated(current: Writeup): Writeup[] {
  const candidates = writeups
    .filter((w) => w.slug !== current.slug)
    .map((w) => ({ post: w, score: score(current, w) }));

  // Sort by score desc; fall back to newest first when tied or zero.
  candidates.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return b.post.date.localeCompare(a.post.date);
  });

  return candidates.slice(0, MAX_RELATED).map((c) => c.post);
}

export default function RelatedPosts({ current }: { current: Writeup }) {
  const related = pickRelated(current);
  if (related.length === 0) return null;

  return (
    <section
      aria-labelledby="related-posts-heading"
      className="mt-16 pt-10 border-t border-card-border"
    >
      <h2
        id="related-posts-heading"
        className="text-sm font-mono text-dimmed uppercase tracking-widest mb-6"
      >
        <span className="text-neon-green mr-2" aria-hidden="true">~</span>
        Related posts
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((post) => (
          <Link
            key={post.slug}
            href={writeupUrl(post.slug)}
            className="group block bg-card-bg border border-card-border rounded-lg p-4 hover:border-neon-green/30 transition-all duration-300"
          >
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`px-2 py-0.5 text-[10px] font-mono rounded border ${
                  categoryColors[post.category]
                }`}
              >
                {post.category}
              </span>
              <span className="text-[10px] font-mono text-faint">
                {readingTime(post.content).minutes} min read
              </span>
            </div>

            <h3 className="text-sm sm:text-base font-bold font-mono text-primary group-hover:text-neon-green transition-colors mb-1.5 line-clamp-2">
              {post.title}
            </h3>

            <p className="text-[11px] font-mono text-muted-cyan mb-2">
              {post.ctfName}
            </p>

            <p className="text-xs text-muted font-sans leading-relaxed line-clamp-3">
              {post.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
