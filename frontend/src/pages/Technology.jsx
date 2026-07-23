import React from "react";
import { Cloud, ShieldCheck, Layers, Plug, GitBranch } from "lucide-react";
import SEO from "@/components/common/SEO";
import Breadcrumbs from "@/components/common/Breadcrumbs";

const PILLARS = [
  { icon: Cloud, title: "Cloud Native", tagline: "Auto-scaling, multi-region, disaster recovery.", details: ["Deployed on Microsoft Azure across 3 regions", "Active-active with sub-second failover", "99.97% uptime SLA, penalty-backed", "Automated blue/green deployments"] },
  { icon: ShieldCheck, title: "Enterprise Security", tagline: "Zero-trust from the ground up.", details: ["Cloudflare WAF at the edge with rate-limits", "TLS 1.3 everywhere, AES-256 at rest", "RBAC + SoD, MFA mandatory for privileged access", "Comprehensive audit logs, tamper-evident"] },
  { icon: Layers, title: "Scalability", tagline: "From 10k to 10M investors — same platform.", details: ["Microservices with Docker + Kubernetes (AKS)", "Event-driven with Kafka streams", "Per-tenant sharding for regulated isolation", "Horizontal scale tested to 40M shareholders"] },
  { icon: Plug, title: "APIs & Integrations", tagline: "REST OpenAPI 3.0 · webhooks · SDK.", details: ["Documented REST + GraphQL BFF", "Webhook events with signed payloads", "SDKs in TypeScript, Python, Go", "Core-banking connectors (Temenos, Finacle, Flexcube)"] },
  { icon: GitBranch, title: "CI/CD & Reliability", tagline: "Ship regulator-grade every day.", details: ["Trunk-based development with 3-reviewer gates", "Automated compliance scanning on every PR", "Blue/green + canary deployments", "Rollback SLO under 4 minutes"] },
];

export default function Technology() {
  return (
    <>
      <SEO title="Technology — Cloud-native architecture on Azure" description="CCMI is a cloud-native platform built on Microsoft Azure. Five pillars: cloud native, security, scalability, APIs, CI/CD." path="/technology" />

      <section className="bg-mk-ink text-white pt-20 pb-24 mk-grain">
        <div className="container-mk">
          <Breadcrumbs items={[{ label: "Technology" }]} />
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8">
              <div className="overline mb-4">Platform architecture</div>
              <h1 className="font-serif text-5xl md:text-7xl leading-[1.02]">Engineered as if a regulator would review our source code tomorrow.</h1>
            </div>
            <div className="lg:col-span-4 text-white/70 lg:pt-4"><p>CCMI runs on a modern cloud-native stack: React/Next.js frontends, a FastAPI service mesh, event-sourced ledgers on PostgreSQL and Cosmos DB, deployed to Azure AKS across three regions.</p></div>
          </div>
        </div>
      </section>

      <section className="bg-mk-paper py-24" data-testid="tech-pillars">
        <div className="container-mk space-y-16">
          {PILLARS.map((p, i) => (
            <article key={p.title} className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-16 ${i < PILLARS.length - 1 ? "border-b border-mk-line/15" : ""}`}>
              <div className="lg:col-span-1 font-mono text-mk-bronze2 text-sm">P{i + 1}</div>
              <div className="lg:col-span-4">
                <p.icon className="w-8 h-8 text-mk-bronze mb-4" strokeWidth={1.5} />
                <h2 className="font-serif text-3xl md:text-4xl leading-tight">{p.title}</h2>
                <div className="text-mk-bronze2 uppercase tracking-widest text-sm mt-2">{p.tagline}</div>
              </div>
              <ul className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
                {p.details.map(d => (
                  <li key={d} className="border-l-2 border-mk-bronze/40 pl-4 text-mk-text py-1">{d}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-mk-ink text-white py-24 mk-grain">
        <div className="container-mk">
          <div className="overline mb-3">Reference architecture</div>
          <h2 className="font-serif text-4xl md:text-5xl mb-14 max-w-3xl">A single diagram, five layers.</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-px bg-white/10 border border-white/10 font-mono text-sm">
            {[
              { l: "Edge", d: "Cloudflare · WAF · CDN · Bot" },
              { l: "Frontend", d: "React · Next.js · SSR/SSG · TS" },
              { l: "Services", d: "FastAPI · gRPC · REST · Kafka" },
              { l: "State", d: "PostgreSQL · Cosmos DB · Event store" },
              { l: "Platform", d: "AKS · Azure DevOps · Terraform" },
            ].map((x, i) => (
              <div key={x.l} className="bg-mk-ink p-6"><div className="text-mk-bronze text-xs">L{i + 1}</div><div className="mt-2 text-white text-lg font-serif not-italic">{x.l}</div><div className="mt-2 text-white/60 text-xs">{x.d}</div></div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
