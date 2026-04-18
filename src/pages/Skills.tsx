import { useEffect, useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { fetchApi } from "../lib/api";
import type { Skill } from "../lib/types";
import Reveal from "../components/Reveal";

function SkillCard({ skill }: { skill: Skill }) {
  const [open, setOpen] = useState(false);
  const detailsRef = useRef<HTMLDivElement>(null);

  const hasDetails = Boolean(skill.details);

  return (
    <div
      className={`skill-card${open ? " skill-card--open" : ""}${hasDetails ? " skill-card--expandable" : ""}`}
      onClick={() => hasDetails && setOpen((v) => !v)}
      role={hasDetails ? "button" : undefined}
      tabIndex={hasDetails ? 0 : undefined}
      onKeyDown={(e) => hasDetails && e.key === "Enter" && setOpen((v) => !v)}
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
          {hasDetails && (
            <span className="skill-expand-icon">{open ? "−" : "+"}</span>
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
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
          </div>
        )}
        {hasDetails && (
          <div
            ref={detailsRef}
            className="skill-details"
            style={{
              maxHeight: open
                ? detailsRef.current?.scrollHeight
                  ? `${detailsRef.current.scrollHeight}px`
                  : "1000px"
                : "0px",
            }}
          >
            <div className="skill-details-inner">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {skill.details!}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

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
                <SkillCard skill={skill} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
