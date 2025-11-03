// ===== KERANJANG =====
let cart = [];
let totalCheckoutItems = 0; // Total barang yang sudah di-checkout

// ===== DATA PRODUK PER BRAND =====
const brandProducts = {
  'SKIN1004': [
    { name: 'SKIN1004 Centella Ampoule', price: 193000, image: 'IMG_4689.jpg', description: 'Pure Madagascar Centella Serum' },
    { name: 'SKIN1004 Madagascar Centella Tone Brightening Cream', price: 162000, image: 'IMG_4694.jpg', description: 'Boosting Shot Ampoule' },
    { name: 'SKIN1004 Centella Toner', price: 125000, image: 'IMG_4695.jpg', description: 'Centella Asiatica Toner' },
    { name: 'SKIN1004 Madagascar Centella Air-Fit Suncream Light', price: 152000, image: 'IMG_4707.jpg', description: 'Suncream Light SPF30 PA++++' }
  ],
  'LANEIGE': [
    { name: 'LANEIGE Water Sleeping Mask', price: 470000, image: 'IMG_4708.JPG', description: 'Water Sleeping Mask_EX' },
    { name: 'LANEIGE Water Bank Blue Hyaluronic Moisture Cream', price: 552000, image: 'IMG_4709.JPG', description: 'Barier Strengthening Cream' },
    { name: 'LANEIGE Sleeping Mask', price: 312000, image: 'IMG_4710.JPG', description: 'Water Sleeping Mask' },
    { name: 'LANEIGE Water Bank UV Barrier Sunscreen SPF 50+ PA++++', price: 410000, image: 'IMG_4711.JPG', description: 'Berrier-shield sunscreen' }
  ],
  'COSRX': [
    { name: 'COSRX Advanced Snail 92 All in One Cream', price: 246750, image: '21005-large_default.jpg', description: 'COSRX Advanced Snail 92 All in One Cream from Korea is a Moisturizer enriched with 92% of snail mucin to give skin nourishment' },
    { name: 'COSRX Aloe Soothing Sun Cream SPF 50+ PA+++', price: 156000, image: '26099-large_default.jpg', description: 'Sun Cream SPF 50+ PA+++' },
    { name: 'COSRX Full Fit Propolis Light Ampoule', price: 370000, image: '66841548107-1597395513334.avif', description: 'COSRX Full Fit Propolis Light Ampoule' },
    { name: 'COSRX AHA/BHA Clarifying Treatment Toner', price: 200000, image: '35760-large_default.jpg', description: 'AHA/BHA Clarifying Treatment Toner' }
  ],
  'Beauty of Joseon': [
    { name: 'Beauty of Joseon Ginseng Essence Water', price: 250000, image: '382a98f5-06ab-45c8-b0ec-fdf88395a7d2-.avif', description: 'Toner ini mengandung bahan utama Ginseng Water yang dapat memberikan kelembapan dan nutrisi hingga ke dalam kulit, agar kelembapan kulit terjaga sepanjang hari' },
    { name: 'Beauty of Joseon Dynasty Cream', price: 227679, image: '1551fd7f-5dd1-43ba-b013-979be756b04b-.avif', description: 'Honey Glow Brightening Serum' },
    { name: 'Beauty of Joseon Revive Eye Cream: Ginseng + Retinal', price: 231000, image: '6935f3e4-b49a-4bb1-b263-59f96cf2a387-.avif', description: 'Revive Eye Cream dapat merawat kulit di area mata dengan memadukan bahan Ginseng Extract dan Retinal. Ginseng adalah bahan herbal yang kaya akan saponin yang mampu untuk menyamarkan garis-garis halus.' },
    { name: 'Beauty of Joseon Calming Serum: Green Tea + Panthenol', price: 180000, image: '311847bc-21cd-4d93-95a1-3b2c5f4324bf-image-0-1719802733370.avif', description: 'Calming Serum : Green Tea + Panthenol diformulasikan untuk Membantu menyejukkan kulit yang teriritasi ringan akibat paparan sinar UV atau faktor eksternal lainnya' }
  ],
  'ROUND LAB': [
    { name: 'ROUND LAB Sunscreen', price: 135000, image: 'IMG_4144.jpg', description: 'Birch Juice Moisturizing Tone-Up Sunscreen' },
    { name: 'ROUND LAB Toner', price: 125000, image: 'IMG_4144.jpg', description: 'Birch Juice Moisturizing Toner' },
    { name: 'ROUND LAB Serum', price: 145000, image: 'IMG_4144.jpg', description: 'Dokdo Serum with Niacinamide' },
    { name: 'ROUND LAB Cleanser', price: 115000, image: 'IMG_4144.jpg', description: '1025 Dokdo Cleanser' }
  ],
  'EMBRYOLISSE': [
    { name: 'EMBRYOLISSE Sun Stick', price: 155000, image: 'IMG_4158.jpg', description: 'Sun Stick SPF50+' },
    { name: 'EMBRYOLISSE Lait-Crème', price: 165000, image: 'IMG_4158.jpg', description: 'Lait-Crème Concentré Moisturizer' },
    { name: 'EMBRYOLISSE Eye Cream', price: 175000, image: 'IMG_4158.jpg', description: 'Eye Contour Cream' },
    { name: 'EMBRYOLISSE Serum', price: 185000, image: 'IMG_4158.jpg', description: 'Brightening Serum' }
  ],
  'Rice Toner': [
    { name: 'Rice Toner Pad', price: 125000, image: 'IMG_4157.jpg', description: 'Wake up with deeply hydrated, dewy skin' },
    { name: 'Rice Toner Essence', price: 130000, image: 'IMG_4157.jpg', description: 'Rice & Ceramide Moisturizing Toner' },
    { name: 'Rice Cleanser', price: 110000, image: 'IMG_4157.jpg', description: 'Deep Cleansing Rice Foam Cleanser' }
  ]
};

// Load total checkout dari localStorage saat halaman dimuat
function loadCheckoutCounter() {
  const saved = localStorage.getItem('totalCheckoutItems');
  if (saved) {
    totalCheckoutItems = parseInt(saved, 10);
    updateCheckoutCounter();
  }
}

// Update counter di tombol Shop Now
function updateCheckoutCounter() {
  const counter = document.getElementById('checkout-counter');
  if (counter) {
    if (totalCheckoutItems > 0) {
      counter.textContent = totalCheckoutItems;
      counter.style.display = 'flex';
      counter.classList.add('new-item');
      setTimeout(() => {
        counter.classList.remove('new-item');
      }, 500);
    } else {
      counter.textContent = '';
      counter.style.display = 'none';
    }
    // Simpan ke localStorage
    localStorage.setItem('totalCheckoutItems', totalCheckoutItems.toString());
  }
}

// Load counter saat halaman dimuat
loadCheckoutCounter();

// ===== MIDTRANS CONFIGURATION =====
// Ganti dengan Server Key dan Client Key Midtrans Anda
const MIDTRANS_CONFIG = {
  clientKey: 'SB-Mid-client-YourClientKey', // Ganti dengan Client Key Midtrans Anda
  serverKey: 'SB-Mid-server-YourServerKey', // Ganti dengan Server Key Midtrans Anda
  isProduction: false // Set true untuk production
};

// ===== MIDTRANS PAYMENT METHODS =====
const MIDTRANS_PAYMENT_METHODS = [
  'credit_card', 'bca_va', 'bni_va', 'bri_va', 'mandiri_va',
  'gopay', 'shopeepay', 'dana', 'linkaja', 'ovo'
];

// ===== MIDTRANS PAYMENT FUNCTIONS =====
function generateOrderId() {
  return 'ORDER-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
}

function calculateTotal() {
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function createMidtransTransaction() {
  const orderId = generateOrderId();
  const total = calculateTotal();
  const customerName = document.getElementById('client-name').value;
  const customerEmail = document.getElementById('client-email').value;
  const customerPhone = document.getElementById('client-phone').value;
  
  const transactionDetails = {
    order_id: orderId,
    gross_amount: total
  };

  const customerDetails = {
    first_name: customerName,
    email: customerEmail,
    phone: customerPhone
  };

  const itemDetails = cart.map((item, index) => ({
    id: `item-${index + 1}`,
    price: item.price,
    quantity: item.quantity,
    name: item.name,
    category: 'Skincare'
  }));

  return {
    transaction_details: transactionDetails,
    customer_details: customerDetails,
    item_details: itemDetails
  };
}

async function processMidtransPayment() {
  try {
    const transactionData = createMidtransTransaction();
    const paymentMethod = document.getElementById('payment-method').value;
    
    // Simulasi API call ke backend untuk mendapatkan snap token
    // Dalam implementasi nyata, Anda perlu membuat endpoint backend
    const response = await fetch('/api/midtrans/snap-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...transactionData,
        payment_method: paymentMethod
      })
    });

    if (!response.ok) {
      throw new Error('Failed to get snap token');
    }

    const { snap_token } = await response.json();
    
    // Buka Midtrans popup
    window.snap.pay(snap_token, {
      onSuccess: function(result) {
        console.log('Payment Success:', result);
        // Simpan cart sebelum reset untuk ditampilkan di summary
        const checkoutCart = [...cart];
        resetCart();
        // Tampilkan popup summary
        showCheckoutSummary(checkoutCart);
      },
      onPending: function(result) {
        console.log('Payment Pending:', result);
        alert('Pembayaran sedang diproses. Silakan selesaikan pembayaran Anda. ⏳');
      },
      onError: function(result) {
        console.log('Payment Error:', result);
        alert('Terjadi kesalahan dalam pembayaran. Silakan coba lagi. ❌');
      },
      onClose: function() {
        console.log('Payment popup closed');
      }
    });
    
  } catch (error) {
    console.error('Payment Error:', error);
    // Fallback untuk demo - langsung tampilkan pesan sukses
    // Simpan cart sebelum reset untuk ditampilkan di summary
    const checkoutCart = [...cart];
    resetCart();
    // Tampilkan popup summary
    showCheckoutSummary(checkoutCart);
  }
}

function showCheckoutSummary(checkoutCart) {
  const summaryPopup = document.getElementById('checkout-summary-popup');
  const summaryCount = document.getElementById('summary-count');
  const summaryItemsList = document.getElementById('summary-items-list');
  const summaryTotal = document.getElementById('summary-total');

  // Hitung total jumlah barang
  const totalItems = checkoutCart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = checkoutCart.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Update total checkout counter
  totalCheckoutItems += totalItems;
  updateCheckoutCounter();

  // Update count
  summaryCount.textContent = `${totalItems} ${totalItems === 1 ? 'barang' : 'barang'}`;

  // Update items list
  summaryItemsList.innerHTML = '';
  checkoutCart.forEach((item) => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('summary-item');
    itemDiv.innerHTML = `
      <span class="summary-item-name">${item.name}</span>
      <div class="summary-item-details">
        <div>${item.quantity}x Rp ${item.price.toLocaleString()}</div>
        <div><strong>Rp ${(item.price * item.quantity).toLocaleString()}</strong></div>
      </div>
    `;
    summaryItemsList.appendChild(itemDiv);
  });

  // Update total
  summaryTotal.textContent = `Rp ${totalPrice.toLocaleString()}`;

  // Tampilkan popup
  summaryPopup.classList.add('active');
}

function closeCheckoutSummary() {
  const summaryPopup = document.getElementById('checkout-summary-popup');
  summaryPopup.classList.remove('active');
}

function resetCart() {
  cart = [];
  updateCart();
  document.getElementById('checkout-popup').style.display = 'none';
  document.getElementById('client-name').value = '';
  document.getElementById('client-email').value = '';
  document.getElementById('client-phone').value = '';
  document.getElementById('payment-method').value = '';
  document.getElementById('payment-info').style.display = 'none';
  document.getElementById('midtrans-payment-btn').style.display = 'none';
}

// Fungsi untuk menambah produk ke keranjang
function addToCart(name, price) {
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  updateCart();
}

// Tambahkan event listener ke semua tombol Tambahkan ke Keranjang
function initAddToCartButtons() {
  const buttons = document.querySelectorAll('.add-to-cart');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const name = button.dataset.name;
      const price = parseInt(button.dataset.price);
      addToCart(name, price);
    });
  });
}

// Jalankan fungsi setelah halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
  initAddToCartButtons();
  updateCart(); // Initialize cart counter badge on page load
});

// ===== UPDATE ISI KERANJANG =====
function updateCart() {
  const cartItems = document.getElementById('cart-items');
  const totalElement = document.getElementById('cart-total');
  const cartCountBadge = document.getElementById('cart-item-count');
  
  cartItems.innerHTML = '';
  let total = 0;
  let totalCartItems = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;
    totalCartItems += item.quantity; // Hitung total jumlah item

    const div = document.createElement('div');
    div.classList.add('cart-item');
    div.innerHTML = `
      <span>${item.name}</span>
      <div class="quantity-controls">
        <button class="qty-btn" onclick="changeQuantity(${index}, -1)">-</button>
        <span>${item.quantity}</span>
        <button class="qty-btn" onclick="changeQuantity(${index}, 1)">+</button>
      </div>
      <span>Rp ${(item.price * item.quantity).toLocaleString()}</span>
    `;

    cartItems.appendChild(div);
  });

  totalElement.textContent = total.toLocaleString();

  // Update badge cart counter
  if (cartCountBadge) {
    if (totalCartItems > 0) {
      cartCountBadge.textContent = totalCartItems;
      cartCountBadge.style.display = 'flex';
      cartCountBadge.classList.add('new-item-added');
      setTimeout(() => {
        cartCountBadge.classList.remove('new-item-added');
      }, 500);
    } else {
      cartCountBadge.textContent = '';
      cartCountBadge.style.display = 'none';
    }
  }
}

// ===== TAMBAH / KURANG JUMLAH =====
function changeQuantity(index, delta) {
  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) cart.splice(index, 1);
  updateCart();
}

// ===== PANEL KERANJANG =====
const cartPanel = document.getElementById('cart-panel');
const openCartBtn = document.getElementById('open-cart');
const closeCartBtn = document.getElementById('close-cart');

if (openCartBtn && closeCartBtn) {
  openCartBtn.addEventListener('click', () => cartPanel.classList.add('active'));
  closeCartBtn.addEventListener('click', () => cartPanel.classList.remove('active'));
}

// ===== CHECKOUT =====
// Checkout
document.getElementById('checkout-btn').addEventListener('click', () => {
  if (cart.length === 0) {
    alert("Keranjang masih kosong 💕");
  } else {
    document.getElementById('checkout-popup').style.display = 'flex';
    document.getElementById('payment-info').style.display = 'none';
  }
});

document.getElementById('cancel-checkout').addEventListener('click', () => {
  document.getElementById('checkout-popup').style.display = 'none';
});

// Ketika memilih metode pembayaran
document.getElementById('payment-method').addEventListener('change', function() {
  const method = this.value;
  const info = document.getElementById('payment-info');
  const number = document.getElementById('payment-number');
  const total = document.getElementById('payment-total');
  const midtransPayment = document.getElementById('midtrans-payment');
  const midtransBtn = document.getElementById('midtrans-payment-btn');
  const instructions = document.getElementById('payment-instructions');
  const totalPrice = document.querySelector('.cart-footer p').innerText.replace('Total: ', '');

  if (method === "") {
    info.style.display = 'none';
    midtransBtn.style.display = 'none';
    return;
  }

  info.style.display = 'block';
  total.textContent = totalPrice;

  // Reset Midtrans elements
  midtransPayment.style.display = 'none';
  midtransBtn.style.display = 'none';

  if (MIDTRANS_PAYMENT_METHODS.includes(method)) {
    // Tampilkan tombol Midtrans
    midtransBtn.style.display = 'block';
    midtransPayment.style.display = 'block';
    
    switch (method) {
      case "credit_card":
        number.textContent = "💳 Credit Card - Bayar dengan kartu kredit/debit";
        instructions.textContent = "Klik tombol 'Bayar Sekarang' untuk membuka halaman pembayaran Midtrans";
        break;
      case "bca_va":
        number.textContent = "🏦 BCA Virtual Account";
        instructions.textContent = "Klik tombol 'Bayar Sekarang' untuk mendapatkan nomor Virtual Account BCA";
        break;
      case "bni_va":
        number.textContent = "🏦 BNI Virtual Account";
        instructions.textContent = "Klik tombol 'Bayar Sekarang' untuk mendapatkan nomor Virtual Account BNI";
        break;
      case "bri_va":
        number.textContent = "🏦 BRI Virtual Account";
        instructions.textContent = "Klik tombol 'Bayar Sekarang' untuk mendapatkan nomor Virtual Account BRI";
        break;
      case "mandiri_va":
        number.textContent = "🏦 Mandiri Virtual Account";
        instructions.textContent = "Klik tombol 'Bayar Sekarang' untuk mendapatkan nomor Virtual Account Mandiri";
        break;
      case "gopay":
        number.textContent = "📱 GoPay";
        instructions.textContent = "Klik tombol 'Bayar Sekarang' untuk membuka aplikasi GoPay";
        break;
      case "shopeepay":
        number.textContent = "🛍️ ShopeePay";
        instructions.textContent = "Klik tombol 'Bayar Sekarang' untuk membuka aplikasi ShopeePay";
        break;
      case "dana":
        number.textContent = "💙 DANA";
        instructions.textContent = "Klik tombol 'Bayar Sekarang' untuk membuka aplikasi DANA";
        break;
      case "linkaja":
        number.textContent = "🔗 LinkAja";
        instructions.textContent = "Klik tombol 'Bayar Sekarang' untuk membuka aplikasi LinkAja";
        break;
      case "ovo":
        number.textContent = "🟠 OVO";
        instructions.textContent = "Klik tombol 'Bayar Sekarang' untuk membuka aplikasi OVO";
        break;
    }
  } else {
    // Metode pembayaran manual
    switch (method) {
      case "BRI":
        number.textContent = "BRI - 1234 5678 9101 a.n. GlowSkin Store";
        break;
      case "BNI":
        number.textContent = "BNI - 9876 5432 1098 a.n. GlowSkin Store";
        break;
    }
  }
});

// Event listener untuk tombol Midtrans
document.getElementById('pay-button').addEventListener('click', () => {
  const name = document.getElementById('client-name').value.trim();
  const email = document.getElementById('client-email').value.trim();
  const phone = document.getElementById('client-phone').value.trim();
  const method = document.getElementById('payment-method').value;

  if (!name || !email || !phone || !method) {
    alert("Mohon lengkapi semua data (nama, email, telepon, dan metode pembayaran) 💬");
    return;
  }

  // Validasi email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Mohon masukkan email yang valid 📧");
    return;
  }

  // Validasi nomor telepon
  const phoneRegex = /^[0-9]{10,13}$/;
  if (!phoneRegex.test(phone.replace(/\D/g, ''))) {
    alert("Mohon masukkan nomor telepon yang valid (10-13 digit) 📱");
    return;
  }

  processMidtransPayment();
});

// Konfirmasi checkout untuk metode manual
document.getElementById('confirm-checkout').addEventListener('click', () => {
  const name = document.getElementById('client-name').value.trim();
  const method = document.getElementById('payment-method').value;

  if (!name || !method) {
    alert("Mohon isi nama dan pilih metode pembayaran 💬");
    return;
  }

  // Jika metode Midtrans dipilih, jangan proses di sini
  if (MIDTRANS_PAYMENT_METHODS.includes(method)) {
    alert("Untuk metode pembayaran ini, gunakan tombol 'Bayar Sekarang' 💳");
    return;
  }

  const total = document.querySelector('.cart-footer p').innerText.replace('Total: ', '');
  
  // Simpan cart sebelum reset untuk ditampilkan di summary
  const checkoutCart = [...cart];
  
  // Reset keranjang setelah checkout
  resetCart();
  
  // Tampilkan popup summary
  showCheckoutSummary(checkoutCart);
});

// ===== FUNGSI UNTUK MENAMPILKAN PRODUK BRAND =====
function showBrandProducts(brandName) {
  const brandProductsSection = document.getElementById('brand-products');
  const brandProductsTitle = document.getElementById('brand-products-title');
  const brandProductsGrid = document.getElementById('brand-products-grid');
  
  if (!brandProductsSection || !brandProductsTitle || !brandProductsGrid) return;
  
  // Cek apakah brand ada dalam data
  if (!brandProducts[brandName] || brandProducts[brandName].length === 0) {
    alert(`Maaf, belum ada produk untuk brand ${brandName} saat ini.`);
    return;
  }
  
  // Update title
  brandProductsTitle.textContent = `🌸 Produk ${brandName}`;
  
  // Clear grid
  brandProductsGrid.innerHTML = '';
  
  // Tampilkan produk brand
  brandProducts[brandName].forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <div class="product-price">Rp ${product.price.toLocaleString('id-ID')}</div>
      <button class="btn-brand add-to-cart" data-name="${product.name}" data-price="${product.price}">Tambahkan ke Keranjang</button>
    `;
    brandProductsGrid.appendChild(productCard);
  });
  
  // Tampilkan section
  brandProductsSection.style.display = 'block';
  
  // Scroll ke section
  brandProductsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  
  // Re-initialize add to cart buttons untuk produk yang baru ditambahkan
  initAddToCartButtons();
}

function closeBrandProducts() {
  const brandProductsSection = document.getElementById('brand-products');
  if (brandProductsSection) {
    brandProductsSection.style.display = 'none';
  }
}

// Event listener untuk tombol close summary (setelah DOM ready)
document.addEventListener('DOMContentLoaded', () => {
  const closeSummaryBtn = document.getElementById('close-summary');
  const closeSummaryFooterBtn = document.getElementById('close-summary-btn');
  const summaryPopup = document.getElementById('checkout-summary-popup');
  
  if (closeSummaryBtn) {
    closeSummaryBtn.addEventListener('click', closeCheckoutSummary);
  }
  
  if (closeSummaryFooterBtn) {
    closeSummaryFooterBtn.addEventListener('click', closeCheckoutSummary);
  }
  
  // Close summary ketika klik di luar popup
  if (summaryPopup) {
    summaryPopup.addEventListener('click', function(e) {
      if (e.target === this) {
        closeCheckoutSummary();
      }
    });
  }
  
  // Event listener untuk brand card click
  const brandCards = document.querySelectorAll('.clickable-brand');
  brandCards.forEach(card => {
    card.addEventListener('click', function(e) {
      // Hanya trigger jika klik bukan pada tombol
      if (!e.target.closest('.btn-brand')) {
        const brandName = this.getAttribute('data-brand');
        if (brandName) {
          showBrandProducts(brandName);
        }
      }
    });
  });
  
  // Event listener untuk tombol close brand products
  const closeBrandBtn = document.getElementById('close-brand-products');
  if (closeBrandBtn) {
    closeBrandBtn.addEventListener('click', closeBrandProducts);
  }
});
