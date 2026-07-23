import React from "react";
import { Link } from "react-router-dom";
import SEO from "@/components/common/SEO";
import { useI18n, localizedPath } from "@/i18n/context";

export default function NotFound() {
  const { lang } = useI18n();
  const p = (path) => localizedPath(path, lang);
  return (
    <>
      <SEO title="Not found" description="The page you are looking for does not exist." path="/404" />
      <section className="bg-mk-ink text-white min-h-[80vh] flex items-center mk-grain">
        <div className="container-mk grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <div className="overline text-mk-bronze mb-4">Error 404</div>
            <h1 className="font-serif text-6xl md:text-8xl leading-none">This page has moved to another jurisdiction.</h1>
            <p className="mt-8 text-white/70 max-w-xl">The URL you requested does not exist. Perhaps a link is outdated, or a page has been renamed as part of our platform reorganisation.</p>
            <div className="mt-8 flex gap-3">
              <Link to={p("/")} className="bg-mk-bronze text-mk-ink px-5 py-3 hover:bg-mk-bronze2 transition-colors">Back to home</Link>
              <Link to={p("/search")} className="border border-white/40 px-5 py-3 hover:bg-white hover:text-mk-ink transition-colors">Search the site</Link>
            </div>
          </div>
          <div className="lg:col-span-4 border-l border-mk-bronze/50 pl-6 text-sm text-white/70">
            <div className="overline mb-3 text-white/50">Suggestions</div>
            <ul className="space-y-2">
              <li><Link to={p("/solutions")} className="hover:text-mk-bronze">Solutions</Link></li>
              <li><Link to={p("/industries")} className="hover:text-mk-bronze">Industries</Link></li>
              <li><Link to={p("/investors")} className="hover:text-mk-bronze">Investors</Link></li>
              <li><Link to={p("/contact")} className="hover:text-mk-bronze">Contact</Link></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
