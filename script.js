
// ==========================================
// NAVIGATION ELEMENTS
// ==========================================

const hamburger = document.getElementById('hamburger');
const navSection = document.getElementById('nav-section');

const cartButt = document.querySelector('.cart-button');
const cartDropdown = document.querySelector('.cart-dropdown');


// ==========================================
// CART ELEMENTS
// ==========================================

const addButton = document.querySelectorAll('.add-button');

const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');

const cartItemsCount = document.getElementById('cart-items-count');
const cartItems = document.getElementById('cart-items');

const cartSubtotal = document.getElementById('cart-subtotal');
const checkoutButton = document.getElementById('checkout-button');
const clearBasketButton = document.getElementById('clear-basket');

const cartNotification = document.getElementById('cart-notification');


// ==========================================
// SAFE LOCAL STORAGE
// ==========================================

function getStoredData(key, fallback) {
    try {
        const data = JSON.parse(localStorage.getItem(key));
        return data === null ? fallback : data;
    } catch (error) {
        return fallback;
    }
}

let cartData = getStoredData('cart', []);

let cart = Array.isArray(cartData)
    ? cartData.filter(product =>
        product &&
        typeof product.name === 'string' &&
        typeof product.image === 'string' &&
        Number.isFinite(Number(product.price)) &&
        Number(product.price) >= 0 &&
        Number.isInteger(Number(product.quantity)) &&
        Number(product.quantity) > 0
    ).map(product => ({
        name: product.name,
        image: product.image,
        price: Number(product.price),
        quantity: Number(product.quantity)
    }))
    : [];


// ==========================================
// OPEN AND CLOSE NAVIGATION
// ==========================================

if (hamburger && navSection) {

    hamburger.addEventListener('click', (event) => {

        event.stopPropagation();

        if (cartDropdown) {
            cartDropdown.classList.remove('active');
        }

        navSection.classList.toggle('active');

        const isOpen = navSection.classList.contains('active');

        hamburger.setAttribute('aria-expanded', isOpen);

    });


    const navLinks = navSection.querySelectorAll('a');

    navLinks.forEach(link => {

        link.addEventListener('click', () => {

            navSection.classList.remove('active');

            hamburger.setAttribute('aria-expanded', 'false');

        });

    });

}


// ==========================================
// OPEN AND CLOSE BASKET
// ==========================================

if (cartButt && cartDropdown) {

    cartButt.addEventListener('click', (event) => {

        event.stopPropagation();

        if (navSection) {
            navSection.classList.remove('active');
        }

        if (hamburger) {
            hamburger.setAttribute('aria-expanded', 'false');
        }

        cartDropdown.classList.toggle('active');

    });


    cartDropdown.addEventListener('click', (event) => {

        event.stopPropagation();

    });

}


// ==========================================
// CLOSE MENU AND BASKET WITH ESCAPE
// ==========================================

document.addEventListener('keydown', (event) => {

    if (event.key === 'Escape') {

        if (navSection) {
            navSection.classList.remove('active');
        }

        if (hamburger) {
            hamburger.setAttribute('aria-expanded', 'false');
        }

        if (cartDropdown) {
            cartDropdown.classList.remove('active');
        }

    }

});


// ==========================================
// CLOSE MENU AND BASKET WHEN CLICKING OUTSIDE
// ==========================================

document.addEventListener('click', (event) => {

    if (
        navSection &&
        hamburger &&
        !navSection.contains(event.target) &&
        !hamburger.contains(event.target)
    ) {

        navSection.classList.remove('active');

        hamburger.setAttribute('aria-expanded', 'false');

    }


    if (
        cartDropdown &&
        cartButt &&
        !cartDropdown.contains(event.target) &&
        !cartButt.contains(event.target)
    ) {

        cartDropdown.classList.remove('active');

    }

});


// ==========================================
// CART NOTIFICATION
// ==========================================

function showCartNotification(productName) {

    if (!cartNotification) return;

    cartNotification.textContent =
        `${productName} added to your basket!`;

    cartNotification.classList.add('show');

    setTimeout(() => {

        cartNotification.classList.remove('show');

    }, 2500);

}


// ==========================================
// ADD PRODUCTS TO CART
// ==========================================

addButton.forEach((button) => {

    button.addEventListener('click', () => {

        const productName = button.dataset.name;
        const productPrice = Number(button.dataset.price);
        const productImage = button.dataset.image;

        if (
            !productName ||
            !productImage ||
            !Number.isFinite(productPrice) ||
            productPrice < 0
        ) {
            return;
        }

        const existingProduct = cart.find((item) => {

            return item.name === productName;

        });


        if (existingProduct) {

            existingProduct.quantity++;

        } else {

            cart.push({

                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1

            });

        }


        updateCart();

        showCartNotification(productName);

    });

});


// ==========================================
// UPDATE CART FUNCTION
// ==========================================

function updateCart() {

    let quantity = 0;
    let totalPrice = 0;


    if (cartItems) {

        cartItems.innerHTML = '';

        if (cart.length === 0) {

            const emptyMessage = document.createElement('p');

            emptyMessage.className = 'empty-cart';

            emptyMessage.textContent = 'Your basket is empty.';

            cartItems.appendChild(emptyMessage);

        }


        cart.forEach((product) => {

            quantity += product.quantity;

            totalPrice += product.price * product.quantity;


            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';


            const image = document.createElement('img');

            image.src = product.image;
            image.alt = product.name;


            const productInfo = document.createElement('div');

            productInfo.className = 'cart-product-info';


            const productName = document.createElement('h4');

            productName.textContent = product.name;


            const productPrice = document.createElement('p');

            productPrice.textContent =
                `$${product.price.toFixed(2)}`;


            const quantityControls = document.createElement('div');

            quantityControls.className = 'quantity-controls';


            const decreaseButton = document.createElement('button');

            decreaseButton.textContent = '−';
            decreaseButton.dataset.action = 'decrease';
            decreaseButton.dataset.name = product.name;


            const quantityDisplay = document.createElement('span');

            quantityDisplay.textContent = product.quantity;


            const increaseButton = document.createElement('button');

            increaseButton.textContent = '+';
            increaseButton.dataset.action = 'increase';
            increaseButton.dataset.name = product.name;


            quantityControls.append(
                decreaseButton,
                quantityDisplay,
                increaseButton
            );


            productInfo.append(
                productName,
                productPrice,
                quantityControls
            );


            const productRight = document.createElement('div');

            productRight.className = 'cart-product-right';


            const itemTotal = document.createElement('strong');

            itemTotal.textContent =
                `$${(product.price * product.quantity).toFixed(2)}`;


            const removeButton = document.createElement('button');

            removeButton.className = 'remove-button';
            removeButton.dataset.action = 'remove';
            removeButton.dataset.name = product.name;
            removeButton.textContent = 'Remove';


            productRight.append(itemTotal, removeButton);


            cartItem.append(
                image,
                productInfo,
                productRight
            );

            cartItems.appendChild(cartItem);

        });

    } else {

        cart.forEach(product => {

            quantity += product.quantity;

            totalPrice += product.price * product.quantity;

        });

    }


    // SAVE CART

    try {

        localStorage.setItem('cart', JSON.stringify(cart));

    } catch (error) {

        console.error('Unable to save basket.');

    }


    // UPDATE CART QUANTITY

    if (cartCount) {

        cartCount.textContent = quantity;

    }


    // UPDATE NUMBER OF ITEMS

    if (cartItemsCount) {

        cartItemsCount.textContent =
            `${quantity} ${quantity === 1 ? 'item' : 'items'}`;

    }


    // UPDATE SUBTOTAL AND TOTAL

    if (cartSubtotal) {

        cartSubtotal.textContent = totalPrice.toFixed(2);

    }

    if (cartTotal) {

        cartTotal.textContent = totalPrice.toFixed(2);

    }


    // ENABLE OR DISABLE CHECKOUT

    if (checkoutButton) {

        checkoutButton.disabled = cart.length === 0;

    }

}


// ==========================================
// HANDLE QUANTITY AND REMOVE BUTTONS
// ==========================================

if (cartItems) {

    cartItems.addEventListener('click', (event) => {

        const clickedButton = event.target.closest('button');

        if (!clickedButton) return;


        const action = clickedButton.dataset.action;

        const productName = clickedButton.dataset.name;


        const product = cart.find((item) => {

            return item.name === productName;

        });


        if (!product) return;


        if (action === 'increase') {

            product.quantity++;

        }


        if (action === 'decrease') {

            product.quantity--;

            if (product.quantity === 0) {

                cart = cart.filter((item) => {

                    return item.name !== productName;

                });

            }

        }


        if (action === 'remove') {

            cart = cart.filter((item) => {

                return item.name !== productName;

            });

        }


        updateCart();

    });

}


// ==========================================
// CLEAR ENTIRE BASKET
// ==========================================

if (clearBasketButton) {

    clearBasketButton.addEventListener('click', () => {

        cart = [];

        updateCart();

    });

}


// ==========================================
// CHECKOUT BUTTON
// ==========================================

if (checkoutButton) {

    checkoutButton.addEventListener('click', () => {

        if (cart.length === 0) return;

        alert('Checkout is temporarily unavailable. Please check back later.');

    });

}


// ==========================================
// DISPLAY INITIAL BASKET
// ==========================================

updateCart();


// ==========================================
// ZIP CODE INTERACTION
// ==========================================

const zipForm = document.getElementById('zip-form');
const zipInput = document.getElementById('zip-input');
const zipMessage = document.getElementById('zip-message');

const stateSelect = document.getElementById('state-select');
const lgaSelect = document.getElementById('lga-select');


if (zipForm && zipInput && zipMessage) {

    zipForm.addEventListener('submit', function(event) {

        event.preventDefault();

        const zipCode = zipInput.value.trim();


        if (!/^\d{6}$/.test(zipCode)) {

            zipMessage.textContent =
                'Please enter a valid 6-digit postal code.';

            zipMessage.className = 'error';

            return;

        }


        setTimeout(function() {

            window.location.href = 'shop.html#shop-categories';

        }, 1500);

    });

}


// ==========================================
// PRODUCT SEARCH
// ==========================================

const productSearch = document.getElementById('product-search');


if (productSearch) {

    productSearch.addEventListener('keydown', (event) => {

        if (event.key === 'Enter') {

            const searchValue = productSearch.value.trim();

            if (searchValue === '') return;

            window.location.href =
                `shop.html?search=${encodeURIComponent(searchValue)}`;

        }

    });

}


// ==========================================
// SEARCH AND LOCATE PRODUCT ON SHOP PAGE
// ==========================================

const productCards = document.querySelectorAll('.shop-product-card');


if (productCards.length > 0) {

    const urlParams = new URLSearchParams(window.location.search);

    const searchValue = urlParams.get('search');


    if (searchValue) {

        const matchingProduct = Array.from(productCards).find(card => {

            const productName = card.querySelector('h3');

            return productName &&
                productName.textContent.toLowerCase().includes(
                    searchValue.toLowerCase()
                );

        });


        if (matchingProduct) {

            matchingProduct.scrollIntoView({

                behavior: 'smooth',
                block: 'center'

            });

            matchingProduct.classList.add('search-highlight');

        } else {

            alert('Product not found!');

        }

    }

}


// ==========================================
// PRODUCT SORTING FEATURE
// ==========================================

const sortProducts = document.getElementById('sort-products');

const productSections = document.querySelectorAll('.product-collection');

const originalOrder = new Map();


productSections.forEach(section => {

    const products = [
        ...section.querySelectorAll('.shop-product-card')
    ];

    originalOrder.set(section, products);

});


if (sortProducts) {

    sortProducts.addEventListener('change', () => {

        const sortValue = sortProducts.value;


        productSections.forEach(section => {

            const grid = section.querySelector('.product-grid');

            if (!grid) return;


            const products = [
                ...section.querySelectorAll('.shop-product-card')
            ];


            products.sort((a, b) => {

                const nameA =
                    a.querySelector('h3')?.textContent.trim() || '';

                const nameB =
                    b.querySelector('h3')?.textContent.trim() || '';


                const priceA = Number(
                    a.querySelector('.shop-product-price')
                        ?.textContent.replace(/[^0-9.]/g, '') || 0
                );

                const priceB = Number(
                    b.querySelector('.shop-product-price')
                        ?.textContent.replace(/[^0-9.]/g, '') || 0
                );


                if (sortValue === 'low-high') {

                    return priceA - priceB;

                }


                if (sortValue === 'high-low') {

                    return priceB - priceA;

                }


                if (sortValue === 'a-z') {

                    return nameA.localeCompare(nameB);

                }


                if (sortValue === 'z-a') {

                    return nameB.localeCompare(nameA);

                }


                return originalOrder.get(section).indexOf(a) -
                    originalOrder.get(section).indexOf(b);

            });


            products.forEach(product => {

                grid.appendChild(product);

            });

        });

    });

}


// ==========================================
// PRODUCT PRICE FILTER
// ==========================================

const priceFilter = document.getElementById('price-filter');


if (priceFilter) {

    priceFilter.addEventListener('change', () => {

        const selectedPrice = priceFilter.value;

        const products = document.querySelectorAll('.shop-product-card');


        products.forEach(product => {

            const priceText =
                product.querySelector('.shop-product-price')?.textContent || '';

            const price = Number(
                priceText.replace(/[^0-9.]/g, '')
            );


            if (selectedPrice === 'all') {

                product.style.display = '';

            }

            else if (selectedPrice === '0-10') {

                product.style.display =
                    price < 10 ? '' : 'none';

            }

            else if (selectedPrice === '10-25') {

                product.style.display =
                    price >= 10 && price <= 25 ? '' : 'none';

            }

            else if (selectedPrice === '25-50') {

                product.style.display =
                    price > 25 && price <= 50 ? '' : 'none';

            }

            else if (selectedPrice === '50+') {

                product.style.display =
                    price > 50 ? '' : 'none';

            }

        });

    });

}


// ==========================================
// CLEAR PRODUCT FILTERS
// ==========================================

const clearFilters = document.getElementById('clear-filters');


if (clearFilters) {

    clearFilters.addEventListener('click', () => {

        if (sortProducts) {

            sortProducts.value = 'default';

            sortProducts.dispatchEvent(
                new Event('change')
            );

        }


        if (priceFilter) {

            priceFilter.value = 'all';

            priceFilter.dispatchEvent(
                new Event('change')
            );

        }

    });

}
