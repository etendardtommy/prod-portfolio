import { Link } from "react-router-dom";
import { Download } from "lucide-react";
import Reveal from "../components/Reveal";

const navItems = [
  { to: "/portfolio",  num: "01", label: "Projets" },
  { to: "/articles",   num: "02", label: "Articles" },
  { to: "/journey",    num: "03", label: "Parcours" },
  { to: "/skills",     num: "04", label: "Compétences" },
  { to: "/about",      num: "05", label: "À propos" },
  { to: "/contact",    num: "06", label: "Contact" },
];

export default function Home() {
  return (
    <section className="section home-section">
      <div className="container">
        <Reveal>
          <div className="home-intro">
            <h1 className="home-name">Tommy<br />Etendard</h1>
            <div className="home-meta">
              <span className="home-role">Étudiant BTS SIO</span>
              <a href="/cv.pdf" download className="btn-outline">
                <Download size={14} /> CV
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <nav className="home-nav">
            {navItems.map((item) => (
              <Link key={item.to} to={item.to} className="home-nav-row">
                <span className="home-nav-num">{item.num}</span>
                <span className="home-nav-label">{item.label}</span>
                <span className="home-nav-arrow">→</span>
              </Link>
            ))}
          </nav>
        </Reveal>
      </div>
    </section>
  );
}
