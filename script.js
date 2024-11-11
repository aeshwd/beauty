const products = [
    { id: 1, img: "images/product1.jpg", name: "LAKMÉ Micellar Pure Facewash For Deep Pore Cleanse 100G", description: "", price: 263, company: "LAKME", category: "Face Wash" },
    { id: 2, img: "images/product2.jpg", name: "Swiss Beauty Real Makeup Base Highlighting Primer 35ML", description: "", price: 310, company: "SWISS", category: "Primer" },
    { id: 3, img: "images/product3.jpg", name: "Maybelline New York Colossal Kajal, Intense Colour, Waterproof 0.35GM", description: "", price: 109, company: "MAYBELLINE", category: "Kajal" },
    { id: 4, img: "images/product4.jpg", name: "NIVEA Pearl and Beauty 50ml Deo Roll On | With Pearl Extracts & Avocado Oil", description: "", price: 149, company: "NIVEA", category: "Deodorant" },
    { id: 5, img: "images/product5.jpg", name: "Maybelline New York Liquid Foundation, Matte & Poreless 18ML", description: "", price: 180, company: "MAYBELLINE", category: "Face Wash" },
    { id: 6, img: "images/product6.jpg", name: "Swiss Beauty Cream It Up Blusher | Highly Pigmented 10ML", description: "", price: 246, company: "SWISS", category: "Face Cream" },
    { id: 7, img: "images/product7.jpg", name: "L'Oréal Paris Revitalift 1.5% Hyaluronic Acid Serum, Volume: 30ml", description: "", price: 599, company: "LOREAL", category: "Serum" },
    { id: 8, img: "images/product8.jpg", name: "Swiss Beauty Bold Matt Lip Liner", description: "", price: 62, company: "SWISS", category: "LINER" },
    { id: 9, img: "images/product9.jpg", name: "Tresemme Hair Fall Defence Shampoo 1 Ltr", description: "", price: 782, company: "TRESEMME", category: "Shampoo" },
    { id: 10, img: "images/product10.jpg", name: "TRESemme Pro Pure Damage Recovery Shampoo, 370ML", description: "", price: 350, company: "TRESEMME", category: "Shampoo" },
    { id: 11, img: "images/product11.jpg", name: "L'Oreal Paris Moisture Filling Shampoo, With Hyaluronic Acid 180ML", description: "", price: 153, company: "LOREAL", category: "Shampoo" },
    { id: 12, img: "images/product12.jpg", name: "L'Oreal Paris Extraordinary Oil Nourishing Shampoo 180ML", description: "", price: 164, company: "LOREAL", category: "Shampoo" },
    { id: 13, img: "images/product14.jpg", name: "POND'S Bright Miracle Detox Facewash | 10X Power of Activated Charcoal 200GM", description: "", price: 362, company: "PONDS", category: "Face Wash" },
    { id: 14, img: "images/product15.jpg", name: "Lakme Blush & Glow Exfoliating Face Wash with Vitamin C Serum 150GM", description: "", price: 399, company: "LAKME", category: "Face Wash" }
    
    // Add more products as needed
];

function displayProducts(filteredProducts) {
    const productGrid = document.getElementById("productGrid");
    productGrid.innerHTML = "";

    filteredProducts.forEach(product => {
        const productCard = document.createElement("div");
        productCard.className = "product-card";
        productCard.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p class="price">₹${product.price}</p>
            <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productGrid.appendChild(productCard);
    });
}

function filterProducts() {
    const priceRange = document.getElementById("priceRange").value;
    const category = document.getElementById("categories").value;
    const company = document.getElementById("companies").value;
    const search = document.getElementById("search").value.toLowerCase();

    const filteredProducts = products.filter(product => {
        return (
            product.price <= priceRange &&
            (category === "" || product.category === category) &&
            (company === "" || product.company === company) &&
            (search === "" || product.name.toLowerCase().includes(search))
        );
    });

    displayProducts(filteredProducts);
}

function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = products.find(p => p.id === productId);
    
    const existingProduct = cart.find(item => item.id === productId);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${product.name} added to cart`);
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById("cartCount").textContent = totalQuantity;
}

function navigateToCart() {
    window.location.href = "cart.html";
}

// Initial load
displayProducts(products);
updateCartCount();