import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container" style={{ textAlign: "center", padding: "6rem 1rem" }}>
        <span className="section-deco-num" style={{ fontSize: "6rem" }}>404</span>
        <h1 style={{ marginTop: "1rem" }}>Page introuvable</h1>
        <p style={{ color: "var(--grey)", margin: "1rem 0 2rem" }}>
          Cette page n'existe pas ou a été déplacée.
        </p>
        <Link to="/" className="btn-outline">
          <ArrowLeft size={16} /> Retour à l'accueil
        </Link>
      </div>
    </section>
  );
}
