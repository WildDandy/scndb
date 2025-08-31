// ========================================
// SEARCH RESULTS - Main Search Functionality
// ========================================

class SearchResults {
    constructor() {
        this.currentResults = [];
        this.currentPage = 1;
        this.resultsPerPage = 10;
        this.currentQuery = '';
        this.currentFilters = {};
        this.currentSort = 'relevance';

        this.init();
    }

    init() {
        this.bindEvents();
        this.loadInitialSearch();
    }

    bindEvents() {
        // Search form submission
        const searchForm = document.querySelector('.search-form');
        if (searchForm) {
            searchForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.performSearch();
            });
        }

        // Sort select change
        const sortSelect = document.getElementById('sortSelect');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.currentSort = e.target.value;
                this.displayResults();
            });
        }

        // Filter clicks
        document.addEventListener('click', (e) => {
            const filterEl = e.target.closest('[data-filter-all], [data-filter-section], [data-filter-range]');
            if (filterEl) {
                e.preventDefault();
                this.handleFilterClick(filterEl);
            }
        });

        // Clear filters button
        const clearFiltersBtn = document.getElementById('clearFilters');
        if (clearFiltersBtn) {
            clearFiltersBtn.addEventListener('click', () => {
                this.clearFilters();
            });
        }

        // Pagination clicks
        document.addEventListener('click', (e) => {
            const pageLink = e.target.closest('.page-link');
            if (pageLink) {
                e.preventDefault();
                const page = parseInt(pageLink.dataset.page);
                if (page) {
                    this.goToPage(page);
                }
            }
        });
    }

    loadInitialSearch() {
        // Get search parameters from URL
        const urlParams = new URLSearchParams(window.location.search);
        const query = urlParams.get('q') || '';
        const dateRange = urlParams.get('date') || '';
        const orderNumber = urlParams.get('order') || '';

        // Set form values
        const searchInput = document.getElementById('searchQuery');
        if (searchInput) {
            searchInput.value = query;
        }

        // Perform initial search
        if (query || dateRange || orderNumber) {
            this.performSearch(query, { dateRange, orderNumber });
        } else {
            this.showAllOrders();
        }
    }

    async performSearch(query = null, additionalFilters = {}) {
        const searchQuery = query || document.getElementById('searchQuery')?.value || '';
        console.log('performSearch called with:', { query, searchQuery, additionalFilters });
        this.currentQuery = searchQuery;

        // Preserve existing filters if no additionalFilters provided
        if (Object.keys(additionalFilters).length === 0) {
            // No additional filters provided, keep current filters
            console.log('No additional filters provided, keeping current filters:', this.currentFilters);
        } else {
            // Build filters with provided additionalFilters
            this.currentFilters = {
                section: additionalFilters.section !== undefined ? additionalFilters.section : this.currentFilters.section,
                range: additionalFilters.range !== undefined ? additionalFilters.range : this.currentFilters.range,
                dateRange: additionalFilters.dateRange !== undefined ? additionalFilters.dateRange : this.currentFilters.dateRange
            };
        }

        console.log('Final search parameters:', { searchQuery, currentFilters: this.currentFilters });

        try {
            // Show loading state
            this.showLoadingState();

            // Perform search
            const results = await window.ordersIndex.search(searchQuery, this.currentFilters);
            console.log('Search returned', results.length, 'results');

            // Store results and reset pagination
            this.currentResults = results;
            this.currentPage = 1;

            // Display results
            this.displayResults();

            // Update filters count
            await this.updateFilterCounts();

            // Update active filter visual indicators
            this.updateActiveFilters();

        } catch (error) {
            console.error('Search error:', error);
            this.showErrorState('Error performing search. Please try again.');
        }
    }

    async showAllOrders() {
        this.currentQuery = '';
        this.currentFilters = { section: 'all', range: '', dateRange: '' };

        try {
            this.showLoadingState();
            const results = await window.ordersIndex.search('', this.currentFilters);
            this.currentResults = results;
            this.currentPage = 1;
            this.displayResults();
            await this.updateFilterCounts();
        } catch (error) {
            console.error('Error loading orders:', error);
            this.showErrorState('Error loading orders. Please refresh the page.');
        }
    }

    displayResults() {
        const resultsContainer = document.getElementById('resultsContainer');
        if (!resultsContainer) return;

        if (this.currentResults.length === 0) {
            this.showNoResults();
            this.updateResultsCount(0);
            this.hidePagination();
            return;
        }

        // Sort results
        const sortedResults = this.sortResults([...this.currentResults]);

        // Paginate results
        const totalPages = Math.ceil(sortedResults.length / this.resultsPerPage);
        const startIndex = (this.currentPage - 1) * this.resultsPerPage;
        const endIndex = startIndex + this.resultsPerPage;
        const pageResults = sortedResults.slice(startIndex, endIndex);

        // Generate HTML
        const resultsHTML = pageResults.map(item => this.generateResultHTML(item)).join('');

        // Update DOM
        resultsContainer.innerHTML = resultsHTML;
        this.updateResultsCount(sortedResults.length);
        this.updatePagination(totalPages);
    }

    sortResults(results) {
        switch (this.currentSort) {
            case 'relevance':
                // For relevance, keep current order (already sorted by search score)
                return results;
            case 'date-desc':
                return results.sort((a, b) => {
                    const dateA = new Date(a.order['Issue Date'] || '');
                    const dateB = new Date(b.order['Issue Date'] || '');
                    return dateB - dateA;
                });
            case 'date-asc':
                return results.sort((a, b) => {
                    const dateA = new Date(a.order['Issue Date'] || '');
                    const dateB = new Date(b.order['Issue Date'] || '');
                    return dateA - dateB;
                });
            case 'order-asc':
                return results.sort((a, b) => a.orderNumber - b.orderNumber);
            case 'classification':
                return results.sort((a, b) => {
                    const classA = a.order['order-num'] || '';
                    const classB = b.order['order-num'] || '';
                    return classA.localeCompare(classB);
                });
            default:
                return results;
        }
    }

    generateResultHTML(item) {
        const order = item.order;
        const orderNumber = item.orderNumber;

        // Handle exceptions with underscores instead of dashes
        const underscoreExceptions = ['9-1', '9-2', '20-1', '28-1', '28-2', '39-1', '39-2', '39-3', '42-1'];
        let fileName = orderNumber;
        if (underscoreExceptions.includes(String(orderNumber))) {
            fileName = String(orderNumber).replace(/-/g, '_');
        }

        return `
            <a href="orders/nw_order_${fileName}.html" target="_blank" class="search-result-item-link">
                <div class="search-result-item" data-order="${orderNumber}">
                    <div class="result-header">
                        <div class="result-title">
                            ${this.escapeHtml(order.title || 'Untitled')}
                        </div>
                        <div class="result-meta">
                            <span class="order-number">Order ${orderNumber}</span>
                            ${order['order-num'] ? `<span class="classification">${order['order-num']}</span>` : ''}
                            ${order['Issue Date'] ? `<span class="issue-date">${order['Issue Date']}</span>` : ''}
                        </div>
                    </div>
                    <div class="result-content">
                        <div class="result-excerpt">
                            ${this.escapeHtml(item.bodyPreview)}
                        </div>
                        <div class="result-details">
                            ${order.Author ? `<div class="author">Author: ${this.escapeHtml(order.Author)}</div>` : ''}
                            ${order.Recipients ? `<div class="recipients">Recipients: ${this.escapeHtml(order.Recipients)}</div>` : ''}
                            <div class="section-badge">${item.section}</div>
                        </div>
                    </div>
                </div>
            </a>
        `;
    }

    updateResultsCount(count) {
        const resultsCount = document.getElementById('resultsCount');
        if (resultsCount) {
            if (count === 0) {
                resultsCount.textContent = 'No documents found';
            } else {
                const start = (this.currentPage - 1) * this.resultsPerPage + 1;
                const end = Math.min(this.currentPage * this.resultsPerPage, count);
                resultsCount.textContent = `Found ${count} documents (showing ${start}-${end})`;
            }
        }
    }

    updatePagination(totalPages) {
        const pagination = document.getElementById('pagination');
        if (!pagination) return;

        if (totalPages <= 1) {
            this.hidePagination();
            return;
        }

        let paginationHTML = '<div class="pagination-controls">';

        // Previous button
        if (this.currentPage > 1) {
            paginationHTML += `<a href="#" class="page-link" data-page="${this.currentPage - 1}">Previous</a>`;
        }

        // Page numbers
        const startPage = Math.max(1, this.currentPage - 2);
        const endPage = Math.min(totalPages, this.currentPage + 2);

        if (startPage > 1) {
            paginationHTML += `<a href="#" class="page-link" data-page="1">1</a>`;
            if (startPage > 2) {
                paginationHTML += '<span class="pagination-dots">...</span>';
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            if (i === this.currentPage) {
                paginationHTML += `<span class="page-link current">${i}</span>`;
            } else {
                paginationHTML += `<a href="#" class="page-link" data-page="${i}">${i}</a>`;
            }
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                paginationHTML += '<span class="pagination-dots">...</span>';
            }
            paginationHTML += `<a href="#" class="page-link" data-page="${totalPages}">${totalPages}</a>`;
        }

        // Next button
        if (this.currentPage < totalPages) {
            paginationHTML += `<a href="#" class="page-link" data-page="${this.currentPage + 1}">Next</a>`;
        }

        paginationHTML += '</div>';
        pagination.innerHTML = paginationHTML;
        pagination.style.display = 'block';
    }

    hidePagination() {
        const pagination = document.getElementById('pagination');
        if (pagination) {
            pagination.style.display = 'none';
        }
    }

    async updateFilterCounts() {
        // Use current filtered results instead of all orders
        const currentResults = this.currentResults;

        // Count by section from current results
        const sectionCounts = {};
        currentResults.forEach(item => {
            const orderNumber = item.orderNumber;
            const section = item.section;
            sectionCounts[section] = (sectionCounts[section] || 0) + 1;
        });

        // Count by range from current results
        const rangeCounts = {
            '1-50': 0,
            '51-100': 0,
            '101+': 0
        };

        currentResults.forEach(item => {
            const orderNumber = item.orderNumber;
            if (orderNumber >= 1 && orderNumber <= 50) rangeCounts['1-50']++;
            else if (orderNumber >= 51 && orderNumber <= 100) rangeCounts['51-100']++;
            else if (orderNumber >= 101) rangeCounts['101+']++;
        });

        // Update filter counts in the DOM
        document.getElementById('allCount').textContent = `(${currentResults.length})`;
        document.getElementById('generalCount').textContent = `(${sectionCounts['general'] || 0})`;
        document.getElementById('intelligenceCount').textContent = `(${sectionCounts['intelligence'] || 0})`;
        document.getElementById('prCount').textContent = `(${sectionCounts['pr'] || 0})`;
        document.getElementById('legalCount').textContent = `(${sectionCounts['legal'] || 0})`;
        document.getElementById('socialCount').textContent = `(${sectionCounts['social'] || 0})`;
        document.getElementById('range1Count').textContent = `(${rangeCounts['1-50']})`;
        document.getElementById('range2Count').textContent = `(${rangeCounts['51-100']})`;
        document.getElementById('range3Count').textContent = `(${rangeCounts['101+']})`;
    }

    handleFilterClick(filterEl) {
        // Handle filter clicks - apply filters on top of existing search
        console.log('Filter clicked:', filterEl);

        // Get current search query from input field
        const searchInput = document.getElementById('searchQuery');
        const searchQuery = searchInput ? searchInput.value.trim() : '';
        console.log('Current search query:', searchQuery);

        // Update filters based on clicked element
        if (filterEl.hasAttribute('data-filter-all')) {
            console.log('Clearing all filters');
            this.currentFilters.section = 'all';
            this.currentFilters.range = '';
        } else if (filterEl.hasAttribute('data-filter-section')) {
            const section = filterEl.getAttribute('data-filter-section');
            console.log('Applying section filter:', section);
            this.currentFilters.section = section;
            this.currentFilters.range = '';
        } else if (filterEl.hasAttribute('data-filter-range')) {
            const range = filterEl.getAttribute('data-filter-range');
            console.log('Applying range filter:', range);
            this.currentFilters.range = range;
            this.currentFilters.section = 'all';
        }

        console.log('New filters:', this.currentFilters);

        // Perform search with current query + new filters
        this.performSearch(searchQuery);
        this.updateActiveFilters();
    }

    updateActiveFilters() {
        // Remove all active filter classes
        document.querySelectorAll('[data-filter-all], [data-filter-section], [data-filter-range]').forEach(el => {
            el.classList.remove('active-filter');
        });

        // Add active class to current filters
        if (this.currentFilters.section && this.currentFilters.section !== 'all') {
            const activeSection = document.querySelector(`[data-filter-section="${this.currentFilters.section}"]`);
            if (activeSection) {
                activeSection.classList.add('active-filter');
            }
        }

        if (this.currentFilters.range) {
            const activeRange = document.querySelector(`[data-filter-range="${this.currentFilters.range}"]`);
            if (activeRange) {
                activeRange.classList.add('active-filter');
            }
        }

        // Update active filters display
        this.updateActiveFiltersDisplay();
    }

    updateActiveFiltersDisplay() {
        const displayElement = document.getElementById('activeFiltersDisplay');
        const filtersElement = document.getElementById('currentFilters');

        if (!displayElement || !filtersElement) return;

        const activeFilters = [];

        // Add search query if exists
        if (this.currentQuery && this.currentQuery.trim()) {
            activeFilters.push(`<span class="filter-tag">Search: "${this.currentQuery}"</span>`);
        }

        // Add section filter if active
        if (this.currentFilters.section && this.currentFilters.section !== 'all') {
            activeFilters.push(`<span class="filter-tag">${this.currentFilters.section}</span>`);
        }

        // Add range filter if active
        if (this.currentFilters.range) {
            const rangeText = this.currentFilters.range === '101+' ? 'Orders 101+' : `Orders ${this.currentFilters.range}`;
            activeFilters.push(`<span class="filter-tag">${rangeText}</span>`);
        }

        if (activeFilters.length > 0) {
            filtersElement.innerHTML = activeFilters.join('');
            displayElement.style.display = 'block';
        } else {
            displayElement.style.display = 'none';
        }
    }

    clearFilters() {
        // Clear all filters and show all results
        this.currentFilters = {
            section: 'all',
            range: '',
            dateRange: ''
        };

        const searchQuery = this.currentQuery || document.getElementById('searchQuery')?.value || '';
        this.performSearch(searchQuery);
        this.updateActiveFilters();
    }

    goToPage(page) {
        this.currentPage = page;
        this.displayResults();
    }

    showLoadingState() {
        const resultsContainer = document.getElementById('resultsContainer');
        if (resultsContainer) {
            resultsContainer.innerHTML = `
                <div class="loading-state">
                    <div class="terminal-loader">
                        <div class="terminal-line">user@archive:~$ Searching database...</div>
                        <div class="loading-spinner"></div>
                    </div>
                </div>
            `;
        }
    }

    showNoResults() {
        const resultsContainer = document.getElementById('resultsContainer');
        if (resultsContainer) {
            resultsContainer.innerHTML = `
                <div class="no-results">
                    <h3>No Documents Found</h3>
                    <p>Your search query did not match any documents in the archive.</p>
                    <p>Try modifying your search terms or removing filters.</p>
                </div>
            `;
        }
    }

    showErrorState(message) {
        const resultsContainer = document.getElementById('resultsContainer');
        if (resultsContainer) {
            resultsContainer.innerHTML = `
                <div class="error-state">
                    <h3>Search Error</h3>
                    <p>${this.escapeHtml(message)}</p>
                    <button class="nav-btn" onclick="window.location.reload()">Try Again</button>
                </div>
            `;
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize search results when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.searchResults = new SearchResults();
});

// Export for ES modules if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SearchResults;
}
