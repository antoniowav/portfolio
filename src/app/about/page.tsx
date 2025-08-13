import type { Metadata } from 'next'

import { DownloadButton } from '@/components/DownloadButton'
import { PageLayout } from '@/components/PageLayout'
import { author, education, experience, quickStats, skills } from '@/data'

export const metadata: Metadata = {
  title: 'About',
  description:
    'About me - a full-stack developer focused on building elegant, scalable solutions.',
  openGraph: {
    title: 'Antonio Piattelli - About',
    description:
      'Full-stack developer with expertise in React, TypeScript, Go and modern web technologies.',
  },
}

function toPctClass(v: unknown) {
  let n = 0
  if (typeof v === 'number') {
    n = v
  } else if (typeof v === 'string') {
    const s = v.trim().toLowerCase()
    const map: Record<string, number> = {
      beginner: 25,
      junior: 40,
      intermediate: 60,
      mid: 60,
      advanced: 80,
      senior: 85,
      expert: 95,
      master: 98,
    }
    n = s in map ? map[s] : parseFloat(s.replace('%', ''))
  }
  if (Number.isFinite(n) && n <= 1 && n >= 0) {
    n = n * 100
  }
  n = Math.min(100, Math.max(0, Number.isFinite(n) ? n : 0))
  return `w-pct-${Math.round(n)}`
}

export default function AboutPage(): JSX.Element {
  return (
    <PageLayout
      title="About"
      maxWidth="full"
      contentClassName="grid grid-cols-1 md:grid-cols-3 gap-12 items-start"
      containerClassName="min-h-screen pb-24"
    >
      <aside className="md:col-span-1 flex flex-col items-start md:items-start">
        <h2 className="text-xl font-semibold text-text-primary mb-1">
          {author.name}
        </h2>
        <p className="text-text-secondary text-start md:text-left max-w-sm">
          {author.bio}
        </p>
        <a
          href={`mailto:${author.email}`}
          className="mt-4 text-accent-primary"
        >
          {author.email}
        </a>

        <div className="mt-6">
          <DownloadButton
            filePath="/documents/Antonio_Piattelli_resume.pdf"
            fileName="Antonio_Piattelli_Resume.pdf"
            variant="secondary"
            size="md"
            className="font-mono"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 mr-2"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Download Resume
          </DownloadButton>
        </div>
      </aside>

        <div className="md:col-span-2 space-y-8">
          <section
            aria-label="Quick Stats"
            className="bg-bg-secondary border border-border p-4 rounded"
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-mono text-accent-primary">
                  {quickStats.yearsOfExperience}+
                </div>
                <div className="text-text-tertiary text-sm">
                  Years Experience
                </div>
              </div>
              <div>
                <div className="text-2xl font-mono text-accent-primary">
                  {quickStats.projectsCompleted}
                </div>
                <div className="text-text-tertiary text-sm">Projects</div>
              </div>
              <div>
                <div className="text-2xl font-mono text-accent-primary">
                  {quickStats.technologiesUsed}
                </div>
                <div className="text-text-tertiary text-sm">Technologies</div>
              </div>
              <div>
                <div className="text-2xl font-mono text-accent-primary">
                  {quickStats.coffeeCupsConsumed}
                </div>
                <div className="text-text-tertiary text-sm">Coffee</div>
              </div>
            </div>
          </section>

          <section
            aria-label="Skills"
            className="bg-bg-secondary border border-border p-4 rounded"
          >
            <h2 className="text-2xl font-semibold text-text-primary mb-4">
              Skills
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {skills.map((s: any, idx: number) => {
                const w = toPctClass(s.proficiency ?? s.level ?? s.percent)
                return (
                  <div
                    key={s?.name || idx}
                    className="p-3 border border-border rounded bg-bg-primary"
                  >
                    <div className="text-sm font-semibold text-text-primary">
                      {s.name}
                    </div>
                    <div className="text-xs text-text-tertiary">
                      {s.category}
                    </div>
                    <div
                      className="relative mt-2 h-2 w-full bg-bg-tertiary rounded overflow-hidden"
                      role="progressbar"
                      aria-label={`proficiency-${s.name}`}
                    >
                      <span
                        className={`absolute left-0 top-0 block h-full bg-accent-primary ${w}`}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          <section
            aria-label="Experience"
            className="bg-bg-secondary border border-border p-4 rounded"
          >
            <h2 className="text-2xl font-semibold text-text-primary mb-4">
              Experience
            </h2>
            <ul className="space-y-4">
              {experience.map(exp => (
                <li key={exp.id} className="p-4 border border-border rounded">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">
                        {exp.title} at {exp.company}
                      </div>
                      <div className="text-sm text-text-tertiary">
                        {exp.location} • {new Date(exp.startDate).getFullYear()}{' '}
                        -{' '}
                        {exp.current
                          ? 'Present'
                          : exp.endDate
                            ? new Date(exp.endDate).getFullYear()
                            : ''}
                      </div>
                    </div>
                    {exp.current && (
                      <span className="text-sm text-accent-primary font-mono">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-text-secondary">{exp.description}</p>
                  {exp.responsibilities?.length ? (
                    <ul className="mt-2 text-text-tertiary list-disc list-inside">
                      {exp.responsibilities.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>

          <section
            aria-label="Education"
            className="bg-bg-secondary border border-border p-4 rounded"
          >
            <h2 className="text-2xl font-semibold text-text-primary mb-4">
              Education
            </h2>
            <ul className="space-y-4">
              {education.map(ed => (
                <li key={ed.id} className="p-4 border border-border rounded">
                  <div className="font-semibold">
                    {ed.degree} • {ed.school}
                  </div>
                  <div className="text-sm text-text-tertiary">
                    {ed.location} • {ed.startDate} - {ed.endDate}
                  </div>
                  {ed.honors?.length ? (
                    <div className="text-text-secondary mt-2">
                      Honors: {ed.honors.join(', ')}
                    </div>
                  ) : null}
                  {ed.relevantCoursework?.length ? (
                    <div className="text-text-tertiary mt-2">
                      Coursework: {ed.relevantCoursework.join('; ')}
                    </div>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>

          <section
            aria-label="Contact"
            className="bg-bg-secondary border border-border p-4 rounded"
          >
            <h2 className="text-2xl font-semibold text-text-primary mb-4">
              Get in touch
            </h2>
            <p className="text-text-secondary">
              Interested in collaborating? Email me at{' '}
              <a
                href={`mailto:${author.email}`}
                className="text-accent-primary"
              >
                {author.email}
              </a>
              .
            </p>
          </section>
        </div>
    </PageLayout>
  )
}
