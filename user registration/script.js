const form = document.getElementById('registration-form');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

form.addEventListener('submit', function (event) {
    event.preventDefault();
    validateForm();
});

usernameInput.addEventListener('input', function () {
    validateUsername();
});

emailInput.addEventListener('input', function () {
    validateEmail();
});

passwordInput.addEventListener('input', function () {
    validatePassword();
});

function validateForm() {
    const isValidUsername = validateUsername();
    const isValidEmail = validateEmail();
    const isValidPassword = validatePassword();

    return isValidUsername && isValidEmail && isValidPassword;
}

function validateUsername() {
    const usernameValue = usernameInput.value.trim();
    const usernameError = document.getElementById('username-error');

    if (usernameValue.length < 6) {
        usernameError.textContent = 'Username must be at least 6 characters';
        return false;
    } else {
        usernameError.textContent = '';
        return true;
    }
}

function validateEmail() {
    const emailValue = emailInput.value.trim();
    const emailError = document.getElementById('email-error');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailValue)) {
        emailError.textContent = 'Please enter a valid email address';
        return false;
    } else {
        emailError.textContent = '';
        return true;
    }
}

function validatePassword() {
    const passwordValue = passwordInput.value.trim();
    const passwordError = document.getElementById('password-error');
    const hasNumber = /\d/.test(passwordValue);
    const hasUppercase = /[A-Z]/.test(passwordValue);

    if (passwordValue.length < 8 || !hasNumber || !hasUppercase) {
        passwordError.textContent = 'Password must be at least 8 characters long and contain at least one number and one uppercase letter';
        return false;
    } else {
        passwordError.textContent = '';
        return true;
    }
}
