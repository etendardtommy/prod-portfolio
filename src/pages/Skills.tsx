import { useEffect, useState } from "react";
import { fetchApi } from "../lib/api";
import type { Skill } from "../lib/types";
import Reveal from "../components/Reveal";

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  useEffect(() => {
    fetchApi<Skill[]>("/skills/public")
      .then(setSkills)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const allTags = Array.from(
    new Set(
      skills.flatMap((s) =>
        s.category
          ? s.category.split(",").map((t) => t.trim()).filter(Boolean)
          : []
      )
    )
  ).sort();

  const filtered = activeTag
    ? skills.filter((s) =>
        s.category?.split(",").map((t) => t.trim()).includes(activeTag)
      )
    : skills;

  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <div className="section-heading">
            <span className="section-deco-num">04</span>
            <h1>Compétences</h1>
            <p className="section-subtitle">Mes outils et technologies maîtrisés.</p>
          </div>
        </Reveal>

        {allTags.length > 0 && (
          <Reveal delay={80}>
            <div className="skills-filters">
              <button
                className={`skill-filter-btn${activeTag === null ? " active" : ""}`}
                onClick={() => setActiveTag(null)}
              >
                Tous
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  className={`skill-filter-btn${activeTag === tag ? " active" : ""}`}
                  onClick={() => setActiveTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </Reveal>
        )}

        {loading ? (
          <p>Chargement...</p>
        ) : filtered.length === 0 ? (
          <p className="empty-state">Aucune compétence trouvée.</p>
        ) : (
          <div className="skills-grid">
            {filtered.map((skill, i) => (
              <Reveal key={skill.id} from="bottom" delay={Math.min(i * 50, 400)}>
                <div className="skill-card">
                  <div className="skill-logo">
                    {skill.logo_url ? (
                      <img src={skill.logo_url} alt={skill.name} />
                    ) : (
                      <span className="skill-logo-placeholder">
                        {skill.name.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="skill-body">
                    <h3>{skill.name}</h3>
                    {skill.description && (
                      <p className="skill-desc">{skill.description}</p>
                    )}
                    {skill.category && (
                      <div className="tags">
                        {skill.category
                          .split(",")
                          .map((t) => t.trim())
                          .filter(Boolean)
                          .map((t) => (
                            <span key={t} className="tag">
                              {t}
                            </span>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
