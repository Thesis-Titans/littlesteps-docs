#!/usr/bin/env python3
"""Build CIT246_FinalProject_ThesisTitans.docx from the Markdown source, then have
Microsoft Word update the table of contents and export the PDF, so the PDF is exactly
the DOCX. Needs pandoc, python-docx and Word on Windows (run from WSL)."""

import copy
import os
import re
import shutil
import subprocess

import docx
from docx.enum.section import WD_ORIENT
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_TAB_ALIGNMENT, WD_BREAK
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn
from docx.shared import Inches, Pt, RGBColor

HERE = os.path.dirname(os.path.abspath(__file__))
NAME = "CIT246_FinalProject_ThesisTitans"
MD, DOCX, PDF = (os.path.join(HERE, NAME + ext) for ext in (".md", ".docx", ".pdf"))
WIN_TMP_WSL = "/mnt/c/Users/markc/AppData/Local/Temp/cit246build"
WIN_TMP = r"C:\Users\markc\AppData\Local\Temp\cit246build"
POWERSHELL = "/mnt/c/Windows/System32/WindowsPowerShell/v1.0/powershell.exe"

NAVY, BLUE, INK, GREY = (RGBColor(0x1E, 0x3A, 0x8A), RGBColor(0x1E, 0x40, 0xAF),
                         RGBColor(0x1A, 0x1A, 0x1A), RGBColor(0x64, 0x74, 0x8B))
MARGIN = Inches(0.72)
A4_W, A4_H = Inches(8.27), Inches(11.69)
LETTERHEAD_HDR = os.path.join(HERE, "letters", "letterhead-header.png")
LETTERHEAD_FTR = os.path.join(HERE, "letters", "letterhead-footer.png")

# ---------------------------------------------------------------- 1. Markdown -> DOCX
tmp = os.path.join(HERE, "_pandoc.docx")
subprocess.run(["pandoc", MD, "-o", tmp, "--resource-path", HERE], check=True)
doc = docx.Document(tmp)
os.remove(tmp)
body = doc.element.body


def font(style_or_run, size=None, bold=None, italic=None, color=None):
    f = style_or_run.font
    f.name = "Arial"
    rpr = f.element.get_or_add_rPr() if hasattr(f, "element") else style_or_run.element.get_or_add_rPr()
    fonts = rpr.find(qn("w:rFonts"))
    if fonts is None:
        fonts = OxmlElement("w:rFonts"); rpr.insert(0, fonts)
    for k in ("w:ascii", "w:hAnsi", "w:cs", "w:eastAsia"):
        fonts.set(qn(k), "Arial")
    for k in ("w:asciiTheme", "w:hAnsiTheme", "w:cstheme", "w:eastAsiaTheme"):
        fonts.attrib.pop(qn(k), None)
    if size: f.size = Pt(size)
    if bold is not None: f.bold = bold
    if italic is not None: f.italic = italic
    if color is not None: f.color.rgb = color


# ---------------------------------------------------------------- 2. styles
st = doc.styles
for name in ("Normal", "Body Text", "First Paragraph", "Compact"):
    if name in st:
        font(st[name], 9.5, color=INK)
        pf = st[name].paragraph_format
        pf.space_before, pf.space_after, pf.line_spacing = Pt(0), Pt(4), 1.08
st["Compact"].paragraph_format.space_after = Pt(1.5)
for name, size, color, before, after in (("Heading 1", 15.5, NAVY, 16, 7), ("Heading 2", 12, BLUE, 10, 3.5),
                                         ("Heading 3", 10.5, INK, 7, 2.5), ("Heading 4", 9.5, INK, 5, 2)):
    font(st[name], size, bold=True, italic=False, color=color)
    pf = st[name].paragraph_format
    pf.space_before, pf.space_after, pf.keep_with_next = Pt(before), Pt(after), True
for name in ("Title", "Subtitle"):
    font(st[name], 22 if name == "Title" else 11.5, bold=(name == "Title"), italic=(name == "Subtitle"),
         color=INK if name == "Title" else GREY)
    st[name].paragraph_format.alignment = WD_ALIGN_PARAGRAPH.CENTER
    for b in st[name].element.xpath(".//w:pBdr"):
        b.getparent().remove(b)
if "Block Text" in st:
    font(st["Block Text"], 9.5, italic=False, color=INK)
    st["Block Text"].paragraph_format.left_indent = Inches(0.35)
    st["Block Text"].paragraph_format.right_indent = Inches(0.35)
for name in ("Image Caption", "Table Caption", "Caption"):
    if name in st:
        font(st[name], 8.5, italic=True, color=GREY)
        st[name].paragraph_format.alignment = WD_ALIGN_PARAGRAPH.CENTER
for name in ("Hyperlink",):
    if name in st:
        font(st[name], color=BLUE)

paras = doc.paragraphs
idx = lambda pred: next(i for i, p in enumerate(paras) if pred(p))

# ---------------------------------------------------------------- 3. cover page
toc_i = idx(lambda p: p.text.strip() == "Table of Contents")
for i, p in enumerate(paras[:toc_i]):
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    t = p.text.strip()
    if p._p.xpath(".//w:drawing"):
        p.paragraph_format.space_before = Pt(42)
        p.paragraph_format.space_after = Pt(16)
        p.paragraph_format.line_spacing = 1.0
        p.paragraph_format.keep_with_next = False
    elif p.style.name == "Heading 1":
        p.style = st["Title"]
        p.paragraph_format.space_before, p.paragraph_format.space_after = Pt(6), Pt(6)
        p.paragraph_format.line_spacing = 1.15
        p.paragraph_format.keep_with_next = False
    elif p.style.name == "Heading 2":
        p.style = st["Subtitle"]
        p.paragraph_format.space_before, p.paragraph_format.space_after = Pt(0), Pt(28)
        p.paragraph_format.line_spacing = 1.2
        p.paragraph_format.keep_with_next = False
    else:
        is_date = t == "December 2, 2026"
        p.paragraph_format.space_before = Pt(34 if is_date else 0)
        p.paragraph_format.space_after = Pt(0 if is_date else 20)
        p.paragraph_format.line_spacing = 1.4
        for r in p.runs:
            r.font.name = "Arial"
            if is_date:
                r.font.size = Pt(10.5)
                r.font.color.rgb = GREY
            elif r.italic:
                r.font.size = Pt(9.5)
                r.font.color.rgb = GREY
            elif r.bold:
                r.font.size = Pt(10.5)
                r.font.color.rgb = INK
            else:
                r.font.size = Pt(10.5)
                r.font.color.rgb = GREY if r.text.strip().startswith(("Prepared for", "Submitted in Partial")) else INK

# ---------------------------------------------------------------- 4. Word table of contents
toc_head = paras[toc_i]
toc_head.paragraph_format.page_break_before = True
nxt = toc_head._p.getnext()
while nxt is not None and not (nxt.tag == qn("w:p") and nxt.xpath("./w:pPr/w:pStyle[starts-with(@w:val,'Heading')]")):
    after = nxt.getnext(); body.remove(nxt); nxt = after
fld = parse_xml(
    f'<w:p {nsdecls("w")}><w:r><w:fldChar w:fldCharType="begin"/></w:r>'
    '<w:r><w:instrText xml:space="preserve"> TOC \\o "1-1" \\h \\z \\u </w:instrText></w:r>'
    '<w:r><w:fldChar w:fldCharType="separate"/></w:r><w:r><w:t>Table of contents</w:t></w:r>'
    '<w:r><w:fldChar w:fldCharType="end"/></w:r></w:p>')
toc_head._p.addnext(fld)
for name in ("TOC 1", "TOC 2"):
    s = st[name] if name in st else st.add_style(name, 1)
    font(s, 10, bold=(name == "TOC 1"), color=INK)
    s.paragraph_format.space_after = Pt(1 if name == "TOC 2" else 3)
    s.paragraph_format.left_indent = Inches(0 if name == "TOC 1" else 0.25)

paras = doc.paragraphs
# ---------------------------------------------------------------- 5. page breaks before major document parts
# Keep page count within the brief's 25-40 page limit by breaking only before key standalone sections
MAJOR_BREAKS = ("2. ", "3. ", "7. ", "8. ", "17. ")
for p in paras:
    if p.style.name == "Heading 1" and p.text.strip().startswith(MAJOR_BREAKS):
        p.paragraph_format.page_break_before = True
        p.paragraph_format.space_before = Pt(0)
    if p.style.name == "Heading 2" and p.text.strip().startswith(("Appendix E",)):
        p.paragraph_format.page_break_before = True

# ---------------------------------------------------------------- 6. tables
for t in doc.tables:
    tblPr = t._tbl.tblPr
    for tag in ("w:tblW", "w:tblLayout", "w:tblBorders", "w:tblCellMar", "w:tblStyle"):
        for e in tblPr.findall(qn(tag)): tblPr.remove(e)
    tblPr.append(parse_xml(f'<w:tblW {nsdecls("w")} w:w="5000" w:type="pct"/>'))
    tblPr.append(parse_xml(
        f'<w:tblBorders {nsdecls("w")}>' + "".join(
            f'<w:{s} w:val="single" w:sz="4" w:space="0" w:color="B8C2CC"/>'
            for s in ("top", "left", "bottom", "right", "insideH", "insideV")) + "</w:tblBorders>"))
    tblPr.append(parse_xml(f'<w:tblCellMar {nsdecls("w")}><w:top w:w="26" w:type="dxa"/><w:left w:w="65" w:type="dxa"/>'
                           '<w:bottom w:w="26" w:type="dxa"/><w:right w:w="65" w:type="dxa"/></w:tblCellMar>'))
    wide = len(t.columns) >= 8
    for ri, row in enumerate(t.rows):
        trPr = row._tr.get_or_add_trPr()
        trPr.append(parse_xml(f'<w:cantSplit {nsdecls("w")}/>'))
        if ri == 0:
            trPr.append(parse_xml(f'<w:tblHeader {nsdecls("w")}/>'))
        for c in row.cells:
            tcPr = c._tc.get_or_add_tcPr()
            if ri == 0:
                tcPr.append(parse_xml(f'<w:shd {nsdecls("w")} w:val="clear" w:color="auto" w:fill="1E3A8A"/>'))
            elif ri % 2 == 0:
                tcPr.append(parse_xml(f'<w:shd {nsdecls("w")} w:val="clear" w:color="auto" w:fill="F3F5F8"/>'))
            for p in c.paragraphs:
                p.paragraph_format.space_before, p.paragraph_format.space_after = Pt(0), Pt(0)
                p.paragraph_format.line_spacing = 1.0
                if ri == 0:
                    p.paragraph_format.keep_with_next = True
                for r in p.runs:
                    r.font.name = "Arial"
                    r.font.size = Pt(7.5 if wide else 8)
                    if ri == 0:
                        r.font.bold = True; r.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)

# ---------------------------------------------------------------- 7. images fit the text area
def scale_shape(shp, max_w, max_h, allow_upscale=False):
    w, h = shp.width, shp.height
    k = min(max_w / w, max_h / h) if allow_upscale else min(1.0, max_w / w, max_h / h)
    shp.width, shp.height = int(w * k), int(h * k)

port_w = A4_W - 2 * MARGIN
land_w, land_h = A4_H - Inches(1.1), A4_W - Inches(2.0)
for si, shp in enumerate(doc.inline_shapes):
    w, h = shp.width, shp.height
    if si == 0 and abs(w - h) < w * 0.05:
        # Centered LittleSteps rounded app logo on cover page
        scale_shape(shp, Inches(1.30), Inches(1.30))
    elif si > 0 and w > h and (w / h) > 1.35 and (w / h) < 1.50:
        # Landscape A4 figure (Figure 8.1 Network Diagram)
        scale_shape(shp, land_w, land_h, allow_upscale=True)
    else:
        scale_shape(shp, port_w, Inches(9.2))

for p in doc.paragraphs:
    if p._p.xpath(".//w:drawing"):
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        if p.text.strip() or p._p.getnext() is not None:
            # Keep figure attached to its caption (skip cover page images handled above)
            if p not in doc.paragraphs[:toc_i]:
                p.paragraph_format.keep_with_next = True

# ---------------------------------------------------------------- 8. sections: portrait, landscape Fig 8.1, portrait, landscape Appendix D.1, portrait
paras = doc.paragraphs
base = doc.sections[-1]._sectPr
base.append(parse_xml(f'<w:pgSz {nsdecls("w")} w:w="11906" w:h="16838"/>')) if base.find(qn("w:pgSz")) is None else None

def insert_landscape_window(start_idx, end_idx):
    """Wrap paragraphs [start_idx .. end_idx-1] in a landscape section."""
    paras[start_idx - 1]._p.get_or_add_pPr().append(copy.deepcopy(base))
    end_land = parse_xml(f'<w:p {nsdecls("w")}><w:pPr/></w:p>')
    paras[end_idx]._p.addprevious(end_land)
    end_land.find(qn("w:pPr")).append(copy.deepcopy(base))
    paras[start_idx - 1].paragraph_format.page_break_before = False
    paras[end_idx].paragraph_format.page_break_before = False

# Landscape window 1: Figure 8.1 Network Diagram image + captions
f81_cap = idx(lambda p: p.text.strip().startswith("Figure 8.1. Network diagram by WBS branch"))
f81_img = next(i for i in range(f81_cap - 1, -1, -1) if paras[i]._p.xpath(".//w:drawing"))
f81_after = f81_cap + 1
insert_landscape_window(f81_img, f81_after)

# Refresh paragraphs after inserting end-of-section marker
paras = doc.paragraphs
# Landscape window 2: Appendix D.1 Cost by Work Package
d1 = idx(lambda p: p.text.strip() == "D.1 Cost by Work Package")
ae = idx(lambda p: p.text.strip() == "Appendix E. References")
insert_landscape_window(d1, ae)

def header_footer(sec, text_w):
    for part, left, right in ((sec.header, "LittleSteps: Project Management Plan", "Thesis Titans | BSIT 3A-SDT"),
                              (sec.footer, "CSWDO La Paz–Lapuz District Office | WVSU CICT", None)):
        part.is_linked_to_previous = False
        p = part.paragraphs[0]
        for r in list(p.runs): r._r.getparent().remove(r._r)
        p.paragraph_format.tab_stops.add_tab_stop(text_w, WD_TAB_ALIGNMENT.RIGHT)
        edge = "bottom" if part is sec.header else "top"
        p._p.get_or_add_pPr().append(parse_xml(
            f'<w:pBdr {nsdecls("w")}><w:{edge} w:val="single" w:sz="4" w:space="3" w:color="B8C2CC"/></w:pBdr>'))
        r = p.add_run(left); r.font.size = Pt(8); r.font.color.rgb = NAVY if part is sec.header else GREY
        r.font.bold = part is sec.header
        r = p.add_run("\t" + (right or "Page ")); r.font.size = Pt(8); r.font.color.rgb = GREY
        if right is None:
            for instr, tail in (("PAGE", " of "), ("NUMPAGES", "")):
                for kind in ("begin", None, "end"):
                    rr = p.add_run(); rr.font.size = Pt(8); rr.font.color.rgb = GREY
                    if kind: rr._r.append(parse_xml(f'<w:fldChar {nsdecls("w")} w:fldCharType="{kind}"/>'))
                    else: rr._r.append(parse_xml(f'<w:instrText {nsdecls("w")} xml:space="preserve"> {instr} </w:instrText>'))
                if tail:
                    rr = p.add_run(tail); rr.font.size = Pt(8); rr.font.color.rgb = GREY

for i, sec in enumerate(doc.sections):
    landscape = i in (1, 3)
    sec.orientation = WD_ORIENT.LANDSCAPE if landscape else WD_ORIENT.PORTRAIT
    sec.page_width, sec.page_height = (A4_H, A4_W) if landscape else (A4_W, A4_H)
    for m in ("top_margin", "bottom_margin", "left_margin", "right_margin"):
        setattr(sec, m, Inches(0.55) if landscape else MARGIN)
    sec.header_distance = sec.footer_distance = Inches(0.32)
    header_footer(sec, sec.page_width - sec.left_margin - sec.right_margin)

# Cover page uses only the WVSU CICT letterhead header (no letter footer on a report cover)
sec0 = doc.sections[0]
sec0.different_first_page_header_footer = True
sec0.first_page_header.is_linked_to_previous = False
p_hdr = sec0.first_page_header.paragraphs[0]
p_hdr.alignment = WD_ALIGN_PARAGRAPH.CENTER
p_hdr.paragraph_format.space_before = Pt(0)
p_hdr.paragraph_format.space_after = Pt(6)
p_hdr._p.get_or_add_pPr().append(parse_xml(
    f'<w:pBdr {nsdecls("w")}><w:bottom w:val="single" w:sz="4" w:space="6" w:color="CBD5E1"/></w:pBdr>'))
p_hdr.add_run().add_picture(LETTERHEAD_HDR, width=Inches(7.0))
sec0.first_page_footer.is_linked_to_previous = False

# Set Word compatibilityMode=15 so Word opens natively without legacy Compatibility Mode line clipping
compat = doc.settings.element.find(qn("w:compat"))
if compat is None:
    compat = OxmlElement("w:compat")
    doc.settings.element.append(compat)
for cs in list(compat.findall(qn("w:compatSetting"))):
    if cs.get(qn("w:name")) == "compatibilityMode":
        compat.remove(cs)
compat.append(parse_xml(
    f'<w:compatSetting {nsdecls("w")} w:name="compatibilityMode" '
    'w:uri="http://schemas.microsoft.com/office/word" w:val="15"/>'))

doc.save(DOCX)
print("wrote", DOCX)

# ---------------------------------------------------------------- 9. Word: update TOC, save, export PDF
os.makedirs(WIN_TMP_WSL, exist_ok=True)
shutil.copy(DOCX, os.path.join(WIN_TMP_WSL, NAME + ".docx"))
ps = (f"$w=New-Object -ComObject Word.Application; $w.Visible=$false; $w.DisplayAlerts=0; "
      f"try {{ $d=$w.Documents.Open('{WIN_TMP}\\{NAME}.docx', $false, $false, $false); "
      "$d.Fields.Update() | Out-Null; "
      "foreach($t in $d.TablesOfContents){$t.Update()}; "
      "$d.Fields.Update() | Out-Null; "
      "foreach($t in $d.TablesOfContents){$t.Update()}; "
      f"$d.Save(); $d.ExportAsFixedFormat('{WIN_TMP}\\{NAME}.pdf',17); }} "
      "finally { if($d){$d.Close(0)}; if($w){$w.Quit()} }")
subprocess.run([POWERSHELL, "-NoProfile", "-Command", ps], stdin=subprocess.DEVNULL, check=True, timeout=300)
shutil.copy(os.path.join(WIN_TMP_WSL, NAME + ".pdf"), PDF)
shutil.copy(os.path.join(WIN_TMP_WSL, NAME + ".docx"), DOCX)
pages = subprocess.run(["pdfinfo", PDF], capture_output=True, text=True).stdout
print("wrote", PDF, [l for l in pages.splitlines() if l.startswith("Pages")])
