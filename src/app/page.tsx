import { FeaturedProjects } from '@/components/FeaturedProjects'
import { HeroSection } from '@/components/HeroSection'
import { QuickActions } from '@/components/QuickActions'
import { convertReposToProjects, fetchUserRepositories } from '@/lib/github'
import type { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Home | Antonio Piattelli',
  description:
    'Full-stack developer passionate about creating elegant solutions to complex problems. Experienced in React, TypeScript, Go, and modern web technologies.',
  openGraph: {
    title: 'Antonio Piattelli - Full-Stack Developer',
    description:
      'Full-stack developer passionate about creating elegant solutions to complex problems.',
  },
}

// Loading component for featured projects
function FeaturedProjectsLoading() {
  return (
    <div className="featured-projects-loading">
      <div className="section-heading">
        <h2>Featured Projects</h2>
      </div>
      <div className="projects-grid">
        {[1, 2, 3].map((i) => (
          <div key={i} className="project-card-skeleton">
            <div className="skeleton-image"></div>
            <div className="skeleton-title"></div>
            <div className="skeleton-description"></div>
            <div className="skeleton-tags"></div>
          </div>
        ))}
      </div>
    </div>
  )
}

async function FeaturedProjectsContent() {
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

  // Get the 3 most starred projects as featured
  const featuredProjects = githubProjects
    .filter(project => project.featured)
    .slice(0, 3);

  return <FeaturedProjects projects={featuredProjects} />;
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <QuickActions />
      <Suspense fallback={<FeaturedProjectsLoading />}>
        <FeaturedProjectsContent />
      </Suspense>
    </>
  )
}
