import React, { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Search as SearchIcon } from "lucide-react";
import SEO from "@/components/common/SEO";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { useI18n, localizedPath } from "@/i18n/context";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default function SearchPage() {
  const loc = useLocation();
  const params = new URLSearchParams(loc.search);
  const initial = params.get("q") || "";
  const [q, setQ] = useState(initial);
  const [groups, setGroups] = useState({});
  const { lang, t } = useI18n();
  const p = (path) => localizedPath(path, lang);
  const nav = useNavigate();

  const TYPE_LABEL = {
    solution: t("search.type.solution"),
    industry: t("search.type.industry"),
    article: t("search.type.article"),
    page: t("search.type.page"),
  };

  useEffect(() => {
    if (!q || q.length < 2) { setGroups({}); return; }
    axios.get(`${BACKEND_URL}/api/search?q=${encodeURIComponent(q)}&lang=${lang}`).then(r => setGroups(r.data.groups || {}));
    nav(`${loc.pathname}?q=${encodeURIComponent(q)}`, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, lang]);

  return (
    <>
      <SEO title={t("bc.search")} description={t("search.global")} path="/search" />
      <section className="bg-mk-ink text-white pt-20 pb-16 mk-grain">
        <div className="container-mk">
          <Breadcrumbs items={[{ label: t("bc.search") }]} />
          <div className="mt-8">
            <div className="overline mb-4">{t("search.global")}</div>
            <div className="flex items-center border-b border-mk-bronze pb-3">
              <SearchIcon className="w-5 h-5 text-mk-bronze mr-3" strokeWidth={1.5} />
              <input value={q} onChange={e => setQ(e.target.value)} placeholder={t("search.page_placeholder")} className="flex-1 bg-transparent focus:outline-none font-serif text-3xl md:text-5xl" autoFocus data-testid="input-search-page" />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-mk-paper py-16">
        <div className="container-mk">
          {q.length < 2 && <div className="text-mk-text2" data-testid="search-min-chars">{t("search.min_chars")}</div>}
          {Object.keys(groups).length === 0 && q.length >= 2 && <div className="text-mk-text2" data-testid="search-no-results">{t("search.no_results_short")}</div>}
          <div className="space-y-14">
            {Object.entries(groups).map(([type, items]) => (
              <div key={type}>
                <div className="overline mb-4">{TYPE_LABEL[type] || type}</div>
                <ul className="divide-y divide-mk-line/15 border-y border-mk-line/15">
                  {items.map(it => (
                    <li key={it.path} className="py-5">
                      <Link to={p(it.path)} className="group flex items-start justify-between gap-8 hover:text-mk-bronze2 transition-colors">
                        <div>
                          <div className="font-serif text-2xl">{it.title}</div>
                          <div className="text-mk-text2 mt-1 text-sm">{it.excerpt}</div>
                        </div>
                        <div className="text-xs font-mono text-mk-text2 whitespace-nowrap self-center">{t("search.open")}</div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
