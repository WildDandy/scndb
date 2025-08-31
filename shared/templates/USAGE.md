# Master Template Usage Guide

## Quick Start

1. **Copy the master template**
   ```bash
   cp shared/templates/master-layout.html your-page.html
   ```

2. **Replace placeholder variables**
   - Find and replace all `{{VARIABLE}}` placeholders
   - Adjust CSS/JS paths based on your file location

3. **Configure navigation**
   - Update `navLinks` array with your page structure
   - Set `currentPage` to match your page key

## Path Configuration Examples

### Root Level Page (e.g., `/index.html`)
```html
<!-- CSS/JS paths -->
<link rel="stylesheet" href="./shared/css/base.css" />
<script src="./shared/js/theme-manager.js"></script>

<!-- Navigation -->
{ key: 'home', label: 'HOME', href: './index.html' }
```

### Subfolder Page (e.g., `/section/page.html`)
```html
<!-- CSS/JS paths -->
<link rel="stylesheet" href="../shared/css/base.css" />
<script src="../shared/js/theme-manager.js"></script>

<!-- Navigation -->
{ key: 'home', label: 'HOME', href: '../index.html' }
```

### Deep Nested Page (e.g., `/section/subsection/page.html`)
```html
<!-- CSS/JS paths -->
<link rel="stylesheet" href="../../shared/css/base.css" />
<script src="../../shared/js/theme-manager.js"></script>

<!-- Navigation -->
{ key: 'home', label: 'HOME', href: '../../index.html' }
```

## Layout Options

### Two-Column Layout (Default)
**Grid:** `250px` sidebar + `1fr` main content
```html
<div class="main-content">
    <aside class="sidebar">
        <!-- Navigation, filters, etc. (250px width) -->
    </aside>
    <main class="content-area">
        <!-- Main content (remaining space) -->
    </main>
</div>
```

### Wide Sidebar Layout
**Grid:** `300px` sidebar + `1fr` main content
```html
<div class="main-content wide">
    <aside class="sidebar">
        <!-- Wider sidebar content (300px width) -->
    </aside>
    <main class="content-area">
        <!-- Main content (remaining space) -->
    </main>
</div>
```

### Full-Width Layout
**Grid:** `1fr` (no sidebar)
```html
<div class="main-content full-width">
    <main class="content-area">
        <!-- Full-width content -->
    </main>
</div>
```

### Custom Sidebar Widths

#### Method 1: CSS Variable Override
```html
<style>
    .main-content.custom {
        --sidebar-width: 200px;
    }
</style>
<div class="main-content custom">
    <aside class="sidebar"><!-- 200px width --></aside>
    <main class="content-area"><!-- Remaining space --></main>
</div>
```

#### Method 2: Inline Grid Template
```html
<div class="main-content" style="grid-template-columns: 180px 1fr;">
    <aside class="sidebar"><!-- 180px width --></aside>
    <main class="content-area"><!-- Remaining space --></main>
</div>
```

#### Method 3: Custom CSS Class
```css
.main-content.narrow {
    grid-template-columns: 180px 1fr;
}

.main-content.extra-wide {
    grid-template-columns: 350px 1fr;
}
```
```html
<div class="main-content narrow">
    <aside class="sidebar"><!-- 180px width --></aside>
    <main class="content-area"><!-- Remaining space --></main>
</div>
```

## Common Content Patterns

### Document Header
```html
<div class="document-header">
    <div class="doc-title">Page Title</div>
    <div class="doc-meta">Metadata | Info | Tags</div>
</div>
```

### Expandable Sections
```html
<div class="section-block">
    <div class="section-header" tabindex="0" role="button" aria-expanded="false">
        <div class="section-title_toggle">▸ Section Title</div>
    </div>
    <div class="section-content" id="section-id">
        <!-- Section content -->
    </div>
</div>
```

### Sidebar Navigation
```html
<aside class="sidebar">
    <h3>Navigation</h3>
    <ul class="file-tree">
        <li data-section="section1" onclick="scrollToSection('section1', this)">Section 1</li>
        <li data-section="section2" onclick="scrollToSection('section2', this)">Section 2</li>
    </ul>
</aside>
```

## Responsive Behavior

- **Desktop (769px+)**: Sidebar and content side-by-side
- **Mobile (768px and below)**: Sidebar hidden, content full-width
- **Navigation**: Hamburger menu on mobile
- **Typography**: Automatically scales for mobile

## Template Variables Reference

| Variable | Description | Example |
|----------|-------------|----------|
| `{{PAGE_TITLE}}` | Browser title | `"My Page - SCNDB"` |
| `{{CSS_BASE_PATH}}` | Path to CSS folder | `"../"` or `"../../"` |
| `{{JS_BASE_PATH}}` | Path to JS folder | `"../"` or `"../../"` |
| `{{NAVIGATION_LINKS}}` | Nav config array | See examples above |
| `{{CURRENT_PAGE}}` | Current page key | `"home"` or `"search"` |
| `{{HERO_CONTENT}}` | Hero section HTML | Banner, title, subtitle |
| `{{MAIN_CONTENT}}` | Main content HTML | Sidebar + content area |
| `{{FOOTER_CONTENT}}` | Footer HTML | Copyright, links |
| `{{PAGE_SCRIPTS}}` | Custom JS | Page-specific scripts |

## Testing Your Implementation

1. **Check responsive behavior**
   - Resize browser window
   - Test mobile menu functionality
   
2. **Verify theme switching**
   - Toggle between clean/terminal modes
   - Check FOUC prevention
   
3. **Test navigation**
   - Verify all links work
   - Check current page highlighting

## Need Help?

Refer to `example-implementation.html` for a complete working example showing all features in action.