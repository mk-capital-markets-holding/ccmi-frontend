import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Linkedin, Youtube, Twitter, ArrowRight, MapPin } from "lucide-react";
import { useI18n, localizedPath } from "@/i18n/context";
import { L } from "@/i18n/pick";
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
          
          {/* Colonne 1 : Marque & Newsletter */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 border border-mk-bronze flex items-center justify-center">
                <span className="font-serif text-mk-bronze text-xl leading-none">M</span>
              </div>
              <div>
                <div className="font-serif text-lg">MK Capital Markets</div>
                <div className="overline text-[9px] text-white/50">Technologies & Holding L.L.C-FZ</div>
              </div>
            </div>
            <p className="text-white/70 max-w-md text-sm leading-relaxed">
              {t("footer.tagline") || "Building the Digital Infrastructure for African Capital Markets."}
            </p>

            <form onSubmit={subscribe} className="mt-8 max-w-md" data-testid="footer-newsletter-form">
              <div className="overline text-white/60 mb-3">{t("footer.newsletter") || "Newsletter"}</div>
              <div className="flex border border-white/20">
                <input
                  type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder={t("footer.newsletter_placeholder") || "Votre adresse e-mail"}
                  className="flex-1 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none"
                  data-testid="input-newsletter-email"
                />
                <button type="submit" disabled={status === "sending"} className="bg-mk-bronze text-mk-ink px-5 py-3 hover:bg-mk-bronze2 transition-colors" data-testid="btn-newsletter-submit">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              {status === "done" && <div className="text-xs text-mk-bronze mt-3">{t("footer.newsletter_success")}</div>}
            </form>
          </div>

          {/* Colonne 2 : Navigation Entreprise */}
          <div className="md:col-span-2">
            <div className="overline mb-4">{t("footer.company") || "Entreprise"}</div>
            <ul className="space-y-3 text-sm text-white/70">
              <li><Link to={p("/about")} className="hover:text-mk-bronze">{t("nav.about") || "À propos"}</Link></li>
              <li><Link to={p("/founder")} className="hover:text-mk-bronze">{t("nav.founder") || "Fondateur"}</Link></li>
              <li><Link to={p("/technology")} className="hover:text-mk-bronze">{t("nav.technology") || "Plateforme CCMI"}</Link></li>
              <li><Link to={p("/investors")} className="hover:text-mk-bronze">{t("nav.investors") || "Partenaires Pilotes"}</Link></li>
              <li><Link to={p("/contact")} className="hover:text-mk-bronze">{t("nav.contact") || "Contact"}</Link></li>
            </ul>
          </div>

          {/* Colonne 3 : Liens Utiles & Légal */}
          <div className="md:col-span-2">
            <div className="overline mb-4">{t("footer.resources") || "Ressources"}</div>
            <ul className="space-y-3 text-sm text-white/70">
              <li><Link to={p("/solutions")} className="hover:text-mk-bronze">{t("nav.solutions") || "Modules SaaS"}</Link></li>
              <li><Link to={p("/solutions/roadmap")} className="hover:text-mk-bronze">{t("footer.future") || "Roadmap 2026-2028"}</Link></li>
              <li><Link to={p("/legal/privacy")} className="hover:text-mk-bronze">{t("footer.privacy") || "Confidentialité"}</Link></li>
              <li><Link to={p("/legal/terms")} className="hover:text-mk-bronze">{t("footer.terms") || "Mentions Légales"}</Link></li>
            </ul>
          </div>

          {/* Colonne 4 : Entités & Présence Régionale */}
          <div className="md:col-span-3">
            <div className="overline mb-4">Bureaux & Entités</div>
            <div className="text-sm text-white/70 leading-relaxed space-y-4">
              <div>
                <p className="font-semibold text-white flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-mk-bronze" /> Dubaï (Holding)
                </p>
                <p className="text-xs text-white/60">MK Capital Markets Technologies & Holding L.L.C-FZ</p>
                <p className="text-xs text-white/50">Meydan Free Zone, Dubai, UAE</p>
              </div>
              <div>
                <p className="font-semibold text-white flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-mk-bronze" /> Douala (Filiale Afrique)
                </p>
                <p className="text-xs text-white/60">MKCM Consulting</p>
                <p className="text-xs text-white/50">Douala, Cameroun (Zone CEMAC)</p>
              </div>
            </div>
            
            <div className="flex gap-4 mt-6">
              <a href={COMPANY.socials?.linkedin || "#"} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-white/60 hover:text-mk-bronze"><Linkedin className="w-4 h-4" strokeWidth={1.5} /></a>
              <a href={COMPANY.socials?.youtube || "#"} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-white/60 hover:text-mk-bronze"><Youtube className="w-4 h-4" strokeWidth={1.5} /></a>
              <a href={COMPANY.socials?.x || "#"} target="_blank" rel="noopener noreferrer" aria-label="X" className="text-white/60 hover:text-mk-bronze"><Twitter className="w-4 h-4" strokeWidth={1.5} /></a>
            </div>
          </div>

        </div>

        {/* Barre du bas avec licence officielle */}
        <div className="mt-16 pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div className="text-xs text-white/50">
            © {new Date().getFullYear()} MK Capital Markets Technologies & Holding L.L.C-FZ. Tous droits réservés.
          </div>
          <div className="text-xs text-white/50 md:text-right font-mono">
            License N° 2651682.01 (Meydan Free Zone, Dubai)
          </div>
        </div>

      </div>
    </footer>
  );
}