'use client';

import { FallbackImage } from '@/components/ui/FallbackImage';
import { Project } from '@/types';
import Link from 'next/link';
import React, { useState } from 'react';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="project-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/projects/${project.slug}`} className="project-card__link">
        <div className="project-card__image-container">
            <FallbackImage
              src={`https://opengraph.githubassets.com/1/antoniowav/${project.slug}`}
              alt={project.images[0].alt || project.title}
              width={project.images[0].width || 800}
              height={project.images[0].height || 600}
              className="project-card__image"
              priority={index < 4}
            />
          {project.featured && (
            <div className="project-card__featured-badge">Featured</div>
          )}
        </div>
        <div className="project-card__content">
          <h3 className="project-card__title">{project.title}</h3>
          <p className="project-card__summary">{project.summary}</p>
          <div className="project-card__tech">
            {project.tech.slice(0, 4).map((tech, i) => (
              <span key={i} className="project-card__tech-badge">
                {tech}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="project-card__tech-more">
                +{project.tech.length - 4}
              </span>
            )}
          </div>
          <div className="project-card__meta">
            <span className="project-card__date">
              {new Date(project.dateStart).getFullYear()}
              {project.dateEnd && ` - ${new Date(project.dateEnd).getFullYear()}`}
            </span>
            <span className="project-card__category">{project.category}</span>
          </div>
        </div>
      </Link>
      <div className="project-card__links">
        {project.links.map((link, i) => (
          <a
            key={i}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`project-card__link-button project-card__link-button--${link.type}`}
            aria-label={link.label}
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;
