#!/usr/bin/env python3
"""Generate the CIT 246 plan figures (SVG + 300 dpi PNG) from the plan data.

Run:   python3 make_figures.py            (from any folder; paths are relative to this file)
Needs: Python 3.8+ standard library only. For PNG output, one of
         - chrome-headless-shell / chrome / chromium (set CHROME=/path/to/binary, or it is found on PATH
           or in ~/.cache/puppeteer), or
         - ImageMagick `convert` (fallback, lower text quality).
       Without either, only the SVG files are written.
Reads ONLY these files in data/: schedule-and-cost.csv, cost-baseline-by-month.csv, wbs-levels.csv (WBS levels 0-2),
       milestones.csv (name, date) and org-chart.csv (nodes, parent links, dotted links, outside-team nodes).
       Writes ../figures/fig-*.svg and fig-*.png.
Every ID, name, date and number in a figure comes from those files. The plan Markdown is NOT a data source: check_md()
       only compares the 07 WBS list and the 08 milestone table with the data files and fails loudly if they drift. PNGs are A4 at 300 dpi (2480x3508 / 3508x2480).
"""
import csv, datetime as dt, glob, os, re, shutil, subprocess, sys, tempfile
from html import escape

HERE = os.path.dirname(os.path.abspath(__file__))
PLAN = os.path.dirname(HERE)
OUT = os.path.join(PLAN, "figures")

# ---------------------------------------------------------------- style
FONT = 'Arial, "Liberation Sans", "Nimbus Sans", "Helvetica Neue", Helvetica, "DejaVu Sans", sans-serif'
INK, SUB, MUTE, LINE, BAND = "#1a1a1a", "#555555", "#8a8a8a", "#b8b8b8", "#f1f1f1"
CRIT, CRIT_L = "#b42318", "#fbe9e7"          # critical path: strong red + heavier stroke
NC, NC_S = "#d9dde1", "#7d868e"               # non-critical: muted grey
A4W, A4H = 793.7, 1122.5                      # A4 in CSS px at 96 dpi

# Helvetica/Arial advance widths (1/1000 em) for ASCII 32..126, used to wrap and fit text without a browser.
_W = ("278 278 355 556 556 889 667 191 333 333 389 584 278 333 278 278 556 556 556 556 556 556 556 556 556 556 "
      "278 278 584 584 584 556 1015 667 667 722 722 667 611 778 722 278 500 667 556 833 722 778 667 778 722 667 "
      "611 722 667 944 667 667 611 278 278 278 469 556 333 556 556 500 556 556 278 556 556 222 222 500 222 833 "
      "556 556 556 556 333 500 278 556 500 722 500 500 500 334 260 334 584").split()
_W = [int(w) for w in _W]


def tw(s, size, bold=False):
    t = sum(_W[ord(c) - 32] if 32 <= ord(c) < 127 else 556 for c in s) * size / 1000
    return t * (1.06 if bold else 1)


def wrap(s, size, maxw, bold=False):
    lines, cur = [], ""
    for w in s.split():
        t = (cur + " " + w).strip()
        if cur and tw(t, size, bold) > maxw:
            lines.append(cur); cur = w
        else:
            cur = t
    return lines + [cur]


def fit(s, size, maxw, bold=False):
    if tw(s, size, bold) <= maxw:
        return s
    while s and tw(s + "…", size, bold) > maxw:
        s = s[:-1]
    return s.rstrip() + "…"


class Svg:
    def __init__(self, w, h):
        self.w, self.h, self.o = w, h, []

    def add(self, s): self.o.append(s)

    def rect(self, x, y, w, h, fill="none", stroke="none", sw=1, rx=0, dash=None, extra=""):
        d = f' stroke-dasharray="{dash}"' if dash else ""
        self.add(f'<rect x="{x:.2f}" y="{y:.2f}" width="{w:.2f}" height="{h:.2f}" rx="{rx}" fill="{fill}" '
                 f'stroke="{stroke}" stroke-width="{sw}"{d} {extra}/>')

    def line(self, x1, y1, x2, y2, stroke=INK, sw=1, dash=None, extra=""):
        d = f' stroke-dasharray="{dash}"' if dash else ""
        self.add(f'<line x1="{x1:.2f}" y1="{y1:.2f}" x2="{x2:.2f}" y2="{y2:.2f}" stroke="{stroke}" '
                 f'stroke-width="{sw}"{d} {extra}/>')

    def path(self, d, fill="none", stroke=INK, sw=1, dash=None, extra=""):
        da = f' stroke-dasharray="{dash}"' if dash else ""
        self.add(f'<path d="{d}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}"{da} {extra}/>')

    def text(self, x, y, s, size=10, fill=INK, bold=False, anchor="start", extra=""):
        b = ' font-weight="700"' if bold else ""
        self.add(f'<text x="{x:.2f}" y="{y:.2f}" font-size="{size}" fill="{fill}" text-anchor="{anchor}"{b} {extra}>'
                 f'{escape(s)}</text>')

    def save(self, path, mm=None):
        wmm, hmm = mm or (self.w * 25.4 / 96, self.h * 25.4 / 96)
        head = (f'<svg xmlns="http://www.w3.org/2000/svg" width="{wmm:.1f}mm" height="{hmm:.1f}mm" '
                f'viewBox="0 0 {self.w:.2f} {self.h:.2f}" font-family=\'{FONT}\'>\n'
                f'<rect width="{self.w:.2f}" height="{self.h:.2f}" fill="#ffffff"/>\n')
        with open(path, "w", encoding="utf-8") as f:
            f.write(head + "\n".join(self.o) + "\n</svg>\n")


def title(s, label, caption, sub, width):
    s.text(28, 34, label, 15, INK, True)
    lines = wrap(caption, 10.5, width - 56)
    for i, l in enumerate(lines):
        s.text(28, 50 + i * 13, l, 10.5, SUB)
    y = 50 + len(lines) * 13 - 4
    s.line(28, y, width - 28, y, INK, 1.2)
    return y


# ---------------------------------------------------------------- data
def read(name):
    with open(os.path.join(PLAN, name), encoding="utf-8") as f:
        return f.read()


def load():
    rows = []
    with open(os.path.join(HERE, "schedule-and-cost.csv"), encoding="utf-8") as f:
        for r in csv.DictReader(f):
            d = dt.date.fromisoformat
            rows.append(dict(id=r["WBS"], name=r["Work package"], dur=int(r["Duration (working days)"]),
                             pred=r["Predecessors"].split(), start=d(r["Start"]), fin=d(r["Finish"]),
                             float=(int(r["Total float (days)"]) if r["Total float (days)"] != "" else None),
                             crit=r["Critical"] == "Yes", cost=int(r["Total cost (PHP)"])))
    months = []
    with open(os.path.join(HERE, "cost-baseline-by-month.csv"), encoding="utf-8") as f:
        for r in csv.DictReader(f):
            months.append((r["Month"], int(r["Planned cost (PHP)"]), int(r["Cumulative (PHP)"])))
    with open(os.path.join(HERE, "wbs-levels.csv"), encoding="utf-8") as f:
        levels = {r["WBS"]: r["Name"] for r in csv.DictReader(f)}
    root = levels.pop("0")
    with open(os.path.join(HERE, "milestones.csv"), encoding="utf-8") as f:
        ms = [(r["Milestone"], dt.date.fromisoformat(r["Date"])) for r in csv.DictReader(f)]
    return rows, months, levels, root, ms


ROWS, MONTHS, LEVELS, ROOT, MILESTONES = load()


def check_md():
    """Fail loudly if the plan Markdown (07 list, 08 milestone table) no longer matches the data files."""
    wbs = read("07-work-breakdown-structure.md")
    md = {m.group(1): m.group(2) for m in re.finditer(r"^\s*- \*\*(\d\.\d) (.+?)\*\*\s*$", wbs, re.M)}
    md_root = re.search(r"\*\*0\. (.+?)\*\*", wbs).group(1)
    md_wp = {m.group(1): m.group(2) for m in re.finditer(r"^\s+- (\d\.\d\.\d) (.+?)\s*$", wbs, re.M)}
    csv_wp = {r["id"]: r["name"] for r in ROWS}
    sec = read("08-schedule.md").split("## 8.5 Milestones")[1]
    tab = [(m.group(1), dt.datetime.strptime(m.group(2), "%d %b %Y").date())
           for m in re.finditer(r"^\| ([^|]+?) \| (\d+ \w+ \d{4}) \|", sec, re.M)]
    bad = []
    if md != LEVELS: bad.append(f"07 WBS levels 1-2 differ from data/wbs-levels.csv: {sorted(set(md.items()) ^ set(LEVELS.items()))}")
    if md_root != ROOT: bad.append(f"07 level-0 name {md_root!r} != wbs-levels.csv {ROOT!r}")
    if md_wp != csv_wp: bad.append(f"07 work packages differ from data/schedule-and-cost.csv: {sorted(set(md_wp.items()) ^ set(csv_wp.items()))}")
    if tab != MILESTONES: bad.append(f"08 section 8.5 milestone table differs from data/milestones.csv: {[x for x in tab + MILESTONES if (x in tab) != (x in MILESTONES)]}")
    if bad: sys.exit("DRIFT between plan Markdown and data files; fix the .md or the CSV:\n  " + "\n  ".join(bad))


check_md()
BY = {r["id"]: r for r in ROWS}
BASELINE = sum(r["cost"] for r in ROWS)
assert BASELINE == MONTHS[-1][2], (BASELINE, MONTHS[-1])
BUDGET = round(BASELINE * 1.10)
assert BUDGET == 1083185, BUDGET
CRIT_IDS = {r["id"] for r in ROWS if r["crit"]}
assert len(ROWS) == 49 and len(CRIT_IDS) == 23
HOLI = {dt.date(2027, 3, 25), dt.date(2027, 3, 26), dt.date(2027, 4, 9), dt.date(2027, 8, 25)}  # as schedule_model.py
PROJ_START, PROJ_END = min(r["start"] for r in ROWS), max(r["fin"] for r in ROWS)


def nextwd(d):
    d += dt.timedelta(1)
    while d.weekday() > 4 or d in HOLI:
        d += dt.timedelta(1)
    return d


def wd_between(a, b):
    n, d = 0, a
    while d < b:
        d += dt.timedelta(1)
        if d.weekday() < 5 and d not in HOLI: n += 1
    return n


TOTAL_DAYS = wd_between(PROJ_START, PROJ_END) + 1
assert TOTAL_DAYS == 166, TOTAL_DAYS
fmt = lambda d: f"{d.day} {d:%b %Y}"
peso = lambda n: f"₱{n:,}"
LANES = sorted({r["id"].split(".")[0] for r in ROWS})
LANE_NAME = {l: f"{l}.0 {LEVELS[l + '.0']}" for l in LANES}


# ---------------------------------------------------------------- Figure 7.1 WBS board
def fig_wbs():
    W, H = A4W, A4H
    s = Svg(W, H)
    ty = title(s, "Figure 7.1", "Work breakdown structure to work-package level: project, 8 deliverable branches, "
               "sub-deliverables and the 49 work packages.", None, W)
    M, GAP, CW = 28, 20, (W - 56 - 20) / 2
    FS, LH = 11, 15.5
    pw, ph = 330, 34
    px, py = W / 2 - pw / 2, ty + 14
    s.rect(px, py, pw, ph, INK, INK, 1, 3)
    s.text(W / 2, py + 14, "0  " + ROOT, 11.5, "#ffffff", True, "middle")
    s.text(W / 2, py + 27, "Level 0: the whole project", 9.5, "#dddddd", False, "middle")
    cards = []
    for l in LANES:
        groups = []
        for g in sorted(k for k in LEVELS if k.startswith(l + ".") and not k.endswith(".0")):
            groups.append((g, LEVELS[g], [r for r in ROWS if r["id"].rsplit(".", 1)[0] == g]))
        n = sum(1 + len(g[2]) for g in groups)
        cards.append((l, groups, 28 + n * LH + 8))
    rows = [cards[i:i + 2] for i in range(0, len(cards), 2)]
    y = py + ph + 22
    trunk_top = py + ph
    tops = []
    for row in rows:
        rh = max(c[2] for c in row)
        for ci, (l, groups, h) in enumerate(row):
            x = M if ci == 0 else M + CW + GAP
            tops.append(y + 14)
            s.rect(x, y, CW, rh, "#ffffff", INK, 1.1, 3)
            s.path(f"M{x:.1f},{y + 25:.1f} V{y + 3:.1f} a3,3 0 0 1 3,-3 H{x + CW - 3:.1f} a3,3 0 0 1 3,3 V{y + 25:.1f} Z",
                   "#3d4852", "#3d4852", 1)
            s.text(x + 8, y + 17, LANE_NAME[l], 12, "#ffffff", True)
            s.text(x + CW - 8, y + 17, "Level 1", 9.5, "#cfd4d8", False, "end")
            yy = y + 28
            for g, gname, wps in groups:
                s.rect(x + 4, yy + 1, CW - 8, LH - 1, BAND)
                s.text(x + 8, yy + LH - 4, f"{g}  {gname}", FS, INK, True)
                s.text(x + CW - 10, yy + LH - 4, "Level 2", 9, MUTE, False, "end")
                yy += LH
                for r in wps:
                    s.text(x + 18, yy + LH - 4, r["id"], FS, SUB, True)
                    s.text(x + 18 + 33, yy + LH - 4, r["name"], FS, INK)
                    yy += LH
            cx = x + CW if ci == 0 else x
            tx = W / 2
            s.line(tx, y + 14, cx, y + 14, INK, 1.1)
        y += rh + 16
    s.line(W / 2, trunk_top, W / 2, tops[-1], INK, 1.1)
    # legend
    ly = y + 2
    s.line(M, ly - 6, W - M, ly - 6, LINE, 0.8)
    s.text(M, ly + 8, "Level 1: deliverable branch.  Level 2: sub-deliverable.  Level 3 (id + name): work package, "
           "the lowest level, with an owner, duration and cost.", 9.5, SUB)
    s.text(M, ly + 21, f"{len(ROWS)} work packages in {len(LANES)} branches; 1.0 Project Management is the "
           "project-management branch.", 9.5, SUB)
    s.h_used = ly + 28
    assert s.h_used < H - 10, s.h_used
    return s, (A4W, A4H)


# ---------------------------------------------------------------- Figure 11.1 org chart
def fig_org():
    nodes, solid, dotted, ext = {}, [], [], set()
    with open(os.path.join(HERE, "org-chart.csv"), encoding="utf-8") as f:
        for r in csv.DictReader(f):
            nodes[r["ID"]] = (r["Title"], r["Subtitle"])
            if r["Outside team"] == "Yes": ext.add(r["ID"])
            if r["Parent"]: (solid if r["Link"] == "solid" else dotted).append((r["Parent"], r["ID"]))
    W = A4W
    s = Svg(W, 100)
    ty = title(s, "Figure 11.1", "Project organization chart. Solid lines show reporting; dotted lines show "
               "coordination with people outside the project team.", None, W)
    M, FS = 28, 10
    ncol = 6
    cw = (W - 2 * M - 5 * 12) / ncol
    X = lambda c: M + c * (cw + 12)
    pos = {}  # id -> (col, row, indent?)
    pos["SP"] = (2.5, 0)   # centred over the four team columns 1..4
    pos["DPO"] = (0, 0); pos["CDW"] = (5, 0)
    pos["PM"] = (2.5, 1); pos["MT"] = (5, 1)
    pos["BA"] = (1, 2); pos["CC"] = (2, 2); pos["DA"] = (3, 2); pos["DB"] = (4, 2); pos["PC"] = (0, 2)
    kids = {"BA": ["UX", "QA"], "CC": ["CR", "TR"]}
    for p, ks in kids.items():
        for i, k in enumerate(ks): pos[k] = (pos[p][0], 3 + i)
    assert set(pos) == set(nodes), set(nodes) ^ set(pos)
    for a, b in solid + dotted:
        assert a in pos and b in pos
    BH = 58
    rowy = lambda r: ty + 22 + r * (BH + 26)
    box = {}
    for k, (c, r) in pos.items():
        indent = 14 if k in sum(kids.values(), []) else 0
        w = cw if (c != 2.5) else cw + 30
        x = X(c) + indent if c != 2.5 else X(2.5) - 15
        w = w - indent - (22 if k == "PC" else 0)
        box[k] = (x, rowy(r), w, BH)

    def draw(k):
        x, y, w, h = box[k]
        external = k in ext
        title_, sub = nodes[k]
        s.rect(x, y, w, h, "#ffffff" if external else "#eef0f2", INK if not external else SUB, 1.2 if not external else 1,
               3, dash="4 3" if external else None)
        tl = wrap(title_, FS, w - 10, True)
        sl = wrap(sub, 9, w - 10)
        total = len(tl) * 11.5 + len(sl) * 10.5
        yy = y + (h - total) / 2 + 9.5
        for l in tl:
            s.text(x + w / 2, yy, l, FS, INK, True, "middle"); yy += 11.5
        for l in sl:
            s.text(x + w / 2, yy - 1, l, 9, SUB, False, "middle"); yy += 10.5
        return
    cx = lambda k: box[k][0] + box[k][2] / 2
    bot = lambda k: box[k][1] + box[k][3]
    # solid lines
    byp = {}
    for a, b in solid: byp.setdefault(a, []).append(b)
    for a, bs in byp.items():
        ts = [b for b in bs if b not in sum(kids.values(), [])]
        if a in kids:
            sx = box[a][0] + 7
            s.line(sx, bot(a), sx, box[bs[-1]][1] + BH / 2, INK, 1.2)
            for b in bs: s.line(sx, box[b][1] + BH / 2, box[b][0], box[b][1] + BH / 2, INK, 1.2)
        else:
            ymid = bot(a) + 13
            s.line(cx(a), bot(a), cx(a), ymid, INK, 1.2)
            xs = [cx(b) for b in ts]
            s.line(min(xs + [cx(a)]), ymid, max(xs + [cx(a)]), ymid, INK, 1.2)
            for b in ts: s.line(cx(b), ymid, cx(b), box[b][1], INK, 1.2)
    # dotted lines (all are horizontal neighbours)
    for a, b in dotted:
        ya = box[a][1] + BH / 2
        yb = box[b][1] + BH / 2
        assert abs(ya - yb) < 1
        xa, xb = (box[a][0] + box[a][2], box[b][0]) if box[a][0] < box[b][0] else (box[a][0], box[b][0] + box[b][2])
        s.line(xa, ya, xb, yb, SUB, 1.2, "2 3", 'stroke-linecap="round"')
    for k in box: draw(k)
    ly = rowy(4) + BH + 22
    s.rect(M, ly - 9, 24, 12, "#eef0f2", INK, 1.2, 2); s.text(M + 30, ly + 1, "Project team", 9.5, SUB)
    s.rect(M + 120, ly - 9, 24, 12, "#fff", SUB, 1, 2, dash="4 3"); s.text(M + 150, ly + 1, "Outside the project team", 9.5, SUB)
    s.line(M + 290, ly - 3, M + 316, ly - 3, INK, 1.2); s.text(M + 322, ly + 1, "Reports to", 9.5, SUB)
    s.line(M + 390, ly - 3, M + 416, ly - 3, SUB, 1.2, "2 3", 'stroke-linecap="round"'); s.text(M + 422, ly + 1, "Coordinates with", 9.5, SUB)
    s.h = ly + 20
    return s


# ---------------------------------------------------------------- Figure 8.2 Gantt + S-curve
def fig_gantt():
    W = A4W
    s = Svg(W, A4H)
    ty = title(s, "Figure 8.2", "Schedule and cost baseline on one time axis: Gantt chart by WBS branch (top) and "
               "cumulative planned cost against the budget (bottom).", None, W)
    LBL, RM = 28, 28
    X0, X1 = 292, W - RM
    d0, d1 = dt.date(2027, 1, 1), dt.date(2027, 9, 1)
    xd = lambda d: X0 + (d - d0).days / (d1 - d0).days * (X1 - X0)
    # legend
    ly = ty + 16
    s.rect(LBL, ly - 8, 22, 8, CRIT, CRIT, 1.4); s.text(LBL + 27, ly, "Critical path", 9, SUB)
    s.rect(LBL + 95, ly - 8, 22, 8, NC, NC_S, 1); s.text(LBL + 122, ly, "Not critical", 9, SUB)
    s.rect(LBL + 185, ly - 8, 22, 8, "#ffffff", NC_S, 1, 0, "3 2"); s.text(LBL + 212, ly, "Level of effort", 9, SUB)
    s.add(f'<path d="M{LBL + 295},{ly - 9} l5,5 l-5,5 l-5,-5 Z" fill="{INK}"/>'); s.text(LBL + 305, ly, "Milestone", 9, SUB)
    s.line(LBL + 360, ly - 4, LBL + 390, ly - 4, CRIT, 1.2, "5 3"); s.text(LBL + 395, ly, "Budget with contingency", 9, SUB)
    top = ly + 12
    # month header
    months = [dt.date(2027, m, 1) for m in range(1, 9)]
    for i, m in enumerate(months):
        nx = months[i + 1] if i < 7 else d1
        s.text((xd(m) + xd(nx)) / 2, top + 9, f"{m:%b}", 9, SUB, True, "middle")
    s.text(X0 - 5, top + 9, "2027", 8.5, SUB, False, "end")
    gy0 = top + 14
    RH = 11.1
    ms_rows = len(MILESTONES)
    nrows = len(LANES) + len(ROWS) + 1 + ms_rows
    gy1 = gy0 + nrows * RH
    for i, m in enumerate(months + [d1]):
        s.line(xd(m), gy0, xd(m), gy1, LINE, 0.6)
    y = gy0
    bars = []
    for l in LANES:
        s.rect(LBL - 4, y, X1 - LBL + 4, RH, BAND)
        s.text(LBL, y + RH - 2.6, LANE_NAME[l], 8.8, INK, True)
        y += RH
        for r in [r for r in ROWS if r["id"].startswith(l + ".")]:
            lab = f'{r["id"]}  {r["name"]}'
            s.text(LBL + 8, y + RH - 2.8, lab, 8.3, INK if r["crit"] else "#333333", r["crit"])
            x0, x1 = xd(r["start"]), xd(r["fin"] + dt.timedelta(1))
            if r["float"] is None:
                s.rect(x0, y + 2, x1 - x0, RH - 4, "#ffffff", NC_S, 0.8, 0, "3 2")
            elif r["crit"]:
                s.rect(x0, y + 1.6, max(x1 - x0, 1.5), RH - 3.2, CRIT, CRIT, 1)
            else:
                s.rect(x0, y + 2, max(x1 - x0, 1.5), RH - 4, NC, NC_S, 0.8)
            y += RH
    s.rect(LBL - 4, y, X1 - LBL + 4, RH, BAND)
    s.text(LBL, y + RH - 2.6, "Milestones", 8.8, INK, True)
    y += RH
    for name, d in MILESTONES:
        s.text(LBL + 8, y + RH - 2.8, name, 8.3, INK)
        cx, cy = xd(d + dt.timedelta(0.5)), y + RH / 2
        s.add(f'<path d="M{cx:.1f},{cy - 4.3:.1f} l4.3,4.3 l-4.3,4.3 l-4.3,-4.3 Z" fill="{INK}"/>')
        if cx > X1 - 70: s.text(cx - 7, y + RH - 2.8, fmt(d), 7.6, SUB, False, "end")
        else: s.text(cx + 7, y + RH - 2.8, fmt(d), 7.6, SUB)
        y += RH
    s.line(LBL - 4, gy1, X1, gy1, INK, 0.8)
    s.line(LBL - 4, gy0, X1, gy0, INK, 0.8)
    s.text(X1, gy1 + 11, f"{TOTAL_DAYS} working days, {fmt(PROJ_START)} to {fmt(PROJ_END)}", 8.3, SUB, False, "end")
    # ---- S-curve
    cy0 = gy1 + 34
    chh = 175
    cy1 = cy0 + chh
    s.text(LBL, cy0 - 12, "Cumulative planned cost (₱)", 10, INK, True)
    ymax = 1_200_000
    yv = lambda v: cy1 - v / ymax * chh
    for i, m in enumerate(months + [d1]):
        s.line(xd(m), cy0, xd(m), cy1, LINE, 0.6)
    for v in range(0, ymax + 1, 200_000):
        s.line(X0, yv(v), X1, yv(v), LINE if v else INK, 0.6 if v else 0.9)
        s.text(X0 - 5, yv(v) + 3, peso(v), 8.3, SUB, False, "end")
    for i, m in enumerate(months):
        nx = months[i + 1] if i < 7 else d1
        s.text((xd(m) + xd(nx)) / 2, cy1 + 11, f"{m:%b}", 9, SUB, True, "middle")
    s.text(X0 - 5, cy1 + 11, "2027", 8.5, SUB, False, "end")
    # baseline line
    pts = [(PROJ_START, 0)]
    for (mo, _, cum) in MONTHS:
        y_, m_ = map(int, mo.split("-"))
        end = (dt.date(y_ + (m_ == 12), m_ % 12 + 1, 1) - dt.timedelta(1))
        pts.append((min(end, PROJ_END), cum))
    s.line(X0, yv(BUDGET), X1, yv(BUDGET), CRIT, 1.3, "6 3")
    s.text(X0 + 4, yv(BUDGET) - 4, f"Budget with contingency {peso(BUDGET)}", 8.8, CRIT, True)
    s.path("M" + " L".join(f"{xd(d):.1f},{yv(v):.1f}" for d, v in pts), "none", INK, 2)
    for i, (d, v) in enumerate(pts):
        s.add(f'<circle cx="{xd(d):.1f}" cy="{yv(v):.1f}" r="2.6" fill="#fff" stroke="{INK}" stroke-width="1.3"/>')
        if i == 0: continue
        if i == len(pts) - 1:
            s.text(xd(d) - 6, yv(v) + 50, f"Baseline {peso(v)}", 8.8, INK, True, "end")
        else:
            s.text(xd(d) + 3, yv(v) + (12 if i < len(pts) - 3 else 12), peso(v), 7.8, SUB)
    s.text(X1, cy1 + 23, f"Baseline excludes the contingency reserve; budget = baseline + 10%", 7.8, SUB, False, "end")
    s.h_used = cy1 + 30
    assert s.h_used < A4H - 8, s.h_used
    return s


# ---------------------------------------------------------------- Figure 8.1 network
def fig_network():
    W, H = A4H, A4W  # landscape
    s = Svg(W, H)
    ty = title(s, "Figure 8.1", "Network diagram (activity on node): swimlane per WBS branch, columns by dependency "
               "depth. Red heavy path = critical path.", None, W)
    # --- depth and lanes
    net = [r for r in ROWS if r["float"] is not None]
    loe = [r for r in ROWS if r["float"] is None]
    depth = {}
    for r in sorted(net, key=lambda r: r["id"]): pass
    def dep(i):
        if i not in depth:
            depth[i] = 1 + max([dep(p) for p in BY[i]["pred"]] + [-1])
        return depth[i]
    for r in net: dep(r["id"])
    ncol = max(depth.values()) + 1
    lane_of = {r["id"]: LANES.index(r["id"].split(".")[0]) for r in net}
    # critical edges: both ends critical and successor starts the next working day after predecessor finishes
    edges = [(p, r["id"]) for r in net for p in r["pred"]]
    cedges = {(p, t) for p, t in edges if p in CRIT_IDS and t in CRIT_IDS and BY[t]["start"] == nextwd(BY[p]["fin"])}
    for t in CRIT_IDS - {"1.1.1"}:
        assert any(e[1] == t for e in cedges), t
    assert {e[0] for e in cedges} | {e[1] for e in cedges} == CRIT_IDS
    # sub-rows inside lanes
    sub, occ = {}, {}
    lane_has_crit = {l: any(i in CRIT_IDS for i in lane_of if lane_of[i] == l) for l in range(len(LANES))}
    for i in sorted(lane_of, key=lambda i: (depth[i], i not in CRIT_IDS, i)):
        l = lane_of[i]
        start = 0 if i in CRIT_IDS or not lane_has_crit[l] else 1
        pr = [sub[p] for p in BY[i]["pred"] if p in sub and lane_of[p] == l]
        cand = [k for k in range(start, 9) if (l, depth[i], k) not in occ]
        k = next((c for c in pr if c in cand), cand[0])
        sub[i] = k; occ[(l, depth[i], k)] = i
    lanek = [max([sub[i] for i in lane_of if lane_of[i] == l] + [0]) + 1 for l in range(len(LANES))]
    # geometry
    LBLW, MX = 84, 16
    NW, NH, SG = 41, 22, 2
    px0 = MX + LBLW
    pitch = (W - MX - px0) / ncol
    NW = pitch - 12
    cx0 = lambda c: px0 + c * pitch                 # node left
    gapx = lambda g: (cx0(g) + NW, cx0(g + 1))       # gap between column g and g+1

    # --- routing topology (nominal geometry for ordering)
    def bound_for(a, b):
        la, lb = lane_of[a], lane_of[b]
        if lb > la: return lb
        if lb < la: return lb + 1
        return la + 1
    nomg = lambda b: b * 14 + sum(lanek[:b]) * (NH + SG)
    nomy = lambda i: nomg(lane_of[i]) + 7 + sub[i] * (NH + SG) + NH / 2
    R = []
    for p, t in edges:
        e = dict(p=p, t=t, cs=depth[p], ct=depth[t], crit=(p, t) in cedges)
        e["direct"] = e["ct"] == e["cs"] + 1
        e["b"] = None if e["direct"] else bound_for(p, t)
        e["key_out"] = nomy(t) if e["direct"] else nomg(e["b"])
        e["key_in"] = nomy(p) if e["direct"] else nomg(e["b"])
        R.append(e)
    # ports
    for i in lane_of:
        for side, keyname, sel in (("out", "key_out", lambda e: e["p"] == i), ("in", "key_in", lambda e: e["t"] == i)):
            es = sorted([e for e in R if sel(e)], key=lambda e: (e[keyname], e["t"] if side == "out" else e["p"]))
            for k, e in enumerate(es): e[f"{side}_port"] = (k + 1) / (len(es) + 1)

    def tracks(items):  # items: (lo, hi, ref) -> assign track index; return count
        n = 0; last = []
        for lo, hi, ref in sorted(items, key=lambda x: (x[0], x[1])):
            for k, end in enumerate(last):
                if lo > end:
                    last[k] = hi; ref["trk"] = k; break
            else:
                last.append(hi); ref["trk"] = len(last) - 1
        return len(last)
    vch, hch = {}, {}
    for e in R:
        yo = nomy(e["p"]) - NH / 2 + e["out_port"] * NH
        yi = nomy(e["t"]) - NH / 2 + e["in_port"] * NH
        if e["direct"]:
            e["v1"] = {}; vch.setdefault(e["cs"], []).append((min(yo, yi) - 1, max(yo, yi) + 1, e["v1"]))
        else:
            yg = nomg(e["b"]) + 5
            e["v1"], e["v2"], e["h"] = {}, {}, {}
            vch.setdefault(e["cs"], []).append((min(yo, yg) - 1, max(yo, yg) + 1, e["v1"]))
            vch.setdefault(e["ct"] - 1, []).append((min(yi, yg) - 1, max(yi, yg) + 1, e["v2"]))
            hch.setdefault(e["b"], []).append((e["cs"], e["ct"] - 1, e["h"]))
    vcount = {g: tracks(v) for g, v in vch.items()}
    # horizontal tracks: gap-index intervals; touching intervals share a gap column so need distinct tracks
    hcount = {b: tracks([(lo, hi, ref) for lo, hi, ref in v]) for b, v in hch.items()}
    SP = 2.7
    gutter_h = lambda b: max(6, hcount.get(b, 0) * SP + 6)
    # real y coordinates
    gtop, y = {}, ty + 8
    lane_y = {}
    for l in range(len(LANES) + 1):
        gtop[l] = y
        y += gutter_h(l)
        if l < len(LANES):
            lane_y[l] = y
            y += lanek[l] * (NH + SG) - SG
    plot_bottom = y
    ny = lambda i: lane_y[lane_of[i]] + sub[i] * (NH + SG)
    # lane bands
    for l in range(len(LANES)):
        top = lane_y[l] - 3
        hgt = lanek[l] * (NH + SG) - SG + 6
        s.rect(MX, top, W - 2 * MX, hgt, BAND if l % 2 == 0 else "#fafafa", "none")
        s.text(MX + 4, lane_y[l] + 9, LANE_NAME[l and LANES[l]] if False else LANE_NAME[LANES[l]].split(" ", 1)[0], 10, INK, True)
        nm = wrap(LANE_NAME[LANES[l]].split(" ", 1)[1], 8.4, LBLW - 8)
        for k, t in enumerate(nm): s.text(MX + 4, lane_y[l] + 19 + k * 9.6, t, 8.4, SUB)
    # column guides
    for c in range(ncol):
        s.text(cx0(c) + NW / 2, plot_bottom + 9, str(c + 1), 7, MUTE, False, "middle")
    s.text(px0 - 4, plot_bottom + 9, "Depth:", 7, MUTE, False, "end")
    # gap x for tracks
    def vx(g, trk):
        a, b = gapx(g); n = vcount[g]
        return a + (b - a) * (trk + 1) / (n + 1)
    def hy(b, trk):
        n = hcount[b]
        return gtop[b] + gutter_h(b) * (trk + 1) / (n + 1)
    # edges
    paths = []
    for e in R:
        p, t = e["p"], e["t"]
        yo = ny(p) + e["out_port"] * NH
        yi = ny(t) + e["in_port"] * NH
        xo = cx0(depth[p]) + NW
        xi = cx0(depth[t])
        if e["direct"]:
            x = vx(e["cs"], e["v1"]["trk"])
            pts = [(xo, yo), (x, yo), (x, yi), (xi, yi)]
        else:
            x1 = vx(e["cs"], e["v1"]["trk"]); x2 = vx(e["ct"] - 1, e["v2"]["trk"]); yh = hy(e["b"], e["h"]["trk"])
            pts = [(xo, yo), (x1, yo), (x1, yh), (x2, yh), (x2, yi), (xi, yi)]
        paths.append((e["crit"], pts))
    for crit in (False, True):
        for c, pts in paths:
            if c != crit: continue
            d = "M" + " L".join(f"{x:.1f},{y:.1f}" for x, y in pts)
            col, sw = (CRIT, 1.9) if crit else ("#b4b4b4", 0.6)
            s.path(d, "none", col, sw, None, 'stroke-linejoin="round"')
            x, y = pts[-1]
            a = 3.4 if crit else 2.6
            s.add(f'<path d="M{x:.1f},{y:.1f} l{-a * 1.6:.1f},{-a * .8:.1f} v{a * 1.6:.1f} Z" fill="{col}"/>')
    # nodes
    for i in lane_of:
        r = BY[i]; x, y = cx0(depth[i]), ny(i)
        c = i in CRIT_IDS
        s.rect(x, y, NW, NH, CRIT if c else "#ffffff", CRIT if c else NC_S, 1.4 if c else 0.8, 2)
        fc = "#ffffff" if c else INK
        s.text(x + NW / 2, y + 9.8, i, 9.4, fc, True, "middle")  # 9.4 px = 7 pt at A4
        s.text(x + NW / 2, y + 19, f'{r["dur"]}d F{r["float"]}', 8.2, "#ffffff" if c else SUB, False, "middle")
    # LOE bar
    FK = 9.4  # key / legend font: 9.4 px = 7 pt at A4 landscape
    yb = plot_bottom + 14
    s.rect(px0, yb, W - MX - px0, 13, "#ffffff", NC_S, 0.8, 0, "3 2")
    s.text(MX, yb + 10, "Level of effort", FK, SUB, True)
    ids = " and ".join(r["id"] for r in loe)
    s.text(px0 + 6, yb + 10, f'{ids}: monitoring and control, {loe[0]["dur"]} working days '
           f'({fmt(loe[0]["start"])} to {fmt(loe[0]["fin"])}), no dependencies', FK, SUB)
    # key (names): three columns, id + full name
    ky = yb + 26
    s.line(MX, ky - 8, W - MX, ky - 8, INK, 0.8)
    items = [r for r in net]
    ncols = 4
    per = -(-len(items) // ncols)
    colw = (W - 2 * MX) / ncols
    KH = 10.8
    for k, r in enumerate(items):
        cx, cy = MX + (k // per) * colw, ky + 4 + (k % per) * KH
        c = r["id"] in CRIT_IDS
        s.text(cx, cy, r["id"], FK, CRIT if c else SUB, True)
        s.text(cx + 28, cy, fit(r["name"], FK, colw - 36, c), FK, INK, c)
    ky2 = ky + 4 + per * KH + 6
    s.line(MX, ky2 - 6, W - MX, ky2 - 6, LINE, 0.6)
    # legend + total
    x = MX
    def item(draw, label):
        nonlocal x
        draw(x); s.text(x + 32, ky2 + 9, label, FK, SUB); x += 32 + tw(label, FK) + 18
    item(lambda x: s.rect(x, ky2, 26, 11, CRIT, CRIT, 1.4, 2), "Critical activity")
    item(lambda x: s.rect(x, ky2, 26, 11, "#fff", NC_S, 0.8, 2), "Other activity")
    item(lambda x: s.line(x, ky2 + 5.5, x + 26, ky2 + 5.5, CRIT, 1.9), "Critical dependency")
    item(lambda x: s.line(x, ky2 + 5.5, x + 26, ky2 + 5.5, "#a9a9a9", 0.7), "Other dependency")
    s.text(x, ky2 + 9, "In each box:  id,  duration in working days (d),  total float (F)", FK, SUB)
    s.text(W - MX, ky2 + 24, f"Critical path: {len(CRIT_IDS)} activities, {TOTAL_DAYS} working days, finish {fmt(PROJ_END)}",
           10.5, CRIT, True, "end")
    s.text(MX, ky2 + 24, "Note: arrows are finish-to-start; edges run in the channels between boxes and lanes.", 8.8, SUB)
    s.h_used = ky2 + 30
    print("net used", s.h_used, "plot_bottom", plot_bottom, "vcount", vcount, "hcount", hcount, lanek); assert s.h_used < H - 4, s.h_used
    return s


# ---------------------------------------------------------------- output
def find_chrome():
    c = os.environ.get("CHROME")
    cand = [c] if c else []
    cand += glob.glob(os.path.expanduser("~/.cache/puppeteer/chrome-headless-shell/*/*/chrome-headless-shell"))
    cand += [shutil.which(n) for n in ("chrome-headless-shell", "google-chrome", "chromium", "chromium-browser")]
    return next((x for x in cand if x and os.path.exists(x)), None)


def to_png(svg, png, w, h):
    chrome = find_chrome()
    if chrome:
        with tempfile.TemporaryDirectory() as td:
            html = os.path.join(td, "p.html")
            with open(html, "w") as f:
                f.write(f'<html><body style="margin:0"><img src="file://{svg}" '
                        f'style="display:block;width:{w}px;height:{h}px"></body></html>')
            subprocess.run([chrome, "--no-sandbox", "--hide-scrollbars", "--force-device-scale-factor=1",
                            f"--window-size={w},{h}", f"--screenshot={png}", "file://" + html],
                           check=True, capture_output=True)
        return True
    cv = shutil.which("convert")
    if cv:
        subprocess.run([cv, "-density", "300", svg, "-resize", f"{w}x{h}!", png], check=True)
        return True
    print("no browser or ImageMagick: PNG skipped for", svg)
    return False


def main():
    os.makedirs(OUT, exist_ok=True)
    figs = [("fig-7-1-wbs", fig_wbs()[0], (2480, 3508)), ("fig-8-1-network", fig_network(), (3508, 2480)),
            ("fig-8-2-gantt-cost", fig_gantt(), (2480, 3508)), ("fig-11-1-org-chart", fig_org(), None)]
    for name, s, px in figs:
        svg = os.path.join(OUT, name + ".svg")
        if px is None:  # org chart: A4 width, height as needed
            s.h = s.h; s.save(svg, (210, s.h * 25.4 / 96))
            px = (2480, round(s.h / A4W * 2480))
        else:
            s.save(svg, (210, 297) if px[0] < px[1] else (297, 210))
        # crop-free: svg viewBox equals the page, so the png matches the page exactly
        to_png(svg, os.path.join(OUT, name + ".png"), *px)
        print("wrote", name)


if __name__ == "__main__":
    main()
