import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { fetchApi } from "../lib/api";
import type { Article } from "../lib/types";

export default function Articles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchApi<Article[]>("/articles/public")
      .then(setArticles)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = articles.filter((a) => {
    const q = search.toLowerCase();
    return (
      a.title.toLowerCase().includes(q) ||
      (a.tags && a.tags.toLowerCase().includes(q))
    );
  });

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <section className="section">
      <div className="container articles-page">
        <h1 className="animate-fade-in">
          <span className="gradient-text">Articles</span> & Procédures
        </h1>

        <div className="search-bar animate-fade-in delay-100">
          <Search size={18} />
          <input
            type="text"
            placeholder="Rechercher un article..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <p>Chargement...</p>
        ) : filtered.length === 0 ? (
          <p className="empty-state">Aucun article ne correspond à votre recherche.</p>
        ) : (
          <div className="articles-list animate-fade-in delay-200">
            {filtered.map((article) => (
              <Link
                key={article.id}
                to={`/articles/${article.id}`}
                className="article-card glass-panel"
              >
                {article.image_url && (
                  <img
                    src={article.image_url}
                    alt={article.title}
                    className="article-image"
                    loading="lazy"
                  />
                )}
                <div className="article-body">
                  <span className="article-date">{formatDate(article.created_at)}</span>
                  <h3>{article.title}</h3>
                  {article.summary && <p>{article.summary}</p>}
                  {article.tags && (
                    <div className="tags">
                      {article.tags.split(",").map((t) => (
                        <span key={t.trim()} className="tag">{t.trim()}</span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
