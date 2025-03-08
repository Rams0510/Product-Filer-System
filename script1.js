const products = [
    { id: 1, name: "Laptop", price: 1000, category: "Electronics", image: "https://img2.gadgetsnow.com/gd/images/products/additional/original/G313265_View_1/computer-laptop/laptops/hp-pavilion-15-dk2095tx-intel-core-i5-11th-gen-11300h-15-6-inches-gaming-laptop-8gb-512gb-ssd-windows-11-black-2-23-kg-.jpg", inStock: true },
    { id: 2, name: "Frock", price: 30, category: "Clothing", image: "images/dress.jpeg", inStock: false },
    { id: 3, name: "Sofa", price: 500, category: "Furniture", image: "images/sofa.jpeg", inStock: true },
    { id: 4, name: "Headphones", price: 150, category: "Electronics", image: "images/headphones.jpeg", inStock: true },
    { id: 5, name: "T-Shirt", price: 20, category: "Clothing", image: "images/tshirt.jpeg", inStock: true },
    { id: 6, name: "Table", price: 200, category: "Furniture", image: "images/table.jpeg", inStock: false }
];

// Display products
function displayProducts(productArray) {
    const productList = document.getElementById("productList");
    productList.innerHTML = "";
    productArray.forEach(product => {
        productList.innerHTML += `
            <div class="product">
                <img src="${product.image}" alt="${product.name}">
                <h4>${product.name}</h4>
                <p class="price">$${product.price}</p>
                <p>${product.category}</p>
                <p>${product.inStock ? "In Stock" : "Out of Stock"}</p>
            </div>
        `;
    });
}

// Search Products
function searchProducts() {
    let searchQuery = document.getElementById("searchBar").value.toLowerCase();
    let filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery) ||
        product.category.toLowerCase().includes(searchQuery)
    );
    displayProducts(filteredProducts);
}

// Apply Filters
function applyFilters() {
    let filteredProducts = products;

    // Category Filter
    const selectedCategories = Array.from(document.querySelectorAll(".category:checked"))
                                    .map(checkbox => checkbox.value);
    if (selectedCategories.length > 0) {
        filteredProducts = filteredProducts.filter(p => selectedCategories.includes(p.category));
    }

    // Price Range Filter
    const minPrice = document.getElementById("minPrice").value;
    const maxPrice = document.getElementById("maxPrice").value;
    if (minPrice) filteredProducts = filteredProducts.filter(p => p.price >= minPrice);
    if (maxPrice) filteredProducts = filteredProducts.filter(p => p.price <= maxPrice);

    // In-Stock Filter
    const inStockOnly = document.getElementById("inStockOnly").checked;
    if (inStockOnly) {
        filteredProducts = filteredProducts.filter(p => p.inStock);
    }

    // Sorting
    const sortOption = document.getElementById("sortOption").value;
    if (sortOption === "lowToHigh") {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === "highToLow") {
        filteredProducts.sort((a, b) => b.price - a.price);
    }

    displayProducts(filteredProducts);
}

// Clear Filters
function clearFilters() {
    document.querySelectorAll(".category").forEach(checkbox => checkbox.checked = false);
    document.getElementById("minPrice").value = "";
    document.getElementById("maxPrice").value = "";
    document.getElementById("inStockOnly").checked = false;
    document.getElementById("sortOption").value = "default";
    displayProducts(products);
}

// Load Initial Products
displayProducts(products);
