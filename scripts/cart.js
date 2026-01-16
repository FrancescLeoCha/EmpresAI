const addButtons = document.querySelectorAll(".add-to-cart");
const cartCount = document.getElementById("cart-count");
const cartHeader = document.getElementById("cartHeader");

const cartOverlay = document.getElementById("cartOverlay");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartPanel = document.getElementById("cartPanel");

let cart = [];

addButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        cart.push({
            name: btn.dataset.name,
            price: parseFloat(btn.dataset.price)
        });

        updateCart();
        animateCart();
    });
});

cartHeader.addEventListener("click", () => {
    cartOverlay.classList.add("active");
});

cartOverlay.addEventListener("click", e => {
    if (!cartPanel.contains(e.target)) {
        cartOverlay.classList.remove("active");
    }
});

function updateCart() {
    cartCount.textContent = cart.length;
    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach((item, i) => {
    total += item.price;

    const li = document.createElement("li");
    li.innerHTML = `
        <span>${item.name}</span>
        <span>
            ${item.price} €
            <button class="remove-item" onclick="removeFromCart(${i})">✖</button>
        </span>
    `;
    cartItems.appendChild(li);
});


    cartTotal.textContent = `Total: ${total} €`;
}

function animateCart() {
    cartHeader.classList.remove("cart-animate");
    void cartHeader.offsetWidth;
    cartHeader.classList.add("cart-animate");
}
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}
