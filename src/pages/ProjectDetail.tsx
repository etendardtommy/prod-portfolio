import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { GithubIcon } from "../components/BrandIcons";
import { fetchApi } from "../lib/api";
import type { Project } from "../lib/types";

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchApi<Project>(`/portfolio/projects/public/${id}`)
      .then(setProject)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="section container"><p>Chargement...</p></div>;
  if (error || !project) {
    return (
      <div className="section container">
        <p>Projet non trouvé.</p>
        <Link to="/portfolio" className="btn-outline"><ArrowLeft size={16} /> Retour</Link>
      </div>
    );
  }

  return (
    <section className="section">
      <div className="container project-detail">
        <Link to="/portfolio" className="back-link">
          <ArrowLeft size={16} /> Retour aux projets
        </Link>

        {project.image_url && (
          <img src={project.image_url} alt={project.title} className="project-detail-image" />
        )}

        <h1>{project.title}</h1>

        {project.technologies && (
          <div className="tags">
            {project.technologies.split(",").map((t) => (
              <span key={t.trim()} className="tag">{t.trim()}</span>
            ))}
          </div>
        )}

        <div className="project-content">
          {project.content || project.description}
        </div>

        <div className="project-actions">
          {project.live_url && (
            <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <ExternalLink size={16} /> Visiter le site
            </a>
          )}
          {project.github_url && (
            <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="btn-outline">
              <GithubIcon size={16} /> Code source
            </a>
          )}
        </div>

        {project.banner_link && (
          <a
            href={project.banner_link}
            target="_blank"
            rel="noopener noreferrer"
            className="article-banner"
          >
            <span className="article-banner-label">
              {project.banner_label || "Voir la procédure complète"}
            </span>
            <span className="article-banner-arrow">→</span>
          </a>
        )}
      </div>
    </section>
  );
}
