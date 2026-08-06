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

  // Helper de rendu sécurisé pour éviter l'écran blanc
  const safeRender = (val) => {
    if (!val) return "";
    if (typeof val === "string" || typeof val === "number") return val;
    if (typeof L === "function") {
      const res = L(val, lang);
      return typeof res === "object" ? (res[lang] || res.fr || res.en || "") : res;
    }
    return typeof val === "object" ? (val[lang] || val.fr || val.en || "") : String(val);
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