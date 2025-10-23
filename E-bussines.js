// ===== KERANJANG =====
let cart = [];

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
document.addEventListener('DOMContentLoaded', initAddToCartButtons);

// ===== UPDATE ISI KERANJANG =====
function updateCart() {
  const cartItems = document.getElementById('cart-items');
  const totalElement = document.getElementById('cart-total');
  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

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
  const totalPrice = document.querySelector('.cart-footer p').innerText.replace('Total: ', '');

  if (method === "") {
    info.style.display = 'none';
    return;
  }

  info.style.display = 'block';
  total.textContent = totalPrice;

  switch (method) {
    case "BRI":
      number.textContent = "BRI - 1234 5678 9101 a.n. GlowSkin Store";
      break;
    case "BNI":
      number.textContent = "BNI - 9876 5432 1098 a.n. GlowSkin Store";
      break;
    case "DANA":
      number.textContent = "DANA - 0812 3456 7890 a.n. GlowSkin Store";
      break;
  }
});

// Konfirmasi checkout
document.getElementById('confirm-checkout').addEventListener('click', () => {
  const name = document.getElementById('client-name').value.trim();
  const method = document.getElementById('payment-method').value;

  if (!name || !method) {
    alert("Mohon isi nama dan pilih metode pembayaran 💬");
    return;
  }

  const total = document.querySelector('.cart-footer p').innerText.replace('Total: ', '');
  alert(`Terima kasih ${name}! 💖\nSilakan transfer ${total} melalui ${method}.`);

  // Reset keranjang setelah checkout
  cart = [];
  updateCart();
  document.getElementById('checkout-popup').style.display = 'none';
});
