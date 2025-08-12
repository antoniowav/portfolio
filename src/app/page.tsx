import { FeaturedProjects } from '@/components/FeaturedProjects'
import { HeroSection } from '@/components/HeroSection'
import { QuickActions } from '@/components/QuickActions'
import { featuredProjectIds, projects } from '@/data'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home - Antonio Piattelli',
  description:
    'Full-stack developer passionate about creating elegant solutions to complex problems. Experienced in React, TypeScript, Go, and modern web technologies.',
  openGraph: {
    title: 'Antonio Piattelli - Full-Stack Developer',
    description:
      'Full-stack developer passionate about creating elegant solutions to complex problems.',
  },
}

export default function HomePage() {
  const featuredProjects = projects.filter(project =>
    featuredProjectIds.includes(project.id)
  )

  return (
    <>
      <HeroSection />
      <QuickActions />
      <FeaturedProjects projects={featuredProjects} />
    </>
  )
}
