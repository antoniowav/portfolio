import { ProjectsGrid, ProjectsLoading } from '@/components/projects';
import { convertReposToProjects, fetchUserRepositories } from '@/lib/github';
import { Project } from '@/types';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Projects | Antonio Piattelli',
  description: 'Explore the portfolio of projects built by Antonio Piattelli, including web applications, APIs, and more.',
  openGraph: {
    title: 'Projects | Antonio Piattelli Portfolio',
    description: 'Explore the portfolio of projects built by Antonio Piattelli, including web applications, APIs, and more.',
    images: '/images/og-projects.jpg',
  },
};

async function ProjectsContent() {
  // Fetch projects directly from GitHub
  const githubUsername = 'antoniowav';

  // Fetch GitHub repositories
  const repos = await fetchUserRepositories(githubUsername, {
    sort: 'pushed',
    direction: 'desc',
    exclude_forks: true,
    per_page: 100,
  });

  // Convert GitHub repos to Project format
  const githubProjects = convertReposToProjects(repos);

  // Use all GitHub projects
  const allProjects: Project[] = githubProjects;

  return (
    <div className="projects-container">
      <header className="projects-header">
        <h1>Projects</h1>
        <p className="projects-description">
          A collection of my work including personal projects, professional work, and open-source contributions.
          These showcase my experience across frontend, backend, and full-stack development.
        </p>
      </header>

      <ProjectsGrid projects={allProjects} showFilters={true} />
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <main className="projects-page">
      <Suspense fallback={<ProjectsLoading />}>
        <ProjectsContent />
      </Suspense>
    </main>
  );
}
