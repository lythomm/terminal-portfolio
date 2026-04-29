# Design System: Thomas OS Terminal Portfolio

**Project:** Thomas OS
**Author:** Thomas

---

## 1. Visual Theme & Atmosphere

Dark, glowing, and monospaced. The aesthetic is a retro terminal operating system: "THOMAS_OS" running in a browser, combined with cyberpunk influences. The interface feels like a vintage CRT monitor powering up, complete with screen curvature, scanlines, and RGB chromatic aberration. Interactions and text reveals feature a premium cyberpunk "glitch" effect.

The palette is deep green-tinted black (`#1d201e`) mimicking old CRT phosphor screens. A moving CRT scanline overlay, static RGB grain, and dynamic flicker are always present via CSS.

The tone is technical, immersive, and highly interactive.

---

## 2. Color Palette & Roles

All colors are defined as CSS variables.

| Token | Hex | Role |
|---|---|---|
| `--bg` | `#1d201e` | Page background — CRT screen off-black |
| `--surface` | `#262a27` | Elevated surface |
| `--fg` | `#d4d8d0` | Primary text — warm off-white, never pure white |
| `--dim` | `#6a7068` | Muted text — labels, metadata, shortcuts |
| `--accent` | `#4ade80` | Green — command prompts, ASCII art, active borders |
| `--accent-border` | `#2a5c38` | Green border — scrollbars, hover states |
| `--orange` | `#e8854a` | Orange — warnings or special highlights |
| `--err` | `#d16060` | Error states (e.g. command not found) |
| `--border` | `#323630` | Borders and dividers |

**Usage rules:**
- Green (`--accent`) is the primary color for the terminal prompt (`thomas-portfolio:~$`) and ASCII art.
- Avoid pure `#000000` or `#ffffff`.

---

## 3. Typography Rules

**Single font family throughout:** `'Geist Mono', 'Courier New', monospace`

The monospace constraint is absolute — it is the aesthetic identity of the terminal system.

| Context | Size / Class | Weight |
|---|---|---|
| Body / terminal text | 17px (`.term-main`) | 400 |
| Secondary / meta text | 16px (`.term-secondary`) | 400 |
| Small labels | 15px (`.term-label`) | 400 |
| Tiny text | 14px (`.term-small`) | 400 |

**Letter-spacing:** Uppercase labels use `.tracking-widest` or `tracking-[0.2em]`.
**Anti-aliasing:** `-webkit-font-smoothing: none` — intentionally sharp and pixelated.

---

## 4. Layout & UI Elements

### The CRT Screen
The `#app` container simulates a curved CRT screen:
- `border-radius: 50% / 3%;`
- SVG filter for bulge (`url(#crt-bulge)`)
- Dynamic flickering (`animation: flicker 0.15s infinite;`)
- Inner shadow (`box-shadow: inset 0 0 60px rgba(0, 0, 0, 0.45)...`)

### Overlays
- **Moving Scanlines:** A pseudo-element that translates Y from 0 to 100% continuously.
- **Static Grain:** A pseudo-element providing a subtle RGB shift and vignette.

### Terminal Content
- Flex layout with custom scrollbars.
- Scrollbar thumb is `--accent-border` and changes to `--accent` on hover.
- A static background grid `repeating-linear-gradient` is applied to `.terminal-container`.

### Power Button
- Huge circular button (`w-24 h-24`, `rounded-full`).
- Active and hover states feature a glowing green shadow (`shadow-[0_0_20px_rgba(74,222,128,0.3)]`).

### Animations
- **Power On:** The terminal scales vertically from 0.002 to 1 and changes brightness/contrast to simulate a CRT powering on (`.power-on-anim`).
- **Glitch Reveal (Cyberpunk):** New lines of terminal output appear sequentially with the `.cyber-glitch-in` class, which combines translation, skew, and a split red/cyan chromatic aberration drop-shadow for a premium glitch effect.
- **Pulse:** Used for "Press to start" style hints (`animate-pulse`).
- **Cursor Blink:** Standard terminal cursor blinking effect.

---

## 5. Responsive Behavior

- **Desktop First:** Designed for full keyboard interaction and large screen CRT immersion.
- **Mobile Fallback:** If a mobile device is detected, the terminal refuses to boot and displays an error (`MOBILE_DEVICE_INCOMPATIBLE_ERR`), instructing the user to switch to a desktop with a physical keyboard.

---

## 6. Do's and Don'ts

**Do:**
- Use the `.term-*` utility classes for font sizes.
- Embrace sequential, staggered animations for text reveals to maintain the cyberpunk feel.
- Ensure all interactive elements provide visual feedback (like the power button's glow).

**Don't:**
- Don't use sans-serif fonts.
- Don't make text appear instantly without animation inside the terminal output.
- Don't break the illusion of the CRT monitor with flat, modern web patterns.

---

## 7. Quick Reference

```css
--bg:             #1d201e
--surface:        #262a27
--fg:             #d4d8d0
--dim:            #6a7068
--accent:         #4ade80
--accent-border:  #2a5c38
--orange:         #e8854a
--err:            #d16060
--border:         #323630

Font: 'Geist Mono', 'Courier New', monospace
Animations: .power-on-anim, .cyber-glitch-in
```
