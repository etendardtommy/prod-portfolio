import { useEffect, useState } from "react";
import { fetchApi } from "../lib/api";
import type { Experience } from "../lib/types";

const fallbackExperiences: Experience[] = [
  {
    id: 1,
    title: "Master en Informatique",
    company: "Université de Technologie",
    location: null,
    description:
      "Spécialisation en Développement Web et Intelligence Artificielle. Apprentissage approfondi des algorithmes, structures de données et architectures logicielles.",
    start_date: "2021",
    end_date: "2023",
    technologies: "Algorithmique, Java, Python, SQL",
  },
  {
    id: 2,
    title: "Développeur Fullstack",
    company: "Agence Web Digitale",
    location: null,
    description:
      "Conception et développement d'applications web modernes avec React et NestJS. Mise en place de pipelines CI/CD et gestion de bases de données.",
    start_date: "2023",
    end_date: null,
    technologies: "React, Node.js, NestJS, Docker",
  },
];

export default function Journey() {
  const [experiences, setExperiences] = useState<Experience[]>(fallbackExperiences);

  useEffect(() => {
    fetchApi<Experience[]>("/experience/public")
      .then((data) => {
        if (data.length > 0) setExperiences(data);
      })
      .catch(() => {});
  }, []);

  return (
    <section className="section">
      <div className="container">
        <h1 className="animate-fade-in">
          Mon <span className="gradient-text">Parcours</span>
        </h1>
        <p className="section-subtitle animate-fade-in delay-100">
          Les étapes clés de mon parcours professionnel et académique.
        </p>

        <div className="timeline animate-fade-in delay-200">
          {experiences.map((exp) => (
            <div key={exp.id} className="timeline-item">
              <div className="timeline-dot" />
              <div className="timeline-content glass-panel">
                <span className="timeline-date">
                  {exp.start_date}
                  {exp.end_date ? ` - ${exp.end_date}` : " - Présent"}
                </span>
                <h3>{exp.title}</h3>
                <p className="timeline-subtitle">{exp.company}</p>
                {exp.description && <p>{exp.description}</p>}
                {exp.technologies && (
                  <div className="tags">
                    {exp.technologies.split(",").map((t) => (
                      <span key={t.trim()} className="tag">{t.trim()}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
