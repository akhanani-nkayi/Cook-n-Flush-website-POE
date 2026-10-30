document.addEventListener("DOMContentLoaded", function () {
    //Select the contact and enquiry forms
    const forms = document.querySelectorAll(".contact-form, main form[data-validate]");
    forms.forEach(function (form) {
        form.addEventListener("submit", function (event) {

            let isValid = true;
            //Remove previous error messages
            form.querySelectorAll(".error-message").forEach(function (error) {
                error.remove();
            });

            form.querySelectorAll('[aria-invalid="true"]').forEach(function (input) {
                input.removeAttribute("aria-invalid");
            });

            //Function to display error messages
            function displayError(input, message) {
                const error = document.createElement("small");
                error.className = "error-message";
                error.style.color = "red";
                error.textContent = message;

                input.insertAdjacentElement("afterend", error);
                input.setAttribute("aria-invalid", "true");

                isValid = false;
            }

            //Validate required fields
            form.querySelectorAll("input[required], textarea[required], select[required]")
                .forEach(function (input) {

                    if (input.type === "checkbox") {
                        if (!input.checked) {
                            displayError(input, "Please accept this requirement.");
                        }
                        return;
                    }

                    if (input.value.trim() === "") {
                        displayError(input, "This field is required.");
                        return;
                    }

                    // Email validation
                    if (input.type === "email") {
                        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                        if (!emailPattern.test(input.value)) {
                            displayError(input, "Please enter a valid email address.");
                        }
                    }

                    
    //Phone number validation
    const phoneInput = document.getElementById("phone");
    const phoneError = document.getElementById("phoneError");
    const form = phoneInput.closest("form");

    form.addEventListener("submit", function(event) {
        const phone = phoneInput.value.trim();
        //South African phone number format
        const phonePattern = /^(?:(?:\+27)|0)[6-8][0-9]{8}$/;

        //Remove spaces before checking
        const cleanPhone = phone.replace(/\s/g, "");

        if (cleanPhone === "") {
            event.preventDefault();
            phoneError.textContent = "Please enter your phone number.";
            phoneInput.classList.add("input-error");

        } else if (!phonePattern.test(cleanPhone)) {
            event.preventDefault();
            phoneError.textContent = "Please enter a valid South African phone number (e.g. 082 123 4567).";
            phoneInput.classList.add("input-error");
        } else {

        phoneError.textContent = "";
        phoneInput.classList.remove("input-error");
    }
});

    //Remove error message when user starts correcting the number
    phoneInput.addEventListener("input", function() {
        phoneError.textContent = "";
        phoneInput.classList.remove("input-error");

    });

                    //Message length validation
                    if (input.tagName === "TEXTAREA" && input.value.trim().length < 10) {
                        displayError(input, "Your message must contain at least 10 characters.");
                    }
                });

            //Registration password validation
            const password = form.querySelector("#registerPassword");
            const confirmPassword = form.querySelector("#confirmPassword");

            if (password && confirmPassword) {
                if (password.value.length < 8) {
                    displayError(password, "Password must contain at least 8 characters.");
                }

                if (password.value !== confirmPassword.value) {
                    displayError(confirmPassword, "Passwords do not match.");
                }
            }

            //Stop submission if information is invalid
            if (!isValid) {
                event.preventDefault();

                const firstError = form.querySelector('[aria-invalid="true"]');

                if (firstError) {
                    firstError.focus();
                }
            }

        });

    });

});
