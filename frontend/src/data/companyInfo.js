// CCMI Company Info — bilingual content. Use L(field, lang) helper.

export const COMPANY = {
  name: "MK Capital Markets Technologies & Holding L.L.C-FZ",
  shortName: "MK Capital Markets",
  founded: 2026,
  license: "License N° 2651682.01",
  legalEntityDubai: "MK Capital Markets Technologies & Holding L.L.C-FZ",
  legalEntityAfrica: "MKCM Consulting",
  hq: {
    address: {
      en: "Meydan Free Zone, Dubai, United Arab Emirates",
      fr: "Meydan Free Zone, Dubaï, Émirats Arabes Unis",
    },
    phone: "+33 6 18 35 02 52",
    email: "florent.makanda@mk-capital.com",
    ir: "investors@mk-capital.com",
    press: "press@mk-capital.com",
    careers: "careers@mk-capital.com",
    mapEmbed: (lang) =>
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.17!2d55.27!3d25.15!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f69c5e3d2!2sMeydan%20Free%20Zone!5e0!3m2!1s" +
      (lang === "fr" ? "fr" : "en") +
      "!2sae!4v1700000000000!5m2!1s" +
      (lang === "fr" ? "fr" : "en") +
      "!2sae",
  },
  subsidiaryAfrica: {
    address: {
      en: "Douala, Cameroon (CEMAC Zone)",
      fr: "Douala, Cameroun (Zone CEMAC)",
    },
  },
  socials: {
    linkedin: "https://www.linkedin.com/company/mk-capital-markets",
    youtube: "https://www.youtube.com/@mkcmt",
    x: "https://x.com/mkcmt",
  },
  licenses: [
    {
      authority: "Meydan Free Zone",
      scope: {
        en: "Technology & Holding Operations",
        fr: "Holding & Activités Technologiques",
      },
      number: "License N° 2651682.01",
      validUntil: "2027",
    },
    {
      authority: "COSUMAF Alignment",
      scope: {
        en: "Technical Provider Framework Compliance (CEMAC Zone)",
        fr: "Conformité Cadre Prestataire Technique (Zone CEMAC)",
      },
      number: "DEC-2026-REG-014",
      validUntil: "2027",
    },
  ],
  certifications: [
    {
      name: "ISO/IEC 27001:2022",
      issuer: "BSI Group",
      year: "2026",
    },
    {
      name: "SOC 2 Type II",
      issuer: "Deloitte / EY Audit",
      year: "2026",
    },
    {
      name: "COSUMAF Technical Standards",
      issuer: "Regional Oversight Advisory",
      year: "2026",
    },
  ],
  stats: {
    team: "1-10",
    launch: "2026",
  },
};

export const TIMELINE = [
  {
    year: "2026",
    title: {
      en: "Incorporation & Pilot Partnership",
      fr: "Création & Partenariats Pilotes",
    },
    body: {
      en: "Incorporation of MK Capital Markets Technologies & Holding L.L.C-FZ in Dubai, website launch, MVP prototype development, and recruitment of pilot partners in the CEMAC region.",
      fr: "Création de la Holding à Dubaï, lancement du site web, développement du prototype MVP et recrutement des partenaires pilotes dans la zone CEMAC.",
    },
  },
  {
    year: "2027",
    title: {
      en: "Commercial Launch & CEMAC Expansion",
      fr: "Lancement Commercial & Expansion CEMAC",
    },
    body: {
      en: "Official platform launch, deployment across brokerage firms and asset managers, and establishment of local African operations via MKCM Consulting.",
      fr: "Lancement officiel de la plateforme CCMI, déploiement auprès des sociétés de bourse et sociétés de gestion, et ancrage local via MKCM Consulting.",
    },
  },
  {
    year: "2028+",
    title: {
      en: "Pan-African Expansion & Global Gateway",
      fr: "Expansion Pan-Africaine & Passerelle Globale",
    },
    body: {
      en: "Scaling across broader African capital markets and integrating international investment gateways.",
      fr: "Déploiement à l'échelle pan-africaine et intégration de passerelles d'investissement internationales.",
    },
  },
];

export const VALUES = [
  {
    title: {
      en: "Regulatory Compliance & Integrity",
      fr: "Rigueur Réglementaire & Intégrité",
    },
    body: {
      en: "We design software embedded directly with financial regulatory requirements (COSUMAF, OHADA) ensuring strict auditability and transparency.",
      fr: "Nous concevons des logiciels intégrant nativement les exigences des régulateurs (COSUMAF, OHADA), garantissant traçabilité et transparence.",
    },
  },
  {
    title: {
      en: "Institutional Engineering Standard",
      fr: "Excellence d'Ingénierie Institutionnelle",
    },
    body: {
      en: "High-performance FastAPI backends, secure role-based access control, and bank-grade data encryption for sensitive financial records.",
      fr: "Backends FastAPI haute performance, contrôle d'accès strict (RBAC) et chiffrement de niveau bancaire des données financières sensibles.",
    },
  },
  {
    title: {
      en: "Financial Inclusion & Modernization",
      fr: "Modernisation & Inclusivité des Marchés",
    },
    body: {
      en: "Democratizing corporate finance tools for mid-market issuers and regional market participants through automated, intuitive workflows.",
      fr: "Démocratisation de l'ingénierie financière et de la gouvernance pour les PME/ETI et intermédiaires du marché grâce à l'automatisation SaaS.",
    },
  },
];

export const TESTIMONIALS = [
  {
    quote: {
      fr: "CCMI a transformé la gestion de nos émetteurs et la tenue de nos registres d'actionnaires en zone CEMAC.",
      en: "CCMI transformed issuer management and share registry maintenance across the CEMAC region.",
    },
    author: "Banque d'Investissement Régionale",
    role: { en: "Head of Corporate Finance", fr: "Directeur Corporate Finance" },
  },
  {
    quote: {
      fr: "La Data Room VDR et la structuration des campagnes accélèrent nos levées de fonds institutionnelles.",
      en: "The VDR Data Room and campaign structuring significantly accelerate our institutional fundraising.",
    },
    author: "Cabinet de Conseil Financier",
    role: { en: "Managing Partner", fr: "Associé Gérant" },
  },
];

export const PARTNERS = [
  {
    name: "COSUMAF",
    category: {
      en: "Regulatory Alignment",
      fr: "Conformité Réglementaire",
    },
  },
  {
    name: "BVMAC",
    category: {
      en: "Stock Exchange",
      fr: "Bourse Régionale",
    },
  },
  {
    name: "BRVM",
    category: {
      en: "Regional Exchange",
      fr: "Bourse Régionale",
    },
  },
  {
    name: "Meydan FZ",
    category: {
      en: "Innovation Hub",
      fr: "Hub d'Innovation",
    },
  },
];