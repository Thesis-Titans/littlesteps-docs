"""CIT 246 plan model: WBS, CPM schedule and bottom-up cost baseline.

Usage: python3 schedule_model.py <output-folder>. Writes the CSV files in this folder and a model.json used to generate sections 7-9.
"""
import csv, datetime as dt, json, os, sys
from collections import defaultdict

START = dt.date(2027, 1, 4)
HOLIDAYS = {
    dt.date(2027, 4, 1): "Maundy Thursday",
    dt.date(2027, 4, 2): "Good Friday",
    dt.date(2027, 4, 9): "Araw ng Kagitingan",
    dt.date(2027, 8, 25): "Iloilo City Charter Day",
}
# Daily rates in pesos (monthly rate / 22 working days, rounded to the nearest 5)
RATES = {"PM": 1820, "BA": 1365, "CC": 1275, "DEV": 1365, "UX": 1365, "QA": 1135}
ROLE_NAMES = {
    "PM": "Project manager (₱40,000/month)",
    "BA": "Business analyst and quality lead (₱30,000/month)",
    "CC": "Stakeholder and content coordinator (₱28,000/month)",
    "DEV": "Flutter and backend developer, each (₱30,000/month)",
    "UX": "UI/UX designer (₱30,000/month)",
    "QA": "QA tester (₱25,000/month)",
}

# id, name, duration (working days), predecessors, resources {role: FTE}, other costs [(label, amount)], basis
WP = [
 # 1.0 Project management (1.3 is level of effort, costed separately)
 ("1.1.1","Project charter and sponsor sign-off",5,[],{"PM":1,"BA":.5},[],"Analogous: charter work on past course projects"),
 ("1.1.2","Stakeholder register and analysis",5,[],{"CC":1,"PM":.2},[],"Analogous"),
 ("1.2.1","Scope statement and WBS",5,["1.1.1"],{"PM":.8,"BA":.8},[],"Analogous"),
 ("1.2.2","Schedule, cost baseline and subsidiary plans",5,["1.2.1","1.1.2"],{"PM":1,"BA":.3,"CC":.3},[],"Analogous"),
 ("1.4.1","Final acceptance and closure report",3,["8.3.2"],{"PM":1,"BA":.5},[],"Analogous"),
 ("1.4.2","Lessons learned and archive",2,["1.4.1"],{"PM":1,"BA":.5,"CC":.5},[],"Analogous"),
 # 2.0 Requirements and design
 ("2.1.1","Discovery interviews and baseline measures",10,["1.1.1"],{"BA":1,"CC":1,"PM":.2},[],"Parametric: 8 interviews at about 1 day each plus analysis"),
 ("2.1.2","Requirements specification (D1)",10,["2.1.1"],{"BA":1},[],"Parametric: 6 features plus supporting functions, about 1.5 days each"),
 ("2.2.1","Wireframes and design system",10,["2.1.1"],{"UX":1,"BA":.3},[],"Analogous: the course prototype's design system"),
 ("2.2.2","Clickable prototype and parent walkthrough (D2)",10,["2.2.1","2.1.2"],{"UX":1,"BA":.5,"CC":.3},[],"Analogous"),
 ("2.3.1","Privacy impact assessment draft",10,["2.1.2"],{"BA":.5,"PM":.2},[("Privacy consultant",50000)],"Expert judgment (consultant quote assumption)"),
 ("2.3.2","DPO review and approval (D3)",10,["2.3.1"],{"PM":.1},[],"Assumed DPO turnaround of two weeks"),
 # 3.0 Learning content catalog
 ("3.1.1","Source selection and reuse permissions",15,["2.1.1"],{"CC":1},[],"Parametric: about 12 candidate sources"),
 ("3.2.1","Adapt 80 activities, stories and rhymes",25,["3.1.1"],{"CC":1,"BA":.2},[],"Parametric: 80 items at about 3 hours each"),
 ("3.2.2","Translate items to Filipino and Hiligaynon",15,["3.2.1"],{"CC":.3},[("Translator: 160 item translations × ₱300",48000)],"Parametric: per-item translation rate"),
 ("3.3.1","Content reviewer sign-off (D4)",10,["3.2.1"],{"CC":.3},[("ECCD content reviewer: 80 items × ₱750",60000)],"Parametric: per-item review honorarium"),
 ("3.3.2","Load the reviewed catalog into the database",3,["3.3.1","3.2.2","4.3.1","5.3.2"],{"DEV":.5},[],"Analogous"),
 # 4.0 Backend
 ("4.1.1","API contract and data model",10,["2.1.1"],{"DEV":2},[],"Analogous: course API contract; drafted alongside the requirements"),
 ("4.1.2","Cloud project, environments and CI",3,["4.1.1"],{"DEV":1},[("Cloud and AI services during build and testing, 2 months × ₱5,000",10000)],"Analogous: reuses the course project's setup scripts"),
 ("4.2.1","Authentication and child profile service",10,["4.1.2"],{"DEV":1},[],"Analogous: course M1"),
 ("4.2.2","Activity planning and observation services",10,["4.2.1"],{"DEV":1},[],"Analogous: course M2"),
 ("4.3.1","Catalog service",8,["4.1.1"],{"DEV":1},[],"Analogous: course M2"),
 ("4.3.2","Journal and weekly summary services",10,["4.2.2"],{"DEV":1},[],"Analogous: course M3"),
 ("4.3.3","AI suggestion service and fallback",10,["4.3.2","4.3.1","2.3.2"],{"DEV":1},[],"Analogous: course M4"),
 # 5.0 Flutter app
 ("5.1.1","App project, theme and navigation",8,["2.2.1","4.3.1"],{"DEV":1},[],"Analogous: course Flutter setup"),
 ("5.1.2","Sign-in and API client",5,["5.1.1","4.2.1"],{"DEV":1},[],"Analogous"),
 ("5.2.1","Child profile screens",5,["5.1.2"],{"DEV":1},[],"Analogous"),
 ("5.2.2","Milestone observation screens",6,["5.2.1","4.2.2"],{"DEV":1},[],"Analogous"),
 ("5.3.1","Activity library screens",8,["5.2.2","4.3.1"],{"DEV":1},[],"Analogous"),
 ("5.3.2","Today and activity planning screens",7,["5.3.1"],{"DEV":1},[],"Analogous"),
 ("5.4.1","Private journal screens",6,["4.3.3","5.1.2"],{"DEV":1},[],"Analogous"),
 ("5.4.2","Weekly summary screens",4,["5.4.1"],{"DEV":1},[],"Analogous"),
 ("5.5.1","AI helper screens and fallback states",6,["5.4.2","2.2.2"],{"DEV":1},[],"Analogous"),
 # 6.0 Testing and quality
 ("6.1.1","Test plan and test cases",5,["2.1.2"],{"QA":1},[],"Parametric: about 60 test cases"),
 ("6.1.2","System and regression testing",10,["5.3.2","5.5.1","3.3.2","6.1.1"],{"QA":1,"DEV":1},[],"Parametric: 60 cases, two passes, plus fixes; features are also tested as each is finished"),
 ("6.2.1","Device and accessibility testing",6,["6.1.2"],{"QA":1,"UX":.3},[("Three entry-level Android test phones",30000)],"Parametric: 3 devices × core flows"),
 ("6.3.1","Security review and fixes",6,["6.1.2"],{"DEV":1,"PM":.1},[],"Expert judgment"),
 ("6.4.1","Usability testing and fixes",6,["6.1.2"],{"BA":1,"UX":.5,"DEV":.5},[],"Parametric: 6 sessions plus fixes"),
 # 7.0 Pilot
 ("7.1.1","Pilot onboarding at two centers",5,["6.2.1","6.3.1","6.4.1","8.1.1"],{"CC":1,"PM":.3},[("Onboarding printing, venue and snacks",20000)],"Parametric: two centers, two sessions each"),
 ("7.2.1","Eight-week pilot with support",40,["7.1.1"],{"CC":.5,"DEV":.5,"PM":.1},[("Cloud and AI services during the pilot and release, 4 months × ₱5,000",20000)],"Fixed by the pilot design: 8 weeks"),
 ("7.3.1","Pilot evaluation report (D8)",5,["7.2.1"],{"BA":1,"PM":.3},[],"Analogous"),
 # 8.0 Release, training and handover
 ("8.1.1","Training materials (D9)",10,["3.3.1","5.3.2","5.5.1"],{"CC":1,"UX":.3},[("Printing training materials",20000)],"Parametric: 2 guides × 3 languages"),
 ("8.1.2","CDW training sessions",2,["7.3.1"],{"CC":1,"PM":.3},[],"Parametric: two half-day sessions"),
 ("8.2.1","Post-pilot fixes",5,["7.3.1"],{"DEV":2,"QA":.5},[],"Expert judgment: top issues only; smaller fixes are made during the pilot"),
 ("8.2.2","Google Play release (D10)",3,["8.2.1"],{"DEV":.5,"PM":.2},[("Google Play developer registration (US$25)",1500)],"Analogous"),
 ("8.3.1","Handover package (D11)",5,["6.3.1","6.4.1"],{"DEV":1,"BA":.3},[],"Analogous; prepared during the pilot and updated at handover"),
 ("8.3.2","Maintainer training and handover sign-off",3,["8.2.2","8.3.1","8.1.2"],{"DEV":.5,"PM":.5,"CC":.3},[],"Parametric: 3 days of paired sessions"),
]
LEVEL2 = {
 "1.0":"Project Management","2.0":"Requirements and Design","3.0":"Learning Content Catalog","4.0":"Backend API and Database",
 "5.0":"Flutter Android App","6.0":"Testing and Quality","7.0":"Pilot","8.0":"Release, Training and Handover"}
LEVEL3 = {
 "1.1":"Initiation","1.2":"Planning","1.3":"Monitoring and Control","1.4":"Closing",
 "2.1":"Discovery and Requirements","2.2":"UI/UX Design","2.3":"Privacy",
 "3.1":"Sources and Permissions","3.2":"Adaptation and Translation","3.3":"Review and Loading",
 "4.1":"API Foundation","4.2":"Core Services","4.3":"Content, Reflection and AI Services",
 "5.1":"App Foundation","5.2":"Child and Observation Screens","5.3":"Library and Planning Screens","5.4":"Reflection Screens","5.5":"AI Helper Screens",
 "6.1":"Functional Testing","6.2":"Device and Accessibility Testing","6.3":"Security Review","6.4":"Usability Testing",
 "7.1":"Pilot Preparation","7.2":"Pilot Operation","7.3":"Pilot Evaluation",
 "8.1":"Training","8.2":"Release","8.3":"Handover"}

# --- calendar helpers (working day index 0 = START) ---
def workdays(n_max=400):
    days, d = [], START
    while len(days) < n_max:
        if d.weekday() < 5 and d not in HOLIDAYS:
            days.append(d)
        d += dt.timedelta(days=1)
    return days
DAYS = workdays()

# --- CPM ---
wp = {w[0]: dict(id=w[0], name=w[1], dur=w[2], pred=w[3], res=w[4], other=w[5], basis=w[6]) for w in WP}
order, seen = [], set()
def visit(i):
    if i in seen: return
    for p in wp[i]["pred"]: visit(p)
    seen.add(i); order.append(i)
for i in wp: visit(i)
for i in order:
    w = wp[i]; w["es"] = max([wp[p]["ef"] for p in w["pred"]], default=0); w["ef"] = w["es"] + w["dur"]
end = max(w["ef"] for w in wp.values())
succ = defaultdict(list)
for i, w in wp.items():
    for p in w["pred"]: succ[p].append(i)
for i in reversed(order):
    w = wp[i]; w["lf"] = min([wp[s]["ls"] for s in succ[i]], default=end); w["ls"] = w["lf"] - w["dur"]; w["float"] = w["ls"] - w["es"]
for w in wp.values():
    w["start"] = DAYS[w["es"]]; w["finish"] = DAYS[w["ef"] - 1]

# Critical path chain from start to end
crit = [i for i in order if wp[i]["float"] == 0]

# --- level-of-effort for 1.3 (from end of 1.2.2 to start of 1.4.1) ---
loe_start, loe_end = wp["1.2.2"]["ef"], wp["1.4.1"]["es"]
loe_days = loe_end - loe_start
LOE = [("1.3.1","Status reports, two-weekly demos and sponsor updates",{"PM":.3}),("1.3.2","Risk, issue and change control",{"PM":.1,"BA":.1})]

# --- costs ---
def labour(res, days): return sum(RATES[r] * f * days for r, f in res.items())
rows = []
for i in order:
    w = wp[i]
    lab = round(labour(w["res"], w["dur"])); oth = sum(a for _, a in w["other"])
    w["labour"], w["othercost"], w["cost"] = lab, oth, lab + oth
for lid, name, res in LOE:
    lab = round(labour(res, loe_days))
    wp[lid] = dict(id=lid, name=name, dur=loe_days, pred=[], res=res, other=[], basis="Level of effort across monitoring and control",
                   es=loe_start, ef=loe_end, float=None, start=DAYS[loe_start], finish=DAYS[loe_end-1], labour=lab, othercost=0, cost=lab)
ids = sorted(wp, key=lambda s: [int(x) for x in s.split(".")])
subtotal = sum(wp[i]["cost"] for i in ids)
contingency = round(subtotal * 0.10)
total = subtotal + contingency

# cost by month (spread each WP evenly over its working days)
monthly = defaultdict(float)
for i in ids:
    w = wp[i]; per = w["cost"] / w["dur"]
    for k in range(w["es"], w["ef"]):
        monthly[DAYS[k].strftime("%Y-%m")] += per

# developer load check
devload = defaultdict(float)
for i in ids:
    w = wp[i]
    for k in range(w["es"], w["ef"]): devload[k] += w["res"].get("DEV", 0)
peak = max(devload.values())
over = sorted(k for k, v in devload.items() if v > 2.0001)

out = sys.argv[1] if len(sys.argv) > 1 else "."
os.makedirs(out, exist_ok=True)
with open(os.path.join(out, "schedule-and-cost.csv"), "w", newline="") as f:
    cw = csv.writer(f)
    cw.writerow(["WBS","Work package","Duration (working days)","Predecessors","Start","Finish","Total float (days)","Critical","Resources (FTE)","Labour cost (PHP)","Other costs (PHP)","Total cost (PHP)","Estimate basis"])
    for i in ids:
        w = wp[i]
        cw.writerow([i, w["name"], w["dur"], " ".join(w["pred"]), w["start"].isoformat(), w["finish"].isoformat(),
                     "" if w["float"] is None else w["float"], "Yes" if w["float"] == 0 else "No",
                     "; ".join(f"{r} {v:g}" for r, v in w["res"].items()), w["labour"], w["othercost"], w["cost"], w["basis"]])
with open(os.path.join(out, "cost-baseline-by-month.csv"), "w", newline="") as f:
    cw = csv.writer(f); cw.writerow(["Month","Planned cost (PHP)","Cumulative (PHP)"]); cum = 0
    for m in sorted(monthly):
        cum += monthly[m]; cw.writerow([m, round(monthly[m]), round(cum)])

summary = dict(end=DAYS[end-1].isoformat(), workdays=end, crit=crit, subtotal=subtotal, contingency=contingency, total=total,
               peakdev=peak, overdays=[DAYS[k].isoformat() for k in over][:10], nover=len(over), loe_days=loe_days,
               monthly={m: round(v) for m, v in sorted(monthly.items())},
               l2={k: sum(wp[i]["cost"] for i in ids if i.startswith(k[0]+".")) for k in LEVEL2})
json.dump({"summary": summary, "wp": {i: {k: (v.isoformat() if isinstance(v, dt.date) else v) for k, v in wp[i].items()} for i in ids},
           "LEVEL2": LEVEL2, "LEVEL3": LEVEL3, "RATES": RATES, "ROLE_NAMES": ROLE_NAMES,
           "HOLIDAYS": {d.isoformat(): n for d, n in HOLIDAYS.items()}}, open(os.path.join(out, "model.json"), "w"), ensure_ascii=False, indent=1)
print(json.dumps(summary, indent=1, ensure_ascii=False))
