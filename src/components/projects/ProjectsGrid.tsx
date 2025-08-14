'use client';

import { Project } from '@/types';
import { useEffect, useState } from 'react';
import ProjectCard from './ProjectCard';

interface ProjectsGridProps {
  projects: Project[];
  showFilters?: boolean;
}

export const ProjectsGrid = ({
  projects,
  showFilters = true,
}: ProjectsGridProps) => {
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Extract categories from projects
  const categories = ['all', ...Array.from(new Set(projects.map((p) => p.category)))];

  // Handle filter change
  const handleFilterChange = (category: string) => {
    setActiveFilter(category);
  };

  // Filter projects based on category and search term
  useEffect(() => {
    let filtered = [...projects];

    // Filter by category
    if (activeFilter !== 'all') {
      filtered = filtered.filter((project) => project.category === activeFilter);
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(term) ||
          project.summary.toLowerCase().includes(term) ||
          project.tech.some((tech) => tech.toLowerCase().includes(term))
      );
    }

    setFilteredProjects(filtered);
  }, [activeFilter, searchTerm, projects]);

  return (
    <div className="projects-grid-container">
      <div className="projects-grid-header">
        {showFilters && (
          <div className="projects-grid-filters">
            <div className="projects-grid-search">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="projects-grid-search-input"
                aria-label="Search projects"
              />
            </div>
            <div className="projects-grid-categories">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleFilterChange(category)}
                  className={`projects-grid-category-button ${
                    activeFilter === category ? 'active' : ''
                  }`}
                  aria-pressed={activeFilter === category}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {filteredProjects.length > 0 ? (
        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      ) : (
        <div className="projects-grid-empty">
          <p>No projects found matching your criteria.</p>
          <button
            onClick={() => {
              setActiveFilter('all');
              setSearchTerm('');
            }}
            className="projects-grid-reset-button"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectsGrid;
