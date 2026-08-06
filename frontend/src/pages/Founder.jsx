import React from "react";
import SEO from "@/components/common/SEO";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { FOUNDER } from "@/data/founder";
import { useI18n } from "@/i18n/context";
import { L } from "@/i18n/pick";
import { GraduationCap, Award, Monitor } from "lucide-react";

export default function FounderPage() {
  const { lang, t } = useI18n();

  return (
    <>
      <SEO
        title={`${FOUNDER.name} — ${FOUNDER.title}`}
        description={`${FOUNDER.name}, ${FOUNDER.title} chez ${FOUNDER.entity}. Plus de 17 ans d'expérience en marchés de capitaux et banques d'investissement.`}
        path="/founder"
      />

      <section className="bg-mk-paper py-16">
        <div className="container-mk">
          <Breadcrumbs items={[{ label: t("nav.founder") || "Fondateur" }]} />

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Colonne Gauche : Carte d'identité Sombre */}
            <div className="lg:col-span-4 bg-[#2C323B] text-white p-8 rounded-sm shadow-sm">
              <h1 className="text-2xl font-bold font-serif">{FOUNDER.name}</h1>
              <p className="text-sm font-semibold text-white/90 mt-2">{FOUNDER.title}</p>
              <p className="text-xs text-white/70 mt-1">{FOUNDER.entity}</p>
              <p className="text-xs text-white/50">{FOUNDER.location}</p>

              <div className="my-6 border-t border-white/20" />

              <div className="inline-block bg-white/10 text-white/70 text-[10px] uppercase font-mono tracking-wider px-2 py-1 mb-6 rounded-xs">
                {FOUNDER.experienceYears}
              </div>

              <ul className="space-y-3 text-xs text-white/80">
                {FOUNDER.expertise.map((exp, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-mk-bronze rounded-full" />
                    <span>{L(exp, lang)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Colonne Droite : Parcours Pro, Académique & Certifications */}
            <div className="lg:col-span-8 space-y-10 pl-0 lg:pl-4">
              
              {/* Professional Experience */}
              <div>
                <h2 className="text-xl font-bold font-serif text-mk-ink mb-6">Professional Experience</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {FOUNDER.professionalExperience.map((company, idx) => (
                    <div 
                      key={idx} 
                      className="bg-white border border-mk-line/30 border-l-4 border-l-[#2C323B] p-5 font-semibold text-mk-ink text-sm shadow-xs flex items-center"
                    >
                      {/* FIX ERREUR #31 : Sécurisation si `company` est un objet */}
                      {typeof company === "object" 
                        ? L(company.name || company.title || company, lang) 
                        : company}
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-mk-line/20" />

              {/* Academic Background */}
              <div>
                <h2 className="text-xl font-bold font-serif text-mk-ink mb-6">Academic Background</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {FOUNDER.academicBackground.map((edu, idx) => (
                    <div 
                      key={idx} 
                      className={`bg-[#EAECEF] p-5 rounded-xs ${idx === 2 ? "sm:col-span-2" : ""}`}
                    >
                      <div className="flex items-start gap-2 text-mk-ink font-bold text-sm">
                        <GraduationCap className="w-5 h-5 shrink-0 mt-0.5" />
                        <span>{L(edu.degree, lang)}</span>
                      </div>
                      <p className="text-xs text-mk-text2 mt-3 font-medium">
                        {L(edu.institution, lang)} — <span className="text-mk-text2/70">{L(edu.country, lang)}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-mk-line/20" />

              {/* Professional Certifications */}
              <div>
                <h2 className="text-xl font-bold font-serif text-mk-ink mb-6">Professional Certifications</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  {/* PMP */}
                  {FOUNDER.certifications[0] && (
                    <div className="bg-white border border-mk-line/30 rounded-xs overflow-hidden shadow-xs relative">
                      <div className="w-full flex justify-center pt-3 pb-1">
                        <div className="w-9 h-9 bg-[#2C323B] rounded-full flex items-center justify-center text-white">
                          <Award className="w-5 h-5" />
                        </div>
                      </div>
                      <div className="p-5 text-center pt-2">
                        <h3 className="font-bold text-mk-ink text-base">🏅 {L(FOUNDER.certifications[0].title, lang)}</h3>
                        <p className="text-xs text-mk-text2 font-semibold mt-1">{L(FOUNDER.certifications[0].subtitle, lang)}</p>
                        <p className="text-[11px] text-mk-text2/70 font-medium mt-1">{L(FOUNDER.certifications[0].issuer, lang)}</p>
                      </div>
                    </div>
                  )}

                  {/* Enterprise Architecture */}
                  {FOUNDER.certifications[1] && (
                    <div className="bg-white border border-mk-line/30 rounded-xs overflow-hidden shadow-xs relative">
                      <div className="w-full flex justify-center pt-3 pb-1">
                        <div className="w-9 h-9 bg-[#2C323B] rounded-full flex items-center justify-center text-white">
                          <Award className="w-5 h-5" />
                        </div>
                      </div>
                      <div className="p-5 text-center pt-2">
                        <h3 className="font-bold text-mk-ink text-base">🏅 {L(FOUNDER.certifications[1].title, lang)}</h3>
                        <p className="text-xs text-mk-text2 font-semibold mt-1">{L(FOUNDER.certifications[1].subtitle, lang)}</p>
                        <p className="text-[11px] text-mk-text2/70 font-medium mt-1">{L(FOUNDER.certifications[1].issuer, lang)}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Financial Engineering C++ */}
                {FOUNDER.certifications[2] && (
                  <div className="bg-white border border-mk-line/30 rounded-xs overflow-hidden shadow-xs relative">
                    <div className="w-full flex justify-center pt-3 pb-1">
                      <div className="w-9 h-9 bg-[#2C323B] rounded-full flex items-center justify-center text-white">
                        <Monitor className="w-5 h-5" />
                      </div>
                    </div>
                    <div className="p-5 text-center pt-2">
                      <h3 className="font-bold text-mk-ink text-base">🏅 {L(FOUNDER.certifications[2].title, lang)}</h3>
                      <p className="text-xs text-mk-text2 font-semibold mt-1">{L(FOUNDER.certifications[2].subtitle, lang)}</p>
                      <p className="text-[11px] text-mk-text2/70 font-medium mt-1">{L(FOUNDER.certifications[2].issuer, lang)}</p>
                    </div>
                  </div>
                )}

              </div>

            </div>

          </div>
        </div>
      </section>
    </>
  );
}