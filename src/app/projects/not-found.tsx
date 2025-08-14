import Link from 'next/link';

export default function ProjectNotFound() {
  return (
    <div className="project-not-found">
      <h1 className="project-not-found__title">Project Not Found</h1>
      <p className="project-not-found__message">
        Sorry, the project you are looking for does not exist or has been moved.
      </p>
      <div className="project-not-found__actions">
        <Link href="/projects" className="project-not-found__link">
          Browse All Projects
        </Link>
        <Link href="/" className="project-not-found__link project-not-found__link--secondary">
          Return Home
        </Link>
      </div>
    </div>
  );
}
