import { Project, ProjectLink, ProjectImage } from "@/types";

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  homepage: string | null;
  stargazers_count: number;
  watchers_count: number;
  language: string | null;
  forks_count: number;
  open_issues_count: number;
  topics: string[];
  visibility: string;
  default_branch: string;
  fork: boolean;
}

export interface GitHubRepoContent {
  type: string;
  name: string;
  path: string;
  content?: string;
  download_url: string | null;
}

const GITHUB_API_URL = "https://api.github.com";

// Build headers once; include token if provided
function githubHeaders(): Record<string, string> {
  const h: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (process.env.GITHUB_TOKEN) {
    h.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return h;
}

/**
 * Fetches repositories from a GitHub user with ISR caching.
 */
export async function fetchUserRepositories(
  username: string,
  options: {
    sort?: "created" | "updated" | "pushed" | "full_name";
    direction?: "asc" | "desc";
    per_page?: number;
    page?: number;
    type?: "all" | "owner" | "member";
    exclude_forks?: boolean;
    visibility?: "public" | "private" | "internal";
  } = {},
): Promise<GitHubRepo[]> {
  const {
    sort = "pushed",
    direction = "desc",
    per_page = 100,
    page = 1,
    type = "owner",
    exclude_forks = true,
    visibility = "public",
  } = options;

  const url = new URL(`${GITHUB_API_URL}/users/${username}/repos`);
  url.searchParams.append("sort", sort);
  url.searchParams.append("direction", direction);
  url.searchParams.append("per_page", per_page.toString());
  url.searchParams.append("page", page.toString());
  url.searchParams.append("type", type);
  url.searchParams.append("visibility", visibility);

  try {
    // ✅ Use ISR so builds can statically prerender (no DYNAMIC_SERVER_USAGE)
    const response = await fetch(url.toString(), {
      headers: githubHeaders(),
      next: { revalidate: 3600 }, // 1 hour
    });

    if (!response.ok) {
      throw new Error(
        `GitHub API error: ${response.status} ${response.statusText}`,
      );
    }

    let repos: GitHubRepo[] = await response.json();
    if (exclude_forks) repos = repos.filter((repo) => !repo.fork);
    return repos;
  } catch (error) {
    console.error("Error fetching GitHub repositories:", error);
    return [];
  }
}

/**
 * Fetch a repository's README content (Base64-decoded). ISR cached.
 */
export async function fetchRepositoryReadme(
  owner: string,
  repo: string,
): Promise<string | null> {
  try {
    const response = await fetch(
      `${GITHUB_API_URL}/repos/${owner}/${repo}/readme`,
      {
        headers: githubHeaders(),
        next: { revalidate: 3600 },
      },
    );

    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(
        `GitHub API error: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();

    if (data.content) {
      const decoded = Buffer.from(data.content, "base64").toString("utf-8");
      return decoded;
    }

    return null;
  } catch (error) {
    console.error("Error fetching repository README:", error);
    return null;
  }
}

/**
 * Check if a repo contains a given file (ISR cached).
 */
export async function checkRepositoryFile(
  owner: string,
  repo: string,
  path: string,
): Promise<boolean> {
  try {
    const response = await fetch(
      `${GITHUB_API_URL}/repos/${owner}/${repo}/contents/${path}`,
      {
        headers: githubHeaders(),
        next: { revalidate: 3600 },
      },
    );
    return response.ok;
  } catch (error) {
    console.error(`Error checking for file ${path}:`, error);
    return false;
  }
}

/**
 * Convert GitHub repos to your Project type.
 */
export function convertReposToProjects(repos: GitHubRepo[]): Project[] {
  return repos.map((repo) => {
    const links: ProjectLink[] = [
      { type: "repo", url: repo.html_url, label: "View Repository" },
    ];

    if (repo.homepage) {
      links.push({ type: "demo", url: repo.homepage, label: "View Demo" });
    }

    const images: ProjectImage[] = [
      {
        src: `/images/projects/github/${repo.name}.jpg`,
        alt: `${repo.name} preview`,
        width: 800,
        height: 600,
      },
    ];

    return {
      id: repo.name,
      slug: repo.name,
      title: formatRepoName(repo.name),
      summary:
        repo.description ||
        `A ${repo.language || "software"} project hosted on GitHub.`,
      description:
        repo.description ||
        `A ${repo.language || "software"} project hosted on GitHub.`,
      tech:
        repo.topics.length > 0
          ? repo.topics
          : repo.language
            ? [repo.language]
            : ["Software Development"],
      category: determineCategoryFromRepo(repo),
      dateStart: repo.created_at,
      dateEnd: repo.pushed_at,
      impactScore: calculateImpactScore(repo),
      featured: repo.stargazers_count > 0,
      links,
      images,
      sections: {
        overview: {
          title: "Project Overview",
          content:
            repo.description ||
            `A ${repo.language || "software"} project hosted on GitHub.`,
        },
      },
      metadata: {
        readTime: 5,
        difficulty: "intermediate",
        status: "completed",
      },
    };
  });
}

function formatRepoName(repoName: string): string {
  return repoName
    .replace(/[-_]/g, " ")
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function determineCategoryFromRepo(repo: GitHubRepo): string {
  const topics = repo.topics.map((t) => t.toLowerCase());

  if (
    topics.some((t) =>
      ["frontend", "ui", "react", "vue", "angular", "website"].includes(t),
    )
  )
    return "Frontend Development";

  if (topics.some((t) => ["backend", "api", "server", "database"].includes(t)))
    return "Backend Development";

  if (
    topics.some((t) =>
      ["mobile", "android", "ios", "flutter", "react-native"].includes(t),
    )
  )
    return "Mobile Development";

  if (
    topics.some((t) =>
      ["devops", "ci-cd", "docker", "kubernetes", "aws", "cloud"].includes(t),
    )
  )
    return "DevOps";

  if (repo.language) {
    const lang = repo.language.toLowerCase();
    if (
      ["javascript", "typescript", "html", "css", "vue", "react"].includes(lang)
    )
      return "Frontend Development";
    if (
      ["go", "python", "java", "c#", "php", "ruby", "rust", "node"].includes(
        lang,
      )
    )
      return "Backend Development";
    if (["kotlin", "swift", "dart", "objective-c"].includes(lang))
      return "Mobile Development";
  }

  return "Software Development";
}

function calculateImpactScore(repo: GitHubRepo): number {
  let score = 50;
  score += Math.min(25, repo.stargazers_count);
  score += Math.min(15, repo.forks_count * 2);
  score += Math.min(10, repo.watchers_count);
  score -= Math.min(10, repo.open_issues_count / 2);

  const lastUpdated = new Date(repo.pushed_at);
  const now = new Date();
  const monthsAgo =
    (now.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60 * 24 * 30);

  if (monthsAgo < 1) score += 10;
  else if (monthsAgo < 3) score += 5;
  else if (monthsAgo > 12) score -= 10;

  return Math.max(0, Math.min(100, Math.round(score)));
}
