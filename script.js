// Sample products
const products = [
    { id: 1, name: "Apple", price: 1000 },
    { id: 2, name: "Banana", price: 800 },
    { id: 3, name: "Orange", price: 1200 },
    { id: 4, name: "Mango", price: 500
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const productsDiv = document.getElementById("products");
const cartDiv = document.getElementById("cart");
const totalSpan = document.getElementById("total");

// Render products
function renderProducts() {
    productsDiv.innerHTML = "";
    products.forEach(product => {
        const div = document.createElement("div");
        div.classList.add("product");
        div.innerHTML = `
            <span>${product.name} - $${product.price.toFixed(2)}</span>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productsDiv.appendChild(div);
    });
}

// Render cart
function renderCart() {
    cartDiv.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        total += product.price * item.quantity;

        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
            <span>${product.name} - $${product.price.toFixed(2)}</span>
            <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${item.id}, this.value)">
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartDiv.appendChild(div);
    });

    totalSpan.textContent = total.toFixed(2);
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Add to cart
function addToCart(id) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.quantity++;
    } else {
        cart.push({ id: id, quantity: 1 });
    }
    renderCart();
}

// Remove from cart
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    renderCart();
}

// Update quantity
function updateQuantity(id, quantity) {
    const item = cart.find(i => i.id === id);
    item.quantity = parseInt(quantity);
    renderCart();
}

// Initial render
renderProducts();
renderCart();

