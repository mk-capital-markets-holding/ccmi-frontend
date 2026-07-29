import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Lock, Download, ShieldCheck, Calendar, Unlock } from "lucide-react";
import axios from "axios";
import SEO from "@/components/common/SEO";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { useI18n, localizedPath } from "@/i18n/context";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// KPI keys — value labels come from translations
const KPIS = [
  { k: "USD 42B", vk: "inv.stat.aum" },
  { k: "6", vk: "inv.stat.exchanges" },
  { k: "1.24M", vk: "inv.stat.investors" },
  { k: "99.97%", vk: "inv.stat.uptime" },
  { k: "USD 18M", vk: "inv.stat.series_a" },
  { k: "14", vk: "inv.stat.countries" },
];

const PUBLIC_SECTIONS = [
  { kickerKey: "inv.sec.vision", titleKey: "inv.sec.vision.title", bodyKey: "inv.sec.vision.body" },
  { kickerKey: "inv.sec.market", titleKey: "inv.sec.market.title", bodyKey: "inv.sec.market.body" },
  { kickerKey: "inv.sec.model", titleKey: "inv.sec.model.title", bodyKey: "inv.sec.model.body" },
  { kickerKey: "inv.sec.team", titleKey: "inv.sec.team.title", bodyKey: "inv.sec.team.body" },
];

const GATED_DOCS = [
  { nk: "inv.gated.doc1", size: "12 MB · PDF" },
  { nk: "inv.gated.doc2", size: "8 MB · PDF" },
  { nk: "inv.gated.doc3", size: "3 MB · XLSX" },
  { nk: "inv.gated.doc4", size: "0.4 MB · PDF" },
  { nk: "inv.gated.doc5", size: "2 MB · PDF" },
  { nk: "inv.gated.doc6", size: "Calendly" },
];

const GatedContent = ({ session, onLogout, t }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-testid="investor-gated-content">
    <div className="md:col-span-3 flex items-center justify-between border-b border-mk-line/15 pb-4 mb-2">
      <div>
        <div className="overline text-mk-bronze2">{t("inv.gated.overline")}</div>
        <div className="text-sm text-mk-text2 mt-1">{t("inv.gated.welcome")}, {session?.full_name}. {t("inv.gated.notice")}</div>
      </div>
      <button onClick={onLogout} className="text-xs uppercase tracking-widest text-mk-text2 hover:text-mk-ink" data-testid="btn-investor-logout">{t("inv.gated.logout")}</button>
    </div>
    {GATED_DOCS.map((d) => (
      <a key={d.nk} href="#" className="border border-mk-line/15 p-6 hover:bg-mk-paper2 transition-colors group flex items-start justify-between" data-testid={`investor-doc-${d.nk}`}>
        <div>
          <div className="font-serif text-lg">{t(d.nk)}</div>
          <div className="text-xs font-mono text-mk-text2 mt-1">{d.size}</div>
        </div>
        <Download className="w-5 h-5 text-mk-bronze group-hover:translate-y-0.5 transition-transform" strokeWidth={1.5} />
      </a>
    ))}
  </div>
);

export default function Investors() {
  const { lang, t } = useI18n();
  const p = (path) => localizedPath(path, lang);
  const [session, setSession] = useState(() => {
    const s = localStorage.getItem("mk-investor");
    return s ? JSON.parse(s) : null;
  });
  const [form, setForm] = useState({ email: "", full_name: "", organization: "", investor_type: "vc", ticket_size: "500k-2m", access_code: "" });
  const [msg, setMsg] = useState(null);
  const [sending, setSending] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setSending(true); setMsg(null);
    try {
      const { data } = await axios.post(`${BACKEND_URL}/api/investors/access`, form);
      if (data.status === "granted") {
        const s = { token: data.token, full_name: form.full_name, email: form.email };
        localStorage.setItem("mk-investor", JSON.stringify(s));
        setSession(s);
      } else {
        setMsg(data.message);
      }
    } catch { setMsg(t("inv.form.something_wrong")); }
    setSending(false);
  };

  const logout = () => { localStorage.removeItem("mk-investor"); setSession(null); };

  return (
    <>
      <SEO title={t("nav.investors")} description={t("inv.lede")} path="/investors" />

      <section className="bg-mk-ink text-white pt-20 pb-24 mk-grain relative overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[680px] h-[680px] rounded-full mk-hero-glow" style={{ background: "radial-gradient(circle, rgba(201,169,97,0.25), transparent 60%)" }} />
        <div className="container-mk relative">
          <Breadcrumbs items={[{ label: t("bc.investors") }]} />
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8">
              <div className="overline mb-4">{t("inv.overline")}</div>
              <h1 className="font-serif text-5xl md:text-7xl leading-[1.02]">{t("inv.title")}</h1>
              <p className="mt-8 text-white/70 max-w-2xl text-lg leading-relaxed">{t("inv.lede")}</p>
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 md:grid-cols-6 gap-px bg-white/10 border border-white/10">
            {KPIS.map(x => (
              <div key={x.vk} className="bg-mk-ink p-6"><div className="font-serif text-2xl md:text-3xl">{x.k}</div><div className="text-xs uppercase tracking-widest text-white/50 mt-2">{t(x.vk)}</div></div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mk-paper py-24">
        <div className="container-mk grid grid-cols-1 md:grid-cols-2 gap-px bg-mk-line/15 border border-mk-line/15">
          {PUBLIC_SECTIONS.map((s) => (
            <div key={s.kickerKey} className="bg-mk-paper p-10">
              <div className="overline mb-3">{t(s.kickerKey)}</div>
              <h3 className="font-serif text-2xl md:text-3xl leading-tight">{t(s.titleKey)}</h3>
              <p className="mt-4 text-mk-text2 leading-relaxed">{t(s.bodyKey)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-mk-paper2 py-24" data-testid="investor-data-room">
        <div className="container-mk max-w-5xl">
          <div className="overline mb-3">{t("inv.dataroom.overline")}</div>
          <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-10">{session ? t("inv.dataroom.welcome") : t("inv.dataroom.request")}</h2>

          {!session && (
            <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-mk-line/15 p-8 md:p-10 bg-mk-paper" data-testid="investor-access-form">
              <label className="col-span-2 flex items-center gap-2 text-xs font-mono text-mk-text2 uppercase tracking-widest"><ShieldCheck className="w-4 h-4 text-mk-bronze" strokeWidth={1.5} /> {t("inv.dataroom.notice")}</label>
              <input required placeholder={t("inv.form.fullname")} value={form.full_name} onChange={e => setForm({ ...form, full_name: e.target.value })} className="border-b border-mk-line/25 py-3 bg-transparent focus:outline-none focus:border-mk-bronze" data-testid="input-inv-fullname" />
              <input required type="email" placeholder={t("inv.form.email")} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="border-b border-mk-line/25 py-3 bg-transparent focus:outline-none focus:border-mk-bronze" data-testid="input-inv-email" />
              <input required placeholder={t("inv.form.org")} value={form.organization} onChange={e => setForm({ ...form, organization: e.target.value })} className="border-b border-mk-line/25 py-3 bg-transparent focus:outline-none focus:border-mk-bronze md:col-span-2" data-testid="input-inv-org" />
              <select value={form.investor_type} onChange={e => setForm({ ...form, investor_type: e.target.value })} className="border-b border-mk-line/25 py-3 bg-transparent focus:outline-none focus:border-mk-bronze" data-testid="select-inv-type">
                <option value="vc">{t("inv.form.type.vc")}</option>
                <option value="family_office">{t("inv.form.type.fo")}</option>
                <option value="institutional">{t("inv.form.type.inst")}</option>
                <option value="angel">{t("inv.form.type.angel")}</option>
              </select>
              <select value={form.ticket_size} onChange={e => setForm({ ...form, ticket_size: e.target.value })} className="border-b border-mk-line/25 py-3 bg-transparent focus:outline-none focus:border-mk-bronze" data-testid="select-inv-ticket">
                <option value="under-500k">{t("inv.form.ticket.under")}</option>
                <option value="500k-2m">{t("inv.form.ticket.small")}</option>
                <option value="2m-10m">{t("inv.form.ticket.mid")}</option>
                <option value="10m+">{t("inv.form.ticket.large")}</option>
              </select>
              <input placeholder={t("inv.form.access_code")} value={form.access_code} onChange={e => setForm({ ...form, access_code: e.target.value })} className="border-b border-mk-line/25 py-3 bg-transparent focus:outline-none focus:border-mk-bronze md:col-span-2 font-mono" data-testid="input-inv-code" />
              <button disabled={sending} type="submit" className="bg-mk-ink text-white px-6 py-3.5 hover:bg-mk-bronze hover:text-mk-ink transition-colors md:col-span-2 inline-flex items-center justify-center gap-2" data-testid="btn-inv-submit">
                {sending ? t("inv.form.verifying") : <><Unlock className="w-4 h-4" strokeWidth={1.5} /> {t("inv.form.submit")}</>}
              </button>
              {msg && <div className="md:col-span-2 text-sm text-mk-bronze2 mt-2">{msg}</div>}
            </form>
          )}

          {session && <GatedContent session={session} onLogout={logout} t={t} />}
        </div>
      </section>

      <section className="bg-mk-paper py-24">
        <div className="container-mk grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border border-mk-line/15 p-8">
            <Calendar className="w-6 h-6 text-mk-bronze mb-4" strokeWidth={1.5} />
            <h3 className="font-serif text-2xl">{t("inv.calendly.title")}</h3>
            <p className="mt-3 text-mk-text2">{t("inv.calendly.body")}</p>
            <Link to={p("/contact")} className="mt-6 inline-block bg-mk-bronze text-mk-ink px-5 py-3 hover:bg-mk-bronze2 transition-colors">{t("cta.book_call")}</Link>
          </div>
          <div className="border border-mk-line/15 p-8">
            <Lock className="w-6 h-6 text-mk-bronze mb-4" strokeWidth={1.5} />
            <h3 className="font-serif text-2xl">{t("inv.nda.title")}</h3>
            <p className="mt-3 text-mk-text2">{t("inv.nda.body")}</p>
            <a href="#" className="mt-6 inline-block border border-mk-ink px-5 py-3 hover:bg-mk-ink hover:text-white transition-colors">{t("inv.nda.sign")}</a>
          </div>
        </div>
      </section>
    </>
  );
}
