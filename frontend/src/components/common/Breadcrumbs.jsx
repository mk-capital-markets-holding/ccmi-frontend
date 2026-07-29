import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { useI18n, localizedPath } from "@/i18n/context";
import { L } from "@/i18n/pick";

export default function Breadcrumbs({ items = [] }) {
  const { lang } = useI18n();
  const p = (path) => localizedPath(path, lang);
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-white/60" data-testid="breadcrumbs">
      <ol className="flex flex-wrap items-center gap-2 font-mono uppercase tracking-wider">
        <li>
          <Link to={p("/")} className="hover:text-mk-bronze inline-flex items-center gap-1">
            <Home className="w-3 h-3" strokeWidth={1.5} />
          </Link>
        </li>
        {items.map((it, i) => (
          <React.Fragment key={i}>
            <ChevronRight className="w-3 h-3 opacity-50" strokeWidth={1.5} />
            <li>
              {it.to ? (
                <Link to={p(it.to)} className="hover:text-mk-bronze">{L(it.label, lang)}</Link>
              ) : (
                <span className="text-mk-bronze">{L(it.label, lang)}</span>
              )}
            </li>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
}
