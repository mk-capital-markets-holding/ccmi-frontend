"""
Comprehensive backend API tests for MK Capital Markets Technologies (CCMI) corporate site.
Covers: root, site stats, articles (list/filter/search/detail/404), global search,
contact forms (all types + invalid), newsletter (valid + upsert + invalid),
investor access (demo codes + pending), NDA.
"""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://ccmi-capital-tech.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def s():
    sess = requests.Session()
    sess.headers.update({"Content-Type": "application/json"})
    return sess


# ---------- Root / health ----------
class TestRoot:
    def test_root_status_ok(self, s):
        r = s.get(f"{API}/")
        assert r.status_code == 200
        data = r.json()
        assert data.get("status") == "ok"
        assert "service" in data


# ---------- Site stats ----------
class TestSiteStats:
    def test_site_stats_numeric_fields(self, s):
        r = s.get(f"{API}/site/stats")
        assert r.status_code == 200
        d = r.json()
        for key in ["aum_supported_usd_bn", "exchanges_deployed", "investors_managed",
                    "countries", "uptime_sla", "team_size"]:
            assert key in d, f"missing {key}"
            assert isinstance(d[key], (int, float)), f"{key} not numeric"


# ---------- Articles ----------
class TestArticles:
    def test_list_articles_default(self, s):
        r = s.get(f"{API}/articles?limit=10")
        assert r.status_code == 200
        d = r.json()
        assert "items" in d
        assert len(d["items"]) == 6, f"expected 6 seeded articles, got {len(d['items'])}"
        required = {"slug", "title", "excerpt", "category", "tags", "author",
                    "published_at", "read_minutes", "cover", "body"}
        for a in d["items"]:
            missing = required - set(a.keys())
            assert not missing, f"missing fields {missing} in article {a.get('slug')}"
            assert isinstance(a["body"], list)
            assert isinstance(a["tags"], list)

    def test_list_articles_filter_by_category_africa(self, s):
        r = s.get(f"{API}/articles?category=Africa")
        assert r.status_code == 200
        items = r.json()["items"]
        assert len(items) >= 1
        for a in items:
            assert a["category"].lower() == "africa"

    def test_list_articles_search_q(self, s):
        r = s.get(f"{API}/articles?q=african")
        assert r.status_code == 200
        items = r.json()["items"]
        assert len(items) >= 1
        # ensure the seed article is present
        slugs = [a["slug"] for a in items]
        assert "african-capital-markets-digital-shift" in slugs

    def test_get_article_by_slug(self, s):
        r = s.get(f"{API}/articles/african-capital-markets-digital-shift")
        assert r.status_code == 200
        a = r.json()
        assert a["slug"] == "african-capital-markets-digital-shift"
        assert isinstance(a["body"], list) and len(a["body"]) > 0
        assert a["title"]

    def test_get_article_not_found(self, s):
        r = s.get(f"{API}/articles/does-not-exist")
        assert r.status_code == 404


# ---------- Global search ----------
class TestSearch:
    def test_search_investor(self, s):
        r = s.get(f"{API}/search?q=investor")
        assert r.status_code == 200
        d = r.json()
        assert "groups" in d and "items" in d
        assert len(d["items"]) > 0
        # expect at least some of these group keys
        keys = set(d["groups"].keys())
        # solution/industry/page/article are possible types
        assert keys & {"solution", "industry", "page", "article"}, f"got groups={keys}"

    def test_search_min_length(self, s):
        r = s.get(f"{API}/search?q=x")
        assert r.status_code == 200
        d = r.json()
        assert d["items"] == []
        assert d["groups"] == {}


# ---------- Contact forms ----------
class TestContact:
    def test_contact_demo_form(self, s):
        payload = {
            "form_type": "demo",
            "payload": {
                "institution": "Nairobi Securities Exchange",
                "country": "Kenya",
                "sector": "Exchange",
                "company": "NSE",
                "name": "TEST_John Doe",
                "email": "test_demo@example.com",
                "modules": ["Investor Registry", "IPO Hub"],
            },
        }
        r = s.post(f"{API}/contact", json=payload)
        assert r.status_code == 200
        d = r.json()
        assert d.get("ok") is True
        assert "id" in d and isinstance(d["id"], str) and len(d["id"]) > 0

    def test_contact_invalid_form_type(self, s):
        r = s.post(f"{API}/contact", json={"form_type": "xyz", "payload": {}})
        assert r.status_code == 400

    @pytest.mark.parametrize("form_type", ["general", "demo", "investor", "careers", "partnership", "support"])
    def test_contact_each_form_type(self, s, form_type):
        payload = {
            "form_type": form_type,
            "payload": {"name": f"TEST_{form_type}", "email": f"test_{form_type}@example.com", "message": "hello"},
        }
        r = s.post(f"{API}/contact", json=payload)
        assert r.status_code == 200, f"{form_type} failed: {r.text}"
        d = r.json()
        assert d.get("ok") is True
        assert "id" in d


# ---------- Newsletter ----------
class TestNewsletter:
    def test_subscribe_valid_fr(self, s):
        payload = {"email": "test_news_fr@example.com", "language": "fr"}
        r = s.post(f"{API}/newsletter/subscribe", json=payload)
        assert r.status_code == 200
        assert r.json().get("ok") is True

    def test_subscribe_upsert_same_email(self, s):
        payload = {"email": "test_news_upsert@example.com", "language": "en"}
        r1 = s.post(f"{API}/newsletter/subscribe", json=payload)
        assert r1.status_code == 200
        r2 = s.post(f"{API}/newsletter/subscribe", json=payload)
        assert r2.status_code == 200
        assert r2.json().get("ok") is True

    def test_subscribe_invalid_email(self, s):
        r = s.post(f"{API}/newsletter/subscribe", json={"email": "notanemail", "language": "en"})
        assert r.status_code == 422


# ---------- Investor access ----------
class TestInvestorAccess:
    base_payload = {
        "email": "test_investor@example.com",
        "full_name": "TEST_Investor",
        "organization": "TEST_Fund",
        "investor_type": "vc",
        "ticket_size": "1M-5M",
    }

    def test_access_code_mkcmt2026_grants(self, s):
        payload = {**self.base_payload, "access_code": "MKCMT2026"}
        r = s.post(f"{API}/investors/access", json=payload)
        assert r.status_code == 200
        d = r.json()
        assert d.get("status") == "granted"
        assert isinstance(d.get("token"), str) and len(d["token"]) > 0

    def test_access_code_investor_demo_grants(self, s):
        payload = {**self.base_payload, "access_code": "INVESTOR-DEMO"}
        r = s.post(f"{API}/investors/access", json=payload)
        assert r.status_code == 200
        d = r.json()
        assert d.get("status") == "granted"
        assert "token" in d and d["token"]

    def test_access_without_code_pending(self, s):
        r = s.post(f"{API}/investors/access", json=self.base_payload)
        assert r.status_code == 200
        d = r.json()
        assert d.get("status") == "pending"
        assert "message" in d


# ---------- NDA ----------
class TestNDA:
    def test_nda_ok(self, s):
        payload = {
            "email": "test_nda@example.com",
            "full_name": "TEST_NDA Signer",
            "organization": "TEST_Org",
            "signed": True,
        }
        r = s.post(f"{API}/investors/nda", json=payload)
        assert r.status_code == 200
        d = r.json()
        assert d.get("ok") is True
        assert "id" in d and d["id"]
