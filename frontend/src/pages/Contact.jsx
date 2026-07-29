import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { CheckCircle2, MapPin } from "lucide-react";
import SEO from "@/components/common/SEO";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { useI18n } from "@/i18n/context";
import { L } from "@/i18n/pick";
import { COMPANY } from "@/data/companyInfo";
import { MODULES } from "@/data/modules";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const TABS = [
  { k: "general", tk: "contact.tab.general" },
  { k: "demo", tk: "contact.tab.demo" },
  { k: "investor", tk: "contact.tab.investor" },
  { k: "careers", tk: "contact.tab.careers" },
  { k: "partnership", tk: "contact.tab.partnership" },
  { k: "support", tk: "contact.tab.support" },
];

const AFRICAN_COUNTRY_KEYS = ["country.morocco", "country.egypt", "country.tunisia", "country.algeria", "country.nigeria", "country.kenya", "country.ghana", "country.civ", "country.south_africa", "country.senegal", "country.rwanda", "country.ethiopia", "country.tanzania", "country.uganda"];
const OTHER_COUNTRY_KEYS = ["country.uae", "country.saudi", "country.qatar", "country.bahrain", "country.uk", "country.france", "country.us", "country.other"];

const Input = (props) => <input {...props} className={`border-b border-mk-line/25 py-3 bg-transparent focus:outline-none focus:border-mk-bronze w-full ${props.className || ""}`} />;
const Textarea = (props) => <textarea {...props} rows={4} className={`border border-mk-line/25 p-3 bg-transparent focus:outline-none focus:border-mk-bronze w-full ${props.className || ""}`} />;
const Select = (props) => <select {...props} className={`border-b border-mk-line/25 py-3 bg-transparent focus:outline-none focus:border-mk-bronze w-full ${props.className || ""}`} />;

function useForm(defaults, t) {
  const [values, setValues] = useState(defaults);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState(null);
  const setField = (k, v) => setValues(prev => ({ ...prev, [k]: v }));
  const submit = async (formType) => {
    setStatus("sending");
    try {
      const { data } = await axios.post(`${BACKEND_URL}/api/contact`, { form_type: formType, payload: values });
      setStatus("done"); setMessage(data.message);
    } catch { setStatus("error"); setMessage(t("contact.form.something_wrong")); }
  };
  return { values, setField, submit, status, message };
}

const Success = ({ message, t }) => (
  <div className="border border-mk-bronze/50 bg-mk-bronze/5 p-6 flex gap-3" data-testid="form-success">
    <CheckCircle2 className="w-5 h-5 text-mk-bronze mt-0.5" strokeWidth={1.5} />
    <div><div className="font-serif text-lg">{t("contact.thanks_title")}</div><div className="text-sm text-mk-text2 mt-1">{message}</div></div>
  </div>
);

function GeneralForm() {
  const { t } = useI18n();
  const f = useForm({ name: "", email: "", subject: "", message: "" }, t);
  if (f.status === "done") return <Success message={f.message} t={t} />;
  return (
    <form onSubmit={(e) => { e.preventDefault(); f.submit("general"); }} className="grid grid-cols-1 md:grid-cols-2 gap-4" data-testid="form-general">
      <Input required placeholder={t("form.name")} value={f.values.name} onChange={e => f.setField("name", e.target.value)} />
      <Input required type="email" placeholder={t("form.email")} value={f.values.email} onChange={e => f.setField("email", e.target.value)} />
      <Input required placeholder={t("form.subject")} value={f.values.subject} onChange={e => f.setField("subject", e.target.value)} className="md:col-span-2" />
      <Textarea required placeholder={t("form.message")} value={f.values.message} onChange={e => f.setField("message", e.target.value)} className="md:col-span-2" />
      <button type="submit" disabled={f.status === "sending"} className="bg-mk-ink text-white px-6 py-3 hover:bg-mk-bronze hover:text-mk-ink transition-colors md:col-span-2">{f.status === "sending" ? t("form.sending") : t("form.send")}</button>
    </form>
  );
}

function DemoForm() {
  const { t, lang } = useI18n();
  const f = useForm({ institution: "", country: "", sector: "", company: "", name: "", email: "", phone: "", employees: "", modules: [], date: "", message: "" }, t);
  const toggleModule = (slug) => f.setField("modules", f.values.modules.includes(slug) ? f.values.modules.filter(s => s !== slug) : [...f.values.modules, slug]);
  if (f.status === "done") return <Success message={f.message} t={t} />;
  return (
    <form onSubmit={(e) => { e.preventDefault(); f.submit("demo"); }} className="grid grid-cols-1 md:grid-cols-2 gap-4" data-testid="form-demo">
      <Select required value={f.values.institution} onChange={e => f.setField("institution", e.target.value)}>
        <option value="">{t("form.institution")}</option>
        <option value="exchange">{t("form.institution.exchange")}</option>
        <option value="regulator">{t("form.institution.regulator")}</option>
        <option value="bank">{t("form.institution.bank")}</option>
        <option value="broker">{t("form.institution.broker")}</option>
        <option value="asset_manager">{t("form.institution.asset_manager")}</option>
        <option value="issuer">{t("form.institution.issuer")}</option>
        <option value="investor">{t("form.institution.investor")}</option>
      </Select>
      <Select required value={f.values.country} onChange={e => f.setField("country", e.target.value)}>
        <option value="">{t("form.country")}</option>
        <optgroup label={t("country.group.africa")}>{AFRICAN_COUNTRY_KEYS.map(ck => <option key={ck} value={ck}>{t(ck)}</option>)}</optgroup>
        <optgroup label={t("country.group.other")}>{OTHER_COUNTRY_KEYS.map(ck => <option key={ck} value={ck}>{t(ck)}</option>)}</optgroup>
      </Select>
      <Input required placeholder={t("form.sector")} value={f.values.sector} onChange={e => f.setField("sector", e.target.value)} />
      <Input required placeholder={t("form.company")} value={f.values.company} onChange={e => f.setField("company", e.target.value)} />
      <Input required placeholder={t("form.name_req")} value={f.values.name} onChange={e => f.setField("name", e.target.value)} />
      <Input required type="email" placeholder={t("form.email_req")} value={f.values.email} onChange={e => f.setField("email", e.target.value)} />
      <Input placeholder={t("form.phone")} value={f.values.phone} onChange={e => f.setField("phone", e.target.value)} />
      <Input placeholder={t("form.employees")} value={f.values.employees} onChange={e => f.setField("employees", e.target.value)} />
      <Input type="date" placeholder={t("form.date")} value={f.values.date} onChange={e => f.setField("date", e.target.value)} className="md:col-span-2" />
      <div className="md:col-span-2">
        <div className="overline mb-3">{t("form.modules_overline")}</div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {MODULES.map(m => (
            <label key={m.slug} className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={f.values.modules.includes(m.slug)} onChange={() => toggleModule(m.slug)} className="mk-check" />
              {L(m.name, lang)}
            </label>
          ))}
        </div>
      </div>
      <Textarea placeholder={t("form.message_opt")} value={f.values.message} onChange={e => f.setField("message", e.target.value)} className="md:col-span-2" />
      <button type="submit" disabled={f.status === "sending"} className="bg-mk-bronze text-mk-ink px-6 py-3 hover:bg-mk-bronze2 transition-colors md:col-span-2">{f.status === "sending" ? t("form.sending") : t("form.submit_demo")}</button>
    </form>
  );
}

function InvestorForm() {
  const { t } = useI18n();
  const f = useForm({ name: "", email: "", organization: "", investor_type: "", ticket: "", timeline: "", message: "" }, t);
  if (f.status === "done") return <Success message={f.message} t={t} />;
  return (
    <form onSubmit={(e) => { e.preventDefault(); f.submit("investor"); }} className="grid grid-cols-1 md:grid-cols-2 gap-4" data-testid="form-investor">
      <Input required placeholder={t("form.name_req")} value={f.values.name} onChange={e => f.setField("name", e.target.value)} />
      <Input required type="email" placeholder={t("form.email_req")} value={f.values.email} onChange={e => f.setField("email", e.target.value)} />
      <Input required placeholder={t("form.company")} value={f.values.organization} onChange={e => f.setField("organization", e.target.value)} className="md:col-span-2" />
      <Select required value={f.values.investor_type} onChange={e => f.setField("investor_type", e.target.value)}>
        <option value="">{t("form.investor_type")}</option>
        <option value="vc">{t("inv.form.type.vc")}</option>
        <option value="family_office">{t("inv.form.type.fo")}</option>
        <option value="institutional">{t("inv.form.type.inst")}</option>
        <option value="angel">{t("inv.form.type.angel")}</option>
      </Select>
      <Select required value={f.values.ticket} onChange={e => f.setField("ticket", e.target.value)}>
        <option value="">{t("form.ticket")}</option>
        <option value="under-500k">{t("inv.form.ticket.under")}</option>
        <option value="500k-2m">{t("inv.form.ticket.small")}</option>
        <option value="2m-10m">{t("inv.form.ticket.mid")}</option>
        <option value="10m+">{t("inv.form.ticket.large")}</option>
      </Select>
      <Input placeholder={t("form.timeline")} value={f.values.timeline} onChange={e => f.setField("timeline", e.target.value)} className="md:col-span-2" />
      <Textarea placeholder={t("form.thesis")} value={f.values.message} onChange={e => f.setField("message", e.target.value)} className="md:col-span-2" />
      <button type="submit" className="bg-mk-ink text-white px-6 py-3 hover:bg-mk-bronze hover:text-mk-ink transition-colors md:col-span-2">{t("form.submit_ir")}</button>
    </form>
  );
}

function CareersForm() {
  const { t } = useI18n();
  const f = useForm({ name: "", email: "", role: "", linkedin: "", cv: "", cover: "" }, t);
  if (f.status === "done") return <Success message={f.message} t={t} />;
  const onFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    f.setField("cv", file.name);
  };
  return (
    <form onSubmit={(e) => { e.preventDefault(); f.submit("careers"); }} className="grid grid-cols-1 md:grid-cols-2 gap-4" data-testid="form-careers">
      <Input required placeholder={t("form.name_req")} value={f.values.name} onChange={e => f.setField("name", e.target.value)} />
      <Input required type="email" placeholder={t("form.email_req")} value={f.values.email} onChange={e => f.setField("email", e.target.value)} />
      <Input required placeholder={t("form.role")} value={f.values.role} onChange={e => f.setField("role", e.target.value)} className="md:col-span-2" />
      <Input placeholder={t("form.linkedin")} value={f.values.linkedin} onChange={e => f.setField("linkedin", e.target.value)} className="md:col-span-2" />
      <label className="md:col-span-2 border border-dashed border-mk-line/30 p-4 flex items-center justify-between cursor-pointer">
        <span className="text-sm text-mk-text2">{f.values.cv || t("form.cv_upload")}</span>
        <input type="file" accept=".pdf,.docx" onChange={onFile} className="hidden" data-testid="input-careers-cv" />
        <span className="text-xs uppercase tracking-widest text-mk-bronze2">{t("form.cv_choose")}</span>
      </label>
      <Textarea placeholder={t("form.cover")} value={f.values.cover} onChange={e => f.setField("cover", e.target.value)} className="md:col-span-2" />
      <button type="submit" className="bg-mk-ink text-white px-6 py-3 hover:bg-mk-bronze hover:text-mk-ink transition-colors md:col-span-2">{t("form.submit_app")}</button>
    </form>
  );
}

function PartnershipForm() {
  const { t } = useI18n();
  const f = useForm({ name: "", email: "", organization: "", partnership_type: "", message: "" }, t);
  if (f.status === "done") return <Success message={f.message} t={t} />;
  return (
    <form onSubmit={(e) => { e.preventDefault(); f.submit("partnership"); }} className="grid grid-cols-1 md:grid-cols-2 gap-4" data-testid="form-partnership">
      <Input required placeholder={t("form.name_req")} value={f.values.name} onChange={e => f.setField("name", e.target.value)} />
      <Input required type="email" placeholder={t("form.email_req")} value={f.values.email} onChange={e => f.setField("email", e.target.value)} />
      <Input required placeholder={t("form.company")} value={f.values.organization} onChange={e => f.setField("organization", e.target.value)} className="md:col-span-2" />
      <Select value={f.values.partnership_type} onChange={e => f.setField("partnership_type", e.target.value)} className="md:col-span-2">
        <option value="">{t("form.partnership_type")}</option>
        <option value="tech">{t("form.partnership.tech")}</option>
        <option value="reseller">{t("form.partnership.reseller")}</option>
        <option value="sandbox">{t("form.partnership.sandbox")}</option>
        <option value="academic">{t("form.partnership.academic")}</option>
        <option value="other">{t("form.partnership.other")}</option>
      </Select>
      <Textarea required placeholder={t("form.message")} value={f.values.message} onChange={e => f.setField("message", e.target.value)} className="md:col-span-2" />
      <button type="submit" className="bg-mk-ink text-white px-6 py-3 hover:bg-mk-bronze hover:text-mk-ink transition-colors md:col-span-2">{t("form.submit_send")}</button>
    </form>
  );
}

function SupportForm() {
  const { t } = useI18n();
  const f = useForm({ name: "", email: "", client_id: "", priority: "medium", subject: "", description: "" }, t);
  if (f.status === "done") return <Success message={f.message} t={t} />;
  return (
    <form onSubmit={(e) => { e.preventDefault(); f.submit("support"); }} className="grid grid-cols-1 md:grid-cols-2 gap-4" data-testid="form-support">
      <Input required placeholder={t("form.name_req")} value={f.values.name} onChange={e => f.setField("name", e.target.value)} />
      <Input required type="email" placeholder={t("form.email_req")} value={f.values.email} onChange={e => f.setField("email", e.target.value)} />
      <Input placeholder={t("form.client_id")} value={f.values.client_id} onChange={e => f.setField("client_id", e.target.value)} />
      <Select value={f.values.priority} onChange={e => f.setField("priority", e.target.value)}>
        <option value="low">{t("form.priority.low")}</option>
        <option value="medium">{t("form.priority.medium")}</option>
        <option value="high">{t("form.priority.high")}</option>
        <option value="critical">{t("form.priority.critical")}</option>
      </Select>
      <Input required placeholder={t("form.subject")} value={f.values.subject} onChange={e => f.setField("subject", e.target.value)} className="md:col-span-2" />
      <Textarea required placeholder={t("form.description")} value={f.values.description} onChange={e => f.setField("description", e.target.value)} className="md:col-span-2" />
      <button type="submit" className="bg-mk-ink text-white px-6 py-3 hover:bg-mk-bronze hover:text-mk-ink transition-colors md:col-span-2">{t("form.submit_ticket")}</button>
    </form>
  );
}

const FORMS = { general: GeneralForm, demo: DemoForm, investor: InvestorForm, careers: CareersForm, partnership: PartnershipForm, support: SupportForm };

export default function Contact() {
  const { lang, t } = useI18n();
  const loc = useLocation();
  const params = new URLSearchParams(loc.search);
  const initial = params.get("tab") && TABS.find(tt => tt.k === params.get("tab")) ? params.get("tab") : "demo";
  const [tab, setTab] = useState(initial);
  const ActiveForm = FORMS[tab];

  return (
    <>
      <SEO title={t("contact.title")} description={t("contact.lede")} path="/contact" />

      <section className="bg-mk-ink text-white pt-20 pb-24 mk-grain">
        <div className="container-mk">
          <Breadcrumbs items={[{ label: t("bc.contact") }]} />
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <div className="overline mb-4">{t("contact.overline")}</div>
              <h1 className="font-serif text-5xl md:text-7xl leading-[1.02]">{t("contact.title")}</h1>
              <p className="mt-6 text-white/70 max-w-2xl text-lg">{t("contact.lede")}</p>
            </div>
            <div className="lg:col-span-4 border-l border-mk-bronze/40 pl-6 text-sm text-white/70 space-y-4">
              <div className="flex gap-3"><MapPin className="w-4 h-4 text-mk-bronze mt-1" strokeWidth={1.5} /><span>{L(COMPANY.hq.address, lang)}</span></div>
              <div>
  <span>{t("contact.phone")} </span>
  <a href={`tel:${COMPANY.hq.phone.replace(/\s/g, "")}`} className="hover:text-mk-bronze">{COMPANY.hq.phone}</a>
</div>
<div>
  <span>{t("contact.email")} </span>
  <a href={`mailto:${COMPANY.hq.email}`} className="hover:text-mk-bronze">{COMPANY.hq.email}</a>
</div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-mk-paper py-16" data-testid="contact-forms">
        <div className="container-mk">
          <div className="border-b border-mk-line/15 flex flex-wrap gap-1 mb-10 overflow-x-auto">
            {TABS.map(tt => (
              <button key={tt.k} onClick={() => setTab(tt.k)} className={`px-4 py-3 text-sm border-b-2 transition-colors whitespace-nowrap ${tab === tt.k ? "border-mk-bronze text-mk-ink" : "border-transparent text-mk-text2 hover:text-mk-ink"}`} data-testid={`tab-${tt.k}`}>{t(tt.tk)}</button>
            ))}
          </div>
          <div className="max-w-3xl"><ActiveForm /></div>
          <div className="mt-8 text-xs text-mk-text2 font-mono">{t("contact.recaptcha")}</div>
        </div>
      </section>

      <section className="bg-mk-paper2 py-16">
        <div className="container-mk grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <div className="overline mb-3">{t("contact.dubai.overline")}</div>
            <h2 className="font-serif text-3xl">{t("contact.dubai.title")}</h2>
            <p className="mt-4 text-mk-text2">{t("contact.dubai.body")}</p>
          </div>
          <div className="aspect-video bg-mk-ink border border-mk-line/10">
            <iframe title="MK CMT DIFC HQ" src={COMPANY.hq.mapEmbed(lang)} className="w-full h-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>
      </section>
    </>
  );
}
