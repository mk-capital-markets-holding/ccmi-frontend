import React from "react";
import { useParams, Navigate } from "react-router-dom";
import SEO from "@/components/common/SEO";
import Breadcrumbs from "@/components/common/Breadcrumbs";

const DOCS = {
  privacy: {
    title: "Privacy Policy",
    updated: "January 2026",
    sections: [
      { h: "1. Data controller", p: "MK Capital Markets Technologies Ltd, registered in DIFC, Dubai, is the data controller for personal data collected via this website and our platforms." },
      { h: "2. What we collect", p: "Contact-form data (name, professional email, organisation), platform usage logs, cookies (see Cookie Policy), and — for investor data-room access — identity verification data as required by AML/KYC obligations." },
      { h: "3. Legal basis (GDPR / DIFC DP Law 2020)", p: "We rely on legitimate interest for prospect communications, consent for marketing cookies and newsletter, contractual necessity for client-facing services, and legal obligation for AML/KYC and record-keeping." },
      { h: "4. Retention", p: "Prospect data is retained up to 24 months from last interaction. Client data follows the terms of our Master Services Agreement. Regulatory logs are retained for 7 years." },
      { h: "5. International transfers", p: "Data is stored in Azure regions in the UAE and the EU. Cross-border transfers use Standard Contractual Clauses aligned with GDPR and DIFC DP Law." },
      { h: "6. Your rights", p: "Access, rectification, erasure, portability, restriction and objection. Contact privacy@mkcmt.io. You may also lodge a complaint with the DIFC Commissioner of Data Protection." },
      { h: "7. Contact", p: "privacy@mkcmt.io · DIFC · Dubai · UAE." },
    ],
  },
  terms: {
    title: "Terms of Service",
    updated: "January 2026",
    sections: [
      { h: "1. Scope", p: "These terms govern your use of the mkcmt.io website and its sub-domains. Platform usage (CCMI) is governed by a separate Master Services Agreement." },
      { h: "2. Acceptable use", p: "You agree not to attempt to circumvent security controls, scrape content beyond the terms of our robots.txt, or use the service to infringe intellectual property." },
      { h: "3. Intellectual property", p: "All content, trademarks and CCMI product design are the property of MK Capital Markets Technologies Ltd. Fair use for citation is permitted with attribution." },
      { h: "4. Warranties & liability", p: "The website is provided as-is. To the maximum extent permitted by law, MK Capital Markets Technologies excludes liability for indirect damages arising from website use." },
      { h: "5. Governing law", p: "These terms are governed by the laws of the Dubai International Financial Centre (DIFC). Disputes are subject to the exclusive jurisdiction of the DIFC Courts." },
    ],
  },
  cookies: {
    title: "Cookie Policy",
    updated: "January 2026",
    sections: [
      { h: "1. What are cookies", p: "Cookies are small text files stored on your device to remember your preferences and improve your experience." },
      { h: "2. Categories used", p: "Essential (session, security, load balancing) — always enabled. Analytics (Google Analytics 4, Microsoft Clarity) — subject to consent. Marketing (LinkedIn Insight, Meta Pixel) — subject to consent." },
      { h: "3. Managing preferences", p: "Use the cookie banner at your first visit, or the preferences link in the footer, to adjust your choices at any time. Rejection does not restrict access to public content." },
      { h: "4. Third-party cookies", p: "Certain third parties (Google, Microsoft, LinkedIn, Meta) set cookies under their own privacy policies. Please refer to their notices for details." },
      { h: "5. Compliance", p: "Our cookie management is aligned with the IAB TCF 2.2 framework and DIFC DP Law 2020." },
    ],
  },
};

export default function Legal() {
  const { doc } = useParams();
  const content = DOCS[doc];
  if (!content) return <Navigate to="/" replace />;
  return (
    <>
      <SEO title={content.title} description={`${content.title} — MK Capital Markets Technologies. Last updated ${content.updated}.`} path={`/legal/${doc}`} />

      <section className="bg-mk-ink text-white pt-20 pb-16 mk-grain">
        <div className="container-mk max-w-4xl">
          <Breadcrumbs items={[{ label: "Legal" }, { label: content.title }]} />
          <div className="mt-8">
            <div className="overline mb-4">Last updated · {content.updated}</div>
            <h1 className="font-serif text-5xl md:text-6xl leading-[1.05]">{content.title}</h1>
          </div>
        </div>
      </section>

      <section className="bg-mk-paper py-24">
        <div className="container-mk max-w-3xl">
          <div className="space-y-10">
            {content.sections.map((s) => (
              <div key={s.h}>
                <h2 className="font-serif text-2xl md:text-3xl mb-3">{s.h}</h2>
                <p className="text-mk-text2 leading-relaxed text-lg">{s.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
