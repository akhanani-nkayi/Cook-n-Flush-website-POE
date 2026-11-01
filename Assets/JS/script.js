document.addEventListener("DOMContentLoaded", function () {
    //EmailJS Configuration
    emailjs.init({
        publicKey: "S8W4Tp_dVF-rti-Vj"
    });

    //Form Validation
    const forms = document.querySelectorAll(
        ".contact-form, main form[data-validate], #contact-form, #enquiry-form"
    );

    forms.forEach(function (form) {

        form.addEventListener("submit", function (event) {

            let isValid = true;

            //Remove previous errors
            form.querySelectorAll(".error-message").forEach(function (error) {
                error.remove();
            });

            form.querySelectorAll('[aria-invalid="true"]').forEach(function (input) {
                input.removeAttribute("aria-invalid");
            });

            function displayError(input, message) {
                const error = document.createElement("small");

                error.className = "error-message";
                error.style.color = "red";
                error.textContent = message;

                input.insertAdjacentElement("afterend", error);
                input.setAttribute("aria-invalid", "true");

                isValid = false;
            }

            //Required Field Validation
            form.querySelectorAll(
                "input[required], textarea[required], select[required]"
            ).forEach(function (input) {

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

                // Message length validation
                if (
                    input.tagName === "TEXTAREA" &&
                    input.value.trim().length < 10
                ) {
                    displayError(input, "Your message must contain at least 10 characters.");
                }
            });

            // Phone number validation
            const phoneInput = form.querySelector("#phone");

            if (phoneInput && phoneInput.value.trim() !== "") {
                const cleanPhone = phoneInput.value.replace(/\s/g, "");
                const phonePattern = /^(?:(?:\+27)|0)[6-8][0-9]{8}$/;

                if (!phonePattern.test(cleanPhone)) {
                    displayError(phoneInput, "Please enter a valid South African phone number (e.g. 082 123 4567)."
                    );
                }
            }

            // REGISTRATION PASSWORD VALIDATION
            const password = form.querySelector("#registerPassword");
            const confirmPassword = form.querySelector("#confirmPassword");

            if (password && confirmPassword) {

                if (password.value.length < 8) {
                    displayError(password, "Password must contain at least 8 characters."
                    );
                }

                if (password.value !== confirmPassword.value) {
                    displayError(confirmPassword, "Passwords do not match.");
                }
            }

            //Stops if validation fails
            if (!isValid) {
                event.preventDefault();
                const firstError = form.querySelector('[aria-invalid="true"]');

                if (firstError) {
                    firstError.focus();
                }
                return;
            }

            //EmailJS Submission
            const formId = form.id;

            let templateId;
            let statusId;

            if (formId === "contact-form") {
                templateId = "template_9zduthe";
                statusId = "contactStatus";
            } else if (formId === "enquiry-form") {
                templateId = "template_9zduthe";
                statusId = "enquiryStatus";
            } else {
                return;
            }

            event.preventDefault();

            const status = document.getElementById(statusId);
            if (status) {
                status.textContent = "Sending your message...";
            }

            emailjs.sendForm("service_nh9at74", templateId, form)
            .then(function () {

                if (status) {
                    status.textContent = "Thank you! Your message has been sent successfully.";
                }
                form.reset();
            })
            .catch(function (error) {

                console.error("EmailJS Error:", error);

                if (status) {
                    status.textContent = "Sorry, your message could not be sent. Please try again.";
                }
            });

        });

    });

});
