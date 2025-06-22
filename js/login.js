document.addEventListener('DOMContentLoaded', function () {

            const loginForm = document.getElementById('loginForm');
            const emailInput = document.getElementById('email');
            const passwordInput = document.getElementById('password');
            const submitButton = document.getElementById('submitButton');

            function validateEmail(email) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(email);
            }

            function showError(inputElement, errorElement, message) {
                inputElement.classList.add('form-group__input--error');
                errorElement.textContent = message;
                errorElement.classList.add('form-group__error--visible');
            }

            function hideError(inputElement, errorElement) {
                inputElement.classList.remove('form-group__input--error');
                errorElement.classList.remove('form-group__error--visible');
            }

            emailInput.addEventListener('input', function () {
                const emailError = document.getElementById('emailError');
                if (this.value && !validateEmail(this.value)) {
                    showError(this, emailError, 'Por favor, ingresa un correo electrónico válido');
                } else {
                    hideError(this, emailError);
                }
            });

            passwordInput.addEventListener('input', function () {
                const passwordError = document.getElementById('passwordError');
                if (this.value && this.value.length < 6) {
                    showError(this, passwordError, 'La contraseña debe tener al menos 6 caracteres');
                } else {
                    hideError(this, passwordError);
                }
            });

            loginForm.addEventListener('submit', function (e) {
                e.preventDefault();

                const email = emailInput.value.trim();
                const password = passwordInput.value;
                const emailError = document.getElementById('emailError');
                const passwordError = document.getElementById('passwordError');

                let isValid = true;

                if (!email) {
                    showError(emailInput, emailError, 'El correo electrónico es requerido');
                    isValid = false;
                } else if (!validateEmail(email)) {
                    showError(emailInput, emailError, 'Por favor, ingresa un correo electrónico válido');
                    isValid = false;
                } else {
                    hideError(emailInput, emailError);
                }

                if (!password) {
                    showError(passwordInput, passwordError, 'La contraseña es requerida');
                    isValid = false;
                } else if (password.length < 6) {
                    showError(passwordInput, passwordError, 'La contraseña debe tener al menos 6 caracteres');
                    isValid = false;
                } else {
                    hideError(passwordInput, passwordError);
                }

                if (isValid) {
                    submitButton.classList.add('login__submit--loading');
                    submitButton.disabled = true;

                    setTimeout(() => {
                        submitButton.classList.remove('login__submit--loading');
                        submitButton.disabled = false;

                        alert('Login exitoso! (Simulado)');
                        console.log('Login data:', { email, password });
                    }, 2000);
                }
            });
        });
