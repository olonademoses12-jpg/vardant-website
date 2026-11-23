
// ==========================================
// GET SAVED WISHLIST PRODUCTS
// ==========================================

function getWishlistData() {
    try {
        const data = JSON.parse(localStorage.getItem('wishlist')) || [];
        return Array.isArray(data) ? data : [];
    } catch (error) {
        return [];
    }
}

let wishlist = getWishlistData();


// ==========================================
// WISHLIST FUNCTIONALITY ON SHOP PAGE
// ==========================================

const productCards = document.querySelectorAll('.shop-product-card');

productCards.forEach((card) => {

    const addButton = card.querySelector('.add-button');
    const imageContainer = card.querySelector('.shop-product-image');

    if (!addButton || !imageContainer) return;

    let wishlistButton = imageContainer.querySelector('.wishlist-button');

    if (!wishlistButton) {

        wishlistButton = document.createElement('button');

        wishlistButton.classList.add('wishlist-button');

        wishlistButton.type = 'button';

        imageContainer.appendChild(wishlistButton);

    }

    const product = {
        name: addButton.dataset.name,
        price: Number(addButton.dataset.price),
        image: addButton.dataset.image
    };

    if (
        !product.name ||
        !product.image ||
        !Number.isFinite(product.price) ||
        product.price < 0
    ) {
        return;
    }

    wishlistButton.dataset.name = product.name;

    wishlistButton.setAttribute(
        'aria-label',
        `Add ${product.name} to wishlist`
    );

    const isSaved = wishlist.some(
        item => item.name === product.name
    );

    wishlistButton.textContent = isSaved ? '♥' : '♡';


    wishlistButton.addEventListener('click', () => {

        const existingProduct = wishlist.find(
            item => item.name === product.name
        );

        if (existingProduct) {

            wishlist = wishlist.filter(
                item => item.name !== product.name
            );

            wishlistButton.textContent = '♡';

        } else {

            wishlist.push(product);

            wishlistButton.textContent = '♥';

        }

        saveWishlist();

    });

});


// ==========================================
// SAVE WISHLIST
// ==========================================

function saveWishlist() {

    try {

        localStorage.setItem(
            'wishlist',
            JSON.stringify(wishlist)
        );

    } catch (error) {

        console.error('Unable to save wishlist.');

    }

}


// ==========================================
// DISPLAY WISHLIST PRODUCTS
// ==========================================

const wishlistContainer = document.getElementById('wishlist-products');


function displayWishlist() {

    if (!wishlistContainer) return;

    wishlistContainer.innerHTML = '';

    if (wishlist.length === 0) {

        const emptyMessage = document.createElement('div');

        emptyMessage.className = 'empty-wishlist';

        const heading = document.createElement('h2');

        heading.textContent = 'Your wishlist is empty';

        const message = document.createElement('p');

        message.textContent = "You haven't saved any products yet.";

        emptyMessage.append(heading, message);

        wishlistContainer.appendChild(emptyMessage);

        return;

    }


    wishlist.forEach((product) => {

        const productCard = document.createElement('div');

        productCard.className = 'wishlist-product-card';


        const image = document.createElement('img');

        image.src = product.image;

        image.alt = product.name;


        const productInfo = document.createElement('div');

        productInfo.className = 'wishlist-product-info';


        const productName = document.createElement('h3');

        productName.textContent = product.name;


        const price = document.createElement('p');

        price.className = 'wishlist-product-price';

        price.textContent = `$${product.price.toFixed(2)}`;


        const actions = document.createElement('div');

        actions.className = 'wishlist-product-actions';


        const addButton = document.createElement('button');

        addButton.className = 'wishlist-add-button';

        addButton.type = 'button';

        addButton.dataset.name = product.name;

        addButton.dataset.price = product.price;

        addButton.dataset.image = product.image;

        addButton.textContent = 'Add to Basket';


        const removeButton = document.createElement('button');

        removeButton.className = 'wishlist-remove-button';

        removeButton.type = 'button';

        removeButton.dataset.name = product.name;

        removeButton.textContent = 'Remove';


        actions.append(addButton, removeButton);

        productInfo.append(productName, price, actions);

        productCard.append(image, productInfo);

        wishlistContainer.appendChild(productCard);

    });

}


// ==========================================
// WISHLIST BUTTON ACTIONS
// ==========================================

if (wishlistContainer) {

    wishlistContainer.addEventListener('click', (event) => {

        const addToBasketButton =
            event.target.closest('.wishlist-add-button');

        const removeButton =
            event.target.closest('.wishlist-remove-button');


        // ADD PRODUCT TO BASKET

        if (addToBasketButton) {

            const productName = addToBasketButton.dataset.name;

            const productPrice = Number(
                addToBasketButton.dataset.price
            );

            const productImage = addToBasketButton.dataset.image;


            if (
                !productName ||
                !productImage ||
                !Number.isFinite(productPrice) ||
                productPrice < 0
            ) {
                return;
            }


            let cart = [];

            try {

                const savedCart =
                    JSON.parse(localStorage.getItem('cart')) || [];

                cart = Array.isArray(savedCart) ? savedCart : [];

            } catch (error) {

                cart = [];

            }


            const existingProduct = cart.find(
                item => item.name === productName
            );


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


            try {

                localStorage.setItem(
                    'cart',
                    JSON.stringify(cart)
                );

                alert(`${productName} added to your basket!`);

            } catch (error) {

                alert('Unable to add this product to your basket.');

            }

        }


        // REMOVE PRODUCT FROM WISHLIST

        if (removeButton) {

            const productName = removeButton.dataset.name;

            wishlist = wishlist.filter(
                item => item.name !== productName
            );

            saveWishlist();

            displayWishlist();

        }

    });

}


// ==========================================
// INITIAL DISPLAY
// ==========================================

displayWishlist();


// ==========================================
// PRODUCT RATINGS
// ==========================================

const ratingCards = document.querySelectorAll('.shop-product-card');

ratingCards.forEach((card) => {

    const productInfo = card.querySelector('.shop-product-info');

    if (!productInfo) return;

    const productName = productInfo.querySelector('h3');

    if (!productName) return;

    // Do not generate fake customer ratings or review counts.

});
