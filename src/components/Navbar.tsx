import { NavLink } from "react-router-dom";
import { useState } from "react";

const links = [
  { to: "/", label: "Accueil" },
  { to: "/portfolio", label: "Projets" },
  { to: "/articles", label: "Articles" },
  { to: "/journey", label: "Parcours" },
  { to: "/skills", label: "Compétences" },
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

        <button
          className={`menu-toggle ${open ? "open" : ""}`}
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <span /><span /><span />
        </button>

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
