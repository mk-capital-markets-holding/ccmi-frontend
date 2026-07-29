import React, { useEffect, useState, useRef } from "react";
import { Search as SearchIcon, X, ArrowUpRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useI18n, localizedPath } from "@/i18n/context";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const TYPE_LABEL = {
  solution: "Solutions",
  industry: "Industries",
  article: "Insights",
  page: "Pages",
};

export default function SearchModal({ open, onClose }) {
  const { t, lang } = useI18n();
  const p = (path) => localizedPath(path, lang);
  const [q, setQ] = useState("");
  const [groups, setGroups] = useState({});
  const inputRef = useRef(null);
  const nav = useNavigate();

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 40);
    if (!open) { setQ(""); setGroups({}); }
  }, [open]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose?.(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    if (!q || q.length < 2) { setGroups({}); return; }
    const ctrl = new AbortController();
    axios.get(`${BACKEND_URL}/api/search?q=${encodeURIComponent(q)}`, { signal: ctrl.signal })
      .then(r => setGroups(r.data.groups || {}))
      .catch(() => {});
    return () => ctrl.abort();
  }, [q]);

  if (!open) return null;

  const goto = (path) => { onClose?.(); nav(p(path)); };

  return (
    <div className="fixed inset-0 z-[60] bg-mk-ink/80 backdrop-blur-sm" onClick={onClose} data-testid="search-modal">
      <div className="container-mk pt-20 md:pt-32" onClick={(e) => e.stopPropagation()}>
        <div className="bg-mk-paper text-mk-ink border border-mk-line/10 shadow-2xl">
          <div className="flex items-center border-b border-mk-line/10 px-6">
            <SearchIcon className="w-5 h-5 text-mk-text2" strokeWidth={1.5} />
            <input
              ref={inputRef}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t("search.placeholder")}
              className="flex-1 py-6 px-4 bg-transparent focus:outline-none font-serif text-2xl"
              data-testid="input-search-query"
            />
            <button onClick={onClose} data-testid="btn-search-close" aria-label="Close" className="p-2 text-mk-text2 hover:text-mk-ink">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="max-h-[60vh] overflow-y-auto scroll-elegant">
            {q.length < 2 && (
              <div className="p-12 text-mk-text2 text-sm">{t("search.empty")}</div>
            )}
            {Object.keys(groups).length === 0 && q.length >= 2 && (
              <div className="p-12 text-mk-text2 text-sm">{lang === "fr" ? "Aucun résultat pour cette requête." : "No results for this query."}</div>
            )}
            {Object.entries(groups).map(([type, items]) => (
              <div key={type} className="border-b border-mk-line/10 last:border-b-0">
                <div className="overline px-6 pt-6">{TYPE_LABEL[type] || type}</div>
                <ul className="py-2">
                  {items.map((it) => (
                    <li key={it.path}>
                      <button onClick={() => goto(it.path)} className="w-full text-left px-6 py-3 hover:bg-mk-paper2 flex items-start justify-between gap-6 group" data-testid={`search-result-${it.path}`}>
                        <div>
                          <div className="font-serif text-lg">{it.title}</div>
                          <div className="text-sm text-mk-text2 mt-0.5">{it.excerpt}</div>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-mk-text2 group-hover:text-mk-bronze mt-1.5" strokeWidth={1.5} />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
