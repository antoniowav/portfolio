import { FallbackImage } from '@/components/ui/FallbackImage';
import { convertReposToProjects, fetchUserRepositories } from '@/lib/github';
import { Project } from '@/types';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface ProjectDetailPageProps {
  params: {
    slug: string;
  };
}

// Generate metadata for the page
export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found',
      description: 'The requested project could not be found.',
    };
  }

  return {
    title: `${project.title} | Antonio Piattelli`,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      type: 'article',
      images: project.images.length > 0 ? project.images[0].src : undefined,
    },
  };
}

// Generate static params for GitHub projects
export async function generateStaticParams() {
  // For GitHub projects, we'll fetch them at build time for static generation
  const githubUsername = 'antoniowav';
  const repos = await fetchUserRepositories(githubUsername, {
    sort: 'pushed',
    direction: 'desc',
    exclude_forks: true,
    per_page: 100,
    visibility: 'public',
  });

  const githubProjects = convertReposToProjects(repos);
  return githubProjects.map((project) => ({
    slug: project.slug,
  }));
}

// Helper function to get a project by slug from GitHub
async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  // Fetch projects from GitHub
  const githubUsername = 'antoniowav';
  const repos = await fetchUserRepositories(githubUsername, {
    sort: 'pushed',
    direction: 'desc',
    exclude_forks: true,
    per_page: 100,
  });

  const githubProjects = convertReposToProjects(repos);
  return githubProjects.find((p) => p.slug === slug);
}

const ProjectDetailPage = async ({ params }: ProjectDetailPageProps) => {
  const { slug } = params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const formattedDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    });
  };

  return (
    <main className="project-detail-page">
      <article className="project-detail">
        <header className="project-detail__header">
          <Link href="/projects" className="project-detail__back-link">
            ← Back to Projects
          </Link>
          <h1 className="project-detail__title">{project.title}</h1>
          <p className="project-detail__summary">{project.summary}</p>
          <div className="project-detail__meta">
            <div className="project-detail__dates">
              <span>{formattedDate(project.dateStart)}</span>
              {project.dateEnd && (
                <>
                  <span> - </span>
                  <span>{formattedDate(project.dateEnd)}</span>
                </>
              )}
            </div>
            <div className="project-detail__category">{project.category}</div>
          </div>
          <div className="project-detail__tech">
            {project.tech.map((tech, index) => (
              <span key={index} className="project-detail__tech-badge">
                {tech}
              </span>
            ))}
          </div>
        </header>

        <div className="project-detail__gallery">
          {project.images.map((image, index) => (
            <div key={index} className="project-detail__image-container">
              <FallbackImage
                src={`https://opengraph.githubassets.com/1/antoniowav/${project.slug}`}
                alt={image.alt || `${project.title} image ${index + 1}`}
                width={image.width || 1200}
                height={image.height || 800}
                className="project-detail__image"
                priority={index === 0}
              />
              {image.caption && (
                <p className="project-detail__image-caption">{image.caption}</p>
              )}
            </div>
          ))}
        </div>

        <div className="project-detail__content">
          <section className="project-detail__section">
            <h2 className="project-detail__section-title">
              {project.sections.overview.title}
            </h2>
            <div className="project-detail__section-content">
              <p>{project.sections.overview.content}</p>
            </div>
          </section>

          {project.sections.problem && (
            <section className="project-detail__section">
              <h2 className="project-detail__section-title">
                {project.sections.problem.title}
              </h2>
              <div className="project-detail__section-content">
                <p>{project.sections.problem.content}</p>
              </div>
            </section>
          )}

          {project.sections.approach && (
            <section className="project-detail__section">
              <h2 className="project-detail__section-title">
                {project.sections.approach.title}
              </h2>
              <div className="project-detail__section-content">
                <p>{project.sections.approach.content}</p>
                {project.sections.approach.codeSnippets &&
                  project.sections.approach.codeSnippets.map(
                    (snippet, index) => (
                      <div key={index} className="project-detail__code-snippet">
                        {snippet.filename && (
                          <div className="project-detail__code-snippet-header">
                            {snippet.filename}
                          </div>
                        )}
                        <pre className="project-detail__code-snippet-content">
                          <code className={`language-${snippet.language}`}>
                            {snippet.code}
                          </code>
                        </pre>
                        {snippet.description && (
                          <p className="project-detail__code-snippet-description">
                            {snippet.description}
                          </p>
                        )}
                      </div>
                    )
                  )}
              </div>
            </section>
          )}

          {project.sections.results && (
            <section className="project-detail__section">
              <h2 className="project-detail__section-title">
                {project.sections.results.title}
              </h2>
              <div className="project-detail__section-content">
                <p>{project.sections.results.content}</p>
              </div>
            </section>
          )}

          {project.sections.technical && (
            <section className="project-detail__section">
              <h2 className="project-detail__section-title">
                {project.sections.technical.title}
              </h2>
              <div className="project-detail__section-content">
                <p>{project.sections.technical.content}</p>
                {project.sections.technical.codeSnippets &&
                  project.sections.technical.codeSnippets.map(
                    (snippet, index) => (
                      <div key={index} className="project-detail__code-snippet">
                        {snippet.filename && (
                          <div className="project-detail__code-snippet-header">
                            {snippet.filename}
                          </div>
                        )}
                        <pre className="project-detail__code-snippet-content">
                          <code className={`language-${snippet.language}`}>
                            {snippet.code}
                          </code>
                        </pre>
                        {snippet.description && (
                          <p className="project-detail__code-snippet-description">
                            {snippet.description}
                          </p>
                        )}
                      </div>
                    )
                  )}
              </div>
            </section>
          )}
        </div>

        <footer className="project-detail__footer">
          <div className="project-detail__links">
            <h3 className="project-detail__links-title">Project Links</h3>
            <div className="project-detail__links-container">
              {project.links.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`project-detail__link project-detail__link--${link.type}`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </article>
    </main>
  );
};

export default ProjectDetailPage;
