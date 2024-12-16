let productData = {};
let cart = [];
let favorites = []; 


function fetchProducts() {
  fetch('order.json')
    .then(response => response.json())
    .then(data => {
      productData = data;
      filterProducts('All');
    })
    .catch(error => console.error('Error fetching product data:', error));
}


function displayProducts(products) {
  const productList = document.getElementById('product-list');
  productList.innerHTML = '';
  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product';
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>Price: $${product.price.toFixed(2)}</p>
      <button onclick="addToCart('${product.name}', ${product.price}, '${product.image}')">Add to Cart</button>
    `;
    productList.appendChild(productCard);
  });
}


function filterProducts(category) {
  const products = category === 'All' ? Object.values(productData).flat() : productData[category];
  displayProducts(products || []);
}


function addToCart(name, price, image) {
  const item = cart.find(i => i.name === name);
  if (item) item.quantity += 1;
  else cart.push({ name, price, image, quantity: 1 });
  updateCart();
}


function updateCart() {
  const cartItems = document.getElementById('cart-items');
  const cartFooter = document.querySelector('.cart-footer');
  cartItems.innerHTML = '';

  if (cart.length === 0) {
    cartItems.innerHTML = '<p>Your cart is empty.</p>';
    cartFooter.style.display = 'none';
    return;
  }

  cartFooter.style.display = 'block';
  cart.forEach(item => {
    cartItems.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <div>${item.name} - $${item.price.toFixed(2)}</div>
        <div>
          <button onclick="decrementQuantity('${item.name}')">-</button>
          ${item.quantity}
          <button onclick="incrementQuantity('${item.name}')">+</button>
        </div>
        <button onclick="removeFromCart('${item.name}')">&times;</button>
      </div>
    `;
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  document.querySelector('.total-value').textContent = `$${total.toFixed(2)}`;
}


function saveFavorites() {
  favorites = [...cart];
  alert('Cart has been saved as favorites!');
}


function applyFavorites() {
  if (favorites.length === 0) return alert('No favorites saved!');
  cart = [...favorites];
  updateCart();
  alert('Favorites applied to your cart!');
}


function incrementQuantity(name) {
  cart.find(i => i.name === name).quantity++;
  updateCart();
}
function decrementQuantity(name) {
  const item = cart.find(i => i.name === name);
  item.quantity > 1 ? item.quantity-- : cart.splice(cart.indexOf(item), 1);
  updateCart();
}
function removeFromCart(name) {
  cart = cart.filter(item => item.name !== name);
  updateCart();
}


function redirectToCheckout() {
  localStorage.setItem('order', JSON.stringify(cart));
  window.location.href = "co.html"; 
}



document.addEventListener('DOMContentLoaded', fetchProducts);