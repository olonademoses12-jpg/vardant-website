
const loginForm = document.getElementById('login-form');

const email = document.getElementById('login-email');
const password = document.getElementById('login-password');

const loginMessage = document.getElementById('login-message');

loginForm.addEventListener('submit', function(event) {

    event.preventDefault();

    // Get the registered users
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Find the user with the entered email
    const existingUser = users.find((user) => {
        return user.email === email.value.trim().toLowerCase();
    });

    // Check if the email exists
    if (!existingUser) {
        loginMessage.textContent = 'No account found with this email.';
        loginMessage.style.color = 'red';
        return;
    }

    // Check if the password is correct
    if (existingUser.password !== password.value) {
        loginMessage.textContent = 'Incorrect password.';
        loginMessage.style.color = 'red';
        return;
    }

    // Save the logged-in user
    localStorage.setItem('loggedInUser', JSON.stringify(existingUser));

    // Show success message
    loginMessage.textContent = 'Login successful!';
    loginMessage.style.color = 'green';

    // Redirect to homepage
    window.location.href = 'index.html';

});
