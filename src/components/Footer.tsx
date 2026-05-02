import { GithubIcon, LinkedinIcon } from "./BrandIcons";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>&copy; {new Date().getFullYear()} Tommy Etendard. Tous droits réservés.</p>
        <div className="footer-links">
          <a href="https://github.com/toumyre" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <GithubIcon size={20} />
          </a>
          <a href="https://linkedin.com/in/tommy-etendard-90355a3a4/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <LinkedinIcon size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
