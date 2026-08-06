import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Linkedin, Twitter, Link as LinkIcon } from "lucide-react";
import SEO from "@/components/common/SEO";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { useI18n, localizedPath } from "@/i18n/context";
import { L } from "@/i18n/pick";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default function Article() {
  const { slug } = useParams();
  const { lang, t } = useI18n();
  const p = (path) => localizedPath(path, lang);
  const { data: article } = useQuery({ 
    queryKey: ["article", slug, lang], 
    queryFn: async () => (await axios.get(`${BACKEND_URL}/api/articles/${slug}?lang=${lang}`)).data 
  });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? Math.min(100, (window.scrollY / total) * 100) : 0);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!article) return <div className="container-mk py-32 text-mk-text2">{t("article.loading")}</div>;

  // Extraction sécurisée de la catégorie (gère chaîne ou objet { name, category })
  const categoryLabel = L(article.category?.name || article.category, lang) || "Insight";
  const articleTitle = L(article.title, lang);
  const articleExcerpt = L(article.excerpt, lang);

  const url = typeof window !== "undefined" ? window.location.href : "";
  const shareLinkedIn = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  const shareX = `https://twitter.com/intent/tweet?text=${encodeURIComponent(articleTitle)}&url=${encodeURIComponent(url)}`;

  return (
    <>
      <SEO title={articleTitle} description={articleExcerpt} path={`/insights/${article.slug}`} image={article.cover} />
      <div className="mk-progress-bar" style={{ width: `${progress}%` }} />

      <article>
        <section className="bg-mk-paper pt-16 pb-10">
          <div className="container-mk max-w-4xl">
            <Breadcrumbs items={[{ label: t("bc.insights"), to: "/insights" }, { label: categoryLabel }]} />
            <div className="mt-8">
              <div className="overline mb-3 text-mk-bronze2">
                {categoryLabel} · {article.read_minutes} {t("ins.min_read")} · {article.published_at}
              </div>
              <h1 className="font-serif text-4xl md:text-6xl leading-[1.05]">{articleTitle}</h1>
              <p className="mt-6 text-xl text-mk-text2 leading-relaxed max-w-3xl">{articleExcerpt}</p>
              <div className="mt-8 flex items-center justify-between border-y border-mk-line/15 py-4">
                <div className="text-sm">{t("article.by")} <span className="font-medium">{L(article.author, lang)}</span></div>
                <div className="flex items-center gap-3 text-mk-text2">
                  <a href={shareLinkedIn} target="_blank" rel="noopener noreferrer" aria-label={t("article.share.linkedin")} className="hover:text-mk-bronze"><Linkedin className="w-4 h-4" strokeWidth={1.5} /></a>
                  <a href={shareX} target="_blank" rel="noopener noreferrer" aria-label={t("article.share.x")} className="hover:text-mk-bronze"><Twitter className="w-4 h-4" strokeWidth={1.5} /></a>
                  <button onClick={() => navigator.clipboard?.writeText(url)} aria-label={t("article.share.copy")} className="hover:text-mk-bronze"><LinkIcon className="w-4 h-4" strokeWidth={1.5} /></button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container-mk max-w-4xl">
          <div className="aspect-[16/9] bg-mk-ink overflow-hidden">
            <img src={article.cover} alt={articleTitle} className="w-full h-full object-cover" />
          </div>
        </div>

        <section className="bg-mk-paper py-16">
          <div className="container-mk max-w-3xl">
            <div className="space-y-6 text-lg leading-relaxed text-mk-text">
              {Array.isArray(article.body) 
                ? article.body.map((par, i) => <p key={i}>{L(par, lang)}</p>)
                : <p>{L(article.body, lang)}</p>
              }
            </div>
            <div className="mt-16 pt-8 border-t border-mk-line/15 flex flex-wrap gap-2">
              {(article.tags || []).map(tag => {
                const rawTag = L(tag?.name || tag, lang);
                const key = `tag.${String(rawTag).toLowerCase()}`;
                const label = t(key);
                return (
                  <span key={rawTag} className="text-xs uppercase tracking-widest border border-mk-line/25 px-3 py-1 text-mk-text2">
                    {label === key ? rawTag : label}
                  </span>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-mk-paper2 py-16">
          <div className="container-mk max-w-3xl text-center">
            <div className="overline mb-3">{t("ins.continue")}</div>
            <Link to={p("/insights")} className="font-serif text-3xl md:text-4xl hover:text-mk-bronze2 transition-colors" data-testid="article-all-insights">
              {t("article.all_insights")}
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}