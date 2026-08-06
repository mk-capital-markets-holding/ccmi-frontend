import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MODULES, getModule } from '../data/modules';
import { ArrowLeft, ArrowRight, CheckCircle2, Users, TrendingUp } from 'lucide-react';

export default function ModulePage({ lang = 'fr' }) {
  const { slug } = useParams();
  
  // Récupération sécurisée du module actif ou de secours
  const activeModule = (typeof getModule === 'function' ? getModule(slug) : null) || 
                       (Array.isArray(MODULES) && MODULES.length > 0 ? MODULES[0] : null);

  const isFr = lang === 'fr';

  // Si aucun module n'est trouvé
  if (!activeModule) {
    return (
      <div className="bg-[#0b132b] text-white min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-2xl font-serif mb-4">Module introuvable</h1>
          <Link to="/solutions" className="text-amber-500 hover:underline">
            &larr; Retour aux solutions
          </Link>
        </div>
      </div>
    );
  }

  // Helper de sécurité pour extraire les textes multilingues sans planter
  const safeText = (field) => {
    if (!field) return '';
    if (typeof field === 'string') return field;
    return field[lang] || field['fr'] || field['en'] || '';
  };

  const otherModules = Array.isArray(MODULES) 
    ? MODULES.filter((m) => m && m.slug !== activeModule.slug)
    : [];

  return (
    <div className="bg-[#0b132b] text-white min-h-screen font-sans">
      
      {/* SECTION DU HAUT : Fond Bleu Nuit Institutionnel */}
      <div className="pt-28 pb-16 px-6 sm:px-12 max-w-7xl mx-auto">
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs font-mono tracking-widest text-amber-500/80 uppercase mb-8">
          <Link to="/solutions" className="hover:text-amber-400 flex items-center gap-1">
            <ArrowLeft className="w-3 h-3" /> SOLUTIONS
          </Link>
          <span>&gt;</span>
          <span className="text-slate-400">{safeText(activeModule.name)}</span>
        </div>

        {/* Titre & Description */}
        <div className="max-w-4xl mb-10">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-500/90 block mb-3">
            MODULE CCMI {activeModule.num || "01"}
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif tracking-tight text-white mb-6 leading-tight">
            {safeText(activeModule.name)}
          </h1>
          {activeModule.tagline && (
            <p className="text-xl sm:text-2xl font-serif italic text-slate-300 mb-6 font-light">
              {safeText(activeModule.tagline)}
            </p>
          )}
          {activeModule.description && (
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-3xl">
              {safeText(activeModule.description)}
            </p>
          )}
        </div>

        {/* Boutons d'action */}
        <div className="flex flex-wrap items-center gap-4 mb-14">
          <Link
            to="/contact"
            className="px-6 py-3.5 bg-[#d4af37] hover:bg-[#c5a028] text-slate-950 font-medium text-sm transition-all shadow-md"
          >
            {isFr ? "Demander une démo" : "Request a Demo"}
          </Link>
          <a
            href="#features"
            className="px-6 py-3.5 border border-slate-700 hover:border-slate-500 text-slate-200 font-medium text-sm transition-all"
          >
            {isFr ? "Voir la présentation produit" : "View product overview"}
          </a>
        </div>

        {/* APERÇU DE L'INTERFACE SAAS */}
        {activeModule.screenshot && (
          <div className="mb-14 border border-slate-800 rounded-lg overflow-hidden bg-[#0d1836] shadow-2xl">
            <div className="bg-[#080d1e] px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-700 inline-block"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-slate-700 inline-block"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-slate-700 inline-block"></span>
              </div>
              <span className="text-[11px] font-mono text-slate-500 tracking-wider">
                ccmi.mk-capitalmarkets.com/{activeModule.slug}
              </span>
              <div className="w-12"></div>
            </div>
            <div className="max-h-[500px] overflow-hidden bg-[#0a1128] flex items-center justify-center">
              <img
                src={activeModule.screenshot}
                alt={safeText(activeModule.name)}
                className="w-full h-full object-cover object-top opacity-95 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        )}

        {/* Grille d'architecture (L1, L2, L3, L4...) */}
        {Array.isArray(activeModule.architecture) && activeModule.architecture.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-slate-800 bg-[#0d1836]">
            {activeModule.architecture.map((item, index) => (
              <div
                key={index}
                className="p-6 border-b sm:border-b-0 border-r border-slate-800 last:border-r-0 flex flex-col justify-between min-h-[130px]"
              >
                <span className="text-xs font-mono text-amber-500/80 mb-3 block">
                  L{index + 1}
                </span>
                <p className="font-serif text-lg text-slate-200 leading-snug">
                  {safeText(item)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECTION DU BAS : Fond Beige / Crème Institutionnel */}
      <div className="bg-[#f4f1ea] text-slate-900 py-20 px-6 sm:px-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Valeur Créée & Clients Cibles */}
          {(activeModule.valueCreated || (Array.isArray(activeModule.targetClients) && activeModule.targetClients.length > 0)) && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
              
              {/* Carte Valeur Créée */}
              {activeModule.valueCreated && (
                <div className="p-8 bg-[#e9e5dc] border border-slate-300 rounded-sm">
                  <div className="flex items-center gap-3 mb-4 text-amber-800">
                    <TrendingUp className="w-5 h-5" />
                    <span className="text-xs font-mono uppercase tracking-widest font-semibold">
                      {isFr ? "Valeur Créée" : "Value Created"}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl text-slate-900 mb-4">
                    {safeText(activeModule.valueCreated?.title) || (isFr ? "Impact Opérationnel" : "Operational Impact")}
                  </h3>
                  <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                    {safeText(activeModule.valueCreated?.description) || safeText(activeModule.valueCreated)}
                  </p>
                </div>
              )}

              {/* Carte Clients Cibles */}
              {Array.isArray(activeModule.targetClients) && activeModule.targetClients.length > 0 && (
                <div className="p-8 bg-[#e9e5dc] border border-slate-300 rounded-sm">
                  <div className="flex items-center gap-3 mb-4 text-amber-800">
                    <Users className="w-5 h-5" />
                    <span className="text-xs font-mono uppercase tracking-widest font-semibold">
                      {isFr ? "Clients Cibles" : "Target Clients"}
                    </span>
                  </div>
                  <ul className="space-y-3 mt-4">
                    {activeModule.targetClients.map((client, cIdx) => (
                      <li key={cIdx} className="flex items-start gap-3 text-slate-800 text-sm sm:text-base">
                        <CheckCircle2 className="w-4 h-4 text-amber-800 mt-1 shrink-0" />
                        <span>{safeText(client)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Section Spécifications & Fonctionnalités */}
          {Array.isArray(activeModule.features) && activeModule.features.length > 0 && (
            <div id="features" className="mb-20">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-700 block mb-3">
                {isFr ? "Spécifications" : "Specifications"}
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-slate-900 mb-10">
                {isFr ? "Fonctionnalités intégrées du module" : "Module core features"}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 border-t border-b border-slate-300 py-8">
                {activeModule.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start space-x-4 py-2">
                    <span className="text-amber-700 font-serif text-sm font-semibold mt-1">
                      —
                    </span>
                    <div>
                      <h3 className="font-serif text-lg text-slate-900 font-medium">
                        {safeText(feat?.title) || safeText(feat)}
                      </h3>
                      {feat?.detail && (
                        <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                          {safeText(feat.detail)}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section Modules complémentaires */}
          {otherModules.length > 0 && (
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-700 block mb-3">
                {isFr ? "MODULES COMPLÉMENTAIRES" : "COMPLEMENTARY MODULES"}
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-slate-900 mb-12">
                {isFr ? `Déployer ${safeText(activeModule.name)} aux côtés de :` : `Deploy ${safeText(activeModule.name)} alongside:`}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {otherModules.slice(0, 3).map((item, idx) => (
                  <Link
                    key={idx}
                    to={`/solutions/${item.slug}`}
                    className="block p-8 bg-[#e9e5dc] hover:bg-[#e2ddd3] border border-slate-300 transition-all group"
                  >
                    <span className="text-xs font-mono text-amber-800 block mb-3">
                      MODULE {item.num || `0${idx + 1}`}
                    </span>
                    <h3 className="font-serif text-xl text-slate-900 mb-3 group-hover:text-amber-900 transition-colors">
                      {safeText(item.name)}
                    </h3>
                    <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed mb-6">
                      {safeText(item.description)}
                    </p>
                    <div className="flex items-center text-xs font-mono text-amber-800 uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                      {isFr ? "Découvrir" : "Explore"} <ArrowRight className="w-3 h-3 ml-2" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}