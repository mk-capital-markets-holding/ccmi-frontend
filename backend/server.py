"""MK Capital Markets Technologies Ltd — Corporate Website Backend."""
from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional
import uuid
import secrets
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="MK Capital Markets Technologies API")
api_router = APIRouter(prefix="/api")


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


# ---------- Models ----------
class ContactSubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    form_type: str  # general | demo | investor | careers | partnership | support
    payload: dict
    created_at: str = Field(default_factory=now_iso)


class ContactCreate(BaseModel):
    form_type: str
    payload: dict


class NewsletterSubscribe(BaseModel):
    email: EmailStr
    language: Optional[str] = "en"


class InvestorAccessRequest(BaseModel):
    email: EmailStr
    full_name: str
    organization: str
    investor_type: str  # vc, family_office, angel, institutional
    ticket_size: str
    access_code: Optional[str] = None


class NDARequest(BaseModel):
    email: EmailStr
    full_name: str
    organization: str
    signed: bool = True


# ---------- Static seed content (mocked CMS) ----------
ARTICLES = [
    {
        "slug": "african-capital-markets-digital-shift",
        "category": "Africa",
        "category_fr": "Afrique",
        "tags": ["exchanges", "infrastructure", "liquidity"],
        "author": "Dr. Amina Diallo",
        "published_at": "2026-01-14",
        "read_minutes": 9,
        "cover": "https://images.pexels.com/photos/9301316/pexels-photo-9301316.jpeg",
        "i18n": {
            "en": {
                "title": "The Digital Shift Reshaping African Capital Markets",
                "excerpt": "How next-generation infrastructure is unlocking liquidity across 25+ frontier exchanges — from Nairobi to Casablanca.",
                "body": [
                    "Across the African continent, capital markets are undergoing a structural transformation. Between 2020 and 2025, the combined market capitalization of the 15 largest African exchanges grew by 47%, yet trading velocity remains a fraction of developed peers.",
                    "The bottleneck is rarely regulatory ambition — it is technology. Post-trade settlement cycles of T+3, fragmented investor registries, and manual corporate actions still define the operational reality for most issuers.",
                    "CCMI was purpose-built to compress these cycles. Our Investor Registry module has already helped a leading West African exchange collapse dividend distribution timelines from 45 days to under 72 hours.",
                    "The next decade belongs to markets that can offer institutional-grade infrastructure without the institutional-grade cost. Dubai's role as a technology hub for Africa is central to that thesis.",
                ],
            },
            "fr": {
                "title": "La Transformation Digitale des Marchés de Capitaux Africains",
                "excerpt": "Comment l'infrastructure nouvelle génération libère la liquidité sur plus de 25 bourses frontières — de Nairobi à Casablanca.",
                "body": [
                    "Sur l'ensemble du continent africain, les marchés de capitaux traversent une transformation structurelle. Entre 2020 et 2025, la capitalisation combinée des 15 plus grandes bourses africaines a progressé de 47 %, mais la vélocité de trading reste une fraction de celle des marchés développés.",
                    "Le goulot d'étranglement n'est presque jamais l'ambition réglementaire — c'est la technologie. Les cycles de règlement T+3, les registres d'investisseurs fragmentés et les opérations sur titres manuelles définissent encore la réalité opérationnelle de la plupart des émetteurs.",
                    "CCMI a été conçu spécifiquement pour compresser ces cycles. Notre module Registre des Investisseurs a déjà permis à une grande bourse d'Afrique de l'Ouest de ramener les délais de distribution de dividendes de 45 jours à moins de 72 heures.",
                    "La prochaine décennie appartient aux marchés capables d'offrir une infrastructure institutionnelle sans le coût institutionnel. Le rôle de Dubaï comme hub technologique pour l'Afrique est central dans cette thèse.",
                ],
            },
        },
    },
    {
        "slug": "ipo-readiness-emerging-markets",
        "category": "Capital Markets",
        "category_fr": "Marchés de Capitaux",
        "tags": ["ipo", "governance", "issuers"],
        "author": "Karim El-Sayed",
        "published_at": "2025-12-02",
        "read_minutes": 12,
        "cover": "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
        "i18n": {
            "en": {
                "title": "IPO Readiness in Emerging Markets: A Practical Framework",
                "excerpt": "A four-quarter blueprint for issuers preparing to list on frontier exchanges — governance, disclosures, roadshow.",
                "body": [
                    "Preparing an emerging-market issuer for a public listing is a 12-to-18 month exercise. It requires alignment across legal, financial, technology and investor-relations streams — and it is where most first-time issuers stall.",
                    "In this framework, we break down each quarter into concrete deliverables aligned with IOSCO principles and adapted for the operational realities of African, GCC and South-East Asian exchanges.",
                    "The CCMI IPO Hub module operationalises this framework end-to-end, from prospectus versioning to allocation and stabilisation.",
                ],
            },
            "fr": {
                "title": "Préparation à l'IPO sur les Marchés Émergents : un Framework Pratique",
                "excerpt": "Un plan sur quatre trimestres pour les émetteurs préparant une cotation sur les bourses frontières — gouvernance, divulgations, roadshow.",
                "body": [
                    "Préparer un émetteur de marché émergent à une cotation publique est un exercice de 12 à 18 mois. Il exige un alignement entre les flux juridique, financier, technologique et relations investisseurs — et c'est là que la plupart des émetteurs primo-cotants s'enlisent.",
                    "Dans ce framework, nous décomposons chaque trimestre en livrables concrets alignés sur les principes IOSCO et adaptés aux réalités opérationnelles des bourses africaines, du CCG et d'Asie du Sud-Est.",
                    "Le module CCMI IPO Hub opérationnalise ce framework de bout en bout, du versioning du prospectus à l'allocation et à la stabilisation.",
                ],
            },
        },
    },
    {
        "slug": "dubai-fintech-corridor-africa",
        "category": "Dubai",
        "category_fr": "Dubaï",
        "tags": ["difc", "hub", "fintech"],
        "author": "Layla Mansour",
        "published_at": "2025-11-18",
        "read_minutes": 7,
        "cover": "https://images.pexels.com/photos/1381722/pexels-photo-1381722.jpeg",
        "i18n": {
            "en": {
                "title": "Dubai — The Fintech Corridor to Africa",
                "excerpt": "Why the DIFC and ADGM are quietly becoming the launchpad for African capital-markets technology.",
                "body": [
                    "Regulatory clarity, capital density and time-zone proximity to both London and Nairobi make Dubai a natural corridor for African fintech.",
                    "MK Capital Markets Technologies operates from DIFC precisely because the ecosystem — from anchor investors to sandbox regulators — accelerates deployment across the continent.",
                ],
            },
            "fr": {
                "title": "Dubaï — Le Corridor Fintech vers l'Afrique",
                "excerpt": "Pourquoi le DIFC et l'ADGM deviennent discrètement la rampe de lancement de la technologie des marchés de capitaux africains.",
                "body": [
                    "Clarté réglementaire, densité de capital et proximité horaire avec Londres comme avec Nairobi font de Dubaï un corridor naturel pour la fintech africaine.",
                    "MK Capital Markets Technologies opère depuis le DIFC précisément parce que l'écosystème — des investisseurs de référence aux régulateurs sandbox — accélère le déploiement sur tout le continent.",
                ],
            },
        },
    },
    {
        "slug": "corporate-governance-post-trade",
        "category": "Product",
        "category_fr": "Produit",
        "tags": ["governance", "post-trade"],
        "author": "Nadia Okafor",
        "published_at": "2025-10-27",
        "read_minutes": 8,
        "cover": "https://images.pexels.com/photos/22065462/pexels-photo-22065462.jpeg",
        "i18n": {
            "en": {
                "title": "Corporate Governance is a Post-Trade Problem",
                "excerpt": "Reframing governance as an operational infrastructure question, not a policy one.",
                "body": [
                    "Governance frameworks fail not because rules are missing, but because the operational plumbing to enforce them in real time does not exist.",
                    "CCMI's Corporate Governance module treats shareholder rights, voting, and disclosures as first-class events on a unified ledger.",
                ],
            },
            "fr": {
                "title": "La Gouvernance d'Entreprise est un Problème Post-Marché",
                "excerpt": "Repenser la gouvernance comme une question d'infrastructure opérationnelle, non de politique.",
                "body": [
                    "Les frameworks de gouvernance échouent non pas par manque de règles, mais parce que la plomberie opérationnelle pour les appliquer en temps réel n'existe pas.",
                    "Le module Gouvernance d'Entreprise de CCMI traite les droits des actionnaires, les votes et les divulgations comme des événements de premier ordre sur un registre unifié.",
                ],
            },
        },
    },
    {
        "slug": "cloud-native-exchange-infrastructure",
        "category": "Technology",
        "category_fr": "Technologie",
        "tags": ["azure", "architecture", "kubernetes"],
        "author": "Rashid Al-Farsi",
        "published_at": "2025-09-30",
        "read_minutes": 11,
        "cover": "https://images.pexels.com/photos/14365249/pexels-photo-14365249.jpeg",
        "i18n": {
            "en": {
                "title": "Building Cloud-Native Exchange Infrastructure on Azure",
                "excerpt": "Architectural notes from deploying CCMI across three regulatory jurisdictions in under 12 months.",
                "body": [
                    "Cloud-native is not about lift-and-shift. For regulated capital-markets workloads it is a rearchitecture: event-sourced ledgers, per-tenant isolation, deterministic replay.",
                    "This piece walks through the Azure reference architecture we deploy: AKS with regional failover, Cosmos DB for multi-master consistency, Azure Confidential Computing for sensitive workloads.",
                ],
            },
            "fr": {
                "title": "Construire une Infrastructure Bourse Cloud-Native sur Azure",
                "excerpt": "Notes d'architecture après le déploiement de CCMI dans trois juridictions réglementaires en moins de 12 mois.",
                "body": [
                    "Le cloud-natif n'est pas un simple lift-and-shift. Pour les workloads régulés des marchés de capitaux, c'est une réarchitecture : registres event-sourced, isolation par tenant, replay déterministe.",
                    "Cet article parcourt l'architecture de référence Azure que nous déployons : AKS avec bascule régionale, Cosmos DB pour la cohérence multi-master, Azure Confidential Computing pour les workloads sensibles.",
                ],
            },
        },
    },
    {
        "slug": "series-a-fundraise-vision",
        "category": "Company",
        "category_fr": "Société",
        "tags": ["fundraising", "vision"],
        "author": "Malik Kamara",
        "published_at": "2025-09-05",
        "read_minutes": 6,
        "cover": "https://images.pexels.com/photos/30688593/pexels-photo-30688593.jpeg",
        "i18n": {
            "en": {
                "title": "Our Series A: Building the Capital-Markets Operating System for Africa",
                "excerpt": "A note from our founder on the raise, the roadmap, and why now.",
                "body": [
                    "Today we are announcing our USD 18M Series A, led by a consortium of Gulf sovereign vehicles and pan-African growth funds.",
                    "The capital will accelerate the deployment of CCMI across three new African exchanges by end of 2026, and expand our Dubai engineering team by 42 roles.",
                ],
            },
            "fr": {
                "title": "Notre Série A : Bâtir le Système d'Exploitation des Marchés de Capitaux Africains",
                "excerpt": "Un mot de notre fondateur sur la levée, la roadmap et pourquoi maintenant.",
                "body": [
                    "Nous annonçons aujourd'hui notre Série A de 18 M USD, menée par un consortium de véhicules souverains du Golfe et de fonds de croissance pan-africains.",
                    "Ce capital accélérera le déploiement de CCMI sur trois nouvelles bourses africaines d'ici fin 2026 et l'expansion de notre équipe ingénierie à Dubaï de 42 postes.",
                ],
            },
        },
    },
]


def _localize_article(a: dict, lang: str) -> dict:
    """Merge the requested locale onto the base article dict."""
    loc = a.get("i18n", {}).get(lang) or a.get("i18n", {}).get("en") or {}
    out = {k: v for k, v in a.items() if k != "i18n"}
    if lang == "fr" and a.get("category_fr"):
        out["category"] = a["category_fr"]
    out.update(loc)
    return out


# ---------- Contact / Forms ----------
@api_router.post("/contact")
async def submit_contact(input: ContactCreate):
    allowed = {"general", "demo", "investor", "careers", "partnership", "support"}
    if input.form_type not in allowed:
        raise HTTPException(status_code=400, detail="Invalid form_type")
    submission = ContactSubmission(form_type=input.form_type, payload=input.payload)
    await db.contact_submissions.insert_one(submission.model_dump())
    return {"ok": True, "id": submission.id, "message": "Submission received. Our team will respond within 1 business day."}


@api_router.get("/contact/count")
async def contact_count():
    total = await db.contact_submissions.count_documents({})
    return {"total": total}


# ---------- Newsletter ----------
@api_router.post("/newsletter/subscribe")
async def newsletter_subscribe(input: NewsletterSubscribe):
    doc = {
        "id": str(uuid.uuid4()),
        "email": input.email,
        "language": input.language,
        "created_at": now_iso(),
        "confirmed": False,
    }
    await db.newsletter_subs.update_one(
        {"email": input.email}, {"$set": doc}, upsert=True
    )
    return {"ok": True, "message": "Please check your inbox to confirm your subscription."}


# ---------- Articles ----------
@api_router.get("/articles")
async def list_articles(category: Optional[str] = None, q: Optional[str] = None, limit: int = 20, lang: str = "en"):
    items = [_localize_article(a, lang) for a in ARTICLES]
    if category and category.lower() != "all" and category.lower() not in ("toutes", "tous"):
        items = [a for a in items if a["category"].lower() == category.lower()]
    if q:
        ql = q.lower()
        items = [a for a in items if ql in a["title"].lower() or ql in a["excerpt"].lower() or any(ql in t for t in a["tags"])]
    return {"items": items[:limit], "total": len(items)}


@api_router.get("/articles/{slug}")
async def get_article(slug: str, lang: str = "en"):
    for a in ARTICLES:
        if a["slug"] == slug:
            return _localize_article(a, lang)
    raise HTTPException(status_code=404, detail="Article not found")


# ---------- Global Search ----------
SEARCHABLE = [
    {"type": "solution", "path": "/solutions/investor-registry", "title": {"en": "Investor Registry", "fr": "Registre des Investisseurs"}, "excerpt": {"en": "Unified shareholder ledger with real-time corporate actions.", "fr": "Registre actionnaires unifié avec opérations sur titres en temps réel."}},
    {"type": "solution", "path": "/solutions/corporate-governance", "title": {"en": "Corporate Governance", "fr": "Gouvernance d'Entreprise"}, "excerpt": {"en": "Voting, disclosures and board workflows on a single ledger.", "fr": "Votes, divulgations et workflows conseil sur un registre unique."}},
    {"type": "solution", "path": "/solutions/campaign-workspace", "title": {"en": "Campaign Workspace", "fr": "Atelier de Campagnes"}, "excerpt": {"en": "Multi-channel investor campaigns with regulatory guardrails.", "fr": "Campagnes investisseurs multi-canal avec garde-fous réglementaires."}},
    {"type": "solution", "path": "/solutions/financial-engineering", "title": {"en": "Financial Engineering", "fr": "Ingénierie Financière"}, "excerpt": {"en": "Structured products design, pricing and lifecycle management.", "fr": "Conception, pricing et gestion du cycle de vie des produits structurés."}},
    {"type": "solution", "path": "/solutions/investor-portal", "title": {"en": "Investor Portal", "fr": "Portail Investisseur"}, "excerpt": {"en": "White-label investor experience across web and mobile.", "fr": "Expérience investisseur en marque blanche, web et mobile."}},
    {"type": "solution", "path": "/solutions/ipo-hub", "title": {"en": "IPO Hub", "fr": "IPO Hub"}, "excerpt": {"en": "End-to-end IPO orchestration from prospectus to allocation.", "fr": "Orchestration IPO de bout en bout, du prospectus à l'allocation."}},
    {"type": "industry", "path": "/industries/exchanges", "title": {"en": "Exchanges", "fr": "Bourses & Plateformes"}, "excerpt": {"en": "Modernise matching, post-trade and market data.", "fr": "Modernisez l'appariement, le post-marché et le market data."}},
    {"type": "industry", "path": "/industries/regulators", "title": {"en": "Regulators", "fr": "Régulateurs"}, "excerpt": {"en": "Supervisory data-lakes and market-abuse detection.", "fr": "Data-lakes supervisoires et détection d'abus de marché."}},
    {"type": "industry", "path": "/industries/banks", "title": {"en": "Banks", "fr": "Banques"}, "excerpt": {"en": "Capital-markets desks and custody operations.", "fr": "Desks marchés de capitaux et opérations custody."}},
    {"type": "industry", "path": "/industries/brokers", "title": {"en": "Brokers", "fr": "Sociétés de Courtage"}, "excerpt": {"en": "Multi-asset order management and client onboarding.", "fr": "Gestion d'ordres multi-actifs et onboarding client."}},
    {"type": "industry", "path": "/industries/asset-managers", "title": {"en": "Asset Managers", "fr": "Gestionnaires d'Actifs"}, "excerpt": {"en": "Fund administration, NAV, investor relations.", "fr": "Administration de fonds, VNI, relations investisseurs."}},
    {"type": "industry", "path": "/industries/issuers", "title": {"en": "Issuers", "fr": "Émetteurs"}, "excerpt": {"en": "IR, disclosures, corporate actions.", "fr": "IR, divulgations, opérations sur titres."}},
    {"type": "industry", "path": "/industries/investors", "title": {"en": "Investors", "fr": "Investisseurs"}, "excerpt": {"en": "Institutional workflows and reporting.", "fr": "Workflows institutionnels et reporting."}},
    {"type": "page", "path": "/about", "title": {"en": "About MK Capital Markets Technologies", "fr": "À propos de MK Capital Markets Technologies"}, "excerpt": {"en": "Dubai-based fintech serving African capital markets.", "fr": "Fintech basée à Dubaï au service des marchés de capitaux africains."}},
    {"type": "page", "path": "/technology", "title": {"en": "Technology Platform", "fr": "Plateforme Technologique"}, "excerpt": {"en": "Cloud-native architecture on Microsoft Azure.", "fr": "Architecture cloud-native sur Microsoft Azure."}},
    {"type": "page", "path": "/investors", "title": {"en": "Investors", "fr": "Investisseurs"}, "excerpt": {"en": "Fundraising, data room, executive access.", "fr": "Levée de fonds, data room, accès équipe dirigeante."}},
    {"type": "page", "path": "/founder", "title": {"en": "Founder", "fr": "Fondateur"}, "excerpt": {"en": "Malik Kamara — CFA, FRM. 22 years across capital markets.", "fr": "Malik Kamara — CFA, FRM. 22 ans dans les marchés de capitaux."}},
]


def _pick(field, lang: str) -> str:
    if isinstance(field, dict):
        return field.get(lang) or field.get("en") or ""
    return field or ""


@api_router.get("/search")
async def search(q: str = "", lang: str = "en"):
    if not q or len(q) < 2:
        return {"items": [], "groups": {}}
    ql = q.lower()
    results = []
    for it in SEARCHABLE:
        title = _pick(it["title"], lang)
        excerpt = _pick(it["excerpt"], lang)
        # Also match the other language so switching lang doesn't hide results
        alt_title = _pick(it["title"], "en" if lang == "fr" else "fr")
        if ql in title.lower() or ql in excerpt.lower() or ql in alt_title.lower():
            results.append({"type": it["type"], "title": title, "path": it["path"], "excerpt": excerpt})
    for a in ARTICLES:
        loc = a.get("i18n", {}).get(lang) or a.get("i18n", {}).get("en") or {}
        title = loc.get("title", "")
        excerpt = loc.get("excerpt", "")
        alt = a.get("i18n", {}).get("en" if lang == "fr" else "fr") or {}
        if ql in title.lower() or ql in excerpt.lower() or ql in (alt.get("title", "").lower()):
            results.append({"type": "article", "title": title, "path": f"/insights/{a['slug']}", "excerpt": excerpt})
    groups = {}
    for r in results:
        groups.setdefault(r["type"], []).append(r)
    return {"items": results[:20], "groups": groups}


# ---------- Investor Data Room (simulated auth) ----------
@api_router.post("/investors/access")
async def investor_access(input: InvestorAccessRequest):
    """Simulated NDA + verification flow. Returns a session token that unlocks gated docs."""
    # Access code that grants immediate access (demo mode)
    demo_codes = {"MKCMT2026", "INVESTOR-DEMO", "DUBAI"}
    if input.access_code and input.access_code.strip().upper() in demo_codes:
        token = secrets.token_urlsafe(24)
        await db.investor_sessions.insert_one({
            "id": str(uuid.uuid4()),
            "token": token,
            "email": input.email,
            "full_name": input.full_name,
            "organization": input.organization,
            "investor_type": input.investor_type,
            "ticket_size": input.ticket_size,
            "created_at": now_iso(),
        })
        return {"status": "granted", "token": token, "message": "Access granted. You can now download the pitch deck and financial projections."}
    # Otherwise create a pending request
    await db.investor_requests.insert_one({
        "id": str(uuid.uuid4()),
        "email": input.email,
        "full_name": input.full_name,
        "organization": input.organization,
        "investor_type": input.investor_type,
        "ticket_size": input.ticket_size,
        "created_at": now_iso(),
        "status": "pending",
    })
    return {"status": "pending", "message": "Thank you. Your access request is under review. Our investor relations team will contact you within 24 hours."}


@api_router.post("/investors/verify")
async def investor_verify(token: str):
    session = await db.investor_sessions.find_one({"token": token}, {"_id": 0})
    if not session:
        raise HTTPException(status_code=401, detail="Invalid or expired session")
    return {"ok": True, "session": session}


@api_router.post("/investors/nda")
async def investor_nda(input: NDARequest):
    doc = {
        "id": str(uuid.uuid4()),
        "email": input.email,
        "full_name": input.full_name,
        "organization": input.organization,
        "signed": input.signed,
        "signed_at": now_iso(),
    }
    await db.nda_requests.insert_one(doc)
    return {"ok": True, "id": doc["id"], "message": "NDA registered. A signed copy has been sent to your email."}


# ---------- Site metadata ----------
@api_router.get("/site/stats")
async def site_stats():
    return {
        "aum_supported_usd_bn": 42,
        "exchanges_deployed": 6,
        "investors_managed": 1240000,
        "countries": 14,
        "uptime_sla": 99.97,
        "team_size": 78,
    }


@api_router.get("/")
async def root():
    return {"service": "MK Capital Markets Technologies API", "status": "ok"}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
