// ==========================================
// DATA MODEL (Verified from image & brief)
// ==========================================
let businessInfo = {
    name: "ORENJI SQUEEZE",
    tagline: "Fresher · Happier · Healthier",
    whatsapp: "085273955806",
    waFormatted: "6285273955806",
    instagram: "@orenjisqueeze",
    locations: ["Jl. Bangau Sakti, Panam", "Jl. Suka Karya, Panam"]
};

// Official menu array based strictly on poster reference image
let products = [
    {
        id: "menu-001",
        name: "Jus Jeruk Original",
        category: "Original",
        price: 10000,
        image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=600&q=80",
        description: "Jus jeruk murni 100% tanpa pengawet & tanpa pewarna buatan. Kesegaran alami yang meningkatkan energi dan mood kamu seharian!"
    },
    {
        id: "menu-002",
        name: "Jus Jeruk Milk",
        category: "Special Milk",
        price: 12000,
        image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
        description: "Perpaduan unik kebaikan jus jeruk murni dengan sentuhan rasa susunya yang creamy dan lembut di lidah."
    },
    {
        id: "menu-003",
        name: "Jus Jeruk Yakult",
        category: "Yakult Series",
        price: 12000,
        image: "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=600&q=80",
        description: "Perpaduan jus jeruk segar dan kebaikan fermentasi Yakult! Rasa asam manis yang menyegarkan dahaga."
    },
    {
        id: "menu-004",
        name: "Jus Jeruk Madu",
        category: "Healthy Series",
        price: 13000,
        image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&w=600&q=80",
        description: "Kombinasi sehat sari jeruk alami ditambah manisnya madu murni. Pilihan tepat untuk imunitas tubuh."
    },
    {
        id: "menu-005",
        name: "Jus Jeruk Chia Seed",
        category: "Healthy Series",
        price: 13000,
        image: "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=600&q=80",
        description: "Jus jeruk segar dengan topping biji Chia Seed kaya serat. Nikmat, mengenyangkan, dan super sehat!"
    }
];

let categories = ["Semua", "Original", "Special Milk", "Yakult Series", "Healthy Series"];
let currentCategory = "Semua";

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu on link click
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    // FAQ Accordion logic
    document.querySelectorAll('.faq-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const content = btn.nextElementSibling;
            const icon = btn.querySelector('i');

            content.classList.toggle('hidden');
            if (icon) {
                icon.style.transform = content.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
            }
        });
    });

    // Initial UI Render
    renderCategoryChips();
    renderProducts();
    populateProductSelect();

    // Filter & Search Event Listeners
    document.getElementById('menu-search-input').addEventListener('input', renderProducts);
    document.getElementById('menu-sort-select').addEventListener('change', renderProducts);
    document.getElementById('cust-product').addEventListener('change', updateFormTotal);

    // Form Submit Listener
    document.getElementById('whatsapp-order-form').addEventListener('submit', handleFormSubmit);
});

// Format currency helper
function formatRupiah(amount) {
    return 'Rp ' + amount.toLocaleString('id-ID');
}

// Render Category Chips Filter
function renderCategoryChips() {
    const container = document.getElementById('category-chips-container');
    container.innerHTML = categories.map(cat => `
        <button onclick="setCategory('${cat}')" 
                class="px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                    currentCategory === cat 
                    ? 'orange-gradient text-white shadow-md' 
                    : 'bg-white text-gray-600 hover:bg-orange-100 border border-orange-200'
                }">
            ${cat}
        </button>
    `).join('');
}

function setCategory(cat) {
    currentCategory = cat;
    renderCategoryChips();
    renderProducts();
}

// Render Products Catalog Grid
function renderProducts() {
    const grid = document.getElementById('products-grid');
    const noProductsMsg = document.getElementById('no-products-msg');
    const searchQuery = document.getElementById('menu-search-input').value.toLowerCase().trim();
    const sortBy = document.getElementById('menu-sort-select').value;

    // Filter
    let filtered = products.filter(p => {
        const matchCategory = (currentCategory === "Semua") || (p.category === currentCategory);
        const matchSearch = p.name.toLowerCase().includes(searchQuery) || p.description.toLowerCase().includes(searchQuery);
        return matchCategory && matchSearch;
    });

    // Sort
    if (sortBy === 'price-low') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
        filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (filtered.length === 0) {
        grid.innerHTML = '';
        noProductsMsg.classList.remove('hidden');
        return;
    }

    noProductsMsg.classList.add('hidden');
    grid.innerHTML = filtered.map(p => `
        <div class="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl border border-orange-100 transition-all duration-300 flex flex-col group">
            <!-- Image Area -->
            <div class="relative aspect-square overflow-hidden bg-orange-100">
                <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                <span class="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-orenji-dark text-[10px] font-bold px-3 py-1 rounded-full border border-orange-100">
                    ${p.category}
                </span>
            </div>

            <!-- Content Area -->
            <div class="p-5 flex-1 flex flex-col justify-between">
                <div>
                    <h3 class="font-display font-bold text-lg text-gray-900 mb-1 group-hover:text-orenji-primary transition-colors">${p.name}</h3>
                    <p class="text-xs text-gray-500 line-clamp-2 mb-3 leading-relaxed">${p.description}</p>
                </div>

                <div>
                    <div class="flex items-center justify-between mb-4">
                        <span class="text-xs text-gray-400 font-medium">Harga Resmi</span>
                        <span class="font-extrabold text-lg text-orenji-primary">${formatRupiah(p.price)}</span>
                    </div>

                    <div class="grid grid-cols-2 gap-2">
                        <button onclick="openProductModal('${p.id}')" class="w-full py-2 bg-orange-50 hover:bg-orange-100 text-orenji-dark font-bold rounded-xl text-xs transition-colors">
                            Detail
                        </button>
                        <button onclick="quickOrder('${p.id}')" class="w-full py-2 orange-gradient text-white font-bold rounded-xl text-xs shadow-md hover:opacity-90 transition-opacity flex items-center justify-center gap-1">
                            <i data-lucide="shopping-bag" class="w-3.5 h-3.5"></i>
                            <span>Pesan</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    lucide.createIcons();
}

function openProductModal(productId) {
    const p = products.find(prod => prod.id === productId);
    if (!p) return;

    document.getElementById('modal-img').src = p.image;
    document.getElementById('modal-title').innerText = p.name;
    document.getElementById('modal-price').innerText = formatRupiah(p.price);
    document.getElementById('modal-desc').innerText = p.description;

    const orderBtn = document.getElementById('modal-order-btn');
    orderBtn.onclick = () => {
        closeProductModal();
        quickOrder(p.id);
    };

    document.getElementById('product-modal').classList.remove('hidden');
}

function closeProductModal() {
    document.getElementById('product-modal').classList.add('hidden');
}

function populateProductSelect() {
    const select = document.getElementById('cust-product');
    select.innerHTML = products.map(p => `
        <option value="${p.id}">${p.name} - ${formatRupiah(p.price)}</option>
    `).join('');
    updateFormTotal();
}

function adjustQty(delta) {
    const qtyInput = document.getElementById('cust-qty');
    let val = parseInt(qtyInput.value) || 1;
    val += delta;
    if (val < 1) val = 1;
    if (val > 99) val = 99;
    qtyInput.value = val;
    updateFormTotal();
}

function updateFormTotal() {
    const productId = document.getElementById('cust-product').value;
    const qty = parseInt(document.getElementById('cust-qty').value) || 1;
    const p = products.find(prod => prod.id === productId);

    if (p) {
        const total = p.price * qty;
        document.getElementById('form-total-price').innerText = formatRupiah(total);
    }
}

function quickOrder(productId) {
    const select = document.getElementById('cust-product');
    select.value = productId;
    updateFormTotal();

    // Scroll to order form
    document.getElementById('order-form-section').scrollIntoView({ behavior: 'smooth' });
}

function openOrderModal(customItem) {
    if (customItem) {
        document.getElementById('cust-notes').value = customItem;
    }
    document.getElementById('order-form-section').scrollIntoView({ behavior: 'smooth' });
}

// Handle Form Submit & Generate WhatsApp Link
function handleFormSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('cust-name').value.trim();
    const phone = document.getElementById('cust-phone').value.trim();
    const productId = document.getElementById('cust-product').value;
    const qty = document.getElementById('cust-qty').value;
    const delivery = document.getElementById('cust-delivery').value;
    const notes = document.getElementById('cust-notes').value.trim();

    const product = products.find(p => p.id === productId);
    const totalStr = document.getElementById('form-total-price').innerText;

    const textMsg = 
`Halo ORENJI SQUEEZE! Saya ingin memesan jus segar:

📌 *Detail Pemesan:*
• Nama: ${name}
• No. HP/WA: ${phone}

🍹 *Pesanan:*
• Menu: ${product ? product.name : 'Custom Order'}
• Jumlah: ${qty} Gelas
• Estimasi Total: ${totalStr}
• Opsi: ${delivery}
${notes ? '• Catatan Tambahan: ' + notes : ''}

Mohon informasi konfirmasi pesanan dan metode pembayarannya. Terima kasih!`;

    const encodedMsg = encodeURIComponent(textMsg);
    const waUrl = `https://wa.me/${businessInfo.waFormatted}?text=${encodedMsg}`;

    window.open(waUrl, '_blank');
}

function openCmsModal() {
    document.getElementById('cms-wa').value = businessInfo.whatsapp;
    document.getElementById('cms-ig').value = businessInfo.instagram;

    const cmsList = document.getElementById('cms-product-list');
    cmsList.innerHTML = products.map((p, idx) => `
        <div class="p-3 bg-gray-50 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
            <span class="font-bold text-gray-800">${p.name}</span>
            <div class="flex items-center gap-2 w-full sm:w-auto">
                <label class="text-gray-500 shrink-0">Rp</label>
                <input type="number" id="cms-price-${idx}" value="${p.price}" class="w-24 p-1.5 border rounded font-mono">
            </div>
        </div>
    `).join('');

    document.getElementById('cms-modal').classList.remove('hidden');
}

function closeCmsModal() {
    document.getElementById('cms-modal').classList.add('hidden');
}

function saveCmsChanges() {
    businessInfo.whatsapp = document.getElementById('cms-wa').value;
    businessInfo.waFormatted = businessInfo.whatsapp.replace(/[^0-9]/g, '');
    if (businessInfo.waFormatted.startsWith('0')) {
        businessInfo.waFormatted = '62' + businessInfo.waFormatted.substring(1);
    }

    products.forEach((p, idx) => {
        const inputPrice = document.getElementById(`cms-price-${idx}`);
        if (inputPrice) {
            p.price = parseInt(inputPrice.value) || p.price;
        }
    });

    renderProducts();
    populateProductSelect();
    closeCmsModal();

    // Simple user notification
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-5 right-5 z-50 bg-green-600 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-lg';
    toast.innerText = '✅ Konten & Harga Berhasil Diperbarui!';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}
