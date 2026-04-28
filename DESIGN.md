# Design System: ZUI Portfolio

**Project:** zui.ooo — Terminal-aesthetic product design portfolio
**Author:** Zui Chen

---

## 1. Visual Theme & Atmosphere

Dark, dense, and monospaced. The aesthetic is a retro terminal operating system: a fictional "ZUI_OS" running in a browser. Everything feels like it was typed, not designed. Text is the primary UI element. No gradients, no rounded corners, no drop shadows on interactive elements.

The palette is deep green-tinted black — not pure black, not dark grey, but the particular dark of old CRT phosphor screens. A CRT scanline overlay and corner vignette are always present as CSS pseudo-elements.

Density is high. Whitespace is intentional and restrained. The tone is quiet and precise — information-first, ornament-last.

---

## 2. Color Palette & Roles

All colors are CSS custom properties on `:root`.

| Token | Hex | Role |
|---|---|---|
| `--bg` | `#0f1210` | Page background — dark green-tinted, not black |
| `--surface` | `#161a15` | Elevated surface — image placeholders, widget fills |
| `--fg` | `#d4d8d0` | Primary text — warm off-white, never pure white |
| `--dim` | `#5a6058` | Muted text — labels, metadata, secondary info |
| `--accent` | `#4ade80` | Green — command prompts, LIVE status, active nav, links |
| `--accent-border` | `#2a5c38` | Green border — badges, open buttons, callout left-rule |
| `--orange` | `#e8854a` | Orange — WIP status, warnings, seeking-role indicators |
| `--err` | `#d16060` | Error states only — not used decoratively |
| `--border` | `#2a2e28` | All borders and dividers — slightly warm dark |

**Usage rules:**
- Green (`--accent`) is reserved for interactive affordances and live/shipped status. Do not use it for decorative color.
- Orange (`--orange`) signals caution or in-progress state. Do not use it for positive states.
- Never use pure `#000000` or `#ffffff`. Always use the palette tokens.
- Background layers: `--bg` for page, `--surface` for components that sit above the page.

---

## 3. Typography Rules

**Single font family throughout:** `'Geist Mono', 'Courier New', monospace`

No serif or sans-serif typefaces. The monospace constraint is absolute — it is the aesthetic identity of the system.

| Context | Size | Weight |
|---|---|---|
| Body / case study text | 14px | 400 |
| Secondary / meta text | 13px | 400 |
| Small labels, section titles | 11–12px | 400 |
| Tiny labels, subtitles | 9–10px | 400 |
| Case study title | 28px | 500 |
| ASCII art header | 10.5px | 400 |

**Letter-spacing:** Section titles use `letter-spacing: 0.12em` with `text-transform: uppercase`. Body text uses no letter-spacing.

**Line-height:** 1.6 for body, 1.75 for long-form case study prose, 1.12 for ASCII art.

**Anti-aliasing:** `-webkit-font-smoothing: none` — intentionally pixelated, no sub-pixel smoothing.

---

## 4. Component Stylings

### Navigation
Horizontal list of 4 items. Active item: `color: --bg` on `background: --accent` (inverted). Inactive: `color: --dim`. No borders, no underlines. Click target: full label text.

### File Table (Work Index)
Grid layout: `210px 80px 120px 1fr`. File names in `--accent`. Size and date in `--dim`. Expandable metadata rows revealed on click, hidden by default. Open button appears only after expanding.

### Open Button
```
border: 1px solid --accent-border
color: --accent
padding: 2px 10px
font-size: 12px
```
No border-radius. Hover: subtle green tint fill `rgba(74,222,128,0.08)`.

### Case Study Header
Title at 28px / weight 500. Tagline at 13px in `--dim`. Meta row (ROLE, YEAR, STACK, STATUS) separated by top/bottom `--border` lines. STATUS: green for LIVE, orange for WIP.

### Section Titles
```
font-size: 11px
letter-spacing: 0.12em
text-transform: uppercase
color: --dim
border-bottom: 1px solid --border
padding-bottom: 4px
```
Prefix convention: `// section name` (lowercase after `//`).

### Callout Block
```
border-left: 2px solid --accent-border
padding: 8px 14px
background: rgba(74,222,128,0.03)
font-size: 13px
```
Used for key insights or pull quotes.

### Image Slots (placeholder)
```
border: 1px dashed --border
background: --surface
color: --dim
```
Real images replace the slot entirely — no wrapper styling on real images beyond `border: 1px solid --border`.

### Buttons / Interactive Elements
No border-radius anywhere. Borders use `--border` or `--accent-border`. Background is always transparent by default; hover adds a faint accent tint.

### Terminal Prompt
`$` character in `--accent`. Input field: no border, no background, `caret-color: --accent`.

### Status Badges
- `LIVE` / `SHIPPED` → `--accent` (green)
- `WIP` / `OPEN_TO_WORK` → `--orange` (orange)
- `ARCHIVED` → `--dim` (grey)

---

## 5. Layout Principles

**Max container width:** 1100px, centered, `padding: 20px 24px`.

**No rounded corners** on any element in this system.

**No box-shadows** on interactive elements.

**Spacing scale:** Multiples of 4px. Common values: 4, 6, 8, 10, 12, 14, 16, 20, 24, 28.

**Grid approach:** CSS Grid over Flexbox for multi-column layouts. Gutters are `8–16px`. Never use `margin: auto` for centering content — use grid/flex alignment.

**Borders as dividers:** `1px solid --border` for horizontal rules. No decorative rules — borders exist only to separate distinct content regions.

**Vertical rhythm:** Sections separated by `margin-bottom: 24px`. Case study section gap: `margin-top: 18px`.

---

## 6. Depth & Elevation

Two visual layers only:

| Layer | Color | Usage |
|---|---|---|
| Base | `--bg` (`#0f1210`) | Page background |
| Surface | `--surface` (`#161a15`) | Components above the page: image slots, data widgets |

No shadow system. Elevation is expressed through border presence, not shadow.

**Always-on overlay effects (CSS pseudo-elements on `body`):**
- `::before` — CRT scanlines: `repeating-linear-gradient` at 5% opacity, `z-index: 100`
- `::after` — Corner vignette: radial gradient darkening to 40% at edges, `z-index: 99`
- Both: `pointer-events: none`

---

## 7. Do's and Don'ts

**Do:**
- Use monospace for all text, labels, code, and UI elements
- Express state changes through color only (green/orange/dim), not icons
- Use `--dim` for anything secondary — metadata, labels, timestamps
- Keep borders as thin as possible: always 1px
- Use `letter-spacing` and `text-transform: uppercase` to elevate small labels
- Prefer `border-bottom` row dividers over full-border cards for lists/tables

**Don't:**
- Don't use `border-radius` on any element
- Don't use `box-shadow` for elevation
- Don't use pure black or white — always use palette tokens
- Don't use more than two font weights (400 and 500)
- Don't add icons or emoji unless explicitly requested
- Don't center-align body text — left-aligned throughout
- Don't use background fills on large container cells — reserve fills for small inline code/formula blocks only

---

## 8. Responsive Behavior

**Breakpoints:**
- `760px` — main layout breakpoint: nav collapses to 2-column grid, file table reflows to stacked layout, ASCII art scales down
- `480px` — small phones: font sizes reduce further, nav items shrink

**Mobile adjustments:**
- Font size: 13px base (from 14px)
- `#app` padding: `16px`
- File row: switches from 4-column grid to stacked single-column layout
- Nav: 4-item horizontal list → 2×2 grid
- Case study meta row: horizontal flex → vertical stack
- Multi-column image grids collapse to single column
- `position: fixed` is never used (breaks scroll layout) — avoid it

**Touch targets:** Minimum 44px height for interactive nav items on mobile.

---

## 9. Agent Prompt Guide

When generating or modifying UI for this project:

- Font: always `'Geist Mono', 'Courier New', monospace`
- Background: `#0f1210` (never black)
- Primary text: `#d4d8d0`
- Accent / interactive: `#4ade80`
- Borders: `#2a2e28`, always 1px
- No border-radius, no box-shadow, no icons
- Section titles: `11px, letter-spacing .12em, uppercase, color #5a6058`
- Status LIVE: green `#4ade80` | Status WIP: orange `#e8854a`

**Quick reference:**
```
--bg:             #0f1210
--surface:        #161a15
--fg:             #d4d8d0
--dim:            #5a6058
--accent:         #4ade80
--accent-border:  #2a5c38
--orange:         #e8854a
--border:         #2a2e28
font:             'Geist Mono', 'Courier New', monospace
```
