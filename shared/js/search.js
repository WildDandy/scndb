// Search functionality for the OSA Network Orders site

// Build URL parameters for search
function buildParams(params) {
    const urlParams = new URLSearchParams();
    if (params.q) urlParams.append('q', params.q);
    if (params.date) urlParams.append('date', params.date);
    if (params.order) urlParams.append('order', params.order);
    return urlParams.toString();
}

// Perform search function
function performSearch(event) {
    if (event && event.preventDefault) {
        event.preventDefault();
    }
    
    const query = (document.getElementById('searchQuery')?.value || '').trim();
    const dateRange = document.getElementById('dateRange')?.value || '';
    const orderNumber = (document.getElementById('orderNumber')?.value || '').trim();
    
    // Build search parameters
    const params = { q: query, date: dateRange, order: orderNumber };
    
    // Redirect to results page
    window.location.href = `osa-network-orders/search_results.html?${buildParams(params)}`;
}

// Quick search function
function quickSearch(term) {
    const searchInput = document.getElementById('searchQuery');
    if (searchInput) {
        searchInput.value = term;
        // Create a synthetic event object
        const syntheticEvent = {
            preventDefault: function() {}
        };
        performSearch(syntheticEvent);
    }
}

// Terminal-style typing effect for search input
function initSearchEffects() {
    const searchInput = document.getElementById('searchQuery');
    if (searchInput) {
        // Auto-focus search input
        searchInput.focus();
        
        // Add typing effect
        searchInput.addEventListener('input', function(e) {
            // Add slight delay to simulate terminal input
            setTimeout(() => {
                // Could add terminal sound effects here
            }, 50);
        });
    }
}

// Initialize search functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Bind search form
    const searchForm = document.querySelector('.search-form');
    const hasFullSearchControls = !!document.getElementById('dateRange');
    if (searchForm && hasFullSearchControls) {
        searchForm.addEventListener('submit', performSearch);
    }
    
    // Bind quick search tags
    document.querySelectorAll('.quick-tag').forEach(tag => {
        tag.addEventListener('click', function() {
            const term = this.textContent.trim();
            quickSearch(term);
        });
    });
    
    // Initialize search effects
    initSearchEffects();
});

// Expose functions globally for inline HTML handlers
window.performSearch = performSearch;
window.quickSearch = quickSearch;