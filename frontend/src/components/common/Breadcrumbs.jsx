import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { useI18n, localizedPath } from "@/i18n/context";

export default function Breadcrumbs({ items = [] }) {
  const { lang } = useI18n();
  const p = (path) => localizedPath(path, lang);
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-mk-text2" data-testid="breadcrumbs">
      <ol className="flex flex-wrap items-center gap-2 font-mono uppercase tracking-wider">
        <li>
          <Link to={p("/")} className="hover:text-mk-ink inline-flex items-center gap-1">
            <Home className="w-3 h-3" strokeWidth={1.5} />
          </Link>
        </li>
        {items.map((it, i) => (
          <React.Fragment key={i}>
            <ChevronRight className="w-3 h-3 text-mk-text2/50" strokeWidth={1.5} />
            <li>
              {it.to ? (
                <Link to={p(it.to)} className="hover:text-mk-ink">{it.label}</Link>
              ) : (
                <span className="text-mk-ink">{it.label}</span>
              )}
            </li>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
}
