import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useI18n } from "../i18n"; // vérifie le chemin si besoin

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "";

const ValueProp = () => {
  const { t, lang } = useI18n();
  const { data } = useQuery({ 
    queryKey: ["stats"], 
    queryFn: async () => {
      try {
        return (await axios.get(`${BACKEND_URL}/api/site/stats`)).data;
      } catch {
        return null;
      }
    } 
  });

  // Helper de rendu ultra-sécurisé : extrait les textes même si c'est un objet { name, category }
  const safeRender = (val) => {
    if (!val) return "";
    if (typeof val === "string" || typeof val === "number") return val;
    
    let target = val;
    if (typeof target === "object" && target !== null) {
      target = target[lang] || target.fr || target.en || target;
    }
    
    if (typeof target === "string" || typeof target === "number") return target;
    
    // Si target est un objet du type { name, category }
    if (typeof target === "object" && target !== null) {
      if (target.name) return safeRender(target.name);
      if (target.title) return safeRender(target.title);
      if (target.label) return safeRender(target.label);
    }
    
    return "";
  };

  const items = [
    { id: "aum", k: `USD ${data?.aum_supported_usd_bn ?? 42}B`, v: safeRender(t("home.value.aum")) },
    { id: "exchanges", k: `${data?.exchanges_deployed ?? 6}`, v: safeRender(t("home.value.exchanges")) },
    { id: "investors", k: `${((data?.investors_managed ?? 1240000) / 1_000_000).toFixed(2)}M`, v: safeRender(t("home.value.investors")) },
    { id: "countries", k: `${data?.countries ?? 14}`, v: safeRender(t("home.value.countries")) },
  ];

  return (
    <section className="bg-mk-paper border-y border-mk-line/10" data-testid="value-prop">
      <div className="container-mk py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4">
          <div className="overline mb-4">{safeRender(t("home.value.overline"))}</div>
          <h2 className="font-serif text-4xl md:text-5xl leading-tight">{safeRender(t("home.value.title"))}</h2>
        </div>
        <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-0 border-l border-mk-line/10">
          {items.map((it) => (
            <div key={it.id} className="border-r border-b border-mk-line/10 p-6 md:p-8 last:border-r-0">
              <div className="font-serif text-4xl md:text-5xl text-mk-ink">{it.k}</div>
              <div className="text-xs uppercase tracking-widest text-mk-text2 mt-3">{it.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Home = () => {
  return (
    <main>
      <ValueProp />
    </main>
  );
};

export default Home;