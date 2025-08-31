/* ========================================
   NAVIGATION COMPONENT - REUSABLE HEADER
   ========================================
   Dynamic navigation that adapts to page context:
   - Root pages: Logo only, no menu buttons
   - Mini-site pages: Logo + mini-site navigation
   - Deep pages: Adjusted paths for navigation
   ======================================== */

class NavigationComponent {
    constructor(options = {}) {
        // NavigationComponent constructor
        
        this.pageContext = this.detectPageContext();
        this.pathDepth = this.calculatePathDepth();
        
        // Accept manual navigation links configuration
        this.customNavLinks = options.navLinks || null;
        this.currentPage = options.currentPage || this.getCurrentPage();
        
        // Page context and navigation setup complete
    }

    detectPageContext() {
        const path = window.location.pathname;
        const segments = path.split('/').filter(segment => segment !== '');
        
        // Root page (index.html at root)
        if (segments.length === 0 || (segments.length === 1 && segments[0] === 'index.html')) {
            return 'root';
        }
        
        // Mini-site page (folder/index.html or folder/page.html)
        if (segments.length === 1 || (segments.length === 2 && !segments[1].includes('orders'))) {
            return 'minisite';
        }
        
        // Deep page (folder/subfolder/page.html)
        return 'deep';
    }

    calculatePathDepth() {
        const path = window.location.pathname;
        const segments = path.split('/').filter(segment => segment !== '' && segment !== 'index.html');
        return segments.length;
    }

    getLogoPath() {
        // Logo always redirects to the root index.html regardless of page location
        // For GitHub Pages deployment, detect automatically and use repository path
        if (window.location.hostname.includes('github.io')) {
            const pathSegments = window.location.pathname.split('/').filter(segment => segment !== '');
            if (pathSegments.length > 0) {
                // Use the repository name (first path segment) for GitHub Pages
                return `/${pathSegments[0]}/`;
            }
        }
        
        // For local development, use relative paths
        if (this.pageContext === 'root') {
            return './';
        }
        return '../'.repeat(this.pathDepth) + 'index.html';
    }

    getMenuPaths() {
        let basePath;

        // Handle GitHub Pages deployment
        if (window.location.hostname.includes('github.io')) {
            const pathSegments = window.location.pathname.split('/').filter(segment => segment !== '');
            if (pathSegments.length > 0) {
                const repoName = pathSegments[0];
                if (this.pageContext === 'deep') {
                    basePath = `/${repoName}/osa-network-orders/`;
                } else {
                    basePath = `/${repoName}/osa-network-orders/`;
                }
            }
        } else {
            // For local development
            if (this.pageContext === 'deep') {
                // For deep pages like osa-network-orders/orders/nw_order_001.html
                // Need to go up two levels to reach osa-network-orders/
                basePath = '../../';
            } else {
                // For minisite pages like osa-network-orders/index.html, glossary.html, etc.
                basePath = './';
            }
        }

        const paths = {
            home: basePath + 'index.html',
            search: basePath + 'search_results.html',
            glossary: basePath + 'glossary.html'
        };
        
        // Menu paths generated
        return paths;
    }

    getTerminalLine() {
        const path = window.location.pathname;
        
        if (path.includes('search_results')) {
            return 'user@archive:~/search$ grep -r "QUERY" osa_database/';
        }
        
        if (path.includes('glossary')) {
            return 'user@archive:~/docs$ cat glossary.txt | grep -i "term"';
        }
        
        if (path.includes('orders/')) {
            const orderFile = path.split('/').pop();
            return `root@osa-network:~/leaked_orders# cat ${orderFile}`;
        }
        
        if (path.includes('osa-network-orders')) {
            return 'user@archive:~$ cat leaked_documents/osa_network_orders.txt';
        }
        
        if (path.includes('scientology-dictionary')) {
            return 'user@archive:~/dictionary$ ls -la scientology_terms.db';
        }
        
        return 'user@archive:~$ ls -la classified_documents/';
    }

    getMenuTitle() {
        const path = window.location.pathname;
        
        if (path.includes('osa-network-orders')) {
            return 'HOME NW';
        }
        
        if (path.includes('scientology-dictionary')) {
            return 'HOME DICT';
        }
        
        return 'HOME';
    }

    getCurrentThemeMode() {
        // Use the same logic as theme-manager.js for consistency
        try {
            const savedMode = localStorage.getItem('viewMode');
            
            // If no saved mode, check system preference and save it
            if (!savedMode) {
                const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                const defaultMode = prefersDark ? 'terminal' : 'clean';
                
                // Save the detected system preference to localStorage for consistency
                try {
                    localStorage.setItem('viewMode', defaultMode);
                    console.log('Navigation: Saved system preference to localStorage:', defaultMode);
                } catch (saveError) {
                    console.warn('Navigation: Could not save system preference to localStorage:', saveError);
                }
                
                console.log('Navigation: No saved theme found, using system preference:', defaultMode);
                return defaultMode;
            }
            
            console.log('Navigation: Retrieved saved theme:', savedMode);
            return savedMode;
        } catch (error) {
            console.warn('Navigation: Could not read theme from localStorage:', error);
            return 'clean'; // Safe default to light mode
        }
    }

    getCurrentPage() {
        const path = window.location.pathname;
        
        if (path.includes('search_results')) {
            return 'search';
        }
        
        if (path.includes('glossary')) {
            return 'glossary';
        }
        
        return 'home';
    }

    generateNavigationHTML() {
        const logoPath = this.getLogoPath();
        const terminalLine = this.getTerminalLine();
        const menuPaths = this.getMenuPaths();
        const menuTitle = this.getMenuTitle();
        const currentPage = this.getCurrentPage();

        // Get current theme to determine toggle display
        const currentMode = this.getCurrentThemeMode();
        const toggleText = currentMode === 'clean' ? 'DARK' : 'LIGHT';
        
        // ASCII art for view toggle (using correct format from icons.html)
        const asciiArt = `[${toggleText}]
┌─────┐
│ >_  │
└─────┘`;

        let navigationHTML = `
        <header class="master-header header-full-width">
            <div class="header-content">
                <!-- Terminal line - context specific -->
                <div class="terminal-line">${terminalLine}</div>
                
                <!-- Navigation component -->
                <nav${this.pageContext === 'root' ? '' : ' class="master-nav"'}>
                    <div class="nav-left">
                        <!-- Logo always goes to root -->
                        <a href="${logoPath}" class="logo">[SCNDB]</a>
                    </div>`;

        // Only add menu for non-root pages
        if (this.pageContext !== 'root') {
            if (this.customNavLinks) {
                // Use custom navigation links provided manually
                navigationHTML += `
                    
                    <!-- Main navigation - manually configured links -->
                    <ul class="nav-menu">`;
                
                this.customNavLinks.forEach(link => {
                    const isCurrentPage = this.currentPage === link.key;
                    if (isCurrentPage) {
                        navigationHTML += `
                        <li><span class="current-page mobile-nav-link">${link.label}</span></li>`;
                    } else {
                        navigationHTML += `
                        <li><a href="${link.href}" class="mobile-nav-link">${link.label}</a></li>`;
                    }
                });
                
                navigationHTML += `
                    </ul>`;
            } else {
                // Fallback to automatic generation
                navigationHTML += `
                    
                    <!-- Main navigation - page specific links -->
                    <ul class="nav-menu">
                        <li>${currentPage === 'home' ? `<span class="current-page mobile-nav-link">${menuTitle}</span>` : `<a href="${menuPaths.home}" class="mobile-nav-link">${menuTitle}</a>`}</li>
                <li>${currentPage === 'search' ? `<span class="current-page mobile-nav-link">SEARCH</span>` : `<a href="${menuPaths.search}" class="mobile-nav-link">SEARCH</a>`}</li>
                <li>${currentPage === 'glossary' ? `<span class="current-page mobile-nav-link">GLOSSARY</span>` : `<a href="${menuPaths.glossary}" class="mobile-nav-link">GLOSSARY</a>`}</li>
                    </ul>`;
            }
        }

        navigationHTML += `
                    
                    <div class="nav-right">
                        <!-- View toggle component -->
                        <div class="view-toggle" role="tablist" aria-label="View Switcher">
                            <div id="btn-view-toggle" role="tab" aria-selected="false" data-mode="clean" class="ascii-art terminal-toggle-icon">${asciiArt}
                            </div>
                        </div>`;

        // Only add mobile menu toggle for non-root pages
        if (this.pageContext !== 'root') {
            navigationHTML += `

                        <button class="mobile-menu-toggle" aria-label="Toggle mobile menu">
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>`;
        }

        navigationHTML += `
                    </div>
                </nav>
            </div>
        </header>`;

        return navigationHTML;
    }

    updateToggleDisplay() {
        const currentMode = this.getCurrentThemeMode();
        this.updateToggleDisplayForTheme(currentMode);
    }

    updateToggleDisplayForTheme(theme) {
        const toggleBtn = document.getElementById('btn-view-toggle');
        if (toggleBtn) {
            const toggleText = theme === 'clean' ? 'DARK' : 'LIGHT';
            const asciiArt = `[${toggleText}]
┌─────┐
│ >_  │
└─────┘`;
            toggleBtn.innerHTML = asciiArt;
            // Toggle display updated for theme
        }
    }

    render() {
        // Rendering navigation component
        
        // Apply body class based on context
        document.body.classList.add(this.pageContext + '-page');
        // Added page-specific body class
        
        // Find existing header or create container
        let headerContainer = document.querySelector('header.master-header, header.header-full-width');
        // Checking for existing header
        
        if (headerContainer) {
            // Replace existing header
            headerContainer.outerHTML = this.generateNavigationHTML();
            // Replaced existing header
        } else {
            // Insert at beginning of body
            document.body.insertAdjacentHTML('afterbegin', this.generateNavigationHTML());
            // Inserted new header
        }
        
        // Verify header was inserted
        const newHeader = document.querySelector('header.master-header, header.header-full-width');
        // Header insertion complete
        
        // Initialize mobile menu functionality
        this.initializeMobileMenu();
        
        // Update toggle display based on current theme
        this.updateToggleDisplay();
        
        // Listen for theme changes to update toggle display
        window.addEventListener('themeChanged', (event) => {
            // Use the theme from the event instead of reading from localStorage to avoid race conditions
            const newTheme = event.detail?.theme || this.getCurrentThemeMode();
            this.updateToggleDisplayForTheme(newTheme);
        });
        
        // Initialize theme toggle functionality
        this.initializeThemeToggle();
        
        // Navigation component render complete
    }
    
    initializeThemeToggle() {
        // Theme toggle is now handled exclusively by theme-manager.js
        // This prevents conflicts and ensures consistent behavior
        // Theme toggle initialization delegated to theme-manager.js
        
        // Re-initialize theme manager after navigation renders to bind listeners to new element
        if (window.initializeThemeManager) {
            // Re-initializing theme manager after render
            window.initializeThemeManager();
        } else {
            // theme-manager.js initializeThemeManager function not available
        }
        
        // Just update the display if the button exists and theme manager is available
        const toggleBtn = document.getElementById('btn-view-toggle');
        if (toggleBtn && window.updateToggleDisplay) {
            const currentMode = this.getCurrentThemeMode();
            window.updateToggleDisplay(currentMode);
        }
    }

    initializeMobileMenu() {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const navMenu = document.querySelector('.nav-menu');

        if (mobileToggle && navMenu) {
            
            // Toggle mobile menu
            mobileToggle.addEventListener('click', (e) => {
                document.body.classList.toggle('nav-open');
                mobileToggle.classList.toggle('active');
            });

            // Close menu when clicking the close button (::before pseudo-element)
            navMenu.addEventListener('click', (e) => {
                // Don't interfere with navigation links
                if (e.target.tagName === 'A' && e.target.classList.contains('mobile-nav-link')) {
                    return; // Let the link navigate normally
                }
                
                // Check if click is on the close button area (top part of menu)
                const rect = navMenu.getBoundingClientRect();
                const clickY = e.clientY - rect.top;
                
                // If click is in the top 60px (close button area)
                if (clickY <= 60) {
                    document.body.classList.remove('nav-open');
                    mobileToggle.classList.remove('active');
                }
            });

            // Close menu when clicking backdrop
            document.addEventListener('click', (e) => {
                if (document.body.classList.contains('nav-open')) {
                    // Check if click is outside the menu and toggle button
                    if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
                        document.body.classList.remove('nav-open');
                        mobileToggle.classList.remove('active');
                    }
                }
            });

            // Close menu when pressing Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && document.body.classList.contains('nav-open')) {
                    document.body.classList.remove('nav-open');
                    mobileToggle.classList.remove('active');
                }
            });
        }
    }
}

// Auto-initialize when DOM is ready
// Initialize navigation component
function initializeNavigation(options = {}) {
    const nav = new NavigationComponent(options);
    nav.render();
    return nav;
}

// Auto-initialize with default settings if no manual configuration is found
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // Check if manual navigation config exists
        if (typeof window.navigationConfig === 'undefined') {
            initializeNavigation();
        }
    });
} else {
    // Check if manual navigation config exists
    if (typeof window.navigationConfig === 'undefined') {
        initializeNavigation();
    }
}

// Export for manual initialization if needed
window.NavigationComponent = NavigationComponent;
window.initializeNavigation = initializeNavigation;