import { Link } from "react-router-dom";
import { ArrowRight, Download } from "lucide-react";

export default function Home() {
  return (
    <section className="hero section">
      <div className="container hero-grid">
        <div className="hero-text animate-fade-in">
          <h1>
            Bonjour, je suis{" "}
            <span className="gradient-text">Tommy</span>
            <br />
            Développeur
          </h1>
          <p className="hero-description animate-fade-in delay-100">
            Bienvenue sur mon portfolio. Découvrez mon parcours, mes projets et
            mes articles techniques. Je développe mes compétences à travers des
            projets d'infrastructure réels.
          </p>
          <div className="hero-actions animate-fade-in delay-200">
            <Link to="/portfolio" className="btn-primary">
              Voir mes projets <ArrowRight size={16} />
            </Link>
            <a href="/cv.pdf" download className="btn-outline">
              <Download size={16} /> Télécharger mon CV
            </a>
          </div>
        </div>
        <div className="hero-visual animate-fade-in delay-300">
          <div className="blob" />
        </div>
      </div>
    </section>
  );
}
