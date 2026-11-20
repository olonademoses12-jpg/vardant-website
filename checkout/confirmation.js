
// Get the saved order
const order = JSON.parse(localStorage.getItem('currentOrder'));

// Check if an order exists
if (!order) {
    window.location.href = 'checkout.html';
}

// Display customer and order information
else {

    document.getElementById('order-number').textContent = order.orderNumber;

    document.getElementById('customer-name').textContent = order.customerName;

    document.getElementById('delivery-address').textContent = order.deliveryAddress;

    document.getElementById('order-total').textContent =
        '$' + order.total.toFixed(2);


    // Display purchased products
    const confirmedItems = document.getElementById('confirmed-items');

    confirmedItems.innerHTML = '<h2>Items Ordered</h2>';

    order.items.forEach((product) => {

        confirmedItems.innerHTML += `
            <div class="confirmed-item">

                <img src="../${product.image}" alt="${product.name}">

                <div class="confirmed-item-details">
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
}
