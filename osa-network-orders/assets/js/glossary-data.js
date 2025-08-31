// Glossary Data Manager
// Manages glossary data directly embedded

class GlossaryData {
    constructor() {
        this.data = [];
        this.filteredData = [];
        this.isLoaded = false;
    }

    async loadData() {
        try {
            // Load embedded data to avoid CORS issues with local files
            // The data is embedded in glossary-data-embedded.js
            await this.loadEmbeddedData();
            this.filteredData = [...this.data];
            this.isLoaded = true;
            console.log(`Loaded ${this.data.length} glossary entries`);
        } catch (error) {
            console.error('Error loading glossary data:', error);
            this.data = [];
            this.filteredData = [];
            this.isLoaded = true;
        }
    }

    async loadEmbeddedData() {
        try {
            // Use embedded data directly to avoid CORS issues
            if (typeof window.glossaryData !== 'undefined') {
                this.data = window.glossaryData;
                console.log('Embedded data loaded successfully:', this.data.length, 'items');
            } else {
                throw new Error('Embedded data not available');
            }
        } catch (error) {
            console.error('Error loading embedded data:', error);
            this.data = [];
        }
    }

    filterByQuery(query) {
        if (!query || query.trim() === '') {
            this.filteredData = [...this.data];
        } else {
            const searchTerm = query.toLowerCase().trim();
            this.filteredData = this.data.filter(item =>
                item.t.toLowerCase().includes(searchTerm) ||
                item.d.toLowerCase().includes(searchTerm)
            );
        }
        return this.filteredData;
    }

    filterByLetter(letter) {
        if (!letter) {
            this.filteredData = [...this.data];
        } else {
            this.filteredData = this.data.filter(item =>
                item.t.toLowerCase().startsWith(letter.toLowerCase())
            );
        }
        return this.filteredData;
    }

    getAlphabetLetters() {
        const letters = new Set();
        this.data.forEach(item => {
            const firstLetter = item.t.charAt(0).toUpperCase();
            if (firstLetter.match(/[A-Z]/)) {
                letters.add(firstLetter);
            }
        });
        return Array.from(letters).sort();
    }

    getTotalCount() {
        return this.data.length;
    }

    getFilteredCount() {
        return this.filteredData.length;
    }
}

// Create global instance
const glossaryData = new GlossaryData();

// Auto-load data when script loads
document.addEventListener('DOMContentLoaded', () => {
    glossaryData.loadData();
});
