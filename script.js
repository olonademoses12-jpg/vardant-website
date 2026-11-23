
// const hamburger = document.getElementById('hamburger');
// const navSection = document.getElementById('nav-section');

// // working on the buttons for both the basket and Add

// const addButton = document.querySelectorAll('.add-button');
// const cartCount = document.getElementById('cart-count');
// const cartTotal = document.getElementById('cart-total');

// const cartButt = document.querySelector('.cart-button');
// const cartDropdown = document.querySelector('.cart-dropdown');

// const cartItemsCount = document.getElementById('cart-items-count');
// const cartItems = document.getElementById('cart-items');

// const cartSubtotal = document.getElementById('cart-subtotal');
// const checkoutButton = document.getElementById('checkout-button');
// const clearBasketButton = document.getElementById('clear-basket');

// // STARTING CART ARRAY

// let cart = JSON.parse(localStorage.getItem('cart')) || [];


// // OPEN AND CLOSE THE NAVIGATION

// hamburger.addEventListener('click', (event) => {

//     event.stopPropagation();

//     cartDropdown.classList.remove('active');

//     navSection.classList.toggle('active');

//     const isOpen = navSection.classList.contains('active');

//     hamburger.setAttribute('aria-expanded', isOpen);

// });


// // CLOSE MENU WHEN A NAVIGATION LINK IS CLICKED

// const navLinks = navSection.querySelectorAll('a');

// navLinks.forEach(link => {

//     link.addEventListener('click', () => {

//         navSection.classList.remove('active');

//         hamburger.setAttribute('aria-expanded', 'false');

//     });

// });


// // OPEN AND CLOSE BASKET

// cartButt.addEventListener('click', (event) => {

//     event.stopPropagation();

//     navSection.classList.remove('active');

//     hamburger.setAttribute('aria-expanded', 'false');

//     cartDropdown.classList.toggle('active');

// });


// // PREVENT CLICKS INSIDE THE BASKET FROM CLOSING IT

// cartDropdown.addEventListener('click', (event) => {

//     event.stopPropagation();

// });


// // CLOSE MENU AND BASKET WHEN ESCAPE IS PRESSED

// document.addEventListener('keydown', (event) => {

//     if (event.key === 'Escape') {

//         navSection.classList.remove('active');

//         hamburger.setAttribute('aria-expanded', 'false');

//         cartDropdown.classList.remove('active');

//     }

// });


// // CLOSE MENU AND BASKET WHEN CLICKING OUTSIDE

// document.addEventListener('click', (event) => {

//     // Close navigation when clicking outside

//     if (
//         !navSection.contains(event.target) &&
//         !hamburger.contains(event.target)
//     ) {

//         navSection.classList.remove('active');

//         hamburger.setAttribute('aria-expanded', 'false');

//     }


//     // Close basket when clicking outside

//     if (
//         !cartDropdown.contains(event.target) &&
//         !cartButt.contains(event.target)
//     ) {

//         cartDropdown.classList.remove('active');

//     }

// });


// // ADD PRODUCTS TO CART
// const cartNotification = document.getElementById('cart-notification');

// function showCartNotification(productName) {

//     cartNotification.textContent = `${productName} added to your basket!`;

//     cartNotification.classList.add('show');

//     setTimeout(() => {
//         cartNotification.classList.remove('show');
//     }, 2500);

// }

// addButton.forEach((button) => {

//     button.addEventListener('click', () => {

//         // Get product information

//         const productName = button.dataset.name;
//         const productPrice = Number(button.dataset.price);
//         const productImage = button.dataset.image;


//         // Check if product already exists

//         const existingProduct = cart.find((item) => {

//             return item.name === productName;

//         });


//         if (existingProduct) {

//             existingProduct.quantity++;

//         } else {

//             cart.push({

//                 name: productName,
//                 price: productPrice,
//                 image: productImage,
//                 quantity: 1

//             });

//         }


//         // Update basket display

//         updateCart();

//         // Show notification

//         showCartNotification(productName);

//     });

// });


// // UPDATE CART FUNCTION

// function updateCart() {

//     let quantity = 0;
//     let totalPrice = 0;


//     // Clear previous product display

//     cartItems.innerHTML = '';


//     // Check if basket is empty

//     if (cart.length === 0) {

//         cartItems.innerHTML = `
//             <p class="empty-cart">Your basket is empty.</p>
//         `;

//     }


//     // Display each product

//     cart.forEach((product) => {

//         quantity += product.quantity;

//         totalPrice += product.price * product.quantity;


//         cartItems.innerHTML += `

//             <div class="cart-item">

//                 <img src="${product.image}" alt="${product.name}">

//                 <div class="cart-product-info">

//                     <h4>${product.name}</h4>

//                     <p>$${product.price.toFixed(2)}</p>

//                     <div class="quantity-controls">

//                         <button data-action="decrease"
//                             data-name="${product.name}">−</button>

//                         <span>${product.quantity}</span>

//                         <button data-action="increase"
//                             data-name="${product.name}">+</button>

//                     </div>

//                 </div>

//                 <div class="cart-product-right">

//                     <strong>
//                         $${(product.price * product.quantity).toFixed(2)}
//                     </strong>

//                     <button class="remove-button"
//                         data-action="remove"
//                         data-name="${product.name}">

//                         Remove

//                     </button>

//                 </div>

//             </div>

//         `;

//     });


//     // Save basket to local storage

//     localStorage.setItem('cart', JSON.stringify(cart));


//     // Update basket quantity

//     cartCount.textContent = quantity;


//     // Update number of items

//     cartItemsCount.textContent =
//         `${quantity} ${quantity === 1 ? 'item' : 'items'}`;


//     // Update subtotal and total

//     cartSubtotal.textContent = totalPrice.toFixed(2);

//     cartTotal.textContent = totalPrice.toFixed(2);


//     // Enable or disable checkout

//     checkoutButton.disabled = cart.length === 0;

// }


// // HANDLE QUANTITY AND REMOVE BUTTONS

// cartItems.addEventListener('click', (event) => {

//     const clickedButton = event.target.closest('button');

//     if (!clickedButton) return;


//     const action = clickedButton.dataset.action;

//     const productName = clickedButton.dataset.name;


//     const product = cart.find((item) => {

//         return item.name === productName;

//     });


//     if (!product) return;


//     // Increase quantity

//     if (action === 'increase') {

//         product.quantity++;

//     }


//     // Decrease quantity

//     if (action === 'decrease') {

//         product.quantity--;

//         if (product.quantity === 0) {

//             cart = cart.filter((item) => {

//                 return item.name !== productName;

//             });

//         }

//     }


//     // Remove product completely

//     if (action === 'remove') {

//         cart = cart.filter((item) => {

//             return item.name !== productName;

//         });

//     }


//     // Refresh basket

//     updateCart();

// });


// // DISPLAY INITIAL BASKET

// updateCart();



// // CLEAR THE ENTIRE BASKET

// clearBasketButton.addEventListener('click', () => {

//     cart = [];

//     updateCart();

// });


// // CHECKOUT BUTTON

// checkoutButton.addEventListener('click', () => {

//     if (cart.length === 0) return;

//     window.location.href = 'checkout/checkout.html';

// });


// // CHECKOUT BUTTON
// checkoutButton.addEventListener('click', () => {

//     if (cart.length === 0) return;

//      window.location.href = 'checkout/checkout.html';

// });


// // DISPLAY INITIAL BASKET
// updateCart();


// //zip code interaction
// const zipForm = document.getElementById('zip-form');
// const zipInput = document.getElementById('zip-input');
// const zipMessage = document.getElementById('zip-message')
// const stateSelect = document.getElementById('state-select');
// const lgaSelect = document.getElementById('lga-select');


// if (zipForm) {
//         zipForm.addEventListener('submit', function(event) {
//         event.preventDefault();

//         const zipCode = zipInput.value.trim();

//         // Check that the postal code contains six digits
//         if (!/^\d{6}$/.test(zipCode)) {
//             zipMessage.textContent = 'Please enter a valid 6-digit postal code.';
//             zipMessage.className = 'error';
//             return;
//         }

//         // Take the customer to the shop
//         setTimeout(function() {
//             window.location.href = 'shop.html#shop-categories';
//         }, 1500);

//     });
//  }

// const productSearch = document.getElementById('product-search');

// if (productSearch) {

//     productSearch.addEventListener('keydown', (event) => {

//         if (event.key === 'Enter') {

//             const searchValue = productSearch.value.trim();

//             if (searchValue === '') 
                
//                 return;

//             window.location.href = `shop.html?search=${encodeURIComponent(searchValue)}`;

//         }

//     });

// }


// // Search and locate product on shop page

// const productCards = document.querySelectorAll('.shop-product-card');

// if (productCards.length > 0) {

//     const urlParams = new URLSearchParams(window.location.search);
//     const searchValue = urlParams.get('search');

//     if (searchValue) {

//         const matchingProduct = Array.from(productCards).find(card => {

//             const productName = card.querySelector('h3').textContent.toLowerCase();

//             return productName.includes(searchValue.toLowerCase());

//         });

//         if (matchingProduct) {

//             matchingProduct.scrollIntoView({
//                 behavior: 'smooth',
//                 block: 'center'
//             });

//             matchingProduct.classList.add('search-highlight');

//         } else {

//             alert('Product not found!');

//         }

//     }

// }

// // product sorting feature
// const sortProducts = document.getElementById('sort-products');

// const productSections = document.querySelectorAll('.product-collection');

// const originalOrder = new Map();

// productSections.forEach(section => {
//     const products = [...section.querySelectorAll('.shop-product-card')];

//     originalOrder.set(section, products);
// });

// if (sortProducts) {
//     sortProducts.addEventListener('change', () => {
//         const sortValue = sortProducts.value;

//         productSections.forEach(section => {
//             const products = [...section.querySelectorAll('.shop-product-card')];

//             products.sort((a, b) => {
//                 const nameA = a.querySelector('h3').textContent.trim();
//                 const nameB = b.querySelector('h3').textContent.trim();

//                 const priceA = Number(a.querySelector('.shop-product-price').textContent.replace(/[^0-9.]/g, ''));
//                 const priceB = Number(b.querySelector('.shop-product-price').textContent.replace(/[^0-9.]/g, ''));

//                 if (sortValue === 'low-high') {
//                     return priceA - priceB;
//                 }

//                 if (sortValue === 'high-low') {
//                     return priceB - priceA;
//                 }

//                 if (sortValue === 'a-z') {
//                     return nameA.localeCompare(nameB);
//                 }

//                 if (sortValue === 'z-a') {
//                     return nameB.localeCompare(nameA);
//                 }

//                 return originalOrder.get(section).indexOf(a) - originalOrder.get(section).indexOf(b);
//             });

//             products.forEach(product => {
//                 section.querySelector('.product-grid').appendChild(product);
//             });
//         });
//     });

// }

// const priceFilter = document.getElementById('price-filter');

// if (priceFilter) {
//     priceFilter.addEventListener('change', () => {
//         const selectedPrice = priceFilter.value;

//         const products = document.querySelectorAll('.shop-product-card');

//         products.forEach(product => {
//             const priceText = product.querySelector('.shop-product-price').textContent;

//             const price = Number(priceText.replace(/[^0-9.]/g, ''));

//             if (selectedPrice === 'all') {
//                 product.style.display = 'block';
//             } 
//             else if (selectedPrice === '0-10') {
//                 product.style.display = price < 10 ? 'block' : 'none';
//             } 
//             else if (selectedPrice === '10-25') {
//                 product.style.display = price >= 10 && price <= 25 ? 'block' : 'none';
//             } 
//             else if (selectedPrice === '25-50') {
//                 product.style.display = price > 25 && price <= 50 ? 'block' : 'none';
//             } 
//             else if (selectedPrice === '50+') {
//                 product.style.display = price > 50 ? 'block' : 'none';
//             }
//         });
//     });
// }

// const clearFilters = document.getElementById('clear-filters');

// if (clearFilters) {
//     clearFilters.addEventListener('click', () => {

//         sortProducts.value = 'default';
//         priceFilter.value = 'all';

//         sortProducts.dispatchEvent(new Event('change'));
//         priceFilter.dispatchEvent(new Event('change'));

//     });
// }


// // LOGIN AND LOGOUT SECTION

// const authSection = document.getElementById('auth-section');

// // Check if a customer is logged in
// const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

// // Update the header
// if (authSection && loggedInUser) {

//     // Remove the Login and Register links
//     authSection.innerHTML = '';

//     // Display customer's name
//     const welcomeMessage = document.createElement('span');
//        welcomeMessage.innerHTML = `
//             <svg xmlns="http://www.w3.org/2000/svg"
//                 width="19"
//                 height="19"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 stroke-width="2"
//                 stroke-linecap="round"
//                 stroke-linejoin="round">
//                 <path d="M20 21a8 8 0 0 0-16 0"></path>
//                 <circle cx="12" cy="8" r="4"></circle>
//             </svg>

//             <span>Welcome, ${loggedInUser.fullName}</span>
//         `;
//     // Create Logout button
//     const logoutButton = document.createElement('button');
//     logoutButton.textContent = 'Logout';
//     logoutButton.id = 'logout-button';

//     // Add both elements to the header
//     authSection.append(welcomeMessage, logoutButton);

//     // Handle logout
//     logoutButton.addEventListener('click', function() {

//         // Remove the logged-in user's information
//         localStorage.removeItem('loggedInUser');

//         // Return to the homepage
//         window.location.href = 'index.html';

//     });
// }



