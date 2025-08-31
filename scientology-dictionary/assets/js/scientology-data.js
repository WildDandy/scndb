// ========================================
// SCIENTOLOGY GLOSSARY - GLOSSARY.JS
// Google Sheets integration, data loading, and glossary functionality
// ========================================

// Configuration
const CONFIG = {
    // Google Sheets configuration
    SHEET_ID: '16_ms7rLmEPtdU0vhkhiHSu62Htjzguls64MP_6KxPPs',
    SHEET_NAME: 'Sheet1',
    API_KEY: null, // We'll use public access without API key

    // Cache settings
    CACHE_DURATION: 1000 * 60 * 60, // 1 hour
    MAX_RETRIES: 3,
    RETRY_DELAY: 1000,

    // UI settings
    ITEMS_PER_PAGE: 50,
    SEARCH_DEBOUNCE: 300,
    ANIMATION_DELAY: 100
};

// Global state
let glossaryData = [];
let filteredData = [];
let currentPage = 1;
let selectedLetter = 'All';
let currentFilter = 'all';
let searchQuery = '';
let isLoading = false;
let lastUpdated = null;

// DOM elements cache
let elements = {};

// Initialize the glossary
function initGlossary() {
    console.log('Initializing Scientology Glossary...');

    // Cache DOM elements
    cacheElements();

    // Bind event listeners
    bindEvents();

    // Load glossary data
    loadGlossaryData();

    // Initialize alphabet navigation
    initAlphabetNav();

    // Initialize filter buttons
    initFilters();
}

// Cache DOM elements for performance
function cacheElements() {
    elements = {
        searchInput: document.getElementById('q'),
        entryCount: document.getElementById('count'),
        alphaBar: document.getElementById('alphaBar'),
        glossaryGrid: document.getElementById('glossaryList'),
        filterButtons: document.querySelectorAll('.filter-button')
    };
}

// Bind event listeners
function bindEvents() {
    // Search input
    if (elements.searchInput) {
        elements.searchInput.addEventListener('input', debounce(handleSearch, CONFIG.SEARCH_DEBOUNCE));
        elements.searchInput.addEventListener('keydown', handleSearchKeydown);
    }

    // Light/Dark toggle button - DISABLED TO PREVENT CONFLICTS
    // Theme toggle is now handled exclusively by theme-manager.js
    // This prevents conflicts and ensures consistent Chrome compatibility
    console.log('Scientology Data: Theme toggle delegated to theme-manager.js');
    
    // Optional: Verify theme manager is available
    if (window.bindViewToggleHandlers) {
        console.log('Scientology Data: Theme manager detected, toggle will be handled properly');
    } else {
        console.warn('Scientology Data: Theme manager not yet loaded, toggle may not work until theme-manager.js loads');
    }

    // Clear search button
    const clearButton = document.getElementById('clear-search');
    if (clearButton) {
        clearButton.addEventListener('click', clearSearch);
    }

    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboardNav);

    console.log('Event listeners bound');
}

// Load glossary data from Google Sheets
async function loadGlossaryData() {
    if (isLoading) return;

    isLoading = true;

    try {
        // Try to load from cache first
        const cachedData = getCachedData();
        if (cachedData) {
            console.log('Using cached data');
            processGlossaryData(cachedData);
            return;
        }

        // Load from Google Sheets
        const data = await fetchFromGoogleSheets();
        processGlossaryData(data);

        // Cache the data
        setCachedData(data);

    } catch (error) {
        console.error('Failed to load glossary data:', error);
        handleError(error, 'loading glossary data');
        // Show error message in search stats
        if (elements.entryCount) {
            elements.entryCount.textContent = 'Error loading data';
        }
    } finally {
        isLoading = false;
    }
}

// Fetch data from Google Sheets
async function fetchFromGoogleSheets() {
    const url = `https://docs.google.com/spreadsheets/d/${CONFIG.SHEET_ID}/gviz/tq?tqx=out:json&tq=SELECT%20A,B&sheet=${CONFIG.SHEET_NAME}`;

    for (let attempt = 1; attempt <= CONFIG.MAX_RETRIES; attempt++) {
        try {
            console.log(`Fetching data from Google Sheets (attempt ${attempt})...`);

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                },
                cache: 'no-cache'
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const text = await response.text();
            const jsonText = text.replace(/\/\*O_o\*\//g, '').replace(/google\.visualization\.Query\.setResponse\((.*)\);/, '$1');
            const data = JSON.parse(jsonText);

            if (!data.table || !data.table.rows) {
                throw new Error('Invalid data format received from Google Sheets');
            }

            // Convert Google Sheets data format to our format
            const glossary = data.table.rows
                .filter(row => row.c && row.c[0] && row.c[1]) // Filter out empty rows
                .map(row => ({
                    t: row.c[0].v?.toString().trim() || '',
                    d: row.c[1].v?.toString().trim() || ''
                }))
                .filter(item => item.t && item.d); // Filter out items with empty term or definition

            console.log(`Loaded ${glossary.length} glossary terms from Google Sheets`);
            return glossary;

        } catch (error) {
            console.error(`Attempt ${attempt} failed:`, error);

            if (attempt === CONFIG.MAX_RETRIES) {
                throw new Error(`Failed to fetch data after ${CONFIG.MAX_RETRIES} attempts: ${error.message}`);
            }

            // Wait before retrying
            await new Promise(resolve => setTimeout(resolve, CONFIG.RETRY_DELAY * attempt));
        }
    }
}

// Process and display glossary data
function processGlossaryData(data) {
    glossaryData = data;
    filteredData = [...data];

    // Update metadata
    updateMetadata();

    // Initialize alphabet navigation with data
    initAlphabetNav();

    // Render glossary
    renderGlossary();

    // Update entry count
    updateEntryCount(data.length, data.length);

    console.log(`Processed ${data.length} glossary terms`);
}

// Render glossary items
function renderGlossary() {
    if (!elements.glossaryGrid) return;

    // Sort data alphabetically
    const sortedData = [...filteredData].sort((a, b) => a.t.localeCompare(b.t, undefined, { sensitivity: 'base' }));

    // Create HTML for each item
    const itemsHtml = sortedData.map((item, index) => createGlossaryItem(item, index));

    // Clear and populate grid
    elements.glossaryGrid.innerHTML = itemsHtml.join('');

    // Add fade-in animation
    setTimeout(() => {
        const items = elements.glossaryGrid.querySelectorAll('.glossary-item');
        items.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('fade-in');
            }, index * 50);
        });
    }, 100);

    console.log(`Rendered ${sortedData.length} glossary items`);

    // Update entry count after rendering
    updateEntryCount(sortedData.length, glossaryData.length);
}

// Create HTML for a single glossary item
function createGlossaryItem(item, index) {
    const term = escapeHtml(item.t);
    const definition = escapeHtml(item.d);

    return `
        <div class="glossary-item" data-term="${term.toLowerCase()}" data-index="${index}">
            <div class="glossary-term">${term}</div>
            <div class="glossary-definition">${definition}</div>
        </div>
    `;
}

// Initialize alphabet navigation
function initAlphabetNav() {
    if (!elements.alphaBar) return;

    const letters = ['All', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];
    const letterCounts = getLetterCounts();

    const letterButtons = letters.map(letter => {
        const count = letter === 'All' ? glossaryData.length : letterCounts[letter] || 0;
        const isAvailable = count > 0;
        const isSelected = letter === selectedLetter;

        return `
            <button
                class="alpha-letter ${isSelected ? 'selected' : ''} ${!isAvailable ? 'disabled' : ''}"
                data-letter="${letter}"
                ${!isAvailable ? 'disabled' : ''}
                aria-label="${letter === 'All' ? 'Show all terms' : `Show terms starting with ${letter} (${count} terms)`}"
            >
                ${letter}${letter !== 'All' ? ` (${count})` : ''}
            </button>
        `;
    });

    elements.alphaBar.innerHTML = letterButtons.join('');

    // Bind click events
    elements.alphaBar.querySelectorAll('.alpha-letter').forEach(button => {
        button.addEventListener('click', () => handleLetterFilter(button.dataset.letter));
    });

    console.log('Alphabet navigation initialized');
}

// Get letter counts for navigation
function getLetterCounts() {
    const counts = {};

    glossaryData.forEach(item => {
        const firstChar = item.t.charAt(0).toUpperCase();
        if (firstChar.match(/[A-Z]/)) {
            counts[firstChar] = (counts[firstChar] || 0) + 1;
        }
    });

    return counts;
}

// Handle letter filter
function handleLetterFilter(letter) {
    selectedLetter = letter;

    // Update button states
    elements.alphaBar.querySelectorAll('.alpha-letter').forEach(button => {
        button.classList.toggle('selected', button.dataset.letter === letter);
    });

    // Apply filters
    applyFilters();
}

// Initialize filter buttons
function initFilters() {
    if (elements.filterButtons && elements.filterButtons.length > 0) {
        elements.filterButtons.forEach(button => {
            button.addEventListener('click', () => handleFilter(button.dataset.filter));
        });
    }
}

// Handle category filter
function handleFilter(filter) {
    currentFilter = filter;

    // Update button states
    elements.filterButtons.forEach(button => {
        button.classList.toggle('active', button.dataset.filter === filter);
    });

    // Apply filters
    applyFilters();
}

// Apply all filters
function applyFilters() {
    let filtered = [...glossaryData];

    // Apply letter filter
    if (selectedLetter !== 'All') {
        filtered = filtered.filter(item =>
            item.t.charAt(0).toUpperCase() === selectedLetter
        );
    }

    // Apply category filter
    if (currentFilter !== 'all') {
        filtered = filtered.filter(item => {
            const category = getTermCategory(item).toLowerCase();
            return category.includes(currentFilter.toLowerCase());
        });
    }

    // Apply search filter
    if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        filtered = filtered.filter(item =>
            item.t.toLowerCase().includes(query) ||
            item.d.toLowerCase().includes(query)
        );
    }

    filteredData = filtered;
    renderGlossary();
    updateEntryCount(filtered.length, glossaryData.length);
}

// Update entry count display
function updateEntryCount(shown, total) {
    const el = document.getElementById('count');
    if (el) el.textContent = `${shown} entries`;
}

// Handle search input
function handleSearch(event) {
    searchQuery = event.target.value;
    applyFilters();
}

// Handle search keyboard events
function handleSearchKeydown(event) {
    if (event.key === 'Escape') {
        clearSearch();
    }
}

// Clear search
function clearSearch() {
    if (elements.searchInput) {
        elements.searchInput.value = '';
        elements.searchInput.focus();
    }
    searchQuery = '';
    applyFilters();
}

// Handle keyboard navigation
function handleKeyboardNav(event) {
    const target = event.target;

    // Handle glossary item navigation
    if (target.classList.contains('glossary-item')) {
        if (event.key === 'Enter' || event.key === ' ') {
            // Could expand item details if implemented
            event.preventDefault();
        }
    }

    // Handle letter navigation
    if (target.classList.contains('alpha-letter') && !target.disabled) {
        if (event.key === 'Enter' || event.key === ' ') {
            handleLetterFilter(target.dataset.letter);
            event.preventDefault();
        }
    }
}

// Update metadata
function updateMetadata() {
    if (elements.totalTerms) {
        elements.totalTerms.textContent = glossaryData.length.toLocaleString();
    }

    if (elements.lastUpdated) {
        elements.lastUpdated.textContent = new Date().toLocaleDateString();
    }

    lastUpdated = new Date();
}

// Cache management
function getCachedData() {
    try {
        const cached = localStorage.getItem('glossaryData');
        if (!cached) return null;

        const { data, timestamp } = JSON.parse(cached);
        const age = Date.now() - timestamp;

        if (age > CONFIG.CACHE_DURATION) {
            localStorage.removeItem('glossaryData');
            return null;
        }

        return data;
    } catch (error) {
        console.warn('Error reading cached data:', error);
        return null;
    }
}

function setCachedData(data) {
    try {
        const cacheData = {
            data: data,
            timestamp: Date.now()
        };
        localStorage.setItem('glossaryData', JSON.stringify(cacheData));
    } catch (error) {
        console.warn('Error caching data:', error);
    }
}

// Utility functions
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function handleError(error, context = 'Unknown') {
    console.error(`[Error in ${context}]:`, error);

    // Use global error handler if available
    if (window.handleError) {
        window.handleError(error, context);
    }
}

// Get term category based on content analysis
function getTermCategory(item) {
    const term = item.t.toLowerCase();
    const definition = item.d.toLowerCase();

    if (term.length <= 5 && !term.includes(' ')) {
        return 'Abbreviation';
    }

    if (definition.includes('organization') || definition.includes('church') || definition.includes('foundation')) {
        return 'Organization';
    }

    if (definition.includes('procedure') || definition.includes('process') || definition.includes('technique')) {
        return 'Procedure';
    }

    if (definition.includes('level') || definition.includes('state') || definition.includes('condition')) {
        return 'State of Being';
    }

    return 'Concept';
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initGlossary();
});

// Expose functions globally for debugging and external access
window.glossaryData = glossaryData;
window.filteredData = filteredData;
window.loadGlossaryData = loadGlossaryData;
window.handleSearch = handleSearch;
window.clearSearch = clearSearch;
window.handleFilter = handleFilter;
window.handleLetterFilter = handleLetterFilter;
