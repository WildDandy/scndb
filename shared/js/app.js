// ========================================
// UNIFIED APP.JS - COMPLETE FUNCTIONALITY
// Theme switching, mobile menu, and utilities
// ========================================

// Global state
let mobileMenuInitialized = false;

// ========================================
// THEME MANAGEMENT - DELEGATED TO theme-manager.js
// ========================================
// Theme switching and matrix effects are handled by theme-manager.js
// to avoid conflicts and ensure proper functionality







// ========================================
// MOBILE NAVIGATION
// ========================================

function initMobileMenu() {
    if (mobileMenuInitialized) {
        console.log('Mobile menu already initialized, skipping');
        return;
    }

    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;

    if (!mobileToggle || !navMenu) {
        console.log('Mobile menu elements not found');
        return;
    }

    // Always start closed
    body.classList.remove('nav-open');
    


    // Remove existing listeners to prevent duplicates
    const newMobileToggle = mobileToggle.cloneNode(true);
    mobileToggle.parentNode.replaceChild(newMobileToggle, mobileToggle);

    // Add click listener to hamburger
    newMobileToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const isOpen = body.classList.contains('nav-open');
        
        if (isOpen) {
            body.classList.remove('nav-open');
        } else {
            body.classList.add('nav-open');
        }
    });

    // Close menu when clicking the close area (::before pseudo-element)
    navMenu.addEventListener('click', function(e) {
        if (window.innerWidth > 768) return;

        const rect = navMenu.getBoundingClientRect();
        const clickY = e.clientY - rect.top;

        if (clickY < 70) { // Close button area
            e.preventDefault();
            body.classList.remove('nav-open');
        }
    });

    // Close menu when clicking nav links (mobile only)
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                body.classList.remove('nav-open');
            }
        });
    });

    // Close menu when clicking outside (mobile only)
    document.addEventListener('click', function(e) {
        if (window.innerWidth > 768) return;

        if (body.classList.contains('nav-open') &&
            !navMenu.contains(e.target) &&
            !newMobileToggle.contains(e.target)) {
            body.classList.remove('nav-open');
        }
    });

    // Close menu on escape key (mobile only)
    document.addEventListener('keydown', function(e) {
        if (window.innerWidth > 768) return;

        if (e.key === 'Escape' && body.classList.contains('nav-open')) {
            body.classList.remove('nav-open');
        }
    });

    // Close menu when window resizes to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && body.classList.contains('nav-open')) {
            body.classList.remove('nav-open');
        }
    });

    mobileMenuInitialized = true;
    console.log('Mobile menu initialized successfully');
}

// ========================================
// SECTION TOGGLING
// ========================================

function toggleSection(sectionId, forceOpen = false) {
    console.log('toggleSection called with:', sectionId, 'forceOpen:', forceOpen);
    const content = document.getElementById(sectionId);
    console.log('Content element found:', content);
    if (!content) {
        console.log('Content element not found for ID:', sectionId);
        return;
    }

    const wasActive = content.classList.contains('active');
    console.log('Section was active before toggle:', wasActive);

    // Capture header before we mutate classes
    const header = content.previousElementSibling;

    // Close all sections first
    console.log('Closing all sections...');
    document.querySelectorAll('.section-content').forEach(section => {
        section.classList.remove('active');
    });
    document.querySelectorAll('.section-header').forEach(h => {
        h.classList.remove('open');
        h.setAttribute('aria-expanded', 'false');
        const title = h.querySelector('.section-title, .section-title_toggle');
        if (title && title.textContent) {
            title.textContent = title.textContent.replace(/^[\s]*[▾▸]/, '▸');
        }
    });

    const shouldOpen = forceOpen || !wasActive;
    console.log('Should open after closing others:', shouldOpen);

    if (shouldOpen) {
        console.log('Opening section:', sectionId);
        content.classList.add('active');
        if (header && header.classList.contains('section-header')) {
            header.classList.add('open');
            header.setAttribute('aria-expanded', 'true');
            const title = header.querySelector('.section-title, .section-title_toggle');
            console.log('Title element:', title);
            if (title && title.textContent) {
                console.log('Updating title from:', title.textContent);
                title.textContent = title.textContent.replace(/^[\s]*[▾▸]/, '▾');
                console.log('Updated title to:', title.textContent);
            }
        }

        // Scroll to section header for context
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
}

// ========================================
// NAVIGATION UTILITIES
// ========================================

function viewOrder(orderNumber) {
    const value = String(orderNumber);

    // Handle exceptions with underscores instead of dashes
    const underscoreExceptions = ['9-1', '9-2', '20-1', '28-1', '28-2', '39-1', '39-2', '39-3', '42-1'];
    if (underscoreExceptions.includes(value)) {
        const underscoredValue = value.replace(/-/g, '_');
        window.location.href = `orders/nw_order_${underscoredValue}.html`;
        return;
    }

    if (/^\d+$/.test(value)) {
        window.location.href = `orders/nw_order_${value}.html`;
        return;
    }
    if (/^\d+-\d+$/.test(value)) {
        window.location.href = `orders/nw_order_${value}.html`;
        return;
    }
    alert(`Order ${orderNumber} not found.`);
}

// ========================================
// TYPEWRITER EFFECT
// ========================================

function initTypewriter() {
    const typewriterText = document.querySelector('.typewriter');
    if (typewriterText && !document.body.classList.contains('clean-view')) {
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

// ========================================
// NAVIGATION BUILDER
// ========================================

// NAVIGATION FUNCTION COMPLETELY REMOVED TO PRESERVE HTML NAVIGATION

// ========================================
// UTILITIES
// ========================================

function normalizeMojibakeText() {
    const replacements = [
        { from: /Ã¢â‚¬Å"/g, to: '"' },
        { from: /Ã¢â‚¬/g, to: '"' },
        { from: /Ã¢â‚¬â„¢/g, to: "'" },
        { from: /Ã¢â‚¬Ëœ/g, to: "'" },
        { from: /Ã¢â‚¬"/g, to: '–' },
        { from: /Ã¢â‚¬"/g, to: '—' },
        { from: /Ã¢â‚¬Â¦/g, to: '…' },
        { from: /Ã¢â€ '/g, to: '->' },
        { from: /Ã¢â€ /g, to: '->' },
        { from: /Ã¢â‚¬Â¢/g, to: '•' }
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

function syncHeaderHeightVar() {
    const header = document.querySelector('header');
    const h = header ? header.getBoundingClientRect().height : 80;
    document.documentElement.style.setProperty('--header-height', h + 'px');
}

// ========================================
// DATA LOADING
// ========================================

// Global data storage
let osaGeneralOrdersData = [];
let osaSocialReformOrdersData = [];
let osaNetworkOrdersData = [];

// Load data from external JSON files
async function loadOrdersData() {
    try {
        // Check if we're on a page that needs orders data (homepage/index pages)
        const currentPath = window.location.pathname;
        const needsOrdersData = currentPath.includes('index.html') || 
                               currentPath.endsWith('/') ||
                               (!currentPath.includes('/orders/') && !currentPath.includes('nw_order_'));
        
        console.log('Current path:', currentPath, 'Needs orders data:', needsOrdersData);
        
        if (!needsOrdersData) {
            console.log('Skipping orders data loading for individual order page');
            return;
        }

        const [generalResponse, socialReformResponse, networkResponse] = await Promise.all([
            fetch('../shared/js/data/osa-general-orders.json'),
            fetch('../shared/js/data/osa-social-reform-orders.json'),
            fetch('../shared/js/data/osa-network-orders.json')
        ]);

        osaGeneralOrdersData = await generalResponse.json();
        osaSocialReformOrdersData = await socialReformResponse.json();
        osaNetworkOrdersData = await networkResponse.json();

        console.log('Orders data loaded successfully');
    } catch (error) {
        console.error('Error loading orders data:', error);
    }
}

// ========================================
// MAIN INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', async function() {
    console.log('DOM Content Loaded - Starting initialization');
    
    // Load data first
    await loadOrdersData();
    
    // Theme management is handled by theme-manager.js

    // Initialize mobile menu
    setTimeout(() => {
        initMobileMenu();
    }, 100);

    // Sync header height and other utilities - COMMENTED OUT to allow CSS variables to work
    // syncHeaderHeightVar();
    // window.addEventListener('resize', syncHeaderHeightVar);

    normalizeMojibakeText();
    initTypewriter();

    // Load dynamic content - DISABLED: Now handled by orders-index.js
    // populateOSAGeneralOrders();
    // populateOSAIntelligenceOrders();
    // populateOSAPublicRelationsOrders();
    // populateOSALegalOrders();
    // populateOSASocialReformOrders();

    // Event delegation for interactive elements
    document.addEventListener('click', function(event) {
        // Diagnostic: high-signal click log
        try {
            const inFileTree = !!event.target.closest('.file-tree li');
            const navOpen = document.body.classList.contains('nav-open');
            console.log('[Click]', { target: event.target, inFileTree, navOpen });
        } catch (_) {}

        // Allow mobile navigation links to work, but skip other nav-menu clicks
        const navMenu = event.target.closest('.nav-menu');
        const isMobileNavLink = event.target.classList.contains('mobile-nav-link');
        if (navMenu && !isMobileNavLink) return;

        // Section headers
        const header = event.target.closest('.section-header');
        if (header && header.nextElementSibling && header.nextElementSibling.classList.contains('section-content')) {
            const contentId = header.nextElementSibling.id;
            if (contentId) {
                event.preventDefault();
                console.log('Section header clicked, toggling:', contentId);
                toggleSection(contentId);
                return;
            }
        }

        // Order cards
        const orderCard = event.target.closest('.order-card');
        if (orderCard) {
            let orderKey = orderCard.getAttribute('data-order');
            if (!orderKey) {
                const numEl = orderCard.querySelector('.order-number');
                const text = numEl?.textContent || '';
                const match = text.match(/NW\s*ORDER\s*([\d-]+)/i);
                if (match) {
                    orderKey = match[1];
                }
            }
            if (orderKey) {
                event.preventDefault();
                viewOrder(orderKey);
                return;
            }
        }

        // File tree items
        const fileTreeItem = event.target.closest('.file-tree li');
        if (fileTreeItem) {
            try {
                const pe = getComputedStyle(fileTreeItem).pointerEvents;
                const zi = getComputedStyle(fileTreeItem).zIndex;
                console.log('[Sidebar] file-tree item clicked:', fileTreeItem, 'data-section:', fileTreeItem?.dataset?.section, 'pointer-events:', pe, 'z-index:', zi);
            } catch (_) {}

            // If this LI has an inline scrollToSection handler, let it run without interference
            const inlineOnclick = (fileTreeItem.getAttribute('onclick') || '');
            if (inlineOnclick.includes('scrollToSection')) {
                console.log('[Sidebar] Inline scrollToSection present; skipping delegated toggleSection handling.');
                return;
            }

            const secId = fileTreeItem.dataset.section;
            if (secId) {
                event.preventDefault();
                console.log('[Sidebar] Delegated toggleSection firing for section:', secId);
                toggleSection(secId);
                return;
            }
        }
    });

    // Clean up inline handlers (but preserve sidebar navigation)
    document.querySelectorAll('[onclick]').forEach(function(el){
        try {
            const h = el.getAttribute('onclick') || '';
            if (/\btoggleSection\('\w+'\)/.test(h) && el.matches('.file-tree li')) {
                const m = h.match(/toggleSection\('([^']+)'\)/);
                if (m && m[1]) {
                    el.dataset.section = m[1];
                }
            }
            // Only remove onclick for viewOrder/toggleSection, but preserve sidebar navigation
            if (/\b(viewOrder|toggleSection)\(/.test(h) && !h.includes('location.href')) {
                el.removeAttribute('onclick');
            }
        } catch (_) {}
    });

    // Keyboard support
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            const header = event.target.closest('.section-header');
            if (header) {
                event.preventDefault();
                const panel = header.nextElementSibling;
                if (panel && panel.classList.contains('section-content') && panel.id) {
                    toggleSection(panel.id);
                }
                return;
            }

            const item = event.target.closest('.file-tree li');
            if (item) {
                const secId = item.dataset.section;
                if (secId) {
                    event.preventDefault();
                    toggleSection(secId);
                }
            }
        }
    });
});

// ========================================
// DYNAMIC CARD GENERATION
// ========================================

// OSA General Orders data is now loaded from external JSON file
// See loadOrdersData() function above


// OSA Intelligence Orders data removed - now loaded via loadOrdersData() function

// Load OSA Intelligence Orders from external JSON file
async function loadOSAIntelligenceOrders() {
    try {
        const response = await fetch('../assets/data/osa-intelligence-orders.json');
        const data = await response.json();
        console.log('Successfully loaded', data.length, 'Intelligence orders from external file');
        return data;
    } catch (error) {
        console.error('Error loading OSA Intelligence Orders:', error);
        return [];
    }
}

// OSA Public Relations Orders data (loaded externally to avoid CORS issues)
async function loadOSAPublicRelationsOrders() {
    try {
        const response = await fetch('../assets/data/osa-public-relations-orders.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Loaded OSA Public Relations Orders:', data.length, 'orders');
        return data;
    } catch (error) {
        console.error('Error loading OSA Public Relations Orders:', error);
        return [];
    }
}

// OSA Legal Orders data (loaded externally to avoid CORS issues)
async function loadOSALegalOrders() {
    try {
        const response = await fetch('../assets/data/osa-legal-orders.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Loaded OSA Legal Orders:', data.length, 'orders');
        return data;
    } catch (error) {
        console.error('Error loading OSA Legal Orders:', error);
        return [];
    }
}

// OSA Social Reform Orders data now loaded from external JSON file
// (Data externalized to shared/js/data/osa-social-reform-orders.json)
// Note: Social reform data is now loaded in loadOrdersData() function above

// Generate HTML for order cards
function generateOrderCards(orders) {
    return orders.map(order => `
        <div class="order-card" data-order="${order.order_key}">
            <div class="order-number">${order.order_number_display}</div>
            <div class="order-title">${order.title}</div>
            <div class="order-excerpt">${order.excerpt}</div>
        </div>
    `).join('');
}

// Populate OSA General Orders section
async function populateOSAGeneralOrders() {
    console.log('populateOSAGeneralOrders called');
    const container = document.querySelector('#general .order-grid');
    console.log('Container found:', container);
    if (!container) {
        console.warn('OSA General Orders container not found');
        return;
    }

    // Use data loaded from loadOrdersData()
    const orders = osaGeneralOrdersData;
    console.log('Orders loaded:', orders.length);
    if (orders.length > 0) {
        const cardsHTML = generateOrderCards(orders);
        console.log('Generated HTML length:', cardsHTML.length);
        container.innerHTML = cardsHTML;
        console.log(`Loaded ${orders.length} OSA General Orders`);
    } else {
        console.warn('No OSA General Orders data loaded');
    }
}

// Populate OSA Intelligence Orders section
async function populateOSAIntelligenceOrders() {
    const container = document.querySelector('#intelligence .order-grid');
    if (!container) {
        console.warn('OSA Intelligence Orders container not found');
        return;
    }

    const orders = await loadOSAIntelligenceOrders();
    if (orders.length > 0) {
        container.innerHTML = generateOrderCards(orders);
        console.log(`Loaded ${orders.length} OSA Intelligence Orders`);
    } else {
        console.warn('No OSA Intelligence Orders data loaded');
    }
}

// Populate OSA Public Relations Orders section
async function populateOSAPublicRelationsOrders() {
    console.log('populateOSAPublicRelationsOrders called');
    const container = document.querySelector('#pr .order-grid');
    console.log('Container found:', container);
    if (!container) {
        console.warn('OSA Public Relations Orders container not found');
        return;
    }

    const orders = await loadOSAPublicRelationsOrders();
    console.log('Orders loaded:', orders.length);
    if (orders.length > 0) {
        const cardsHTML = generateOrderCards(orders);
        console.log('Generated HTML length:', cardsHTML.length);
        container.innerHTML = cardsHTML;
        console.log(`Loaded ${orders.length} OSA Public Relations Orders`);
    } else {
        console.warn('No OSA Public Relations Orders data loaded');
    }
}

// Populate OSA Legal Orders section
async function populateOSALegalOrders() {
    const container = document.querySelector('#legal .order-grid');
    if (!container) {
        console.warn('OSA Legal Orders container not found');
        return;
    }

    const orders = await loadOSALegalOrders();
    if (orders.length > 0) {
        container.innerHTML = generateOrderCards(orders);
        console.log(`Loaded ${orders.length} OSA Legal Orders`);
    } else {
        console.warn('No OSA Legal Orders data loaded');
    }
}

// Populate OSA Social Reform Orders section
async function populateOSASocialReformOrders() {
    const container = document.querySelector('#social .order-grid');
    if (!container) {
        console.warn('OSA Social Reform Orders container not found');
        return;
    }

    // Use data loaded from loadOrdersData()
    const orders = osaSocialReformOrdersData;
    if (orders.length > 0) {
        container.innerHTML = generateOrderCards(orders);
        console.log(`Loaded ${orders.length} OSA Social Reform Orders`);
    } else {
        console.warn('No OSA Social Reform Orders data loaded');
    }
}

// ========================================
// GLOBAL EXPORTS
// ========================================

window.toggleSection = toggleSection;
window.viewOrder = viewOrder;
window.applyViewMode = applyViewMode;
window.applySavedViewMode = applySavedViewMode;
window.populateOSAGeneralOrders = populateOSAGeneralOrders;
window.populateOSAIntelligenceOrders = populateOSAIntelligenceOrders;
window.populateOSAPublicRelationsOrders = populateOSAPublicRelationsOrders;
window.populateOSALegalOrders = populateOSALegalOrders;
window.populateOSASocialReformOrders = populateOSASocialReformOrders;