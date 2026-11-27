#!/usr/bin/env python3
"""Build the LittleSteps - CIT210 Google Doc tab manually using gdocs batch API.

Matches the exact visual styling, palette, typography, cover layout, caption
formatting, and table design of the LittleSteps - CC207B tab (t.0), rather
than relying on raw Markdown conversion.

Run: python3 docs/academic/cit210/data/build_gdocs_tab.py
"""

import json
import os
import re
import subprocess
import tempfile
import time

HERE = os.path.dirname(os.path.abspath(__file__))
CIT210 = os.path.dirname(HERE)
MD_PATH = os.path.join(CIT210, "system-documentation.md")
FIG_DIR = os.path.join(CIT210, "figures")

DOC_ID = "1KAz7xv1JCGIoT8nHaNUknde5W6LqF0gKyZu9KkD7rs0"
TAB_ID = "t.h9m6knk62ris"  # LittleSteps - CIT210 ONLY (never touch t.0)

# Exact color palette extracted from LittleSteps - CC207B (t.0)
INK_PRIMARY = "#111827"
INK_SUBHEAD = "#1F2937"
INK_MUTED = "#4B5563"
TBL_HDR_BG = "#F1F5F9"
TBL_HDR_FG = "#0F172A"
TBL_BORDER = "#CBD5E1"
CODE_BG = "#F3F4F6"
FONT = "Arial"

# Balanced column widths (sum = 475 pt, full A4 printable width)
TABLE_WIDTHS = {
    1: [95, 115, 78, 187],   # Table 1: Stack
    2: [80, 155, 58, 182],   # Table 2: Endpoints
    3: [88, 72, 165, 150],   # Table 3: Routes
    4: [48, 102, 155, 170],  # Table 4: Errors
}


def parse_inline_runs(text, base_size=10, base_color=INK_PRIMARY, base_italic=False):
    """Parse inline **bold**, *italic*, and `code` spans into explicit gdocs rich-text runs."""
    runs = []
    # Tokenize **bold**, *italic*, and `code`
    token_re = re.compile(r"(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)")
    pos = 0
    for m in token_re.finditer(text):
        if m.start() > pos:
            runs.append({
                "text": text[pos:m.start()],
                "font_family": FONT,
                "font_size": base_size,
                "text_color": base_color,
                "bold": False,
                "italic": base_italic,
            })
        tok = m.group(0)
        if tok.startswith("**"):
            runs.append({
                "text": tok[2:-2].replace("`", ""),
                "font_family": FONT,
                "font_size": base_size,
                "text_color": base_color,
                "bold": True,
                "italic": base_italic,
            })
        elif tok.startswith("*"):
            runs.append({
                "text": tok[1:-1],
                "font_family": FONT,
                "font_size": base_size,
                "text_color": base_color,
                "bold": False,
                "italic": True,
            })
        elif tok.startswith("`"):
            runs.append({
                "text": tok[1:-1],
                "font_family": "Roboto Mono",
                "font_size": base_size - 0.8,
                "text_color": INK_SUBHEAD,
                "background_color": CODE_BG,
                "bold": False,
                "italic": False,
            })
        pos = m.end()
    if pos < len(text):
        runs.append({
            "text": text[pos:],
            "font_family": FONT,
            "font_size": base_size,
            "text_color": base_color,
            "bold": False,
            "italic": base_italic,
        })
    return runs or [{
        "text": text,
        "font_family": FONT,
        "font_size": base_size,
        "text_color": base_color,
        "bold": False,
        "italic": base_italic,
    }]


def strip_md(text):
    """Remove inline markdown markers for plain table cells."""
    text = re.sub(r"\*\*([^*]+)\*\*", r"\1", text)
    text = re.sub(r"\*([^*]+)\*", r"\1", text)
    text = re.sub(r"`([^`]+)`", r"\1", text)
    return text.strip()


def build_ops():
    with open(MD_PATH, encoding="utf-8") as f:
        lines = f.read().splitlines()

    ops = [
        {
            "op": "set-default-style",
            "font_family": FONT,
            "font_size": 10,
            "text_color": INK_PRIMARY,
            "line_spacing": 115,
            "space_above": 0,
            "space_below": 6,
        },
        # ---- Cover Page (matching LittleSteps - CC207B exact layout & palette) ----
        {"op": "append", "text": " ", "font_size": 10, "space_below": 32, "alignment": "CENTER"},
        {"op": "append", "text": "[[LOGO_ANCHOR]]", "alignment": "CENTER", "space_above": 12, "space_below": 8},
        {
            "op": "heading",
            "level": "TITLE",
            "text": "System Documentation: LittleSteps",
            "font_family": FONT,
            "font_size": 22,
            "bold": True,
            "text_color": INK_PRIMARY,
            "alignment": "CENTER",
            "space_above": 14,
            "space_below": 6,
        },
        {
            "op": "append",
            "text": "A React Web Companion and REST API Platform for Screen-Free Early Learning",
            "font_size": 12,
            "italic": True,
            "text_color": INK_MUTED,
            "alignment": "CENTER",
            "space_below": 28,
        },
        {
            "op": "append",
            "text": "Submitted in Partial Fulfillment of the Requirements for",
            "font_size": 10.5,
            "text_color": INK_MUTED,
            "alignment": "CENTER",
            "space_above": 24,
            "space_below": 4,
        },
        {
            "op": "append",
            "text": "CIT 210 — Web Systems and Technologies",
            "font_size": 11.5,
            "bold": True,
            "text_color": INK_PRIMARY,
            "alignment": "CENTER",
            "space_below": 30,
        },
        {
            "op": "append",
            "text": "Submitted By:",
            "font_size": 11.5,
            "bold": True,
            "text_color": INK_PRIMARY,
            "alignment": "CENTER",
            "space_above": 10,
            "space_below": 6,
        },
        {"op": "append", "text": "Acebuche, Nherie C.", "font_size": 11.5, "alignment": "CENTER", "space_below": 2},
        {"op": "append", "text": "Ardeña, Justin Ace D.", "font_size": 11.5, "alignment": "CENTER", "space_below": 2},
        {"op": "append", "text": "Benjamin, Mae Daniella Faith C.", "font_size": 11.5, "alignment": "CENTER", "space_below": 2},
        {"op": "append", "text": "Cadangin, Mark Alvin C.", "font_size": 11.5, "alignment": "CENTER", "space_below": 2},
        {"op": "append", "text": "Tamaño, Vincent John A.", "font_size": 11.5, "alignment": "CENTER", "space_below": 22},
        {
            "op": "append",
            "text": "Submitted To:",
            "font_size": 11.5,
            "bold": True,
            "text_color": INK_PRIMARY,
            "alignment": "CENTER",
            "space_above": 24,
            "space_below": 4,
        },
        {
            "op": "append",
            "text": "Angelica Grace Simbran",
            "font_size": 11.5,
            "text_color": INK_PRIMARY,
            "alignment": "CENTER",
            "space_below": 22,
        },
        {
            "op": "append",
            "text": "BSIT-3A  |  December 4, 2026",
            "font_size": 10.5,
            "text_color": INK_MUTED,
            "alignment": "CENTER",
            "space_above": 48,
            "space_below": 0,
        },
        {"op": "page-break"},
    ]

    # Parse body starting from "## Abstract"
    start_i = next(i for i, l in enumerate(lines) if l.strip() == "## Abstract")
    i = start_i
    table_num = 0
    fig_anchors = []  # list of (anchor_token, image_file)

    while i < len(lines):
        line = lines[i].rstrip()
        stripped = line.strip()

        if not stripped or stripped == "---":
            i += 1
            continue

        # Code block (e.g., Firestore hierarchy)
        if stripped.startswith("```"):
            code_lines = []
            i += 1
            while i < len(lines) and not lines[i].strip().startswith("```"):
                code_lines.append(lines[i].rstrip())
                i += 1
            i += 1
            ops.append({
                "op": "append",
                "text": "\n".join(code_lines),
                "font_family": "Roboto Mono",
                "font_size": 8.8,
                "text_color": INK_SUBHEAD,
                "paragraph_bg_color": "#F8FAFC",
                "indent_start": 18,
                "indent_end": 18,
                "space_above": 6,
                "space_below": 10,
                "line_spacing": 115,
            })
            continue

        # Headings
        if stripped == "## Abstract":
            ops.append({
                "op": "heading",
                "level": "1",
                "text": "Abstract",
                "font_family": FONT,
                "font_size": 14,
                "bold": True,
                "text_color": INK_PRIMARY,
                "space_above": 4,
                "space_below": 6,
            })
            i += 1
            continue

        if stripped.startswith("# "):
            title = stripped[2:].strip()
            ops.append({
                "op": "heading",
                "level": "1",
                "text": title,
                "font_family": FONT,
                "font_size": 14,
                "bold": True,
                "text_color": INK_PRIMARY,
                "space_above": 16,
                "space_below": 6,
            })
            i += 1
            continue

        if stripped.startswith("## "):
            ops.append({
                "op": "heading",
                "level": "2",
                "text": stripped[3:].strip(),
                "font_family": FONT,
                "font_size": 12,
                "bold": True,
                "text_color": INK_SUBHEAD,
                "space_above": 12,
                "space_below": 4,
            })
            i += 1
            continue

        if stripped.startswith("### "):
            ops.append({
                "op": "heading",
                "level": "3",
                "text": stripped[4:].strip(),
                "font_family": FONT,
                "font_size": 11,
                "bold": True,
                "text_color": INK_SUBHEAD,
                "space_above": 9,
                "space_below": 2,
            })
            i += 1
            continue

        # Image reference -> placeholder anchor (replaced by insert-image-from-file)
        img_m = re.match(r"^!\[([^\]]*)\]\(([^)]+)\)$", stripped)
        if img_m:
            rel_path = img_m.group(2)
            anchor = f"[[FIG_ANCHOR_{len(fig_anchors) + 1}]]"
            fig_anchors.append((anchor, os.path.join(CIT210, rel_path)))
            ops.append({
                "op": "append",
                "text": anchor,
                "alignment": "CENTER",
                "space_above": 8,
                "space_below": 2,
            })
            i += 1
            continue

        # Figure caption: **Fig. N.** *...*
        fig_cap_m = re.match(r"^\*\*(Fig\.\s+\d+\.)\*\*\s+\*(.+)\*$", stripped)
        if fig_cap_m:
            ops.append({
                "op": "rich-text",
                "alignment": "CENTER",
                "space_above": 3,
                "space_below": 10,
                "runs": [
                    {"text": fig_cap_m.group(1) + " ", "font_family": FONT, "font_size": 9.5, "bold": True, "italic": False, "text_color": INK_SUBHEAD},
                    {"text": strip_md(fig_cap_m.group(2)), "font_family": FONT, "font_size": 9.5, "bold": False, "italic": True, "text_color": INK_MUTED},
                ],
            })
            i += 1
            continue

        # Table caption: **Table N.** *...*
        tbl_cap_m = re.match(r"^\*\*(Table\s+\d+\.)\*\*\s+\*(.+)\*$", stripped)
        if tbl_cap_m:
            ops.append({
                "op": "rich-text",
                "alignment": "START",
                "space_above": 8,
                "space_below": 4,
                "runs": [
                    {"text": tbl_cap_m.group(1) + " ", "font_family": FONT, "font_size": 9.5, "bold": True, "italic": False, "text_color": INK_SUBHEAD},
                    {"text": strip_md(tbl_cap_m.group(2)), "font_family": FONT, "font_size": 9.5, "bold": False, "italic": True, "text_color": INK_MUTED},
                ],
            })
            i += 1
            continue

        # Markdown table
        if stripped.startswith("|"):
            tbl_lines = []
            while i < len(lines) and lines[i].strip().startswith("|"):
                tbl_lines.append(lines[i].strip())
                i += 1
            rows = []
            for tl in tbl_lines:
                cells = [strip_md(c) for c in tl.strip("|").split("|")]
                # Skip separator row (---)
                if all(re.match(r"^:?-{2,}:?$", c.replace(" ", "")) for c in cells):
                    continue
                rows.append(cells)
            table_num += 1
            widths = TABLE_WIDTHS.get(table_num)
            tbl_op = {
                "op": "insert-table",
                "table_data": rows,
                "table_header_bg_color": TBL_HDR_BG,
                "table_header_text_color": TBL_HDR_FG,
                "table_header_bold": True,
                "table_font_family": FONT,
                "table_font_size": 8.8,
                "table_border_color": TBL_BORDER,
                "table_border_width": 0.5,
            }
            if widths and len(widths) == len(rows[0]):
                tbl_op["table_col_widths"] = widths
            ops.append(tbl_op)
            continue

        # Bullet list item
        if stripped.startswith("- "):
            ops.append({
                "op": "rich-text",
                "bullet_preset": "BULLET_DISC_CIRCLE_SQUARE",
                "space_above": 0,
                "space_below": 3,
                "runs": parse_inline_runs(stripped[2:].strip()),
            })
            i += 1
            continue

        # Numbered list item (manual bold prefix per gdocs batch workaround)
        num_m = re.match(r"^(\d+\.)\s+(.+)$", stripped)
        if num_m:
            runs = [{"text": num_m.group(1) + " ", "font_family": FONT, "font_size": 10, "bold": True, "italic": False, "text_color": INK_PRIMARY}]
            runs.extend(parse_inline_runs(num_m.group(2).strip()))
            ops.append({
                "op": "rich-text",
                "indent_start": 18,
                "space_above": 0,
                "space_below": 4,
                "runs": runs,
            })
            i += 1
            continue

        # Standard paragraph (check if we are in References for hanging indent)
        in_refs = any(o.get("op") == "heading" and o.get("text") == "References" for o in ops)
        para_op = {
            "op": "rich-text",
            "space_above": 0,
            "space_below": 6,
            "line_spacing": 115,
            "runs": parse_inline_runs(stripped),
        }
        if in_refs:
            para_op["indent_start"] = 24
            para_op["indent_first_line"] = 0
            para_op["font_size"] = 9.5
            for r in para_op["runs"]:
                r["font_size"] = 9.5
        ops.append(para_op)
        i += 1

    return ops, fig_anchors


def run(cmd, retries=3):
    for attempt in range(1, retries + 1):
        print("+", " ".join(cmd))
        try:
            subprocess.run(cmd, check=True)
            return
        except subprocess.CalledProcessError:
            if attempt == retries:
                raise
            time.sleep(2 * attempt)


def check_output_retry(cmd, retries=3):
    for attempt in range(1, retries + 1):
        try:
            return subprocess.check_output(cmd, text=True)
        except subprocess.CalledProcessError:
            if attempt == retries:
                raise
            time.sleep(2 * attempt)


def main():
    ops, fig_anchors = build_ops()
    with tempfile.NamedTemporaryFile("w", suffix=".json", delete=False, encoding="utf-8") as tf:
        json.dump(ops, tf, indent=2)
        batch_path = tf.name

    try:
        # 1. Atomically replace ONLY the LittleSteps - CIT210 tab with styled batch ops
        run([
            "gdocs", "mutate", "batch", DOC_ID,
            "--replace-all",
            "--tab", TAB_ID,
            "-f", batch_path,
        ])

        # 2. Insert each PNG at its exact anchor paragraph, then remove the placeholder text
        anchors_to_insert = [("[[LOGO_ANCHOR]]", os.path.join(FIG_DIR, "littlesteps-logo.png"))] + fig_anchors
        for anchor, img_path in anchors_to_insert:
            # Find exact start/end offset of the anchor text in the tab
            out = check_output_retry(
                ["gdocs", "readonly", "find-offset", DOC_ID, anchor, "--tab", TAB_ID],
            )
            m_start = re.search(r"Start Index:\s+(\d+)", out)
            m_end = re.search(r"End Index:\s+(\d+)", out)
            if not m_start or not m_end:
                raise RuntimeError(f"Could not find anchor {anchor}:\n{out}")
            s_idx, e_idx = int(m_start.group(1)), int(m_end.group(1))
            # Delete anchor text (keeping the centered paragraph newline), then insert image at s_idx
            run(["gdocs", "mutate", "delete", DOC_ID, str(s_idx), str(e_idx), "--confirm", "--tab", TAB_ID])
            run(["gdocs", "mutate", "insert-image-from-file", DOC_ID, img_path, "--index", str(s_idx), "--tab", TAB_ID])
            run(["gdocs", "mutate", "format-paragraph", DOC_ID, "--index", str(s_idx), "--alignment", "CENTER", "--tab", TAB_ID])

        # 3. Ensure running header in ONLY this tab reflects CIT 210 (not duplicated CC 207B header)
        run([
            "gdocs", "mutate", "replace", DOC_ID,
            "CC 207B — Software Documentation: LittleSteps",
            "CIT 210 — System Documentation: LittleSteps",
            "--tab", TAB_ID,
        ])
    finally:
        os.remove(batch_path)

    print("Successfully built LittleSteps - CIT210 tab manually with CC 207B visual styling!")


if __name__ == "__main__":
    main()
