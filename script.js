// Sample product data - in a real app, this would come from an API
const products = [
    {
        id: 1,
        name: "Smart AI Assistant",
        description: "Voice-controlled AI assistant with advanced natural language processing",
        price: 299.99,
        category: "electronics",
        icon: "🤖"
    },
    {
        id: 2,
        name: "Neural Network Processor",
        description: "High-performance AI chip for machine learning applications",
        price: 599.99,
        category: "electronics",
        icon: "🧠"
    },
    {
        id: 3,
        name: "AI Fashion Analyzer Shirt",
        description: "Smart shirt that analyzes your style and suggests improvements",
        price: 89.99,
        category: "clothing",
        icon: "👕"
    },
    {
        id: 4,
        name: "Quantum Learning Headphones",
        description: "Adaptive headphones that learn your audio preferences",
        price: 199.99,
        category: "electronics",
        icon: "🎧"
    },
    {
        id: 5,
        name: "Smart Garden Monitor",
        description: "AI-powered plant care system with automated watering",
        price: 149.99,
        category: "home",
        icon: "🌱"
    },
    {
        id: 6,
        name: "AI Cookbook",
        description: "Interactive cookbook with AI meal planning and nutrition analysis",
        price: 39.99,
        category: "books",
        icon: "📚"
    },
    {
        id: 7,
        name: "Holographic Display Watch",
        description: "Smartwatch with AI-powered holographic interface",
        price: 799.99,
        category: "electronics",
        icon: "⌚"
    },
    {
        id: 8,
        name: "Memory Foam AI Pillow",
        description: "Smart pillow that adjusts firmness based on sleep patterns",
        price: 129.99,
        category: "home",
        icon: "🛏️"
    },
    {
        id: 9,
        name: "Style Prediction Jacket",
        description: "Jacket with AI that predicts weather and suggests layering",
        price: 249.99,
        category: "clothing",
        icon: "🧥"
    },
    {
        id: 10,
        name: "Machine Learning for Beginners",
        description: "Comprehensive guide to AI and machine learning concepts",
        price: 29.99,
        category: "books",
        icon: "📖"
    }
];

let cart = [];
let filteredProducts = products;

// DOM elements
const productsGrid = document.getElementById('productsGrid');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const filterBtns = document.querySelectorAll('.filter-btn');
const cartIcon = document.querySelector('.cart-icon');
const cartModal = document.getElementById('cartModal');
const cartCount = document.querySelector('.cart-count');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const closeModal = document.querySelector('.close');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    renderProducts(products);
    updateCartUI();
    
    // Event listeners
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.category;
            filterProducts(category);
        });
    });
    
    cartIcon.addEventListener('click', function() {
        cartModal.style.display = 'block';
        renderCart();
    });
    
    closeModal.addEventListener('click', function() {
        cartModal.style.display = 'none';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });
});

// Render products in the grid
function renderProducts(productsToRender) {
    productsGrid.innerHTML = '';
    
    productsToRender.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <span style="font-size: 4rem;">${product.icon}</span>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-price">$${product.price}</div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    <i class="fas fa-cart-plus"></i> Add to Cart
                </button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Handle search functionality
function handleSearch() {
    const query = searchInput.value.toLowerCase().trim();
    
    if (query === '') {
        filteredProducts = products;
    } else {
        filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query)
        );
    }
    
    renderProducts(filteredProducts);
    
    // Reset active filter
    filterBtns.forEach(btn => btn.classList.remove('active'));
    filterBtns[0].classList.add('active');
}

// Filter products by category
function filterProducts(category) {
    // Update active filter button
    filterBtns.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    if (category === 'all') {
        filteredProducts = products;
    } else {
        filteredProducts = products.filter(product => product.category === category);
    }
    
    renderProducts(filteredProducts);
    searchInput.value = '';
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCartUI();
    
    // Show feedback
    const btn = event.target;
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Added!';
    btn.style.background = '#27ae60';
    
    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
    }, 1000);
}

// Update cart UI
function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
}

// Render cart items
function renderCart() {
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #666;">Your cart is empty</p>';
        return;
    }
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.style.cssText = 'display: flex; justify-content: space-between; align-items: center; padding: 1rem 0; border-bottom: 1px solid #eee;';
        cartItem.innerHTML = `
            <div>
                <h4>${item.name}</h4>
                <p style="color: #666;">$${item.price} x ${item.quantity}</p>
            </div>
            <div style="display: flex; align-items: center; gap: 10px;">
                <button onclick="updateQuantity(${item.id}, -1)" style="background: #ff4757; color: white; border: none; border-radius: 3px; width: 30px; height: 30px; cursor: pointer;">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity(${item.id}, 1)" style="background: #27ae60; color: white; border: none; border-radius: 3px; width: 30px; height: 30px; cursor: pointer;">+</button>
                <button onclick="removeFromCart(${item.id})" style="background: #ff4757; color: white; border: none; border-radius: 3px; padding: 5px 10px; cursor: pointer; margin-left: 10px;">Remove</button>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
}

// Update item quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartUI();
            renderCart();
        }
    }
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
    renderCart();
}

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});