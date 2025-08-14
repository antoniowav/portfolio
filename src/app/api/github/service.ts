import { convertReposToProjects, fetchUserRepositories } from "@/lib/github";
import { Project } from "@/types";

/**
 * Fetches GitHub projects for a specified username
 * @param username GitHub username
 * @returns Array of projects converted from GitHub repositories
 */
export async function getGitHubProjects(username: string): Promise<Project[]> {
  try {
    const repos = await fetchUserRepositories(username, {
      sort: "pushed",
      direction: "desc",
      exclude_forks: true,
      per_page: 100,
    });

    // Convert GitHub repos to project format
    const projects = convertReposToProjects(repos);

    return projects;
  } catch (error) {
    console.error("Error fetching GitHub projects:", error);
    return [];
  }
}

/**
 * Gets all GitHub projects
 * @param username GitHub username
 * @returns Array of projects from GitHub
 */
export async function getAllProjects(username: string): Promise<Project[]> {
  try {
    return await getGitHubProjects(username);
  } catch (error) {
    console.error("Error getting GitHub projects:", error);
    return []; // Return empty array if there's an error
  }
}
