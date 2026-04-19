import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { fetchApi } from "../lib/api";
import type { Article } from "../lib/types";
import Reveal from "../components/Reveal";

export default function Articles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  useEffect(() => {
    fetchApi<Article[]>("/articles/public")
      .then(setArticles)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const categories = Array.from(
    new Set(articles.map((a) => a.category).filter(Boolean) as string[])
  );

  const allTags = Array.from(
    new Set(
      articles.flatMap((a) =>
        a.tags ? a.tags.split(",").map((t) => t.trim()).filter(Boolean) : []
      )
    )
  ).sort();

  const filtered = articles.filter((a) => {
    const q = search.toLowerCase();
    const matchSearch =
      a.title.toLowerCase().includes(q) ||
      (a.tags && a.tags.toLowerCase().includes(q));
    const matchCategory = !activeCategory || a.category === activeCategory;
    const matchTag =
      !activeTag ||
      (a.tags && a.tags.split(",").map((t) => t.trim()).includes(activeTag));
    return matchSearch && matchCategory && matchTag;
  });

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <div className="section-heading">
            <span className="section-deco-num">02</span>
            <h1>Articles</h1>
            <p className="section-subtitle">Mes articles et procédures techniques.</p>
          </div>
        </Reveal>
      </div>

      <div className="container articles-page">
        <Reveal delay={100}>
          <div className="search-bar">
            <Search size={18} />
            <input
              type="text"
              placeholder="Rechercher un article..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </Reveal>

        {categories.length > 0 && (
          <Reveal delay={150}>
            <div className="skills-filters">
              <button
                className={`skill-filter-btn${activeCategory === null ? " active" : ""}`}
                onClick={() => setActiveCategory(null)}
              >
                Tous
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`skill-filter-btn${activeCategory === cat ? " active" : ""}`}
                  onClick={() => setActiveCategory(cat === activeCategory ? null : cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </Reveal>
        )}

        {allTags.length > 0 && (
          <Reveal delay={200}>
            <div className="tags tags-filter">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  className={`tag tag-filter-btn${activeTag === tag ? " active" : ""}`}
                  onClick={() => setActiveTag(tag === activeTag ? null : tag)}
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
          <p className="empty-state">Aucun article ne correspond à votre recherche.</p>
        ) : (
          <div className="articles-list">
            {filtered.map((article, i) => (
              <Reveal key={article.id} from={i % 2 === 0 ? "left" : "right"} delay={i * 80}>
                <Link to={`/articles/${article.id}`} className="article-card">
                  {article.image_url && (
                    <img
                      src={article.image_url}
                      alt={article.title}
                      className="article-image"
                      loading="lazy"
                    />
                  )}
                  <div className="article-body">
                    <div className="article-body-top">
                      <span className="article-date">{formatDate(article.created_at)}</span>
                      {article.category && (
                        <span className="article-category">{article.category}</span>
                      )}
                    </div>
                    <h3>{article.title}</h3>
                    {article.summary && <p>{article.summary}</p>}
                    {article.tags && (
                      <div className="tags">
                        {article.tags.split(",").map((t) => {
                          const tag = t.trim();
                          return (
                            <span
                              key={tag}
                              className={`tag${activeTag === tag ? " active" : ""}`}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setActiveTag(tag === activeTag ? null : tag);
                              }}
                            >
                              {tag}
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
