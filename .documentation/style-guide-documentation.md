# Style Guide Documentation

## Overview

This document provides comprehensive documentation for the Scientology Database Design System, covering all visual elements, CSS variables, components, and usage guidelines as defined in `style-guide.html`.

## Design System Philosophy

The design system is built around two primary themes:
- **Terminal Mode**: Dark theme with bright green (#00ff41) accents on black background
- **Clean Mode**: Light theme with black text on cream/white background (#FEF8ED)

Both themes use the monospace font family `'Courier New', Courier, monospace` for a consistent, technical aesthetic.

## Color System

### Terminal Mode Colors

#### Primary Colors
```css
--bg: #000000                    /* Primary background */
--bg-secondary: rgba(0, 255, 65, 0.05)  /* Secondary background */
--fg: #00ff41                    /* Primary text */
--fg-dim: rgba(0, 255, 65, 0.7)  /* Dimmed text */
--border: #00ff41                /* Borders */
--accent: #00ff41                /* Accents */
```

#### Specialized Backgrounds
```css
--bg-solid: #000d04              /* Solid backgrounds */
--bg-button: #090e00             /* Button backgrounds */
--bg-matrix: #000011             /* Matrix theme */
--bg-mobile-menu: rgba(0, 0, 0, 0.95)  /* Mobile menu */
```

#### Alpha Variations (Green)
```css
--fg-alpha-05: rgba(0, 255, 65, 0.05)  /* 5% opacity */
--fg-alpha-10: rgba(0, 255, 65, 0.1)   /* 10% opacity */
--fg-alpha-14: rgba(0, 255, 65, 0.14)  /* 14% opacity */
--fg-alpha-30: rgba(0, 255, 65, 0.3)   /* 30% opacity */
--fg-alpha-38: rgba(0, 255, 65, 0.38)  /* 38% opacity */
--fg-alpha-60: rgba(0, 255, 65, 0.6)   /* 60% opacity */
--fg-alpha-80: rgba(0, 255, 65, 0.8)   /* 80% opacity */
--fg-alpha-90: rgba(0, 255, 65, 0.9)   /* 90% opacity */
```

### Clean Mode Colors

#### Primary Colors
```css
--clean-bg: #FEF8ED              /* Clean background */
--clean-bg-secondary: rgba(0, 0, 0, 0.05)  /* Clean secondary BG */
--clean-fg: #000000              /* Clean text */
--clean-border: #000000          /* Clean borders */
--clean-fg-secondary: rgba(0, 0, 0, 0.6)  /* Clean secondary text */
--clean-accent: #000000          /* Clean accent */
```

#### Background Variants
```css
--white-old-lace: #FEF8ED        /* Light background variant */
--white-old-lace-hover: #F7F2E3  /* Hover background */
--white-old-lace-dark: #F3EBD3   /* Dark variant */
```

#### Alpha Variations (Black)
```css
--clean-fg-alpha-05: rgba(0, 0, 0, 0.05) /* 5% black transparency */
--clean-fg-alpha-10: rgba(0, 0, 0, 0.1)  /* 10% black transparency */
--clean-fg-alpha-14: rgba(0, 0, 0, 0.14) /* 14% black transparency */
--clean-fg-alpha-30: rgba(0, 0, 0, 0.3)  /* 30% black transparency */
--clean-fg-alpha-38: rgba(0, 0, 0, 0.38) /* 38% black transparency */
--clean-fg-alpha-60: rgba(0, 0, 0, 0.6)  /* 60% black transparency */
--clean-fg-alpha-80: rgba(0, 0, 0, 0.8)  /* 80% black transparency */
--clean-fg-alpha-90: rgba(0, 0, 0, 0.9)  /* 90% black transparency */
```

### Warning & Status Colors
```css
--warning: #ff0040               /* Warning color */
--warning-bg: rgba(255, 0, 64, 0.1)      /* Warning background */
--warning-glow-30: rgba(255, 0, 64, 0.3) /* Warning glow 30% */
--warning-glow-60: rgba(255, 0, 64, 0.6) /* Warning glow 60% */
```

## Typography System

### Font Configuration
```css
--font: 'Courier New', Courier, monospace  /* Primary font family */
--line: 1.4                          /* Default line height */
```

### Heading Sizes
```css
--fs-h1: 2.5rem          /* 40px - Main page titles */
--fs-h2: 2rem            /* 32px - Section headers */
--fs-h3: 1.5rem          /* 24px - Subsection headers */
--fs-h4: 1.25rem         /* 20px - Component titles */
--fs-h5: 1.125rem        /* 18px - Small headers */
--fs-h6: 1rem            /* 16px - Smallest headers */
```

### Body Text Sizes
```css
--fs-body: 0.9rem        /* 14.4px - Default body text */
--fs-body-large: 1rem    /* 16px - Large body text */
--fs-body-small: 0.8rem  /* 12.8px - Small body text */
--fs-caption: 0.75rem    /* 12px - Captions, labels */
--fs-tiny: 0.7rem        /* 11.2px - Very small text */
--fs-micro: 0.625rem     /* 10px - Micro text */
```

### Display Sizes
```css
--fs-hero: 2.5rem        /* 40px - Hero sections */
--fs-display: 3rem       /* 48px - Large display text */
```

### Line Height Variables
```css
--lh-tight: 1.2          /* Tight line height */
--lh-normal: 1.4         /* Normal line height */
--lh-relaxed: 1.6        /* Relaxed line height */
--lh-loose: 1.8          /* Loose line height */
```

### Font Weight Variables
```css
--fw-light: 300          /* Light weight */
--fw-normal: 400         /* Normal weight */
--fw-medium: 500         /* Medium weight */
--fw-semibold: 600       /* Semibold weight */
--fw-bold: 700           /* Bold weight */
--fw-extrabold: 800      /* Extra bold weight */
```

### Letter Spacing
```css
--letter-spacing-tight: 0.5px    /* Tight letter spacing */
--letter-spacing-normal: 1px      /* Normal letter spacing */
--letter-spacing-wide: 2px        /* Wide letter spacing */
--letter-spacing-wider: 3px       /* Wider letter spacing */
```

### Mobile Typography
```css
--fs-mobile-h1: 2rem             /* Mobile H1 */
--fs-mobile-h2: 1.75rem           /* Mobile H2 */
--fs-mobile-h3: 1.375rem          /* Mobile H3 */
--fs-mobile-body: 0.875rem        /* Mobile body text */
--fs-mobile-hero: 2rem            /* Mobile hero text */
```

### Responsive Typography (clamp)
```css
--fs-responsive-h1: clamp(var(--fs-mobile-h1), 4vw, var(--fs-h1))
--fs-responsive-h2: clamp(var(--fs-mobile-h2), 3.5vw, var(--fs-h2))
--fs-responsive-h3: clamp(var(--fs-mobile-h3), 3vw, var(--fs-h3))
--fs-responsive-hero: clamp(var(--fs-mobile-hero), 5vw, var(--fs-hero))
--fs-responsive-display: clamp(var(--fs-mobile-display), 6vw, var(--fs-display))
```

## Spacing System

### Base Spacing Scale
```css
--space-xs: 0.5rem       /* 8px - Extra small */
--space-sm: 1rem         /* 16px - Small */
--space-md: 1.2rem       /* 19.2px - Medium */
--space-lg: 1.5rem       /* 24px - Large */
--space-xl: 2rem         /* 32px - Extra large */
--space-xxl: 3rem        /* 48px - XX large */
--space-3xl: 4rem        /* 64px - 3X large */
```

### Micro Spacing
```css
--space-micro: 0.125rem  /* 2px - Fine details */
--space-tiny: 0.25rem    /* 4px - Minimal spacing */
```

### Mobile Spacing
```css
--space-mobile-xs: 0.25rem       /* Mobile extra small */
--space-mobile-sm: 0.75rem        /* Mobile small */
--space-mobile-md: 1rem           /* Mobile medium */
--space-mobile-lg: 1.25rem        /* Mobile large */
```

## Layout System

### Layout Dimensions
```css
--header-height: 120px           /* Header height */
--sidebar-width: 250px            /* Sidebar width */
--container-max: 1400px           /* Maximum container width */
--radius: 0                       /* Border radius (none) */
```

### Border Variables
```css
--border-width-thin: 1px         /* Thin border */
--border-width-medium: 2px        /* Medium border */
--border-width-thick: 3px         /* Thick border */
--border-radius-small: 2px        /* Small border radius */
--border-radius-none: 0           /* No border radius */
```

## Component System

### Button Components

#### Common Button Properties
All buttons share these properties:
- **Font Family**: 'Courier New', Courier, monospace
- **Padding**: 0.6rem 1.25rem
- **Display**: inline-block
- **Box-sizing**: border-box
- **Line-height**: 1
- **Text-decoration**: none
- **Border-radius**: 0 (no rounding)
- **Transition**: All changes smooth with CSS transitions

#### Terminal Mode Button Specifications

**Standard State:**
- Background: #090e00 (very dark green)
- Border: 1px solid #00ff41 (bright green)
- Text: #00ff41 (bright green)

**Hover State:**
- Background: rgba(0, 255, 65, 0.38) (38% opacity green)
- Border: 1px solid #00ff41 (bright green)
- Text: #000000 (black) - flips for contrast
- SVG Icons: Fill and stroke also flip to black

#### Clean Mode Button Specifications

**Standard State:**
- Background: #FEF8ED (white old lace)
- Border: 1px solid #000000 (black)
- Text: #000000 (black)

**Hover State:**
- Background: #F7F2E3 (lighter cream)
- Border: 1px solid #000000 (black)
- Text: #000000 (black) - maintains contrast

### Input Elements

The system includes specialized input components:
- `.glossary-input` - For search terms
- `.search-input` - For filtering results

Both follow the same color and typography patterns as buttons but with appropriate input styling.

### Alpha Sample Classes

#### Terminal Mode Alpha Classes
```css
.alpha-sample-05 { background: var(--fg-alpha-05); color: var(--fg); }
.alpha-sample-14 { background: var(--fg-alpha-14); color: var(--fg); }
.alpha-sample-30 { background: var(--fg-alpha-30); color: var(--bg); }
.alpha-sample-60 { background: var(--fg-alpha-60); color: var(--bg); }
```

#### Clean Mode Alpha Class Overrides
```css
.clean-view .alpha-sample-05 { background: var(--clean-fg-alpha-05); color: var(--clean-fg); }
.clean-view .alpha-sample-14 { background: var(--clean-fg-alpha-14); color: var(--clean-fg); }
.clean-view .alpha-sample-30 { background: var(--clean-fg-alpha-30); color: var(--clean-bg); }
.clean-view .alpha-sample-60 { background: var(--clean-fg-alpha-60); color: var(--clean-bg); }
```

## Usage Guidelines

### Basic Variable Usage
```css
/* Basic usage */
.my-element {
    background: var(--bg);
    color: var(--fg);
    padding: var(--space-lg);
    font-size: var(--fs-body);
}

/* Clean mode overrides */
body.clean-view .my-element {
    background: var(--clean-bg);
    color: var(--clean-fg);
}

/* Responsive typography */
.heading {
    font-size: var(--fs-responsive-h2);
    line-height: var(--lh-normal);
    letter-spacing: var(--letter-spacing-wide);
}
```

### Theme Implementation

#### Theme Toggle
The system uses JavaScript to toggle between themes by adding/removing the `clean-view` class on the body element.

#### Theme Persistence
Theme preference is stored in localStorage as 'viewMode' with values 'clean' or 'terminal'.

### Responsive Design

#### Mobile-First Approach
The system uses a mobile-first approach with responsive typography using CSS clamp() functions.

#### Breakpoint Strategy
While specific breakpoints aren't defined in the style guide, the responsive typography scales smoothly using viewport width units (vw) within clamp() functions.

## File Structure

The style guide references these key files:
- `shared/js/theme-manager.js` - Theme switching functionality
- `shared/js/navigation-component.js` - Navigation component logic
- `shared/css/` - CSS files containing the design system implementation

## Navigation Configuration

The style guide includes navigation configuration:
```javascript
window.navigationConfig = {
    navLinks: [
        { key: 'home', label: 'HOME', href: './index.html' },
        { key: 'search', label: 'SEARCH', href: './search_results.html' },
        { key: 'glossary', label: 'GLOSSARY', href: './glossary.html' }
    ],
    currentPage: 'style-guide'
};
```

## Best Practices

### Color Usage
1. Always use CSS variables instead of hardcoded colors
2. Provide both terminal and clean mode variants
3. Use alpha variations for subtle backgrounds and overlays
4. Maintain high contrast ratios for accessibility

### Typography
1. Use the responsive typography variables for scalable text
2. Maintain consistent line heights using the provided variables
3. Use appropriate font weights for hierarchy
4. Consider mobile typography for smaller screens

### Spacing
1. Use the spacing scale consistently throughout the design
2. Prefer larger spacing values for better readability
3. Use micro spacing for fine details only
4. Consider mobile spacing adjustments

### Layout
1. Respect the maximum container width
2. Use the defined header and sidebar dimensions
3. Maintain consistent border treatments
4. Avoid border radius to maintain the technical aesthetic

## Accessibility Considerations

### Color Contrast
- Terminal mode: Bright green (#00ff41) on black provides high contrast
- Clean mode: Black text on cream background maintains readability
- Alpha variations are carefully chosen to maintain sufficient contrast

### Typography
- Monospace font ensures consistent character spacing
- Responsive typography scales appropriately across devices
- Line height variables provide comfortable reading experiences

### Interactive Elements
- Button hover states provide clear visual feedback
- Color inversions on hover maintain contrast
- Consistent padding and sizing for touch targets

## Implementation Notes

### CSS Custom Properties
The entire system is built on CSS custom properties (variables), making it easy to:
- Switch themes dynamically
- Maintain consistency across components
- Update values globally from a single location
- Create variations and overrides

### JavaScript Integration
The design system integrates with JavaScript for:
- Theme switching functionality
- Navigation component behavior
- Smooth scrolling for internal links
- Theme indicator updates

### Performance Considerations
- CSS variables provide efficient theme switching
- Minimal JavaScript for enhanced functionality
- Optimized for both terminal and clean mode rendering
- Responsive design reduces need for multiple stylesheets

This documentation serves as the complete reference for implementing and maintaining the Scientology Database Design System across all pages and components.