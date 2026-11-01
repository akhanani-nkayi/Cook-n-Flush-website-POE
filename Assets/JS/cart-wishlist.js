document.addEventListener("DOMContentLoaded", function () {
    // Retrieve saved products from localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    // Save cart to localStorage
    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    // Save wishlist to localStorage
    function saveWishlist() {
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }

    // Select all product sections
    const products = document.querySelectorAll("main section");

    products.forEach(function (section) {
        // Get product information
        const productName = section.querySelector("h2");
        const productImage = section.querySelector("img");
        const quantityInput = section.querySelector('input[type="number"]');

        const priceHeading = Array.from(
            section.querySelectorAll("h3")
        ).find(function (heading) {
            return heading.textContent.includes("Price:");
        });

        const buttons = section.querySelectorAll("button");

        //Check required product information
        if (!productName || !priceHeading ||
            !quantityInput || !productImage || buttons.length < 2) {
            return;
        }

        // Create product object
        const product = {
            id: section.id,
            name: productName.textContent.trim(),
            price: Number(
                priceHeading.textContent
                    .replace("Price:", "")
                    .replace(/[R,\s]/g, "")
            ),
            image: productImage.getAttribute("src")
        };

        //Add to cart button
        buttons[0].addEventListener("click", function () {

            const quantity = Number(quantityInput.value);

            //Validate quantity
            if (!Number.isInteger(quantity) || quantity < 1) {
                alert("Please enter a valid product quantity.");
                quantityInput.focus();
                return;
            }

            //Check if product already exists in cart
            const existingProduct = cart.find(function (item) {
                return item.id === product.id;
            });

            if (existingProduct) {
                // Increase existing quantity
                existingProduct.quantity += quantity;
            } else {
                // Add new product to cart
                cart.push({
                    ...product,
                    quantity: quantity
                });
            }
            // Save cart
            saveCart();

            // Confirmation message
            alert(product.name + " has been successfully added to your cart!");
        });


        //Add to wishlist button
        buttons[1].addEventListener("click", function () {

            // Check if product is already in wishlist
            const existingProduct = wishlist.some(function (item) {
                return item.id === product.id;
            });

            if (existingProduct) {
                alert(product.name + " is already in your wishlist!");
                return;
            }

            //Add product to wishlist
            wishlist.push(product);

            //Save wishlist
            saveWishlist();

            //Confirmation message
            alert(product.name + " has been successfully added to your wishlist!");
        });

    });

});
