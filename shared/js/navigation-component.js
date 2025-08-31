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
        console.log('🚀 NavigationComponent constructor called');
        console.log('🌐 Current pathname:', window.location.pathname);
        
        this.pageContext = this.detectPageContext();
        this.pathDepth = this.calculatePathDepth();
        
        // Accept manual navigation links configuration
        this.customNavLinks = options.navLinks || null;
        this.currentPage = options.currentPage || this.getCurrentPage();
        
        console.log('📍 Detected page context:', this.pageContext);
        console.log('📏 Path depth:', this.pathDepth);
        console.log('🔗 Custom nav links:', this.customNavLinks);
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
        
        console.log('🗺️ Generated menu paths:', paths);
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
        // Use the same logic as theme-manager.js
        try {
            const savedMode = localStorage.getItem('viewMode');
            
            // If no saved mode, check system preference for dark mode
            if (!savedMode) {
                const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                const defaultMode = prefersDark ? 'terminal' : 'clean';
                return defaultMode;
            }
            
            return savedMode;
        } catch (error) {
            return 'clean';
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
                        <li><a href="${link.href}" class="mobile-nav-link" onclick="console.log('🔗 ${link.label} link clicked:', '${link.href}'); return true;">${link.label}</a></li>`;
                    }
                });
                
                navigationHTML += `
                    </ul>`;
            } else {
                // Fallback to automatic generation
                navigationHTML += `
                    
                    <!-- Main navigation - page specific links -->
                    <ul class="nav-menu">
                        <li>${currentPage === 'home' ? `<span class="current-page mobile-nav-link">${menuTitle}</span>` : `<a href="${menuPaths.home}" class="mobile-nav-link" onclick="console.log('🏠 Home link clicked:', '${menuPaths.home}'); return true;">${menuTitle}</a>`}</li>
                        <li>${currentPage === 'search' ? `<span class="current-page mobile-nav-link">SEARCH</span>` : `<a href="${menuPaths.search}" class="mobile-nav-link" onclick="console.log('🔍 Search link clicked:', '${menuPaths.search}'); return true;">SEARCH</a>`}</li>
                        <li>${currentPage === 'glossary' ? `<span class="current-page mobile-nav-link">GLOSSARY</span>` : `<a href="${menuPaths.glossary}" class="mobile-nav-link" onclick="console.log('📚 Glossary link clicked:', '${menuPaths.glossary}'); return true;">GLOSSARY</a>`}</li>
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
            console.log(`Navigation: Updated toggle display for theme: ${theme}, showing: ${toggleText}`);
        }
    }

    render() {
        console.log('🎨 Rendering navigation component...');
        console.log('🔍 Current theme mode:', this.getCurrentThemeMode());
        console.log('🔍 Body classes before render:', document.body.className);
        
        // Apply body class based on context
        document.body.classList.add(this.pageContext + '-page');
        console.log('📝 Added body class:', this.pageContext + '-page');
        
        // Find existing header or create container
        let headerContainer = document.querySelector('header.master-header, header.header-full-width');
        console.log('🔍 Existing header found:', !!headerContainer);
        console.log('🔍 Body has clean-view class:', document.body.classList.contains('clean-view'));
        
        if (headerContainer) {
            // Replace existing header
            headerContainer.outerHTML = this.generateNavigationHTML();
            console.log('🔄 Replaced existing header');
        } else {
            // Insert at beginning of body
            document.body.insertAdjacentHTML('afterbegin', this.generateNavigationHTML());
            console.log('➕ Inserted new header');
        }
        
        // Verify header was inserted
        const newHeader = document.querySelector('header.master-header, header.header-full-width');
        console.log('✅ Header after insertion:', !!newHeader);
        if (newHeader) {
            console.log('📏 Header dimensions:', {
                offsetHeight: newHeader.offsetHeight,
                clientHeight: newHeader.clientHeight,
                scrollHeight: newHeader.scrollHeight,
                display: getComputedStyle(newHeader).display,
                visibility: getComputedStyle(newHeader).visibility,
                opacity: getComputedStyle(newHeader).opacity
            });
        }
        
        // Initialize mobile menu functionality
        this.initializeMobileMenu();
        
        // Update toggle display based on current theme
        this.updateToggleDisplay();
        
        // Listen for theme changes to update toggle display
        window.addEventListener('themeChanged', (event) => {
            // Use the theme from the event instead of reading from localStorage to avoid race conditions
            const newTheme = event.detail?.theme || this.getCurrentThemeMode();
            console.log('Navigation: Received themeChanged event, updating display for:', newTheme);
            this.updateToggleDisplayForTheme(newTheme);
        });
        
        // Initialize theme toggle functionality
        this.initializeThemeToggle();
        
        console.log('✅ Navigation component render complete');
    }
    
    initializeThemeToggle() {
        // Theme toggle is now handled exclusively by theme-manager.js
        // This prevents conflicts and ensures consistent behavior
        console.log('Navigation: Theme toggle initialization delegated to theme-manager.js');
        
        // Re-initialize theme manager after navigation renders to bind listeners to new element
        if (window.initializeThemeManager) {
            console.log('Navigation: Re-initializing theme manager after render...');
            window.initializeThemeManager();
        } else {
            console.warn('Navigation: theme-manager.js initializeThemeManager function not available');
        }
        
        // Just update the display if the button exists and theme manager is available
        const toggleBtn = document.getElementById('btn-view-toggle');
        if (toggleBtn && window.updateToggleDisplay) {
            const currentMode = this.getCurrentThemeMode();
            window.updateToggleDisplay(currentMode);
        }
    }

    initializeMobileMenu() {
        console.log('🔧 Initializing mobile menu...');
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        console.log('📱 Mobile toggle found:', !!mobileToggle);
        console.log('📋 Nav menu found:', !!navMenu);

        if (mobileToggle && navMenu) {
            console.log('✅ Both elements found, adding event listeners');
            
            // Toggle mobile menu
            mobileToggle.addEventListener('click', (e) => {
                console.log('🔘 Mobile toggle clicked!');
                console.log('📊 Current nav-open state:', document.body.classList.contains('nav-open'));
                
                document.body.classList.toggle('nav-open');
                mobileToggle.classList.toggle('active');
                
                console.log('📊 New nav-open state:', document.body.classList.contains('nav-open'));
            });

            // Close menu when clicking the close button (::before pseudo-element)
            navMenu.addEventListener('click', (e) => {
                console.log('🎯 Nav menu clicked');
                console.log('🔗 Click target:', e.target.tagName, e.target.className);
                
                // Don't interfere with navigation links
                if (e.target.tagName === 'A' && e.target.classList.contains('mobile-nav-link')) {
                    console.log('🚀 Navigation link clicked - allowing default behavior');
                    return; // Let the link navigate normally
                }
                
                // Check if click is on the close button area (top part of menu)
                const rect = navMenu.getBoundingClientRect();
                const clickY = e.clientY - rect.top;
                
                console.log('📏 Click Y position:', clickY, 'px from top');
                
                // If click is in the top 60px (close button area)
                if (clickY <= 60) {
                    console.log('❌ Close button area clicked - closing menu');
                    document.body.classList.remove('nav-open');
                    mobileToggle.classList.remove('active');
                }
            });

            // Close menu when clicking backdrop
            document.addEventListener('click', (e) => {
                if (document.body.classList.contains('nav-open')) {
                    console.log('🎯 Document clicked while menu open');
                    console.log('📍 Click target:', e.target);
                    console.log('🔍 Click inside menu:', navMenu.contains(e.target));
                    console.log('🔍 Click on toggle:', mobileToggle.contains(e.target));
                    
                    // Check if click is outside the menu and toggle button
                    if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
                        console.log('🌐 Backdrop clicked - closing menu');
                        document.body.classList.remove('nav-open');
                        mobileToggle.classList.remove('active');
                    }
                }
            });

            // Close menu when pressing Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && document.body.classList.contains('nav-open')) {
                    console.log('⌨️ Escape key pressed - closing menu');
                    document.body.classList.remove('nav-open');
                    mobileToggle.classList.remove('active');
                }
            });
        } else {
            console.log('❌ Mobile menu initialization failed - missing elements');
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