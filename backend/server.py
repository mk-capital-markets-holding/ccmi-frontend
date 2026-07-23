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
        "title": "The Digital Shift Reshaping African Capital Markets",
        "excerpt": "How next-generation infrastructure is unlocking liquidity across 25+ frontier exchanges — from Nairobi to Casablanca.",
        "category": "Africa",
        "tags": ["exchanges", "infrastructure", "liquidity"],
        "author": "Dr. Amina Diallo",
        "published_at": "2026-01-14",
        "read_minutes": 9,
        "cover": "https://images.pexels.com/photos/9301316/pexels-photo-9301316.jpeg",
        "body": [
            "Across the African continent, capital markets are undergoing a structural transformation. Between 2020 and 2025, the combined market capitalization of the 15 largest African exchanges grew by 47%, yet trading velocity remains a fraction of developed peers.",
            "The bottleneck is rarely regulatory ambition — it is technology. Post-trade settlement cycles of T+3, fragmented investor registries, and manual corporate actions still define the operational reality for most issuers.",
            "CCMI was purpose-built to compress these cycles. Our Investor Registry module has already helped a leading West African exchange collapse dividend distribution timelines from 45 days to under 72 hours.",
            "The next decade belongs to markets that can offer institutional-grade infrastructure without the institutional-grade cost. Dubai's role as a technology hub for Africa is central to that thesis."
        ]
    },
    {
        "slug": "ipo-readiness-emerging-markets",
        "title": "IPO Readiness in Emerging Markets: A Practical Framework",
        "excerpt": "A four-quarter blueprint for issuers preparing to list on frontier exchanges — governance, disclosures, roadshow.",
        "category": "Capital Markets",
        "tags": ["ipo", "governance", "issuers"],
        "author": "Karim El-Sayed",
        "published_at": "2025-12-02",
        "read_minutes": 12,
        "cover": "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
        "body": [
            "Preparing an emerging-market issuer for a public listing is a 12-to-18 month exercise. It requires alignment across legal, financial, technology and investor-relations streams — and it is where most first-time issuers stall.",
            "In this framework, we break down each quarter into concrete deliverables aligned with IOSCO principles and adapted for the operational realities of African, GCC and South-East Asian exchanges.",
            "The CCMI IPO Hub module operationalises this framework end-to-end, from prospectus versioning to allocation and stabilisation."
        ]
    },
    {
        "slug": "dubai-fintech-corridor-africa",
        "title": "Dubai — The Fintech Corridor to Africa",
        "excerpt": "Why the DIFC and ADGM are quietly becoming the launchpad for African capital-markets technology.",
        "category": "Dubai",
        "tags": ["difc", "hub", "fintech"],
        "author": "Layla Mansour",
        "published_at": "2025-11-18",
        "read_minutes": 7,
        "cover": "https://images.pexels.com/photos/1381722/pexels-photo-1381722.jpeg",
        "body": [
            "Regulatory clarity, capital density and time-zone proximity to both London and Nairobi make Dubai a natural corridor for African fintech.",
            "MK Capital Markets Technologies operates from DIFC precisely because the ecosystem — from anchor investors to sandbox regulators — accelerates deployment across the continent."
        ]
    },
    {
        "slug": "corporate-governance-post-trade",
        "title": "Corporate Governance is a Post-Trade Problem",
        "excerpt": "Reframing governance as an operational infrastructure question, not a policy one.",
        "category": "Produit",
        "tags": ["governance", "post-trade"],
        "author": "Nadia Okafor",
        "published_at": "2025-10-27",
        "read_minutes": 8,
        "cover": "https://images.pexels.com/photos/22065462/pexels-photo-22065462.jpeg",
        "body": [
            "Governance frameworks fail not because rules are missing, but because the operational plumbing to enforce them in real time does not exist.",
            "CCMI's Corporate Governance module treats shareholder rights, voting, and disclosures as first-class events on a unified ledger."
        ]
    },
    {
        "slug": "cloud-native-exchange-infrastructure",
        "title": "Building Cloud-Native Exchange Infrastructure on Azure",
        "excerpt": "Architectural notes from deploying CCMI across three regulatory jurisdictions in under 12 months.",
        "category": "Technologie",
        "tags": ["azure", "architecture", "kubernetes"],
        "author": "Rashid Al-Farsi",
        "published_at": "2025-09-30",
        "read_minutes": 11,
        "cover": "https://images.pexels.com/photos/14365249/pexels-photo-14365249.jpeg",
        "body": [
            "Cloud-native is not about lift-and-shift. For regulated capital-markets workloads it is a rearchitecture: event-sourced ledgers, per-tenant isolation, deterministic replay.",
            "This piece walks through the Azure reference architecture we deploy: AKS with regional failover, Cosmos DB for multi-master consistency, Azure Confidential Computing for sensitive workloads."
        ]
    },
    {
        "slug": "series-a-fundraise-vision",
        "title": "Our Series A: Building the Capital-Markets Operating System for Africa",
        "excerpt": "A note from our founder on the raise, the roadmap, and why now.",
        "category": "Société",
        "tags": ["fundraising", "vision"],
        "author": "Malik Kamara",
        "published_at": "2025-09-05",
        "read_minutes": 6,
        "cover": "https://images.pexels.com/photos/30688593/pexels-photo-30688593.jpeg",
        "body": [
            "Today we are announcing our USD 18M Series A, led by a consortium of Gulf sovereign vehicles and pan-African growth funds.",
            "The capital will accelerate the deployment of CCMI across three new African exchanges by end of 2026, and expand our Dubai engineering team by 42 roles."
        ]
    }
]


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
async def list_articles(category: Optional[str] = None, q: Optional[str] = None, limit: int = 20):
    items = ARTICLES
    if category and category.lower() != "all":
        items = [a for a in items if a["category"].lower() == category.lower()]
    if q:
        ql = q.lower()
        items = [a for a in items if ql in a["title"].lower() or ql in a["excerpt"].lower() or any(ql in t for t in a["tags"])]
    return {"items": items[:limit], "total": len(items)}


@api_router.get("/articles/{slug}")
async def get_article(slug: str):
    for a in ARTICLES:
        if a["slug"] == slug:
            return a
    raise HTTPException(status_code=404, detail="Article not found")


# ---------- Global Search ----------
SEARCHABLE = [
    {"type": "solution", "title": "Investor Registry", "path": "/solutions/investor-registry", "excerpt": "Unified shareholder ledger with real-time corporate actions."},
    {"type": "solution", "title": "Corporate Governance", "path": "/solutions/corporate-governance", "excerpt": "Voting, disclosures and board workflows on a single ledger."},
    {"type": "solution", "title": "Campaign Workspace", "path": "/solutions/campaign-workspace", "excerpt": "Multi-channel investor campaigns with regulatory guardrails."},
    {"type": "solution", "title": "Financial Engineering", "path": "/solutions/financial-engineering", "excerpt": "Structured products design, pricing and lifecycle management."},
    {"type": "solution", "title": "Investor Portal", "path": "/solutions/investor-portal", "excerpt": "White-label investor experience across web and mobile."},
    {"type": "solution", "title": "IPO Hub", "path": "/solutions/ipo-hub", "excerpt": "End-to-end IPO orchestration from prospectus to allocation."},
    {"type": "industry", "title": "Exchanges", "path": "/industries/exchanges", "excerpt": "Modernise matching, post-trade and market data."},
    {"type": "industry", "title": "Regulators", "path": "/industries/regulators", "excerpt": "Supervisory data-lakes and market-abuse detection."},
    {"type": "industry", "title": "Banks", "path": "/industries/banks", "excerpt": "Capital-markets desks and custody operations."},
    {"type": "industry", "title": "Brokers", "path": "/industries/brokers", "excerpt": "Multi-asset order management and client onboarding."},
    {"type": "industry", "title": "Asset Managers", "path": "/industries/asset-managers", "excerpt": "Fund administration, NAV, investor relations."},
    {"type": "industry", "title": "Issuers", "path": "/industries/issuers", "excerpt": "IR, disclosures, corporate actions."},
    {"type": "industry", "title": "Investors", "path": "/industries/investors", "excerpt": "Institutional workflows and reporting."},
    {"type": "page", "title": "About MK Capital Markets Technologies", "path": "/about", "excerpt": "Dubai-based fintech serving African capital markets."},
    {"type": "page", "title": "Technology Platform", "path": "/technology", "excerpt": "Cloud-native architecture on Microsoft Azure."},
    {"type": "page", "title": "Investors", "path": "/investors", "excerpt": "Fundraising, data room, executive access."},
    {"type": "page", "title": "Founder", "path": "/founder", "excerpt": "Malik Kamara — CFA, FRM. 22 years across capital markets."},
]


@api_router.get("/search")
async def search(q: str = ""):
    if not q or len(q) < 2:
        return {"items": [], "groups": {}}
    ql = q.lower()
    results = []
    for it in SEARCHABLE:
        if ql in it["title"].lower() or ql in it["excerpt"].lower():
            results.append(it)
    for a in ARTICLES:
        if ql in a["title"].lower() or ql in a["excerpt"].lower():
            results.append({"type": "article", "title": a["title"], "path": f"/insights/{a['slug']}", "excerpt": a["excerpt"]})
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
