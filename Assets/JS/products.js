
document.addEventListener("DOMContentLoaded", function () {

    // Product Search Functionality
    const searchForm = document.getElementById("productSearchForm");
    const searchInput = document.getElementById("search");
    const searchMessage = document.getElementById("searchMessage");

    if (searchForm) {
        searchForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const searchValue = searchInput.value
                .trim()
                .toLowerCase();

            if (searchValue === "") {
                searchMessage.textContent = "Please enter a product name.";
                searchMessage.style.color = "red";
                return;
            }

            const products = document.querySelectorAll(
                ".product-category article"
            );

            let matchingProduct = null;

            // First look for an exact product name
            products.forEach(function (product) {
                const productName = product.querySelector("h3")
                    .textContent.trim().toLowerCase();

                if (productName === searchValue) {
                    matchingProduct = product;
                }
            });

            // If there is no exact match, look for a partial match
            if (!matchingProduct) {
                products.forEach(function (product) {
                    const productName = product.querySelector("h3")
                        .textContent.trim().toLowerCase();

                    if (!matchingProduct &&
                        productName.includes(searchValue)) {
                        matchingProduct = product;
                    }
                });
            }

            // If a product is found, open its details
            if (matchingProduct) {
                const detailsLink = matchingProduct.querySelector(
                    'a[href*="detail.html#"]'
                );

                if (detailsLink) {
                    window.location.href = detailsLink.href;
                } else {
                    searchMessage.textContent =
                        "Product details are currently unavailable.";
                    searchMessage.style.color = "red";
                }

            } else {
                searchMessage.textContent = "Sorry, no matching product was found. Please try another product name.";
                searchMessage.style.color = "red";
            }

        });

    }


    // Category Filter Functionality
    const filterForm = document.getElementById("categoryFilterForm");
    const categorySelect = document.getElementById("category");

    const productCategories = document.querySelectorAll(
        ".product-category"
    );

    if (filterForm) {

        filterForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const selectedCategory = categorySelect.value;

            productCategories.forEach(function (section) {
                const sectionCategory = section.dataset.category;

                if (selectedCategory === "all" ||
                    selectedCategory === sectionCategory) {
                    section.hidden = false;
                } else {
                    section.hidden = true;
                }

            });

        });

        // Also filter immediately when the selection changes
        categorySelect.addEventListener("change", function () {

            filterForm.requestSubmit();

        });
    }
});
