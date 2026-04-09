import { Link } from "react-router-dom";
import { Download } from "lucide-react";

export default function Home() {
  return (
    <section className="section">
      <div className="container">
        <div className="home-intro animate-fade-in">
          <h1 className="home-name">Tommy Etendard</h1>
          <span className="home-role">Étudiant BTS SIO</span>
          <div className="home-actions">
            <a href="/cv.pdf" download className="btn-outline">
              <Download size={16} /> Télécharger mon CV
            </a>
          </div>
        </div>

        <div className="home-grid animate-fade-in delay-100">
          <Link to="/portfolio" className="home-card home-card--yellow">
            <span>Projets</span>
          </Link>
          <Link to="/articles" className="home-card home-card--red">
            <span>Articles</span>
          </Link>
          <Link to="/journey" className="home-card home-card--blue">
            <span>Parcours</span>
          </Link>
          <Link to="/contact" className="home-card">
            <span>Contact</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
