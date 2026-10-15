// ============================================================
//  Capstone Mini Project
//  Interactive Product Inventory & Analytics Dashboard
//  Combines: Data/Input, Control Flow, Loops, Functions/Scope,
//            Array Methods & Iteration
// ============================================================

const readline = require("readline");

// ─── Pre-existing inventory (Array of Objects) ──────────────────────
let inventory = [
    { name: "Laptop", price: 800 },
    { name: "Mouse", price: 25 }
];

// ============================================================
// SECTION 4: Functions & Scope
// Regular and arrow functions with secure local scoping
// ============================================================

// Standard function: Assign category badge using if...else & switch
function assignCategory(price) {
    let tier; // function-scoped variable

    // if...else to determine price tier
    if (price >= 500) {
        tier = "high";
    } else if (price >= 100) {
        tier = "mid";
    } else if (price > 0) {
        tier = "low";
    } else {
        tier = "invalid";
    }

    // switch to map tier to category badge
    let category;
    switch (tier) {
        case "high":
            category = "Premium";
            break;
        case "mid":
            category = "Standard";
            break;
        case "low":
            category = "Budget";
            break;
        default:
            category = "Unknown";
    }

    return category;
}

// Arrow function: Calculate total inventory value
const calculateTotalValue = (items) => {
    let total = 0;
    for (let i = 0; i < items.length; i++) {
        total += items[i].price;
    }
    return total;
};

// Arrow function: Apply tax/discount with local scoping
const applyTax = (price, taxRate = 0.1) => {
    // taxRate is locally scoped to this arrow function
    const taxAmount = price * taxRate;
    const finalPrice = price + taxAmount;
    return finalPrice;
};

// Standard function: Validate product input
function validateInput(name, price) {
    if (!name || name.trim() === "") {
        return { valid: false, error: "Product name cannot be empty." };
    }
    if (isNaN(price) || price <= 0) {
        return { valid: false, error: "Price must be a positive number." };
    }
    return { valid: true, error: null };
}

// ─── Search function using while loop with break ────────────────────
function searchProduct(items, searchName) {
    let i = 0;
    let found = null;

    while (i < items.length) {
        if (items[i].name.toLowerCase() === searchName.toLowerCase()) {
            found = items[i];
            break; // Exit loop once product is found
        }
        i++;
    }

    return found;
}

// ─── Loop through inventory, skip invalid entries with continue ─────
function cleanInventoryLog(items) {
    const validItems = [];

    for (let i = 0; i < items.length; i++) {
        // Skip items with invalid or missing data
        if (!items[i].name || items[i].price <= 0) {
            continue;
        }
        validItems.push(items[i]);
    }

    return validItems;
}

// ============================================================
// SECTION 5: Array Methods & Iteration — Display & Analytics
// ============================================================

function displayInventory(items) {
    console.log("\n--- Processing Inventory Roster (forEach) ---");

    // forEach to log each item with its category badge
    items.forEach((product) => {
        const category = assignCategory(product.price);
        console.log(
            "* Item: " + product.name + " ($" + product.price + ") -> Category: " + category
        );
    });
}

function runAnalytics(items) {
    console.log("\n--- Financial Analytics ---");

    // Total inventory value using arrow function
    const totalValue = calculateTotalValue(items);
    console.log("Total Inventory Value: $" + totalValue);

    // filter() to isolate affordable items (under $200)
    const affordableItems = items
        .filter((product) => product.price < 200)
        .map((product) => product.name);
    console.log(
        'Filtered Affordable Items (Under $200): ' + JSON.stringify(affordableItems)
    );

    // map() to produce a transformed report summary
    const reportList = items.map((product) => {
        return product.name.toUpperCase() + ": $" + product.price;
    });
    console.log(
        'Formatted Report List: ' + JSON.stringify(reportList)
    );
}

// ============================================================
// MAIN APPLICATION — Interactive Flow
// ============================================================

function main() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    console.log("--- Initializing Inventory System ---");

    // ── SECTION 1: Data & Input Initialization ──────────────────
    rl.question('Enter new product name: ', (nameInput) => {
        rl.question('Enter product price: $', (priceInput) => {

            // Explicit type conversion (string → number)
            const productName = String(nameInput).trim();
            const productPrice = Number(priceInput);

            // ── SECTION 2: Control Flow & Conditional Evaluation ─
            const validation = validateInput(productName, productPrice);

            if (!validation.valid) {
                console.log("Input Error: " + validation.error);
                console.log("Using default product: Monitor at $150");
                inventory.push({ name: "Monitor", price: 150 });
            } else {
                console.log(
                    '[Prompt executed: User adds "' + productName + '" at "$' + productPrice + '"]'
                );
                inventory.push({ name: productName, price: productPrice });
            }

            // ── SECTION 3: Loops & Flow Control ─────────────────
            // Clean inventory (skip bad entries via continue)
            inventory = cleanInventoryLog(inventory);

            // Search demonstration using while + break
            const searchResult = searchProduct(inventory, "Mouse");
            if (searchResult) {
                // Product found via while-loop search
            }

            // ── SECTION 5: Display & Analytics ──────────────────
            displayInventory(inventory);
            runAnalytics(inventory);

            rl.close();
        });
    });
}

// Launch the application
main();
