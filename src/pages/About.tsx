import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Download } from "lucide-react";
import type { About as AboutType } from "../lib/types";
import { useFetch } from "../lib/useFetch";
import PageLoader from "../components/PageLoader";
import Reveal from "../components/Reveal";
import { GithubIcon, LinkedinIcon } from "../components/BrandIcons";

export default function About() {
  const { data: about, loading } = useFetch<AboutType>("/about/public");

  if (loading) return <PageLoader />;
  if (!about) return (
    <section className="section">
      <div className="container">
        <div className="section-heading">
          <span className="section-deco-num">05</span>
          <h1>À Propos</h1>
        </div>
        <p className="empty-state">Page en cours de rédaction.</p>
      </div>
    </section>
  );

  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <div className="section-heading">
            <span className="section-deco-num">05</span>
            <h1>À Propos</h1>
            <p className="section-subtitle">Qui suis-je ?</p>
          </div>
        </Reveal>

        <div className="about-layout">
          {/* Colonne gauche — photo + liens */}
          <Reveal from="left" delay={80}>
            <div className="about-sidebar">
              {about.photo_url ? (
                <img src={about.photo_url} alt="Photo de profil" className="about-photo" />
              ) : (
                <div className="about-photo-placeholder">TE</div>
              )}

              <div className="about-links">
                {about.github_url && (
                  <a href={about.github_url} target="_blank" rel="noopener noreferrer" className="about-link">
                    <GithubIcon size={18} /> GitHub
                  </a>
                )}
                {about.linkedin_url && (
                  <a href={about.linkedin_url} target="_blank" rel="noopener noreferrer" className="about-link">
                    <LinkedinIcon size={18} /> LinkedIn
                  </a>
                )}
                <a href="https://api.t-etendard.fr/api/cv" download className="about-link">
                  <Download size={16} /> Télécharger le CV
                </a>
                <a href="https://api.t-etendard.fr/api/synthesis" download className="about-link">
                  <Download size={16} /> Tableau de synthèse
                </a>
              </div>
            </div>
          </Reveal>

          {/* Colonne droite — bio */}
          <Reveal from="right" delay={120}>
            <div className="about-bio">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {about.bio || ""}
              </ReactMarkdown>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
