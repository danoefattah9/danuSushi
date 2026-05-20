// ===== MENU DATA =====
const menuData = [
    {
        id: 1,
        name: "Salmon Nigiri",
        price: 28000,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop",
        description: "Salmon premium segar dengan nasi berkualitas tinggi"
    },
    {
        id: 2,
        name: "Dragon Roll",
        price: 45000,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&h=300&fit=crop",
        description: "Roll istimewa dengan topping eel dan avocado"
    },
    {
        id: 3,
        name: "California Roll",
        price: 35000,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1564489551778-aaad1587737e?w=400&h=300&fit=crop",
        description: "Kombinasi sempurna crab, avocado, dan cucumber"
    },
    {
        id: 4,
        name: "Ebi Tempura Roll",
        price: 42000,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop",
        description: "Udang tempura renyah dengan mayo spesial"
    },
    {
        id: 5,
        name: "Tuna Roll",
        price: 32000,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&h=300&fit=crop",
        description: "Roll tuna segar dengan sentuhan wasabi"
    },
    {
        id: 6,
        name: "Sushi Bento",
        price: 65000,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1564489551778-aaad1587737e?w=400&h=300&fit=crop",
        description: "Paket lengkap 5 jenis sushi pilihan"
    },
    {
        id: 7,
        name: "Matcha Latte",
        price: 18000,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop",
        description: "Minuman tradisional Jepang yang menyegarkan"
    },
    {
        id: 8,
        name: "Sakura Tea",
        price: 15000,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&h=300&fit=crop",
        description: "Teh sakura premium dengan aroma bunga"
    },
    {
        id: 9,
        name: "Volcano Roll",
        price: 48000,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1564489551778-aaad1587737e?w=400&h=300&fit=crop",
        description: "Roll spesial dengan topping eel dan mayo pedas"
    },
    {
        id: 10,
        name: "Spicy Tuna Roll",
        price: 38000,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop",
        description: "Tuna roll dengan level kepedasan yang pas"
    },
    {
        id: 11,
        name: "Beef Bento",
        price: 72000,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&h=300&fit=crop",
        description: "Bento box dengan daging sapi premium"
    },
    {
        id: 12,
        name: "Tamago Sushi",
        price: 22000,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1564489551778-aaad1587737e?w=400&h=300&fit=crop",
        description: "Sushi telur dengan rasa manis yang lezat"
    },
    {
        id: 13,
        name: "Shrimp Roll",
        price: 40000,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop",
        description: "Roll udang segar dengan cucumber dan mayo"
    },
    {
        id: 14,
        name: "Miso Soup",
        price: 12000,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&h=300&fit=crop",
        description: "Sup tradisional Jepang yang hangat dan nikmat"
    },
    {
        id: 15,
        name: "Ocha Jepang",
        price: 14000,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1564489551778-aaad1587737e?w=400&h=300&fit=crop",
        description: "Teh hijau premium dari Jepang"
    }
];

// ===== STATE MANAGEMENT =====
let cart = [];
let favorites = new Set();
let darkMode = localStorage.getItem('darkMode') === 'true';
let currentPaymentMethod = null;

// ===== INITIALIZE APP =====
document.addEventListener('DOMContentLoaded', () => {
    initializeDarkMode();
    renderMenu(menuData);
    setupEventListeners();
    loadCartFromStorage();
    loadFavoritesFromStorage();
});

// ===== DARK MODE =====
function initializeDarkMode() {
    if (darkMode) {
        document.body.classList.add('dark-mode');
    }
}

document.getElementById('darkModeToggle').addEventListener('click', () => {
    darkMode = !darkMode;
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', darkMode);
});

// ===== RENDER MENU =====
function renderMenu(items) {
    const menuContainer = document.getElementById('menuContainer');
    menuContainer.innerHTML = '';

    if (items.length === 0) {
        menuContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">Menu tidak ditemukan</p>';
        return;
    }

    items.forEach(item => {
        const isFavorite = favorites.has(item.id);
        const card = document.createElement('div');
        card.className = 'menu-card';
        card.innerHTML = `
            <img src="${item.image}" alt="${item.name}" loading="lazy">
            <div class="menu-card-content">
                <div class="menu-card-header">
                    <div>
                        <h3>${item.name}</h3>
                        <div class="menu-card-rating">⭐ ${item.rating}</div>
                    </div>
                </div>
                <div class="menu-card-price">Rp ${item.price.toLocaleString('id-ID')}</div>
                <p>${item.description}</p>
                <div class="menu-card-actions">
                    <button class="btn-add-cart" onclick="addToCart(${item.id})">🛒 Tambah</button>
                    <button class="btn-favorite ${isFavorite ? 'active' : ''}" onclick="toggleFavorite(${item.id})">❤️</button>
                </div>
            </div>
        `;
        menuContainer.appendChild(card);
    });
}

// ===== SEARCH FUNCTIONALITY =====
document.getElementById('searchInput').addEventListener('input', (e) => {
    const keyword = e.target.value.toLowerCase();
    const filtered = menuData.filter(item =>
        item.name.toLowerCase().includes(keyword) ||
        item.description.toLowerCase().includes(keyword)
    );
    renderMenu(filtered);
});

// ===== CART FUNCTIONS =====
function addToCart(itemId) {
    const item = menuData.find(m => m.id === itemId);
    if (!item) return;

    const existingItem = cart.find(c => c.id === itemId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...item,
            quantity: 1
        });
    }

    saveCartToStorage();
    updateCart();
    showToast(`${item.name} ditambahkan ke keranjang`);
}

function removeCartItem(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    saveCartToStorage();
    updateCart();
    showToast('Item dihapus dari keranjang');
}

function updateItemQuantity(itemId, quantity) {
    const item = cart.find(c => c.id === itemId);
    if (item) {
        if (quantity <= 0) {
            removeCartItem(itemId);
        } else {
            item.quantity = quantity;
            saveCartToStorage();
            updateCart();
        }
    }
}

function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Keranjang kosong</p>';
        cartTotal.textContent = 'Rp 0';
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">Rp ${item.price.toLocaleString('id-ID')}</div>
                <div class="cart-item-quantity">
                    <button class="qty-btn" onclick="updateItemQuantity(${item.id}, ${item.quantity - 1})">−</button>
                    <span class="qty-display">${item.quantity}</span>
                    <button class="qty-btn" onclick="updateItemQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
            </div>
            <button class="cart-item-remove" onclick="removeCartItem(${item.id})">🗑️</button>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `Rp ${total.toLocaleString('id-ID')}`;
}

function saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const saved = localStorage.getItem('cart');
    if (saved) {
        cart = JSON.parse(saved);
        updateCart();
    }
}

// ===== FAVORITES FUNCTIONS =====
function toggleFavorite(itemId) {
    if (favorites.has(itemId)) {
        favorites.delete(itemId);
        showToast('Dihapus dari favorit');
    } else {
        favorites.add(itemId);
        showToast('Ditambahkan ke favorit');
    }
    saveFavoritesToStorage();
    renderMenu(menuData);
}

function saveFavoritesToStorage() {
    localStorage.setItem('favorites', JSON.stringify(Array.from(favorites)));
}

function loadFavoritesFromStorage() {
    const saved = localStorage.getItem('favorites');
    if (saved) {
        favorites = new Set(JSON.parse(saved));
    }
}

// ===== CART SIDEBAR =====
document.getElementById('cartBtn').addEventListener('click', () => {
    document.getElementById('cartSidebar').classList.add('active');
    document.getElementById('cartOverlay').classList.add('active');
});

document.getElementById('cartClose').addEventListener('click', () => {
    document.getElementById('cartSidebar').classList.remove('active');
    document.getElementById('cartOverlay').classList.remove('active');
});

document.getElementById('cartOverlay').addEventListener('click', () => {
    document.getElementById('cartSidebar').classList.remove('active');
    document.getElementById('cartOverlay').classList.remove('active');
});

// ===== CHECKOUT MODAL =====
document.getElementById('checkoutBtn').addEventListener('click', () => {
    if (cart.length === 0) {
        showToast('Keranjang masih kosong');
        return;
    }
    openCheckoutModal();
});

function openCheckoutModal() {
    document.getElementById('checkoutModal').classList.add('active');
    updateCheckoutSummary();
}

document.getElementById('modalClose').addEventListener('click', () => {
    document.getElementById('checkoutModal').classList.remove('active');
});

function updateCheckoutSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryType = document.querySelector('input[name="delivery"]:checked').value;
    const shipping = deliveryType === 'delivery' ? 15000 : 0;
    const total = subtotal + shipping;

    document.getElementById('summarySubtotal').textContent = `Rp ${subtotal.toLocaleString('id-ID')}`;
    document.getElementById('summaryShipping').textContent = `Rp ${shipping.toLocaleString('id-ID')}`;
    document.getElementById('summaryTotal').textContent = `Rp ${total.toLocaleString('id-ID')}`;
}

document.querySelectorAll('input[name="delivery"]').forEach(radio => {
    radio.addEventListener('change', updateCheckoutSummary);
});

// ===== PAYMENT SELECTION =====
document.querySelectorAll('.payment-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.payment-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        currentPaymentMethod = e.target.dataset.method;
    });
});

// ===== PAYMENT MODAL =====
document.addEventListener('click', (e) => {
    if (e.target.closest('.payment-btn')) {
        const method = e.target.dataset.method;
        openPaymentModal(method);
    }
});

function openPaymentModal(method) {
    currentPaymentMethod = method;
    const paymentDetails = document.getElementById('paymentDetails');
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryType = document.querySelector('input[name="delivery"]:checked').value;
    const shipping = deliveryType === 'delivery' ? 15000 : 0;
    const total = subtotal + shipping;

    let detailsHTML = '';

    switch(method) {
        case 'qris':
            detailsHTML = `
                <div class="qr-code">📱</div>
                <p style="margin-bottom: 1rem;">Scan QR Code dengan aplikasi pembayaran Anda</p>
                <div class="payment-info">
                    <div class="payment-info-label">Total Pembayaran</div>
                    <div class="payment-info-value">Rp ${total.toLocaleString('id-ID')}</div>
                </div>
            `;
            break;
        case 'va':
            detailsHTML = `
                <div class="payment-info">
                    <div class="payment-info-label">Nomor Rekening Virtual Account</div>
                    <div class="payment-info-value">1234567890123456</div>
                </div>
                <div class="payment-info">
                    <div class="payment-info-label">Atas Nama</div>
                    <div class="payment-info-value">PT SushiBie Indonesia</div>
                </div>
                <div class="payment-info">
                    <div class="payment-info-label">Total Pembayaran</div>
                    <div class="payment-info-value">Rp ${total.toLocaleString('id-ID')}</div>
                </div>
            `;
            break;
        case 'transfer':
            detailsHTML = `
                <div class="payment-info">
                    <div class="payment-info-label">Bank</div>
                    <div class="payment-info-value">BCA</div>
                </div>
                <div class="payment-info">
                    <div class="payment-info-label">Nomor Rekening</div>
                    <div class="payment-info-value">1234567890</div>
                </div>
                <div class="payment-info">
                    <div class="payment-info-label">Atas Nama</div>
                    <div class="payment-info-value">PT SushiBie Indonesia</div>
                </div>
                <div class="payment-info">
                    <div class="payment-info-label">Total Pembayaran</div>
                    <div class="payment-info-value">Rp ${total.toLocaleString('id-ID')}</div>
                </div>
            `;
            break;
        case 'ovo':
        case 'dana':
        case 'gopay':
        case 'shopee':
            detailsHTML = `
                <p style="margin-bottom: 1rem;">Anda akan diarahkan ke aplikasi ${method.toUpperCase()}</p>
                <div class="payment-info">
                    <div class="payment-info-label">Total Pembayaran</div>
                    <div class="payment-info-value">Rp ${total.toLocaleString('id-ID')}</div>
                </div>
            `;
            break;
    }

    paymentDetails.innerHTML = detailsHTML;
    document.getElementById('paymentModal').classList.add('active');
    document.getElementById('checkoutModal').classList.remove('active');
}

document.getElementById('paymentClose').addEventListener('click', () => {
    document.getElementById('paymentModal').classList.remove('active');
    document.getElementById('checkoutModal').classList.add('active');
});

document.getElementById('confirmPaymentBtn').addEventListener('click', () => {
    const name = document.getElementById('customerName').value.trim();
    const phone = document.getElementById('customerPhone').value.trim();
    const address = document.getElementById('customerAddress').value.trim();

    if (!name || !phone || !address) {
        showToast('Silakan isi semua data yang diperlukan');
        return;
    }

    if (!currentPaymentMethod) {
        showToast('Silakan pilih metode pembayaran');
        return;
    }

    processPayment();
});

document.getElementById('cancelPaymentBtn').addEventListener('click', () => {
    document.getElementById('paymentModal').classList.remove('active');
    document.getElementById('checkoutModal').classList.add('active');
});

function processPayment() {
    document.getElementById('paymentModal').classList.remove('active');
    document.getElementById('successModal').classList.add('active');
    
    // Reset form dan cart
    setTimeout(() => {
        cart = [];
        saveCartToStorage();
        updateCart();
        document.getElementById('customerName').value = '';
        document.getElementById('customerPhone').value = '';
        document.getElementById('customerAddress').value = '';
        document.getElementById('customerNote').value = '';
        currentPaymentMethod = null;
    }, 1000);
}

document.getElementById('successCloseBtn').addEventListener('click', () => {
    document.getElementById('successModal').classList.remove('active');
    document.getElementById('cartSidebar').classList.remove('active');
    document.getElementById('cartOverlay').classList.remove('active');
    showToast('Terima kasih! Pesanan Anda sedang diproses');
});

// ===== TOAST NOTIFICATION =====
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navbarMenu = document.getElementById('navbarMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navbarMenu.classList.toggle('active');
});

// Close menu when link is clicked
document.querySelectorAll('.navbar-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navbarMenu.classList.remove('active');
    });
});

// ===== ORDER NOW BUTTON =====
document.getElementById('orderNowBtn').addEventListener('click', () => {
    document.getElementById('menuContainer').scrollIntoView({ behavior: 'smooth' });
});

// ===== SETUP EVENT LISTENERS =====
function setupEventListeners() {
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Scroll reveal animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideIn 0.5s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.menu-card, .promo-card, .testimoni-card').forEach(el => {
        observer.observe(el);
    });
}

// ===== LOADING ANIMATION =====
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});
