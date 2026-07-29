import React from "react";
import { useParams, Navigate } from "react-router-dom";
import SEO from "@/components/common/SEO";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { useI18n } from "@/i18n/context";

// Structured legal docs. Each section is defined by translation-key pairs (h + p).
const DOCS = {
  privacy: {
    titleKey: "legal.privacy.title",
    updatedKey: "legal.privacy.updated",
    sections: ["s1", "s2", "s3", "s4", "s5", "s6", "s7"].map(s => ({
      h: `legal.privacy.${s}.h`, p: `legal.privacy.${s}.p`,
    })),
  },
  terms: {
    titleKey: "legal.terms.title",
    updatedKey: "legal.terms.updated",
    sections: ["s1", "s2", "s3", "s4", "s5"].map(s => ({
      h: `legal.terms.${s}.h`, p: `legal.terms.${s}.p`,
    })),
  },
  cookies: {
    titleKey: "legal.cookies.title",
    updatedKey: "legal.cookies.updated",
    sections: ["s1", "s2", "s3", "s4", "s5"].map(s => ({
      h: `legal.cookies.${s}.h`, p: `legal.cookies.${s}.p`,
    })),
  },
};

export default function Legal() {
  const { doc } = useParams();
  const { t } = useI18n();
  const meta = DOCS[doc];
  if (!meta) return <Navigate to="/" replace />;
  const title = t(meta.titleKey);
  const updated = t(meta.updatedKey);
  return (
    <>
      <SEO title={title} description={`${title} — MK Capital Markets Technologies.`} path={`/legal/${doc}`} />

      <section className="bg-mk-ink text-white pt-20 pb-16 mk-grain">
        <div className="container-mk max-w-4xl">
          <Breadcrumbs items={[{ label: t("bc.legal") }, { label: title }]} />
          <div className="mt-8">
            <div className="overline mb-4">{t("legal.updated")} {updated}</div>
            <h1 className="font-serif text-5xl md:text-6xl leading-[1.05]" data-testid={`legal-title-${doc}`}>{title}</h1>
          </div>
        </div>
      </section>

      <section className="bg-mk-paper py-24">
        <div className="container-mk max-w-3xl">
          <div className="space-y-10">
            {meta.sections.map((s, i) => (
              <div key={i} data-testid={`legal-section-${doc}-${i}`}>
                <h2 className="font-serif text-2xl md:text-3xl mb-3">{t(s.h)}</h2>
                <p className="text-mk-text2 leading-relaxed text-lg">{t(s.p)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
