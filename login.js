
const loginForm = document.getElementById('login-form');
const email = document.getElementById('login-email');
const password = document.getElementById('login-password');
const loginMessage = document.getElementById('login-message');

// DISPLAY LOGIN MESSAGE
function showLoginMessage(message, color = 'red') {
    loginMessage.textContent = message;
    loginMessage.style.color = color;
}

// HANDLE LOGIN
loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const emailValue = email.value.trim().toLowerCase();
    const passwordValue = password.value;

    // CHECK EMPTY FIELDS
    if (emailValue === '' || passwordValue === '') {
        showLoginMessage('Please enter your email and password.');
        return;
    }

    // GET REGISTERED USERS
    let users = [];

    try {
        users = JSON.parse(localStorage.getItem('users')) || [];

        if (!Array.isArray(users)) {
            showLoginMessage('Unable to retrieve account information.');
            return;
        }
    } catch (error) {
        showLoginMessage('Unable to retrieve account information.');
        return;
    }

    // FIND USER
    const existingUser = users.find(function(user) {
        return user.email === emailValue;
    });

    if (!existingUser) {
        showLoginMessage('No account found with this email.');
        return;
    }

    // CHECK PASSWORD
    if (existingUser.password !== passwordValue) {
        showLoginMessage('Incorrect password.');
        return;
    }

    // SAVE LOGGED-IN USER
    try {
        localStorage.setItem('loggedInUser', JSON.stringify({
            fullName: existingUser.fullName,
            email: existingUser.email,
            phone: existingUser.phone
        }));
    } catch (error) {
        showLoginMessage('Unable to complete login. Please try again.');
        return;
    }

    // SUCCESS MESSAGE
    showLoginMessage('Login successful!', 'green');

    // REDIRECT TO HOMEPAGE
    setTimeout(function() {
        window.location.href = 'index.html';
    }, 1000);
});
