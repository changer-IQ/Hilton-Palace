// ==========================================
// CONFIGURATION
// ==========================================
const WHATSAPP_NUMBER = "2348100158158"; // Nigeria code + number
const CURRENCY = "₦";

// ==========================================
// COMPACT MENU DATA
// Format: [id, name, description, price]
// ==========================================
const rawMenu = [
    ["Starters", [
        ["s1","Crispy Fish Fingers / Tartare Sauce","Fish fillet, eggs, chips/parsley, mango and panko bread crumbs.",8000],
        ["s2","Fish Pamed","Butter fish finger bread crumbs.",7000],
        ["s3","Prawns Tempura","Pat prawns, dry pepper, whisky flour.",9000],
        ["s4","Chicken Spring Rolls","Diced chicken, spring onions dough.",10500],
        ["s5","Vegetarian Spring Rolls","Steam veg, dough.",8500]
    ]],
    ["Soups", [
        ["so1","Goat Meat Pepper Soup","Nutritious and spicy diced goat meat in aromatic mix spiced soup.",8500],
        ["so2","Chicken Pepper Soup","Chicken in a traditional hot and spicy broth served with bread roll.",8500],
        ["so3","Onion Soup","",8000],
        ["so4","Mushroom Cream Soup","",8000],
        ["so5","Minstone Soup","",8000],
        ["so6","Catfish Pepper Soup","Fresh catfish in a spicy soup, with traditional spices and herbs.",8500]
    ]],
    ["Salads", [
        ["sa1","Shrimps Avocado Salad","Sauteed shrimps, lettuce, avocado, tomato and cucumber with honey mustard dressing.",12000],
        ["sa2","Mixed Salad","",10000],
        ["sa3","Chicken Caesar Salad","Crispy grilled chicken fillet, romaine lettuce/kale, parmesan cheese and croutons, with a classic caesar dressing.",10000],
        ["sa4","Chef Salad","Ice berg lettuce, tomato cucumber, sweet corn, sandwich cheese and chicken shrimps.",6000],
        ["sa5","Coleslaw","Green cabbage, carrots, red cabbage, lemon juice, black pepper in mayonnaise mix.",5000]
    ]],
    ["Breakfast", [
        ["b1","Full English Breakfast","Toasted bread, grilled mushroom, sausage, omelet, grilled tomatoes, Bacon (optional).",12500],
        ["b2","American Breakfast","Pancakes or waffle, grilled sausage, scramble eggs, a glass of juice.",12500],
        ["b3","Nigeria Breakfast","A flavorful Nigerian dish featuring your choice of fish, egg, or kidney Sauce, served with boiled yam, sauteed potatoes, fried plantain or Golden fried yam.",10000],
        ["b4","Palace Special Breakfast","Scrambled eggs, baked beans, chicken sausage, avocado, waffle and Grilled tomatoes.",10000]
    ]],
    ["Best Italian Pasta", [
        ["p1","Penne Arrabbiata","Penne pasta toast with a spicy tomato sauce.",8500],
        ["p2","Spicy Sea Food Pasta","Pasta served with a mixed of prawns calamari, tilapia or guwan-ruwa in a spicy tomato sauce or creamy base.",15000],
        ["p3","Chicken Alfredo Pasta","Pasta served in rich creamy alfredo sauce. topped with chicken tenderloin and grated parmesan cheese.",12500],
        ["p4","Spaghetti Bolognaise","Pasta with richly minced meat sauce, garlic, herbs and grated Parmesan cheese.",12500],
        ["p5","Chicken Pesto Penne","Penne pasta in creamy pesto sauce, grilled chicken and parmesan cheese.",10000]
    ]],
    ["Main Course", [
        ["m1","Lamb Chops","Grilled lamb, chops. Vegetable, cornfit, marinated eggplant, caramelized.",16000],
        ["m2","Chilli Prawns","Sauteed prawns cooked in spicy hot sauce served with Chinese rice.",25000],
        ["m3","Salmone Almondine","Caper sauteed, baby potatoes beans lemon juice.",32000],
        ["m4","Jumbo Prawns","Pan grilled tiger prawns, tomatoes, olive salad spinach & mushroom.",26000],
        ["m5","Mixed Sauteed Fried Vegetable","Verities of garden veg steamed with mushroom.",8000],
        ["m6","Diced Lamb with Vegetable","Served with basmati rice and broccoli.",15000],
        ["m7","Fillet of Fish with Roast Potato","Sauteed fish, cooked with router potatoes.",18000],
        ["m8","Chicken Supreme","Grilled chicken breast, potatoes glaze, vegetable mush room.",15000],
        ["m9","Chicken Escaopini","Breaded marinated chicken breast served with seasonal veg, mustard sauce.",19000],
        ["m10","Sole Fish Veg","Pan fried sole fish, served with vegetables glaze and fries.",18000],
        ["m11","Giwa Ruwa Fish","Nigeria testis fish fillet served with herbs roasted potatoes seasonal veg.",15000]
    ]],
    ["Rice Dishes", [
        ["r1","Thai Pineapple and Fried Rice","Basmatic rice, dried pineapple, turmeric, carrots, bell pepper, chicken fillet, shrimps sauted with oyster sauce.",12000],
        ["r2","Smokey Jollof Rice","Basmatic rice in aromatic tomato base, serve with coleslaw.",12000],
        ["r3","Coconut Rice","Traditional rice dish with a hint of coconut flavor, best enjoy with dried fish.",12000],
        ["r4","Egg Fried Rice","Basmatic rice fried with scramble eggs, oyster sauce, soy sauce, succulent shrimps and garnished vegies.",12500],
        ["r5","Ofada Rice/Sauce","Local rice with peppsy fusion, smokey spicy sauce made of associated meat.",12000]
    ]],
    ["From the Grills", [
        ["g1","Grilled Veal Chops","Served with roasted vegetable, starch, gnarsh and your choice of side.",20000],
        ["g2","Lamb Racks","Served with roasted vegetable, starch, gnarsh and your choice of side.",20000],
        ["g3","T-Bone Steak","Served with roasted vegetable, starch, gnarsh and your choice of side.",30000],
        ["g4","Beef Tenderloine","Served with roasted vegetable, starch, gnarsh and your choice of side.",21000],
        ["g5","Grilled Sirlone","Served with roasted vegetable, starch, gnarsh and your choice of side.",16000],
        ["g6","Grilled Salmon Fillet","Served with roasted vegetable, starch, gnarsh and your choice of side.",30000],
        ["g7","Grilled Chicken Breast","Served with roasted vegetable, starch, gnarsh and your choice of side.",15000],
        ["g8","Grilled Jumbo Prawns","Served with roasted vegetable, starch, gnarsh and your choice of side.",29000],
        ["g9","Whole Lobster","Served with roasted vegetable, starch, gnarsh and your choice of side.",38000]
    ]],
    ["Naija Corner", [
        ["n1","Seafood Okra","Sliced okra soup with a combination of fresh seafood, snail, prawns, fresh fish, crayfish, crabs and unshelled clams, with swallow of choice.",20000],
        ["n2","Vegetable Soup","A soup made of waterleaf, pumpkin leaves, apple snail, dried fish, stockfish and unshelled clams, with swallow of choice.",14000],
        ["n3","Egusi Soup","Grounded melon seed (Egusi), leefy greens, stockfish, dryfish and blend of traditional spices, perfect to enjoy with swallow of choice.",12500],
        ["n4","Ogbono Soup","A popular Nigerian delicacy, prepared with ogbono seed, dry fish, stockfish and cow head with swallow of choice.",12500],
        ["n5","Oha Soup","Indigenous Igbo people of Nigeria origin, packed with proteins and copious amount of leafy greens (Oha), ogiri, cow head, stockfish and uziza leaf.",12500]
    ]],
    ["Side Dishes", [
        ["sd1","Asia Noodles","Oyster sauce, soy sauce, ginger, garlic, and vegies.",8000],
        ["sd2","Chicken Noodles","Chicken, noodles, ginger, garlic, spicy and veggies.",8000],
        ["sd3","Singapore Noodles","Chicken, sausages, onions, ginger, garlic and veggies.",10000],
        ["sd4","Mashed Potatoes","Incredibly creamy mashed potatoes loaded with rich butter and garlic flavour.",5000]
    ]],
    ["Spicy Proteins", [
        ["sp1","Spicy Snail","",15000],
        ["sp2","Peppered Goatmeat","",8000],
        ["sp3","Peppered Turkey Wings","",8000],
        ["sp4","Peppered Chicken","",8000],
        ["sp5","Peppered Fish","",8000]
    ]],
    ["From The Barbecue", [
        ["bb1","Spicy Grilled Cat Fish (Small)","Marinated Grilled Catfish In Nigerian Chili and Sweet Sauce, Fries and Cole Slaw.",12000],
        ["bb2","Spicy Grilled Cat Fish (Medium)","Marinated Grilled Catfish In Nigerian Chili and Sweet Sauce, Fries and Cole Slaw.",15000],
        ["bb3","Spicy Grilled Cat Fish (Big)","Marinated Grilled Catfish In Nigerian Chili and Sweet Sauce, Fries and Cole Slaw.",18000],
        ["bb4","Herb Grilled Chicken (Half)","Half / Full Grilled Chicken Marinated In Fresh Herb and Served with Chili and Fries.",12000],
        ["bb5","Herb Grilled Chicken (Full)","Half / Full Grilled Chicken Marinated In Fresh Herb and Served with Chili and Fries.",20000],
        ["bb6","Grilled Jumbo Tiger Prawns with Basmatic Rice","Three Pcs.",25000],
        ["bb7","Fire Kissed Grill Tilapia Fish (Small)","Coal Grilled Tilapia Fish, Crispy Served with Vibrant Chill Sauce and Potatoes Wedges.",15000],
        ["bb8","Fire Kissed Grill Tilapia Fish (Big)","Coal Grilled Tilapia Fish, Crispy Served with Vibrant Chill Sauce and Potatoes Wedges.",22000]
    ]],
    ["Pool Side Menu", [
        ["ps1","Club Sandwich","Chicken, Pickle, Tomato, Lettuce, Cheese, Fried Egg, Mayo and Mustard Fries.",6000],
        ["ps2","Chicken Wrap","Tofu Wrap, Topped With Chicken, Lettuce, Cabbage, Pickle and Bell Pepper In A Spicy Mayo Sauce.",6000],
        ["ps3","Chicken Taouk","Marinated Chicken, Garlic Sauce, Pickle, French Fries and Lettuce Wrapped With In Pita Bread.",6000],
        ["ps4","Beef Kebab","Beef Kebab, Pickle, Tomatoes, Onions, and Parsky Wrapped In Pita Bread.",6000],
        ["ps5","Chicken Shawarma","Chicken Garlic Sauce, Cabbage, Mayo, Ketchup Wrapped In Lebanese Bread.",5500],
        ["ps6","Double Burger","Grilled Beef Pattie, Tomatoes, Pickle, Mayo and Ketchup Sauce.",5000],
        ["ps7","Double Burger Deluxe","Double Grilled Beef Pattie with Lettuce, Tomatoes, Pickles, Ketchup and Mayo Sauce.",7000],
        ["ps8","Double Burger Special","Double Grilled Beef Pattie with Lettuce, Tomatoes, Pickles, Ketchup and Mayo Sauce.",6000]
    ]],
    ["Desserts", [
        ["d1","Ice Cream Scoop","One scoop of ice cream (chocolate, vanilla, strawberry).",3500],
        ["d2","Chocolate Mousse","Glass of chocolate ice cream between a sliced banana topped with whipped cream and chocolate syrup.",5000],
        ["d3","Banana Split","Three scoop of ice-cream between a sliced banana top with whipped cream and chocolate syrup.",5000],
        ["d4","Cheese Cake","Creamy cheese cake with digestive or Oreo biscuit crust, topped with homemade strawberry jam.",5000]
    ]],
    ["Cocktails", [
        ["c1","Americano","Campari, Red Martin, Angostura Bitters.",8000],
        ["c2","My Lady","Gin, Lemon Juice, Sugar Syrup, Egg White.",7000],
        ["c3","Black Russian","Smirnoff Vodka, Tia Maria.",8000],
        ["c4","Barcadi Classic","Bacardi White, Lime Juice, Grenadine.",7000],
        ["c5","Yellow Card","Vodka, Syrup, Orange Juice, Soda.",6000],
        ["c6","Screw Driver","Smirnoff Orange Juice.",6000],
        ["c7","Pine Apple Freeze","Gin, Rum, Fresh Pineapple Juice, sugar syrup.",7000],
        ["c8","Cuba Libra","Barcodi Rum, Lemon Juice, Coke.",6000]
    ]],
    ["Mocktails", [
        ["mk1","Couple Night","Egg White, Banana, Orange Juice, Syrup, Grenadine, Dash of Fanta.",6000],
        ["mk2","Sports Man","Pineapple Juice, Black Currant, Mint Syrup, Grape Fruit.",6000],
        ["mk3","Strawberry & Banana Colada","Strawberry, Banana, Fruit Syrup, Pineapple Juice, Fresh Cream.",6000],
        ["mk4","Lucky Lady","Black Currant, Lime Cordial, Soda, Fanta Orange.",6000],
        ["mk5","On A Roll","Tin Tomatoes, Lemon Juice, Seasoning.",6500],
        ["mk6","Strawberry Chapman","Strawberry, Strawberry Ice Cream, Syrup.",6500],
        ["mk7","Chapman","Lemon Juice, Angostura, Grenadine, Fanta, Spirit.",5000],
        ["mk8","Calypso Cooler","Banana Orange Juice, Lime Juice.",5000],
        ["mk9","Pina Colada (Virgin)","Pineapple Juice, Cream.",5000],
        ["mk10","Hilton Palace Fruit Punch","Pineapple Juice, Orange Juice, Lemon Juice, Banana Grensdine.",5000]
    ]],
    ["Wine & Spirits", [
        ["w1","Merlot Velot Red","",30000],
        ["w2","Montepulciano D Abruzzo Red","",40000],
        ["w3","Chateanuf Red","",40000],
        ["w4","Carlo Rossi Red or White","",17000],
        ["w5","Maison J Gadet Red","",43000],
        ["w6","Four Coursin Red or White","",20000],
        ["w7","4th Street Red or White","",20000],
        ["w8","Carto Rossi","",20000]
    ]],
    ["Aperitif & Whisky", [
        ["a1","Amalura","",35000],
        ["a2","Baileys","",50000],
        ["a3","Campari","",50000],
        ["wh1","Black Label","",60000],
        ["wh2","Red Label","",55000],
        ["wh3","Jack Daniel","",55000],
        ["wh4","Jack Daniel Fire","",60000],
        ["wh5","Jameson Green","",55000],
        ["wh6","Jameson Black Barrel","",60000],
        ["wh7","Martel VS","",80000],
        ["wh8","Imperial Blue","",20000]
    ]],
    ["Beer & Soft Drinks", [
        ["be1","Star, Trophy, Goldberg","",2000],
        ["be2","Life, Gulder, Castle Lite","",2000],
        ["be3","Heineken Budweiser","",2500],
        ["be4","Guiness Stout, Legend","",2500],
        ["be5","Smirnoff Ice","",2500],
        ["be6","Desperado, Flying Fish","",2000],
        ["be7","Black Bullet","",3000],
        ["be8","Double Black","",2000],
        ["be9","Origin Bitter Beer","",2500],
        ["be10","Star Raddler, Tiger, Hero","",2000],
        ["sd1","Fanta, Coke, Sprite, Soda, Tonic","",1200],
        ["sd2","Hollandia, Chivita, Exotic","",5000],
        ["sd3","Amstel, Maltina","",1500],
        ["sd4","Schwepps, Schwepps Lemon","",1500],
        ["sd5","Nestle Water, Swan Water","",1000],
        ["sd6","Red Bull","",3000],
        ["sd7","Power Horse","",2000]
    ]],
    ["Fresh Juice & Hot Drinks", [
        ["fj1","Freshly Squeeze Juice","",5000],
        ["fj2","Fresh Water Melon","",5000],
        ["fj3","Fresh Squeeze Pineapple Juice","",5000],
        ["fj4","Lemonade","",5000],
        ["cj1","Orange Juice (Packet)","",6000],
        ["cj2","Pineapple Juice (Packet)","",6000],
        ["cj3","Apple Juice (Packet)","",6000],
        ["h1","Mint Tea","",2000],
        ["h2","Green Tea","",2000],
        ["h3","Green Tea, Apple And Cinnamon","",2000],
        ["h4","Green Tea, Ginger And Lemon","",2000],
        ["h5","Slimming Tea Lime And Lemon","",2000],
        ["h6","Camine Tea","",2000],
        ["h7","Nescafe","",2000],
        ["h8","Espresso Coffee","",3000],
        ["h9","Cappuccino","",3000],
        ["h10","Americano","",3000],
        ["h11","Old Time White Coffee","",3000],
        ["h12","Latte","",3500],
        ["h13","Hot Chocolate","",3500]
    ]]
];

// Convert compact array into usable objects
const menuData = rawMenu.map(cat => ({
    category: cat[0],
    items: cat[1].map(item => ({ id: item[0], name: item[1], desc: item[2], price: item[3] }))
}));

// ==========================================
// STATE & DOM ELEMENTS
// ==========================================
let cart = {}; 
const menuContainer = document.getElementById('menu-container');
const orderSummaryDiv = document.getElementById('order-summary');
const grandTotalSpan = document.getElementById('grand-total');
const bookingForm = document.getElementById('booking-form');

// ==========================================
// RENDER MENU
// ==========================================
function renderMenu() {
    let html = '';
    menuData.forEach(category => {
        html += `<h2 class="category-title">${category.category}</h2>`;
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
    menuContainer.innerHTML = html;
}

// ==========================================
// CART LOGIC
// ==========================================
function findItemById(id) {
    for (let cat of menuData) {
        for (let item of cat.items) {
            if (item.id === id) return item;
        }
    }
    return null;
}

function updateQty(id, change) {
    const item = findItemById(id);
    if (!item) return;

    if (!cart[id]) cart[id] = { name: item.name, price: item.price, qty: 0 };
    cart[id].qty += change;
    if (cart[id].qty <= 0) delete cart[id];

    document.getElementById(`qty-${id}`).textContent = cart[id] ? cart[id].qty : 0;
    updateSummary();
}

function updateSummary() {
    let total = 0;
    let summaryHtml = '';
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
// WHATSAPP SUBMISSION
// ==========================================
bookingForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const cartKeys = Object.keys(cart);
    if (cartKeys.length === 0) { alert("Please add at least one dish to your order."); return; }

    const guests = document.getElementById('guests').value;
    const date = document.getElementById('arrival-date').value;
    const time = document.getElementById('arrival-time').value;
    const name = document.getElementById('customer-name').value;
    const phone = document.getElementById('customer-phone').value;
    const notes = document.getElementById('notes').value;

    let total = 0;
    let orderLines = [];
    cartKeys.forEach(id => {
        const item = cart[id];
        const itemTotal = item.price * item.qty;
        total += itemTotal;
        orderLines.push(`• ${item.qty} x ${item.name} - ${CURRENCY}${itemTotal.toLocaleString()}`);
    });

    const dateObj = new Date(date);
    const formattedDate = dateObj.toLocaleDateString('en-NG', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });

    const message = `*NEW PRE-ORDER & RESERVATION*%0A*Hilton Palace Hotel*%0A------------------------------%0A*Customer:* ${name}%0A*Phone:* ${phone}%0A*Guests:* ${guests}%0A*Arrival:* ${formattedDate} at ${time}%0A------------------------------%0A*ORDER DETAILS:*%0A${orderLines.join('%0A')}%0A------------------------------%0A*TOTAL:* ${CURRENCY}${total.toLocaleString()}%0A*Notes:* ${notes || "None"}%0A------------------------------%0A_Sent from the Hotel Order App_`;

    const encodedMessage = message.replace(/ /g, '%20').replace(/\n/g, '%0A');
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
});

// ==========================================
// INITIALIZE
// ==========================================
renderMenu();
updateSummary();
document.getElementById('arrival-date').valueAsDate = new Date();