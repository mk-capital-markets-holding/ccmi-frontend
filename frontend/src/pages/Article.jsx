import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Linkedin, Twitter, Link as LinkIcon } from "lucide-react";
import SEO from "@/components/common/SEO";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { useI18n, localizedPath } from "@/i18n/context";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default function Article() {
  const { slug } = useParams();
  const { lang } = useI18n();
  const p = (path) => localizedPath(path, lang);
  const { data: article } = useQuery({ queryKey: ["article", slug], queryFn: async () => (await axios.get(`${BACKEND_URL}/api/articles/${slug}`)).data });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? Math.min(100, (window.scrollY / total) * 100) : 0);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!article) return <div className="container-mk py-32 text-mk-text2">Loading…</div>;

  const url = typeof window !== "undefined" ? window.location.href : "";
  const shareLinkedIn = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  const shareX = `https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(url)}`;

  return (
    <>
      <SEO title={article.title} description={article.excerpt} path={`/insights/${article.slug}`} image={article.cover} />
      <div className="mk-progress-bar" style={{ width: `${progress}%` }} />

      <article>
        <section className="bg-mk-paper pt-16 pb-10">
          <div className="container-mk max-w-4xl">
            <Breadcrumbs items={[{ label: "Insights", to: "/insights" }, { label: article.category }]} />
            <div className="mt-8">
              <div className="overline mb-3 text-mk-bronze2">{article.category} · {article.read_minutes} min read · {article.published_at}</div>
              <h1 className="font-serif text-4xl md:text-6xl leading-[1.05]">{article.title}</h1>
              <p className="mt-6 text-xl text-mk-text2 leading-relaxed max-w-3xl">{article.excerpt}</p>
              <div className="mt-8 flex items-center justify-between border-y border-mk-line/15 py-4">
                <div className="text-sm">By <span className="font-medium">{article.author}</span></div>
                <div className="flex items-center gap-3 text-mk-text2">
                  <a href={shareLinkedIn} target="_blank" rel="noopener noreferrer" aria-label="Share LinkedIn" className="hover:text-mk-bronze"><Linkedin className="w-4 h-4" strokeWidth={1.5} /></a>
                  <a href={shareX} target="_blank" rel="noopener noreferrer" aria-label="Share X" className="hover:text-mk-bronze"><Twitter className="w-4 h-4" strokeWidth={1.5} /></a>
                  <button onClick={() => navigator.clipboard?.writeText(url)} aria-label="Copy link" className="hover:text-mk-bronze"><LinkIcon className="w-4 h-4" strokeWidth={1.5} /></button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container-mk max-w-4xl">
          <div className="aspect-[16/9] bg-mk-ink overflow-hidden">
            <img src={article.cover} alt={article.title} className="w-full h-full object-cover" />
          </div>
        </div>

        <section className="bg-mk-paper py-16">
          <div className="container-mk max-w-3xl">
            <div className="space-y-6 text-lg leading-relaxed text-mk-text">
              {article.body.map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <div className="mt-16 pt-8 border-t border-mk-line/15 flex flex-wrap gap-2">
              {(article.tags || []).map(tag => (
                <span key={tag} className="text-xs uppercase tracking-widest border border-mk-line/25 px-3 py-1 text-mk-text2">{tag}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-mk-paper2 py-16">
          <div className="container-mk max-w-3xl text-center">
            <div className="overline mb-3">Continue reading</div>
            <Link to={p("/insights")} className="font-serif text-3xl md:text-4xl hover:text-mk-bronze2 transition-colors">All insights →</Link>
          </div>
        </section>
      </article>
    </>
  );
}
