document.addEventListener('DOMContentLoaded', function() {
    const filterCheckboxes = document.querySelectorAll('[data-filter]');
    const products = document.querySelectorAll('.product-item');

    function filterProducts() {
        const activeFilters = {
            category: [],
            season: [],
            properties: []
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
