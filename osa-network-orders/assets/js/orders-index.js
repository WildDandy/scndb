// ========================================
// ORDERS INDEX - Data Loading and Indexing
// ========================================

class OrdersIndex {
    constructor() {
        this.orders = [];
        this.indexedData = [];
        this.isLoaded = false;
        this.loadPromise = null;
        this.sectionData = {
            general: [],
            intelligence: [],
            legal: [],
            pr: [],
            social: []
        };
    }

    // Load orders data from individual JSON files
    async loadOrders() {
        if (this.isLoaded) {
            return this.orders;
        }

        if (this.loadPromise) {
            return this.loadPromise;
        }

        this.loadPromise = this._loadOrdersData();
        return this.loadPromise;
    }

    async _loadOrdersData() {
        try {
            console.log('Loading orders data...');

            // For local development, we'll use embedded data to avoid CORS issues
            // In production, this would load from external JSON files

            // Load data from embedded sources (will be populated by external script)
            const allOrders = [];

            // Wait for embedded data to be available
            if (typeof window.embeddedOrderData !== 'undefined') {
                console.log('Using embedded order data...');

                // Process embedded data
                Object.keys(window.embeddedOrderData).forEach(sectionKey => {
                    const sectionOrders = window.embeddedOrderData[sectionKey];
                    console.log(`Loaded ${sectionOrders.length} orders from ${sectionKey}`);

                    // Store section data for card display
                    this.sectionData[sectionKey] = sectionOrders;

                    // Transform to match expected format and add to main orders array
                    const transformedOrders = sectionOrders.map(order => ({
                        ...order,
                        section: sectionKey,
                        range: this._getSectionRange(sectionKey)
                    }));

                    allOrders.push(...transformedOrders);
                });
            } else {
                console.warn('Embedded order data not found, trying fallback method...');

                // Fallback: Try to load from JSON files using XMLHttpRequest (works with file:// protocol)
                const sections = [
                    { key: 'general', file: './data/osa_general_orders_1-41.json', range: '1-41' },
                    { key: 'intelligence', file: './data/osa_intelligence_orders_42-74.json', range: '42-74' },
                    { key: 'pr', file: './data/osa_public_relations_orders_75-102.json', range: '75-102' },
                    { key: 'legal', file: './data/osa_legal_orders_103-136.json', range: '103-136' },
                    { key: 'social', file: './data/osa_social_reform_orders_137-149.json', range: '137-149' }
                ];

                for (const section of sections) {
                    try {
                        const sectionOrders = await this._loadJSONFile(section.file);
                        console.log(`Loaded ${sectionOrders.length} orders from ${section.key}`);

                        // Store section data for card display
                        this.sectionData[section.key] = sectionOrders;

                        // Transform to match expected format and add to main orders array
                        const transformedOrders = sectionOrders.map(order => ({
                            ...order,
                            section: section.key,
                            range: section.range
                        }));

                        allOrders.push(...transformedOrders);

                    } catch (sectionError) {
                        console.error(`Error loading ${section.key} orders:`, sectionError);
                    }
                }
            }

            this.orders = allOrders;
            console.log(`Total loaded ${this.orders.length} orders from all sections`);

            // Index the data for faster searching
            this._buildIndex();
            this.isLoaded = true;

            // Display cards on page
            this._displayCardsOnPage();

            return this.orders;
        } catch (error) {
            console.error('Error loading orders data:', error);
            throw error;
        }
    }

    // Helper method to get section range
    _getSectionRange(sectionKey) {
        const ranges = {
            general: '1-41',
            intelligence: '42-74',
            pr: '75-102',
            legal: '103-136',
            social: '137-149'
        };
        return ranges[sectionKey] || '';
    }

    // Load JSON file using XMLHttpRequest (works with file:// protocol)
    _loadJSONFile(url) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        try {
                            const data = JSON.parse(xhr.responseText);
                            resolve(data);
                        } catch (e) {
                            reject(new Error(`Failed to parse JSON from ${url}: ${e.message}`));
                        }
                    } else {
                        reject(new Error(`Failed to load ${url}: ${xhr.status}`));
                    }
                }
            };
            xhr.onerror = function() {
                reject(new Error(`Network error loading ${url}`));
            };
            xhr.send();
        });
    }

    // Build search index for faster queries
    _buildIndex() {
        console.log('Building search index...');
        this.indexedData = this.orders.map((order, index) => {
            const searchableText = this._createSearchableText(order);
            const orderNumber = this._extractOrderNumber(order);

            return {
                index,
                order,
                orderNumber,
                searchableText: searchableText.toLowerCase(),
                // Pre-compute commonly searched fields
                title: (order.title || '').toLowerCase(),
                order_number_display: (order.order_number_display || '').toLowerCase(),
                excerpt: (order.excerpt || '').toLowerCase(),
                bodyPreview: this._createBodyPreview(order),
                section: order.section,
                year: null // These orders don't have dates, so we'll set to null
            };
        });
        console.log('Search index built successfully');
    }

    // Create searchable text from all relevant fields
    _createSearchableText(order) {
        const fields = [
            order.title || '',
            order.order_number_display || '',
            order.excerpt || '',
            order.order_key || ''
        ];

        return fields.join(' ').replace(/\s+/g, ' ').trim();
    }

    // Extract order number from various fields
    _extractOrderNumber(order) {
        // Extract from order_key (like "1", "42-1", "75", etc.)
        const orderKey = order.order_key || '';
        const match = orderKey.match(/^(\d+)/);
        return match ? parseInt(match[1]) : 0;
    }

    // Display cards on the page for each section
    _displayCardsOnPage() {
        console.log('Displaying cards on page...');

        // Display cards for each section
        this._displaySectionCards('general', 'general');
        this._displaySectionCards('intelligence', 'intelligence');
        this._displaySectionCards('pr', 'pr');
        this._displaySectionCards('legal', 'legal');
        this._displaySectionCards('social', 'social');
    }

    // Display cards for a specific section
    _displaySectionCards(sectionKey, sectionId) {
        const orders = this.sectionData[sectionKey];
        if (!orders || orders.length === 0) {
            console.warn(`No orders found for section: ${sectionKey}`);
            return;
        }

        console.log(`Displaying ${orders.length} cards for ${sectionKey} section`);

        // Find the grid container for this section
        const sectionElement = document.getElementById(sectionId);
        if (!sectionElement) {
            console.warn(`Section element not found: ${sectionId}`);
            return;
        }

        const gridContainer = sectionElement.querySelector('.order-grid');
        if (!gridContainer) {
            console.warn(`Grid container not found in section: ${sectionId}`);
            return;
        }

        // Remove loading message
        const loadingMessage = gridContainer.querySelector('.loading-message');
        if (loadingMessage) {
            loadingMessage.remove();
        }

        // Create and add cards
        orders.forEach(order => {
            const cardElement = this._createOrderCard(order);
            if (cardElement) {
                gridContainer.appendChild(cardElement);
            }
        });
    }

    // Create a card element for an order
    _createOrderCard(order) {
        const card = document.createElement('div');
        card.className = 'order-card';
        card.setAttribute('data-order-key', order.order_key);

        card.innerHTML = `
            <div class="order-header">
                <div class="order-number">${order.order_number_display}</div>
            </div>
            <div class="order-content">
                <h3 class="order-title">${order.title}</h3>
                <p class="order-excerpt">${order.excerpt}</p>
            </div>
        `;

        return card;
    }

    // Create a preview of the body text
    _createBodyPreview(order) {
        if (!order) return '';

        // Combine title and excerpt for better context
        const title = order.title || '';
        const excerpt = order.excerpt || '';

        if (!excerpt) return title;

        // If excerpt is very short (< 20 words), combine with title
        const excerptWords = excerpt.split(/\s+/);
        if (excerptWords.length < 20) {
            return `${title}: ${excerpt}`;
        }

        // Show full excerpt since the data excerpts are naturally short
        // Only truncate if extremely long (>300 words)
        if (excerptWords.length <= 300) {
            return excerpt;
        }

        return excerptWords.slice(0, 300).join(' ') + '...';
    }

    // Determine section based on order number
    _determineSection(orderNumber) {
        if (orderNumber >= 1 && orderNumber <= 41) return 'OSA General';
        if (orderNumber >= 42 && orderNumber <= 74) return 'Intelligence';
        if (orderNumber >= 75 && orderNumber <= 102) return 'Public Relations';
        if (orderNumber >= 103 && orderNumber <= 136) return 'Legal';
        if (orderNumber >= 137 && orderNumber <= 149) return 'Social Reform';
        return 'Other';
    }



    // Initialize orders loading
    async initialize() {
        console.log('Initializing orders index...');
        try {
            await this.loadOrders();
            console.log('Orders loaded successfully');
        } catch (error) {
            console.error('Failed to initialize orders:', error);
        }
    }

    // Extract year from issue date
    _extractYear(issueDate) {
        if (!issueDate) return null;
        const match = issueDate.match(/\b(19|20)\d{2}\b/);
        return match ? parseInt(match[0]) : null;
    }

    // Generate plural variations for a word
    _getPluralVariations(word) {
        console.log(`Generating plural variations for: "${word}"`);
        const variations = new Set([word]);

        // Basic pluralization rules
        if (word.endsWith('s') || word.endsWith('sh') || word.endsWith('ch') || word.endsWith('x') || word.endsWith('z')) {
            variations.add(word + 'es');
        } else if (word.endsWith('y') && !/[aeiou]y$/.test(word)) {
            variations.add(word.slice(0, -1) + 'ies');
        } else if (word.endsWith('f')) {
            variations.add(word.slice(0, -1) + 'ves');
        } else if (word.endsWith('fe')) {
            variations.add(word.slice(0, -2) + 'ves');
        } else if (word.length > 2) {
            variations.add(word + 's');
        }

        // Handle common irregular plurals
        const irregulars = {
            'child': 'children',
            'person': 'people',
            'man': 'men',
            'woman': 'women',
            'tooth': 'teeth',
            'foot': 'feet',
            'mouse': 'mice',
            'goose': 'geese',
            'analysis': 'analyses',
            'crisis': 'crises',
            'thesis': 'theses',
            'criterion': 'criteria',
            'phenomenon': 'phenomena',
            'datum': 'data',
            'medium': 'media'
        };

        // Add reverse mappings for irregular plurals
        for (const [singular, plural] of Object.entries(irregulars)) {
            if (word === singular) variations.add(plural);
            if (word === plural) variations.add(singular);
        }

        // For words ending in 's', also try removing the 's' to get singular
        if (word.endsWith('s') && word.length > 3) {
            const singular = word.slice(0, -1);
            variations.add(singular);
            // Also try removing 'es' for words like "churches"
            if (word.endsWith('es')) {
                variations.add(word.slice(0, -2));
            }
        }

        const result = Array.from(variations);
        console.log(`Generated variations for "${word}":`, result);
        return result;
    }

    // Search orders based on query and filters
    async search(query = '', filters = {}) {
        await this.loadOrders();

        let results = [...this.indexedData];
        console.log('Initial results count:', results.length);
        console.log('Search query:', query);
        console.log('Filters object:', JSON.stringify(filters, null, 2));
        console.log('Filters.section type:', typeof filters.section, 'value:', filters.section);
        console.log('Filters.range type:', typeof filters.range, 'value:', filters.range);

        // Apply text search
        if (query && query.trim()) {
            const searchTerms = query.toLowerCase().trim().split(/\s+/);
            console.log('Search terms:', searchTerms);

            results = results.filter(item => {
                return searchTerms.every(term => {
                    // Check if the original term matches
                    if (item.searchableText.includes(term)) {
                        console.log(`Found exact match for "${term}" in item ${item.orderNumber}`);
                        return true;
                    }

                    // Check plural variations
                    const variations = this._getPluralVariations(term);
                    console.log(`Checking variations for "${term}":`, variations);

                    const foundVariation = variations.find(variation => {
                        if (variation !== term && item.searchableText.includes(variation)) {
                            console.log(`Found variation match: "${variation}" for term "${term}" in item ${item.orderNumber}`);
                            return true;
                        }
                        return false;
                    });

                    return foundVariation !== undefined;
                });
            });
            console.log('After text search:', results.length, 'results');
        }

        // Apply section filter
        if (filters.section && filters.section !== 'all') {
            console.log('Applying section filter:', filters.section);
            results = results.filter(item => item.section === filters.section);
            console.log('After section filter:', results.length, 'results');
        }

        // Apply order range filter
        if (filters.range) {
            console.log('Applying range filter:', filters.range);
            results = results.filter(item => {
                const orderNum = item.orderNumber;
                switch (filters.range) {
                    case '1-50': return orderNum >= 1 && orderNum <= 50;
                    case '51-100': return orderNum >= 51 && orderNum <= 100;
                    case '101+': return orderNum >= 101;
                    default: return true;
                }
            });
            console.log('After range filter:', results.length, 'results');
        }

        // Apply date range filter
        if (filters.dateRange) {
            results = results.filter(item => {
                const year = item.year;
                if (!year) return false;

                switch (filters.dateRange) {
                    case 'before-1980': return year < 1980;
                    case '1980-1990': return year >= 1980 && year < 1990;
                    case '1990-2000': return year >= 1990 && year < 2000;
                    case '2000+': return year >= 2000;
                    default: return true;
                }
            });
        }

        return results;
    }

    // Get order by index
    getOrder(index) {
        return this.orders[index];
    }

    // Get all orders (for browsing)
    getAllOrders() {
        return this.orders;
    }

    // Get order count
    getOrderCount() {
        return this.orders.length;
    }
}

// Create global instance
window.ordersIndex = new OrdersIndex();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing orders...');
    window.ordersIndex.initialize();
});

// Export for ES modules if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = OrdersIndex;
}
