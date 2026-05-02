import { useEffect, useState } from "react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { fetchApi } from "../lib/api";
import type { About } from "../lib/types";

export default function Footer() {
  const [about, setAbout] = useState<About | null>(null);

  useEffect(() => {
    fetchApi<About>("/about/public")
      .then(setAbout)
      .catch(() => {});
  }, []);

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>&copy; {new Date().getFullYear()} Tommy Etendard. Tous droits réservés.</p>
        <div className="footer-links">
          {about?.github_url && (
            <a href={about.github_url} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <GithubIcon size={20} />
            </a>
          )}
          {about?.linkedin_url && (
            <a href={about.linkedin_url} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <LinkedinIcon size={20} />
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
