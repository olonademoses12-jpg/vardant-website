
const registerForm = document.getElementById('register-form');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');
const registerMessage = document.getElementById('register-message');
const phoneNumber = document.getElementById('phone');
const fullName = document.getElementById('full-name');
const email = document.getElementById('email');

// DISPLAY ERROR OR SUCCESS MESSAGE
function showMessage(message, color = 'red') {
    registerMessage.textContent = message;
    registerMessage.style.color = color;
}

// HANDLE REGISTRATION
registerForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const nameValue = fullName.value.trim();
    const emailValue = email.value.trim().toLowerCase();
    const phoneValue = phoneNumber.value.trim();
    const passwordValue = password.value;

    // CHECK FULL NAME
    if (nameValue === '') {
        showMessage('Please enter your full name.');
        return;
    }

    // CHECK PASSWORD LENGTH
    if (passwordValue.length < 8) {
        showMessage('Password must be at least 8 characters long.');
        return;
    }

    // CHECK PASSWORD STRENGTH
    if (
        !/[A-Z]/.test(passwordValue) ||
        !/[a-z]/.test(passwordValue) ||
        !/[0-9]/.test(passwordValue) ||
        !/[^A-Za-z0-9]/.test(passwordValue)
    ) {
        showMessage(
            'Password must contain uppercase, lowercase, number and special character.'
        );
        return;
    }

    // CHECK PHONE NUMBER
    if (!/^\d{11}$/.test(phoneValue)) {
        showMessage('Please enter a valid 11-digit phone number.');
        return;
    }

    // CHECK PASSWORD CONFIRMATION
    if (passwordValue !== confirmPassword.value) {
        showMessage('Passwords do not match.');
        return;
    }

    // CHECK EMAIL FORMAT
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
        showMessage('Please enter a valid email address.');
        return;
    }

    // GET EXISTING USERS
    let users = [];

    try {
        users = JSON.parse(localStorage.getItem('users')) || [];

        if (!Array.isArray(users)) {
            showMessage('Unable to retrieve account information.');
            return;
        }
    } catch (error) {
        showMessage('Unable to retrieve account information.');
        return;
    }

    // CHECK IF EMAIL ALREADY EXISTS
    const existingUser = users.find(function(user) {
        return user.email === emailValue;
    });

    if (existingUser) {
        showMessage('An account with this email already exists.');
        return;
    }

    // CREATE NEW USER
    const newUser = {
        fullName: nameValue,
        email: emailValue,
        phone: phoneValue,
        password: passwordValue
    };

    // SAVE USER
    users.push(newUser);

    try {
        localStorage.setItem('users', JSON.stringify(users));
    } catch (error) {
        showMessage('Unable to create your account. Please try again.');
        return;
    }

    // SUCCESS MESSAGE
    showMessage('Registration successful!', 'green');

    registerForm.reset();

    // REDIRECT TO HOMEPAGE
    setTimeout(function() {
        window.location.href = 'index.html';
    }, 1500);
});
