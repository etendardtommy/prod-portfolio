import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { fetchApi } from "../lib/api";
import type { Experience } from "../lib/types";
import Reveal from "../components/Reveal";

const fallbackExperiences: Experience[] = [
  {
    id: 1,
    title: "BTS SIO",
    company: "Lycée",
    location: null,
    description: "Formation en Services Informatiques aux Organisations.",
    start_date: "2024",
    end_date: null,
    technologies: "Réseau, Linux, Windows Server",
  },
];

export default function Journey() {
  const [experiences, setExperiences] = useState<Experience[]>(fallbackExperiences);

  useEffect(() => {
    fetchApi<Experience[]>("/experience/public")
      .then((data) => { if (data.length > 0) setExperiences(data); })
      .catch(() => {});
  }, []);

  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <div className="section-heading">
            <span className="section-deco-num">03</span>
            <h1>Mon Parcours</h1>
            <p className="section-subtitle">Les étapes de mon parcours académique.</p>
          </div>
        </Reveal>

        <div className="timeline">
          {experiences.map((exp, i) => (
            <Reveal key={exp.id} from="left" delay={i * 100}>
              <div className="timeline-item">
                <div className="timeline-dot" />
                <div className="timeline-content">
                  <span className="timeline-date">
                    {exp.start_date}{exp.end_date ? ` — ${exp.end_date}` : " — Présent"}
                  </span>
                  <h3>{exp.title}</h3>
                  <p className="timeline-subtitle">{exp.company}</p>
                  {exp.description && (
                    <div className="timeline-desc">
                      <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
                        {exp.description}
                      </ReactMarkdown>
                    </div>
                  )}
                  {exp.technologies && (
                    <div className="tags">
                      {exp.technologies.split(",").map((t) => (
                        <span key={t.trim()} className="tag">{t.trim()}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
