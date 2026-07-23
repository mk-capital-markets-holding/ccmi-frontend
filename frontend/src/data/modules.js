// CCMI Modules — canonical data used by SolutionsHub and ModulePage template.
import {
  Users, Shield, Megaphone, LineChart, Building2, Rocket,
  BookOpen, MessageSquare, Store, KeyRound,
} from "lucide-react";

export const MODULES = [
  {
    slug: "investor-registry",
    icon: Users,
    name: "Investor Registry",
    tagline: "A single, authoritative ledger of every shareholder.",
    description: "Consolidate registered, bearer and dematerialised holdings into one auditable ledger. Real-time corporate actions, delta reconciliation with CSDs, and end-to-end shareholder identification.",
    features: [
      { title: "Unified ledger", detail: "Registered, nominee and CSD positions consolidated in real time." },
      { title: "Corporate actions", detail: "Dividends, splits, rights issues automated with regulator-grade audit trail." },
      { title: "KYC & AML integrated", detail: "Continuous screening with 24 global watchlists." },
      { title: "Shareholder ID (SRD II)", detail: "Compliant disclosures for pan-European and MENA issuers." },
      { title: "Multi-jurisdiction", detail: "Configurable per market: DIFC, NGX, JSE, EGX, CSE." },
      { title: "APIs & webhooks", detail: "REST OpenAPI 3.0 + event streams for downstream systems." },
    ],
    benefits: [
      { kpi: "-92%", label: "reconciliation time" },
      { kpi: "T+0", label: "dividend distribution" },
      { kpi: "99.98%", label: "ledger accuracy" },
    ],
    architecture: ["Event-sourced ledger", "AKS multi-region", "PostgreSQL + Cosmos DB", "Cloudflare edge", "SFTP / SWIFT / ISO 20022 connectors"],
    screenshot: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
  },
  {
    slug: "corporate-governance",
    icon: Shield,
    name: "Corporate Governance",
    tagline: "Voting, disclosures and board workflows on one ledger.",
    description: "General assemblies conducted online with cryptographically-verifiable votes. Board pack distribution with digital rights management. Regulator-ready disclosures.",
    features: [
      { title: "e-Voting", detail: "In-person, proxy and remote votes reconciled instantly." },
      { title: "Board room", detail: "DRM-protected pack distribution and version control." },
      { title: "Disclosure calendar", detail: "Automated timelines aligned with local exchange rulebooks." },
      { title: "Related-party register", detail: "Continuous monitoring with escalation workflows." },
      { title: "Ethics hotline", detail: "Confidential reporting with case-management module." },
      { title: "Audit trail", detail: "Immutable, exportable to regulators." },
    ],
    benefits: [
      { kpi: "-68%", label: "AGM preparation time" },
      { kpi: "100%", label: "audit trail coverage" },
      { kpi: "3 clicks", label: "to disclosure filing" },
    ],
    architecture: ["Zero-trust access", "Signed ballot chain", "Regulator webhook feeds", "SSO SAML / OIDC"],
    screenshot: "https://images.pexels.com/photos/22065462/pexels-photo-22065462.jpeg",
  },
  {
    slug: "campaign-workspace",
    icon: Megaphone,
    name: "Campaign Workspace",
    tagline: "Multi-channel investor campaigns with regulatory guardrails.",
    description: "Roadshows, rights-issue campaigns, tender offers — orchestrated across email, portal, SMS and voice, with legal review baked in.",
    features: [
      { title: "Campaign templates", detail: "Rights issue, tender offer, dividend re-investment out of the box." },
      { title: "Legal review flow", detail: "Multi-step approval with jurisdictional guardrails." },
      { title: "Segmented targeting", detail: "By holding size, geography, investor class." },
      { title: "Analytics", detail: "Open, click, response and subscription rates per cohort." },
      { title: "Whitelabel portal", detail: "Deploy under the issuer's own domain." },
      { title: "Multi-language", detail: "EN, FR, AR, Swahili, Portuguese templates." },
    ],
    benefits: [
      { kpi: "+41%", label: "subscription uptake" },
      { kpi: "-73%", label: "campaign launch time" },
      { kpi: "6", label: "languages supported" },
    ],
    architecture: ["Content workflow engine", "Email / SMS gateway", "Segment engine", "Attribution store"],
    screenshot: "https://images.pexels.com/photos/9301316/pexels-photo-9301316.jpeg",
  },
  {
    slug: "financial-engineering",
    icon: LineChart,
    name: "Financial Engineering",
    tagline: "Design, price and manage structured products at scale.",
    description: "From term-sheet to lifecycle management — an integrated environment for structured products, sukuk, and green instruments across MENA and African markets.",
    features: [
      { title: "Product designer", detail: "Visual term-sheet builder with 40+ payoff templates." },
      { title: "Pricing library", detail: "Monte-Carlo, PDE and closed-form for exotic payoffs." },
      { title: "Sukuk & ESG", detail: "Shariah-compliant and green-bond frameworks." },
      { title: "Lifecycle events", detail: "Callable, autocallable, barrier events automated." },
      { title: "Risk & scenarios", detail: "Greeks, VaR, and regulatory stress tests." },
      { title: "Regulator export", detail: "IOSCO / IFSB compliant reporting bundles." },
    ],
    benefits: [
      { kpi: "18min", label: "term-sheet to quote" },
      { kpi: "40+", label: "payoff templates" },
      { kpi: "IFSB", label: "certified reporting" },
    ],
    architecture: ["Python quant kernel", "GPU-accelerated Monte Carlo", "Shariah rules engine", "Reg-report generator"],
    screenshot: "https://images.pexels.com/photos/9965285/pexels-photo-9965285.jpeg",
  },
  {
    slug: "investor-portal",
    icon: Building2,
    name: "Investor Portal",
    tagline: "A whitelabel investor experience across web and mobile.",
    description: "Give retail and institutional investors a single, branded portal for holdings, corporate actions, voting, statements and subscriptions.",
    features: [
      { title: "Multi-tenant whitelabel", detail: "Full brand and locale customisation." },
      { title: "Real-time holdings", detail: "Positions, P&L, corporate action calendar." },
      { title: "e-Signatures", detail: "Compliant with UAE ESCA and EU eIDAS." },
      { title: "Mobile SDK", detail: "iOS/Android with biometric auth." },
      { title: "Statements", detail: "Regulator-compliant PDF and XML statements." },
      { title: "Support module", detail: "Ticketing and secure messaging." },
    ],
    benefits: [
      { kpi: "1.2M", label: "investors served" },
      { kpi: "4.7/5", label: "in-app rating" },
      { kpi: "<2s", label: "median load time" },
    ],
    architecture: ["React Native mobile", "GraphQL BFF", "Push notifications", "Regulatory PDF engine"],
    screenshot: "https://images.pexels.com/photos/14365249/pexels-photo-14365249.jpeg",
  },
  {
    slug: "ipo-hub",
    icon: Rocket,
    name: "IPO Hub",
    tagline: "End-to-end IPO orchestration.",
    description: "Prospectus versioning, book-building, allocation, stabilisation and post-listing — a single workspace for issuers, banks and exchanges.",
    features: [
      { title: "Prospectus manager", detail: "Version-controlled with regulator redlines." },
      { title: "Book-building", detail: "Institutional and retail tranches with real-time demand curves." },
      { title: "Allocation engine", detail: "Rules-based with regulator audit output." },
      { title: "Retail channel", detail: "Whitelabel mobile subscription for retail investors." },
      { title: "Stabilisation", detail: "Greenshoe and OAP operations tracked to the trade." },
      { title: "Post-listing analytics", detail: "Trading, coverage, and register dynamics." },
    ],
    benefits: [
      { kpi: "-55%", label: "time to list" },
      { kpi: "6", label: "IPOs supported" },
      { kpi: "USD 2.1B", label: "capital raised on platform" },
    ],
    architecture: ["Book-building engine", "Allocation rules DSL", "Regulator sandbox connectors", "Retail mobile channel"],
    screenshot: "https://images.pexels.com/photos/1381722/pexels-photo-1381722.jpeg",
  },
];

export const FUTURE_MODULES = [
  { slug: "docs-academy", icon: BookOpen, name: "Documentation & Academy", tagline: "Learn CCMI. Deploy CCMI.", description: "Interactive learning paths for developers, operators and regulators. Certifications, sandboxes and course-work built into the product." },
  { slug: "community-support", icon: MessageSquare, name: "Community & Support Center", tagline: "A shared knowledge base for the CCMI ecosystem.", description: "Ticketing, SLAs, community forums and expert marketplace for our client operations teams." },
  { slug: "marketplace-api", icon: Store, name: "Marketplace & API Docs", tagline: "A marketplace of ecosystem extensions.", description: "Third-party modules, connectors, data feeds. Rev-share model. Public REST/GraphQL reference and OAuth2 sandbox." },
  { slug: "client-investor-portals", icon: KeyRound, name: "Client & Investor Portals", tagline: "Segmented experiences for clients and their investors.", description: "Multi-tier authenticated portals with fine-grained data-room permissions and regulator-ready audit trails." },
];

export const getModule = (slug) => MODULES.find(m => m.slug === slug);
