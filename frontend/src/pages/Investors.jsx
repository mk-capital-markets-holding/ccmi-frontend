import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Lock, Download, ShieldCheck, Calendar, Unlock } from "lucide-react";
import axios from "axios";
import SEO from "@/components/common/SEO";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { useI18n, localizedPath } from "@/i18n/context";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const PUBLIC_SECTIONS = [
  { kicker: "Vision", title: "The capital-markets OS for the emerging world.", body: "By 2030, one in every two African listed issuers runs on CCMI. Our Series A capital funds three new exchange deployments and a doubling of our Dubai engineering team." },
  { kicker: "Market opportunity", title: "USD 18B TAM by 2030.", body: "Total addressable market for capital-markets technology across MENA + Africa is projected at USD 18B by 2030 (Oliver Wyman, 2025). Our SAM is USD 6.4B — the modernisation-ready segment we serve today." },
  { kicker: "Business model", title: "Recurring platform revenue + integration services.", body: "SaaS licensing (68% of revenue), professional services (24%), and regulator-grade managed services (8%). Median contract length is 4.2 years." },
  { kicker: "Team & IP", title: "The team, the IP, the moat.", body: "78 people. 42 in engineering. 8 patents filed on our event-sourced ledger. Advisory board includes two former exchange CEOs and a former central-bank deputy governor." },
];

const KPIS = [
  { k: "USD 42B", v: "AUM supported" }, { k: "6", v: "Exchanges live" }, { k: "1.24M", v: "Investors served" }, { k: "99.97%", v: "Uptime SLA" }, { k: "USD 18M", v: "Series A raised" }, { k: "14", v: "Countries covered" },
];

const GatedContent = ({ session, onLogout }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-testid="investor-gated-content">
    <div className="md:col-span-3 flex items-center justify-between border-b border-mk-line/15 pb-4 mb-2">
      <div>
        <div className="overline text-mk-bronze2">Data room · access granted</div>
        <div className="text-sm text-mk-text2 mt-1">Welcome, {session?.full_name}. This session is logged for compliance purposes.</div>
      </div>
      <button onClick={onLogout} className="text-xs uppercase tracking-widest text-mk-text2 hover:text-mk-ink" data-testid="btn-investor-logout">End session</button>
    </div>
    {[
      { name: "Pitch Deck · Series B", size: "12 MB · PDF", url: "#" },
      { name: "Information Memorandum", size: "8 MB · PDF", url: "#" },
      { name: "Financial Projections (2026-2030)", size: "3 MB · XLSX", url: "#" },
      { name: "Cap Table", size: "0.4 MB · PDF", url: "#" },
      { name: "Product Roadmap · Detailed", size: "2 MB · PDF", url: "#" },
      { name: "Reference calls · schedule", size: "Calendly", url: "#" },
    ].map((d) => (
      <a key={d.name} href={d.url} className="border border-mk-line/15 p-6 hover:bg-mk-paper2 transition-colors group flex items-start justify-between" data-testid={`investor-doc-${d.name}`}>
        <div>
          <div className="font-serif text-lg">{d.name}</div>
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
    const t = localStorage.getItem("mk-investor");
    return t ? JSON.parse(t) : null;
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
    } catch { setMsg("Something went wrong. Please try again."); }
    setSending(false);
  };

  const logout = () => { localStorage.removeItem("mk-investor"); setSession(null); };

  return (
    <>
      <SEO title="Investors — Data room, roadmap and fundraising" description="MK Capital Markets Technologies · Series B in preparation. Explore our thesis, roadmap and gated data room for qualified investors." path="/investors" />

      <section className="bg-mk-ink text-white pt-20 pb-24 mk-grain relative overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[680px] h-[680px] rounded-full mk-hero-glow" style={{ background: "radial-gradient(circle, rgba(201,169,97,0.25), transparent 60%)" }} />
        <div className="container-mk relative">
          <Breadcrumbs items={[{ label: "Investors" }]} />
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8">
              <div className="overline mb-4">Series B · Preparation phase</div>
              <h1 className="font-serif text-5xl md:text-7xl leading-[1.02]">Building the capital-markets operating system for the emerging world.</h1>
              <p className="mt-8 text-white/70 max-w-2xl text-lg leading-relaxed">We are preparing our Series B — USD 45M — to fund the deployment of CCMI across three additional African exchanges, an operations hub in Nairobi, and the launch of our Marketplace module.</p>
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 md:grid-cols-6 gap-px bg-white/10 border border-white/10">
            {KPIS.map(x => (
              <div key={x.v} className="bg-mk-ink p-6"><div className="font-serif text-2xl md:text-3xl">{x.k}</div><div className="text-xs uppercase tracking-widest text-white/50 mt-2">{x.v}</div></div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mk-paper py-24">
        <div className="container-mk grid grid-cols-1 md:grid-cols-2 gap-px bg-mk-line/15 border border-mk-line/15">
          {PUBLIC_SECTIONS.map((s) => (
            <div key={s.kicker} className="bg-mk-paper p-10">
              <div className="overline mb-3">{s.kicker}</div>
              <h3 className="font-serif text-2xl md:text-3xl leading-tight">{s.title}</h3>
              <p className="mt-4 text-mk-text2 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-mk-paper2 py-24" data-testid="investor-data-room">
        <div className="container-mk max-w-5xl">
          <div className="overline mb-3">Data room · Qualified investors</div>
          <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-10">{session ? "Welcome back." : "Request access."}</h2>

          {!session && (
            <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-mk-line/15 p-8 md:p-10 bg-mk-paper" data-testid="investor-access-form">
              <label className="col-span-2 flex items-center gap-2 text-xs font-mono text-mk-text2 uppercase tracking-widest"><ShieldCheck className="w-4 h-4 text-mk-bronze" strokeWidth={1.5} /> Access is granted after NDA and identity verification. Use demo code "MKCMT2026" for instant access.</label>
              <input required placeholder="Full name" value={form.full_name} onChange={e => setForm({ ...form, full_name: e.target.value })} className="border-b border-mk-line/25 py-3 bg-transparent focus:outline-none focus:border-mk-bronze" data-testid="input-inv-fullname" />
              <input required type="email" placeholder="Professional email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="border-b border-mk-line/25 py-3 bg-transparent focus:outline-none focus:border-mk-bronze" data-testid="input-inv-email" />
              <input required placeholder="Organization" value={form.organization} onChange={e => setForm({ ...form, organization: e.target.value })} className="border-b border-mk-line/25 py-3 bg-transparent focus:outline-none focus:border-mk-bronze md:col-span-2" data-testid="input-inv-org" />
              <select value={form.investor_type} onChange={e => setForm({ ...form, investor_type: e.target.value })} className="border-b border-mk-line/25 py-3 bg-transparent focus:outline-none focus:border-mk-bronze" data-testid="select-inv-type">
                <option value="vc">Venture capital</option><option value="family_office">Family office</option><option value="institutional">Institutional</option><option value="angel">Angel / individual</option>
              </select>
              <select value={form.ticket_size} onChange={e => setForm({ ...form, ticket_size: e.target.value })} className="border-b border-mk-line/25 py-3 bg-transparent focus:outline-none focus:border-mk-bronze" data-testid="select-inv-ticket">
                <option value="under-500k">Under USD 500k</option><option value="500k-2m">USD 500k – 2M</option><option value="2m-10m">USD 2M – 10M</option><option value="10m+">USD 10M+</option>
              </select>
              <input placeholder="Access code (optional)" value={form.access_code} onChange={e => setForm({ ...form, access_code: e.target.value })} className="border-b border-mk-line/25 py-3 bg-transparent focus:outline-none focus:border-mk-bronze md:col-span-2 font-mono" data-testid="input-inv-code" />
              <button disabled={sending} type="submit" className="bg-mk-ink text-white px-6 py-3.5 hover:bg-mk-bronze hover:text-mk-ink transition-colors md:col-span-2 inline-flex items-center justify-center gap-2" data-testid="btn-inv-submit">
                {sending ? "Verifying…" : <><Unlock className="w-4 h-4" strokeWidth={1.5} /> Request access to data room</>}
              </button>
              {msg && <div className="md:col-span-2 text-sm text-mk-bronze2 mt-2">{msg}</div>}
            </form>
          )}

          {session && <GatedContent session={session} onLogout={logout} />}
        </div>
      </section>

      <section className="bg-mk-paper py-24">
        <div className="container-mk grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border border-mk-line/15 p-8">
            <Calendar className="w-6 h-6 text-mk-bronze mb-4" strokeWidth={1.5} />
            <h3 className="font-serif text-2xl">Book a call with the CEO.</h3>
            <p className="mt-3 text-mk-text2">45-minute session on the thesis, product and roadmap. Calendly-powered.</p>
            <Link to={p("/contact")} className="mt-6 inline-block bg-mk-bronze text-mk-ink px-5 py-3 hover:bg-mk-bronze2 transition-colors">{t("cta.book_call")}</Link>
          </div>
          <div className="border border-mk-line/15 p-8">
            <Lock className="w-6 h-6 text-mk-bronze mb-4" strokeWidth={1.5} />
            <h3 className="font-serif text-2xl">NDA workflow.</h3>
            <p className="mt-3 text-mk-text2">Sign our institutional NDA to unlock detailed financials and reference calls.</p>
            <a href="#" className="mt-6 inline-block border border-mk-ink px-5 py-3 hover:bg-mk-ink hover:text-white transition-colors">Sign NDA</a>
          </div>
        </div>
      </section>
    </>
  );
}
