import { 
  Users, 
  FileCheck, 
  TrendingUp, 
  Calculator, 
  UserCheck, 
  Globe,
  ShieldCheck,
  Workflow,
  FileText,
  PieChart,
  Cpu,
  Bell,
  History
} from "lucide-react";

/**
 * Helper de traduction pour éviter les erreurs de rendu React (Error #31).
 * Sécurise l'extraction du texte selon la langue ('fr' par défaut).
 */
export const t = (field, lang = 'fr') => {
  if (!field) return '';
  if (typeof field === 'string') return field;
  return field[lang] || field['fr'] || field['en'] || '';
};

export const MODULES = [
  {
    slug: "investor-lifecycle",
    num: "01",
    icon: Users,
    screenshot: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    name: {
      en: "Investor Lifecycle & Compliance",
      fr: "Investor Lifecycle & Conformité"
    },
    tagline: {
      en: "Digitize the complete investor lifecycle with automated KYC/AML.",
      fr: "Digitaliser l'ensemble du cycle de vie des investisseurs."
    },
    description: {
      en: "Centralizes onboarding, regulatory compliance, and investor data management in a secure digital environment aligned with FATF, ESAAMLG, and GIABA requirements.",
      fr: "Le point d'entrée de toute relation investisseur sur la plateforme CCMI. Il centralise l'onboarding, la conformité réglementaire (FATF, ESAAMLG, GIABA) et la gestion des données investisseurs."
    },
    features: [
      { title: { en: "Digital Onboarding", fr: "Onboarding Digital" }, detail: { en: "KYC & KYB verification flows", fr: "Parcours de vérification KYC & KYB" }, en: "Digital Onboarding (KYC / KYB)", fr: "Onboarding Digital (KYC / KYB)" },
      { title: { en: "AML Screening", fr: "Screening AML" }, detail: { en: "Real-time AML workflow & screening", fr: "Workflow AML & screening en temps réel" }, en: "Real-time AML Workflow & Screening", fr: "Workflow AML & Screening en temps réel" },
      { title: { en: "Beneficial Owners", fr: "Bénéficiaires Effectifs" }, detail: { en: "Document & Beneficial owner management", fr: "Gestion documentaire & bénéficiaires effectifs" }, en: "Document & Beneficial Owner Management", fr: "Gestion documentaire & Bénéficiaires effectifs" },
      { title: { en: "Investor CRM", fr: "Base CRM Investisseurs" }, detail: { en: "Investor classification & investor CRM", fr: "Classification & base CRM investisseurs" }, en: "Investor Classification & Investor CRM", fr: "Classification & Base CRM Investisseurs" },
      { title: { en: "Compliance Validation", fr: "Validation Conformité" }, detail: { en: "Custom questionnaires & compliance validation", fr: "Questionnaires personnalisés & validation conformité" }, en: "Custom Questionnaires & Compliance Validation", fr: "Questionnaires personnalisés & Validation conformité" },
      { title: { en: "Audit Trail", fr: "Audit Trail & Reporting" }, detail: { en: "Complete audit trail & regulatory reporting", fr: "Historique complet, audit trail & reporting réglementaire" }, en: "Complete Audit Trail & Regulatory Reporting", fr: "Historique complet, Audit Trail & Reporting réglementaire" }
    ],
    benefits: [
      { label: { en: "Conformité Normative", fr: "Conformité Normative" }, desc: { en: "Aligned with FATF, ESAAMLG, and GIABA standards.", fr: "Alignement strict sur les normes GAFI, ESAAMLG et GIABA." } },
      { label: { en: "Onboarding Dématérialisé", fr: "Onboarding Dématérialisé" }, desc: { en: "100% digital KYC/KYB screening and document collection.", fr: "Parcours KYC/KYB et collecte documentaire 100 % digitaux." } },
      { label: { en: "Piste d'Audit Immuable", fr: "Piste d'Audit Immuable" }, desc: { en: "Full auditability for internal control and regulators.", fr: "Traçabilité complète pour les contrôles internes et le régulateur." } }
    ],
    architecture: [
      { en: "Automated KYC/AML Engine", fr: "Moteur KYC/AML automatisé" },
      { en: "Encrypted Document Repository", fr: "Coffre-fort documentaire chiffré" },
      { en: "Regulatory Reporting Pipeline", fr: "Pipeline de reporting réglementaire" }
    ],
    targetClients: [
      { en: "Brokerage Firms (Sociétés de Bourse)", fr: "Sociétés de Bourse" },
      { en: "Commercial & Investment Banks", fr: "Banques" },
      { en: "Asset Managers", fr: "Gestionnaires d'Actifs" },
      { en: "Corporates & Family Offices", fr: "Entreprises & Family Offices" }
    ],
    valueCreated: {
      en: "Replaces fragmented spreadsheet silos with a unified, audited, and compliant investor database. Drastically reduces onboarding time and eliminates data entry errors.",
      fr: "Unifie les silos Excel et dossiers papier dans une base unique, centralisée et auditée. Réduit immédiatement les délais d'onboarding et élimine les risques réglementaires."
    }
  },
  {
    slug: "securities-registry",
    num: "02",
    icon: FileCheck,
    screenshot: "https://images.pexels.com/photos/22065462/pexels-photo-22065462.jpeg",
    name: {
      en: "Digital Securities Registry & Governance",
      fr: "Registre Numérique & Gouvernance"
    },
    tagline: {
      en: "Fully dematerialize shares, bonds, and corporate governance.",
      fr: "Dématérialiser totalement les titres et la gouvernance."
    },
    description: {
      en: "Serves as the legal and financial source of truth for shareholding structure, cap tables, bond registries, e-voting, and corporate actions.",
      fr: "Le cœur opérationnel constituant la source de vérité juridique et financière pour l'ensemble des droits attachés aux titres : Cap Table dynamique, dividendes, votes et transferts."
    },
    features: [
      { title: { en: "Dynamic Cap Table", fr: "Cap Table Dynamique" }, detail: { en: "Dynamic Cap Table & Share Classes", fr: "Cap Table dynamique & classes d'actions" }, en: "Dynamic Cap Table & Share Classes", fr: "Cap Table dynamique & Classes d'actions" },
      { title: { en: "Bond Registry", fr: "Registre Obligataire" }, detail: { en: "Bond registry & digitized certificates (QR Code)", fr: "Registre obligataire & certificats numériques (QR Code)" }, en: "Bond Registry & Digitized Certificates (QR Code)", fr: "Registre obligataire & Certificats numériques (QR Code)" },
      { title: { en: "Corporate Actions", fr: "Opérations sur Titres" }, detail: { en: "Transfers, dividends & coupons history", fr: "Historique des mouvements, transferts, dividendes & coupons" }, en: "Corporate Actions (Transfers, Dividends & Coupons)", fr: "Historique des mouvements, Transferts, Dividendes & Coupons" },
      { title: { en: "Digital Board", fr: "Conseil & E-Voting" }, detail: { en: "Digital board & e-voting for General Meetings", fr: "Conseil d'administration & vote électronique aux AG" }, en: "Digital Board & E-Voting for General Meetings", fr: "Conseil d'Administration & Vote électronique aux AG" },
      { title: { en: "Legal Documents", fr: "GED Juridique" }, detail: { en: "Resolutions, minutes & legal document management", fr: "Résolutions, procès-verbaux & GED juridique" }, en: "Resolutions, Minutes & Legal Document Management", fr: "Résolutions, Procès-verbaux & GED juridique" },
      { title: { en: "Audit Trail", fr: "Audit Trail Immuable" }, detail: { en: "Immutable system audit trail", fr: "Historique complet & audit trail immuable" }, en: "Immutable System Audit Trail", fr: "Historique complet & Audit Trail immuable" }
    ],
    benefits: [
      { label: { en: "Registre Dématérialisé", fr: "Registre Dématérialisé" }, desc: { en: "Legal source of truth for shares and bonds.", fr: "Source de vérité juridique unique pour actions et obligations." } },
      { label: { en: "Mise à jour en Temps Réel", fr: "Mise à jour en Temps Réel" }, desc: { en: "Instant Cap Table updates following corporate actions.", fr: "Mise à jour instantanée de la Cap Table après chaque opération." } },
      { label: { en: "Authentification Sécurisée", fr: "Authentification Sécurisée" }, desc: { en: "QR Code verification for digital certificates.", fr: "Vérification par QR Code des certificats et attestation de propriété." } }
    ],
    architecture: [
      { en: "Event-driven Share Ledger", fr: "Registre de titres événementiel" },
      { en: "E-Voting Security Protocol", fr: "Protocole de vote électronique sécurisé" },
      { en: "Immutable Audit Log Engine", fr: "Moteur d'audit log immuable" }
    ],
    targetClients: [
      { en: "Corporates (SMEs, Holdings, Enterprises)", fr: "PME, Holdings et Grandes Entreprises" },
      { en: "Brokerage Firms & Custodians", fr: "Sociétés de Bourse & Intermédiaires" },
      { en: "Transfer Agents", fr: "Transfer Agents (Teneurs de registre)" },
      { en: "Family Businesses & Institutional Structures", fr: "Structures Familiales ou Institutionnelles" }
    ],
    valueCreated: {
      en: "Transforms static paper or Excel share registers into a live, real-time infrastructure, eliminating legal disputes and enabling frictionless access to capital markets.",
      fr: "Élimine les risques de perte de données et contestations juridiques sur Excel. Le registre devient une infrastructure vivante mise à jour en temps réel à chaque corporate action."
    }
  },
  {
    slug: "capital-raising",
    num: "03",
    icon: TrendingUp,
    screenshot: "https://images.pexels.com/photos/9301316/pexels-photo-9301316.jpeg",
    name: {
      en: "Capital Raising Platform",
      fr: "Plateforme de Levée de Fonds"
    },
    tagline: {
      en: "Structure, execute, and monitor fundraising operations digitally.",
      fr: "Préparer et gérer une opération de levée de fonds."
    },
    description: {
      en: "A collaborative 4-phase environment for private placements, capital increases, bond issuances, and IPO preparations.",
      fr: "Offre un environnement structuré et numérique pour gérer chaque étape d'une opération de financement (placement privé, augmentation de capital, émission obligataire, IPO)."
    },
    features: [
      { title: { en: "Preparation Phase", fr: "Phase 1 – Préparation" }, detail: { en: "Business Plan, Pitch Deck & Secure VDR", fr: "Business Plan, Pitch Deck & Data Room Sécurisée" }, en: "Phase 1 - Preparation: Business Plan, Pitch Deck & Secure VDR", fr: "Phase 1 – Préparation : Business Plan, Pitch Deck & Data Room Sécurisée" },
      { title: { en: "Offer Management", fr: "Phase 2 – Offer Management" }, detail: { en: "Multi-asset operation setup & roadshow", fr: "Paramétrage d'opération & marketing roadshow" }, en: "Phase 2 - Offer Management: Multi-asset Operation Setup & Roadshow", fr: "Phase 2 – Offer Management : Paramétrage d'opération & Marketing Roadshow" },
      { title: { en: "Investor Engagement", fr: "Phase 3 – Investor Engagement" }, detail: { en: "Prospect list & expressions of interest", fr: "Ciblage, LOI & suivi des manifestations" }, en: "Phase 3 - Investor Engagement: Prospect List & Expressions of Interest", fr: "Phase 3 – Investor Engagement : Ciblage, LOI & Suivi des manifestations" },
      { title: { en: "Digital Subscription", fr: "Phase 4 – Digital Subscription" }, detail: { en: "E-sign, payment, allocation & certificates", fr: "Souscription en ligne, allocation & certificats" }, en: "Phase 4 - Digital Subscription: E-sign, Payment, Allocation & Certificates", fr: "Phase 4 – Digital Subscription : Souscription en ligne, Allocation & Certificats" }
    ],
    benefits: [
      { label: { en: "Processus en 4 Phases", fr: "Processus en 4 Phases" }, desc: { en: "End-to-end structured deal flow management.", fr: "Gestion structurée et guidée de l'ensemble de l'opération." } },
      { label: { en: "Exécution Optimisée", fr: "Exécution Optimisée" }, desc: { en: "Centralized due diligence and automated workflows.", fr: "Workflows automatisés et centralisation des due diligences." } },
      { label: { en: "Souscription 100% Digitale", fr: "Souscription 100% Digitale" }, desc: { en: "Online allocation, electronic signatures, and digital certs.", fr: "Bulletins de souscription et signatures entièrement en ligne." } }
    ],
    architecture: [
      { en: "Virtual Data Room (VDR) Engine", fr: "Moteur de Data Room Virtuelle (VDR)" },
      { en: "E-Signature Integration", fr: "Intégration de la signature électronique" },
      { en: "Multi-Asset Operations Hub", fr: "Hub d'opérations multi-actifs" }
    ],
    targetClients: [
      { en: "Growth SMEs & Enterprise Issuers", fr: "PME en croissance & Émetteurs Corporate" },
      { en: "Brokerage Firms (Primary Market)", fr: "Sociétés de Bourse (Marché primaire)" },
      { en: "Investment Banks & Corporate Advisors", fr: "Banques d'Affaires & Conseils financiers" },
      { en: "Private Equity Funds & Sovereigns", fr: "Fonds de Private Equity & Émetteurs Étatiques" }
    ],
    valueCreated: {
      en: "Reduces fundraising execution cycles and costs significantly while paving the way for direct digital distribution to local and diaspora investors.",
      fr: "Réduit drastiquement le temps et le coût de préparation d'une levée. Centralise les due diligences et transforme la souscription en un canal de distribution numérique."
    }
  },
  {
    slug: "financial-engineering",
    num: "04",
    icon: Calculator,
    screenshot: "https://images.pexels.com/photos/9965285/pexels-photo-9965285.jpeg",
    name: {
      en: "Financial Engineering & Advisory",
      fr: "Ingénierie Financière & Conseil"
    },
    tagline: {
      en: "Advanced corporate valuation, capital structuring, and IPO readiness.",
      fr: "Permettre aux entreprises et conseils de structurer leurs opérations."
    },
    description: {
      en: "Professional financial modeling tools (DCF, multiples, WACC, debt/equity structuring, bond parameters) pre-calibrated for African emerging markets.",
      fr: "Une suite d'outils professionnels — valorisation, structuration du capital, modélisation obligataire/actions et diagnostic IPO — avec templates calibrés pour l'Afrique."
    },
    features: [
      { title: { en: "Valuation Module", fr: "Module Valorisation" }, detail: { en: "DCF, market multiples & sensitivity analysis", fr: "DCF, multiples de marché, scénarios" }, en: "Valuation Module (DCF, Market Multiples, Sensitivity Analysis)", fr: "Module Valorisation (DCF, Multiples de marché, Scénarios)" },
      { title: { en: "Capital Structuring", fr: "Structuration Capital" }, detail: { en: "Senior/Subordinated debt, convertible notes, WACC", fr: "Dette, fonds propres, hybrides, WACC" }, en: "Capital Structuring (Senior/Subordinated Debt, Convertible Notes, WACC)", fr: "Structuration du Capital (Dette, Fonds Propres, Hybrides, WACC)" },
      { title: { en: "Bond Structuring", fr: "Bond Structuring" }, detail: { en: "Corporate, green, infrastructure & cash flow schedules", fr: "Corporate, green, infra & calendrier d'échéances" }, en: "Bond Structuring (Corporate, Green, Infrastructure & Cash Flow schedules)", fr: "Bond Structuring (Corporate, Green, Infra & Calendrier d'échéances)" },
      { title: { en: "Equity Structuring", fr: "Equity Structuring" }, detail: { en: "Real-time dilution simulator on Cap Table", fr: "Simulateur de dilution Cap Table en temps réel" }, en: "Equity Structuring & Real-time Dilution Simulator", fr: "Equity Structuring & Simulateur de dilution Cap Table en temps réel" },
      { title: { en: "Corporate Finance", fr: "Corporate Finance" }, detail: { en: "5-year business plan, investment memo & financial model", fr: "Plan d'affaires 5 ans, investment memo & KPIs" }, en: "Corporate Finance (5-year Business Plan, Investment Memo, Financial Model)", fr: "Corporate Finance (Plan d'affaires 5 ans, Investment Memo & KPIs)" },
      { title: { en: "IPO Readiness", fr: "Diagnostic IPO" }, detail: { en: "IPO score, governance audit & gap analysis", fr: "Score de maturité, audit gouvernance & plan d'action" }, en: "IPO Readiness Assessment (IPO Score, Governance Audit & Gap Analysis)", fr: "IPO Readiness (Score de maturité, Audit gouvernance & Plan d'action)" }
    ],
    benefits: [
      { label: { en: "Modèles Calibrés", fr: "Modèles Calibrés" }, desc: { en: "DCF, WACC, and multiples tailored for regional markets.", fr: "Modèles de valorisation adaptés au contexte des marchés émergents." } },
      { label: { en: "Transparence des Calculs", fr: "Transparence des Calculs" }, desc: { en: "Audit-ready financial modeling logic.", fr: "Calculs entièrement traçables pour la validation financière." } },
      { label: { en: "Simulations Dynamiques", fr: "Simulations Dynamiques" }, desc: { en: "Interactive dilution and debt schedule stress-testing.", fr: "Simulation d'impact en temps réel sur la table de capitalisation." } }
    ],
    architecture: [
      { en: "Quantitative Financial Analytics Engine", fr: "Moteur d'analyse financière quantitative" },
      { en: "Dynamic Cash Flow Modeler", fr: "Modélisateur dynamique de flux de trésorerie" },
      { en: "Emerging Markets Benchmark Database", fr: "Base de données de référence marchés émergents" }
    ],
    targetClients: [
      { en: "Brokerage Firms & Advisory Teams", fr: "Sociétés de Bourse & Conseils M&A" },
      { en: "Investment Banking Divisions", fr: "Départements Banque d'Affaires" },
      { en: "Corporate Finance Advisory Firms", fr: "Cabinets de Conseil Financier" },
      { en: "Corporate Issuers & Municipalities", fr: "Émetteurs Corporate, États & Collectivités" }
    ],
    valueCreated: {
      en: "Replaces error-prone standalone Excel sheets with a collaborative, versioned, and audit-ready financial engineering workspace.",
      fr: "Passe des fichiers Excel isolés à une plateforme collaborative et auditable. Les modèles financiers (valorisations, cash flows) sont interconnectés aux autres modules."
    }
  },
  {
    slug: "investor-portal",
    num: "05",
    icon: UserCheck,
    screenshot: "https://images.pexels.com/photos/14365249/pexels-photo-14365249.jpeg",
    name: {
      en: "Investor Portal & Digital Ownership",
      fr: "Portail Investisseur & Titres Numériques"
    },
    tagline: {
      en: "Secure, mobile-first ownership dashboard for retail, diaspora & institutional investors.",
      fr: "Offrir aux investisseurs un portail sécurisé et mobile-first."
    },
    description: {
      en: "Empowers shareholders and bondholders with 24/7 access to consolidated portfolios, verified digital certificates, dividend tracking, and online voting.",
      fr: "Offre à chaque investisseur (particulier, institutionnel, diaspora) une interface personnalisée 24/7 pour piloter ses participations, dividendes et droits de vote."
    },
    features: [
      { title: { en: "Consolidated Portfolio", fr: "Portefeuille Consolidé" }, detail: { en: "Consolidated portfolio view & detailed holdings", fr: "Vue portefeuille consolidé & participations détaillées" }, en: "Consolidated Portfolio View & Detailed Holdings", fr: "Vue Portefeuille consolidé & Participations détaillées" },
      { title: { en: "Digital Certificates", fr: "Certificats Numériques" }, detail: { en: "Digitized ownership certificates with instant verification", fr: "Certificats numériques d'actionnaire vérifiables" }, en: "Digitized Ownership Certificates with Instant Verification", fr: "Certificats numériques d'actionnaire vérifiables" },
      { title: { en: "Dividends & Coupons", fr: "Dividendes & Coupons" }, detail: { en: "Dividends, coupons & operation history downloads", fr: "Suivi des dividendes, coupons & historique des flux" }, en: "Dividends, Coupons & Operation History Downloads", fr: "Suivi des Dividendes, Coupons & Historique des flux" },
      { title: { en: "Online E-Voting", fr: "Votes en Ligne" }, detail: { en: "Online e-voting & remote general meeting participation", fr: "Votes en ligne & participation aux assemblées générales" }, en: "Online E-Voting & Remote General Meeting Participation", fr: "Votes en ligne & Participation aux Assemblées Générales" },
      { title: { en: "Push Notifications", fr: "Notifications Temps Réel" }, detail: { en: "Real-time push notifications & integrated support", fr: "Notifications en temps réel & support intégré" }, en: "Real-time Push Notifications & Integrated Support", fr: "Notifications en temps réel & Support intégré" }
    ],
    benefits: [
      { label: { en: "Accès Autonome 24/7", fr: "Accès Autonome 24/7" }, desc: { en: "Self-service ownership statement consulting.", fr: "Consultation sécurisée des avoirs à tout moment." } },
      { label: { en: "Attestations Numériques", fr: "Attestations Numériques" }, desc: { en: "Instant generation of verifiable ownership proofs.", fr: "Génération instantanée de certificats de propriété vérifiables." } },
      { label: { en: "Expérience Mobile-First", fr: "Expérience Mobile-First" }, desc: { en: "Interface optimized for smartphones and tablets.", fr: "Interface fluide et adaptée à tous les écrans." } }
    ],
    architecture: [
      { en: "React / Next.js Responsive Client Portal", fr: "Portail client React / Next.js responsive" },
      { en: "Secure Token-based Portfolio API", fr: "API de portefeuille sécurisée par jeton" },
      { en: "PDF / QR Code Generation Microservice", fr: "Microservice de génération PDF / QR Code" }
    ],
    targetClients: [
      { en: "Retail & Individual Investors", fr: "Investisseurs Particuliers" },
      { en: "African Diaspora Investors", fr: "Membres de la Diaspora Africaine" },
      { en: "Institutional Investors & Pension Funds", fr: "Investisseurs Institutionnels & Fonds" }
    ],
    valueCreated: {
      en: "Drastically elevates issuer credibility by giving investors transparent, uninterrupted access to their financial assets without administrative overhead.",
      fr: "Renforce la confiance des actionnaires, facilite la tenue des AG et réduit drastiquement les coûts administratifs (courriers, certificats papier, appels)."
    }
  },
  {
    slug: "global-markets",
    num: "06",
    icon: Globe,
    screenshot: "https://images.pexels.com/photos/1381722/pexels-photo-1381722.jpeg",
    name: {
      en: "Global Markets & Portfolio Connectivity",
      fr: "Marchés Internationaux & Connectivité"
    },
    tagline: {
      en: "Bridge domestic African holdings with global financial markets.",
      fr: "Permettre aux institutions africaines d'accéder aux marchés internationaux."
    },
    description: {
      en: "Consolidates cross-border multi-currency and multi-broker portfolios (including Interactive Brokers integration) into a single institutional interface.",
      fr: "Construit le pont entre CCMI et les marchés financiers internationaux pour offrir une vue consolidée des portefeuilles multi-géographies, multi-devises et multi-brokers."
    },
    features: [
      { title: { en: "Multi-Broker Connectivity", fr: "Connexion Multi-Brokers" }, detail: { en: "Multi-broker connectivity & account synchronization", fr: "Connexion & synchronisation multi-brokers" }, en: "Multi-Broker Connectivity & Account Synchronization", fr: "Connexion & Synchronisation Multi-Brokers" },
      { title: { en: "Interactive Brokers", fr: "Intégration Interactive Brokers" }, detail: { en: "Interactive Brokers native integration (US/EU markets)", fr: "Intégration Interactive Brokers (marchés US et Européens)" }, en: "Interactive Brokers Native Integration (US/EU Markets)", fr: "Intégration Interactive Brokers (Marchés US et Européens)" },
      { title: { en: "Consolidated Portfolio", fr: "Portefeuille Consolidé" }, detail: { en: "Consolidated portfolio tracking & real-time asset allocation", fr: "Portefeuille consolidé & répartition des actifs en temps réel" }, en: "Consolidated Portfolio Tracking & Real-Time Asset Allocation", fr: "Portefeuille Consolidé & Répartition des actifs en temps réel" },
      { title: { en: "Multi-Currency", fr: "Gestion Multi-Devises" }, detail: { en: "Multi-currency performance (USD, EUR, XOF, XAF, NGN)", fr: "Gestion & reporting multi-devises (USD, EUR, XOF, XAF...)" }, en: "Multi-Currency Performance (USD, EUR, XOF, XAF, NGN)", fr: "Gestion & Reporting Multi-Devises (USD, EUR, XOF, XAF...)" },
      { title: { en: "Risk Dashboard", fr: "Tableau de Bord de Risque" }, detail: { en: "Institutional risk dashboard & real-time market data", fr: "Tableau de bord de risque & market data en temps réel" }, en: "Institutional Risk Dashboard & Real-Time Market Data", fr: "Tableau de bord de Risque & Market Data en temps réel" }
    ],
    benefits: [
      { label: { en: "Intégration Multi-Courtiers", fr: "Intégration Multi-Courtiers" }, desc: { en: "Single-window connectivity to international brokers.", fr: "Centralisation des comptes auprès de multiples courtiers." } },
      { label: { en: "Aperçu Multi-Marchés", fr: "Aperçu Multi-Marchés" }, desc: { en: "Consolidated tracking across US, EU, and African assets.", fr: "Vision consolidée des actifs régionaux et internationaux." } },
      { label: { en: "Conversion Multi-Devises", fr: "Conversion Multi-Devises" }, desc: { en: "Real-time portfolio revaluation in native currencies.", fr: "Réévaluation automatique en temps réel (USD, EUR, XOF, XAF)." } }
    ],
    architecture: [
      { en: "Broker API Bridge & FIX Protocol", fr: "Passerelle API Broker & Protocole FIX" },
      { en: "Multi-currency FX Revaluation Engine", fr: "Moteur de réévaluation de change multi-devises" },
      { en: "Institutional Portfolio Aggregator", fr: "Agrégateur de portefeuille institutionnel" }
    ],
    targetClients: [
      { en: "Asset Managers (Domestic & Cross-Border)", fr: "Gestionnaires d'Actifs" },
      { en: "Private Banking & Wealth Management Divisions", fr: "Gestion de Patrimoine & Trésorerie Bancaire" },
      { en: "Pan-African Investment & PE Funds", fr: "Fonds d'Investissement Panafricains" },
      { en: "Diaspora Family Offices & Institutional LPs", fr: "Family Offices & Institutionnels" }
    ],
    valueCreated: {
      en: "Eliminates the friction between local and international asset management, offering unified reporting, risk oversight, and global asset exposure.",
      fr: "Permet aux institutions africaines d'avoir une vision unifiée de leurs portefeuilles locaux et internationaux sur une plateforme unique."
    }
  }
];

// Socle Technologique Commun (CCMI Core Platform)
export const CORE_PLATFORM_SERVICES = [
  {
    icon: ShieldCheck,
    title: { en: "Identity & Access (IAM / RBAC)", fr: "Gestion des Identités (IAM / RBAC)" },
    desc: { en: "SSO, Multi-Factor Authentication, Role-Based Access Control and OpenID Connect.", fr: "SSO, Authentification MFA, Contrôle d'accès RBAC et OAuth2/OpenID Connect." }
  },
  {
    icon: Workflow,
    title: { en: "Workflow & Approval Engine", fr: "Moteur de Workflow & Validations" },
    desc: { en: "Multi-level validation circuits, automated notifications, and escalation rules.", fr: "Circuits de validation configurables, approbations multi-niveaux et relances." }
  },
  {
    icon: ShieldCheck,
    title: { en: "Embedded Compliance Engine", fr: "Moteur de Conformité Embarqué" },
    desc: { en: "Automated KYC, real-time AML screening, and continuous regulatory audit.", fr: "KYC automatisé, filtrage AML en temps réel et audit réglementaire continu." }
  },
  {
    icon: FileText,
    title: { en: "Document Engine & E-Sign", fr: "Moteur Documentaire & Signature" },
    desc: { en: "Integrated document management, OCR extraction, qualified e-signature, and archiving.", fr: "GED intégrée, extraction OCR, signature électronique qualifiée et versioning." }
  },
  {
    icon: PieChart,
    title: { en: "Reporting & BI Engine", fr: "Moteur de Reporting & Power BI" },
    desc: { en: "Real-time interactive dashboards, Excel/PDF exports, and native Power BI link.", fr: "Dashboards temps réel, exports PDF/Excel et intégration native Power BI." }
  },
  {
    icon: Cpu,
    title: { en: "API Gateway & SDK", fr: "API Gateway & Open Architecture" },
    desc: { en: "API-First design, REST APIs, Webhooks, and developer SDK for core banking connections.", fr: "Conception API-First, REST APIs, Webhooks et SDK pour intégration Core Banking/CRM." }
  },
  {
    icon: Bell,
    title: { en: "Notification Service", fr: "Service Multi-Canal de Notifications" },
    desc: { en: "Transactional Email, SMS alerts, Mobile Push, and In-App notification center.", fr: "Emails transactionnels, SMS critiques, Push Mobile et notifications In-App." }
  },
  {
    icon: History,
    title: { en: "Audit & Traceability Engine", fr: "Moteur d'Audit & Journalisation" },
    desc: { en: "Cryptographically signed immutable audit logs and regulator-ready reports.", fr: "Historique immuable signé cryptographiquement et exports d'audit réglementaires." }
  }
];

export const FUTURE_MODULES = [
  {
    slug: "secondary-market",
    icon: TrendingUp,
    name: { en: "Secondary Market & Liquidity Hub", fr: "Marché Secondaire & Liquidité" },
    tagline: { en: "P2P Trading & Liquidity Matching", fr: "Négociation P2P & Liquidité" },
    description: { 
      en: "Order matching engine and OTC liquidity mechanisms for unlisted private company shares and bonds.",
      fr: "Moteur d'appariement d'ordres et mécanismes de liquidité gré à gré pour titres non cotés."
    }
  },
  {
    slug: "tokenization-blockchain",
    icon: Globe,
    name: { en: "Digital Assets & Tokenization", fr: "Tokenisation & Actifs Numériques" },
    tagline: { en: "DLT & Smart Contract Settlement", fr: "DLT & Smart Contracts" },
    description: { 
      en: "Optional blockchain-based asset tokenization layer for instant delivery-versus-payment (DvP) settlement.",
      fr: "Couche optionnelle de tokenisation sur registre distribué pour un règlement-livraison instantané."
    }
  }
];

export const getModule = (slug) => MODULES.find(m => m.slug === slug);