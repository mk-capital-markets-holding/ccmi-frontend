export const COMPANY = {
  legalName: "MK Capital Markets Technologies Ltd",
  short: "MK Capital Markets Technologies",
  hq: {
    address: { en: "Level 24, Emirates Financial Towers, DIFC, Dubai, UAE", fr: "Niveau 24, Emirates Financial Towers, DIFC, Dubaï, Émirats Arabes Unis" },
    phone: "+971 4 555 0180",
    email: "hello@mkcmt.io",
    ir: "investors@mkcmt.io",
    press: "press@mkcmt.io",
    careers: "careers@mkcmt.io",
    mapEmbed: (lang = "en") => `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3612.826!2d55.279!3d25.213!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f430243b57d0d%3A0x0!2sDIFC!5e0!3m2!1s${lang}!2sae!4v1700000000000`,
  },
  socials: {
    linkedin: "https://www.linkedin.com/company/mkcmt",
    youtube: "https://www.youtube.com/@mkcmt",
    x: "https://x.com/mkcmt",
  },
  licenses: [
    { authority: "DFSA", number: "F1298-24", scope: { en: "Category 4 — Advising & Arranging", fr: "Catégorie 4 — Conseil & Arrangement" }, validUntil: "2027-06-30" },
    { authority: "ADGM FSRA", number: "220089", scope: { en: "Financial-tech provider", fr: "Prestataire de technologie financière" }, validUntil: "2027-01-14" },
    { authority: "Emirates ESCA", number: "ESCA-TECH-108", scope: { en: "Technology service provider to securities markets", fr: "Prestataire technologique pour les marchés de valeurs" }, validUntil: "2026-12-31" },
  ],
  certifications: [
    { name: "ISO 27001:2022", issuer: "BSI", year: 2024 },
    { name: "SOC 2 Type II", issuer: "Deloitte", year: 2025 },
    { name: "PCI-DSS", issuer: "Trustwave", year: 2025 },
    { name: "Shariah Advisory Board", issuer: "AAOIFI-aligned", year: 2024 },
  ],
  stats: {
    aum_supported: "USD 42B",
    exchanges: 6,
    investors: "1.24M",
    countries: 14,
    uptime: "99.97%",
    team: 78,
  },
};

export const TIMELINE = [
  { year: "2019", title: { en: "Foundation", fr: "Fondation" }, body: { en: "Malik Kamara founds MK Capital Markets Technologies in DIFC, with a mandate to modernise capital-markets infrastructure across Africa and the Gulf.", fr: "Malik Kamara fonde MK Capital Markets Technologies au DIFC, avec pour mission de moderniser l'infrastructure des marchés de capitaux en Afrique et dans le Golfe." } },
  { year: "2020", title: { en: "First deployment", fr: "Premier déploiement" }, body: { en: "Investor Registry module deployed at a West African exchange in 11 weeks — a market first.", fr: "Module Registre des Investisseurs déployé sur une bourse d'Afrique de l'Ouest en 11 semaines — une première sur le marché." } },
  { year: "2021", title: { en: "Series Seed", fr: "Levée d'amorçage" }, body: { en: "USD 4.2M raised from a consortium of MENA family offices and impact investors.", fr: "4,2 M USD levés auprès d'un consortium de family offices MENA et d'investisseurs à impact." } },
  { year: "2022", title: { en: "Regulator partnership", fr: "Partenariat régulateur" }, body: { en: "Selected by a GCC regulator to build a supervisory data-lake — foundation for our Regulators offering.", fr: "Sélectionnés par un régulateur du CCG pour bâtir un data-lake supervisoire — fondation de notre offre Régulateurs." } },
  { year: "2023", title: { en: "IPO Hub launch", fr: "Lancement IPO Hub" }, body: { en: "First IPO orchestrated end-to-end on CCMI: USD 480M raised on the Casablanca exchange.", fr: "Première IPO orchestrée de bout en bout sur CCMI : 480 M USD levés sur la Bourse de Casablanca." } },
  { year: "2024", title: { en: "Scale-up", fr: "Passage à l'échelle" }, body: { en: "Reached 4 exchanges, 780k investors served, launched Financial Engineering module for structured products and sukuk.", fr: "4 bourses, 780 k investisseurs servis, lancement du module Ingénierie Financière pour produits structurés et sukuk." } },
  { year: "2025", title: { en: "Series A", fr: "Série A" }, body: { en: "USD 18M Series A led by Gulf sovereign vehicles and pan-African growth funds. Team crosses 60.", fr: "Série A de 18 M USD menée par des véhicules souverains du Golfe et fonds de croissance pan-africains. L'équipe dépasse 60 personnes." } },
  { year: "2026", title: { en: "Continental expansion", fr: "Expansion continentale" }, body: { en: "6 exchanges live; expansion targeting Kenya, South Africa and Egypt. New Africa liaison office in Nairobi.", fr: "6 bourses en production ; expansion visant le Kenya, l'Afrique du Sud et l'Égypte. Nouveau bureau de liaison Afrique à Nairobi." } },
];

export const VALUES = [
  { title: { en: "Institutional rigor", fr: "Rigueur institutionnelle" }, body: { en: "We build for regulators first. If a workflow cannot survive a supervisor's audit, it does not ship.", fr: "Nous construisons d'abord pour les régulateurs. Si un workflow ne peut survivre à l'audit d'un superviseur, il n'est pas livré." } },
  { title: { en: "Long-term partnership", fr: "Partenariat long-terme" }, body: { en: "Our contracts are multi-year. Our roadmap is written with our clients, not for them.", fr: "Nos contrats sont pluriannuels. Notre roadmap s'écrit avec nos clients, pas pour eux." } },
  { title: { en: "African leadership", fr: "Leadership africain" }, body: { en: "We hire, promote and invest across the continent. Our engineering benches sit in Dubai, Nairobi and Casablanca.", fr: "Nous recrutons, promouvons et investissons sur tout le continent. Nos équipes ingénierie sont à Dubaï, Nairobi et Casablanca." } },
  { title: { en: "Radical transparency", fr: "Transparence radicale" }, body: { en: "Open pricing, public roadmap, and post-mortems shared with clients on every incident.", fr: "Tarification ouverte, roadmap publique, et post-mortems partagés avec les clients à chaque incident." } },
];

export const TESTIMONIALS = [
  { quote: { en: "CCMI compressed our dividend distribution cycle from 45 days to under 72 hours. It changed how our issuers see the exchange.", fr: "CCMI a compressé notre cycle de distribution de dividendes de 45 jours à moins de 72 heures. Cela a changé la façon dont nos émetteurs perçoivent la bourse." }, author: { en: "Head of Post-Trade", fr: "Directrice Post-Marché" }, org: { en: "West African Exchange", fr: "Bourse d'Afrique de l'Ouest" }, tone: "operations" },
  { quote: { en: "The team's regulator-grade discipline is what sets them apart. Every deliverable ships audit-ready.", fr: "La discipline conforme régulateur de l'équipe fait toute la différence. Chaque livrable est prêt pour l'audit." }, author: { en: "Chief Risk Officer", fr: "Directrice des Risques" }, org: { en: "Dubai-based EM asset manager", fr: "Gestionnaire ME basé à Dubaï" }, tone: "risk" },
  { quote: { en: "For a first-time issuer in a frontier market, the IPO Hub gave us the operational spine to raise USD 480M without a single re-print of the prospectus.", fr: "Pour un émetteur primo-cotant sur un marché frontière, IPO Hub nous a donné la colonne opérationnelle pour lever 480 M USD sans une seule réimpression du prospectus." }, author: { en: "CFO", fr: "Directeur Financier" }, org: { en: "North African consumer-goods issuer", fr: "Émetteur nord-africain de biens de consommation" }, tone: "issuer" },
];

export const PARTNERS = [
  "Microsoft Azure", "Cloudflare", "DIFC Fintech Hive", "ADGM", "AAOIFI", "IOSCO Observer", "Casablanca Finance City", "Nairobi Securities Exchange",
];
