import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "../components/BrandIcons";
import { fetchApi } from "../lib/api";
import type { Project } from "../lib/types";

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApi<Project[]>("/portfolio/projects/public")
      .then(setProjects)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="section">
      <div className="container">
        <h1 className="animate-fade-in">
          Mes <span className="gradient-text">Projets</span>
        </h1>
        <p className="section-subtitle animate-fade-in delay-100">
          Découvrez les projets sur lesquels j'ai travaillé.
        </p>

        {loading ? (
          <p>Chargement...</p>
        ) : projects.length === 0 ? (
          <p className="empty-state">Aucun projet pour le moment.</p>
        ) : (
          <div className="projects-grid animate-fade-in delay-200">
            {projects.map((project) => (
              <div key={project.id} className="project-card glass-panel">
                {project.image_url && (
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="project-image"
                    loading="lazy"
                  />
                )}
                <div className="project-body">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  {project.technologies && (
                    <div className="tags">
                      {project.technologies.split(",").map((t) => (
                        <span key={t.trim()} className="tag">
                          {t.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="project-links">
                    <Link to={`/portfolio/${project.id}`} className="btn-sm-link">
                      Détails
                    </Link>
                    {project.live_url && (
                      <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink size={16} />
                      </a>
                    )}
                    {project.github_url && (
                      <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                        <GithubIcon size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
