
document.addEventListener("DOMContentLoaded", function () {

    //Product Search Functionality
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

            const products = document.querySelectorAll(".product-category article");

            let matchingProduct = null;

            //First look for an exact product name
            products.forEach(function (product) {
                const productName = product.querySelector("h3")
                    .textContent.trim().toLowerCase();

                if (productName === searchValue) {
                    matchingProduct = product;
                }
            });

            //If there is no exact match, look for a partial match
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

    const productCategories = document.querySelectorAll(".product-category");

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

        //Also filter immediately when the selection changes
        categorySelect.addEventListener("change", function () {
            filterForm.requestSubmit();
        });
    }

    //Product Image Enlargement Functionality
    //Create the image overlay
    const imageOverlay = document.createElement("div");
    imageOverlay.className = "image-overlay";

    imageOverlay.innerHTML = `
        <button class="image-close" aria-label="Close enlarged image">
            &times;
        </button>
        <img class="enlarged-image" src="" alt="">
    `;

    document.body.appendChild(imageOverlay);

    const enlargedImage = imageOverlay.querySelector(".enlarged-image");
    const closeButton = imageOverlay.querySelector(".image-close");

    //Select all product images
    const productImages = document.querySelectorAll(
        ".product-category article img"
    );

    //Open enlarged image when clicked
    productImages.forEach(function (img) {

        img.style.cursor = "zoom-in";

        img.addEventListener("click", function () {

            enlargedImage.src = img.src;
            enlargedImage.alt = img.alt;

            imageOverlay.classList.add("active");
            closeButton.focus();

        });

    });

    //Close enlarged image
    function closeImage() {
        imageOverlay.classList.remove("active");
        enlargedImage.src = "";
    }

    //Close using the X button
    closeButton.addEventListener("click", closeImage);

    //Close when clicking outside the image
    imageOverlay.addEventListener("click", function (event) {
        if (event.target === imageOverlay) {
            closeImage();
        }
    });

    //Close using Escape key
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeImage();
        }
});

});
