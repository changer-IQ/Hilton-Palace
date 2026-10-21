import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, onSnapshot, doc, updateDoc, query, orderBy } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyB7BBPUYmGuYBLpaNQWjQznYwcX2e_kg64",
    authDomain: "hilton-palace-hotel-app.firebaseapp.com",
    projectId: "hilton-palace-hotel-app",
    storageBucket: "hilton-palace-hotel-app.firebasestorage.app",
    messagingSenderId: "900577425981",
    appId: "1:900577425981:web:61c5b534d2a5e8f96f8854"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const CURRENCY = "₦";
let allOrders = [];
let currentFilter = 'all';
let unsubscribe = null;

const loginScreen = document.getElementById('login-screen');
const dashboardScreen = document.getElementById('dashboard-screen');
const loginForm = document.getElementById('login-form');
const errorMsg = document.getElementById('error-msg');
const loginBtn = document.getElementById('login-btn');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorMsg.style.display = 'none';
    loginBtn.textContent = 'Logging in...';
    loginBtn.disabled = true;

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        errorMsg.textContent = "Login failed: " + (err.message || "Check your email and password");
        errorMsg.style.display = 'block';
        loginBtn.textContent = 'Login';
        loginBtn.disabled = false;
    }
});

document.getElementById('logout-btn').addEventListener('click', async () => {
    if (unsubscribe) unsubscribe();
    await signOut(auth);
});

onAuthStateChanged(auth, (user) => {
    if (user) {
        loginScreen.style.display = 'none';
        dashboardScreen.style.display = 'block';
        document.getElementById('user-email').textContent = user.email;
        loginBtn.textContent = 'Login';
        loginBtn.disabled = false;
        loginForm.reset();
        loadOrders();
    } else {
        loginScreen.style.display = 'flex';
        dashboardScreen.style.display = 'none';
    }
});

function loadOrders() {
    const container = document.getElementById('orders-container');
    container.innerHTML = '<div class="loading">Loading orders...</div>';

    if (unsubscribe) unsubscribe();

    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));

    unsubscribe = onSnapshot(q, (snapshot) => {
        allOrders = [];
        snapshot.forEach(doc => {
            allOrders.push({ id: doc.id, ...doc.data() });
        });
        renderOrders();
        updateStats();
    }, (error) => {
        container.innerHTML = '<div class="empty-state"><h3>Error loading orders</h3><p>' + error.message + '</p></div>';
    });
}

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderOrders();
    });
});

function getFilteredOrders() {
    if (currentFilter === 'all') return allOrders;

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekStart = new Date(todayStart);
    weekStart.setDate(weekStart.getDate() - 7);
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    return allOrders.filter(order => {
        if (!order.createdAt) return false;
        const orderDate = order.createdAt.toDate ? order.createdAt.toDate() : new Date(order.createdAt);
        if (currentFilter === 'today') return orderDate >= todayStart;
        if (currentFilter === 'week') return orderDate >= weekStart;
        if (currentFilter === 'month') return orderDate >= monthStart;
        return true;
    });
}

function renderOrders() {
    const container = document.getElementById('orders-container');
    const orders = getFilteredOrders();

    if (orders.length === 0) {
        container.innerHTML = '<div class="empty-state"><h3>No orders yet</h3><p>Orders will appear here as customers place them.</p></div>';
        return;
    }

    let html = '';
    orders.forEach(order => {
        const orderDate = order.createdAt && order.createdAt.toDate ? order.createdAt.toDate() : new Date();
        const timeAgo = formatTimeAgo(orderDate);
        const status = order.status || 'new';
        const statusClass = 'status-' + status;
        const isRoom = order.orderType === 'room';

        const itemsHtml = (order.items || []).map(item =>
            `<li><span>${item.qty} × ${item.name}</span><span>${CURRENCY}${(item.subtotal || 0).toLocaleString()}</span></li>`
        ).join('');

        const phone = (order.phone || '').replace(/[^0-9]/g, '').replace(/^0/, '234');

        html += `
            <div class="order-item" data-id="${order.id}">
                <div class="order-header">
                    <div>
                        <div class="order-customer">${order.customerName || 'Unknown'}</div>
                        <span class="order-type-badge ${isRoom ? 'badge-room' : 'badge-table'}">
                            ${isRoom ? '🛏️ Room Delivery' : '🍽️ Table Pre-Order'}
                        </span>
                        <div class="order-time">${timeAgo}</div>
                    </div>
                    <div>
                        <div class="order-total">${CURRENCY}${(order.total || 0).toLocaleString()}</div>
                        <span class="order-status ${statusClass}">${status}</span>
                    </div>
                </div>
                <div class="order-meta">
                    ${isRoom ? `
                        <span>🛏️ Room ${order.roomNumber || 'N/A'}</span>
                        <span>📱 ${order.phone || 'N/A'}</span>
                        <span>👥 ${order.guests || 0} people</span>
                        <span>🕐 ${order.formattedDate || 'N/A'} at ${order.deliveryTime || ''}</span>
                    ` : `
                        <span>📱 ${order.phone || 'N/A'}</span>
                        <span>👥 ${order.guests || 0} guests</span>
                        <span>📅 ${order.formattedDate || 'N/A'} at ${order.arrivalTime || ''}</span>
                    `}
                </div>
                <div class="order-details" id="details-${order.id}">
                    <h4>Order Items</h4>
                    <ul>${itemsHtml}</ul>
                    ${order.email ? `<h4>Email</h4><p>${order.email}</p>` : ''}
                    ${order.notes ? `<h4>Special Requests</h4><p>${order.notes}</p>` : ''}
                    <div class="action-buttons">
                        <a href="https://wa.me/${phone}" target="_blank" class="btn-action btn-whatsapp">💬 WhatsApp Customer</a>
                        ${status !== 'completed' ? `<button class="btn-action btn-complete" data-action="complete" data-id="${order.id}">✅ Mark Completed</button>` : ''}
                        ${status !== 'cancelled' ? `<button class="btn-action btn-cancel" data-action="cancel" data-id="${order.id}">❌ Cancel</button>` : ''}
                    </div>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;

    container.querySelectorAll('.order-item').forEach(item => {
        item.addEventListener('click', (e) => {
            if (e.target.closest('button') || e.target.closest('a')) return;
            const details = item.querySelector('.order-details');
            details.classList.toggle('show');
        });
    });

    container.querySelectorAll('[data-action]').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.stopPropagation();
            const id = btn.dataset.id;
            const action = btn.dataset.action;
            if (action === 'complete') await markCompleted(id);
            if (action === 'cancel') await markCancelled(id);
        });
    });
}

function updateStats() {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const total = allOrders.length;
    const today = allOrders.filter(o => {
        const d = o.createdAt && o.createdAt.toDate ? o.createdAt.toDate() : null;
        return d && d >= todayStart;
    }).length;
    const revenue = allOrders.reduce((sum, o) => sum + (o.total || 0), 0);
    const paidSales = allOrders
        .filter(o => o.status === 'completed')
        .reduce((sum, o) => sum + (o.total || 0), 0);
    const guests = allOrders.reduce((sum, o) => sum + (o.guests || 0), 0);

    document.getElementById('stat-total').textContent = total;
    document.getElementById('stat-today').textContent = today;
    document.getElementById('stat-revenue').textContent = CURRENCY + revenue.toLocaleString();
    document.getElementById('stat-paid').textContent = CURRENCY + paidSales.toLocaleString();
    document.getElementById('stat-guests').textContent = guests;
}

function formatTimeAgo(date) {
    const diff = Math.floor((Date.now() - date.getTime()) / 1000);
    if (diff < 60) return 'Just now';
    if (diff < 3600) return Math.floor(diff / 60) + ' min ago';
    if (diff < 86400) return Math.floor(diff / 3600) + ' hours ago';
    if (diff < 604800) return Math.floor(diff / 86400) + ' days ago';
    return date.toLocaleDateString('en-NG', { day: 'numeric', month: 'short' });
}

async function markCompleted(orderId) {
    try {
        await updateDoc(doc(db, "orders", orderId), { status: 'completed' });
    } catch (err) {
        alert("Error updating order: " + err.message);
    }
}

async function markCancelled(orderId) {
    if (!confirm("Mark this order as cancelled?")) return;
    try {
        await updateDoc(doc(db, "orders", orderId), { status: 'cancelled' });
    } catch (err) {
        alert("Error updating order: " + err.message);
    }
}