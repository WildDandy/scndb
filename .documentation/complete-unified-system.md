# COMPLETE UNIFIED SYSTEM - ALL FILES (FINAL VERSION)

## 📁 FILE 1: shared/css/base.css
```css
   FOOTER COMPONENT
   ======================================== */

.footer {
    background: var(--bg);
    border-top: 1px solid var(--border);
    padding: var(--space-lg) 0;
    text-align: center;
    font-size: var(--fs-small);
    margin-top: var(--space-xl);
    color: var(--fg);
}

body.clean-view .footer {
    background: var(--clean-bg);
    border-top-color: var(--clean-border);
    color: var(--clean-fg);
}

/* ========================================
   RECENT UPDATES - TYPOGRAPHY SYSTEM
   ======================================== */

/* Updated H1 Typography - Larger Main Titles */
.search-main-title {
    font-size: var(--fs-display); /* 3rem / 48px */
    font-weight: bold;
    margin-bottom: var(--space-lg);
    text-transform: uppercase;
    letter-spacing: 2px;
}

/* Updated Sidebar Typography - Filter Components */
/* Main sidebar titles (e.g., "Filter Results") */
.filter-group-section:first-child h3,
.filter-group-section:first-child .filter-section-heading {
    font-size: var(--fs-body-large); /* 1rem / 16px */
    font-weight: bold;
    margin-bottom: var(--space-md);
}

/* Section titles (e.g., "By Section", "Order Range") */
.filter-section-heading {
    font-size: var(--fs-body-small); /* 0.8rem / 12.8px */
    font-weight: bold;
    margin-bottom: var(--space-sm);
    text-transform: uppercase;
    letter-spacing: 1px;
}

/* Filter items with compact spacing */
.filter-option-item {
    font-size: var(--fs-body-small);
    padding: 0.25rem 0; /* Reduced from --space-xs for tighter spacing */
}

/* Filter sections spacing */
.filter-group-section {
    margin-bottom: var(--space-xl);
}

/* ========================================
   GLOSSARY COMPONENTS
   ======================================== */

.glossary-page {
    padding: var(--space-lg) 0;
}

.glossary-controls {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: var(--space-sm);
    margin-bottom: var(--space-sm);
    align-items: end;
}

.glossary-input {
    width: 100%;
    padding: 0.75rem;
    background: var(--bg);
    border: 1px solid var(--border);
    color: var(--fg);
    font-family: var(--font);
    font-size: var(--fs-small);
    outline: none;
    transition: box-shadow 0.3s ease;
}

.glossary-input:focus {
    box-shadow: 0 0 20px rgba(0, 255, 65, 0.3);
}

.glossary-input::placeholder {
    color: var(--fg);
    opacity: 0.5;
}

body.clean-view .glossary-input {
    background: var(--clean-bg);
    border-color: var(--clean-border);
    color: var(--clean-fg);
}

body.clean-view .glossary-input::placeholder {
    color: var(--clean-fg);
}

body.clean-view .glossary-input:focus {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}

.glossary-count {
    font-size: var(--fs-small);
    opacity: 0.9;
    color: var(--fg);
    white-space: nowrap;
}

body.clean-view .glossary-count {
    color: var(--clean-fg);
}

.alpha-bar {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-xs);
    margin: var(--space-sm) 0;
    justify-content: center;
}

.alpha-letter {
    background: var(--bg);
    border: 1px solid var(--border);
    color: var(--fg);
    padding: 0.35rem 0.6rem;
    font-size: var(--fs-tiny);
    letter-spacing: 1px;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.2s ease;
}

.alpha-letter.selected,
.alpha-letter:hover {
    background: var(--fg);
    color: var(--bg);
}

body.clean-view .alpha-letter {
    background: var(--clean-bg);
    border-color: var(--clean-border);
    color: var(--clean-fg);
}

body.clean-view .alpha-letter.selected,
body.clean-view .alpha-letter:hover {
    background: var(--clean-fg);
    color: var(--clean-bg);
}

.glossary-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: var(--space-sm);
    padding: var(--space-lg) 0;
}

.glossary-item {
    border: 1px solid var(--border);
    padding: var(--space-sm);
    background: var(--bg);
    transition: all 0.3s ease;
}

.glossary-item:hover {
    background: rgba(0, 255, 65, 0.05);
}

body.clean-view .glossary-item {
    border-color: var(--clean-border);
    background: var(--clean-bg);
}

body.clean-view .glossary-item:hover {
    background: rgba(0, 0, 0, 0.05);
}

.glossary-term {
    color: var(--accent);
    font-weight: bold;
    letter-spacing: 0.03em;
    margin-bottom: var(--space-xs);
    font-size: var(--fs-small);
}

body.clean-view .glossary-term {
    color: var(--clean-fg);
}

.glossary-def {
    margin-top: var(--space-xs);
    line-height: 1.5;
    font-size: var(--fs-small);
    color: var(--fg);
}

body.clean-view .glossary-def {
    color: var(--clean-fg);
}

/* ========================================
   SEARCH RESULTS COMPONENTS
   ======================================== */

.results-section {
    padding: var(--space-lg) 0;
}

.results-sidebar {
    background: var(--bg);
    border: 1px solid var(--border);
    padding: var(--space-md);
    height: fit-content;
    position: sticky;
    top: calc(var(--header-height) + var(--space-sm));
}

body.clean-view .results-sidebar {
    background: var(--clean-bg);
    border-color: var(--clean-border);
}

.sidebar-section {
    margin-bottom: var(--space-lg);
}

.sidebar-title {
    font-size: var(--fs-small);
    font-weight: bold;
    margin-bottom: var(--space-sm);
    text-transform: uppercase;
    letter-spacing: 1px;
    color: var(--fg);
}

body.clean-view .sidebar-title {
    color: var(--clean-fg);
}

.filter-list {
    list-style: none;
    font-size: var(--fs-small);
}

.filter-list li {
    margin-bottom: var(--space-xs);
    cursor: pointer;
    color: var(--fg);
    transition: all 0.3s ease;
}

.filter-list li:hover {
    opacity: 0.7;
}

body.clean-view .filter-list li {
    color: var(--clean-fg);
}

.filter-count {
    opacity: 0.6;
    margin-left: var(--space-xs);
}

.results-main {
    min-height: 400px;
}

.results-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-lg);
    padding-bottom: var(--space-sm);
    border-bottom: 1px solid var(--border);
}

body.clean-view .results-header {
    border-bottom-color: var(--clean-border);
}

.results-count {
    font-size: var(--fs-subtitle);
    text-transform: uppercase;
    letter-spacing: 2px;
    color: var(--fg);
}

body.clean-view .results-count {
    color: var(--clean-fg);
}

.sort-controls {
    display: flex;
    gap: var(--space-sm);
    align-items: center;
    color: var(--fg);
}

body.clean-view .sort-controls {
    color: var(--clean-fg);
}

.sort-select {
    background: var(--bg);
    border: 1px solid var(--border);
    color: var(--fg);
    padding: var(--space-xs);
    font-family: var(--font);
    font-size: var(--fs-small);
}

body.clean-view .sort-select {
    background: var(--clean-bg);
    border-color: var(--clean-border);
    color: var(--clean-fg);
}

.result-item {
    border: 1px solid var(--border);
    margin-bottom: var(--space-lg);
    padding: var(--space-lg);
    position: relative;
    background: var(--bg);
    transition: all 0.3s ease;
}

.result-item:hover {
    background: rgba(0, 255, 65, 0.05);
}

body.clean-view .result-item {
    border-color: var(--clean-border);
    background: var(--clean-bg);
}

body.clean-view .result-item:hover {
    background: rgba(0, 0, 0, 0.05);
}

.result-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: var(--space-sm);
}

.result-title-section {
    flex: 1;
    margin-right: var(--space-sm);
    min-width: 0;
}

.result-title {
    font-size: var(--fs-subtitle);
    color: var(--fg);
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: bold;
    display: block;
    margin-bottom: var(--space-xs);
    word-wrap: break-word;
}

.result-title:hover {
    text-decoration: underline;
}

body.clean-view .result-title {
    color: var(--clean-fg);
}

.result-preview {
    font-size: var(--fs-small);
    opacity: 0.8;
    line-height: 1.4;
    margin-top: var(--space-xs);
    font-style: italic;
    word-wrap: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
}

.result-meta {
    text-align: right;
    font-size: var(--fs-small);
    opacity: 0.8;
    flex-shrink: 0;
    min-width: 120px;
}

.result-meta div {
    margin-bottom: 0.25rem;
}

.result-snippet {
    margin: var(--space-sm) 0;
    line-height: 1.6;
    font-size: var(--fs-small);
}

.highlight {
    background: rgba(0, 255, 65, 0.3);
    padding: 0 0.2rem;
    font-weight: bold;
}

body.clean-view .highlight {
    background: rgba(0, 0, 0, 0.2);
}

/* ========================================
   CALLOUT COMPONENTS
   ======================================== */

.callout {
    margin: var(--space-lg) 0;
    padding: var(--space-sm);
    background: var(--bg);
    border: 1px solid var(--border);
}

body.clean-view .callout {
    background: var(--clean-bg);
    border-color: var(--clean-border);
}

.heading-accent {
    color: var(--fg);
    margin: var(--space-lg) 0 var(--space-sm) 0;
    text-transform: uppercase;
    font-size: var(--fs-subtitle);
}

body.clean-view .heading-accent {
    color: var(--clean-fg);
}

.bullet-accent {
    margin: var(--space-sm) 0;
    padding: 0 0 0 var(--space-sm);
    border-left: 3px solid var(--border);
}

body.clean-view .bullet-accent {
    border-left-color: var(--clean-border);
}

/* ========================================
   RESPONSIVE COMPONENT ADJUSTMENTS
   ======================================== */

@media (max-width: 768px) {
    .search-form {
        flex-direction: column;
    }
    
    .stats-bar {
        flex-direction: column;
        align-items: center;
        text-align: center;
    }
    
    .order-grid {
        grid-template-columns: 1fr;
    }
    
    .hero h1 {
        font-size: 2rem;
        margin: var(--space-sm) 0;
    }
    
    .hero-subtitle {
        font-size: var(--fs-body);
        padding: 0 var(--space-sm);
    }
    
    .glossary-grid {
        grid-template-columns: 1fr;
    }
    
    .glossary-controls {
        grid-template-columns: 1fr;
        gap: var(--space-sm);
    }
    
    .results-header {
        flex-direction: column;
        gap: var(--space-sm);
        align-items: flex-start;
    }
    
    .result-header {
        flex-direction: column;
        gap: var(--space-xs);
    }
    
    .result-title-section {
        margin-right: 0;
    }
    
    .result-meta {
        text-align: left;
        min-width: 0;
    }
}

@media (max-width: 480px) {
    .hero h1 {
        font-size: 1.5rem;
    }
    
    .container {
        padding: 0 var(--space-sm);
    }
    
    .alpha-bar {
        gap: 0.25rem;
    }
    
    .alpha-letter {
        padding: 0.25rem 0.4rem;
        font-size: 0.6rem;
    }
}
```

## 📁 FILE 4: shared/css/themes.css
```css
/* ========================================
   UNIFIED THEMES CSS - ENHANCED PERSISTENCE
   Theme switching with FOUC prevention
   ======================================== */

/* ========================================
   FOUC PREVENTION - LOADING STATES
   ======================================== */

/* Prevent flash of unstyled content during theme loading */
.clean-view-loading {
    background: #ffffff !important;
    color: #000000 !important;
}

.clean-view-loading * {
    color: #000000 !important;
    border-color: #000000 !important;
    background: transparent !important;
}

/* Terminal theme loading state */
html:not(.clean-view-loading) {
    background: #000000;
    color: #00ff41;
}

/* ========================================
   CLEAN VIEW THEME OVERRIDES
   ======================================== */

/* Base clean view styles */
body.clean-view {
    background: #ffffff !important;
    color: #000000 !important;
}

/* Universal clean theme text and borders */
body.clean-view * {
    color: #000000 !important;
    border-color: #000000 !important;
}

/* Clean theme backgrounds - most elements transparent */
body.clean-view .master-header,
body.clean-view .hero,
body.clean-view .sidebar,
body.clean-view .content-area,
body.clean-view .document-header,
body.clean-view .section-header,
body.clean-view .section-content,
body.clean-view .stats-bar,
body.clean-view .footer,
body.clean-view .search-header,
body.clean-view .glossary-header,
body.clean-view .results-sidebar {
    background: #ffffff !important;
}

/* Elements that should remain inverted in clean view */
body.clean-view .classified-banner,
body.clean-view .warning-tape {
    background: #000000 !important;
    color: #ffffff !important;
}

/* Clean theme hover states */
body.clean-view .nav-menu a:hover,
body.clean-view .order-card:hover,
body.clean-view .file-tree li:hover,
body.clean-view .search-btn:hover,
body.clean-view .nav-btn:hover,
body.clean-view .section-header:hover,
body.clean-view .alpha-letter:hover,
body.clean-view .alpha-letter.selected,
body.clean-view .glossary-item:hover,
body.clean-view .result-item:hover {
    background: #000000 !important;
    color: #ffffff !important;
}

/* Ensure nested text turns white on hover in clean view */
body.clean-view .nav-menu a:hover *,
body.clean-view .order-card:hover *,
body.clean-view .file-tree li:hover *,
body.clean-view .search-btn:hover *,
body.clean-view .nav-btn:hover *,
body.clean-view .section-header:hover *,
body.clean-view .alpha-letter:hover *,
body.clean-view .alpha-letter.selected *,
body.clean-view .glossary-item:hover *,
body.clean-view .result-item:hover * {
    color: #ffffff !important;
}

/* ========================================
   VIEW TOGGLE COMPONENT - NO ARROWS
   ======================================== */

/* Remove ALL artifacts from view toggle */
.view-toggle {
    display: flex;
    background: transparent !important;
    border: none !important;
    padding: 0 !important;
    margin: 0 !important;
}

.view-toggle button {
    /* Match nav menu styling exactly */
    color: var(--fg);
    background: var(--bg);
    padding: 0.6rem 1.25rem;
    border: 1px solid var(--border);
    cursor: pointer;
    font-family: var(--font);
    font-size: var(--fs-small);
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: all 0.3s ease;
    
    /* Remove any additional styling */
    display: block;
    position: relative;
    box-shadow: none !important;
    outline: none;
    text-decoration: none;
}

.view-toggle button:hover {
    background: var(--fg);
    color: var(--bg);
}

/* Clean view toggle button */
body.clean-view .view-toggle button {
    color: #000000 !important;
    background: #ffffff !important;
    border-color: #000000 !important;
}

body.clean-view .view-toggle button:hover {
    background: #000000 !important;
    color: #ffffff !important;
}

/* Remove any pseudo-elements that might create artifacts */
.view-toggle button::before,
.view-toggle button::after {
    display: none !important;
    content: none !important;
}

.view-toggle::before,
.view-toggle::after {
    display: none !important;
    content: none !important;
}

/* Ensure toggle text is clean */
.toggle-text {
    display: block;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    letter-spacing: inherit;
    text-transform: inherit;
}

/* COMPLETELY REMOVE toggle-indicator - NO ARROWS! */
.toggle-indicator {
    display: none !important;
}

/* ========================================
   TERMINAL THEME SPECIFIC
   ======================================== */

body:not(.clean-view) {
    background: #000000;
    color: #00ff41;
}

body:not(.clean-view) * {
    color: #00ff41 !important;
    border-color: #00ff41 !important;
}

/* Terminal mode backgrounds */
body:not(.clean-view) .master-header,
body:not(.clean-view) .hero,
body:not(.clean-view) .sidebar,
body:not(.clean-view) .content-area,
body:not(.clean-view) .document-header,
body:not(.clean-view) .section-header,
body:not(.clean-view) .section-content,
body:not(.clean-view) .stats-bar,
body:not(.clean-view) .footer,
body:not(.clean-view) .search-header,
body:not(.clean-view) .glossary-header,
body:not(.clean-view) .results-sidebar {
    background: rgba(0, 0, 0, 0.9) !important;
}

/* Terminal mode hover effects */
body:not(.clean-view) .order-card:hover,
body:not(.clean-view) .section-header:hover,
body:not(.clean-view) .glossary-item:hover,
body:not(.clean-view) .result-item:hover {
    background: rgba(0, 255, 65, 0.1) !important;
}

/* ========================================
   MOBILE MENU THEME FIXES
   ======================================== */

/* Mobile menu clean theme */
@media (max-width: 768px) {
    body.clean-view .nav-menu {
        background: #ffffff !important;
        border-left-color: #000000 !important;
    }
    
    body.clean-view .nav-menu a {
        color: #000000 !important;
        border-bottom-color: #000000 !important;
    }
    
    body.clean-view .nav-menu a:hover {
        background: #000000 !important;
        color: #ffffff !important;
    }
    
    body.clean-view .mobile-menu-toggle span {
        background: #000000 !important;
    }
}

/* Terminal theme mobile menu */
@media (max-width: 768px) {
    body:not(.clean-view) .nav-menu {
        background: rgba(0, 0, 0, 0.95) !important;
        border-left-color: #00ff41 !important;
    }
    
    body:not(.clean-view) .nav-menu a {
        color: #00ff41 !important;
        border-bottom-color: #00ff41 !important;
    }
    
    body:not(.clean-view) .mobile-menu-toggle span {
        background: #00ff41 !important;
    }
}

/* ========================================
   THEME TRANSITION EFFECTS
   ======================================== */

/* Smooth theme transitions */
body, 
body *,
body::before,
body::after,
body *::before,
body *::after {
    transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease !important;
}

/* Disable transitions during initial load to prevent flash */
.clean-view-loading,
.clean-view-loading *,
.clean-view-loading *::before,
.clean-view-loading *::after {
    transition: none !important;
}

/* ========================================
   ANIMATION OVERRIDES FOR CLEAN VIEW
   ======================================== */

/* Disable most animations in clean view for professional look */
body.clean-view *:not(.view-toggle button),
body.clean-view *::before,
body.clean-view *::after {
    animation: none !important;
    transform: none !important;
}

/* Keep essential hover transitions in clean view */
body.clean-view .nav-menu a,
body.clean-view .order-card,
body.clean-view .search-btn,
body.clean-view .nav-btn,
body.clean-view .view-toggle button,
body.clean-view .alpha-letter,
body.clean-view .glossary-item {
    transition: all 0.2s ease !important;
}

/* Completely disable typewriter in clean view */
body.clean-view .typewriter {
    animation: none !important;
    border-right: none !important;
    overflow: visible !important;
    white-space: normal !important;
    width: auto !important;
}

/* Disable scan line in clean view */
body.clean-view .scan-line {
    display: none !important;
}

/* Disable matrix canvas in clean view */
body.clean-view #matrix-canvas {
    display: none !important;
}

/* ========================================
   THEME PERSISTENCE DEBUG
   ======================================== */

/* Visual indicator for theme state (development only) */
body::before {
    content: '';
    position: fixed;
    top: 0;
    right: 0;
    width: 3px;
    height: 3px;
    background: #00ff41;
    z-index: 9999;
    pointer-events: none;
    opacity: 0;
}

/* Show green dot in terminal mode, hide in clean mode */
body:not(.clean-view)::before {
    opacity: 0.7;
}

/* ========================================
   PRINT STYLES
   ======================================== */

@media print {
    /* Force clean theme for printing */
    body {
        background: white !important;
        color: black !important;
    }
    
    * {
        background: transparent !important;
        color: black !important;
        border-color: black !important;
    }
    
    .view-toggle,
    .mobile-menu-toggle,
    .scan-line,
    #matrix-canvas,
    body::before {
        display: none !important;
    }
    
    /* Remove transitions for print */
    *, *::before, *::after {
        transition: none !important;
        animation: none !important;
    }
}
```

## 📁 FILE 5: shared/css/responsive.css
```css
/* ========================================
   UNIFIED RESPONSIVE CSS - MOBILE FIRST
   Complete responsive design system
   ======================================== */

/* ========================================
   DESKTOP NAVIGATION (901px and above)
   ======================================== */
@media (min-width: 901px) {
    .nav-menu {
        /* Reset mobile positioning for desktop */
        position: static !important;
        right: auto !important;
        top: auto !important;
        bottom: auto !important;
        width: auto !important;
        max-width: none !important;
        background: transparent !important;
        border-left: none !important;
        display: flex !important;
        flex-direction: row !important;
        padding: 0 !important;
        margin: 0 !important;
        z-index: auto !important;
        transition: none !important;
        box-shadow: none !important;
        overflow-y: visible !important;
    }

    .nav-menu::before {
        display: none !important;
    }

    .nav-menu li {
        width: auto !important;
        margin: 0 !important;
        padding: 0 !important;
    }

    .nav-menu a {
        display: inline-block !important;
        padding: 0.6rem 1.25rem !important;
        border: 1px solid var(--border) !important;
        border-bottom: 1px solid var(--border) !important;
        text-decoration: none !important;
        color: var(--fg);
        font-size: var(--fs-small);
        text-transform: uppercase;
        letter-spacing: 1px;
        background: var(--bg);
        transition: all 0.2s ease;
    }

    .nav-menu li:last-child a {
        border-bottom: none;
    }

    /* Clean view menu links */
    body.clean-view .nav-menu a {
        color: #000000 !important;
        border-bottom-color: #000000 !important;
        background: #ffffff !important;
    }

    .nav-menu a:hover {
        background: var(--fg) !important;
        color: var(--bg) !important;
    }

    body.clean-view .nav-menu a:hover {
        background: #000000 !important;
        color: #ffffff !important;
    }

    /* Hide hamburger icon when menu is open */
    body.nav-open .mobile-menu-toggle {
        display: none !important;
    }

    /* Light backdrop when menu is open */
    body.nav-open::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.2);
        z-index: 4999;
        pointer-events: auto;
    }

    /* ========================================
       MOBILE LAYOUT ADJUSTMENTS
       ======================================== */
    
    /* Single column layout */
    .main-content {
        grid-template-columns: 1fr;
        gap: var(--space-sm);
    }

    .main-content.wide {
        grid-template-columns: 1fr;
    }

    /* Sidebar moves below content on mobile */
    .sidebar {
        position: static;
        order: 1;
        z-index: 51;
    }

    .content-area {
        order: 0;
        z-index: 51;
    }

    /* Typography adjustments */
    .hero h1 {
        font-size: 2rem;
        margin: var(--space-sm) 0;
        padding: 0 var(--space-sm);
    }

    .doc-title {
        font-size: 1.5rem;
    }

    .search-title {
        font-size: 2rem;
    }

    .hero-subtitle {
        font-size: var(--fs-body);
        padding: 0 var(--space-sm);
    }

    /* Container spacing */
    .container {
        padding: 0 var(--space-sm);
    }

    .document-content {
        padding: var(--space-sm);
    }

    .hero {
        padding: var(--space-md) 0;
    }

    .search-header {
        padding: var(--space-md) 0;
    }

    /* ========================================
       MOBILE COMPONENT ADJUSTMENTS
       ======================================== */

    /* Search forms stack vertically */
    .search-form {
        flex-direction: column;
        gap: var(--space-sm);
    }

    .search-filters {
        grid-template-columns: 1fr;
    }

    /* Stats bar stacks vertically */
    .stats-bar {
        flex-direction: column;
        align-items: center;
        gap: var(--space-xs);
        text-align: center;
    }

    /* Navigation footer adjustments */
    .navigation-footer {
        flex-direction: column;
        gap: var(--space-sm);
        text-align: center;
    }

    /* Order grid responsive */
    .order-grid {
        grid-template-columns: 1fr;
        gap: var(--space-sm);
    }

    /* Glossary adjustments */
    .glossary-grid {
        grid-template-columns: 1fr;
    }

    .glossary-controls {
        grid-template-columns: 1fr;
        gap: var(--space-sm);
    }

    /* Alpha bar wraps better */
    .alpha-bar {
        justify-content: center;
    }

    /* Glossary header responsive */
    .glossary-header .container {
        padding: 0 var(--space-sm);
    }

    /* Glossary title responsive */
    .glossary-title {
        font-size: 2rem;
    }

    /* ========================================
       MOBILE SPECIFIC STYLING
       ======================================== */

    /* Hide terminal line on mobile */
    .terminal-line {
        display: none !important;
    }

    /* Mobile warning tape */
    .warning-tape {
        height: auto;
        padding: 15px 20px;
        text-align: center;
        font-size: var(--fs-small);
        min-height: 30px;
    }

    body.clean-view .warning-tape {
        background: #000000 !important;
        color: #ffffff !important;
    }

    /* View toggle adjustments */
    .view-toggle button {
        padding: 0.5rem var(--space-sm);
        font-size: var(--fs-tiny);
        min-width: 70px;
    }

    /* Ensure proper z-index stacking */
    header {
        z-index: 5002;
    }

    .main-content {
        z-index: 50;
    }

    /* ========================================
       MOBILE ACCESSIBILITY
       ======================================== */

    /* Larger touch targets */
    .order-card,
    .file-tree li,
    .sidebar-list li {
        min-height: 44px;
        display: flex;
        align-items: center;
    }

    /* Better focus indicators */
    .mobile-menu-toggle:focus,
    .nav-menu a:focus {
        outline: 2px solid var(--fg);
        outline-offset: 2px;
    }

    body.clean-view .mobile-menu-toggle:focus,
    body.clean-view .nav-menu a:focus {
        outline-color: #000000;
    }
}

/* ========================================
   SMALL MOBILE (480px and below)
   ======================================== */
@media (max-width: 480px) {
    
    .hero h1 {
        font-size: 1.5rem;
    }

    .search-title, .glossary-title {
        font-size: 1.8rem;
    }

    .container, .glossary-header .container {
        padding: 0 0.75rem;
    }
    
    .nav-menu {
        width: 90vw;
    }
    
    .order-grid {
        gap: 0.75rem;
    }
    
    .document-content {
        padding: 0.75rem;
    }
}

/* ========================================
   LANDSCAPE MOBILE ADJUSTMENTS
   ======================================== */
@media (max-width: 768px) and (orientation: landscape) {
    
    .hero {
        padding: var(--space-sm) 0;
    }
    
    .hero h1 {
        font-size: 1.75rem;
        margin: var(--space-xs) 0;
    }
    
    .nav-menu {
        width: 70vw;
        max-width: 280px;
    }
}

/* ========================================
   PRINT STYLES
   ======================================== */
@media print {
    
    .mobile-menu-toggle,
    .nav-menu,
    .view-toggle,
    .scan-line,
    .warning-tape {
        display: none !important;
    }
    
    header {
        position: static;
    }
    
    .main-content {
        grid-template-columns: 1fr;
    }
    
    .sidebar {
        display: none;
    }
    
    body {
        background: white !important;
        color: black !important;
    }
}
```

## 📁 FILE 6: shared/js/theme-manager.js
```javascript
/* ========================================
   UNIFIED THEME MANAGER - ENHANCED PERSISTENCE
   Master theme switching with FOUC prevention
   ======================================== */

/* ========================================
   THEME MANAGEMENT - CORE FUNCTIONS
   ======================================== */

function setViewMode(mode) {
    try { 
        localStorage.setItem('viewMode', mode);
        console.log(`Theme saved: ${mode}`);
    } catch (error) {
        console.warn('Could not save theme to localStorage:', error);
    }
}

function getSavedViewMode() {
    try {
        const savedMode = localStorage.getItem('viewMode');
        console.log(`Retrieved saved theme: ${savedMode || 'none (defaulting to clean)'}`);
        return savedMode || 'clean'; // Default to clean mode
    } catch (error) { 
        console.warn('Could not read theme from localStorage:', error);
        return 'clean'; 
    }
}

function applyViewMode(mode) {
    const toggleBtn = document.getElementById('btn-view-toggle');
    const toggleText = toggleBtn && toggleBtn.querySelector('.toggle-text');

    console.log(`Applying theme: ${mode}`);

    if (mode === 'clean') {
        document.body.classList.add('clean-view');
        if (toggleBtn) {
            toggleBtn.setAttribute('data-mode', 'clean');
            toggleBtn.setAttribute('aria-selected', 'true');
        }
        if (toggleText) toggleText.textContent = 'DARK';
        disableMatrixRain();
        
        // Update page title to indicate clean mode
        updatePageTitle('clean');
    } else {
        document.body.classList.remove('clean-view');
        if (toggleBtn) {
            toggleBtn.setAttribute('data-mode', 'terminal');
            toggleBtn.setAttribute('aria-selected', 'true');
        }
        if (toggleText) toggleText.textContent = 'LIGHT';
        enableMatrixRain();
        
        // Update page title to indicate terminal mode
        updatePageTitle('terminal');
    }
    
    // Dispatch custom event for other scripts to listen to
    window.dispatchEvent(new CustomEvent('themeChanged', { 
        detail: { theme: mode } 
    }));
}

function updatePageTitle(theme) {
    // Optional: Add theme indicator to page title for debugging
    const currentTitle = document.title;
    const cleanTitle = currentTitle.replace(/ \[(CLEAN|TERMINAL)\]$/, '');
    
    // Only add indicator in development - remove this in production
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        document.title = `${cleanTitle} [${theme.toUpperCase()}]`;
    }
}

function bindViewToggleHandlers() {
    const toggleBtn = document.getElementById('btn-view-toggle');
    if (toggleBtn && !toggleBtn._bound) {
        toggleBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Theme toggle clicked');
            
            const currentMode = toggleBtn.getAttribute('data-mode');
            const newMode = currentMode === 'clean' ? 'terminal' : 'clean';
            
            console.log(`Switching from ${currentMode} to ${newMode}`);
            
            setViewMode(newMode);
            applyViewMode(newMode);
        });
        toggleBtn._bound = true;
        console.log('Theme toggle handler bound');
    }
}

function applySavedViewMode() {
    const savedMode = getSavedViewMode();
    console.log(`Applying saved theme on page load: ${savedMode}`);
    applyViewMode(savedMode);
}

// Apply theme immediately on script load (before DOM ready)
function applyThemeImmediately() {
    const savedMode = getSavedViewMode();
    console.log(`Pre-load theme application: ${savedMode}`);
    
    if (savedMode === 'clean') {
        document.documentElement.classList.add('clean-view-loading');
        // Add styles to prevent flash
        const style = document.createElement('style');
        style.textContent = `
            .clean-view-loading { 
                background: #ffffff !important; 
                color: #000000 !important; 
            }
            .clean-view-loading * { 
                color: #000000 !important; 
                border-color: #000000 !important; 
            }
        `;
        document.head.appendChild(style);
    }
}

/* ========================================
   MATRIX RAIN EFFECTS - TERMINAL MODE ONLY
   ======================================== */

let matrixIntervalId = null;
let matrixCanvas = null;

function createMatrixRain() {
    if (document.body.classList.contains('clean-view')) return;
    if (matrixCanvas) return;

    const canvas = document.createElement('canvas');
    canvas.id = 'matrix-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.05';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const fontSize = 10;
    const columns = canvas.width / fontSize;
    const drops = [];

    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }

    function draw() {
        ctx.fillStyle = 'rgba(10, 10, 10, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#00ff41';
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    matrixCanvas = canvas;
    matrixIntervalId = setInterval(draw, 33);

    // Handle window resize
    window.addEventListener('resize', function() {
        if (matrixCanvas) {
            matrixCanvas.width = window.innerWidth;
            matrixCanvas.height = window.innerHeight;
        }
    });
}

function disableMatrixRain() {
    if (matrixIntervalId) {
        clearInterval(matrixIntervalId);
        matrixIntervalId = null;
    }
    if (matrixCanvas) {
        matrixCanvas.remove();
        matrixCanvas = null;
    }
}

function enableMatrixRain() {
    if (!document.body.classList.contains('clean-view')) {
        createMatrixRain();
    }
}

/* ========================================
   INITIALIZATION - RUN IMMEDIATELY
   ======================================== */

// Run immediately when script loads
applyThemeImmediately();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('Theme Manager: DOM loaded, initializing...');
    
    // Remove loading class to allow transitions
    setTimeout(() => {
        document.documentElement.classList.remove('clean-view-loading');
    }, 100);
    
    // Apply saved theme
    applySavedViewMode();
    
    // Bind toggle handlers
    bindViewToggleHandlers();
    
    console.log('Theme Manager: Initialization complete');
});

// Listen for theme change events from other scripts
window.addEventListener('themeChanged', function(event) {
    console.log('Theme change event received:', event.detail.theme);
});

/* ========================================
   EXPORT FUNCTIONS FOR OTHER SCRIPTS
   ======================================== */

// Make functions available globally
window.setViewMode = setViewMode;
window.getSavedViewMode = getSavedViewMode;
window.applyViewMode = applyViewMode;
window.bindViewToggleHandlers = bindViewToggleHandlers;
window.applySavedViewMode = applySavedViewMode;
window.enableMatrixRain = enableMatrixRain;
window.disableMatrixRain = disableMatrixRain;
```

## 📁 FILE 7: shared/js/app.js
```javascript
/* ========================================
   UNIFIED APP.JS - MASTER FUNCTIONALITY
   Common functions used across all sites
   ======================================== */

/* ========================================
   GLOBAL VARIABLES AND STATE
   ======================================== */

let mobileMenuInitialized = false;

/* ========================================
   SECTION TOGGLE FUNCTIONALITY
   ======================================== */

function toggleSection(sectionId) {
    console.log('toggleSection called with:', sectionId);
    const content = document.getElementById(sectionId);
    if (!content) {
        console.log('Section not found:', sectionId);
        return;
    }

    const isActive = content.classList.contains('active');
    console.log('Section is currently active:', isActive);

    // Close all sections first
    document.querySelectorAll('.section-content').forEach(section => {
        section.classList.remove('active');
    });
    document.querySelectorAll('.section-header').forEach(header => {
        header.classList.remove('open');
        header.setAttribute('aria-expanded', 'false');
        const title = header.querySelector('.section-title');
        if (title && title.textContent) {
            title.textContent = title.textContent.replace(/^[\s]*[▾▸]/, '▸');
        }
    });

    // If section wasn't active, open it
    if (!isActive) {
        content.classList.add('active');
        const header = content.previousElementSibling;
        if (header && header.classList && header.classList.contains('section-header')) {
            header.classList.add('open');
            header.setAttribute('aria-expanded', 'true');
            const title = header.querySelector('.section-title');
            if (title && title.textContent) {
                title.textContent = title.textContent.replace(/^[\s]*[▾▸]/, '▾');
            }
        }
        console.log('Section activated:', sectionId);

        // Smooth scroll to section
        setTimeout(() => {
            if (header) {
                const headerOffset = 140;
                const elementPosition = header.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }, 100);
    }

    syncSectionArrows();
}

function syncSectionArrows() {
    document.querySelectorAll('.section-header').forEach(header => {
        const next = header.nextElementSibling;
        const isOpen = next && next.classList.contains('section-content') && next.classList.contains('active');
        const title = header.querySelector('.section-title');
        if (isOpen) {
            header.classList.add('open');
            header.setAttribute('aria-expanded', 'true');
            if (title && title.textContent) {
                title.textContent = title.textContent.replace(/^[\s]*[▾▸]/, '▾');
            }
        } else {
            header.classList.remove('open');
            header.setAttribute('aria-expanded', 'false');
            if (title && title.textContent) {
                title.textContent = title.textContent.replace(/^[\s]*[▾▸]/, '▸');
            }
        }
    });
}

/* ========================================
   ORDER NAVIGATION FUNCTIONALITY
   ======================================== */

function viewOrder(orderNumber) {
    const value = String(orderNumber);
    if (/^\d+$/.test(value)) {
        const padded = value.padStart(3, '0');
        window.location.href = `orders/nw_order_${padded}.html`;
        return;
    }
    if (/^\d+-\d+$/.test(value)) {
        window.location.href = `orders/nw_order_${value}.html`;
        return;
    }
    alert(`Order ${orderNumber} not found.`);
}

/* ========================================
   TYPEWRITER EFFECT
   ======================================== */

function initTypewriter() {
    const typewriterText = document.querySelector('.typewriter');
    if (typewriterText) {
        const text = typewriterText.textContent;
        typewriterText.textContent = '';
        let i = 0;
        const typeInterval = setInterval(() => {
            typewriterText.textContent += text[i];
            i++;
            if (i >= text.length) {
                clearInterval(typeInterval);
            }
        }, 50);
    }
}

/* ========================================
   SIDEBAR NAVIGATION
   ======================================== */

function initSidebarNavigation() {
    document.querySelectorAll('.sidebar-list li').forEach(item => {
        item.addEventListener('click', function() {
            if (this.onclick) return;
            
            document.querySelectorAll('.sidebar-list li').forEach(li => {
                li.classList.remove('active');
            });
            
            this.classList.add('active');
        });
    });
}

/* ========================================
   SMOOTH SCROLLING
   ======================================== */

function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/* ========================================
   TEXT NORMALIZATION
   ======================================== */

function normalizeMojibakeText() {
    const replacements = [
        { from: /â€"/g, to: '"' },
        { from: /â€/g, to: '"' },
        { from: /â€™/g, to: "'" },
        { from: /â€˜/g, to: "'" },
        { from: /â€"/g, to: '—' },
        { from: /â€"/g, to: '–' },
        { from: /â€¦/g, to: '…' },
        { from: /â†'/g, to: '->' },
        { from: /â†/g, to: '->' },
        { from: /â€¢/g, to: '•' }
    ];

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
    const textNodes = [];
    let node;
    while ((node = walker.nextNode())) {
        textNodes.push(node);
    }

    for (const textNode of textNodes) {
        let value = textNode.nodeValue;
        let changed = false;
        for (const { from, to } of replacements) {
            if (from.test(value)) {
                value = value.replace(from, to);
                changed = true;
            }
        }
        if (changed) {
            textNode.nodeValue = value;
        }
    }
}

/* ========================================
   HEADER HEIGHT MANAGEMENT
   ======================================== */

function syncHeaderHeightVar() {
    const header = document.querySelector('header');
    const h = header ? header.getBoundingClientRect().height : 80;
    document.documentElement.style.setProperty('--header-height', h + 'px');
}

/* ========================================
   MOBILE MENU SYSTEM - UNIFIED
   ======================================== */

function initMobileMenu() {
    if (mobileMenuInitialized) {
        console.log('Mobile menu already initialized, skipping');
        return;
    }

    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;

    console.log('Mobile menu init: Starting initialization');
    console.log('Mobile toggle:', mobileToggle);
    console.log('Nav menu:', navMenu);

    if (!mobileToggle || !navMenu) {
        console.log('Mobile menu elements not found');
        return;
    }

    // Always start closed on load/responsive entry
    document.body.classList.remove('nav-open');

    // Remove any existing listeners to prevent duplicates
    const newMobileToggle = mobileToggle.cloneNode(true);
    mobileToggle.parentNode.replaceChild(newMobileToggle, mobileToggle);

    // Add click listener to hamburger
    newMobileToggle.addEventListener('click', function(e) {
        console.log('Hamburger clicked!');
        e.preventDefault();
        e.stopPropagation();
        
        const isOpen = body.classList.contains('nav-open');
        console.log('Current state - nav-open:', isOpen);
        
        if (isOpen) {
            console.log('Closing menu...');
            body.classList.remove('nav-open');
        } else {
            console.log('Opening menu...');
            body.classList.add('nav-open');
        }
        
        console.log('New state - nav-open:', body.classList.contains('nav-open'));
    });

    // Close menu when clicking the close area (mobile only)
    navMenu.addEventListener('click', function(e) {
        // Only handle close button on mobile
        if (window.innerWidth > 900) return;

        const rect = navMenu.getBoundingClientRect();
        const clickY = e.clientY - rect.top;

        if (clickY < 70) { // Close button area
            console.log('Close button clicked');
            e.preventDefault();
            body.classList.remove('nav-open');
        }
    });

    // Close menu when clicking nav links (mobile only)
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 900) {
                console.log('Nav link clicked, closing menu');
                body.classList.remove('nav-open');
            }
        });
    });

    // Close menu when clicking outside (mobile only)
    document.addEventListener('click', function(e) {
        // Only handle outside clicks on mobile
        if (window.innerWidth > 900) return;

        if (body.classList.contains('nav-open') &&
            !navMenu.contains(e.target) &&
            !newMobileToggle.contains(e.target)) {
            console.log('Clicked outside, closing menu');
            body.classList.remove('nav-open');
        }
    });

    // Close menu on escape key (mobile only)
    document.addEventListener('keydown', function(e) {
        // Only handle escape on mobile
        if (window.innerWidth > 900) return;

        if (e.key === 'Escape' && body.classList.contains('nav-open')) {
            console.log('Escape pressed, closing menu');
            body.classList.remove('nav-open');
        }
    });

    // Close menu when window resizes to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 900 && body.classList.contains('nav-open')) {
            console.log('Resized to desktop, closing menu');
            body.classList.remove('nav-open');
        }
    });

    mobileMenuInitialized = true;
    console.log('Mobile menu initialized successfully');
}

/* ========================================
   NAVIGATION BUILDING
   ======================================== */

function updateGlobalNav() {
    const headerNav = document.querySelector('header nav');
    if (!headerNav) return;

    const path = window.location.pathname || '';
    const isNested = /(\/orders|\/sections)\//.test(path);
    const prefix = isNested ? '../' : '';

    console.log('updateGlobalNav: Replacing navigation structure');
    
    headerNav.innerHTML = `
        <div class="nav-left">
            <a href="${prefix}index.html" class="logo">[SCNDB]</a>
        </div>
        <ul class="nav-menu">
            <li><a href="${prefix}index.html">HOME</a></li>
            <li><a href="${prefix}search_results_page.html">SEARCH</a></li>
            <li><a href="${prefix}glossary.html">GLOSSARY</a></li>
        </ul>
        <div class="nav-right">
            <div class="view-toggle" role="tablist" aria-label="View Switcher">
                <button id="btn-view-toggle" role="tab" aria-selected="false" data-mode="clean">
                    <span class="toggle-text">DARK</span>
                </button>
            </div>
            <button class="mobile-menu-toggle" aria-label="Toggle mobile menu">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    `;

    // Re-bind theme toggle after navigation update
    if (window.bindViewToggleHandlers) {
        window.bindViewToggleHandlers();
    }
}

/* ========================================
   ACCESSIBILITY ENHANCEMENTS
   ======================================== */

function initSectionHeaderAccessibility() {
    document.querySelectorAll('.section-header').forEach(function(header){
        if (!header.hasAttribute('tabindex')) header.setAttribute('tabindex', '0');
        if (!header.hasAttribute('role')) header.setAttribute('role', 'button');
        const panel = header.nextElementSibling;
        if (panel && panel.classList.contains('section-content')) {
            if (!panel.id) {
                panel.id = 'section-' + Math.random().toString(36).slice(2, 8);
            }
            header.setAttribute('aria-controls', panel.id);
            const isOpen = panel.classList.contains('active');
            header.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        }
    });
}

/* ========================================
   MAIN INITIALIZATION
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    console.log('App.js: DOM Content Loaded - Starting initialization');
    
    // Update navigation first
    updateGlobalNav();

    // Initialize mobile menu
    setTimeout(() => {
        initMobileMenu();
    }, 100);

    // Sync header height
    syncHeaderHeightVar();
    window.addEventListener('resize', syncHeaderHeightVar);

    // Initialize various components
    normalizeMojibakeText();
    initTypewriter();
    initSidebarNavigation();
    initSmoothScrolling();
    syncSectionArrows();
    initSectionHeaderAccessibility();

    // Event delegation for dynamic content
    document.addEventListener('click', function(event) {
        // Skip navigation menu clicks to allow normal link behavior
        const navMenu = event.target && event.target.closest ? event.target.closest('.nav-menu') : null;
        if (navMenu) {
            console.log('[DESKTOP NAV] Navigation menu click detected, allowing normal behavior');
            return;
        }

        // Section header toggles
        const header = event.target && event.target.closest ? event.target.closest('.section-header') : null;
        if (header && header.nextElementSibling && header.nextElementSibling.classList.contains('section-content')) {
            const contentId = header.nextElementSibling.id;
            if (content) !important;
        font-size: var(--fs-small) !important;
        text-transform: uppercase !important;
        letter-spacing: 1px !important;
        background: transparent !important;
        transition: all 0.3s ease !important;
    }

    .nav-menu a:hover {
        background: var(--fg) !important;
        color: var(--bg) !important;
    }

    /* Hide mobile menu toggle on desktop */
    .mobile-menu-toggle {
        display: none !important;
    }
}

/* ========================================
   TABLET ADJUSTMENTS (768px - 900px)
   ======================================== */
@media (max-width: 900px) and (min-width: 769px) {
    .main-content {
        grid-template-columns: 200px 1fr;
        gap: var(--space-md);
    }

    .container {
        padding: 0 var(--space-md);
    }

    /* Hide mobile menu toggle on tablet */
    .mobile-menu-toggle {
        display: none !important;
    }
}

/* ========================================
   MOBILE DESIGN (768px and below)
   ======================================== */
@media (max-width: 768px) {
    
    /* ========================================
       MOBILE NAVIGATION
       ======================================== */
    
    /* Show hamburger menu button */
    .mobile-menu-toggle {
        display: flex !important;
        flex-direction: column;
        justify-content: space-between;
        width: 24px;
        height: 18px;
        background: none;
        border: none;
        cursor: pointer;
        padding: 0;
        z-index: 6001;
    }

    .mobile-menu-toggle span {
        display: block;
        width: 100%;
        height: 2px;
        background: var(--fg);
        border-radius: 1px;
    }

    /* Clean view hamburger colors */
    body.clean-view .mobile-menu-toggle span {
        background: #000000 !important;
    }

    /* Mobile menu - PROPER OVERLAY POSITIONING */
    .nav-menu {
        /* CRITICAL: Remove from document flow completely */
        position: fixed !important;
        top: 0 !important;
        right: -100% !important; /* Start completely off-screen */
        bottom: 0 !important;
        width: 80vw;
        max-width: 300px;
        background: var(--bg);
        border-left: 1px solid var(--border);
        
        /* ALWAYS flex - never display:none */
        display: flex !important;
        flex-direction: column;
        padding: 0;
        margin: 0;
        z-index: 5000;
        
        /* Smooth slide transition */
        transition: right 0.3s ease-out;
        box-shadow: -8px 0 24px rgba(0, 0, 0, 0.5);
        list-style: none;
        overflow-y: auto;
    }

    /* Clean view menu colors */
    body.clean-view .nav-menu {
        background: #ffffff !important;
        border-left-color: #000000 !important;
    }

    /* Show menu when nav-open class is applied - slide in from right */
    body.nav-open .nav-menu {
        right: 0 !important; /* Slide into view */
    }

    /* Close label at top of menu */
    .nav-menu::before {
        content: '✕ CLOSE';
        display: block;
        padding: 1rem;
        font-size: var(--fs-small);
        border-bottom: 1px solid var(--border);
        cursor: pointer;
        color: var(--fg);
        text-align: right;
        font-weight: bold;
        letter-spacing: 1px;
        font-family: var(--font);
        background: var(--bg);
        flex-shrink: 0;
        padding-top: 2rem;
        padding-bottom: 3rem;
    }

    body.clean-view .nav-menu::before {
        color: #000000 !important;
        border-bottom-color: #000000 !important;
        background: #ffffff !important;
        padding-top: 2rem !important;
        padding-bottom: 3rem !important;
    }

    /* Menu items */
    .nav-menu li {
        width: 100%;
        margin: 0;
        padding: 0;
    }

    .nav-menu a {
        display: block;
        padding: var(--space-sm) var(--space-md);
        border: none;
        border-bottom: 1px solid var(--border);
        text-decoration: none;
        color: var(--fg
   UNIFIED BASE CSS - MASTER STYLES
   Used across all sites in the collection
   ======================================== */

/* CSS Reset */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* CSS Custom Properties - Master Design System */
:root {
    /* Colors - Terminal Theme (Default) */
    --bg: #000000;
    --fg: #00ff41;
    --fg-dim: rgba(0, 255, 65, 0.7);
    --border: #00ff41;
    
    /* Colors - Clean Theme */
    --clean-bg: #ffffff;
    --clean-fg: #000000;
    --clean-border: #000000;
    
    /* Accent Colors */
    --accent: #00ff41;
    --warning: #ff0000;
    --warning-bg: #ffff00;
    
    /* Typography */
    --font: 'Courier New', Courier, monospace;
    --line: 1.4;
    
    /* Font Sizes */
    --fs-hero: 3rem;
    --fs-title: 2.5rem;
    --fs-subtitle: 1.2rem;
    --fs-body: 0.9rem;
    --fs-small: 0.8rem;
    --fs-tiny: 0.7rem;
    
    /* Spacing System */
    --space-xs: 0.5rem;
    --space-sm: 1rem;
    --space-md: 1.5rem;
    --space-lg: 2rem;
    --space-xl: 3rem;
    --space-xxl: 4rem;
    
    /* Layout */
    --header-height: 120px;
    --sidebar-width: 250px;
    --container-max: 1400px;
    --border-radius: 0;
}

/* Base HTML Elements */
html, body {
    height: 100%;
}

body {
    background: var(--bg);
    color: var(--fg);
    font-family: var(--font);
    line-height: var(--line);
    overflow-x: hidden;
    font-size: var(--fs-body);
}

/* Links */
a {
    color: var(--fg);
    text-decoration: none;
    transition: all 0.3s ease;
}

a:hover {
    text-decoration: underline;
}

/* Headings */
h1, h2, h3, h4, h5, h6 {
    color: var(--fg);
    font-weight: normal;
    font-family: var(--font);
}

h1 {
    font-size: var(--fs-hero);
    text-transform: uppercase;
    letter-spacing: 3px;
}

h2 {
    font-size: var(--fs-title);
    text-transform: uppercase;
    letter-spacing: 2px;
}

h3 {
    font-size: var(--fs-subtitle);
    text-transform: uppercase;
    letter-spacing: 1px;
}

/* Lists */
ul, ol {
    list-style: none;
}

/* Form Elements */
input, textarea, select, button {
    font-family: var(--font);
    font-size: var(--fs-body);
}

/* Container System */
.container {
    max-width: var(--container-max);
    margin: 0 auto;
    padding: 0 var(--space-lg);
}

/* ========================================
   THEME SWITCHING SYSTEM
   ======================================== */

/* Clean View Theme */
body.clean-view {
    background: var(--clean-bg);
    color: var(--clean-fg);
}

/* Universal clean theme overrides */
body.clean-view * {
    color: var(--clean-fg) !important;
    border-color: var(--clean-border) !important;
}

/* Clean theme exceptions - elements that should stay inverted */
body.clean-view .classified-banner,
body.clean-view .warning-tape {
    background: var(--clean-fg) !important;
    color: var(--clean-bg) !important;
}

/* Clean theme hover states */
body.clean-view .nav-menu a:hover,
body.clean-view .order-card:hover,
body.clean-view .file-tree li:hover,
body.clean-view .search-btn:hover,
body.clean-view .nav-btn:hover {
    background: var(--clean-fg) !important;
    color: var(--clean-bg) !important;
}

/* Terminal theme specific styles */
body:not(.clean-view) {
    background: var(--bg);
    color: var(--fg);
}

/* ========================================
   UTILITY CLASSES
   ======================================== */

.text-accent {
    color: var(--accent) !important;
}

.text-warning {
    color: var(--warning) !important;
}

.text-small {
    font-size: var(--fs-small);
}

.text-tiny {
    font-size: var(--fs-tiny);
}

.text-uppercase {
    text-transform: uppercase;
    letter-spacing: 1px;
}

.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}

/* ========================================
   RESPONSIVE BREAKPOINTS
   ======================================== */

/* Mobile First Approach */
@media (max-width: 480px) {
    :root {
        --fs-hero: 1.5rem;
        --fs-title: 1.8rem;
        --space-lg: 1rem;
    }
    
    .container {
        padding: 0 var(--space-sm);
    }
}

@media (max-width: 768px) {
    :root {
        --fs-hero: 2rem;
        --fs-title: 2rem;
        --header-height: 100px;
    }
    
    .container {
        padding: 0 var(--space-md);
    }
}

@media (max-width: 900px) {
    :root {
        --sidebar-width: 200px;
    }
}

/* ========================================
   ACCESSIBILITY
   ======================================== */

/* Focus indicators */
*:focus {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
}

body.clean-view *:focus {
    outline-color: var(--clean-fg);
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}
```

## 📁 FILE 2: shared/css/layout.css
```css
/* ========================================
   UNIFIED LAYOUT CSS - PAGE STRUCTURE
   Master layout system for all sites
   ======================================== */

/* ========================================
   GRID SYSTEMS - FLEXIBLE LAYOUTS
   ======================================== */

/* Default: Two-column layout with sidebar */
.main-content {
    display: grid;
    grid-template-columns: var(--sidebar-width) 1fr;
    gap: var(--space-lg);
    padding: var(--space-lg) 0;
    min-height: calc(100vh - var(--header-height));
}

/* Wide sidebar variant */
.main-content.wide {
    grid-template-columns: 300px 1fr;
}

/* Full width layout (no sidebar) */
.main-content.full-width {
    grid-template-columns: 1fr;
    max-width: var(--container-max);
    margin: 0 auto;
}

/* Search Results Layout */
.results-layout {
    display: grid;
    grid-template-columns: var(--sidebar-width) 1fr;
    gap: var(--space-lg);
    padding: var(--space-lg) 0;
}

/* Full width results layout (no sidebar) */
.results-layout.full-width {
    grid-template-columns: 1fr;
    max-width: var(--container-max);
    margin: 0 auto;
}

/* ========================================
   HEADER LAYOUT
   ======================================== */

.master-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    height: var(--header-height);
    display: flex;
    align-items: center;
}

.master-header .container {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.terminal-line {
    margin-bottom: var(--space-xs);
}

.master-nav {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    width: 100%;
}

/* ========================================
   CONTENT AREAS
   ======================================== */

.content-wrapper {
    margin-top: var(--header-height);
    min-height: calc(100vh - var(--header-height));
}

/* Sidebar component - optional */
.sidebar {
    position: sticky;
    top: calc(var(--header-height) + var(--space-sm));
    height: fit-content;
    max-height: calc(100vh - var(--header-height) - var(--space-lg));
    overflow-y: auto;
    background: var(--bg);
    padding: var(--space-md);
    border: 1px solid var(--border);
}

body.clean-view .sidebar {
    background: var(--clean-bg);
    border-color: var(--clean-border);
}

/* Content area - adapts to layout */
.content-area {
    min-height: 600px;
    display: flex;
    flex-direction: column;
    background: var(--bg);
    border: 1px solid var(--border);
    overflow: hidden;
}

body.clean-view .content-area {
    background: var(--clean-bg);
    border-color: var(--clean-border);
}

/* Full width content (no sidebar) */
.content-area.full-width {
    border: none;
    background: transparent;
}

body.clean-view .content-area.full-width {
    background: transparent;
}

.document-content {
    flex: 1;
    padding: var(--space-lg);
}

/* Full width document content */
.document-content.full-width {
    padding: var(--space-lg) 0;
}

/* ========================================
   HERO SECTIONS
   ======================================== */

.hero {
    width: 100%;
    padding: var(--space-xl) 0;
    margin-top: var(--header-height);
}

.search-header {
    width: 100%;
    padding: var(--space-xl) 0;
    margin-top: var(--header-height);
    border-bottom: 1px solid var(--border);
}

body.clean-view .search-header {
    border-bottom-color: var(--clean-border);
}

.glossary-header {
    width: 100%;
    padding: var(--space-xl) 0;
    margin-top: var(--header-height);
    border-bottom: 1px solid var(--border);
}

body.clean-view .glossary-header {
    border-bottom-color: var(--clean-border);
}

.search-title-section,
.glossary-title-section {
    text-align: center;
    margin-bottom: var(--space-lg);
}

.search-title,
.glossary-title {
    font-size: var(--fs-title);
    color: var(--fg);
    text-transform: uppercase;
    letter-spacing: 3px;
    margin-bottom: var(--space-xs);
    font-weight: bold;
}

body.clean-view .search-title,
body.clean-view .glossary-title {
    color: var(--clean-fg);
}

.search-subtitle,
.glossary-subtitle {
    font-size: var(--fs-subtitle);
    opacity: 0.8;
    margin-bottom: 0;
}

/* ========================================
   RESPONSIVE LAYOUT
   ======================================== */

@media (max-width: 768px) {
    /* Mobile: All layouts become single column */
    .main-content,
    .main-content.wide,
    .main-content.full-width,
    .results-layout,
    .results-layout.full-width {
        grid-template-columns: 1fr;
        gap: var(--space-sm);
    }
    
    .sidebar,
    .results-sidebar {
        position: static;
        order: 1;
        max-height: none;
    }
    
    .content-area {
        order: 0;
    }
    
    /* Mobile hero adjustments */
    .hero,
    .search-header,
    .glossary-header {
        padding: var(--space-lg) 0;
    }
}

@media (max-width: 480px) {
    .hero,
    .search-header,
    .glossary-header {
        padding: var(--space-md) 0;
    }
    
    .container {
        padding: 0 var(--space-sm);
    }
    
    .main-content,
    .results-layout {
        padding: var(--space-sm) 0;
    }
}
```

## 📁 FILE 3: shared/css/components.css
```css
/* ========================================
   UNIFIED COMPONENTS CSS - REUSABLE UI
   Master components used across all sites
   ======================================== */

/* ========================================
   HEADER COMPONENT
   ======================================== */

.master-header {
    background: var(--bg);
    border-bottom: 1px solid var(--border);
    padding: var(--space-sm) 0;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    height: var(--header-height);
}

body.clean-view .master-header {
    background: var(--clean-bg);
    border-bottom-color: var(--clean-border);
}

.terminal-line {
    color: var(--fg);
    font-size: var(--fs-small);
    margin-bottom: var(--space-xs);
    opacity: 0.7;
}

body.clean-view .terminal-line {
    color: var(--clean-fg);
}

/* ========================================
   NAVIGATION COMPONENT
   ======================================== */

.master-nav {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: var(--space-sm);
}

.nav-left {
    display: flex;
    align-items: center;
}

.logo {
    font-size: var(--fs-subtitle);
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: var(--fg);
    text-decoration: none;
}

body.clean-view .logo {
    color: var(--clean-fg);
}

.nav-menu {
    display: flex;
    list-style: none;
    gap: var(--space-lg);
    justify-self: center;
}

.nav-menu li {
    margin: 0;
}

.nav-menu a {
    color: var(--fg);
    text-decoration: none;
    padding: 0.6rem 1.25rem;
    border: 1px solid var(--border);
    transition: all 0.3s ease;
    text-transform: uppercase;
    font-size: var(--fs-small);
    letter-spacing: 1px;
    display: inline-block;
}

.nav-menu a:hover {
    background: var(--fg);
    color: var(--bg);
    text-decoration: none;
}

.nav-menu .current-page {
    color: var(--accent);
    padding: 0.6rem 1.25rem;
    border: 1px solid var(--accent);
    background: rgba(0, 255, 65, 0.1);
    text-transform: uppercase;
    font-size: var(--fs-small);
    letter-spacing: 1px;
    cursor: default;
}

/* Clean theme navigation */
body.clean-view .nav-menu a {
    color: var(--clean-fg);
    border-color: var(--clean-border);
}

body.clean-view .nav-menu a:hover {
    background: var(--clean-fg);
    color: var(--clean-bg);
}

body.clean-view .nav-menu .current-page {
    color: var(--clean-fg);
    border-color: var(--clean-border);
    background: rgba(0, 0, 0, 0.1);
}

.nav-right {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    justify-self: end;
}

/* ========================================
   VIEW TOGGLE COMPONENT
   ======================================== */

.view-toggle {
    display: flex;
    gap: 0;
    background: transparent;
    border: none;
    padding: 0;
}

.view-toggle button {
    color: var(--fg);
    background: var(--bg);
    padding: 0.6rem 1.25rem;
    border: 1px solid var(--border);
    cursor: pointer;
    font-family: var(--font);
    font-size: var(--fs-small);
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: all 0.3s ease;
    display: block;
}

.view-toggle button:hover {
    background: var(--fg);
    color: var(--bg);
}

/* Clean theme toggle */
body.clean-view .view-toggle button {
    color: var(--clean-fg);
    background: var(--clean-bg);
    border-color: var(--clean-border);
}

body.clean-view .view-toggle button:hover {
    background: var(--clean-fg);
    color: var(--clean-bg);
}

.toggle-text {
    display: block;
}

/* ========================================
   MOBILE MENU COMPONENT
   ======================================== */

.mobile-menu-toggle {
    display: none;
    flex-direction: column;
    justify-content: space-between;
    width: 24px;
    height: 18px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
}

.mobile-menu-toggle span {
    display: block;
    width: 100%;
    height: 2px;
    background: var(--fg);
    border-radius: 1px;
    transition: all 0.3s ease;
}

body.clean-view .mobile-menu-toggle span {
    background: var(--clean-fg);
}

@media (max-width: 768px) {
    .mobile-menu-toggle {
        display: flex;
    }
    
    .nav-menu {
        position: fixed;
        top: 0;
        right: -100%;
        bottom: 0;
        width: 80vw;
        max-width: 300px;
        background: var(--bg);
        border-left: 1px solid var(--border);
        flex-direction: column;
        padding: var(--space-xxl) 0 0 0;
        transition: right 0.3s ease;
        z-index: 999;
    }
    
    body.nav-open .nav-menu {
        right: 0;
    }
    
    body.clean-view .nav-menu {
        background: var(--clean-bg);
        border-left-color: var(--clean-border);
    }
    
    .nav-menu a {
        display: block;
        width: 100%;
        padding: var(--space-sm) var(--space-md);
        border: none;
        border-bottom: 1px solid var(--border);
        text-align: left;
    }
    
    body.clean-view .nav-menu a {
        border-bottom-color: var(--clean-border);
    }
}

/* ========================================
   HERO COMPONENT
   ======================================== */

.hero {
    padding: var(--space-md) 0;
    text-align: center;
    background: var(--bg);
    border-bottom: 1px solid var(--border);
    margin-top: var(--header-height);
}

body.clean-view .hero {
    background: var(--clean-bg);
    border-bottom-color: var(--clean-border);
}

.hero .container {
    max-width: var(--container-max);
    margin: 0 auto;
}

.hero h1 {
    font-size: var(--fs-hero);
    color: var(--fg);
    margin: var(--space-md) 0 var(--space-sm) 0;
    text-transform: uppercase;
    letter-spacing: 3px;
}

body.clean-view .hero h1 {
    color: var(--clean-fg);
}

.hero-subtitle {
    font-size: var(--fs-subtitle);
    margin: 0 auto var(--space-sm) auto;
    max-width: 800px;
    opacity: 0.8;
    line-height: 1.6;
}

/* ========================================
   BANNER COMPONENTS
   ======================================== */

.classified-banner {
    background: var(--fg);
    color: var(--bg);
    padding: var(--space-xs);
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: var(--space-sm);
    border: none;
    font-size: var(--fs-small);
}

body.clean-view .classified-banner {
    background: var(--clean-fg);
    color: var(--clean-bg);
}

.warning-tape {
    background: var(--fg);
    color: var(--bg);
    height: 30px;
    margin: var(--space-lg) 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-size: var(--fs-small);
}

body.clean-view .warning-tape {
    background: var(--clean-fg);
    color: var(--clean-bg);
}

/* ========================================
   CARD COMPONENTS
   ======================================== */

.order-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: var(--space-sm);
    margin-top: var(--space-sm);
}

.order-card {
    background: var(--bg);
    border: 1px solid var(--border);
    padding: var(--space-sm);
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
}

.order-card:hover {
    background: rgba(0, 255, 65, 0.05);
}

body.clean-view .order-card {
    background: var(--clean-bg);
    border-color: var(--clean-border);
}

body.clean-view .order-card:hover {
    background: rgba(0, 0, 0, 0.05);
}

.order-number {
    color: var(--fg);
    font-size: var(--fs-small);
    font-weight: bold;
    margin-bottom: var(--space-xs);
}

body.clean-view .order-number {
    color: var(--clean-fg);
}

.order-title {
    color: var(--fg);
    font-size: var(--fs-small);
    margin-bottom: var(--space-xs);
    font-weight: bold;
}

body.clean-view .order-title {
    color: var(--clean-fg);
}

.order-excerpt {
    color: var(--fg);
    font-size: var(--fs-tiny);
    line-height: 1.4;
    opacity: 0.7;
}

body.clean-view .order-excerpt {
    color: var(--clean-fg);
}

/* ========================================
   BUTTON COMPONENTS
   ======================================== */

.search-btn, .nav-btn {
    background: var(--bg);
    border: 1px solid var(--border);
    color: var(--fg);
    padding: 0.75rem 1.5rem;
    font: inherit;
    text-transform: uppercase;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    display: inline-block;
    font-size: var(--fs-small);
}

.search-btn:hover, .nav-btn:hover {
    background: var(--fg);
    color: var(--bg);
    text-decoration: none;
}

body.clean-view .search-btn,
body.clean-view .nav-btn {
    background: var(--clean-bg);
    border-color: var(--clean-border);
    color: var(--clean-fg);
}

body.clean-view .search-btn:hover,
body.clean-view .nav-btn:hover {
    background: var(--clean-fg);
    color: var(--clean-bg);
}

/* ========================================
   FORM COMPONENTS
   ======================================== */

.search-form {
    display: flex;
    gap: var(--space-sm);
    margin-bottom: var(--space-lg);
}

.search-input {
    flex: 1;
    background: var(--bg);
    border: 1px solid var(--border);
    color: var(--fg);
    padding: var(--space-sm);
    font-family: var(--font);
    font-size: var(--fs-body);
    outline: none;
    transition: box-shadow 0.3s ease;
}

.search-input:focus {
    box-shadow: 0 0 20px rgba(0, 255, 65, 0.3);
}

.search-input::placeholder {
    color: var(--fg);
    opacity: 0.5;
}

body.clean-view .search-input {
    background: var(--clean-bg);
    border-color: var(--clean-border);
    color: var(--clean-fg);
}

body.clean-view .search-input::placeholder {
    color: var(--clean-fg);
}

body.clean-view .search-input:focus {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}

/* ========================================
   SECTION COMPONENTS
   ======================================== */

.section-block {
    border: 1px solid var(--border);
    margin-bottom: var(--space-lg);
    overflow: hidden;
}

body.clean-view .section-block {
    border-color: var(--clean-border);
}

.section-header {
    padding: var(--space-sm) var(--space-lg);
    cursor: pointer;
    transition: background 0.3s ease;
    background: var(--bg);
}

.section-header:hover {
    background: rgba(0, 255, 65, 0.05);
}

body.clean-view .section-header {
    background: var(--clean-bg);
}

body.clean-view .section-header:hover {
    background: rgba(0, 0, 0, 0.05);
}

.section-title {
    color: var(--fg);
    font-size: var(--fs-body);
    text-transform: uppercase;
    letter-spacing: 1px;
}

body.clean-view .section-title {
    color: var(--clean-fg);
}

.section-content {
    padding: var(--space-lg);
    display: none;
    background: var(--bg);
}

.section-content.active {
    display: block;
}

body.clean-view .section-content {
    background: var(--clean-bg);
}

/* ========================================
   SIDEBAR COMPONENTS
   ======================================== */

.sidebar h3 {
    color: var(--fg);
    margin-bottom: var(--space-sm);
    text-transform: uppercase;
    font-size: var(--fs-small);
    letter-spacing: 1px;
}

body.clean-view .sidebar h3 {
    color: var(--clean-fg);
}

.file-tree {
    list-style: none;
    font-size: var(--fs-small);
}

.file-tree li {
    margin-bottom: var(--space-xs);
    padding: var(--space-xs) 0;
    cursor: pointer;
    transition: all 0.3s ease;
    padding-left: var(--space-sm);
    position: relative;
}

.file-tree li:before {
    content: "├─";
    position: absolute;
    left: 0;
    color: var(--fg);
}

.file-tree li:hover {
    background: rgba(0, 255, 65, 0.05);
    color: var(--fg);
}

body.clean-view .file-tree li:before {
    color: var(--clean-fg);
}

body.clean-view .file-tree li:hover {
    background: rgba(0, 0, 0, 0.05);
    color: var(--clean-fg);
}

/* ========================================
   STATS COMPONENTS
   ======================================== */

.stats-bar {
    background: var(--bg);
    padding: var(--space-sm) var(--space-lg);
    border-top: 1px solid var(--border);
    display: flex;
    justify-content: space-between;
    font-size: var(--fs-small);
    flex-wrap: wrap;
    gap: var(--space-sm);
}

body.clean-view .stats-bar {
    background: var(--clean-bg);
    border-top-color: var(--clean-border);
}

.stat-item {
    color: var(--fg);
}

body.clean-view .stat-item {
    color: var(--clean-fg);
}

.stat-value {
    color: var(--accent);
    font-weight: bold;
}

body.clean-view .stat-value {
    color: var(--clean-fg);
}

/* ========================================