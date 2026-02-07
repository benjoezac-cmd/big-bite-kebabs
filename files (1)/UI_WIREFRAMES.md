# Big Bite Kebabs - UI/UX Wireframes & Design Specifications

## Design System

### Color Palette

```css
Primary Colors:
- Brand Orange: #ff6b35 (Main CTA, highlights)
- Brand Orange Light: #ff8e53 (Gradients, hover states)
- Dark Background: #0a0a0a (Main background)
- Dark Card: #141414 (Card backgrounds)

Accent Colors:
- Success Green: #4ade80
- Warning Yellow: #fbbf24
- Error Red: #ff6b6b
- Info Blue: #3b82f6

Neutral Colors:
- White: #ffffff
- Gray 100: rgba(255, 255, 255, 0.9)
- Gray 70: rgba(255, 255, 255, 0.7)
- Gray 50: rgba(255, 255, 255, 0.5)
- Gray 10: rgba(255, 255, 255, 0.1)
- Gray 05: rgba(255, 255, 255, 0.05)
- Black Overlay: rgba(0, 0, 0, 0.95)
```

### Typography

```css
Heading Font: 'Bebas Neue', sans-serif
- Display: 96px / 120px (clamp responsive)
- H1: 48px / 72px
- H2: 36px / 48px
- H3: 24px / 32px

Body Font: 'Outfit', sans-serif
- Large: 20px / 28px (weight: 400)
- Regular: 16px / 24px (weight: 400)
- Small: 14px / 20px (weight: 400)
- Caption: 12px / 16px (weight: 300)

Weights Available:
- Light: 300
- Regular: 400
- Semibold: 600
- Bold: 700
```

### Spacing Scale

```
XXS: 4px
XS: 8px
SM: 12px
MD: 16px
LG: 24px
XL: 32px
XXL: 48px
XXXL: 64px
```

### Border Radius

```
Small: 8px (tags, badges)
Medium: 12px (buttons, cards)
Large: 16px (modals, sections)
XLarge: 24px (hero sections)
Round: 50% (circular elements)
```

---

## Page Wireframes

### 1. Homepage (`/`)

```
┌────────────────────────────────────────────────────────┐
│  HEADER (Fixed)                                        │
│  ┌──────────────────────────────────────────────────┐ │
│  │ Logo: Big Bite Kebabs    [Phone Icon] +61...    │ │
│  └──────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│  HERO SECTION                                          │
│                                                        │
│         [⭐ 4.6 Rating Badge]                         │
│                                                        │
│              BIG BITE                                  │
│              KEBABS    ← Gradient text                │
│                                                        │
│       Turkish / Halal Kebabs                          │
│                                                        │
│    📍 Crossroads Homemaker Centre                     │
│    🕒 10 AM - 9 PM Daily                             │
│                                                        │
│  ┌──────────────────────────────────────────────────┐ │
│  │  🎤  Order by Voice                              │ │
│  │     AI-powered ordering in seconds               │ │
│  └──────────────────────────────────────────────────┘ │
│           ↑ Primary CTA (orange gradient)            │
│                                                        │
│  ┌──────────────────────────────────────────────────┐ │
│  │  📋 View Menu              →                     │ │
│  └──────────────────────────────────────────────────┘ │
│           ↑ Secondary CTA (transparent)              │
│                                                        │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│  POPULAR ITEMS SECTION                                 │
│                                                        │
│           Popular Items                                │
│                                                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │
│  │Mix Kebab   │  │Mix Snack   │  │Hungry      │  │
│  │Roll        │  │Pack        │  │Attack      │  │
│  │           │  │           │  │Meal        │  │
│  │$20.00     │  │$19.00     │  │$34.00     │  │
│  │Traditional │  │Chips with  │  │Large combo │  │
│  │Turkish...  │  │mixed...    │  │meal...     │  │
│  └─────────────┘  └─────────────┘  └─────────────┘  │
│                                                        │
│  ┌─────────────┐                                      │
│  │Mix Shish   │  (Grid continues...)                 │
│  │Plate       │                                      │
│  │$47.00     │                                      │
│  └─────────────┘                                      │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│  HOW IT WORKS SECTION                                  │
│                                                        │
│       How Voice Ordering Works                         │
│                                                        │
│  ┌───────────┐   ┌───────────┐   ┌───────────┐      │
│  │    1      │   │    2      │   │    3      │      │
│  │           │   │           │   │           │      │
│  │Tap Order  │   │Tell AI    │   │Confirm &  │      │
│  │by Voice   │   │what you   │   │collect    │      │
│  │           │   │want       │   │           │      │
│  │Allow mic  │   │Say your   │   │Review and │      │
│  │access...  │   │order...   │   │choose...  │      │
│  └───────────┘   └───────────┘   └───────────┘      │
└────────────────────────────────────────────────────────┘
```

**Key Interactions:**
- Scroll animations: Fade in as user scrolls down
- Hover states: Cards lift up with shadow
- Responsive: Single column on mobile, grid on desktop

---

### 2. Menu Page (`/menu`)

```
┌────────────────────────────────────────────────────────┐
│  HEADER (Same as homepage)                             │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│  MENU HEADER                                           │
│  ┌──────────────────────────────────────────────────┐ │
│  │ [← Back]        Our Menu                         │ │
│  └──────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│  MENU SECTIONS                                         │
│                                                        │
│  ┌─────────────────────────────────────────────────┐  │
│  │ Popular Items                                   │  │
│  │                                                 │  │
│  │ Mix Kebab Roll              $20.00            │  │
│  │ Traditional Turkish kebab...                   │  │
│  │ ─────────────────────────────────────────────  │  │
│  │                                                 │  │
│  │ Mix Snack Pack              $19.00            │  │
│  │ Chips topped with mixed...                     │  │
│  │ ─────────────────────────────────────────────  │  │
│  │                                                 │  │
│  │ Hungry Attack Meal          $34.00            │  │
│  │ Large combo meal...                            │  │
│  └─────────────────────────────────────────────────┘  │
│                                                        │
│  ┌─────────────────────────────────────────────────┐  │
│  │ Sides                                           │  │
│  │                                                 │  │
│  │ Chips                       $8.00             │  │
│  │ Golden crispy chips                            │  │
│  └─────────────────────────────────────────────────┘  │
│                                                        │
│  ┌─────────────────────────────────────────────────┐  │
│  │ Full Menu Categories                            │  │
│  │                                                 │  │
│  │ Kebabs                                          │  │
│  │ • Chicken Kebab    • Lamb Kebab                │  │
│  │ • Mix Kebab        • Beef Kebab                │  │
│  │                                                 │  │
│  │ Plates                                          │  │
│  │ • Mix Shish Plate  • Chicken Plate             │  │
│  │ • Lamb Plate                                    │  │
│  └─────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│  STICKY FOOTER (Fixed bottom)                          │
│  ┌──────────────────────────────────────────────────┐ │
│  │  🎤 Order by Voice                               │ │
│  └──────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────┘
```

**Key Features:**
- Sticky footer always visible for quick voice ordering
- Smooth scrolling between sections
- Clear price display
- Easy back navigation

---

### 3. Voice Call Interface (Modal Overlay)

#### State 1: Connecting

```
┌────────────────────────────────────────────────────────┐
│  (Full screen dark overlay - rgba(0,0,0,0.95))        │
│                                                        │
│               ┌──────────────────┐                     │
│               │                  │                     │
│               │   ⚪ Spinner     │                     │
│               │                  │                     │
│               │  Connecting to   │                     │
│               │  AI Assistant... │                     │
│               │                  │                     │
│               │  Please wait     │                     │
│               │  a moment        │                     │
│               │                  │                     │
│               └──────────────────┘                     │
│                                                        │
└────────────────────────────────────────────────────────┘
```

#### State 2: Active Call

```
┌────────────────────────────────────────────────────────┐
│  (Full screen dark overlay)                           │
│                                                        │
│               ┌──────────────────┐                     │
│               │                  │                     │
│               │    🎤  )))       │  ← Pulsing rings   │
│               │       )))        │     animation      │
│               │      )))         │                     │
│               │                  │                     │
│               │  AI Assistant is │                     │
│               │  Listening       │                     │
│               │                  │                     │
│               │  Speak naturally │                     │
│               │  - tell us what  │                     │
│               │  you'd like      │                     │
│               │                  │                     │
│               │ ┌──────────────┐ │                     │
│               │ │Try: "I'd like│ │ ← Example prompts  │
│               │ │two mix kebab"│ │                     │
│               │ └──────────────┘ │                     │
│               │                  │                     │
│               │ ┌──────────────┐ │                     │
│               │ │🔇 End Call   │ │ ← Red button       │
│               │ └──────────────┘ │                     │
│               │                  │                     │
│               └──────────────────┘                     │
│                                                        │
└────────────────────────────────────────────────────────┘
```

**Animations:**
- Pulsing rings: 3 concentric circles expanding outward
- Microphone icon: Subtle glow effect
- Smooth fade-in of overlay

---

### 4. Order Summary (Modal Overlay)

```
┌────────────────────────────────────────────────────────┐
│  (Full screen dark overlay)                           │
│                                                        │
│         ┌─────────────────────────────────┐           │
│         │                                 │           │
│         │   ORDER CONFIRMED! 🎉           │           │
│         │                                 │           │
│         │   Your Order                    │           │
│         │   ─────────────────────────     │           │
│         │   2x Mix Kebab Roll    $40.00  │           │
│         │   1x Chips              $8.00  │           │
│         │   ───────────────────────────   │           │
│         │   Total               $48.00  │ ← Bold     │
│         │                                 │           │
│         │   Details                       │           │
│         │   ─────────────────────────     │           │
│         │   Order Type:    Pickup         │           │
│         │   Name:          John           │           │
│         │   Phone:         0412 345 678   │           │
│         │                                 │           │
│         │   ┌───────────────────────────┐ │           │
│         │   │ Proceed to Payment       │ │ ← Orange  │
│         │   └───────────────────────────┘ │   button  │
│         │                                 │           │
│         │   ┌───────────────────────────┐ │           │
│         │   │ Start New Order          │ │ ← Gray    │
│         │   └───────────────────────────┘ │   button  │
│         │                                 │           │
│         └─────────────────────────────────┘           │
│                                                        │
└────────────────────────────────────────────────────────┘
```

**Features:**
- Clear itemization of order
- Prominent total display
- Customer details confirmation
- Two clear CTAs

---

## Component Specifications

### Button Styles

#### Primary Button (Voice Order)
```css
Style:
- Background: linear-gradient(135deg, #ff6b35, #ff8e53)
- Padding: 24px 32px
- Border-radius: 16px
- Font: 700 21px 'Outfit'
- Color: white
- Shadow: 0 10px 30px rgba(255, 107, 53, 0.3)

Hover:
- Transform: translateY(-4px)
- Shadow: 0 15px 40px rgba(255, 107, 53, 0.4)

Active:
- Transform: translateY(-2px)
```

#### Secondary Button (View Menu)
```css
Style:
- Background: rgba(255, 255, 255, 0.05)
- Border: 1px solid rgba(255, 255, 255, 0.1)
- Padding: 16px 24px
- Border-radius: 12px
- Font: 600 16px 'Outfit'

Hover:
- Background: rgba(255, 255, 255, 0.1)
- Border-color: rgba(255, 255, 255, 0.2)
- Transform: translateY(-2px)
```

### Card Styles

#### Menu Item Card
```css
Style:
- Background: rgba(255, 255, 255, 0.03)
- Border: 1px solid rgba(255, 255, 255, 0.1)
- Border-radius: 12px
- Padding: 24px
- Transition: all 0.3s ease

Hover:
- Background: rgba(255, 255, 255, 0.05)
- Border-color: rgba(255, 107, 53, 0.3)
- Transform: translateY(-4px)
```

### Animation Keyframes

```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0% {
    transform: translate(-50%, -50%) scale(0.8);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(1.5);
    opacity: 0;
  }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

---

## Responsive Breakpoints

```css
/* Mobile First Approach */

/* Small mobile */
@media (max-width: 375px) {
  - Smaller font sizes
  - Reduced padding
  - Single column layouts
}

/* Mobile */
@media (max-width: 640px) {
  - Hero title: 48px
  - Cards: Full width
  - Menu: Single column
}

/* Tablet */
@media (min-width: 641px) and (max-width: 1024px) {
  - Hero title: 72px
  - Cards: 2 columns
  - Increased spacing
}

/* Desktop */
@media (min-width: 1025px) {
  - Hero title: 96px+
  - Cards: 3-4 columns
  - Max content width: 1200px
  - Centered layout
}
```

---

## Accessibility Features

### WCAG Compliance

```
Color Contrast:
- Text on dark: minimum 7:1 (AAA)
- Orange on dark: 4.5:1 (AA large text)
- Button text: Always white on orange for visibility

Keyboard Navigation:
- All buttons: Tab accessible
- Focus states: 2px orange outline
- Modal traps: Esc to close
- Skip links: Jump to main content

Screen Readers:
- ARIA labels on all interactive elements
- Alt text for all images
- Live regions for voice status
- Semantic HTML (h1, h2, nav, main, etc.)

Voice Features:
- Clear visual feedback during voice call
- Text alternatives for audio-only interactions
- Fallback to traditional ordering if voice fails
```

---

## Micro-interactions

### Hover Effects
```
Buttons:
- Lift on hover (translateY)
- Shadow intensifies
- Subtle scale (1.02)

Cards:
- Lift on hover
- Border color change
- Background slightly lighter

Links:
- Color shift
- Underline appears
```

### Loading States
```
Connecting:
- Spinning loader
- Pulsing text

Processing:
- Progress indicators
- Skeleton screens
```

### Success States
```
Order Confirmed:
- Check mark animation
- Green highlight
- Confetti effect (optional)
```

---

## Design Tokens (CSS Variables)

```css
:root {
  /* Colors */
  --color-primary: #ff6b35;
  --color-primary-light: #ff8e53;
  --color-background: #0a0a0a;
  --color-surface: #141414;
  --color-text: #ffffff;
  --color-text-muted: rgba(255, 255, 255, 0.7);
  
  /* Spacing */
  --space-xs: 8px;
  --space-sm: 12px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-xxl: 48px;
  
  /* Typography */
  --font-display: 'Bebas Neue', sans-serif;
  --font-body: 'Outfit', sans-serif;
  
  /* Shadows */
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.2);
  --shadow-lg: 0 10px 30px rgba(255, 107, 53, 0.3);
  
  /* Radius */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  
  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 300ms ease;
  --transition-slow: 500ms ease;
}
```

---

## Print Styles

(For order receipts)

```css
@media print {
  /* Hide navigation and decorative elements */
  header, .voice-order-btn, .back-btn {
    display: none;
  }
  
  /* Ensure order summary is clear */
  .summary-modal {
    position: static;
    background: white;
    color: black;
    border: 2px solid black;
  }
  
  /* Page breaks */
  .order-item {
    page-break-inside: avoid;
  }
}
```

---

## Implementation Notes

### Performance Optimizations
- Lazy load images below the fold
- Defer non-critical CSS
- Minimize JavaScript bundle size
- Use CSS animations over JavaScript
- Implement code splitting for routes

### Browser Support
- Chrome 90+ (primary)
- Safari 14+ (iOS support critical)
- Firefox 88+
- Edge 90+
- No IE11 support (modern only)

### Testing Checklist
- [ ] Visual regression tests
- [ ] Cross-browser testing
- [ ] Mobile device testing
- [ ] Accessibility audit (WAVE, axe)
- [ ] Performance audit (Lighthouse)
- [ ] Voice ordering in noisy environment
- [ ] Microphone permission flows

---

This design system ensures a consistent, accessible, and beautiful user experience across all devices while maintaining the distinctive Big Bite Kebabs brand identity.
