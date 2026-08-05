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

  const items = [
    { id: "aum", k: `USD ${data?.aum_supported_usd_bn ?? 42}B`, v: L(t("home.value.aum"), lang) },
    { id: "exchanges", k: `${data?.exchanges_deployed ?? 6}`, v: L(t("home.value.exchanges"), lang) },
    { id: "investors", k: `${((data?.investors_managed ?? 1240000) / 1_000_000).toFixed(2)}M`, v: L(t("home.value.investors"), lang) },
    { id: "countries", k: `${data?.countries ?? 14}`, v: L(t("home.value.countries"), lang) },
  ];

  return (
    <section className="bg-mk-paper border-y border-mk-line/10" data-testid="value-prop">
      <div className="container-mk py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4">
          <div className="overline mb-4">{L(t("home.value.overline"), lang)}</div>
          <h2 className="font-serif text-4xl md:text-5xl leading-tight">{L(t("home.value.title"), lang)}</h2>
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