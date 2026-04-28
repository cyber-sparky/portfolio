import { FiGithub, FiStar, FiGitBranch, FiArrowUpRight } from 'react-icons/fi';
import { getTopRepos, GITHUB_USERNAME } from '@/app/lib/github';
import ContributionCalendar from './ContributionCalendar';

const languageColors: Record<string, string> = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Go: '#00ADD8',
  Rust: '#dea584',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  Shell: '#89e051',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Dockerfile: '#384d54',
};

export default async function GitHubActivity() {
  const repos = await getTopRepos(6);

  return (
    <section
      id="github"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative"
      aria-labelledby="github-heading"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section heading (matches site convention) */}
        <div className="mb-10">
          <h2
            id="github-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-bold font-mono text-primary tracking-tight mb-2"
          >
            <span className="text-muted-cyan">03.</span> open_source
          </h2>
          <p className="text-sm sm:text-base text-muted font-sans max-w-2xl">
            Live activity from{' '}
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neon-green hover:text-glow transition-all"
            >
              github.com/{GITHUB_USERNAME}
            </a>{' '}
            — contribution graph and most-starred public repositories.
          </p>
        </div>

        {/* Contribution calendar */}
        <div className="bg-card-bg border border-card-border rounded-lg p-5 sm:p-6 mb-8">
          <div className="text-xs font-mono text-dimmed uppercase tracking-widest mb-4">
            Contribution graph
          </div>
          <ContributionCalendar username={GITHUB_USERNAME} />
        </div>

        {/* Top repos */}
        {repos.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {repos.map((repo) => (
              <a
                key={repo.fullName}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-card-bg border border-card-border rounded-lg p-5 card-hover-glow"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <FiGithub
                      className="w-4 h-4 text-dimmed group-hover:text-neon-green transition-colors shrink-0"
                      aria-hidden="true"
                    />
                    <h3 className="text-sm font-bold font-mono text-primary group-hover:text-neon-green transition-colors truncate">
                      {repo.name}
                    </h3>
                  </div>
                  <FiArrowUpRight
                    className="w-4 h-4 text-faint group-hover:text-neon-green group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all shrink-0"
                    aria-hidden="true"
                  />
                </div>

                <p className="text-xs text-muted font-sans leading-relaxed mb-4 line-clamp-3 min-h-[3rem]">
                  {repo.description || (
                    <span className="text-faint italic">No description</span>
                  )}
                </p>

                <div className="flex items-center gap-3 text-[11px] font-mono text-dimmed">
                  {repo.language && (
                    <span className="flex items-center gap-1.5">
                      <span
                        aria-hidden="true"
                        className="w-2.5 h-2.5 rounded-full"
                        style={{
                          backgroundColor:
                            languageColors[repo.language] || '#888',
                        }}
                      />
                      {repo.language}
                    </span>
                  )}
                  {repo.stars > 0 && (
                    <span className="flex items-center gap-1">
                      <FiStar className="w-3 h-3" aria-hidden="true" />
                      {repo.stars}
                    </span>
                  )}
                  {repo.forks > 0 && (
                    <span className="flex items-center gap-1">
                      <FiGitBranch className="w-3 h-3" aria-hidden="true" />
                      {repo.forks}
                    </span>
                  )}
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="bg-card-bg border border-card-border rounded-lg p-6 text-center">
            <p className="text-sm font-mono text-dimmed">
              GitHub repositories couldn&apos;t be loaded right now.{' '}
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neon-green hover:text-glow"
              >
                View profile →
              </a>
            </p>
          </div>
        )}

        <div className="mt-8 text-center">
          <a
            href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-mono text-muted hover:text-neon-green border border-card-border hover:border-neon-green/30 rounded-md transition-all"
          >
            <FiGithub aria-hidden="true" />
            View all repositories
            <FiArrowUpRight className="text-xs" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
