// CCMI Modules — bilingual content. Use L(field, lang) helper.
import {
  Users, Shield, Megaphone, LineChart, Building2, Rocket,
  BookOpen, MessageSquare, Store, KeyRound,
} from "lucide-react";

export const MODULES = [
  {
    slug: "investor-onboarding",
    icon: Users,
    name: { en: "Investor Onboarding & KYC", fr: "Investor Onboarding & KYC" },
    tagline: {
      en: "Automated investor onboarding, digital registry, and risk scoring.",
      fr: "Embarquement automatisé, registre numérique et scoring de risque.",
    },
    description: {
      en: "Streamline the investor journey with digital registration, automated KYC/KYB checks, and continuous risk assessment within a secure document repository.",
      fr: "Digitalisez le parcours investisseur grâce à l'enregistrement numérique, des vérifications KYC/KYB automatisées et une évaluation continue des risques dans un coffre-fort documentaire.",
    },
    features: [
      { title: { en: "Digital registry", fr: "Registre numérique" }, detail: { en: "Centralized investor profile and holdings management.", fr: "Gestion centralisée du profil et des positions des investisseurs." } },
      { title: { en: "Automated KYC & KYB", fr: "Vérification KYC & KYB" }, detail: { en: "Automated identity and entity verification processes.", fr: "Processus automatisés de vérification d'identité et de personnes morales." } },
      { title: { en: "Risk assessment engine", fr: "Moteur de scoring de risque" }, detail: { en: "Dynamic risk scoring and compliance profiling.", fr: "Scoring de risque dynamique et profilage de conformité." } },
      { title: { en: "Secure document vault", fr: "Coffre-fort documentaire" }, detail: { en: "Encrypted repository for ID and legal documentation.", fr: "Espace sécurisé et crypté pour pièces d'identité et documents juridiques." } },
      { title: { en: "CEMAC Regulatory compliance", fr: "Conformité CEMAC" }, detail: { en: "Built to align with COSUMAF guidelines and regional norms.", fr: "Conçu selon les directives de la COSUMAF et normes régionales." } },
      { title: { en: "Audit-ready logs", fr: "Piste d'audit complète" }, detail: { en: "Immutable verification logs for regulatory compliance.", fr: "Traces d'audit immuables pour les contrôles réglementaires." } },
    ],
    benefits: [
      { kpi: "-85%", label: { en: "onboarding delay", fr: "délai d'embarquement" } },
      { kpi: "100%", label: { en: "KYC/KYB digitalized", fr: "KYC/KYB digitalisés" } },
      { kpi: "T+0", label: { en: "account activation", fr: "activation de compte" } },
    ],
    architecture: [
      { en: "FastAPI / Python backend", fr: "Backend FastAPI / Python" },
      { en: "Microservices architecture", fr: "Architecture microservices" },
      { en: "Encrypted document storage", fr: "Stockage documentaire chiffré" },
      { en: "Cloud-native SaaS deployment", fr: "Déploiement Cloud-native SaaS" },
    ],
    screenshot: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
  },
  {
    slug: "securities-registry",
    icon: Shield,
    name: { en: "Corporate Governance & Registry", fr: "Gouvernance & Registre de Titres" },
    tagline: { en: "Shareholder registry, Cap Table, and e-Voting on a single platform.", fr: "Registre d'actionnaires, Cap Table et vote électronique centralisés." },
    description: {
      en: "Maintain dynamic share registers, automate corporate actions, manage Cap Tables in real time, and hold secure general assemblies with integrated e-Voting.",
      fr: "Tenez à jour des registres d'actionnaires dynamiques, automatisez les opérations sur titres, gérez les Cap Tables et organisez des AG avec vote électronique.",
    },
    features: [
      { title: { en: "Dynamic Cap Table", fr: "Cap Table dynamique" }, detail: { en: "Real-time ownership tracking and dilution management.", fr: "Suivi en temps réel de l'actionnariat et gestion des dilutions." } },
      { title: { en: "e-Voting platform", fr: "Vote électronique" }, detail: { en: "Cryptographically verifiable votes for general meetings.", fr: "Votes sécurisés et vérifiables pour les assemblées générales." } },
      { title: { en: "Corporate actions", fr: "Opérations sur titres" }, detail: { en: "Automated distribution of dividends, splits, and capital changes.", fr: "Distribution automatisée des dividendes, splits et augmentations." } },
      { title: { en: "Assembly management", fr: "Gestion des assemblées" }, detail: { en: "Minutes generation and board pack distribution.", fr: "Génération des PV et distribution des dossiers de conseil." } },
      { title: { en: "Regulator reporting", fr: "Reporting régulateur" }, detail: { en: "Standardized disclosure exports for oversight bodies.", fr: "Exports de divulgation standardisés pour autorités de contrôle." } },
      { title: { en: "Access control (RBAC)", fr: "Contrôle d'accès RBAC" }, detail: { en: "Role-based permissions for management, board, and shareholders.", fr: "Permissions basées sur les rôles (direction, conseil, actionnaires)." } },
    ],
    benefits: [
      { kpi: "-70%", label: { en: "AGM preparation time", fr: "temps de préparation AG" } },
      { kpi: "100%", label: { en: "traceable voting", fr: "traçabilité des votes" } },
      { kpi: "Real-time", label: { en: "Cap Table updates", fr: "mise à jour Cap Table" } },
    ],
    architecture: [
      { en: "Event-driven ledger architecture", fr: "Architecture événementielle" },
      { en: "Role-Based Access Control (RBAC)", fr: "Gestion RBAC stricte" },
      { en: "Automated report engine", fr: "Moteur de rapports automatisés" },
      { en: "Secure API Gateway", fr: "API Gateway sécurisée" },
    ],
    screenshot: "https://images.pexels.com/photos/22065462/pexels-photo-22065462.jpeg",
  },
  {
    slug: "campaign-workspace",
    icon: Megaphone,
    name: { en: "Campaign Workspace", fr: "Workspace de Campagnes" },
    tagline: { en: "Centralized workspace to structure and execute fundraising campaigns.", fr: "Espace de travail centralisé pour orchestrer les levées de fonds." },
    description: {
      en: "Manage fundraising campaigns from end-to-end: business plan repository, secure virtual Data Room access, and investor due diligence workflow.",
      fr: "Orchestrez vos campagnes de levée de fonds : dépôt de Business Plans, Data Room virtuelle sécurisée et suivi des diligences investisseurs.",
    },
    features: [
      { title: { en: "Campaign builder", fr: "Créateur de campagnes" }, detail: { en: "Structured tools for rights issues, offerings, and private placements.", fr: "Outils de structuration d'émissions et placements privés." } },
      { title: { en: "Business plan repository", fr: "Dépôt de Business Plans" }, detail: { en: "Centralized document sharing with prospective investors.", fr: "Partage centralisé des éléments financiers et stratégiques." } },
      { title: { en: "Virtual Data Room (VDR)", fr: "Data Room virtuelle" }, detail: { en: "Secure document room with granular access permissions.", fr: "Salle des marchés documentaire avec accès très granulaires." } },
      { title: { en: "Due Diligence tracker", fr: "Suivi Due Diligence" }, detail: { en: "Track investor interactions, Q&A, and document views.", fr: "Suivi des consultations, questions/réponses et engagements." } },
      { title: { en: "Multi-currency support", fr: "Gestion multi-devises" }, detail: { en: "Native support for XAF, EUR, USD and regional currencies.", fr: "Prise en charge native du XAF, EUR, USD et devises régionales." } },
      { title: { en: "Advisor coordination", fr: "Coordination des conseils" }, detail: { en: "Shared workspace for legal, financial, and listing advisors.", fr: "Espace collaboratif pour conseils juridiques et financiers." } },
    ],
    benefits: [
      { kpi: "-60%", label: { en: "deal closing time", fr: "délai de clôture des levées" } },
      { kpi: "100%", label: { en: "VDR document security", fr: "sécurité des documents VDR" } },
      { kpi: "360°", label: { en: "investor interaction visibility", fr: "visibilité sur les investisseurs" } },
    ],
    architecture: [
      { en: "Secure file encryption (AES-256)", fr: "Chiffrement des fichiers (AES-256)" },
      { en: "Granular VDR permissions engine", fr: "Moteur d'accès VDR granulaires" },
      { en: "Real-time analytics engine", fr: "Moteur d'analyse en temps réel" },
    ],
    screenshot: "https://images.pexels.com/photos/9301316/pexels-photo-9301316.jpeg",
  },
  {
    slug: "financial-engineering",
    icon: LineChart,
    name: { en: "Financial Engineering", fr: "Ingénierie Financière" },
    tagline: { en: "DCF modeling, corporate valuation, and dilution simulation tools.", fr: "Modélisation DCF, valorisation d'entreprise et simulation de dilution." },
    description: {
      en: "Advanced toolkit for financial analysts and corporate advisors: automated DCF models, valuation algorithms, and dynamic capital structure simulations.",
      fr: "Boîte d'outils avancée pour analystes et conseils financiers : modèles DCF automatisés, valorisation et simulation des structures de capital.",
    },
    features: [
      { title: { en: "DCF modeling engine", fr: "Modélisation DCF" }, detail: { en: "Discounted Cash Flow modeling calibrated for emerging markets.", fr: "Modèles d'actualisation des flux adaptés aux marchés émergents." } },
      { title: { en: "Valuation workbench", fr: "Moteur de valorisation" }, detail: { en: "Multi-method valuation frameworks (Multiples, DCF, NAV).", fr: "Méthodes multiples de valorisation (Multiples, DCF, ANC)." } },
      { title: { en: "Dilution simulator", fr: "Simulateur de dilution" }, detail: { en: "Simulate post-money equity structures across funding rounds.", fr: "Simulations post-money et évolutions du capital selon les tours." } },
      { title: { en: "Financial structuring", fr: "Structuration d'instruments" }, detail: { en: "Configure equity, debt, and hybrid securities.", fr: "Modélisation de titres de capital, dette et instruments hybrides." } },
      { title: { en: "Scenario stress testing", fr: "Stress-testing de scénarios" }, detail: { en: "Sensitivity analyses on key valuation variables.", fr: "Analyses de sensibilité sur les variables clés de valorisation." } },
      { title: { en: "Institutional export", fr: "Exports institutionnels" }, detail: { en: "One-click generation of financial memos and models.", fr: "Génération en un clic de mémorandums et modèles financiers." } },
    ],
    benefits: [
      { kpi: "<30min", label: { en: "full DCF model creation", fr: "création d'un modèle DCF" } },
      { kpi: "Multi-method", label: { en: "valuation capabilities", fr: "capacités de valorisation" } },
      { kpi: "100%", label: { en: "auditability of assumptions", fr: "traçabilité des hypothèses" } },
    ],
    architecture: [
      { en: "Python quantitative engine", fr: "Noyau quantitatif Python" },
      { en: "FastAPI high-speed processing", fr: "Calculs haute performance FastAPI" },
      { en: "Scenario modeling matrix", fr: "Matrice de simulation de scénarios" },
    ],
    screenshot: "https://images.pexels.com/photos/9965285/pexels-photo-9965285.jpeg",
  },
  {
    slug: "investor-portal",
    icon: Building2,
    name: { en: "Investor Portal", fr: "Portail Investisseur" },
    tagline: { en: "Dedicated portal for portfolio tracking, certificates, and dividends.", fr: "Portail dédié au suivi de portefeuille, certificats et dividendes." },
    description: {
      en: "Empower institutional and retail investors with a unified dashboard for tracking security positions, digital stock certificates, and dividend payout history.",
      fr: "Offrez aux investisseurs institutionnels et privés une vue unifiée de leurs portefeuilles, certificats digitaux d'actions et historique des dividendes.",
    },
    features: [
      { title: { en: "Portfolio dashboard", fr: "Tableau de bord portefeuille" }, detail: { en: "Consolidated view of asset holdings, performance, and updates.", fr: "Vue consolidée des avoirs, performances et actualités des sociétés." } },
      { title: { en: "Digital share certificates", fr: "Certificats digitaux" }, detail: { en: "Cryptographically verifiable share ownership certificates.", fr: "Certificats de propriété d'actions numérisés et vérifiables." } },
      { title: { en: "Dividend tracking", fr: "Historique des dividendes" }, detail: { en: "Transparent history of dividend declarations and payouts.", fr: "Historique transparent des distributions et versements de dividendes." } },
      { title: { en: "Document repository", fr: "Coffre-fort personnel" }, detail: { en: "Direct access to tax statements, notices, and voting cards.", fr: "Accès direct aux relevés, avis de convocation et coupons de vote." } },
      { title: { en: "Secure authentication", fr: "Authentification renforcée" }, detail: { en: "Multi-factor authentication (MFA) and secure sessions.", fr: "Authentification multifacteur (MFA) et sessions sécurisées." } },
      { title: { en: "White-label customization", fr: "Marque blanche" }, detail: { en: "Customizable visual branding for issuers and brokerages.", fr: "Branding personnalisable pour les émetteurs et intermédiaires." } },
    ],
    benefits: [
      { kpi: "24/7", label: { en: "investor self-service access", fr: "accès autonome investisseurs" } },
      { kpi: "100%", label: { en: "digital certificates", fr: "certificats numérisés" } },
      { kpi: "<2s", label: { en: "dashboard load time", fr: "temps d'affichage du portail" } },
    ],
    architecture: [
      { en: "React / Next.js frontend", fr: "Frontend React / Next.js" },
      { en: "Secure REST / GraphQL APIs", fr: "APIs REST / GraphQL sécurisées" },
      { en: "Automated PDF statement engine", fr: "Moteur de génération PDF" },
    ],
    screenshot: "https://images.pexels.com/photos/14365249/pexels-photo-14365249.jpeg",
  },
  {
    slug: "ipo-hub-lite",
    icon: Rocket,
    name: { en: "IPO Hub Lite", fr: "IPO Hub Lite" },
    tagline: { en: "IPO readiness diagnostic, advisor coordination, and compliance tracking.", fr: "Diagnostic IPO Readiness, coordination des conseils et suivi de la gouvernance." },
    description: {
      en: "Structured workspace for companies preparing to list on CEMAC and African markets: IPO readiness assessments, advisor workflows, and regulatory compliance preparation.",
      fr: "Espace structuré pour entreprises visant la cote en Afrique / CEMAC : évaluation IPO Readiness, coordination des conseils et préparation de la conformité.",
    },
    features: [
      { title: { en: "IPO Readiness diagnostic", fr: "Diagnostic IPO Readiness" }, detail: { en: "Automated assessment against market listing requirements.", fr: "Évaluation automatisée au regard des exigences de cotation." } },
      { title: { en: "Advisor coordination workspace", fr: "Coordination des conseils" }, detail: { en: "Centralized hub for listing sponsors, legal advisors, and auditors.", fr: "Hub central pour Listing Sponsors, avocats et commissaires aux comptes." } },
      { title: { en: "Governance audit trail", fr: "Suivi de gouvernance" }, detail: { en: "Track readiness across board composition, controls, and disclosures.", fr: "Suivi de la conformité du conseil, des contrôles et divulgations." } },
      { title: { en: "Prospectus preparation", fr: "Préparation du prospectus" }, detail: { en: "Collaborative drafting and version control for regulatory filings.", fr: "Rédaction collaborative et suivi de version du document d'information." } },
      { title: { en: "COSUMAF / BVMAC alignment", fr: "Alignement COSUMAF / BVMAC" }, detail: { en: "Checklists mapped to CEMAC financial market rules.", fr: "Checklists alignées sur les règles du marché financier CEMAC." } },
      { title: { en: "Post-listing transition", fr: "Transition post-cotation" }, detail: { en: "Seamless transfer of IPO data to ongoing corporate registry.", fr: "Transfert des données vers le registre d'actionnaires après la cote." } },
    ],
    benefits: [
      { kpi: "-50%", label: { en: "IPO preparation timeline", fr: "délai de préparation IPO" } },
      { kpi: "100%", label: { en: "governance checklist coverage", fr: "couverture des règles de gouvernance" } },
      { kpi: "CEMAC", label: { en: "market readiness focus", fr: "alignement marché régional" } },
    ],
    architecture: [
      { en: "Compliance assessment engine", fr: "Moteur d'évaluation de conformité" },
      { en: "Document version control system", fr: "Système de versioning documentaire" },
      { en: "Advisor collaboration gateway", fr: "Passerelle de collaboration conseils" },
    ],
    screenshot: "https://images.pexels.com/photos/1381722/pexels-photo-1381722.jpeg",
  },
];

export const FUTURE_MODULES = [
  { slug: "docs-academy", icon: BookOpen, name: { en: "Documentation & Academy", fr: "Documentation & Academy" }, tagline: { en: "Learn CCMI. Deploy CCMI.", fr: "Apprenez CCMI. Déployez CCMI." }, description: { en: "Interactive learning paths for developers, operators and regulators. Certifications and sandboxes built into the product.", fr: "Parcours d'apprentissage interactifs pour développeurs, opérateurs et régulateurs. Certifications et bacs à sable intégrés." } },
  { slug: "community-support", icon: MessageSquare, name: { en: "Community & Support Center", fr: "Communauté & Centre de Support" }, tagline: { en: "A shared knowledge base for the CCMI ecosystem.", fr: "Une base de connaissances partagée pour l'écosystème CCMI." }, description: { en: "Ticketing, SLAs, community forums and expert marketplace for client operation teams.", fr: "Ticketing, SLA, forums communautaires et marketplace d'experts pour les équipes opérationnelles clients." } },
  { slug: "marketplace-api", icon: Store, name: { en: "Marketplace & API Docs", fr: "Marketplace & Docs API" }, tagline: { en: "A marketplace of ecosystem extensions.", fr: "Une marketplace d'extensions écosystème." }, description: { en: "Third-party modules, connectors, and data feeds. Public REST/FastAPI reference and OAuth2 sandbox.", fr: "Modules tiers, connecteurs, flux de données. Référence publique REST/FastAPI et bac à sable OAuth2." } },
  { slug: "client-investor-portals", icon: KeyRound, name: { en: "Client & Investor Portals", fr: "Portails Client & Investisseur" }, tagline: { en: "Segmented experiences for clients and their investors.", fr: "Expériences segmentées pour clients et leurs investisseurs." }, description: { en: "Multi-tier authenticated portals with fine-grained data-room permissions and regulator-ready audit trails.", fr: "Portails authentifiés multi-niveaux avec permissions granulaires de data-room et pistes d'audit." } },
];

export const getModule = (slug) => MODULES.find(m => m.slug === slug);