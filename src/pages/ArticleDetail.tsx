import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { fetchApi } from "../lib/api";
import type { Article } from "../lib/types";

interface Heading {
  level: number;
  text: string;
  id: string;
}

interface BannerSegment {
  type: "banner";
  href: string;
  label: string;
}

interface MarkdownSegment {
  type: "markdown";
  content: string;
}

type Segment = BannerSegment | MarkdownSegment;

const BANNER_RE = /^> BANNER:\s*(https?:\/\/\S+)(?:\s*\|\s*(.+))?$/;

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

function extractHeadings(content: string): Heading[] {
  return content.split("\n").reduce<Heading[]>((acc, line) => {
    const match = line.match(/^(#{1,3})\s+(.+)/);
    if (match) {
      const text = match[2].trim();
      acc.push({ level: match[1].length, text, id: slugifyHeading(text) });
    }
    return acc;
  }, []);
}

function parseSegments(content: string): Segment[] {
  const lines = content.split("\n");
  const segments: Segment[] = [];
  let buffer: string[] = [];

  for (const line of lines) {
    const match = line.match(BANNER_RE);
    if (match) {
      if (buffer.length) {
        segments.push({ type: "markdown", content: buffer.join("\n") });
        buffer = [];
      }
      segments.push({ type: "banner", href: match[1], label: match[2]?.trim() || "Voir la procédure complète" });
    } else {
      buffer.push(line);
    }
  }

  if (buffer.length) segments.push({ type: "markdown", content: buffer.join("\n") });
  return segments;
}

const mdComponents = {
  h1: ({ children }: { children?: React.ReactNode }) => <h1 id={slugifyHeading(String(children))}>{children}</h1>,
  h2: ({ children }: { children?: React.ReactNode }) => <h2 id={slugifyHeading(String(children))}>{children}</h2>,
  h3: ({ children }: { children?: React.ReactNode }) => <h3 id={slugifyHeading(String(children))}>{children}</h3>,
};

export default function ArticleDetail() {
  const { slug } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    fetchApi<Article>(`/articles/public`)
      .then((data: unknown) => {
        const list = data as Article[];
        const found = list.find((a) => a.slug === slug);
        setArticle(found || null);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [slug]);

  useEffect(() => {
    if (article) document.title = `${article.title} — Tommy Étendard`;
    return () => { document.title = "Tommy Étendard"; };
  }, [article]);

  useEffect(() => {
    if (!article?.content) return;
    const headings = extractHeadings(article.content);
    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "0px 0px -60% 0px" }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [article]);

  if (loading) return <div className="section container"><p>Chargement...</p></div>;
  if (error) {
    return (
      <div className="section container">
        <p>Impossible de charger l'article. Veuillez réessayer.</p>
        <Link to="/articles" className="btn-outline"><ArrowLeft size={16} /> Retour</Link>
      </div>
    );
  }
  if (!article) {
    return (
      <div className="section container">
        <p>Article non trouvé.</p>
        <Link to="/articles" className="btn-outline"><ArrowLeft size={16} /> Retour</Link>
      </div>
    );
  }

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const headings = article.content ? extractHeadings(article.content) : [];
  const segments = article.content ? parseSegments(article.content) : [];

  return (
    <section className="section">
      <div className={`container article-detail-layout${headings.length ? " has-toc" : ""}`}>
        <div className="article-detail">
          <Link to="/articles" className="back-link">
            <ArrowLeft size={16} /> Retour aux articles
          </Link>

          {article.image_url && (
            <img src={article.image_url} alt={article.title} className="article-detail-image" />
          )}

          <span className="article-date">{formatDate(article.created_at)}</span>
          <h1>{article.title}</h1>

          {article.tags && (
            <div className="tags">
              {article.tags.split(",").map((t) => (
                <span key={t.trim()} className="tag">{t.trim()}</span>
              ))}
            </div>
          )}

          {segments.length > 0 && (
            <div className="article-html-content">
              {segments.map((seg, i) =>
                seg.type === "banner" ? (
                  <a key={i} href={seg.href} target="_blank" rel="noopener noreferrer" className="article-banner">
                    <span className="article-banner-label">{seg.label}</span>
                    <span className="article-banner-arrow">→</span>
                  </a>
                ) : (
                  <ReactMarkdown key={i} remarkPlugins={[remarkGfm]} components={mdComponents}>
                    {seg.content}
                  </ReactMarkdown>
                )
              )}
            </div>
          )}

          {article.banner_link && (
            <a href={article.banner_link} target="_blank" rel="noopener noreferrer" className="article-banner">
              <span className="article-banner-label">
                {article.banner_label || "Voir la procédure complète"}
              </span>
              <span className="article-banner-arrow">→</span>
            </a>
          )}
        </div>

        {headings.length > 0 && (
          <nav className="article-toc">
            <span className="article-toc-title">Sommaire</span>
            <ul>
              {headings.map((h) => (
                <li key={h.id} className={`toc-level-${h.level}`}>
                  <a
                    href={`#${h.id}`}
                    className={activeId === h.id ? "toc-active" : ""}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(h.id)?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    {h.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </section>
  );
}
