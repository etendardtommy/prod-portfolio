import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "../components/BrandIcons";
import { fetchApi } from "../lib/api";
import type { Project } from "../lib/types";
import Reveal from "../components/Reveal";

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchApi<Project[]>("/portfolio/projects/public")
      .then(setProjects)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <div className="section-heading">
            <span className="section-deco-num">01</span>
            <h1>Mes Projets</h1>
            <p className="section-subtitle">Les projets sur lesquels j'ai travaillé.</p>
          </div>
        </Reveal>

        {loading ? (
          <p>Chargement...</p>
        ) : error ? (
          <p className="empty-state">Impossible de charger les projets. Veuillez réessayer.</p>
        ) : projects.length === 0 ? (
          <p className="empty-state">Aucun projet pour le moment.</p>
        ) : (
          <div className="projects-grid">
            {projects.map((project, i) => (
              <Reveal key={project.id} from={i % 2 === 0 ? "left" : "right"} delay={i * 80}>
                <div className="project-card">
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
                          <span key={t.trim()} className="tag">{t.trim()}</span>
                        ))}
                      </div>
                    )}
                    <div className="project-links">
                      <Link to={`/portfolio/${project.slug}`} className="btn-sm-link">Détails</Link>
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
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
