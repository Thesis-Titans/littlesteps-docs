#!/usr/bin/env python3
"""Generate crisp SVG and 300-dpi-equivalent PNG diagrams for CIT 210 System Documentation.

Run:   python3 docs/academic/cit210/data/make_figures.py
Uses:  Python 3 standard library + headless Linux Chrome (with ImageMagick fallback).
"""

import glob
import os
import shutil
import subprocess
import tempfile
from html import escape

HERE = os.path.dirname(os.path.abspath(__file__))
CIT210 = os.path.dirname(HERE)
OUT = os.path.join(CIT210, "figures")

FONT = 'Arial, "Liberation Sans", "DejaVu Sans", sans-serif'
# LittleSteps visual palette aligned with docs/DESIGN.md
FOREST = "#2D5A3D"
FOREST_DARK = "#1E3F2B"
FOREST_LIGHT = "#EAF3ED"
TERRA = "#D95D24"
TERRA_LIGHT = "#FDF0E9"
NAVY = "#1E3A8A"
NAVY_LIGHT = "#EEF2FF"
SLATE_BG = "#F6F8F7"
CARD_BG = "#FFFFFF"
BORDER = "#C5D0CA"
INK = "#1A2B29"
SUB = "#5A6A64"
ARROW = "#4B5D56"


class Canvas:
    def __init__(self, w, h):
        self.w, self.h = w, h
        self.defs = []
        self.els = []

    def add_arrow_marker(self, mid, color):
        self.defs.append(
            f'<marker id="{mid}" viewBox="0 0 10 10" refX="8.5" refY="5" '
            f'markerWidth="7" markerHeight="7" orient="auto-start-reverse">'
            f'<path d="M 1 1.5 L 9 5 L 1 8.5 z" fill="{color}"/></marker>'
        )

    def rect(self, x, y, w, h, fill=CARD_BG, stroke=BORDER, sw=1.4, rx=8, dash=None):
        d = f' stroke-dasharray="{dash}"' if dash else ""
        self.els.append(
            f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" '
            f'fill="{fill}" stroke="{stroke}" stroke-width="{sw}"{d}/>'
        )

    def text(self, x, y, s, size=13, color=INK, bold=False, anchor="start", italic=False):
        fw = ' font-weight="700"' if bold else ""
        fs = ' font-style="italic"' if italic else ""
        self.els.append(
            f'<text x="{x}" y="{y}" font-family="{escape(FONT)}" font-size="{size}" '
            f'fill="{color}" text-anchor="{anchor}"{fw}{fs}>{escape(s)}</text>'
        )

    def lines(self, x, y, items, size=12, color=SUB, lh=17, anchor="start", bold_first=False):
        for i, item in enumerate(items):
            self.text(x, y + i * lh, item, size, INK if (bold_first and i == 0) else color,
                      bold=(bold_first and i == 0), anchor=anchor)

    def path(self, d, stroke=ARROW, sw=2.0, marker_end=None, marker_start=None, dash=None):
        me = f' marker-end="url(#{marker_end})"' if marker_end else ""
        ms = f' marker-start="url(#{marker_start})"' if marker_start else ""
        da = f' stroke-dasharray="{dash}"' if dash else ""
        self.els.append(
            f'<path d="{d}" fill="none" stroke="{stroke}" stroke-width="{sw}" '
            f'stroke-linecap="round" stroke-linejoin="round"{ms}{me}{da}/>'
        )

    def badge(self, x, y, w, h, label, fill, color="#FFFFFF", size=11):
        self.rect(x, y, w, h, fill=fill, stroke=fill, sw=0, rx=h / 2)
        self.text(x + w / 2, y + h / 2 + size * 0.35, label, size, color, bold=True, anchor="middle")

    def save(self, svg_path):
        svg = (
            f'<?xml version="1.0" encoding="UTF-8"?>\n'
            f'<svg xmlns="http://www.w3.org/2000/svg" width="{self.w}" height="{self.h}" '
            f'viewBox="0 0 {self.w} {self.h}">\n'
            f'<defs>{"".join(self.defs)}</defs>\n'
            f'<rect width="{self.w}" height="{self.h}" fill="#FFFFFF"/>\n'
            + "\n".join(self.els)
            + "\n</svg>\n"
        )
        with open(svg_path, "w", encoding="utf-8") as f:
            f.write(svg)


def fig_web_architecture():
    c = Canvas(1440, 860)
    c.add_arrow_marker("arr", ARROW)
    c.add_arrow_marker("arr-forest", FOREST)
    c.add_arrow_marker("arr-terra", TERRA)
    c.add_arrow_marker("arr-navy", NAVY)

    # Title block
    c.text(36, 44, "Figure 1. LittleSteps Web System and Cloud Architecture", 22, INK, bold=True)
    c.text(36, 68, "React 19 SPA (CIT 210), Express 5 API Gateway on Cloud Functions v2 (asia-southeast1), Firestore, and External REST Services", 13.5, SUB)
    c.path("M 36 82 L 1404 82", stroke=BORDER, sw=1.2)

    # Column 1: Client Layer (React Web App)
    c.rect(36, 104, 340, 684, fill=FOREST_LIGHT, stroke=FOREST, sw=1.8, rx=12)
    c.badge(52, 120, 210, 26, "PRESENTATION LAYER (CIT 210)", FOREST)
    c.text(52, 174, "littlesteps-react (Web SPA)", 17, FOREST_DARK, bold=True)
    c.text(52, 195, "React 19.1 · TypeScript 5.9 · Vite 6.3 · Router 7", 11.5, SUB)

    c.rect(52, 212, 308, 174, fill=CARD_BG, stroke=BORDER, sw=1.2, rx=8)
    c.text(66, 236, "Protected Caregiver Routes (AppShell)", 13, INK, bold=True)
    c.lines(66, 258, [
        "• /today — Daily plan, Undo toast, Weather Hint",
        "• /explore — Activities, Storybooks, Bookshelf, AI",
        "• /milestones — Non-diagnostic observations",
        "• /journal — Caregiver-only private notes",
        "• /this-week — Factual Monday–Sunday summary",
        "• /children & /account/* — Profiles, Export, Privacy",
    ], size=11.5, lh=19)

    c.rect(52, 402, 308, 152, fill=CARD_BG, stroke=BORDER, sw=1.2, rx=8)
    c.text(66, 426, "Client Services & State", 13, INK, bold=True)
    c.lines(66, 448, [
        "• Firebase Web SDK v12 (ID Token session)",
        "• Typed Fetch API Client (Bearer + X-Request-Id)",
        "• Session Offline Cache (catalog, plans, books)",
        "  (Private journal strictly excluded from cache)",
        "• 5-State UI Matrix (populated, empty, loading,",
        "  inline error with retry, offline / AI fallback)",
    ], size=11.5, lh=17.5)

    c.rect(52, 570, 308, 114, fill=CARD_BG, stroke=BORDER, sw=1.2, rx=8)
    c.text(66, 594, "Responsive & Accessible UI", 13, INK, bold=True)
    c.lines(66, 616, [
        "• Tokenized CSS (tokens.css + feature styles)",
        "• Desktop sidebar (1280px) & mobile bar (375px)",
        "• WCAG 2.2 AA contrast (#5A6A64) & focus rings",
        "• Hosted on Firebase Hosting (littlesteps-app-cict)",
    ], size=11.5, lh=17.5)

    c.rect(52, 700, 308, 70, fill="#FFFFFF", stroke=FOREST, sw=1.2, rx=8, dash="5 3")
    c.text(66, 724, "Shared Backend Consumer (CC 207B)", 12, FOREST_DARK, bold=True)
    c.lines(66, 744, [
        "Flutter mobile client (CC 207B) shares the same",
        "client-neutral OpenAPI 3.1 REST contract.",
    ], size=11, lh=15)

    # Column 2: API Gateway Layer (Express 5 on Cloud Functions v2)
    c.rect(456, 104, 484, 684, fill=NAVY_LIGHT, stroke=NAVY, sw=1.8, rx=12)
    c.badge(472, 120, 250, 26, "APPLICATION & API LAYER (NODE 22)", NAVY)
    c.text(472, 174, "littlesteps-api (Express 5 + TypeScript)", 17, NAVY, bold=True)
    c.text(472, 195, "Firebase Cloud Functions v2 · asia-southeast1 · OpenAPI 3.1", 11.5, SUB)

    c.rect(472, 212, 452, 150, fill=CARD_BG, stroke=NAVY, sw=1.2, rx=8)
    c.text(486, 236, "Security, Validation & Observability Middleware", 13, INK, bold=True)
    c.lines(486, 258, [
        "1. requestIdMiddleware (X-Request-Id) + Helmet + no-store",
        "2. Strict CORS allowlist (403) & 100kb JSON cap (413)",
        "3. requireFirebaseUser (Firebase Admin JWT -> 401)",
        "4. BOLA Guard: /caregivers/{uid}/children/{id} -> 404",
        "5. Zod 4.1 strict schemas (unknown/null/ctrl -> 400 / 422)",
    ], size=11.3, lh=19)

    c.rect(472, 378, 452, 206, fill=CARD_BG, stroke=BORDER, sw=1.2, rx=8)
    c.text(486, 402, "Modular Domain Routers & Services (/api/v1/*)", 13, INK, bold=True)
    c.lines(486, 424, [
        "• /health & /ready — Liveness & Firestore readiness probes (public)",
        "• /api/v1/me & /me/export — Profile, JSON export, cascade delete",
        "• /api/v1/children — Profile CRUD, UTC age band, atomic 20-child cap",
        "• /api/v1/children/:id/plans — Daily plans & inline customActivity snapshots",
        "• /api/v1/children/:id/milestones — Observed / not_yet_observed / not_sure",
        "• /api/v1/children/:id/journal — Caregiver-isolated private notes",
        "• /api/v1/children/:id/books — Saved Family Bookshelf subcollection",
        "• /api/v1/children/:id/summary — Factual Monday–Sunday rollups",
    ], size=11.3, lh=19)

    c.rect(472, 600, 452, 170, fill=TERRA_LIGHT, stroke=TERRA, sw=1.3, rx=8)
    c.text(486, 624, "External Proxy, Caching & AI Orchestration", 13, TERRA, bold=True)
    c.lines(486, 646, [
        "• /api/v1/catalog/* — Firestore catalogs (5-min TTL), Open Library books",
        "  (60-min TTL + local fallback), Open-Meteo weather (2-decimal coords)",
        "• /api/v1/ai/* — Hourly Firestore rate limits (rate_limits), circuit breaker,",
        "  8s timeout, 3-layer pediatric safety screening, Tier 3 catalog fallback",
        "• Zero API keys in client bundle; zero child PII or journal text sent to AI",
    ], size=11.3, lh=19)

    # Column 3: Data & External Services Layer
    # Top card: Firebase Auth & Firestore
    c.rect(1020, 104, 384, 340, fill=SLATE_BG, stroke=FOREST, sw=1.8, rx=12)
    c.badge(1036, 120, 210, 26, "PERSISTENCE & IDENTITY", FOREST)
    c.text(1036, 174, "Firebase Auth & Cloud Firestore", 16.5, FOREST_DARK, bold=True)

    c.rect(1036, 192, 352, 114, fill=CARD_BG, stroke=BORDER, sw=1.2, rx=8)
    c.text(1050, 214, "Multi-Tenant Caregiver Subcollections", 12.5, INK, bold=True)
    c.lines(1050, 234, [
        "• /caregivers/{uid}/children/{childId}",
        "  └─ plans, milestone_observations,",
        "     journal_entries, books, weekly_summaries",
        "• Atomic transactions & recursive cascade delete",
    ], size=11.3, lh=17.5)

    c.rect(1036, 318, 352, 110, fill=CARD_BG, stroke=BORDER, sw=1.2, rx=8)
    c.text(1050, 340, "Global Seeded Catalogs & Control", 12.5, INK, bold=True)
    c.lines(1050, 360, [
        "• catalog_activities (23 reviewed Philippine items)",
        "• catalog_milestones (25 prompts across 6 bands)",
        "• catalog_rhymes (6 EN/FIL/HIL traditional rhymes)",
        "• rate_limits (atomic hourly AI quota counters)",
    ], size=11.3, lh=17)

    # Bottom card: External REST APIs
    c.rect(1020, 464, 384, 324, fill=TERRA_LIGHT, stroke=TERRA, sw=1.8, rx=12)
    c.badge(1036, 480, 210, 26, "EXTERNAL REST SERVICES", TERRA)
    c.text(1036, 530, "Third-Party APIs (Server-Proxied)", 16, INK, bold=True)

    c.rect(1036, 546, 352, 70, fill=CARD_BG, stroke=BORDER, sw=1.2, rx=8)
    c.text(1050, 568, "Open Library REST API (Internet Archive)", 12.5, INK, bold=True)
    c.lines(1050, 586, [
        "GET /subjects/*.json & /search.json · Picture-book",
        "metadata & covers · 60-min cache + local fallback",
    ], size=11, lh=15)

    c.rect(1036, 626, 352, 68, fill=CARD_BG, stroke=BORDER, sw=1.2, rx=8)
    c.text(1050, 648, "Open-Meteo Forecast REST API (v1)", 12.5, INK, bold=True)
    c.lines(1050, 666, [
        "Real-time indoor/outdoor play hints · Coordinates",
        "truncated to 2 decimals (~1.1 km); no GPS stored",
    ], size=11, lh=15)

    c.rect(1036, 704, 352, 70, fill=CARD_BG, stroke=BORDER, sw=1.2, rx=8)
    c.text(1050, 726, "Google Gemini REST API (v1beta)", 12.5, INK, bold=True)
    c.lines(1050, 744, [
        "Server-pinned GEMINI_MODEL via Node 22 fetch ·",
        "Structured JSON output · 3-layer safety guardrails",
    ], size=11, lh=15)

    # Connectors between columns
    c.path("M 376 310 L 456 310", stroke=FOREST, sw=2.4, marker_start="arr-forest", marker_end="arr-forest")
    c.text(416, 294, "HTTPS JSON", 10.5, FOREST_DARK, bold=True, anchor="middle")
    c.text(416, 328, "Bearer JWT", 10, SUB, anchor="middle")

    c.path("M 940 280 L 1020 280", stroke=NAVY, sw=2.4, marker_start="arr-navy", marker_end="arr-navy")
    c.text(980, 264, "Admin SDK", 10.5, NAVY, bold=True, anchor="middle")
    c.text(980, 298, "CRUD / Tx", 10, SUB, anchor="middle")

    c.path("M 940 660 L 1020 660", stroke=TERRA, sw=2.4, marker_start="arr-terra", marker_end="arr-terra")
    c.text(980, 644, "Server Fetch", 10.5, TERRA, bold=True, anchor="middle")
    c.text(980, 678, "Cached/Safe", 10, SUB, anchor="middle")

    # Footer note
    c.text(36, 822, "Note: Client browsers never hold Gemini API keys or access other caregivers' Firestore paths. Uniform { error: { code, message, requestId } } envelopes govern all failure modes.", 11.5, SUB)
    return c


def fig_api_ai_pipeline():
    c = Canvas(1440, 900)
    c.add_arrow_marker("arr", ARROW)
    c.add_arrow_marker("arr-forest", FOREST)
    c.add_arrow_marker("arr-terra", TERRA)
    c.add_arrow_marker("arr-navy", NAVY)

    # Title block
    c.text(36, 44, "Figure 2. External REST Integration, Caching, and 3-Layer AI Guardrail Pipeline", 22, INK, bold=True)
    c.text(36, 68, "Server-side orchestration across Open Library, Open-Meteo, and Google Gemini with deterministic fallbacks and RA 10173 data minimization", 13.5, SUB)
    c.path("M 36 82 L 1404 82", stroke=BORDER, sw=1.2)

    # ---------------- LANE A: Open Library & Closed-Loop Family Bookshelf
    c.rect(36, 102, 1368, 224, fill=FOREST_LIGHT, stroke=FOREST, sw=1.6, rx=12)
    c.badge(52, 116, 370, 25, "LANE A · OPEN LIBRARY REST API & FAMILY BOOKSHELF", FOREST)

    boxes_a = [
        (52, 156, 260, 150, "1. React Explore / Storybooks", [
            "GET /api/v1/catalog/books",
            "GET /api/v1/catalog/books/search",
            "Queries by subject or title,",
            "plus saved Family Bookshelf",
            "(POST /children/:id/books)",
        ]),
        (366, 156, 290, 150, "2. Express Catalog Proxy & Cache", [
            "Checks in-memory TTL cache",
            "(60-min fresh, stale fallback).",
            "Calls Open Library REST API:",
            "/subjects/{s}.json & /search.json",
            "Normalizes covers & authors",
        ]),
        (710, 156, 300, 150, "3. Resilience & Story Companion", [
            "Upstream failure/timeout -> serves",
            "local books.fallback.ts (60s TTL).",
            "Optional closed-loop play idea:",
            "POST /api/v1/ai/story-activity",
            "(book title + subjects -> play card)",
        ]),
        (1064, 156, 322, 150, "4. Schedule to Today's Plan", [
            "Caregiver taps 'Add to today's plan'",
            "POST /api/v1/children/:id/plans",
            "Stores inline customActivity snapshot",
            "in Firestore subcollection.",
            "Completable with 10s Undo toast",
        ]),
    ]
    for x, y, w, h, title, body in boxes_a:
        c.rect(x, y, w, h, fill=CARD_BG, stroke=BORDER, sw=1.2, rx=8)
        c.text(x + 14, y + 26, title, 12.5, FOREST_DARK, bold=True)
        c.lines(x + 14, y + 48, body, size=11.3, lh=18)
    for x1, x2 in ((312, 366), (656, 710), (1010, 1064)):
        c.path(f"M {x1} 231 L {x2} 231", stroke=FOREST, sw=2.2, marker_end="arr-forest")

    # ---------------- LANE B: Open-Meteo Weather Context
    c.rect(36, 344, 1368, 174, fill=NAVY_LIGHT, stroke=NAVY, sw=1.6, rx=12)
    c.badge(52, 358, 396, 25, "LANE B · OPEN-METEO WEATHER CONTEXT (PRIVACY-SAFE)", NAVY)

    boxes_b = [
        (52, 396, 360, 104, "1. Coarse Location Query (Today Screen)", [
            "GET /api/v1/catalog/weather?lat=10.72&lon=122.56",
            "Coordinates truncated to 2 decimals (~1.1 km).",
            "Zero GPS history persisted in Firestore.",
        ]),
        (468, 396, 420, 104, "2. Open-Meteo Proxy & In-Memory Cache", [
            "Fetches WMO weather code, precipitation & temperature",
            "from api.open-meteo.com/v1/forecast (cached server-side).",
            "Classifies indoor vs. outdoor play conditions.",
        ]),
        (944, 396, 442, 104, "3. Symmetric Weather Hint Banner", [
            "Displays calm indoor or outdoor hint on /today.",
            "CTA opens AI Idea Helper with setting preselected",
            "('Indoor' or 'Outdoor'); silent hide if unavailable.",
        ]),
    ]
    for x, y, w, h, title, body in boxes_b:
        c.rect(x, y, w, h, fill=CARD_BG, stroke=BORDER, sw=1.2, rx=8)
        c.text(x + 14, y + 24, title, 12.5, NAVY, bold=True)
        c.lines(x + 14, y + 46, body, size=11.3, lh=17.5)
    for x1, x2 in ((412, 468), (888, 944)):
        c.path(f"M {x1} 448 L {x2} 448", stroke=NAVY, sw=2.2, marker_end="arr-navy")

    # ---------------- LANE C: Google Gemini 3-Layer Pediatric Guardrails & Fallback
    c.rect(36, 536, 1368, 316, fill=TERRA_LIGHT, stroke=TERRA, sw=1.6, rx=12)
    c.badge(52, 550, 445, 25, "LANE C · GOOGLE GEMINI REST API & 3-LAYER PEDIATRIC GUARDRAILS", TERRA)

    # Top row inside Lane C: Happy path (Layers 1 -> 2 -> 3 -> Response)
    c.rect(52, 590, 260, 136, fill=CARD_BG, stroke=BORDER, sw=1.2, rx=8)
    c.text(66, 614, "Structured Request (No PII)", 12.5, INK, bold=True)
    c.lines(66, 636, [
        "POST /api/v1/ai/recommendations",
        "POST /api/v1/ai/adapt",
        "Strict Zod: ageBand, setting,",
        "timeMinutes, materials, language.",
        "Rate limit: 10/hr/user · 30/hr/IP (429)",
    ], size=11, lh=16.5)

    c.rect(352, 590, 232, 136, fill=CARD_BG, stroke=TERRA, sw=1.4, rx=8)
    c.text(366, 614, "Layer 1 · Input Gate", 12.5, TERRA, bold=True)
    c.lines(366, 636, [
        "sanitize.ts blocks extreme",
        "hazards (bleach, knife, fire,",
        "medicine) & prompt probes.",
        "Permits typos & FIL/HIL",
        "household words to pass.",
    ], size=11, lh=16.5)

    c.rect(624, 590, 272, 136, fill=CARD_BG, stroke=TERRA, sw=1.4, rx=8)
    c.text(638, 614, "Layer 2 · Gemini v1beta (Tier 1)", 12.5, TERRA, bold=True)
    c.lines(638, 636, [
        "Node 22 fetch · 8s timeout ·",
        "Circuit breaker (3 fails -> 60s).",
        "Catalog-first match; if custom",
        "materials, evaluates structured",
        "materialAssessments first.",
    ], size=11, lh=16.5)

    c.rect(936, 590, 224, 136, fill=CARD_BG, stroke=TERRA, sw=1.4, rx=8)
    c.text(950, 614, "Layer 3 · Output Validator", 12.5, TERRA, bold=True)
    c.lines(950, 636, [
        "validate-output.ts checks",
        "catalog IDs, normalized",
        "hazard terms & 33-term",
        "non-diagnostic denylist.",
        "Fails closed on any slip.",
    ], size=11, lh=16.5)

    c.rect(1200, 590, 186, 136, fill=FOREST_LIGHT, stroke=FOREST, sw=1.4, rx=8)
    c.text(1214, 614, "Provenance Badge", 12.5, FOREST_DARK, bold=True)
    c.lines(1214, 636, [
        "• source: 'ai'",
        "  ('Suggested by AI')",
        "• source: 'ai_custom'",
        "  ('Material adaptation')",
        "• Zero fake citations",
    ], size=11, lh=16.5)

    for x1, x2 in ((312, 352), (584, 624), (896, 936), (1160, 1200)):
        c.path(f"M {x1} 658 L {x2} 658", stroke=TERRA, sw=2.1, marker_end="arr-terra")

    # Bottom row inside Lane C: Deterministic Tier 3 Fallback bar
    c.rect(352, 756, 1034, 78, fill="#FFFFFF", stroke=FOREST, sw=1.5, rx=8, dash="6 3")
    c.text(368, 782, "Tier 3 Deterministic Fallback (fallback.ts) — Guaranteed Safe Response", 13, FOREST_DARK, bold=True)
    c.lines(368, 804, [
        "Triggered automatically on: missing API key, 8s timeout, upstream 429/5xx, open circuit breaker, all materials unsafe, or Layer 3 validation rejection.",
        "Returns reviewed Firestore catalog_activities filtered by ageBand/setting/domain with source: 'fallback' ('Our picks' badge). (/ai/adapt uses Tier 2 rule-based fallback.)",
    ], size=11.3, lh=17)

    # Downward fallback arrows from Layer 2 and Layer 3 into Tier 3 bar
    c.path("M 760 726 L 760 756", stroke=FOREST, sw=2.0, marker_end="arr-forest", dash="4 3")
    c.text(772, 745, "timeout / error / open breaker", 10, SUB)
    c.path("M 1048 726 L 1048 756", stroke=FOREST, sw=2.0, marker_end="arr-forest", dash="4 3")
    c.text(1060, 745, "invalid / unsafe output", 10, SUB)

    c.text(36, 878, "Privacy Boundary (RA 10173): Child nicknames, birth months, exact locations, and private journal entries are stripped by schema and never leave the authenticated account.", 11.5, SUB)
    return c


def find_chrome():
    cand = []
    if os.environ.get("CHROME"):
        cand.append(os.environ["CHROME"])
    cand += glob.glob(os.path.expanduser("~/.cache/puppeteer/chrome-headless-shell/*/*/chrome-headless-shell"))
    cand += glob.glob(os.path.expanduser("~/.cache/puppeteer/chrome/*/*/chrome"))
    cand += [shutil.which(n) for n in ("chrome-headless-shell", "chromium", "chromium-browser", "google-chrome")]
    return next((x for x in cand if x and os.path.exists(x)), None)


def render_png(svg_path, png_path, w, h, scale=2):
    chrome = find_chrome()
    if chrome:
        with tempfile.TemporaryDirectory() as td:
            html = os.path.join(td, "render.html")
            tmp_png = os.path.join(td, "out.png")
            with open(html, "w", encoding="utf-8") as f:
                f.write(
                    f'<html><body style="margin:0;background:#fff">'
                    f'<img src="file://{svg_path}" style="display:block;width:{w}px;height:{h}px">'
                    f'</body></html>'
                )
            subprocess.run(
                [
                    chrome, "--headless=new", "--no-sandbox", "--disable-gpu",
                    "--hide-scrollbars", f"--force-device-scale-factor={scale}",
                    f"--window-size={w},{h}", f"--screenshot={tmp_png}", "file://" + html,
                ],
                check=True,
                capture_output=True,
            )
            if os.path.exists(tmp_png) and os.path.getsize(tmp_png) > 0:
                shutil.move(tmp_png, png_path)
                return
    cv = shutil.which("convert")
    if cv:
        subprocess.run([cv, "-density", "200", svg_path, png_path], check=True)
        return
    raise RuntimeError("No Chrome or ImageMagick available to render PNGs")


def main():
    os.makedirs(OUT, exist_ok=True)
    for name, canvas in (
        ("fig-1-web-architecture", fig_web_architecture()),
        ("fig-2-api-ai-pipeline", fig_api_ai_pipeline()),
    ):
        svg_path = os.path.join(OUT, f"{name}.svg")
        png_path = os.path.join(OUT, f"{name}.png")
        canvas.save(svg_path)
        render_png(svg_path, png_path, canvas.w, canvas.h, scale=2)
        print(f"wrote {svg_path} & {png_path}")


if __name__ == "__main__":
    main()
