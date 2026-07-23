import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { CheckCircle2, MapPin } from "lucide-react";
import SEO from "@/components/common/SEO";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { useI18n } from "@/i18n/context";
import { COMPANY } from "@/data/companyInfo";
import { MODULES } from "@/data/modules";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const TABS = [
  { k: "general", en: "General inquiry", fr: "Demande générale" },
  { k: "demo", en: "Request a demo", fr: "Demander une démo" },
  { k: "investor", en: "Investor contact", fr: "Contact investisseur" },
  { k: "careers", en: "Careers", fr: "Carrières" },
  { k: "partnership", en: "Partnership", fr: "Partenariat" },
  { k: "support", en: "Support", fr: "Support" },
];

const Input = (props) => <input {...props} className={`border-b border-mk-line/25 py-3 bg-transparent focus:outline-none focus:border-mk-bronze w-full ${props.className || ""}`} />;
const Textarea = (props) => <textarea {...props} rows={4} className={`border border-mk-line/25 p-3 bg-transparent focus:outline-none focus:border-mk-bronze w-full ${props.className || ""}`} />;
const Select = (props) => <select {...props} className={`border-b border-mk-line/25 py-3 bg-transparent focus:outline-none focus:border-mk-bronze w-full ${props.className || ""}`} />;

function useForm(defaults) {
  const [values, setValues] = useState(defaults);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState(null);
  const setField = (k, v) => setValues(prev => ({ ...prev, [k]: v }));
  const submit = async (formType) => {
    setStatus("sending");
    try {
      const { data } = await axios.post(`${BACKEND_URL}/api/contact`, { form_type: formType, payload: values });
      setStatus("done"); setMessage(data.message);
    } catch { setStatus("error"); setMessage("Something went wrong. Please try again."); }
  };
  return { values, setField, submit, status, message };
}

const Success = ({ message }) => (
  <div className="border border-mk-bronze/50 bg-mk-bronze/5 p-6 flex gap-3" data-testid="form-success">
    <CheckCircle2 className="w-5 h-5 text-mk-bronze mt-0.5" strokeWidth={1.5} />
    <div><div className="font-serif text-lg">Thank you.</div><div className="text-sm text-mk-text2 mt-1">{message}</div></div>
  </div>
);

const AFRICAN_COUNTRIES = ["Morocco", "Egypt", "Tunisia", "Algeria", "Nigeria", "Kenya", "Ghana", "Côte d'Ivoire", "South Africa", "Senegal", "Rwanda", "Ethiopia", "Tanzania", "Uganda"];
const OTHER_COUNTRIES = ["United Arab Emirates", "Saudi Arabia", "Qatar", "Bahrain", "United Kingdom", "France", "United States", "Other"];

function GeneralForm() {
  const f = useForm({ name: "", email: "", subject: "", message: "" });
  if (f.status === "done") return <Success message={f.message} />;
  return (
    <form onSubmit={(e) => { e.preventDefault(); f.submit("general"); }} className="grid grid-cols-1 md:grid-cols-2 gap-4" data-testid="form-general">
      <Input required placeholder="Full name" value={f.values.name} onChange={e => f.setField("name", e.target.value)} />
      <Input required type="email" placeholder="Email" value={f.values.email} onChange={e => f.setField("email", e.target.value)} />
      <Input required placeholder="Subject" value={f.values.subject} onChange={e => f.setField("subject", e.target.value)} className="md:col-span-2" />
      <Textarea required placeholder="Message" value={f.values.message} onChange={e => f.setField("message", e.target.value)} className="md:col-span-2" />
      <button type="submit" disabled={f.status === "sending"} className="bg-mk-ink text-white px-6 py-3 hover:bg-mk-bronze hover:text-mk-ink transition-colors md:col-span-2">{f.status === "sending" ? "Sending…" : "Send message"}</button>
    </form>
  );
}

function DemoForm() {
  const f = useForm({ institution: "", country: "", sector: "", company: "", name: "", email: "", phone: "", employees: "", modules: [], date: "", message: "" });
  const toggleModule = (slug) => f.setField("modules", f.values.modules.includes(slug) ? f.values.modules.filter(s => s !== slug) : [...f.values.modules, slug]);
  if (f.status === "done") return <Success message={f.message} />;
  return (
    <form onSubmit={(e) => { e.preventDefault(); f.submit("demo"); }} className="grid grid-cols-1 md:grid-cols-2 gap-4" data-testid="form-demo">
      <Select required value={f.values.institution} onChange={e => f.setField("institution", e.target.value)}>
        <option value="">Institution type *</option>
        <option>Exchange</option><option>Regulator</option><option>Bank</option><option>Broker/Dealer</option><option>Asset manager</option><option>Issuer</option><option>Investor</option>
      </Select>
      <Select required value={f.values.country} onChange={e => f.setField("country", e.target.value)}>
        <option value="">Country *</option>
        <optgroup label="Africa">{AFRICAN_COUNTRIES.map(c => <option key={c}>{c}</option>)}</optgroup>
        <optgroup label="Other">{OTHER_COUNTRIES.map(c => <option key={c}>{c}</option>)}</optgroup>
      </Select>
      <Input required placeholder="Sector *" value={f.values.sector} onChange={e => f.setField("sector", e.target.value)} />
      <Input required placeholder="Company *" value={f.values.company} onChange={e => f.setField("company", e.target.value)} />
      <Input required placeholder="Full name *" value={f.values.name} onChange={e => f.setField("name", e.target.value)} />
      <Input required type="email" placeholder="Professional email *" value={f.values.email} onChange={e => f.setField("email", e.target.value)} />
      <Input placeholder="Phone" value={f.values.phone} onChange={e => f.setField("phone", e.target.value)} />
      <Input placeholder="Number of employees" value={f.values.employees} onChange={e => f.setField("employees", e.target.value)} />
      <Input type="date" placeholder="Desired date" value={f.values.date} onChange={e => f.setField("date", e.target.value)} className="md:col-span-2" />
      <div className="md:col-span-2">
        <div className="overline mb-3">Modules of interest *</div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {MODULES.map(m => (
            <label key={m.slug} className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={f.values.modules.includes(m.slug)} onChange={() => toggleModule(m.slug)} className="mk-check" />
              {m.name}
            </label>
          ))}
        </div>
      </div>
      <Textarea placeholder="Message (optional)" value={f.values.message} onChange={e => f.setField("message", e.target.value)} className="md:col-span-2" />
      <button type="submit" disabled={f.status === "sending"} className="bg-mk-bronze text-mk-ink px-6 py-3 hover:bg-mk-bronze2 transition-colors md:col-span-2">{f.status === "sending" ? "Sending…" : "Request a demo"}</button>
    </form>
  );
}

function InvestorForm() {
  const f = useForm({ name: "", email: "", organization: "", investor_type: "", ticket: "", timeline: "", message: "" });
  if (f.status === "done") return <Success message={f.message} />;
  return (
    <form onSubmit={(e) => { e.preventDefault(); f.submit("investor"); }} className="grid grid-cols-1 md:grid-cols-2 gap-4" data-testid="form-investor">
      <Input required placeholder="Full name *" value={f.values.name} onChange={e => f.setField("name", e.target.value)} />
      <Input required type="email" placeholder="Email *" value={f.values.email} onChange={e => f.setField("email", e.target.value)} />
      <Input required placeholder="Organization *" value={f.values.organization} onChange={e => f.setField("organization", e.target.value)} className="md:col-span-2" />
      <Select required value={f.values.investor_type} onChange={e => f.setField("investor_type", e.target.value)}>
        <option value="">Investor type *</option><option>Venture capital</option><option>Family office</option><option>Institutional</option><option>Angel</option>
      </Select>
      <Select required value={f.values.ticket} onChange={e => f.setField("ticket", e.target.value)}>
        <option value="">Ticket size *</option><option>Under USD 500k</option><option>USD 500k – 2M</option><option>USD 2M – 10M</option><option>USD 10M+</option>
      </Select>
      <Input placeholder="Investment timeline" value={f.values.timeline} onChange={e => f.setField("timeline", e.target.value)} className="md:col-span-2" />
      <Textarea placeholder="Thesis or message" value={f.values.message} onChange={e => f.setField("message", e.target.value)} className="md:col-span-2" />
      <button type="submit" className="bg-mk-ink text-white px-6 py-3 hover:bg-mk-bronze hover:text-mk-ink transition-colors md:col-span-2">Send to IR team</button>
    </form>
  );
}

function CareersForm() {
  const f = useForm({ name: "", email: "", role: "", linkedin: "", cv: "", cover: "" });
  if (f.status === "done") return <Success message={f.message} />;
  const onFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // Store filename only (payload) — mocked upload
    f.setField("cv", file.name);
  };
  return (
    <form onSubmit={(e) => { e.preventDefault(); f.submit("careers"); }} className="grid grid-cols-1 md:grid-cols-2 gap-4" data-testid="form-careers">
      <Input required placeholder="Full name *" value={f.values.name} onChange={e => f.setField("name", e.target.value)} />
      <Input required type="email" placeholder="Email *" value={f.values.email} onChange={e => f.setField("email", e.target.value)} />
      <Input required placeholder="Role you are applying for *" value={f.values.role} onChange={e => f.setField("role", e.target.value)} className="md:col-span-2" />
      <Input placeholder="LinkedIn profile" value={f.values.linkedin} onChange={e => f.setField("linkedin", e.target.value)} className="md:col-span-2" />
      <label className="md:col-span-2 border border-dashed border-mk-line/30 p-4 flex items-center justify-between cursor-pointer">
        <span className="text-sm text-mk-text2">{f.values.cv || "Upload CV (PDF, DOCX)"}</span>
        <input type="file" accept=".pdf,.docx" onChange={onFile} className="hidden" data-testid="input-careers-cv" />
        <span className="text-xs uppercase tracking-widest text-mk-bronze2">Choose file</span>
      </label>
      <Textarea placeholder="Cover letter" value={f.values.cover} onChange={e => f.setField("cover", e.target.value)} className="md:col-span-2" />
      <button type="submit" className="bg-mk-ink text-white px-6 py-3 hover:bg-mk-bronze hover:text-mk-ink transition-colors md:col-span-2">Submit application</button>
    </form>
  );
}

function PartnershipForm() {
  const f = useForm({ name: "", email: "", organization: "", partnership_type: "", message: "" });
  if (f.status === "done") return <Success message={f.message} />;
  return (
    <form onSubmit={(e) => { e.preventDefault(); f.submit("partnership"); }} className="grid grid-cols-1 md:grid-cols-2 gap-4" data-testid="form-partnership">
      <Input required placeholder="Full name *" value={f.values.name} onChange={e => f.setField("name", e.target.value)} />
      <Input required type="email" placeholder="Email *" value={f.values.email} onChange={e => f.setField("email", e.target.value)} />
      <Input required placeholder="Organization *" value={f.values.organization} onChange={e => f.setField("organization", e.target.value)} className="md:col-span-2" />
      <Select value={f.values.partnership_type} onChange={e => f.setField("partnership_type", e.target.value)} className="md:col-span-2">
        <option value="">Partnership type</option><option>Technology integration</option><option>Reseller / channel</option><option>Regulator sandbox</option><option>Academic / research</option><option>Other</option>
      </Select>
      <Textarea required placeholder="Message *" value={f.values.message} onChange={e => f.setField("message", e.target.value)} className="md:col-span-2" />
      <button type="submit" className="bg-mk-ink text-white px-6 py-3 hover:bg-mk-bronze hover:text-mk-ink transition-colors md:col-span-2">Send</button>
    </form>
  );
}

function SupportForm() {
  const f = useForm({ name: "", email: "", client_id: "", priority: "medium", subject: "", description: "" });
  if (f.status === "done") return <Success message={f.message} />;
  return (
    <form onSubmit={(e) => { e.preventDefault(); f.submit("support"); }} className="grid grid-cols-1 md:grid-cols-2 gap-4" data-testid="form-support">
      <Input required placeholder="Full name *" value={f.values.name} onChange={e => f.setField("name", e.target.value)} />
      <Input required type="email" placeholder="Email *" value={f.values.email} onChange={e => f.setField("email", e.target.value)} />
      <Input placeholder="Client ID" value={f.values.client_id} onChange={e => f.setField("client_id", e.target.value)} />
      <Select value={f.values.priority} onChange={e => f.setField("priority", e.target.value)}>
        <option value="low">Priority · Low</option><option value="medium">Priority · Medium</option><option value="high">Priority · High</option><option value="critical">Priority · Critical</option>
      </Select>
      <Input required placeholder="Subject *" value={f.values.subject} onChange={e => f.setField("subject", e.target.value)} className="md:col-span-2" />
      <Textarea required placeholder="Description of the issue *" value={f.values.description} onChange={e => f.setField("description", e.target.value)} className="md:col-span-2" />
      <button type="submit" className="bg-mk-ink text-white px-6 py-3 hover:bg-mk-bronze hover:text-mk-ink transition-colors md:col-span-2">Open ticket</button>
    </form>
  );
}

const FORMS = { general: GeneralForm, demo: DemoForm, investor: InvestorForm, careers: CareersForm, partnership: PartnershipForm, support: SupportForm };

export default function Contact() {
  const { lang } = useI18n();
  const loc = useLocation();
  const params = new URLSearchParams(loc.search);
  const initial = params.get("tab") && TABS.find(t => t.k === params.get("tab")) ? params.get("tab") : "demo";
  const [tab, setTab] = useState(initial);
  const ActiveForm = FORMS[tab];

  return (
    <>
      <SEO title="Contact — Talk to our team" description="Request a demo, contact IR, apply, become a partner or open a support ticket. Our team responds within 1 business day." path="/contact" />

      <section className="bg-mk-ink text-white pt-20 pb-24 mk-grain">
        <div className="container-mk">
          <Breadcrumbs items={[{ label: "Contact" }]} />
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <div className="overline mb-4">Get in touch</div>
              <h1 className="font-serif text-5xl md:text-7xl leading-[1.02]">Let's talk.</h1>
              <p className="mt-6 text-white/70 max-w-2xl text-lg">Six focused channels. One team. Response guaranteed within one business day.</p>
            </div>
            <div className="lg:col-span-4 border-l border-mk-bronze/40 pl-6 text-sm text-white/70 space-y-4">
              <div className="flex gap-3"><MapPin className="w-4 h-4 text-mk-bronze mt-1" strokeWidth={1.5} /><span>{COMPANY.hq.address}</span></div>
              <div>Phone: <a href={`tel:${COMPANY.hq.phone.replace(/\s/g, "")}`} className="hover:text-mk-bronze">{COMPANY.hq.phone}</a></div>
              <div>Email: <a href={`mailto:${COMPANY.hq.email}`} className="hover:text-mk-bronze">{COMPANY.hq.email}</a></div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-mk-paper py-16" data-testid="contact-forms">
        <div className="container-mk">
          <div className="border-b border-mk-line/15 flex flex-wrap gap-1 mb-10 overflow-x-auto">
            {TABS.map(tt => (
              <button key={tt.k} onClick={() => setTab(tt.k)} className={`px-4 py-3 text-sm border-b-2 transition-colors whitespace-nowrap ${tab === tt.k ? "border-mk-bronze text-mk-ink" : "border-transparent text-mk-text2 hover:text-mk-ink"}`} data-testid={`tab-${tt.k}`}>{lang === "fr" ? tt.fr : tt.en}</button>
            ))}
          </div>
          <div className="max-w-3xl"><ActiveForm /></div>
          <div className="mt-8 text-xs text-mk-text2 font-mono">Protected by reCAPTCHA v3 (simulated in demo mode).</div>
        </div>
      </section>

      <section className="bg-mk-paper2 py-16">
        <div className="container-mk grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <div className="overline mb-3">Dubai HQ</div>
            <h2 className="font-serif text-3xl">Emirates Financial Towers · DIFC</h2>
            <p className="mt-4 text-mk-text2">Visit our HQ — we host institutional visitors by appointment throughout the week.</p>
          </div>
          <div className="aspect-video bg-mk-ink border border-mk-line/10">
            <iframe title="MK CMT DIFC HQ" src={COMPANY.hq.mapEmbed} className="w-full h-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>
      </section>
    </>
  );
}
