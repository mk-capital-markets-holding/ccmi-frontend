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
      fr: "Conception & Spécifications Techniques",
      en: "Design & Technical Specifications",
    },
    body: {
      fr: "Spécification fonctionnelle et technique de la plateforme CCMI (FRD Livrables 1 à 5). Développement de la Solution 1 (Party Lifecycle & Compliance) et mise en place du Party Master.",
      en: "Functional and technical specifications of the CCMI platform (FRD Deliverables 1 to 5). Development of Solution 1 (Party Lifecycle & Compliance) and core Party Master setup.",
    },
  },
  {
    year: "2027",
    title: {
      fr: "Déploiement du Noyau & Intégrations",
      en: "Core Deployment & Integrations",
    },
    body: {
      fr: "Déploiement en production du référentiel d'identités (Golden Record), intégration des workflows KYC/KYB dynamique et interconnexion par API / Kafka.",
      en: "Production deployment of the master identity repository (Golden Record), integration of dynamic KYC/KYB workflows, and API / Kafka interconnectivity.",
    },
  },
  {
    year: "2028+",
    title: {
      fr: "Évolution & Interopérabilité",
      en: "Evolution & Interoperability",
    },
    body: {
      fr: "Extension de la plateforme aux modules adjacents, automatisation continue des contrôles de conformité et support d'architectures multi-tenants à grande échelle.",
      en: "Platform extension to adjacent modules, continuous compliance automation, and support for large-scale multi-tenant architectures.",
    },
  },
];

export const VALUES = [
  {
    title: {
      fr: "Rigueur Réglementaire & Intégrité",
      en: "Regulatory Rigor & Integrity"
    },
    body: {
      fr: "Nous concevons des logiciels intégrant nativement les exigences des régulateurs et des autorités de marché, garantissant traçabilité et transparence.",
      en: "We design software natively embedding regulatory requirements and market guidelines, ensuring full traceability and transparency."
    }
  },
  {
    title: {
      fr: "Excellence d'Ingénierie Institutionnelle",
      en: "Institutional Engineering Excellence"
    },
    body: {
      fr: "Infrastructures hautement disponibles, contrôles d'accès stricts (RBAC) et chiffrement de niveau bancaire des données financières sensibles.",
      en: "High-availability infrastructures, strict Role-Based Access Control (RBAC), and bank-grade encryption for sensitive financial data."
    }
  },
  {
    title: {
      fr: "Modernisation & Inclusivité des Marchés",
      en: "Market Modernization & Inclusivity"
    },
    body: {
      fr: "Démocratisation de l'ingénierie financière et de la gouvernance pour les émetteurs et intermédiaires du marché grâce à l'automatisation SaaS.",
      en: "Democratization of financial engineering and governance for issuers and market intermediaries through SaaS automation."
    }
  },
  {
    title: {
      fr: "Souveraineté & Résilience des Données",
      en: "Data Sovereignty & Resilience"
    },
    body: {
      fr: "Protection rigoureuse et hébergement sécurisé garantissant l'indépendance opérationnelle et la continuité de service des acteurs de marché.",
      en: "Rigorous protection and secure hosting ensuring operational independence and service continuity for market participants."
    }
  }
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