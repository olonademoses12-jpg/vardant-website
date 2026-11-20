// Check if a user is logged in
const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

if (!loggedInUser) {
    window.location.href = '../login.html';
}

// Automatically fill in customer details
document.getElementById('customer-name').value = loggedInUser.fullName;

document.getElementById('customer-email').value = loggedInUser.email;

document.getElementById('customer-phone').value = loggedInUser.phone;


const cart = JSON.parse(localStorage.getItem('cart')) || [];

const checkoutItems = document.getElementById('checkout-items');
const checkoutSubtotal = document.getElementById('checkout-subtotal');
const checkoutTotal = document.getElementById('checkout-total');
const shippingFee = document.getElementById('shipping-fee');
function displayCheckoutItems() {

    checkoutItems.innerHTML = '';

    let totalPrice = 0;

    cart.forEach((product) => {


        totalPrice += product.price * product.quantity;

        checkoutItems.innerHTML += `
            <div class="checkout-item">

                <img src="../${product.image}" alt="${product.name}">

                <div>
                    <h4>${product.name}</h4>
                    <p>Quantity: ${product.quantity}</p>
                    <p>$${product.price.toFixed(2)}</p>
                </div>

                <strong>
                    $${(product.price * product.quantity).toFixed(2)}
                </strong>

            </div>
        `;

    });

    let shippingFees = totalPrice < 70 ? 10 : 0;
    let finalTotal = totalPrice + shippingFees;

    checkoutSubtotal.textContent = totalPrice.toFixed(2);
    shippingFee.textContent = shippingFees.toFixed(2);
    checkoutTotal.textContent = finalTotal.toFixed(2);
    
}

displayCheckoutItems();


// PLACE ORDER
const checkoutForm = document.getElementById('checkout-form');

checkoutForm.addEventListener('submit', function(event) {

    event.preventDefault();

    // Check if the basket is empty
    if (cart.length === 0) {
        alert('Your basket is empty. Please add products before placing an order.');
        return;
    }

    // Calculate the order total
    let subtotal = 0;

    cart.forEach((product) => {
        subtotal += product.price * product.quantity;
    });

    let deliveryFee = subtotal < 70 ? 10 : 0;
    let total = subtotal + deliveryFee;

    // Create the order
    const order = {
        orderNumber: 'VRD-' + Date.now(),
        customerName: document.getElementById('customer-name').value.trim(),
        customerEmail: document.getElementById('customer-email').value.trim(),
        customerPhone: document.getElementById('customer-phone').value.trim(),
        deliveryAddress: document.getElementById('delivery-address').value.trim(),
        items: cart,
        subtotal: subtotal,
        shippingFee: deliveryFee,
        total: total,
        orderDate: new Date().toLocaleString()
    };

    // Save the order
    localStorage.setItem('currentOrder', JSON.stringify(order));

    // Save it in order history
    let orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];

    orderHistory.push(order);

    localStorage.setItem('orderHistory', JSON.stringify(orderHistory));

    // Clear the basket
    localStorage.removeItem('cart');

    // Redirect to confirmation page
    window.location.href = 'order-confirmation.html';

});
