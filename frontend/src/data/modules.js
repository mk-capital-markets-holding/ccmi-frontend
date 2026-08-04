// CCMI Modules — bilingual content. Use L(field, lang) helper.
import {
  Users, Shield, Megaphone, LineChart, Building2, Rocket,
  BookOpen, MessageSquare, Store, KeyRound,
} from "lucide-react";

export const MODULES = [
  {
    slug: "investor-registry",
    icon: Users,
    name: { en: "Investor Registry", fr: "Registre des Investisseurs" },
    tagline: {
      en: "A single, authoritative ledger of every shareholder.",
      fr: "Un registre unique et fiable de tous les actionnaires.",
    },
    description: {
      en: "Consolidate registered, bearer and dematerialised holdings into one auditable ledger. Real-time corporate actions, delta reconciliation with CSDs, and end-to-end shareholder identification.",
      fr: "Consolidez les positions nominatives, au porteur et dématérialisées dans un registre auditable unique. Opérations sur titres en temps réel, réconciliation delta avec les dépositaires centraux, et identification des actionnaires de bout en bout.",
    },
    features: [
      { title: { en: "Unified ledger", fr: "Registre unifié" }, detail: { en: "Registered, nominee and CSD positions consolidated in real time.", fr: "Positions nominatives, mandataires et CSD consolidées en temps réel." } },
      { title: { en: "Corporate actions", fr: "Opérations sur titres" }, detail: { en: "Dividends, splits, rights issues automated with regulator-grade audit trail.", fr: "Dividendes, splits, augmentations de capital automatisés avec piste d'audit conforme régulateur." } },
      { title: { en: "KYC & AML integrated", fr: "KYC & LAB intégrés" }, detail: { en: "Continuous screening with 24 global watchlists.", fr: "Filtrage continu contre 24 listes de sanctions internationales." } },
      { title: { en: "Shareholder ID (SRD II)", fr: "Identification actionnaires (SRD II)" }, detail: { en: "Compliant disclosures for pan-European and MENA issuers.", fr: "Divulgations conformes pour émetteurs pan-européens et MENA." } },
      { title: { en: "Multi-jurisdiction", fr: "Multi-juridictions" }, detail: { en: "Configurable per market: DIFC, NGX, JSE, EGX, CSE.", fr: "Configurable par marché : DIFC, NGX, JSE, EGX, CSE." } },
      { title: { en: "APIs & webhooks", fr: "APIs & webhooks" }, detail: { en: "REST OpenAPI 3.0 + event streams for downstream systems.", fr: "REST OpenAPI 3.0 + flux d'événements pour les systèmes en aval." } },
    ],
    benefits: [
      { kpi: "-92%", label: { en: "reconciliation time", fr: "temps de réconciliation" } },
      { kpi: "T+0", label: { en: "dividend distribution", fr: "distribution de dividendes" } },
      { kpi: "99.98%", label: { en: "ledger accuracy", fr: "précision du registre" } },
    ],
    architecture: [
      { en: "Event-sourced ledger", fr: "Registre event-sourced" },
      { en: "AKS multi-region", fr: "AKS multi-régions" },
      { en: "PostgreSQL + Cosmos DB", fr: "PostgreSQL + Cosmos DB" },
      { en: "Cloudflare edge", fr: "Cloudflare edge" },
      { en: "SFTP / SWIFT / ISO 20022 connectors", fr: "Connecteurs SFTP / SWIFT / ISO 20022" },
    ],
    screenshot: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
  },
  {
    slug: "securities-registry",
    icon: Shield,
    name: { en: "Securities Registry", fr: "Registre des Titres" },
    tagline: { en: "Voting, disclosures and board workflows on one ledger.", fr: "Votes, divulgations et workflows conseil sur un registre unique." },
    description: {
      en: "General assemblies conducted online with cryptographically-verifiable votes. Board pack distribution with digital rights management. Regulator-ready disclosures.",
      fr: "Assemblées générales tenues en ligne avec votes cryptographiquement vérifiables. Distribution des documents du conseil avec DRM. Divulgations prêtes pour les régulateurs.",
    },
    features: [
      { title: { en: "e-Voting", fr: "Vote électronique" }, detail: { en: "In-person, proxy and remote votes reconciled instantly.", fr: "Votes en présentiel, par procuration et à distance réconciliés instantanément." } },
      { title: { en: "Board room", fr: "Salle du conseil" }, detail: { en: "DRM-protected pack distribution and version control.", fr: "Distribution DRM et contrôle de versions des dossiers du conseil." } },
      { title: { en: "Disclosure calendar", fr: "Calendrier de divulgation" }, detail: { en: "Automated timelines aligned with local exchange rulebooks.", fr: "Calendriers automatisés alignés sur les règlements des bourses locales." } },
      { title: { en: "Related-party register", fr: "Registre des parties liées" }, detail: { en: "Continuous monitoring with escalation workflows.", fr: "Surveillance continue avec workflows d'escalade." } },
      { title: { en: "Ethics hotline", fr: "Ligne éthique" }, detail: { en: "Confidential reporting with case-management module.", fr: "Signalement confidentiel avec module de gestion des cas." } },
      { title: { en: "Audit trail", fr: "Piste d'audit" }, detail: { en: "Immutable, exportable to regulators.", fr: "Immuable, exportable vers les régulateurs." } },
    ],
    benefits: [
      { kpi: "-68%", label: { en: "AGM preparation time", fr: "temps de préparation AG" } },
      { kpi: "100%", label: { en: "audit trail coverage", fr: "couverture piste d'audit" } },
      { kpi: "3 clicks", label: { en: "to disclosure filing", fr: "pour déposer une divulgation" } },
    ],
    architecture: [
      { en: "Zero-trust access", fr: "Accès zero-trust" },
      { en: "Signed ballot chain", fr: "Chaîne de bulletins signés" },
      { en: "Regulator webhook feeds", fr: "Flux webhooks régulateurs" },
      { en: "SSO SAML / OIDC", fr: "SSO SAML / OIDC" },
    ],
    screenshot: "https://images.pexels.com/photos/22065462/pexels-photo-22065462.jpeg",
  },
  {
    slug: "campaign-workspace",
    icon: Megaphone,
    name: { en: "Campaign Workspace", fr: "Atelier de Campagnes" },
    tagline: { en: "Multi-channel investor campaigns with regulatory guardrails.", fr: "Campagnes investisseurs multi-canal avec garde-fous réglementaires." },
    description: {
      en: "Roadshows, rights-issue campaigns, tender offers — orchestrated across email, portal, SMS and voice, with legal review baked in.",
      fr: "Roadshows, augmentations de capital, offres publiques — orchestrés sur email, portail, SMS et voix, avec revue juridique intégrée.",
    },
    features: [
      { title: { en: "Campaign templates", fr: "Modèles de campagne" }, detail: { en: "Rights issue, tender offer, dividend re-investment out of the box.", fr: "Augmentation de capital, OPA, réinvestissement de dividende prêts à l'emploi." } },
      { title: { en: "Legal review flow", fr: "Workflow de revue juridique" }, detail: { en: "Multi-step approval with jurisdictional guardrails.", fr: "Approbation multi-étapes avec garde-fous juridictionnels." } },
      { title: { en: "Segmented targeting", fr: "Ciblage segmenté" }, detail: { en: "By holding size, geography, investor class.", fr: "Par taille de position, géographie, classe d'investisseur." } },
      { title: { en: "Analytics", fr: "Analytique" }, detail: { en: "Open, click, response and subscription rates per cohort.", fr: "Taux d'ouverture, clic, réponse et souscription par cohorte." } },
      { title: { en: "Whitelabel portal", fr: "Portail marque blanche" }, detail: { en: "Deploy under the issuer's own domain.", fr: "Déploiement sous le domaine de l'émetteur." } },
      { title: { en: "Multi-language", fr: "Multi-langues" }, detail: { en: "EN, FR, AR, Swahili, Portuguese templates.", fr: "Modèles EN, FR, AR, Swahili, Portugais." } },
    ],
    benefits: [
      { kpi: "+41%", label: { en: "subscription uptake", fr: "adhésion aux souscriptions" } },
      { kpi: "-73%", label: { en: "campaign launch time", fr: "temps de lancement" } },
      { kpi: "6", label: { en: "languages supported", fr: "langues supportées" } },
    ],
    architecture: [
      { en: "Content workflow engine", fr: "Moteur de workflow de contenu" },
      { en: "Email / SMS gateway", fr: "Passerelle Email / SMS" },
      { en: "Segment engine", fr: "Moteur de segmentation" },
      { en: "Attribution store", fr: "Base d'attribution" },
    ],
    screenshot: "https://images.pexels.com/photos/9301316/pexels-photo-9301316.jpeg",
  },
  {
    slug: "financial-engineering",
    icon: LineChart,
    name: { en: "Financial Engineering", fr: "Ingénierie Financière" },
    tagline: { en: "Design, price and manage structured products at scale.", fr: "Concevez, valorisez et gérez des produits structurés à grande échelle." },
    description: {
      en: "From term-sheet to lifecycle management — an integrated environment for structured products, sukuk, and green instruments across MENA and African markets.",
      fr: "Du term-sheet à la gestion du cycle de vie — un environnement intégré pour produits structurés, sukuk et instruments verts sur les marchés MENA et africains.",
    },
    features: [
      { title: { en: "Product designer", fr: "Concepteur de produits" }, detail: { en: "Visual term-sheet builder with 40+ payoff templates.", fr: "Éditeur visuel de term-sheet avec plus de 40 modèles de payoff." } },
      { title: { en: "Pricing library", fr: "Bibliothèque de pricing" }, detail: { en: "Monte-Carlo, PDE and closed-form for exotic payoffs.", fr: "Monte-Carlo, EDP et formules fermées pour payoffs exotiques." } },
      { title: { en: "Sukuk & ESG", fr: "Sukuk & ESG" }, detail: { en: "Shariah-compliant and green-bond frameworks.", fr: "Cadres conformes charia et green-bonds." } },
      { title: { en: "Lifecycle events", fr: "Événements de cycle de vie" }, detail: { en: "Callable, autocallable, barrier events automated.", fr: "Événements callable, autocallable, barrière automatisés." } },
      { title: { en: "Risk & scenarios", fr: "Risque & scénarios" }, detail: { en: "Greeks, VaR, and regulatory stress tests.", fr: "Grecques, VaR et stress tests réglementaires." } },
      { title: { en: "Regulator export", fr: "Export régulateur" }, detail: { en: "IOSCO / IFSB compliant reporting bundles.", fr: "Reporting conforme IOSCO / IFSB." } },
    ],
    benefits: [
      { kpi: "18min", label: { en: "term-sheet to quote", fr: "du term-sheet à la cotation" } },
      { kpi: "40+", label: { en: "payoff templates", fr: "modèles de payoff" } },
      { kpi: "IFSB", label: { en: "certified reporting", fr: "reporting certifié" } },
    ],
    architecture: [
      { en: "Python quant kernel", fr: "Noyau quant Python" },
      { en: "GPU-accelerated Monte Carlo", fr: "Monte Carlo accéléré GPU" },
      { en: "Shariah rules engine", fr: "Moteur de règles Charia" },
      { en: "Reg-report generator", fr: "Générateur de reporting régulateur" },
    ],
    screenshot: "https://images.pexels.com/photos/9965285/pexels-photo-9965285.jpeg",
  },
  {
    slug: "investor-portal",
    icon: Building2,
    name: { en: "Investor Portal", fr: "Portail Investisseur" },
    tagline: { en: "A whitelabel investor experience across web and mobile.", fr: "Une expérience investisseur en marque blanche sur web et mobile." },
    description: {
      en: "Give retail and institutional investors a single, branded portal for holdings, corporate actions, voting, statements and subscriptions.",
      fr: "Offrez aux investisseurs particuliers et institutionnels un portail unique et personnalisé pour positions, opérations sur titres, votes, relevés et souscriptions.",
    },
    features: [
      { title: { en: "Multi-tenant whitelabel", fr: "Marque blanche multi-tenant" }, detail: { en: "Full brand and locale customisation.", fr: "Personnalisation complète marque et localisation." } },
      { title: { en: "Real-time holdings", fr: "Positions en temps réel" }, detail: { en: "Positions, P&L, corporate action calendar.", fr: "Positions, P&L, calendrier des opérations sur titres." } },
      { title: { en: "e-Signatures", fr: "Signatures électroniques" }, detail: { en: "Compliant with UAE ESCA and EU eIDAS.", fr: "Conformes UAE ESCA et UE eIDAS." } },
      { title: { en: "Mobile SDK", fr: "SDK mobile" }, detail: { en: "iOS/Android with biometric auth.", fr: "iOS/Android avec authentification biométrique." } },
      { title: { en: "Statements", fr: "Relevés" }, detail: { en: "Regulator-compliant PDF and XML statements.", fr: "Relevés PDF et XML conformes régulateur." } },
      { title: { en: "Support module", fr: "Module support" }, detail: { en: "Ticketing and secure messaging.", fr: "Ticketing et messagerie sécurisée." } },
    ],
    benefits: [
      { kpi: "1.2M", label: { en: "investors served", fr: "investisseurs servis" } },
      { kpi: "4.7/5", label: { en: "in-app rating", fr: "note dans l'app" } },
      { kpi: "<2s", label: { en: "median load time", fr: "temps de chargement médian" } },
    ],
    architecture: [
      { en: "React Native mobile", fr: "React Native mobile" },
      { en: "GraphQL BFF", fr: "BFF GraphQL" },
      { en: "Push notifications", fr: "Notifications push" },
      { en: "Regulatory PDF engine", fr: "Moteur PDF réglementaire" },
    ],
    screenshot: "https://images.pexels.com/photos/14365249/pexels-photo-14365249.jpeg",
  },
  {
    slug: "ipo-hub",
    icon: Rocket,
    name: { en: "IPO Hub", fr: "IPO Hub" },
    tagline: { en: "End-to-end IPO orchestration.", fr: "Orchestration d'IPO de bout en bout." },
    description: {
      en: "Prospectus versioning, book-building, allocation, stabilisation and post-listing — a single workspace for issuers, banks and exchanges.",
      fr: "Versioning du prospectus, book-building, allocation, stabilisation et post-cotation — un espace de travail unique pour émetteurs, banques et bourses.",
    },
    features: [
      { title: { en: "Prospectus manager", fr: "Gestionnaire de prospectus" }, detail: { en: "Version-controlled with regulator redlines.", fr: "Versioning contrôlé avec annotations régulateur." } },
      { title: { en: "Book-building", fr: "Book-building" }, detail: { en: "Institutional and retail tranches with real-time demand curves.", fr: "Tranches institutionnelles et retail avec courbes de demande temps réel." } },
      { title: { en: "Allocation engine", fr: "Moteur d'allocation" }, detail: { en: "Rules-based with regulator audit output.", fr: "Basé sur des règles avec sortie d'audit régulateur." } },
      { title: { en: "Retail channel", fr: "Canal retail" }, detail: { en: "Whitelabel mobile subscription for retail investors.", fr: "Souscription mobile en marque blanche pour investisseurs particuliers." } },
      { title: { en: "Stabilisation", fr: "Stabilisation" }, detail: { en: "Greenshoe and OAP operations tracked to the trade.", fr: "Greenshoe et OAP tracés jusqu'au trade." } },
      { title: { en: "Post-listing analytics", fr: "Analytique post-cotation" }, detail: { en: "Trading, coverage, and register dynamics.", fr: "Trading, couverture et dynamiques du registre." } },
    ],
    benefits: [
      { kpi: "-55%", label: { en: "time to list", fr: "délai de cotation" } },
      { kpi: "6", label: { en: "IPOs supported", fr: "IPO orchestrées" } },
      { kpi: "USD 2.1B", label: { en: "capital raised on platform", fr: "capital levé sur la plateforme" } },
    ],
    architecture: [
      { en: "Book-building engine", fr: "Moteur de book-building" },
      { en: "Allocation rules DSL", fr: "DSL de règles d'allocation" },
      { en: "Regulator sandbox connectors", fr: "Connecteurs sandbox régulateurs" },
      { en: "Retail mobile channel", fr: "Canal mobile retail" },
    ],
    screenshot: "https://images.pexels.com/photos/1381722/pexels-photo-1381722.jpeg",
  },
];

export const FUTURE_MODULES = [
  { slug: "docs-academy", icon: BookOpen, name: { en: "Documentation & Academy", fr: "Documentation & Academy" }, tagline: { en: "Learn CCMI. Deploy CCMI.", fr: "Apprenez CCMI. Déployez CCMI." }, description: { en: "Interactive learning paths for developers, operators and regulators. Certifications, sandboxes and course-work built into the product.", fr: "Parcours d'apprentissage interactifs pour développeurs, opérateurs et régulateurs. Certifications, bacs à sable et cours intégrés au produit." } },
  { slug: "community-support", icon: MessageSquare, name: { en: "Community & Support Center", fr: "Communauté & Centre de Support" }, tagline: { en: "A shared knowledge base for the CCMI ecosystem.", fr: "Une base de connaissances partagée pour l'écosystème CCMI." }, description: { en: "Ticketing, SLAs, community forums and expert marketplace for our client operations teams.", fr: "Ticketing, SLA, forums communautaires et marketplace d'experts pour les équipes opérationnelles clients." } },
  { slug: "marketplace-api", icon: Store, name: { en: "Marketplace & API Docs", fr: "Marketplace & Docs API" }, tagline: { en: "A marketplace of ecosystem extensions.", fr: "Une marketplace d'extensions écosystème." }, description: { en: "Third-party modules, connectors, data feeds. Rev-share model. Public REST/GraphQL reference and OAuth2 sandbox.", fr: "Modules tiers, connecteurs, flux de données. Modèle de partage de revenus. Référence publique REST/GraphQL et bac à sable OAuth2." } },
  { slug: "client-investor-portals", icon: KeyRound, name: { en: "Client & Investor Portals", fr: "Portails Client & Investisseur" }, tagline: { en: "Segmented experiences for clients and their investors.", fr: "Expériences segmentées pour clients et leurs investisseurs." }, description: { en: "Multi-tier authenticated portals with fine-grained data-room permissions and regulator-ready audit trails.", fr: "Portails authentifiés multi-niveaux avec permissions granulaires de data-room et pistes d'audit prêtes pour les régulateurs." } },
];

export const getModule = (slug) => MODULES.find(m => m.slug === slug);