'use client';

import React from 'react';

export const ProjectsLoading: React.FC = () => {
  // Create an array of 6 placeholder items
  const placeholders = Array.from({ length: 6 }, (_, i) => i);

  return (
    <div className="projects-loading-container">
      <div className="projects-loading-header">
        <div className="projects-loading-title-skeleton" />
        <div className="projects-loading-filters">
          <div className="projects-loading-search-skeleton" />
          <div className="projects-loading-categories">
            {Array.from({ length: 4 }, (_, i) => (
              <div key={i} className="projects-loading-category-skeleton" />
            ))}
          </div>
        </div>
      </div>

      <div className="projects-grid">
        {placeholders.map((index) => (
          <div
            key={index}
            className="project-card-skeleton"
          >
            <div className="project-card-skeleton__image" />
            <div className="project-card-skeleton__content">
              <div className="project-card-skeleton__title" />
              <div className="project-card-skeleton__summary" />
              <div className="project-card-skeleton__tech">
                {Array.from({ length: 3 }, (_, i) => (
                  <div key={i} className="project-card-skeleton__tech-badge" />
                ))}
              </div>
              <div className="project-card-skeleton__meta">
                <div className="project-card-skeleton__date" />
                <div className="project-card-skeleton__category" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsLoading;
