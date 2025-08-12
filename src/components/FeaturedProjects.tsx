'use client'

import type { Project } from '@/types'
import Button from '@/ui/Button'
import { ProjectCard } from '@/ui/Card'

interface FeaturedProjectsProps {
  projects: Project[]
  className?: string
}

export const FeaturedProjects = ({
  projects,
  className = '',
}: FeaturedProjectsProps) => {
  if (!projects || projects.length === 0) {
    return null
  }

  return (
    <section className={`py-16 bg-bg-primary ${className}`}>
      <div className="container">
        {/* Section Header */}
        <div className="mb-12 flex items-start justify-start flex-col">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="text-accent-primary font-mono text-sm">$</span>
            <span className="text-text-tertiary font-mono text-sm">
              ls -la ~/projects/featured
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-mono font-semibold text-text-primary mb-4">
            Featured Projects
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto leading-relaxed">
            A curated selection of projects that showcase my skills and passion
            for building innovative solutions with modern technologies.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProjectCard project={project} className="h-full" />
            </div>
          ))}
        </div>

        {/* Terminal Output Style Summary */}
        <div className="bg-bg-secondary border border-border rounded p-6 mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-accent-primary font-mono text-sm">$</span>
            <span className="text-text-primary font-mono text-sm">
              cat projects_summary.txt
            </span>
          </div>

          <div className="space-y-2 font-mono text-sm">
            <div className="text-text-secondary">
              <span className="text-success">✓</span> {projects.length} featured
              projects loaded
            </div>
            <div className="text-text-secondary">
              <span className="text-success">✓</span> Technologies:{' '}
              {Array.from(new Set(projects.flatMap(p => p.tech)))
                .slice(0, 5)
                .join(', ')}
              {Array.from(new Set(projects.flatMap(p => p.tech))).length > 5 &&
                ', +more'}
            </div>
            <div className="text-text-secondary">
              <span className="text-success">✓</span> Impact score:{' '}
              {Math.round(
                projects.reduce((sum, p) => sum + p.impactScore, 0) /
                  projects.length
              )}
              /100 average
            </div>
            <div className="text-text-secondary">
              <span className="text-accent-primary">→</span> All projects
              available in /projects directory
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center space-y-4 sm:space-y-0 sm:flex sm:justify-center sm:space-x-4">
          <Button
            href="/projects"
            variant="primary"
            size="lg"
            className="w-full sm:w-auto min-w-[200px]"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            View All Projects
          </Button>

          <Button
            href="/about"
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto min-w-[200px]"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            Learn More About Me
          </Button>
        </div>

        {/* Terminal Prompt */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 text-text-tertiary font-mono text-sm">
            <span className="text-accent-primary">$</span>
            <span className="animate-blink">_</span>
          </div>
        </div>
      </div>
    </section>
  )
}
