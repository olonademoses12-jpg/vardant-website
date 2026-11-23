// const registerForm = document.getElementById('register-form');
// const password = document.getElementById('password');
// const confirmPassword = document.getElementById('confirm-password');

// const registerMessage = document.getElementById('register-message');
// const phoneNumber = document.getElementById('phone');
// const fullName = document.getElementById('full-name');
// const email = document.getElementById('email');

// registerForm.addEventListener('submit', function(event) {

//     event.preventDefault();
//     //check if full name is empty

//     if(fullName.value.trim() === ''){
//         registerMessage.textContent = 'please enter your full name'
//         registerMessage.style.color = 'red'
//         return;
//     }

//     //check if password length < 8

//     if(password.value.length < 8){
//         registerMessage.textContent = 'password must be at least 8 characters'
//         registerMessage.style.color = 'red'
//         return;
//     }
//     // Check password strength
//     if (
//         !/[A-Z]/.test(password.value) ||
//         !/[a-z]/.test(password.value) ||
//         !/[0-9]/.test(password.value) ||
//         !/[^A-Za-z0-9]/.test(password.value)
//     ) {
//         registerMessage.textContent =
//             'Password must contain an uppercase letter, a lowercase letter, a number, and a special character.';

//         registerMessage.style.color = 'red';
//         return;
//     }
//     //check if phone number is not 11 digits
//     if(!/^\d{11}$/.test(phoneNumber.value.trim())){
//         registerMessage.textContent = 'Phone number be exactly 11 digits.';
//         registerMessage.style.color = 'red' 
//         return;
//     };

//     //check if password is not equal to confirm password
//     if(password.value !== confirmPassword.value){
//         registerMessage.textContent = 'password do not match';
//         registerMessage.style.color = 'red';
//         return
//     }
//     // Check email format
// if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
//     registerMessage.textContent = 'Please enter a valid email address.';
//     registerMessage.style.color = 'red';
//     return;
// }
// // Get existing registered users

// let users = JSON.parse(localStorage.getItem('users')) || [];


// // Check if email already exists

// const existingUser = users.find((user) => {
//     return user.email === email.value.trim().toLowerCase();
// });

// if (existingUser) {
//     registerMessage.textContent = 'An account with this email already exists.';
//     registerMessage.style.color = 'red';
//     return;
// }

// // Create a new user

// const newUser = {
//     fullName: fullName.value.trim(),
//     email: email.value.trim().toLowerCase(),
//     phone: phoneNumber.value.trim(),
//     password: password.value
// };



// // Save the new user

// users.push(newUser);

// localStorage.setItem('users', JSON.stringify(users));


// // Redirect to homepage after a short delay
// setTimeout(() => {
//     window.location.href = 'index.html';
// }, 1500);

// // Clear the form

// registerForm.reset();
       
// });




