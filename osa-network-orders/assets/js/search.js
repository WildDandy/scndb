// ========================================
// SEARCH FORM HANDLER - Search Results Page
// ========================================

class SearchFormHandler {
    constructor() {
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadSearchParams();
    }

    bindEvents() {
        // Search form submission
        const searchForm = document.querySelector('.search-form');
        if (searchForm) {
            searchForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSearch();
            });
        }

        // Search input enhancements
        const searchInput = document.getElementById('searchQuery');
        if (searchInput) {
            this.enhanceSearchInput(searchInput);
        }

        // Clear search button (if exists)
        const clearButton = document.getElementById('clearSearch');
        if (clearButton) {
            clearButton.addEventListener('click', () => {
                this.clearSearch();
            });
        }
    }

    enhanceSearchInput(input) {
        // Add terminal-style effects
        input.addEventListener('focus', () => {
            input.classList.add('terminal-active');
        });

        input.addEventListener('blur', () => {
            input.classList.remove('terminal-active');
        });

        // Handle Enter key
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.handleSearch();
            }
        });

        // Auto-search on input (with debounce)
        let searchTimeout;
        input.addEventListener('input', () => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                this.handleSearch();
            }, 500); // 500ms debounce
        });
    }

    handleSearch() {
        const searchInput = document.getElementById('searchQuery');
        if (!searchInput) return;

        const query = searchInput.value.trim();
        const searchParams = new URLSearchParams(window.location.search);

        if (query) {
            searchParams.set('q', query);
        } else {
            searchParams.delete('q');
        }

        // Update URL without page reload
        const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
        window.history.pushState({}, '', newUrl);

        // Trigger search in search results
        if (window.searchResults) {
            window.searchResults.performSearch(query);
        }
    }

    clearSearch() {
        const searchInput = document.getElementById('searchQuery');
        if (searchInput) {
            searchInput.value = '';
            searchInput.focus();
        }

        // Remove query from URL
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.delete('q');
        const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
        window.history.pushState({}, '', newUrl);

        // Trigger search with empty query
        if (window.searchResults) {
            window.searchResults.performSearch('');
        }
    }

    loadSearchParams() {
        const searchParams = new URLSearchParams(window.location.search);
        const query = searchParams.get('q') || '';

        const searchInput = document.getElementById('searchQuery');
        if (searchInput && query) {
            searchInput.value = query;
        }

        // Update search meta display
        this.updateSearchMeta(query);
    }

    updateSearchMeta(query) {
        const searchMeta = document.getElementById('searchMeta');
        if (searchMeta) {
            if (query) {
                searchMeta.textContent = `Searching for: "${query}"`;
            } else {
                searchMeta.textContent = 'Browsing all documents';
            }
        }
    }

    // Utility method to get current search parameters
    getCurrentSearchParams() {
        const searchParams = new URLSearchParams(window.location.search);
        return {
            query: searchParams.get('q') || '',
            date: searchParams.get('date') || '',
            order: searchParams.get('order') || ''
        };
    }

    // Method to update URL parameters
    updateSearchParams(params) {
        const searchParams = new URLSearchParams(window.location.search);

        Object.keys(params).forEach(key => {
            if (params[key]) {
                searchParams.set(key, params[key]);
            } else {
                searchParams.delete(key);
            }
        });

        const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
        window.history.pushState({}, '', newUrl);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.searchFormHandler = new SearchFormHandler();
});

// Export for ES modules if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SearchFormHandler;
}
