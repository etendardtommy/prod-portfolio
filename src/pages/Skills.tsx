import { useState, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import type { Skill } from "../lib/types";
import { useFetch } from "../lib/useFetch";
import PageLoader from "../components/PageLoader";
import Reveal from "../components/Reveal";

function SkillModal({ skill, onClose }: { skill: Skill; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="skill-modal-overlay" onClick={onClose}>
      <div className="skill-modal" onClick={(e) => e.stopPropagation()}>
        <button className="skill-modal-close" onClick={onClose} aria-label="Fermer">×</button>
        <div className="skill-modal-header">
          <div className="skill-modal-logo">
            {skill.logo_url ? (
              <img src={skill.logo_url} alt={skill.name} />
            ) : (
              <span className="skill-logo-placeholder">
                {skill.name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <div>
            <h2 className="skill-modal-name">{skill.name}</h2>
            {skill.description && (
              <p className="skill-modal-desc">{skill.description}</p>
            )}
            {skill.category && (
              <div className="tags">
                {skill.category
                  .split(",")
                  .map((t) => t.trim())
                  .filter(Boolean)
                  .map((t) => <span key={t} className="tag">{t}</span>)}
              </div>
            )}
          </div>
        </div>
        {skill.details && (
          <div className="skill-modal-body">
            <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
              {skill.details}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Skills() {
  const { data, loading } = useFetch<Skill[]>("/skills/public");
  const skills = data ?? [];
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [openSkill, setOpenSkill] = useState<Skill | null>(null);

  const closeModal = useCallback(() => setOpenSkill(null), []);

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
          <PageLoader />
        ) : filtered.length === 0 ? (
          <p className="empty-state">Aucune compétence trouvée.</p>
        ) : (
          <div className="skills-grid">
            {filtered.map((skill, i) => (
              <Reveal key={skill.id} from="bottom" delay={Math.min(i * 50, 400)}>
                <div
                  className={`skill-card${skill.details ? " skill-card--expandable" : ""}`}
                  onClick={() => skill.details && setOpenSkill(skill)}
                  role={skill.details ? "button" : undefined}
                  tabIndex={skill.details ? 0 : undefined}
                  onKeyDown={(e) => skill.details && e.key === "Enter" && setOpenSkill(skill)}
                >
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
                    <div className="skill-body-header">
                      <h3>{skill.name}</h3>
                      {skill.details && (
                        <span className="skill-expand-icon">+</span>
                      )}
                    </div>
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
                            <span key={t} className="tag">{t}</span>
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

      {openSkill && <SkillModal skill={openSkill} onClose={closeModal} />}
    </section>
  );
}
