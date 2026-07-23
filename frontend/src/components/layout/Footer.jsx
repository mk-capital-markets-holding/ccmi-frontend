import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Linkedin, Youtube, Twitter, ArrowRight } from "lucide-react";
import { useI18n, localizedPath } from "@/i18n/context";
import { COMPANY } from "@/data/companyInfo";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default function Footer() {
  const { t, lang } = useI18n();
  const p = (path) => localizedPath(path, lang);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const subscribe = async (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setStatus("sending");
    try {
      await axios.post(`${BACKEND_URL}/api/newsletter/subscribe`, { email, language: lang });
      setStatus("done");
      setEmail("");
    } catch { setStatus("error"); }
  };

  return (
    <footer className="bg-mk-ink text-white mt-32 mk-grain" data-testid="site-footer">
      <div className="container-mk py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 border border-mk-bronze flex items-center justify-center">
                <span className="font-serif text-mk-bronze text-xl leading-none">M</span>
              </div>
              <div>
                <div className="font-serif text-lg">{COMPANY.short}</div>
                <div className="overline text-[9px] text-white/50">Technologies · DIFC Dubai</div>
              </div>
            </div>
            <p className="text-white/70 max-w-md text-sm leading-relaxed">{t("footer.tagline")}</p>

            <form onSubmit={subscribe} className="mt-8 max-w-md" data-testid="footer-newsletter-form">
              <div className="overline text-white/60 mb-3">{t("footer.newsletter")}</div>
              <div className="flex border border-white/20">
                <input
                  type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder={lang === "fr" ? "votre email professionnel" : "your work email"}
                  className="flex-1 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none"
                  data-testid="input-newsletter-email"
                />
                <button type="submit" disabled={status === "sending"} className="bg-mk-bronze text-mk-ink px-5 py-3 hover:bg-mk-bronze2 transition-colors" data-testid="btn-newsletter-submit">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              {status === "done" && <div className="text-xs text-mk-bronze mt-3">{lang === "fr" ? "Merci — un email de confirmation vient d'être envoyé." : "Thank you — a confirmation email has just been sent."}</div>}
            </form>
          </div>

          <div className="md:col-span-2">
            <div className="overline mb-4">{t("footer.company")}</div>
            <ul className="space-y-3 text-sm text-white/70">
              <li><Link to={p("/about")} className="hover:text-mk-bronze">{t("nav.about")}</Link></li>
              <li><Link to={p("/founder")} className="hover:text-mk-bronze">{t("nav.founder")}</Link></li>
              <li><Link to={p("/technology")} className="hover:text-mk-bronze">{t("nav.technology")}</Link></li>
              <li><Link to={p("/investors")} className="hover:text-mk-bronze">{t("nav.investors")}</Link></li>
              <li><Link to={p("/contact")} className="hover:text-mk-bronze">{t("nav.contact")}</Link></li>
              <li><Link to={p("/contact?tab=careers")} className="hover:text-mk-bronze">{lang === "fr" ? "Carrières" : "Careers"}</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="overline mb-4">{t("footer.resources")}</div>
            <ul className="space-y-3 text-sm text-white/70">
              <li><Link to={p("/solutions")} className="hover:text-mk-bronze">{t("nav.solutions")}</Link></li>
              <li><Link to={p("/industries")} className="hover:text-mk-bronze">{t("nav.industries")}</Link></li>
              <li><Link to={p("/insights")} className="hover:text-mk-bronze">{t("nav.insights")}</Link></li>
              <li><Link to={p("/solutions/roadmap")} className="hover:text-mk-bronze">{t("footer.future")}</Link></li>
              <li><Link to={p("/search")} className="hover:text-mk-bronze">{lang === "fr" ? "Recherche" : "Search"}</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="overline mb-4">{t("footer.legal")}</div>
            <ul className="space-y-3 text-sm text-white/70">
              <li><Link to={p("/legal/privacy")} className="hover:text-mk-bronze">{t("footer.privacy")}</Link></li>
              <li><Link to={p("/legal/terms")} className="hover:text-mk-bronze">{t("footer.terms")}</Link></li>
              <li><Link to={p("/legal/cookies")} className="hover:text-mk-bronze">{t("footer.cookies")}</Link></li>
            </ul>
            <div className="overline mt-8 mb-4">DIFC · Dubai</div>
            <div className="text-sm text-white/70 leading-relaxed">
              {COMPANY.hq.address}<br />
              <a href={`tel:${COMPANY.hq.phone.replace(/\s/g, "")}`} className="hover:text-mk-bronze">{COMPANY.hq.phone}</a><br />
              <a href={`mailto:${COMPANY.hq.email}`} className="hover:text-mk-bronze">{COMPANY.hq.email}</a>
            </div>
            <div className="flex gap-4 mt-6">
              <a href={COMPANY.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-white/60 hover:text-mk-bronze"><Linkedin className="w-4 h-4" strokeWidth={1.5} /></a>
              <a href={COMPANY.socials.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-white/60 hover:text-mk-bronze"><Youtube className="w-4 h-4" strokeWidth={1.5} /></a>
              <a href={COMPANY.socials.x} target="_blank" rel="noopener noreferrer" aria-label="X" className="text-white/60 hover:text-mk-bronze"><Twitter className="w-4 h-4" strokeWidth={1.5} /></a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div className="text-xs text-white/50">{t("footer.copyright")}</div>
          <div className="text-xs text-white/50 md:text-right font-mono">
            DFSA F1298-24 · ADGM FSRA 220089 · ISO 27001:2022 · SOC 2 Type II
          </div>
        </div>
      </div>
    </footer>
  );
}
