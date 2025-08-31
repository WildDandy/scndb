# Master Layout Template

This template provides a unified layout structure for all pages in the SCNDB project, based on the OSA Network Orders index.html page.

## Template File
`master-layout.html` - Master template with placeholder variables

## Layout System

### Responsive Behavior
- **Desktop (769px+)**: CSS Grid with sidebar layout (`grid-template-columns: var(--sidebar-width) 1fr`)
- **Mobile (768px and below)**: Single column layout (`grid-template-columns: 1fr`)
- **Sidebar**: Hidden on mobile with `display: none !important`

### CSS Grid Column Sizing

The main-content uses CSS Grid with defined column sizes:

#### Default Layout
```css
.main-content {
    display: grid;
    grid-template-columns: var(--sidebar-width) 1fr;
    /* --sidebar-width: 250px (defined in base.css) */
    /* 1fr = remaining space for main content */
}
```

#### Layout Variants
```css
/* Wide sidebar (300px fixed width) */
.main-content.wide {
    grid-template-columns: 300px 1fr;
}

/* Full width (no sidebar) */
.main-content.full-width {
    grid-template-columns: 1fr;
}
```

#### Custom Sidebar Widths
To customize sidebar width, you can:
1. **Override CSS variable**: `--sidebar-width: 200px;`
2. **Use inline styles**: `style="grid-template-columns: 200px 1fr;"`
3. **Create custom CSS class**: `.main-content.narrow { grid-template-columns: 180px 1fr; }`

### Main Content Structure
```html
<div class="container">
    <div class="main-content"> <!-- Default: 250px sidebar + 1fr main -->
        <aside class="sidebar"><!-- 250px width --></aside>
        <main class="content-area"><!-- Remaining space --></main>
    </div>
</div>
```

## Template Variables

Replace these placeholders when creating new pages:

### Required Variables
- `{{PAGE_TITLE}}` - Page title for `<title>` tag
- `{{CSS_BASE_PATH}}` - Relative path to shared CSS files (e.g., `../` or `../../`)
- `{{JS_BASE_PATH}}` - Relative path to shared JS files (e.g., `../` or `../../`)
- `{{NAVIGATION_LINKS}}` - Navigation configuration array
- `{{CURRENT_PAGE}}` - Current page identifier for navigation
- `{{HERO_CONTENT}}` - Hero section content
- `{{MAIN_CONTENT}}` - Main content area
- `{{FOOTER_CONTENT}}` - Footer content

### Optional Variables
- `{{PAGE_SCRIPTS}}` - Page-specific JavaScript code

## Navigation Configuration

Example navigation setup:
```javascript
{ key: 'home', label: 'HOME', href: './index.html' },
{ key: 'search', label: 'SEARCH', href: './search.html' },
{ key: 'glossary', label: 'GLOSSARY', href: './glossary.html' }
```

## Common Layout Patterns

### Two-Column Layout (Sidebar + Content)
```html
<!-- SIDEBAR COMPONENT -->
<aside class="sidebar">
    <h3>Navigation</h3>
    <ul class="file-tree">
        <li>Menu Item 1</li>
        <li>Menu Item 2</li>
    </ul>
</aside>

<!-- CONTENT AREA -->
<main class="content-area">
    <div class="document-header">
        <div class="doc-title">Page Title</div>
        <div class="doc-meta">Page metadata</div>
    </div>
    <div class="document-content">
        <!-- Main content -->
    </div>
</main>
```

### Full-Width Layout (No Sidebar)
```html
<main class="content-area">
    <!-- Full-width content -->
</main>
```

## Features Included

### ✅ Included from Original
- Theme management (clean/terminal modes)
- Responsive navigation with mobile menu
- Scan line effect
- Hero section
- Footer
- Complete CSS system integration
- JavaScript component loading

### ❌ Excluded (as requested)
- `warning-tape-confidential` component
- Page-specific content and scripts

## Usage Example

1. Copy `master-layout.html` to your page location
2. Replace all `{{VARIABLE}}` placeholders
3. Adjust CSS/JS paths based on your file location
4. Add your specific content to `{{MAIN_CONTENT}}`

## CSS Classes Available

- `.main-content` - Main grid container
- `.main-content.wide` - Wide sidebar variant (300px)
- `.main-content.full-width` - No sidebar, full width
- `.sidebar` - Sidebar component
- `.content-area` - Main content area
- `.document-header` - Content header
- `.document-content` - Content wrapper

## Mobile Adaptations

- Sidebar automatically hidden on mobile
- Navigation becomes hamburger menu
- Grid layout becomes single column
- Typography and spacing adjust automatically
- Touch-friendly interface elements

This template ensures consistent layout, spacing, and responsive behavior across all pages while maintaining the established design system.