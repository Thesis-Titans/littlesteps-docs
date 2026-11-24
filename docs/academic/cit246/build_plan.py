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
MARGIN = Inches(0.8)
A4_W, A4_H = Inches(8.27), Inches(11.69)

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
        pf.space_before, pf.space_after, pf.line_spacing = Pt(0), Pt(5), 1.1
st["Compact"].paragraph_format.space_after = Pt(2)
for name, size, color, before, after in (("Heading 1", 16, NAVY, 0, 10), ("Heading 2", 12.5, BLUE, 12, 4),
                                         ("Heading 3", 11, INK, 9, 3), ("Heading 4", 10, INK, 6, 2)):
    font(st[name], size, bold=True, italic=False, color=color)
    pf = st[name].paragraph_format
    pf.space_before, pf.space_after, pf.keep_with_next = Pt(before), Pt(after), True
for name in ("Title", "Subtitle"):
    font(st[name], 22 if name == "Title" else 15, bold=True, italic=False, color=NAVY if name == "Title" else BLUE)
    st[name].paragraph_format.alignment = WD_ALIGN_PARAGRAPH.CENTER
    for b in st[name].element.xpath(".//w:pBdr"):
        b.getparent().remove(b)
if "Block Text" in st:
    font(st["Block Text"], 10, italic=False, color=INK)
    st["Block Text"].paragraph_format.left_indent = Inches(0.35)
    st["Block Text"].paragraph_format.right_indent = Inches(0.35)
for name in ("Image Caption", "Table Caption", "Caption"):
    if name in st:
        font(st[name], 9, italic=True, color=GREY)
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
    if p.style.name == "Heading 1":
        p.style = st["Title"]
        p.paragraph_format.space_before, p.paragraph_format.space_after = Pt(48), Pt(10)
    elif p.style.name == "Heading 2":
        p.style = st["Subtitle"]
        p.paragraph_format.space_after = Pt(54)
    else:
        p.paragraph_format.space_after = Pt(20)
        p.paragraph_format.line_spacing = 1.25
        for r in p.runs:
            r.font.size = Pt(11)
            if r.bold:
                r.font.color.rgb = NAVY
                r.font.size = Pt(10.5)

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
# ---------------------------------------------------------------- 5. page breaks before main sections
for p in paras:
    if p.style.name == "Heading 1" and re.match(r"\d+\. ", p.text.strip()):
        p.paragraph_format.page_break_before = True
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
    tblPr.append(parse_xml(f'<w:tblCellMar {nsdecls("w")}><w:top w:w="35" w:type="dxa"/><w:left w:w="70" w:type="dxa"/>'
                           '<w:bottom w:w="35" w:type="dxa"/><w:right w:w="70" w:type="dxa"/></w:tblCellMar>'))
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
                for r in p.runs:
                    r.font.name = "Arial"
                    r.font.size = Pt(7.5 if wide else 8)
                    if ri == 0:
                        r.font.bold = True; r.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)

# ---------------------------------------------------------------- 7. images fit the text area
def fit_images(max_w, max_h):
    for shp in doc.inline_shapes:
        w, h = shp.width, shp.height
        k = min(1.0, max_w / w, max_h / h)
        shp.width, shp.height = int(w * k), int(h * k)
fit_images(A4_W - 2 * MARGIN, Inches(9.1))
for p in doc.paragraphs:
    if p._p.xpath(".//w:drawing"):
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p.paragraph_format.keep_with_next = True

# ---------------------------------------------------------------- 8. sections: portrait, landscape Appendix D.1, portrait
paras = doc.paragraphs
d1 = idx(lambda p: p.text.strip() == "D.1 Cost by Work Package")
ae = idx(lambda p: p.text.strip() == "Appendix E. References")
base = doc.sections[-1]._sectPr
base.append(parse_xml(f'<w:pgSz {nsdecls("w")} w:w="11906" w:h="16838"/>')) if base.find(qn("w:pgSz")) is None else None
portrait = copy.deepcopy(base)
paras[d1 - 1]._p.get_or_add_pPr().append(portrait)
land = copy.deepcopy(base)
end_land = parse_xml(f'<w:p {nsdecls("w")}><w:pPr/></w:p>')  # empty paragraph after the table closes the landscape section
paras[ae]._p.addprevious(end_land)
end_land.find(qn("w:pPr")).append(land)
paras[d1 - 1].paragraph_format.page_break_before = False
paras[ae].paragraph_format.page_break_before = False

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
    landscape = i == 1
    sec.orientation = WD_ORIENT.LANDSCAPE if landscape else WD_ORIENT.PORTRAIT
    sec.page_width, sec.page_height = (A4_H, A4_W) if landscape else (A4_W, A4_H)
    for m in ("top_margin", "bottom_margin", "left_margin", "right_margin"):
        setattr(sec, m, Inches(0.6) if landscape else MARGIN)
    sec.header_distance = sec.footer_distance = Inches(0.35)
    header_footer(sec, sec.page_width - sec.left_margin - sec.right_margin)
doc.sections[0].different_first_page_header_footer = True

doc.settings.element.append(parse_xml(f'<w:updateFields {nsdecls("w")} w:val="true"/>'))
doc.save(DOCX)
print("wrote", DOCX)

# ---------------------------------------------------------------- 9. Word: update TOC, save, export PDF
os.makedirs(WIN_TMP_WSL, exist_ok=True)
shutil.copy(DOCX, os.path.join(WIN_TMP_WSL, NAME + ".docx"))
ps = (f"$w=New-Object -ComObject Word.Application; $w.Visible=$false; $w.DisplayAlerts=0; "
      f"$d=$w.Documents.Open('{WIN_TMP}\\{NAME}.docx'); "
      "foreach($t in $d.TablesOfContents){$t.Update()}; $d.Fields.Update() | Out-Null; "
      "foreach($t in $d.TablesOfContents){$t.Update()}; "
      f"$d.Save(); $d.ExportAsFixedFormat('{WIN_TMP}\\{NAME}.pdf',17); $d.Close(0); $w.Quit()")
subprocess.run([POWERSHELL, "-NoProfile", "-Command", ps], check=True, timeout=300)
shutil.copy(os.path.join(WIN_TMP_WSL, NAME + ".pdf"), PDF)
# Word has now filled the TOC; keep that copy but drop the update-on-open prompt
d = docx.Document(os.path.join(WIN_TMP_WSL, NAME + ".docx"))
for e in d.settings.element.findall(qn("w:updateFields")):
    d.settings.element.remove(e)
d.save(DOCX)
pages = subprocess.run(["pdfinfo", PDF], capture_output=True, text=True).stdout
print("wrote", PDF, [l for l in pages.splitlines() if l.startswith("Pages")])
