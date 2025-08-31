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
        // Theme saved
    } catch (error) {
        console.warn('Could not save theme to localStorage:', error);
    }
}

function getSavedViewMode() {
    try {
        const savedMode = localStorage.getItem('viewMode');
        
        // If no saved mode, check system preference and save it
        if (!savedMode) {
            const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            const defaultMode = prefersDark ? 'terminal' : 'clean';
            
            // Save the detected system preference to localStorage for consistency
            try {
                localStorage.setItem('viewMode', defaultMode);
                console.log('Theme Manager: Saved system preference to localStorage:', defaultMode);
            } catch (saveError) {
                console.warn('Theme Manager: Could not save system preference to localStorage:', saveError);
            }
            
            console.log('Theme Manager: No saved theme found, using system preference:', defaultMode);
            return defaultMode;
        }
        
        console.log('Theme Manager: Retrieved saved theme:', savedMode);
        return savedMode;
    } catch (error) {
        console.warn('Theme Manager: Could not read theme from localStorage:', error);
        return 'clean'; // Safe default to light mode
    }
}

function applyViewMode(mode) {
    const toggleBtn = document.getElementById('btn-view-toggle');

    // Applying theme

    // Update toggle button data-mode attribute
    if (toggleBtn) {
        toggleBtn.setAttribute('data-mode', mode);
        updateToggleDisplay(mode);
    }

    if (mode === 'clean') {
        // Clean mode: Remove matrix rain immediately, then apply theme
        disableMatrixRain();

        // Remove previously used GPU hacks on <html>/<body> that could break fixed headers
        document.documentElement.style.transform = '';
        document.documentElement.style.backfaceVisibility = '';
        document.body.style.transform = '';
        document.body.style.backfaceVisibility = '';

        // Apply classes directly
        document.body.classList.add('clean-view');
        document.body.classList.remove('terminal-mode');
        document.documentElement.classList.add('clean-view');

        if (toggleBtn) {
            toggleBtn.setAttribute('data-mode', 'clean');
            toggleBtn.setAttribute('aria-selected', 'true');
        }
        updatePageTitle('clean');

    } else {
        // Terminal mode: Avoid transforms on <html>/<body> to preserve fixed positioning
        // Switching to terminal mode

        // Apply dark background IMMEDIATELY
        document.documentElement.style.background = '#000000';
        document.documentElement.style.backgroundColor = '#000000';
        document.body.style.background = '#000000';
        document.body.style.backgroundColor = '#000000';
        document.body.style.color = '#00ff41';

        // Temporary class to enforce terminal palette while CSS loads
        document.body.classList.add('force-terminal-mode');

        // Remove clean-view classes
        document.body.classList.remove('clean-view');
        document.documentElement.classList.remove('clean-view');

        // Apply terminal marker class
        document.body.classList.add('terminal-mode');

        if (toggleBtn) {
            toggleBtn.setAttribute('data-mode', 'terminal');
            toggleBtn.setAttribute('aria-selected', 'true');
        }
        updatePageTitle('terminal');

        // Clean up temporary inline styles once CSS has taken over
        setTimeout(() => {
            document.body.classList.remove('force-terminal-mode');
            document.documentElement.style.background = '';
            document.documentElement.style.backgroundColor = '';
            document.body.style.background = '';
            document.body.style.backgroundColor = '';
            document.body.style.color = '';
            // Inline styles cleaned up
        }, 125);

        // Enable matrix rain after theme is stable
        setTimeout(() => {
            enableMatrixRain();
        }, 350);
    }

    // Dispatch custom event for other scripts to listen to
    window.dispatchEvent(new CustomEvent('themeChanged', {
        detail: { theme: mode }
    }));
}

function updatePageTitle(theme) {
    // Add theme indicator to page title
    const currentTitle = document.title;
    const cleanTitle = currentTitle.replace(/ \[(CLEAN|TERMINAL)\]$/, '');
    
    // Only add indicator in development - remove this in production
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        document.title = `${cleanTitle} [${theme.toUpperCase()}]`;
    }
}

function updateToggleDisplay(mode) {
    const toggleBtn = document.getElementById('btn-view-toggle');
    if (toggleBtn) {
        const toggleText = mode === 'clean' ? 'DARK' : 'LIGHT';
        const asciiArt = `[${toggleText}]
┌─────┐
│ >_  │
└─────┘`;
        toggleBtn.innerHTML = asciiArt;
        // Ensure the toggle is always visible
        toggleBtn.style.display = 'inline-block';
        toggleBtn.style.visibility = 'visible';
        toggleBtn.style.opacity = '1';
        // Updated toggle display
    }
}

function bindViewToggleHandlers() {
    // Binding theme toggle handlers
    const toggleBtn = document.getElementById('btn-view-toggle');
    
    if (!toggleBtn) {
        console.warn('⚠️ Toggle button not found! Element may not exist yet.');
        console.log('🔍 Available elements with "toggle":', document.querySelectorAll('[id*="toggle"], [class*="toggle"]'));
        return;
    }
    
    // Toggle button found
    
    if (toggleBtn && !toggleBtn._themeManagerBound) {
        // Binding Chrome-compatible toggle handlers
        
        // Enhanced handler with debounce/lock to avoid double toggles
        const handleToggleClick = function(e) {
            // Toggle clicked
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation(); // Prevent other handlers on the same element

            // Debounce/lock: avoid multiple rapid toggles (e.g., click + mousedown)
            if (toggleBtn._themeToggleLock) {
                return; // Toggle locked, ignoring duplicate event
            }
            toggleBtn._themeToggleLock = true;
            setTimeout(() => { toggleBtn._themeToggleLock = false; }, 250);
            
            // Toggle clicked (Enhanced handler)
            
            const currentMode = toggleBtn.getAttribute('data-mode') || getSavedViewMode();
            const newMode = currentMode === 'clean' ? 'terminal' : 'clean';
            
            // Switching theme mode
            
            // Add switching class to prevent transitions during theme change
            document.body.classList.add('switching-theme');
            document.documentElement.classList.add('switching-theme');
            
            setViewMode(newMode);
            applyViewMode(newMode);
            
            // Update the button's data-mode attribute
            toggleBtn.setAttribute('data-mode', newMode);
            
            // Remove switching class after Chrome has processed the changes
            setTimeout(() => {
                document.body.classList.remove('switching-theme');
                document.documentElement.classList.remove('switching-theme');
            }, 150); // Extended timeout for Chrome
            
            // Theme toggle complete
        };
        
        // Remove any existing listeners first
        if (toggleBtn._handleToggleClick) {
            // Removing existing listeners
            toggleBtn.removeEventListener('click', toggleBtn._handleToggleClick, true);
            toggleBtn.removeEventListener('mousedown', toggleBtn._handleToggleClick, true);
            toggleBtn.removeEventListener('touchstart', toggleBtn._handleToggleClick, true);
        }
        
        // Bind only to click to prevent double toggles (no mousedown/touchstart)
        toggleBtn.addEventListener('click', handleToggleClick, { capture: true, passive: false });
        
        // Store reference to prevent multiple bindings
        toggleBtn._themeManagerBound = true;
        toggleBtn._handleToggleClick = handleToggleClick;
        
        // Enhanced Chrome-specific styling
        toggleBtn.style.pointerEvents = 'auto';
        toggleBtn.style.cursor = 'pointer';
        toggleBtn.style.userSelect = 'none';
        toggleBtn.style.webkitUserSelect = 'none';
        toggleBtn.style.webkitTapHighlightColor = 'transparent';
        toggleBtn.style.webkitTouchCallout = 'none';
        toggleBtn.style.backfaceVisibility = 'hidden';
        toggleBtn.style.transform = 'translateZ(0)';
        
        // Enhanced toggle handler bound successfully
    } else if (toggleBtn && toggleBtn._themeManagerBound) {
        // Toggle already bound, skipping duplicate binding
    }
}

function applySavedViewMode() {
    const savedMode = getSavedViewMode();
    // Applying saved theme on page load
    applyViewMode(savedMode);
}

// Apply theme immediately on script load (before DOM ready)
function applyThemeImmediately() {
    const savedMode = getSavedViewMode();
    // Pre-load theme application
    
    // Add styles to prevent flash for both themes
    const style = document.createElement('style');
    
    if (savedMode === 'clean') {
        document.documentElement.classList.add('clean-view-loading');
        style.textContent = `
            .clean-view-loading {
                background: #FEF8ED !important;
                color: #000000 !important;
            }
            .clean-view-loading * {
                color: #000000 !important;
                border-color: #000000 !important;
            }
        `;
        } else if (savedMode === 'terminal') {
        document.documentElement.classList.add('terminal-view-loading');
        style.textContent = `
            .terminal-view-loading {
                background: #000000 !important;
                color: #00ff41 !important;
            }
            .terminal-view-loading * {
                color: #00ff41 !important;
                border-color: #00ff41 !important;
            }
        `;
    } else {
        // Default to clean (light) mode
        document.documentElement.classList.add('clean-view-loading');
        style.textContent = `
            .clean-view-loading {
                background: #FEF8ED !important;
                color: #000000 !important;
            }
            .clean-view-loading * {
                color: #000000 !important;
                border-color: #000000 !important;
            }
        `;
    }
    
    document.head.appendChild(style);
}

/* ========================================
   MATRIX RAIN EFFECTS - TERMINAL MODE ONLY
   ======================================== */

let matrixIntervalId = null;
let matrixCanvas = null;

function createMatrixRain() {
    if (document.body.classList.contains('clean-view')) {
        // Matrix rain disabled - in clean view mode
        return;
    }
    if (matrixCanvas) {
        // Matrix rain already exists
        return;
    }

    // Creating Matrix rain canvas
    const canvas = document.createElement('canvas');
    canvas.id = 'matrix-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    canvas.style.opacity = '0.15';
    document.body.appendChild(canvas);
    // Matrix canvas added to body

    const ctx = canvas.getContext('2d');
    // Canvas context created
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
    const fontSize = 14;
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
    matrixIntervalId = setInterval(draw, 80);

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
    // enableMatrixRain called
    if (!document.body.classList.contains('clean-view')) {
        // Enabling Matrix rain for terminal mode
        createMatrixRain();
    } else {
        // Not enabling Matrix rain - in clean view mode
    }
}

/* ========================================
   INITIALIZATION - RUN IMMEDIATELY
   ======================================== */

// Run immediately when script loads
applyThemeImmediately();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Theme Manager: DOM loaded, initializing
    
    // Remove loading classes to allow transitions
    setTimeout(() => {
        document.documentElement.classList.remove('clean-view-loading', 'terminal-view-loading');
    }, 100);
    
    // Apply saved theme
    applySavedViewMode();

    // Enable Matrix rain if in terminal mode
    setTimeout(() => {
        enableMatrixRain();
    }, 500);

    // Bind toggle handlers
    bindViewToggleHandlers();
    
    // Theme Manager: Initialization complete
});

// Listen for theme change events from other scripts
window.addEventListener('themeChanged', function(event) {
    // Theme change event received
});

/* ========================================
   EXPORT FUNCTIONS FOR OTHER SCRIPTS
   ======================================== */

// Initialize theme manager function for re-initialization after DOM changes
function initializeThemeManager() {
    // Re-initializing theme manager
    bindViewToggleHandlers();
    updateToggleDisplay(getSavedViewMode());
}

// Make functions available globally
window.setViewMode = setViewMode;
window.getSavedViewMode = getSavedViewMode;
window.applyViewMode = applyViewMode;
window.bindViewToggleHandlers = bindViewToggleHandlers;
window.applySavedViewMode = applySavedViewMode;
window.updateToggleDisplay = updateToggleDisplay;
window.enableMatrixRain = enableMatrixRain;
window.disableMatrixRain = disableMatrixRain;
window.initializeThemeManager = initializeThemeManager;