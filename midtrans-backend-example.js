// ===== MIDTRANS BACKEND EXAMPLE =====
// File ini adalah contoh implementasi backend untuk Midtrans
// Jalankan dengan: node midtrans-backend-example.js

const express = require('express');
const cors = require('cors');
const midtransClient = require('midtrans-client');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Midtrans Configuration
const snap = new midtransClient.Snap({
    isProduction: false, // Set true untuk production
    serverKey: 'SB-Mid-server-YourServerKey', // Ganti dengan Server Key Midtrans Anda
    clientKey: 'SB-Mid-client-YourClientKey'  // Ganti dengan Client Key Midtrans Anda
});

// Endpoint untuk mendapatkan snap token
app.post('/api/midtrans/snap-token', async (req, res) => {
    try {
        const { 
            transaction_details, 
            customer_details, 
            item_details, 
            payment_method 
        } = req.body;

        // Konfigurasi parameter Midtrans
        const parameter = {
            transaction_details,
            customer_details,
            item_details,
            callbacks: {
                finish: 'http://localhost:3000/payment-success',
                error: 'http://localhost:3000/payment-error',
                pending: 'http://localhost:3000/payment-pending'
            }
        };

        // Tambahkan enabled payments berdasarkan pilihan user
        if (payment_method) {
            switch (payment_method) {
                case 'credit_card':
                    parameter.enabled_payments = ['credit_card'];
                    break;
                case 'bca_va':
                    parameter.enabled_payments = ['bca_va'];
                    break;
                case 'bni_va':
                    parameter.enabled_payments = ['bni_va'];
                    break;
                case 'bri_va':
                    parameter.enabled_payments = ['bri_va'];
                    break;
                case 'mandiri_va':
                    parameter.enabled_payments = ['mandiri_va'];
                    break;
                case 'gopay':
                    parameter.enabled_payments = ['gopay'];
                    break;
                case 'shopeepay':
                    parameter.enabled_payments = ['shopeepay'];
                    break;
                case 'dana':
                    parameter.enabled_payments = ['dana'];
                    break;
                case 'linkaja':
                    parameter.enabled_payments = ['linkaja'];
                    break;
                case 'ovo':
                    parameter.enabled_payments = ['ovo'];
                    break;
                default:
                    parameter.enabled_payments = ['credit_card', 'bca_va', 'bni_va', 'bri_va', 'mandiri_va', 'gopay', 'shopeepay', 'dana', 'linkaja', 'ovo'];
            }
        }

        // Generate snap token
        const snapToken = await snap.createTransaction(parameter);
        
        res.json({
            snap_token: snapToken.token,
            redirect_url: snapToken.redirect_url
        });

    } catch (error) {
        console.error('Error creating snap token:', error);
        res.status(500).json({
            error: 'Failed to create snap token',
            message: error.message
        });
    }
});

// Webhook untuk notifikasi pembayaran
app.post('/api/midtrans/notification', (req, res) => {
    const notification = req.body;
    
    console.log('Payment Notification:', notification);
    
    // Verifikasi signature (implementasi sesuai dokumentasi Midtrans)
    // ... kode verifikasi signature ...
    
    // Update status pembayaran di database
    // ... kode update database ...
    
    res.status(200).send('OK');
});

// Halaman sukses
app.get('/payment-success', (req, res) => {
    res.send(`
        <html>
            <head>
                <title>Pembayaran Berhasil</title>
                <style>
                    body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                    .success { color: #4CAF50; font-size: 24px; }
                </style>
            </head>
            <body>
                <h1 class="success">✅ Pembayaran Berhasil!</h1>
                <p>Terima kasih atas pembelian Anda. Pesanan Anda sedang diproses.</p>
                <button onclick="window.close()">Tutup</button>
            </body>
        </html>
    `);
});

// Halaman error
app.get('/payment-error', (req, res) => {
    res.send(`
        <html>
            <head>
                <title>Pembayaran Gagal</title>
                <style>
                    body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                    .error { color: #f44336; font-size: 24px; }
                </style>
            </head>
            <body>
                <h1 class="error">❌ Pembayaran Gagal</h1>
                <p>Terjadi kesalahan dalam proses pembayaran. Silakan coba lagi.</p>
                <button onclick="window.close()">Tutup</button>
            </body>
        </html>
    `);
});

// Halaman pending
app.get('/payment-pending', (req, res) => {
    res.send(`
        <html>
            <head>
                <title>Pembayaran Pending</title>
                <style>
                    body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                    .pending { color: #ff9800; font-size: 24px; }
                </style>
            </head>
            <body>
                <h1 class="pending">⏳ Pembayaran Pending</h1>
                <p>Pembayaran Anda sedang diproses. Silakan selesaikan pembayaran.</p>
                <button onclick="window.close()">Tutup</button>
            </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log(`🚀 Midtrans Backend Server running on http://localhost:${PORT}`);
    console.log(`📝 Don't forget to update your Midtrans keys in the configuration!`);
});

// ===== INSTALASI DEPENDENCIES =====
/*
Jalankan perintah berikut untuk menginstall dependencies:

npm init -y
npm install express cors midtrans-client

Atau dengan yarn:
yarn add express cors midtrans-client
*/

