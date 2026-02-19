# BoatCheckPro Design System

## Overview
BoatCheckPro uses a modern, professional design system built with Tailwind CSS. The design emphasizes clarity, trust, and ease of use for boat owners and marine professionals.

## Color Palette

### Primary Colors
- **Primary Blue** (600): `#0284c7` - Main brand color for CTAs, active states, and highlights
- **Primary Blue** (700): `#0369a1` - Hover state for primary elements

### Secondary Colors
- **Secondary Purple** (600): `#7c3aed` - Accent color for secondary actions and highlights
- **Secondary Purple** (700): `#6d28d9` - Hover state for secondary elements

### Neutrals
- **Gray 50**: `#f9fafb` - Lightest background
- **Gray 100**: `#f3f4f6` - Light background
- **Gray 600**: `#4b5563` - Secondary text
- **Gray 700**: `#374151` - Primary text
- **Gray 900**: `#111827` - Darkest text

## Typography

### Font Family
- **Primary Font**: Inter (system-ui fallback)
- **Font Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold), 800 (extra bold)

### Font Sizes
- **H1 (Hero)**: 48px/56px (responsive: 36px)
- **H2 (Section)**: 36px/40px (responsive: 32px)
- **H3 (Card Title)**: 24px/28px
- **Body**: 16px (default)
- **Small**: 14px
- **Extra Small**: 12px

## Spacing Scale

```
4px   - xs
8px   - sm
12px  - md
16px  - lg
24px  - xl
32px  - 2xl
48px  - 3xl
64px  - 4xl
```

## Components

### Buttons

#### Primary Button
- Background: Primary Blue (600)
- Hover: Primary Blue (700)
- Text: White
- Padding: 12px 24px (py-3 px-6)
- Border Radius: 8px (rounded-lg)
- Font Weight: 600 (medium)

```tsx
<button className="btn-primary">Get Started</button>
```

#### Secondary Button
- Background: Secondary Purple (600)
- Hover: Secondary Purple (700)
- Text: White
- Same sizing as Primary

```tsx
<button className="btn-secondary">Learn More</button>
```

#### Outline Button
- Border: 2px Primary Blue (600)
- Text: Primary Blue (600)
- Background: Transparent
- Hover: Light background

```tsx
<button className="btn-outline">View Pricing</button>
```

### Cards

Standard card component with subtle shadow and border.

```tsx
<div className="card p-8">
  {/* Content */}
</div>
```

**Styling:**
- Background: White
- Border: 1px Gray 200
- Border Radius: 12px (rounded-xl)
- Box Shadow: 0 1px 2px rgba(0,0,0,0.05)
- Hover Shadow: Enhanced shadow with transition

### Form Elements

#### Text Input
- Border: 1px Gray 300
- Border Radius: 8px
- Padding: 12px 16px
- Focus State: 2px ring of Primary Blue (600)

```tsx
<input type="text" placeholder="..." className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600" />
```

#### Select
- Same styling as text input
- Background: White

#### Checkbox
- Accent Color: Primary Blue (600)

## Responsive Breakpoints

```
sm:  640px
md:  768px
lg:  1024px
xl:  1280px
2xl: 1536px
```

**Mobile-First Approach**: Start with mobile styles, then add `sm:`, `md:`, `lg:` prefixes for larger screens.

## Layout

### Container
- **Max Width**: 1280px (80rem)
- **Horizontal Padding**: 16px (sm), 24px (md), 32px (lg)

```tsx
<div className="container-custom">
  {/* Content */}
</div>
```

### Section Spacing
- **Vertical Padding**: 80px (py-20)
- **Margin Between Sections**: 32px (mb-8)

## Animations

### Fade In Up
Smooth entrance animation for content.
- Duration: 0.6s
- Easing: ease-out
- From: opacity 0, translateY 20px

```tsx
<div className="animate-fadeInUp">
  Content
</div>
```

### Transitions
- Default: 150ms ease-out
- Focus/Hover: Color and shadow transitions

## Shadows

```
sm:  0 1px 2px 0 rgba(0,0,0,0.05)
md:  0 4px 6px -1px rgba(0,0,0,0.1)
lg:  0 10px 15px -3px rgba(0,0,0,0.1)
xl:  0 20px 25px -5px rgba(0,0,0,0.1)
2xl: 0 25px 50px -12px rgba(0,0,0,0.25)
```

## States

### Hover
- Light background shift or shadow increase
- Smooth transition (150ms)

### Focus
- 2px ring of Primary Blue
- Subtle shadow

### Disabled
- Reduced opacity (50-60%)
- Cursor not-allowed
- No hover effects

### Loading
- Spinner animation
- Disabled state styling

## Best Practices

1. **Color Usage**
   - Use Primary for main actions and highlights
   - Use Secondary for complementary actions
   - Use Grays for supporting text and backgrounds

2. **Typography**
   - H1 for page titles
   - H2 for section titles
   - H3 for card/component titles
   - Body text for content

3. **Spacing**
   - Consistent spacing between elements
   - Use multiples of 4px/8px
   - More breathing room on larger screens

4. **Mobile First**
   - Design for mobile first
   - Progressive enhancement for larger screens
   - Touch-friendly targets (min 44px)

5. **Accessibility**
   - Sufficient color contrast (WCAG AA)
   - Focus states visible
   - Semantic HTML
   - ARIA labels where needed

## File Structure

```
src/
├── app/
│   ├── globals.css        # Tailwind directives & custom utilities
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   └── sections/
│       ├── Hero.tsx
│       ├── HowItWorks.tsx
│       ├── Gallery.tsx
│       ├── Pricing.tsx
│       ├── Testimonials.tsx
│       ├── FAQ.tsx
│       └── CTA.tsx
└── ...
```

## Resources

- **Tailwind CSS**: https://tailwindcss.com
- **Color Palette Generator**: https://tailwindcss.com/docs/customizing-colors
- **Lucide Icons**: https://lucide.dev
