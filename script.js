// Hover Animation für die Navbar Links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('mouseenter', (e) => {
        e.target.style.transition = 'all 0.3s ease';
        e.target.style.transform = 'translateY(-2px)';
    });

    link.addEventListener('mouseleave', (e) => {
        e.target.style.transform = 'translateY(0)';
    });
});

// Hover Animation für das Logo
const logo = document.querySelector('.logo');
logo.addEventListener('mouseenter', () => {
    logo.style.transition = 'all 0.5s ease';
    logo.style.transform = 'rotate(10deg) scale(1.1)';
});

logo.addEventListener('mouseleave', () => {
    logo.style.transform = 'rotate(0) scale(1)';
});

// Hover Animation für die Dropdown-Menüs 
document.querySelectorAll('.dropdown-content a').forEach(item => {
    item.addEventListener('mouseenter', (e) => {
        e.target.style.transition = 'all 0.2s';
        e.target.style.paddingLeft = '10px';
        e.target.style.backgroundColor = '#b66951';
        e.target.style.color = 'white';
    });

    item.addEventListener('mouseleave', (e) => {
        e.target.style.paddingLeft = '0px';
        e.target.style.backgroundColor = '';
        e.target.style.color = 'black';
    });
});

// Suchleiste
document.getElementById('search-button').addEventListener('click', function() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const category = document.getElementById('category-select').value;
    
    // Add your search logic here
    // Example:
    const items = document.querySelectorAll('.item'); // Add class 'item' to your product elements
    
    items.forEach(item => {
        const itemCategory = item.dataset.category;
        const itemText = item.textContent.toLowerCase();
        
        if ((category === 'all' || itemCategory === category) && 
            itemText.includes(searchTerm)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const filterCheckboxes = document.querySelectorAll('[data-filter]');
    const products = document.querySelectorAll('.product-item');

    function filterProducts() {
        const activeFilters = {
            category: [],
            taste: [],
            milk: [],
            type: [],
            special: []
        };

        // Collect active filters
        filterCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                const filterType = checkbox.dataset.filter;
                activeFilters[filterType].push(checkbox.value);
            }
        });

        // Filter products
        products.forEach(product => {
            let shouldShow = true;

            // Check each filter type
            Object.keys(activeFilters).forEach(filterType => {
                if (activeFilters[filterType].length > 0) {
                    const productValues = product.dataset[filterType].split(',');
                    const hasMatch = activeFilters[filterType].some(filter => 
                        productValues.includes(filter)
                    );
                    if (!hasMatch) shouldShow = false;
                }
            });

            product.style.display = shouldShow ? 'block' : 'none';
        });
    }

    // Add event listeners to all checkboxes
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', filterProducts);
    });
});
