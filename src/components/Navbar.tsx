import { NavLink } from "react-router-dom";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

const links = [
  { to: "/", label: "Accueil" },
  { to: "/portfolio", label: "Projets" },
  { to: "/articles", label: "Articles" },
  { to: "/journey", label: "Parcours" },
  { to: "/skills", label: "Compétences" },
  { to: "/about", label: "À propos" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar-inner container">
        <NavLink to="/" className="logo">
          Portfolio
        </NavLink>

        <div className="navbar-actions">
          <ThemeToggle />
          <button
            className={`menu-toggle ${open ? "open" : ""}`}
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
        </div>

        <nav className={`nav-links ${open ? "show" : ""}`}>
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
