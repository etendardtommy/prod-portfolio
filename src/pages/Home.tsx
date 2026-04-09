import { Link } from "react-router-dom";
import { Download } from "lucide-react";
import Reveal from "../components/Reveal";

export default function Home() {
  return (
    <section className="section home-section">
      <div className="home-shapes" aria-hidden="true">
        <div className="hshape hshape--1" />
        <div className="hshape hshape--2" />
        <div className="hshape hshape--3" />
        <div className="hshape hshape--4" />
      </div>

      <div className="container home-container">
        <Reveal>
          <div className="home-intro">
            <h1 className="home-name">
              Tommy{" "}
              <span className="home-name-highlight">Etendard</span>
            </h1>
            <span className="home-role">Étudiant BTS SIO</span>
            <div className="home-actions">
              <a href="/cv.pdf" download className="btn-outline">
                <Download size={16} /> Télécharger mon CV
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="home-grid">
            <Link to="/portfolio" className="home-card home-card--yellow">
              <span className="home-card-num">01</span>
              <span className="home-card-label">Projets</span>
            </Link>
            <Link to="/articles" className="home-card home-card--red">
              <span className="home-card-num">02</span>
              <span className="home-card-label">Articles</span>
            </Link>
            <Link to="/journey" className="home-card home-card--blue">
              <span className="home-card-num">03</span>
              <span className="home-card-label">Parcours</span>
            </Link>
            <Link to="/contact" className="home-card">
              <span className="home-card-num">04</span>
              <span className="home-card-label">Contact</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
