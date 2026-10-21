import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { rawMenu } from "./menu.js";

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

const WHATSAPP_NUMBER = "2348100158158";
const CURRENCY = "₦";

const menuData = rawMenu.map(cat => ({
    category: cat[0],
    items: cat[1].map(item => ({ id: item[0], name: item[1], desc: item[2], price: item[3] }))
}));

let cart = {};
let currentTab = 'preorder';

const menuContainer = document.getElementById('menu-container');
const orderSummaryDiv = document.getElementById('order-summary');
const grandTotalSpan = document.getElementById('grand-total');
const bookingForm = document.getElementById('booking-form');

// ==========================================
// TAB SWITCHING
// ==========================================
window.switchTab = function(tab) {
    currentTab = tab;
    
    document.getElementById('tab-preorder').classList.toggle('active', tab === 'preorder');
    document.getElementById('tab-room').classList.toggle('active', tab === 'room');
    
    document.getElementById('preorder-fields').style.display = tab === 'preorder' ? 'block' : 'none';
    document.getElementById('room-fields').style.display = tab === 'room' ? 'block' : 'none';
    
    const requiredPreorder = ['guests', 'arrival-date', 'arrival-time'];
    const requiredRoom = ['room-number', 'delivery-date', 'delivery-time'];
    
    requiredPreorder.forEach(id => {
        document.getElementById(id).required = (tab === 'preorder');
    });
    requiredRoom.forEach(id => {
        document.getElementById(id).required = (tab === 'room');
    });
    
    document.getElementById('booking-title').textContent = 
        tab === 'preorder' ? 'Your Order & Reservation' : 'Your Order & Room Delivery';
    
    document.getElementById('submit-btn').textContent = 
        tab === 'preorder' ? 'Send Order via WhatsApp' : 'Send Room Delivery Order';
};

// ==========================================
// RENDER MENU WITH CATEGORY NAV
// ==========================================
function renderMenu() {
    let navHtml = '';
    let html = '';

    menuData.forEach((category, index) => {
        const anchorId = 'cat-' + index;
        navHtml += `<button class="nav-btn" onclick="scrollToCategory('${anchorId}')">${category.category}</button>`;
        html += `<h2 class="category-title" id="${anchorId}">${category.category}</h2>`;
        category.items.forEach(item => {
            html += `
                <div class="menu-item">
                    <div class="item-info">
                        <div class="item-name">${item.name}</div>
                        <div class="item-desc">${item.desc}</div>
                    </div>
                    <div class="item-price">${CURRENCY}${item.price.toLocaleString()}</div>
                    <div class="item-controls">
                        <button class="qty-btn" onclick="updateQty('${item.id}', -1)">−</button>
                        <span class="qty-display" id="qty-${item.id}">0</span>
                        <button class="qty-btn" onclick="updateQty('${item.id}', 1)">+</button>
                    </div>
                </div>
            `;
        });
    });

    document.getElementById('category-nav').innerHTML = navHtml;
    menuContainer.innerHTML = html;
}

window.scrollToCategory = function(id) {
    const el = document.getElementById(id);
    if (el) {
        const y = el.getBoundingClientRect().top + window.pageYOffset - 10;
        window.scrollTo({ top: y, behavior: 'smooth' });
    }
};

window.updateQty = function(id, change) {
    const item = findItemById(id);
    if (!item) return;
    if (!cart[id]) cart[id] = { name: item.name, price: item.price, qty: 0 };
    cart[id].qty += change;
    if (cart[id].qty <= 0) delete cart[id];
    document.getElementById(`qty-${id}`).textContent = cart[id] ? cart[id].qty : 0;
    updateSummary();
};

function findItemById(id) {
    for (let cat of menuData) for (let item of cat.items) if (item.id === id) return item;
    return null;
}

function updateSummary() {
    let total = 0, summaryHtml = '';
    const cartKeys = Object.keys(cart);
    if (cartKeys.length === 0) {
        summaryHtml = `<p class="empty-cart">Your cart is empty. Add plates from the menu above.</p>`;
    } else {
        cartKeys.forEach(id => {
            const item = cart[id];
            const itemTotal = item.price * item.qty;
            total += itemTotal;
            summaryHtml += `<div class="summary-item"><span>${item.qty} x ${item.name}</span><span>${CURRENCY}${itemTotal.toLocaleString()}</span></div>`;
        });
    }
    orderSummaryDiv.innerHTML = summaryHtml;
    grandTotalSpan.textContent = `${CURRENCY}${total.toLocaleString()}`;
}

// ==========================================
// FORM SUBMISSION
// ==========================================
bookingForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const cartKeys = Object.keys(cart);
    if (cartKeys.length === 0) { alert("Please add at least one dish."); return; }

    const name = document.getElementById('customer-name').value;
    const phone = document.getElementById('customer-phone').value;
    const email = document.getElementById('customer-email').value.trim();
    const notes = document.getElementById('notes').value;

    let total = 0, orderLines = [], itemsArray = [];
    cartKeys.forEach(id => {
        const item = cart[id];
        const itemTotal = item.price * item.qty;
        total += itemTotal;
        orderLines.push(item.qty + " x " + item.name + " = N" + itemTotal.toLocaleString());
        itemsArray.push({ name: item.name, qty: item.qty, price: item.price, subtotal: itemTotal });
    });

    let orderData = {
        orderType: currentTab,
        customerName: name,
        phone: phone,
        email: email || null,
        items: itemsArray,
        total: total,
        notes: notes || null,
        status: "new",
        createdAt: serverTimestamp()
    };

    let messageHeader = '';
    let messageDetails = [];

    if (currentTab === 'preorder') {
        const guests = document.getElementById('guests').value;
        const date = document.getElementById('arrival-date').value;
        const time = document.getElementById('arrival-time').value;
        const dateObj = new Date(date);
        const formattedDate = dateObj.toLocaleDateString('en-NG', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });

        orderData.guests = parseInt(guests);
        orderData.arrivalDate = date;
        orderData.arrivalTime = time;
        orderData.formattedDate = formattedDate;

        messageHeader = "NEW TABLE PRE-ORDER - HILTON PALACE HOTEL";
        messageDetails = [
            "Customer: " + name,
            "Phone: " + phone,
            email ? ("Email: " + email) : "Email: (not provided)",
            "Guests: " + guests,
            "Arrival: " + formattedDate + " at " + time
        ];
    } else {
        const roomNumber = document.getElementById('room-number').value;
        const date = document.getElementById('delivery-date').value;
        const time = document.getElementById('delivery-time').value;
        const roomGuests = document.getElementById('room-guests').value;
        const dateObj = new Date(date);
        const formattedDate = dateObj.toLocaleDateString('en-NG', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });

        orderData.roomNumber = roomNumber;
        orderData.deliveryDate = date;
        orderData.deliveryTime = time;
        orderData.formattedDate = formattedDate;
        orderData.guests = parseInt(roomGuests);

        messageHeader = "NEW ROOM DELIVERY - HILTON PALACE HOTEL";
        messageDetails = [
            "Customer: " + name,
            "Room Number: " + roomNumber,
            "Phone: " + phone,
            email ? ("Email: " + email) : "Email: (not provided)",
            "People in Room: " + roomGuests,
            "Delivery: " + formattedDate + " at " + time
        ];
    }

    try {
        await addDoc(collection(db, "orders"), orderData);
    } catch (err) {
        console.error("Error saving order:", err);
        alert("There was a problem saving your order. Please try again.");
        return;
    }

    const lines = [
        messageHeader,
        "------------------------------------",
        ...messageDetails,
        "------------------------------------",
        "ORDER DETAILS:",
        orderLines.join("\n"),
        "------------------------------------",
        "TOTAL: N" + total.toLocaleString(),
        "Notes: " + (notes || "None"),
        "------------------------------------",
        "Sent from the Hotel Order App"
    ];

    const message = lines.join("\n");
    window.location.href = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
});

// ==========================================
// INITIALIZE
// ==========================================
renderMenu();
updateSummary();
document.getElementById('arrival-date').valueAsDate = new Date();
document.getElementById('delivery-date').valueAsDate = new Date();