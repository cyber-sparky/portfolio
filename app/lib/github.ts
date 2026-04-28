export interface GitHubRepo {
  name: string;
  fullName: string;
  description: string | null;
  url: string;
  stars: number;
  forks: number;
  language: string | null;
  updatedAt: string;
  topics: string[];
}

export const GITHUB_USERNAME = 'cyber-sparky';

const REPOS_ENDPOINT = `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`;

interface GitHubApiRepo {
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  fork: boolean;
  archived: boolean;
  private: boolean;
  topics?: string[];
}

/**
 * Fetch the user's top public repos sorted by star count.
 * Uses ISR (revalidate every hour) so we hit GitHub at most once per hour
 * per build region — well within the 60/hr unauthenticated rate limit.
 *
 * Returns an empty array on failure so the UI degrades gracefully.
 */
export async function getTopRepos(limit = 6): Promise<GitHubRepo[]> {
  try {
    const res = await fetch(REPOS_ENDPOINT, {
      next: { revalidate: 3600 },
      headers: {
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });
    if (!res.ok) return [];

    const repos = (await res.json()) as GitHubApiRepo[];
    return repos
      .filter((r) => !r.fork && !r.archived && !r.private)
      .sort(
        (a, b) =>
          b.stargazers_count - a.stargazers_count ||
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      )
      .slice(0, limit)
      .map(
        (r): GitHubRepo => ({
          name: r.name,
          fullName: r.full_name,
          description: r.description,
          url: r.html_url,
          stars: r.stargazers_count,
          forks: r.forks_count,
          language: r.language,
          updatedAt: r.updated_at,
          topics: r.topics ?? [],
        })
      );
  } catch {
    return [];
  }
}
