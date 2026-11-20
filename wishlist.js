
// GET SAVED WISHLIST PRODUCTS

let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];


// WISHLIST FUNCTIONALITY ON SHOP PAGE

const productCard = document.querySelectorAll('.shop-product-card');

productCard.forEach((card) => {

    const addButton = card.querySelector('.add-button');
    const imageContainer = card.querySelector('.shop-product-image');

    if (!addButton || !imageContainer) return;

    // CREATE HEART BUTTON

    let wishlistButton = imageContainer.querySelector('.wishlist-button');

    if (!wishlistButton) {

        wishlistButton = document.createElement('button');

        wishlistButton.classList.add('wishlist-button');

        imageContainer.appendChild(wishlistButton);

    }

    // GET PRODUCT INFORMATION

    const product = {
        name: addButton.dataset.name,
        price: Number(addButton.dataset.price),
        image: addButton.dataset.image
    };

    wishlistButton.dataset.name = product.name;

    wishlistButton.setAttribute(
        'aria-label',
        `Add ${product.name} to wishlist`
    );

    // CHECK IF PRODUCT IS SAVED

    const isSaved = wishlist.some((item) => {
        return item.name === product.name;
    });

    wishlistButton.textContent = isSaved ? '♥' : '♡';

    // HANDLE HEART BUTTON CLICK

    wishlistButton.addEventListener('click', () => {

        const existingProduct = wishlist.find((item) => {
            return item.name === product.name;
        });

        if (existingProduct) {

            wishlist = wishlist.filter((item) => {
                return item.name !== product.name;
            });

            wishlistButton.textContent = '♡';

        } else {

            wishlist.push(product);

            wishlistButton.textContent = '♥';

        }

        localStorage.setItem('wishlist', JSON.stringify(wishlist));

    });

});


// DISPLAY WISHLIST PRODUCTS

const wishlistContainer = document.getElementById('wishlist-products');

function displayWishlist() {

    if (!wishlistContainer) return;

    wishlistContainer.innerHTML = '';

    if (wishlist.length === 0) {

        wishlistContainer.innerHTML = `
            <div class="empty-wishlist">
                <h2>Your wishlist is empty</h2>
                <p>You haven't saved any products yet.</p>
            </div>
        `;

        return;
    }

    wishlist.forEach((product) => {

        wishlistContainer.innerHTML += `
            <div class="wishlist-product-card">

                <img src="${product.image}" alt="${product.name}">

                <div class="wishlist-product-info">

                    <h3>${product.name}</h3>

                    <p class="wishlist-product-price">
                        $${product.price.toFixed(2)}
                    </p>

                    <div class="wishlist-product-actions">

                        <button class="wishlist-add-button"
                            data-name="${product.name}"
                            data-price="${product.price}"
                            data-image="${product.image}">
                            Add to Basket
                        </button>

                        <button class="wishlist-remove-button"
                            data-name="${product.name}">
                            Remove
                        </button>

                    </div>

                </div>

            </div>
        `;

    });

}


// HANDLE WISHLIST BUTTON CLICKS

if (wishlistContainer) {

    wishlistContainer.addEventListener('click', (event) => {

        // ADD TO BASKET

        const addToBasketButton = event.target.closest('.wishlist-add-button');

        if (addToBasketButton) {

            const productName = addToBasketButton.dataset.name;
            const productPrice = Number(addToBasketButton.dataset.price);
            const productImage = addToBasketButton.dataset.image;

            let cart = JSON.parse(localStorage.getItem('cart')) || [];

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

            localStorage.setItem('cart', JSON.stringify(cart));

            alert(`${productName} added to your basket!`);

        }


        // REMOVE FROM WISHLIST

        const removeButton = event.target.closest('.wishlist-remove-button');

        if (removeButton) {

            const productName = removeButton.dataset.name;

            wishlist = wishlist.filter((item) => {
                return item.name !== productName;
            });

            localStorage.setItem('wishlist', JSON.stringify(wishlist));

            displayWishlist();

        }

    });

}


// DISPLAY SAVED PRODUCTS

displayWishlist();

// PRODUCT RATINGS

const rating = document.querySelectorAll('.shop-product-card');

rating.forEach((card) => {

    const productInfo = card.querySelector('.shop-product-info');

    if (!productInfo) return;

    const productName = productInfo.querySelector('h3');

    if (!productName) return;

    // GENERATE A RANDOM RATING
    const ratingNumber = (Math.random() * (5 - 4) + 4).toFixed(1);
    const reviewCount = Math.floor(Math.random() * 150) + 20;

    const productRating = document.createElement('div');
    productRating.classList.add('product-rating');

    productRating.innerHTML = `
    <span class="stars">${'★'.repeat(Math.floor(ratingNumber))}${'☆'.repeat(5 - Math.floor(ratingNumber))}</span>
    <span class="rating-number">${ratingNumber}</span>
    <span class="review-count">(${reviewCount} reviews)</span>
`;
    productName.insertAdjacentElement('afterend', productRating);
});