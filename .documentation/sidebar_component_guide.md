# Sidebar Component System

## Overview

The sidebar is a **flexible, optional component** that can be used or omitted based on page needs. Here are the layout options:

## 🎨 **Typography Specifications**

### Filter Sidebar Typography
For search results pages with filter functionality:

- **Main Title** (e.g., "Filter Results"): `--fs-body-large` + `font-weight: bold`
- **Section Titles** (e.g., "By Section", "Order Range"): `--fs-body-small` + `font-weight: bold`
- **Filter Items**: `--fs-body-small`
- **Spacing**: Sections use `--space-xl` margin-bottom, titles use `--space-md` margin-bottom
- **Item Spacing**: Filter items use `0.25rem` padding for compact layout

### CSS Classes
```css
/* Main sidebar titles */
.filter-group-section:first-child h3,
.filter-group-section:first-child .filter-section-heading {
    font-size: var(--fs-body-large);
    font-weight: bold;
    margin-bottom: var(--space-md);
}

/* Section titles */
.filter-section-heading {
    font-size: var(--fs-body-small);
    font-weight: bold;
}

/* Filter items */
.filter-option-item {
    font-size: var(--fs-body-small);
    padding: 0.25rem 0;
}
```

## 🏗️ **Layout Variants**

### 1. **With Sidebar** (Default)
Pages like index and search results that need filters or navigation.

**HTML Structure:**
```html
<div class="container">
    <div class="main-content"> <!-- Two-column layout -->
        <aside class="sidebar">
            <!-- Sidebar content -->
        </aside>
        <main class="content-area">
            <!-- Main content -->
        </main>
    </div>
</div>
```

### 2. **Wide Sidebar** (Optional)
For pages needing more sidebar space.

**HTML Structure:**
```html
<div class="container">
    <div class="main-content wide"> <!-- Wide sidebar layout -->
        <aside class="sidebar">
            <!-- Wider sidebar content -->
        </aside>
        <main class="content-area">
            <!-- Main content -->
        </main>
    </div>
</div>
```

### 3. **No Sidebar** (Full Width)
Pages like glossary that need full width.

**HTML Structure:**
```html
<div class="container">
    <!-- Content directly in container - no main-content wrapper needed -->
    <section class="glossary-page">
        <!-- Full width content -->
    </section>
</div>
```

## 📋 **Sidebar Component Types**

### **Navigation Sidebar** (Index pages)
```html
<aside class="sidebar">
    <h3>Document Sections</h3>
    <ul class="file-tree">
        <li data-section="general">OSA General (1-41)</li>
        <li data-section="intelligence">Intelligence (42-74)</li>
        <li data-section="pr">Public Relations (75-102)</li>
        <li data-section="legal">Legal (103-136)</li>
        <li data-section="social">Social Reform (137-149)</li>
    </ul>
    
    <h3 class="quick-stats-title">Quick Stats</h3>
    <div class="sidebar-quick-stats">
        <div>Total Orders: <span class="text-accent">149</span></div>
        <div>Pages: <span class="text-accent">500+</span></div>
        <div>Date Range: <span class="text-accent">1975-2006</span></div>
        <div>Status: <span class="text-accent">LEAKED</span></div>
    </div>
</aside>
```

### **Filter Sidebar** (Search results)
```html
<aside class="results-sidebar">
    <div class="sidebar-section">
        <h3 class="sidebar-title">Filter Results</h3>
        <ul class="filter-list">
            <li data-filter-all>All Documents <span class="filter-count">(0)</span></li>
        </ul>
    </div>
    
    <div class="sidebar-section">
        <h3 class="sidebar-title">By Section</h3>
        <ul class="filter-list">
            <li data-filter-section="OSA General">OSA General <span class="filter-count">(0)</span></li>
            <li data-filter-section="Intelligence">Intelligence <span class="filter-count">(0)</span></li>
            <!-- More filters... -->
        </ul>
    </div>
</aside>
```

## 🎯 **When to Use Each Layout**

| Page Type | Layout | Sidebar Type | Example |
|-----------|--------|--------------|---------|
| **Main/Index** | `main-content` | Navigation sidebar | Document sections, stats |
| **Search Results** | `results-layout` | Filter sidebar | Search filters, categories |
| **Individual Documents** | `main-content` | Navigation sidebar | Related docs, TOC |
| **Glossary** | No sidebar | None | Full width for alphabet/terms |
| **Simple Pages** | No sidebar | None | About, contact, etc. |

## 📱 **Mobile Behavior**

- **All layouts** become single-column on mobile (< 768px)
- **Sidebar moves below** main content automatically
- **No extra CSS needed** - handled by responsive grid

## 🔧 **Implementation Examples**

### **Adding Sidebar to New Page:**
```html
<!-- With sidebar -->
<div class="container">
    <div class="main-content">
        <aside class="sidebar">
            <h3>Page Navigation</h3>
            <ul class="file-tree">
                <li>Section 1</li>
                <li>Section 2</li>
            </ul>
        </aside>
        <main class="content-area">
            <div class="document-content">
                <!-- Your page content -->
            </div>
        </main>
    </div>
</div>
```

### **Removing Sidebar (Full Width):**
```html
<!-- No sidebar -->
<div class="container">
    <section class="your-page-class">
        <!-- Your full-width content -->
    </section>
</div>
```

## ✅ **Benefits of This System:**

1. **Flexible** - Easy to add/remove sidebars
2. **Consistent** - Same styling across all sidebars
3. **Responsive** - Mobile-friendly automatically  
4. **Modular** - Mix and match sidebar content
5. **Future-proof** - Easy to create new sidebar types

The sidebar is now a truly optional, reusable component that you can use when needed and skip when you want full-width layouts!