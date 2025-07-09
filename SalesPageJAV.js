// script.js
let isLoggedIn = false;
let cart = [];
let editProductIndex = null;

const sampleProducts = [
    { name: 'Classic Shirt', category: 'shirts', image: 'https://via.placeholder.com/200x150?text=Shirt+1', price: 19.99 },
    { name: 'Denim Pants', category: 'pants', image: 'https://via.placeholder.com/200x150?text=Pants+1', price: 29.99 },
    { name: 'Cool Hat', category: 'hats', image: 'https://via.placeholder.com/200x150?text=Hat+1', price: 14.99 },
    { name: 'Cargo Shorts', category: 'shorts', image: 'https://via.placeholder.com/200x150?text=Shorts+1', price: 24.99 },
    { name: 'Flannel Shirt', category: 'shirts', image: 'https://via.placeholder.com/200x150?text=Shirt+2', price: 21.99 },
    { name: 'Jogger Pants', category: 'pants', image: 'https://via.placeholder.com/200x150?text=Pants+2', price: 32.99 },
    { name: 'Beanie Hat', category: 'hats', image: 'https://via.placeholder.com/200x150?text=Hat+2', price: 12.99 },
    { name: 'Slim Shorts', category: 'shorts', image: 'https://via.placeholder.com/200x150?text=Shorts+2', price: 22.99 },
    { name: 'Graphic Tee', category: 'shirts', image: 'https://via.placeholder.com/200x150?text=Shirt+3', price: 17.99 },
    { name: 'Chino Pants', category: 'pants', image: 'https://via.placeholder.com/200x150?text=Pants+3', price: 27.99 },
    { name: 'Snapback Hat', category: 'hats', image: 'https://via.placeholder.com/200x150?text=Hat+3', price: 16.99 },
    { name: 'Board Shorts', category: 'shorts', image: 'https://via.placeholder.com/200x150?text=Shorts+3', price: 23.99 },
    { name: 'Polo Shirt', category: 'shirts', image: 'https://via.placeholder.com/200x150?text=Shirt+4', price: 20.99 },
    { name: 'Track Pants', category: 'pants', image: 'https://via.placeholder.com/200x150?text=Pants+4', price: 34.99 },
    { name: 'Sun Hat', category: 'hats', image: 'https://via.placeholder.com/200x150?text=Hat+4', price: 13.99 },
    { name: 'Swim Shorts', category: 'shorts', image: 'https://via.placeholder.com/200x150?text=Shorts+4', price: 25.99 },
    // New categories with filler items
    { name: 'Ankle Socks', category: 'socks', image: 'https://via.placeholder.com/200x150?text=Socks+1', price: 5.99 },
    { name: 'Crew Socks', category: 'socks', image: 'https://via.placeholder.com/200x150?text=Socks+2', price: 6.99 },
    { name: 'Running Shoes', category: 'shoes', image: 'https://via.placeholder.com/200x150?text=Shoes+1', price: 49.99 },
    { name: 'Dress Shoes', category: 'shoes', image: 'https://via.placeholder.com/200x150?text=Shoes+2', price: 59.99 },
    { name: 'Boxer Briefs', category: 'underwear', image: 'https://via.placeholder.com/200x150?text=Underwear+1', price: 9.99 },
    { name: 'Trunks', category: 'underwear', image: 'https://via.placeholder.com/200x150?text=Underwear+2', price: 8.99 }
];

function signIn() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username && password) {
        isLoggedIn = true;
        document.getElementById('loginPage').style.display = 'none';
        document.querySelector('header').style.display = 'block';
        document.querySelector('nav').style.display = 'flex';
        document.querySelector('.filters').style.display = 'block';
        document.querySelector('.products').style.display = 'grid';
        document.querySelector('.checkout').style.display = 'block';
        document.getElementById('addProductNavBtn').style.display = 'inline-block';
        document.getElementById('logoutBtn').style.display = 'inline-block';
        renderProducts();
    } else {
        alert('Enter valid credentials.');
    }
}

function logout() {
    isLoggedIn = false;
    document.getElementById('loginPage').style.display = 'block';
    document.querySelector('header').style.display = 'none';
    document.querySelector('nav').style.display = 'none';
    document.querySelector('.filters').style.display = 'none';
    document.querySelector('.products').style.display = 'none';
    document.querySelector('.checkout').style.display = 'none';
    document.getElementById('addProductNavBtn').style.display = 'none';
    document.getElementById('logoutBtn').style.display = 'none';
}

function filterCategory(category) {
    const products = document.querySelectorAll('.product');
    products.forEach(p => {
        if (category === 'all' || p.dataset.category === category) {
            p.style.display = 'block';
        } else {
            p.style.display = 'none';
        }
    });
}

function filterProducts() {
    const search = document.getElementById('searchBar').value.toLowerCase();
    const products = document.querySelectorAll('.product');
    products.forEach(p => {
        const title = p.querySelector('h3').innerText.toLowerCase();
        p.style.display = title.includes(search) ? 'block' : 'none';
    });
}

function addToCart(productName, button) {
    const product = button.closest('.product');
    const quantity = parseInt(product.querySelector('input[type="number"]').value);
    const color = product.querySelector('select').value;
    // Find the product in sampleProducts to get the price
    const prodObj = sampleProducts.find(p => p.name === productName);
    const price = prodObj ? prodObj.price : 19.99;

    const existingItem = cart.find(item => item.name === productName && item.color === color);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ name: productName, color, quantity, price });
    }

    alert(`${productName} (${color}) x${quantity} added to cart.`);
}

function goToCheckout() {
    document.querySelector('.products').style.display = 'none';
    document.querySelector('.checkout').style.display = 'none';
    document.getElementById('cartPage').style.display = 'block';

    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} (${item.color}) x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
        cartItems.appendChild(li);
        total += item.price * item.quantity;
    });

    document.getElementById('cartTotal').textContent = total.toFixed(2);
}

function closeCart() {
    document.getElementById('cartPage').style.display = 'none';
    document.querySelector('.products').style.display = 'grid';
    document.querySelector('.checkout').style.display = 'block';
}

function completePurchase() {
    alert('Purchase completed successfully!');
    cart = [];
    goToCheckout();
}

function showAddProductPage() {
    document.querySelector('.products').style.display = 'none';
    document.querySelector('.checkout').style.display = 'none';
    document.getElementById('addProductPage').style.display = 'block';
    document.querySelector('.filters').style.display = 'none';
}

function backToShop() {
    document.getElementById('addProductPage').style.display = 'none';
    document.querySelector('.products').style.display = 'grid';
    document.querySelector('.checkout').style.display = 'block';
    document.querySelector('.filters').style.display = 'block';
}

function addNewProduct() {
    const name = document.getElementById('newProductName').value.trim();
    const category = document.getElementById('newProductCategory').value;
    const image = document.getElementById('newProductImage').value.trim() || 'https://via.placeholder.com/200x150?text=New+Product';
    const priceInput = document.getElementById('newProductPrice').value;
    const price = priceInput ? parseFloat(priceInput) : 19.99;

    if (!name) {
        alert('Please enter a product name.');
        return;
    }

    // Add to sampleProducts and re-render
    const newProduct = { name, category, image, price };
    sampleProducts.push(newProduct);

    // Clear form
    document.getElementById('newProductName').value = '';
    document.getElementById('newProductImage').value = '';
    document.getElementById('newProductCategory').selectedIndex = 0;
    document.getElementById('newProductPrice').value = '';

    alert('Product added!');
    backToShop();
    renderProducts();
}

function deleteProduct(index) {
    if (confirm('Are you sure you want to delete this product?')) {
        sampleProducts.splice(index, 1);
        renderProducts();
    }
}

// --- Edit Product Functionality ---
function showEditProductPage(index) {
    editProductIndex = index;
    const product = sampleProducts[index];
    document.getElementById('editProductName').value = product.name;
    document.getElementById('editProductCategory').value = product.category;
    document.getElementById('editProductImage').value = product.image;
    document.getElementById('editProductPrice').value = product.price;
    const preview = document.getElementById('editProductPreview');
    preview.src = product.image;
    preview.style.display = 'block';
    document.getElementById('editProductPage').style.display = 'block';
    document.querySelector('.products').style.display = 'none';
    document.querySelector('.checkout').style.display = 'none';
    document.querySelector('.filters').style.display = 'none';
}

function saveEditProduct() {
    if (editProductIndex === null) return;
    const name = document.getElementById('editProductName').value.trim();
    const category = document.getElementById('editProductCategory').value;
    const image = document.getElementById('editProductImage').value.trim() || 'https://via.placeholder.com/200x150?text=No+Image';
    const priceInput = document.getElementById('editProductPrice').value;
    const price = priceInput ? parseFloat(priceInput) : 19.99;

    if (!name) {
        alert('Please enter a product name.');
        return;
    }

    sampleProducts[editProductIndex] = { name, category, image, price };
    editProductIndex = null;
    document.getElementById('editProductPage').style.display = 'none';
    document.querySelector('.products').style.display = 'grid';
    document.querySelector('.checkout').style.display = 'block';
    document.querySelector('.filters').style.display = 'block';
    renderProducts();
}

function cancelEditProduct() {
    editProductIndex = null;
    document.getElementById('editProductPage').style.display = 'none';
    document.querySelector('.products').style.display = 'grid';
    document.querySelector('.checkout').style.display = 'block';
    document.querySelector('.filters').style.display = 'block';
}

// Live preview for image URL in edit modal
document.addEventListener('DOMContentLoaded', function () {
    const imgInput = document.getElementById('editProductImage');
    if (imgInput) {
        imgInput.addEventListener('input', function () {
            const preview = document.getElementById('editProductPreview');
            preview.src = imgInput.value;
            preview.style.display = imgInput.value ? 'block' : 'none';
        });
    }
});

// Renders all products from sampleProducts
function renderProducts() {
    const container = document.getElementById('productList');
    container.innerHTML = '';
    sampleProducts.forEach((product, idx) => {
        const div = document.createElement('div');
        div.className = 'product';
        div.setAttribute('data-category', product.category);
        div.innerHTML = `
            <img src="${product.image}" alt="${product.name}" />
            <h3>${product.name}</h3>
            <p class="product-price">$${product.price.toFixed(2)}</p>
            <select>
                <option>Red</option>
                <option>Blue</option>
                <option>Black</option>
            </select>
            <input type="number" value="1" min="1" />
            <button onclick="addToCart('${product.name}', this)">Add to Cart</button>
            ${isLoggedIn ? `
                <button class="delete-btn" onclick="deleteProduct(${idx})" style="margin-top:0.5rem;background:#bf0a30;">Delete</button>
                <button class="edit-btn" onclick="showEditProductPage(${idx})" style="margin-top:0.5rem;background:#007bff;">Edit</button>
            ` : ''}
        `;
        container.appendChild(div);
    });
}

window.onload = () => {
    renderProducts();

    if (!isLoggedIn) {
        document.getElementById('loginPage').style.display = 'block';
        document.querySelector('header').style.display = 'none';
        document.querySelector('nav').style.display = 'none';
        document.querySelector('.filters').style.display = 'none';
        document.querySelector('.products').style.display = 'none';
        document.querySelector('.checkout').style.display = 'none';
        document.getElementById('addProductNavBtn').style.display = 'none';
        document.getElementById('logoutBtn').style.display = 'none';
    } else {
        document.getElementById('loginPage').style.display = 'none';
        document.querySelector('header').style.display = 'block';
        document.querySelector('nav').style.display = 'flex';
        document.querySelector('.filters').style.display = 'block';
        document.querySelector('.products').style.display = 'grid';
        document.querySelector('.checkout').style.display = 'block';
        document.getElementById('addProductNavBtn').style.display = 'inline-block';
        document.getElementById('logoutBtn').style.display = 'inline-block';
    }
};