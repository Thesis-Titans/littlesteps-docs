#!/usr/bin/env python3
"""Generate low-cognitive-load SVG and 2x Chrome PNG diagrams for CIT 210.

Visual style matches CC 207B diagrams (LittleSteps forest green, warm cream,
steel blue, muted purple, generous whitespace, concise scannable labels).
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

# Standardized LittleSteps figure palette (aligned with CC 207B figures)
FOREST = "#165A42"
FOREST_LIGHT = "#F0F5F2"
CREAM = "#F3F2E8"
CREAM_BDR = "#D8D6C8"
BLUE = "#2B6CB0"
BLUE_BG = "#F3F7FB"
TERRA = "#C25525"
TERRA_BG = "#FDF3EE"
AMBER_BG = "#FBE39B"
AMBER_INK = "#5C4008"
PURPLE = "#7C4D8B"
PURPLE_BG = "#F7F3F9"
INK = "#1E2925"
SUB = "#5A6A64"
BORDER = "#D4DCD8"
WHITE = "#FFFFFF"


class Canvas:
    def __init__(self, w, h):
        self.w, self.h = w, h
        self.defs = []
        self.els = []

    def marker(self, mid, color):
        self.defs.append(
            f'<marker id="{mid}" viewBox="0 0 10 10" refX="8.5" refY="5" '
            f'markerWidth="7" markerHeight="7" orient="auto-start-reverse">'
            f'<path d="M 1 1.5 L 9 5 L 1 8.5 z" fill="{color}"/></marker>'
        )

    def rect(self, x, y, w, h, fill=WHITE, stroke=BORDER, sw=1.6, rx=10, dash=None):
        d = f' stroke-dasharray="{dash}"' if dash else ""
        self.els.append(
            f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" '
            f'fill="{fill}" stroke="{stroke}" stroke-width="{sw}"{d}/>'
        )

    def cap_card(self, x, y, w, h, title, cap_fill, cap_text, border_color, cap_h=44, rx=10):
        """Card with colored top header cap (matching CC 207B figure style)."""
        self.rect(x, y, w, h, fill=WHITE, stroke=border_color, sw=1.8, rx=rx)
        # Clip top rounded cap using path
        r = rx
        d = (
            f"M {x + r} {y} H {x + w - r} Q {x + w} {y} {x + w} {y + r} "
            f"V {y + cap_h} H {x} V {y + r} Q {x} {y} {x + r} {y} Z"
        )
        self.els.append(f'<path d="{d}" fill="{cap_fill}"/>')
        self.text(x + w / 2, y + cap_h / 2 + 6, title, 16, cap_text, bold=True, anchor="middle")

    def text(self, x, y, s, size=13, color=INK, bold=False, anchor="start", italic=False):
        fw = ' font-weight="700"' if bold else ""
        fs = ' font-style="italic"' if italic else ""
        self.els.append(
            f'<text x="{x}" y="{y}" font-family="{escape(FONT)}" font-size="{size}" '
            f'fill="{color}" text-anchor="{anchor}"{fw}{fs}>{escape(s)}</text>'
        )

    def bullets(self, x, y, items, size=13.5, color=INK, lh=28, sub_color=SUB):
        cy = y
        for item in items:
            if isinstance(item, tuple):
                main, sub = item
                self.text(x, cy, f"•  {main}", size, color)
                self.text(x + 18, cy + 17, sub, size - 2, sub_color)
                cy += lh + 16
            else:
                self.text(x, cy, f"•  {item}", size, color)
                cy += lh

    def line(self, x1, y1, x2, y2, color=BORDER, sw=1.2):
        self.els.append(f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{color}" stroke-width="{sw}"/>')

    def path(self, d, stroke=FOREST, sw=2.4, marker_end=None, marker_start=None, dash=None):
        me = f' marker-end="url(#{marker_end})"' if marker_end else ""
        ms = f' marker-start="url(#{marker_start})"' if marker_start else ""
        da = f' stroke-dasharray="{dash}"' if dash else ""
        self.els.append(
            f'<path d="{d}" fill="none" stroke="{stroke}" stroke-width="{sw}" '
            f'stroke-linecap="round" stroke-linejoin="round"{ms}{me}{da}/>'
        )

    def pill(self, x, y, w, h, label, fill, color=WHITE, size=12):
        self.rect(x, y, w, h, fill=fill, stroke=fill, sw=0, rx=6)
        self.text(x + w / 2, y + h / 2 + size * 0.35, label, size, color, bold=True, anchor="middle")

    def save(self, svg_path):
        svg = (
            f'<?xml version="1.0" encoding="UTF-8"?>\n'
            f'<svg xmlns="http://www.w3.org/2000/svg" width="{self.w}" height="{self.h}" '
            f'viewBox="0 0 {self.w} {self.h}">\n'
            f'<defs>{"".join(self.defs)}</defs>\n'
            f'<rect width="{self.w}" height="{self.h}" fill="{WHITE}"/>\n'
            f'<rect x="6" y="6" width="{self.w - 12}" height="{self.h - 12}" rx="16" '
            f'fill="{WHITE}" stroke="{BORDER}" stroke-width="1.4"/>\n'
            + "\n".join(self.els)
            + "\n</svg>\n"
        )
        with open(svg_path, "w", encoding="utf-8") as f:
            f.write(svg)


def fig_web_architecture():
    """Fig. 1: Clean 4-column architecture matching CC 207B figure minimalism."""
    c = Canvas(1280, 560)
    c.marker("a-forest", FOREST)
    c.marker("a-blue", BLUE)
    c.marker("a-terra", TERRA)
    c.marker("a-purple", PURPLE)

    # Header
    c.text(42, 48, "LittleSteps Web System and Cloud Architecture", 22, FOREST, bold=True)
    c.text(42, 74, "Caregiver web client communicating with a shared Express 5 REST gateway, Firestore, and external APIs", 14, SUB)
    c.line(42, 90, 1238, 90, BORDER, 1.2)

    # Col 1: Caregiver Inputs (Warm Cream cap)
    c.cap_card(42, 112, 210, 260, "Caregiver Inputs", CREAM, INK, CREAM_BDR)
    c.bullets(58, 186, [
        ("Child Age Band", 'e.g., "12-23m"'),
        ("Play Context", "setting, time, items"),
        ("Book Search", "title or subject"),
        "Private Notes",
    ], size=13, lh=26)

    # Col 2: Web Client (React 19)
    c.cap_card(294, 112, 250, 260, "Web Client (React 19)", FOREST, WHITE, FOREST)
    c.bullets(312, 186, [
        "5-Tab Responsive Shell",
        "Explore & Bookshelf",
        "Today Plan & Undo",
        "Session Offline Cache",
        "WCAG 2.2 AA Tokens",
    ], size=13, lh=28)
    c.text(312, 352, "littlesteps-react · Vite 6", 12.5, FOREST, bold=True)

    # Col 3: Backend Gateway API
    c.cap_card(596, 112, 250, 260, "Backend Gateway API", FOREST, WHITE, FOREST)
    c.bullets(614, 186, [
        "Express 5 · Node 22",
        "Firebase JWT & BOLA 404",
        "Zod 4.1 Schema Guard",
        "Hourly AI Rate Limits",
        "Zero Client API Keys",
    ], size=13, lh=28)
    c.text(614, 352, "littlesteps-api · Cloud Fn v2", 12.5, FOREST, bold=True)

    # Col 4: 3 stacked cloud/external services (short, scannable)
    # 4a: External REST APIs
    c.rect(904, 112, 334, 78, fill=BLUE_BG, stroke=BLUE, sw=1.8, rx=10)
    c.text(922, 138, "External REST APIs (Proxied)", 14.5, BLUE, bold=True)
    c.text(922, 158, "Open Library (60m cache) · Open-Meteo (2-dec)", 12, INK)
    c.text(922, 176, "Google Gemini v1beta · 3-layer guardrails · 8s cap", 11.5, SUB)

    # 4b: Reviewed ECCD Catalog
    c.rect(904, 203, 334, 78, fill=FOREST_LIGHT, stroke=FOREST, sw=1.8, rx=10)
    c.text(922, 229, "Reviewed ECCD Catalog (Tier 3)", 14.5, FOREST, bold=True)
    c.text(922, 249, "23 Activities · 25 Milestones · 6 Rhymes", 12, INK)
    c.text(922, 267, "Firestore 5-min TTL · Deterministic fallback", 11.5, SUB)

    # 4c: Cloud Firestore & Auth
    c.rect(904, 294, 334, 78, fill=PURPLE_BG, stroke=PURPLE, sw=1.8, rx=10)
    c.text(922, 320, "Cloud Firestore & Firebase Auth", 14.5, PURPLE, bold=True)
    c.text(922, 340, "Caregiver-isolated subcollections", 12, INK)
    c.text(922, 358, "RA 10173 data export & cascade delete", 11.5, SUB)

    # Arrows
    c.path("M 252 242 L 290 242", stroke=FOREST, sw=2.4, marker_end="a-forest")
    c.path("M 544 242 L 592 242", stroke=FOREST, sw=2.4, marker_end="a-forest")
    c.text(568, 232, "HTTPS", 11, FOREST, bold=True, anchor="middle")
    c.text(568, 258, "Bearer", 10.5, SUB, anchor="middle")

    c.path("M 846 188 L 900 156", stroke=BLUE, sw=2.2, marker_end="a-blue")
    c.path("M 846 242 L 900 242", stroke=FOREST, sw=2.2, marker_end="a-forest")
    c.path("M 846 296 L 900 330", stroke=PURPLE, sw=2.2, marker_end="a-purple")
    # Small fallback arrow from External REST -> Catalog
    c.path("M 1071 190 L 1071 200", stroke=TERRA, sw=2.0, marker_end="a-terra", dash="3 2")

    # Down arrow to Target Outcome
    c.path("M 419 372 L 419 418", stroke=FOREST, sw=2.4, marker_end="a-forest")

    # Bottom Outcome Bar
    c.rect(42, 422, 1196, 102, fill=CREAM, stroke=FOREST, sw=1.8, rx=10)
    c.text(68, 456, "Target Outcome: Calm, Screen-Free Caregiver Play", 16.5, FOREST, bold=True)
    c.text(68, 482, "Caregivers find an activity, picture-book companion, or weather hint in under a minute, set the device aside, and play.", 13.5, INK)
    c.text(68, 504, "Grounded in WHO, AAP, and Philippine ECCD (RA 12199) guidance; strictly non-diagnostic with RA 10173 privacy isolation.", 12.5, SUB)
    return c


def fig_api_ai_pipeline():
    """Fig. 2: Clean 3-column external REST & 3-layer AI guardrail flow matching CC 207B."""
    c = Canvas(1280, 680)
    c.marker("a-forest", FOREST)
    c.marker("a-blue", BLUE)
    c.marker("a-terra", TERRA)

    # Header
    c.text(42, 48, "External REST Integration, Caching, and AI Fallback Pipeline", 22, FOREST, bold=True)
    c.text(42, 74, "Server-proxied Open Library, Open-Meteo, and Google Gemini with three-layer safety screening and deterministic fallbacks", 14, SUB)
    c.line(42, 90, 1238, 90, BORDER, 1.2)

    # Column 1: Web Client (React 19)
    c.cap_card(42, 112, 314, 486, "Web Client (React 19)", FOREST, WHITE, FOREST)

    c.rect(60, 174, 278, 176, fill=CREAM, stroke=CREAM_BDR, sw=1.3, rx=8)
    c.text(76, 200, "Structured Requests", 14, INK, bold=True)
    c.bullets(76, 228, [
        "Open Library book search",
        "Weather hint (2-dec lat/lon)",
        "AI Idea Helper & Story idea",
    ], size=12.5, lh=26)
    c.text(76, 316, "No child names, PII, or journal text", 12, TERRA, italic=True)
    c.text(76, 336, "HTTPS + Firebase Bearer token", 11.5, SUB)

    c.rect(60, 368, 278, 212, fill=CREAM, stroke=CREAM_BDR, sw=1.3, rx=8)
    c.text(76, 394, "Provenance Badges", 14, INK, bold=True)
    c.pill(76, 412, 138, 26, "Suggested by AI", BLUE, WHITE, 11.5)
    c.text(76, 454, "Tier 1: Reviewed catalog pick", 11.5, SUB)
    c.pill(76, 468, 152, 26, "Material adaptation", AMBER_BG, AMBER_INK, 11.5)
    c.text(76, 510, "Tier 1: Guarded custom activity", 11.5, SUB)
    c.pill(76, 524, 102, 26, "Our picks", FOREST, WHITE, 11.5)
    c.text(76, 566, "Tier 3: Reviewed ECCD fallback", 11.5, SUB)

    # Column 2: Express 5 API Gateway
    c.cap_card(446, 112, 326, 486, "Express 5 API Gateway", FOREST, WHITE, FOREST)

    c.rect(464, 174, 290, 176, fill=FOREST_LIGHT, stroke=BORDER, sw=1.3, rx=8)
    c.text(480, 200, "Proxy, Cache & Quotas", 14, INK, bold=True)
    c.bullets(480, 228, [
        ("Open Library & Open-Meteo", "60-min TTL · 100-entry cap"),
        ("AI Rate Limits (HTTP 429)", "10 req/hr user · 30 req/hr IP"),
        ("Zod 4.1 Strict Schemas", "Zero API keys in browser"),
    ], size=12.5, lh=24)

    c.rect(464, 368, 290, 212, fill=FOREST_LIGHT, stroke=BORDER, sw=1.3, rx=8)
    c.text(480, 394, "3-Layer Pediatric Guardrails", 14, INK, bold=True)
    c.text(480, 424, "L1. Thin input gate (sanitize.ts)", 12.5, INK, bold=True)
    c.text(496, 443, "Blocks hazards; allows FIL/HIL terms", 11.5, SUB)
    c.text(480, 472, "L2. Model assessment (Gemini)", 12.5, INK, bold=True)
    c.text(496, 491, "Structured materialAssessments JSON", 11.5, SUB)
    c.text(480, 520, "L3. Output validator (fail-closed)", 12.5, INK, bold=True)
    c.text(496, 539, "Hazard + 33-term clinical denylist", 11.5, TERRA)
    c.text(480, 566, "Any slip falls back cleanly to Tier 3", 11.5, FOREST, bold=True)

    # Column 3 Top: Live External REST APIs
    c.cap_card(866, 112, 372, 212, "Live External REST APIs", BLUE, WHITE, BLUE)
    c.bullets(884, 184, [
        ("Open Library REST API", "Picture books -> Family Bookshelf -> Plan"),
        ("Open-Meteo Forecast API", "3s timeout · Indoor / Outdoor weather hint"),
        ("Google Gemini API (v1beta)", "Node 22 fetch · 8s timeout · 3-fail breaker"),
    ], size=12.5, lh=28)

    # Column 3 Bottom: Deterministic Fallbacks
    c.cap_card(866, 392, 372, 206, "Deterministic Fallbacks", FOREST, WHITE, FOREST)
    c.bullets(884, 464, [
        ("Local Books Fallback", "books.fallback.ts (60s recovery TTL)"),
        ("Neutral Weather Fallback", "Hides banner calmly if unreachable"),
        ("Tier 3 ECCD Catalog Pool", "Firestore activities labeled 'Our picks'"),
    ], size=12.5, lh=26)

    # Arrows between columns
    c.path("M 356 226 L 442 226", stroke=FOREST, sw=2.4, marker_end="a-forest")
    c.text(399, 216, "1. Request", 11.5, FOREST, bold=True, anchor="middle")

    c.path("M 446 474 L 360 474", stroke=FOREST, sw=2.4, marker_end="a-forest")
    c.text(403, 464, "4. Response", 11.5, FOREST, bold=True, anchor="middle")

    c.path("M 772 200 L 862 200", stroke=BLUE, sw=2.4, marker_end="a-blue")
    c.text(817, 190, "2a. Fetch", 11.5, BLUE, bold=True, anchor="middle")

    c.path("M 866 266 L 776 266", stroke=BLUE, sw=2.4, marker_end="a-blue")
    c.text(821, 256, "3a. Valid", 11.5, BLUE, bold=True, anchor="middle")

    # Fallback pill + vertical arrow between Col 3 Top and Bottom
    c.path("M 1052 324 L 1052 388", stroke=TERRA, sw=2.2, marker_end="a-terra", dash="5 4")
    c.rect(942, 344, 220, 26, fill=TERRA_BG, stroke=TERRA, sw=1.2, rx=6)
    c.text(1052, 361, "Timeout / Error / Safety Fail", 11.5, TERRA, bold=True, anchor="middle")

    c.path("M 772 470 L 862 470", stroke=TERRA, sw=2.2, marker_end="a-terra", dash="5 4")
    c.text(817, 460, "2b. Fallback", 11.5, TERRA, bold=True, anchor="middle")

    c.path("M 866 534 L 776 534", stroke=FOREST, sw=2.4, marker_end="a-forest")
    c.text(821, 524, "3b. Safe Pick", 11.5, FOREST, bold=True, anchor="middle")

    # Footer note
    c.text(42, 626, "Note: Single-activity tweaks (/api/v1/ai/adapt) fall back to Tier 2 rule-based adaptations when Gemini is unavailable.", 12, SUB)
    c.text(42, 648, "Exceeding hourly rate limits returns HTTP 429 with a Retry-After cooldown notice instead of silent fallback.", 12, SUB)
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
    raise RuntimeError("No Chrome or ImageMagick available")


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
