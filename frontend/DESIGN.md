---
name: Kinetic Intern
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#434655'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#712ae2'
  on-secondary: '#ffffff'
  secondary-container: '#8a4cfc'
  on-secondary-container: '#fffbff'
  tertiary: '#525657'
  on-tertiary: '#ffffff'
  tertiary-container: '#6b6e70'
  on-tertiary-container: '#eff1f3'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#eaddff'
  secondary-fixed-dim: '#d2bbff'
  on-secondary-fixed: '#25005a'
  on-secondary-fixed-variant: '#5a00c6'
  tertiary-fixed: '#e0e3e5'
  tertiary-fixed-dim: '#c4c7c9'
  on-tertiary-fixed: '#191c1e'
  on-tertiary-fixed-variant: '#444749'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 0.5rem
  sm: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
  max-width: 1280px
---

## Brand & Style

The design system is engineered for the ambitious, early-career professional. It balances the rigor of a financial tool with the approachability of a productivity app. The target audience—college students—requires an interface that feels credible yet energetic.

The aesthetic follows a **Modern Glassmorphic** direction. It utilizes clean lines, generous whitespace, and translucent surfaces to create a sense of depth and focus. The UI evokes a feeling of organized momentum, transforming the chaotic internship search into a structured, manageable workflow. High-quality typography and subtle gradients signal a premium, tech-forward experience.

## Colors

The palette is anchored by **Royal Blue (#2563EB)**, representing stability and professionalism, and **Deep Purple (#7C3AED)**, which adds a layer of creativity and modern flair. 

- **Primary & Secondary:** Used for interactive elements and brand accents. The "Accent Gradient" is reserved for high-level progress indicators and primary CTA states.
- **Surface Colors:** A clean Slate/Zinc range provides a neutral foundation.
- **Semantic Colors:** Success (Emerald), Warning (Amber), and Error (Rose) follow industry standards but are softened to match the professional-yet-approachable vibe.
- **Glassmorphism:** Use white with 70-80% opacity and a 12px-20px backdrop blur for floating panels and navigation bars.

## Typography

This design system leverages **Inter** for its exceptional legibility and systematic feel. The type hierarchy is designed to guide students through data-heavy internship boards without cognitive overload.

- **Scale:** Use tight tracking on larger headlines to maintain a contemporary, "designed" look.
- **Contrast:** Utilize weight (Medium vs. Regular) rather than color alone to distinguish information hierarchy.
- **Optimization:** Headlines use a slight negative letter spacing for a more compact, editorial feel on desktop screens.

## Layout & Spacing

The layout utilizes a **Fixed-Fluid Hybrid Grid**. Content is contained within a max-width of 1280px for readability on large monitors but stretches fluidly on tablets.

- **Desktop (1280px+):** 12-column grid with 24px gutters and 40px outer margins.
- **Tablet (768px - 1279px):** 8-column grid with 20px gutters and 24px outer margins.
- **Mobile (<767px):** 4-column grid with 16px gutters and 16px outer margins.

Spacing follows an 8pt rhythm (4, 8, 16, 24, 32, 48, 64). Use "md" (24px) for card padding to ensure internship details feel airy and legible.

## Elevation & Depth

Visual hierarchy is established through **Tonal Layering** and **Glassmorphism**. Shadows are used sparingly to indicate interactivity.

1.  **Level 0 (Background):** Solid `#F8FAFC` or the soft background gradient.
2.  **Level 1 (Cards/Sidebar):** White background, 1px border (`#E2E8F0`).
3.  **Level 2 (Floating Glass):** White with 80% opacity, 20px Backdrop Blur, and a soft, diffused shadow (0px 10px 15px -3px rgba(0, 0, 0, 0.05)).
4.  **Level 3 (Modals/Popovers):** Higher contrast shadow (0px 20px 25px -5px rgba(0, 0, 0, 0.1)) to isolate the element from the background.

Avoid heavy black shadows; instead, use shadows tinted with the primary blue (e.g., `rgba(37, 99, 235, 0.08)`) to maintain a clean, modern look.

## Shapes

The design system uses a **Rounded** aesthetic to feel friendly and modern. 

- **Default (8px):** Used for input fields, buttons, and small UI components.
- **Large (16px):** Used for cards and main content containers.
- **Extra Large (24px):** Used for prominent call-out sections and promotional banners.
- **Pill:** Reserved exclusively for status tags (e.g., "Applied," "Interviewing") and search bars.

## Components

### Buttons
- **Primary:** Solid `#2563EB` or the brand gradient with white text. High-contrast, 8px rounded.
- **Secondary:** Transparent background with a 1px `#E2E8F0` border.
- **Ghost:** No border, primary color text. Used for less prominent actions.

### Cards (The Core Unit)
Internship listings and task cards should use a white background with a subtle 1px border. On hover, apply a slight lift using the Level 2 shadow.

### Inputs & Fields
Inputs should have a subtle background (`#F1F5F9`) and a 1px border that turns Royal Blue on focus. Labels should be small and semi-bold (`label-sm`).

### Status Chips
Pill-shaped with low-opacity backgrounds and high-contrast text:
- Applied: Blue
- Interviewing: Purple
- Offer: Emerald
- Rejected: Slate

### Kanban Board
For the internship pipeline, columns should be clear with minimal headers. Use the "Glassmorphism" effect for dragging cards to create a tactile, physical sense of movement.