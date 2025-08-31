// Glossary Page Controller
// Handles UI interactions and display logic

class GlossaryController {
    constructor() {
        this.filterInput = document.getElementById('q');
        this.clearButton = document.getElementById('clear-search');
        this.countDisplay = document.getElementById('count');
        this.alphaBar = document.getElementById('alphaBar');
        this.glossaryList = document.getElementById('glossaryList');
        this.currentFilter = '';
        this.currentLetter = '';

        this.init();
    }

    async init() {
        // Wait for data to load
        await this.waitForDataLoad();
        // Data loaded successfully

        // Setup event listeners
        this.setupEventListeners();

        // Generate alphabet navigation
        this.generateAlphabetNav();

        // Display all items initially
        this.displayGlossaryItems(glossaryData.data);
        this.updateCount(glossaryData.data.length);
    }

    async waitForDataLoad() {
        while (!glossaryData.isLoaded) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }

    setupEventListeners() {
        // Filter input
        if (this.filterInput) {
            this.filterInput.addEventListener('input', (e) => {
                this.currentFilter = e.target.value;
                this.currentLetter = ''; // Clear letter filter when typing
                this.handleFilter();
            });
        }

        // Clear button
        if (this.clearButton) {
            this.clearButton.addEventListener('click', () => {
                this.clearSearch();
            });
        }

        // Alphabet navigation will be added dynamically
    }

    clearSearch() {
        // Clear the search input
        if (this.filterInput) {
            this.filterInput.value = '';
        }

        // Reset filters
        this.currentFilter = '';
        this.currentLetter = '';

        // Clear active states from alphabet buttons
        const buttons = this.alphaBar?.querySelectorAll('.alpha-letter');
        buttons?.forEach(btn => {
            if (btn.textContent === 'All') {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Display all items
        this.displayGlossaryItems(glossaryData.data);
        this.updateCount(glossaryData.data.length);

        // Focus back to input for better UX
        if (this.filterInput) {
            this.filterInput.focus();
        }
    }

    generateAlphabetNav() {
        if (!this.alphaBar) return;

        const letters = glossaryData.getAlphabetLetters();
        this.alphaBar.innerHTML = '';

        // Add "All" option
        const allButton = document.createElement('button');
        allButton.textContent = 'All';
        allButton.className = 'alpha-letter active';
        allButton.addEventListener('click', () => this.handleLetterClick(''));
        this.alphaBar.appendChild(allButton);

        // Add letter buttons
        letters.forEach(letter => {
            const button = document.createElement('button');
            button.textContent = letter;
            button.className = 'alpha-letter';
            button.addEventListener('click', () => this.handleLetterClick(letter));
            this.alphaBar.appendChild(button);
        });
    }

    handleLetterClick(letter) {
        this.currentLetter = letter;
        this.currentFilter = ''; // Clear text filter when clicking letters
        if (this.filterInput) {
            this.filterInput.value = '';
        }

        // Update active state
        const buttons = this.alphaBar.querySelectorAll('.alpha-letter');
        buttons.forEach(btn => {
            if (btn.textContent === (letter || 'All')) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        this.handleFilter();
    }

    handleFilter() {
        let filteredData;

        if (this.currentFilter) {
            filteredData = glossaryData.filterByQuery(this.currentFilter);
        } else if (this.currentLetter) {
            filteredData = glossaryData.filterByLetter(this.currentLetter);
        } else {
            filteredData = glossaryData.data;
        }

        this.displayGlossaryItems(filteredData);
        this.updateCount(filteredData.length);
    }

    displayGlossaryItems(data = null) {
        if (!this.glossaryList) return;

        // Use the passed data, or fall back to all data if no filter is applied
        const itemsToDisplay = data || (this.currentFilter || this.currentLetter ? glossaryData.filteredData : glossaryData.data);
        this.glossaryList.innerHTML = '';

        // Displaying filtered items

        if (!itemsToDisplay || itemsToDisplay.length === 0) {
            this.glossaryList.innerHTML = '<div class="no-results">No matching terms found.</div>';
            return;
        }

        itemsToDisplay.forEach(item => {
            const glossaryItem = document.createElement('div');
            glossaryItem.className = 'glossary-item';

            glossaryItem.innerHTML = `
                <div class="glossary-term">${this.escapeHtml(item.t)}</div>
                <div class="glossary-def">${this.escapeHtml(item.d)}</div>
            `;

            this.glossaryList.appendChild(glossaryItem);
        });
    }

    updateCount(count = null) {
        if (!this.countDisplay) return;

        const displayCount = count !== null ? count : glossaryData.getFilteredCount();
        const totalCount = glossaryData.getTotalCount();

        if (displayCount === totalCount) {
            this.countDisplay.textContent = `${totalCount} entries`;
        } else {
            this.countDisplay.textContent = `${displayCount} of ${totalCount} entries`;
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize when DOM is ready and data is loaded
document.addEventListener('DOMContentLoaded', () => {
    new GlossaryController();
});
