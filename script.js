// Struktur data untuk keranjang belanja
let cart = [];

// DOM Elements
const cartModal = document.getElementById('cart-modal');
const closeBtn = document.querySelector('.close-btn');
const cartIcon = document.querySelector('.cart-icon');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const cartCountElement = document.getElementById('cart-count');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// --------------------
// Fungsionalitas Navigasi Mobile
// --------------------
hamburger.addEventListener('click', () => {
    // Toggle class 'active' untuk menampilkan/menyembunyikan menu
    navMenu.classList.toggle('active');
});

// --------------------
// Fungsionalitas Keranjang Belanja
// --------------------

/**
 * Memperbarui tampilan item di modal keranjang dan total harga.
 */
function updateCartDisplay() {
    cartItemsContainer.innerHTML = ''; // Kosongkan tampilan lama
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<li>Keranjang belanja Anda kosong.</li>';
    } else {
        cart.forEach(item => {
            const listItem = document.createElement('li');
            // Format harga ke Rupiah
            const priceFormatted = new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0
            }).format(item.price);
            
            listItem.innerHTML = `
                <span>${item.name} (${item.quantity}x)</span>
                <span>${priceFormatted}</span>
            `;
            cartItemsContainer.appendChild(listItem);
            total += item.price * item.quantity;
        });
    }

    // Format total harga
    const totalFormatted = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(total);

    cartTotalElement.textContent = totalFormatted;
    cartCountElement.textContent = cart.length; // Update jumlah item di ikon
}

/**
 * Menambahkan produk ke keranjang atau menambah kuantitas jika sudah ada.
 * @param {string} name - Nama produk.
 * @param {number} price - Harga produk.
 */
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        // Simpan harga dalam bentuk angka (bukan string)
        cart.push({ name, price: price, quantity: 1 });
    }
    
    alert(`${name} telah ditambahkan ke keranjang!`); // Notifikasi sederhana
    updateCartDisplay();
}

// Event listener untuk tombol 'Tambahkan ke Keranjang'
document.querySelectorAll('.btn-add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        const name = e.target.getAttribute('data-name');
        // Pastikan harga diparsing sebagai angka
        const price = parseInt(e.target.getAttribute('data-price')); 
        
        addToCart(name, price);
    });
});

// Buka Modal Keranjang
cartIcon.addEventListener('click', () => {
    updateCartDisplay(); // Pastikan tampilan keranjang terbaru
    cartModal.style.display = 'block';
});

// Tutup Modal Keranjang (tombol X)
closeBtn.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

// Tutup Modal Keranjang (klik di luar area modal)
window.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.style.display = 'none';
    }
});

// Placeholder untuk fungsionalitas Checkout
document.querySelector('.btn-checkout').addEventListener('click', () => {
    if (cart.length > 0) {
        // Implementasi nyata akan mengarahkan ke halaman checkout
        alert('Fitur checkout sedang diproses! Total belanja Anda: ' + cartTotalElement.textContent);
        // Hapus keranjang setelah checkout (simulasi)
        // cart = [];
        // updateCartDisplay();
        // cartModal.style.display = 'none';
    } else {
        alert('Keranjang Anda kosong. Silakan tambahkan produk!');
    }
});

// Inisialisasi tampilan saat halaman dimuat
document.addEventListener('DOMContentLoaded', updateCartDisplay);