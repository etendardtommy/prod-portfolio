import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import DOMPurify from "dompurify";
import { fetchApi } from "../lib/api";
import type { Article } from "../lib/types";

export default function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApi<Article>(`/articles/public`)
      .then((data: unknown) => {
        const list = data as Article[];
        const found = list.find((a) => a.id === Number(id));
        setArticle(found || null);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="section container"><p>Chargement...</p></div>;
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

  return (
    <section className="section">
      <div className="container article-detail">
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

        {article.content && (
          <div
            className="article-html-content"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(article.content),
            }}
          />
        )}
      </div>
    </section>
  );
}
