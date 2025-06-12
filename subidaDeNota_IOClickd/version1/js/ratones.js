let products = [];

window.onload = () => {
    fetch('../data/ratones.json')
        .then(response => {
            if (!response.ok) {
                throw new Error("No se pudo cargar el archivo JSON.");
            }
            return response.json();
        })
        .then(data => {
            products = data;
            populateFilters();
            autoSetPriceBounds();
            displayProducts(products);
        })
        .catch(error => {
            console.error("Error al cargar los productos:", error);
        });
};

function getUniqueValues(key) {
    const values = new Set();
    products.forEach(p => {
        if (key === "color") {
            p.color.split(",").forEach(c => values.add(c.trim()));
        } else {
            values.add(p[key]);
        }
    });
    return Array.from(values);
}

function populateSelect(id, values) {
    const select = document.getElementById(id);
    select.innerHTML = `<option value="all">Todos</option>`;
    values.forEach(val => {
        const option = document.createElement('option');
        option.value = val;
        option.textContent = val;
        select.appendChild(option);
    });
}

function populateFilters() {
    populateSelect("brand-filter", getUniqueValues("brand"));
    populateSelect("grip-filter", getUniqueValues("grip_type"));
    populateSelect("polling-filter", getUniqueValues("polling_rate"));
    populateSelect("color-filter", getUniqueValues("color"));
    populateSelect("form-filter", getUniqueValues("form"));
}

function applyFilters() {
    const brand = document.getElementById('brand-filter').value;
    const grip = document.getElementById('grip-filter').value;
    const known = document.getElementById('known-filter').value;
    const polling = document.getElementById('polling-filter').value;
    const color = document.getElementById('color-filter').value;
    const form = document.getElementById('form-filter').value;

    const minPrice = parseInt(document.getElementById('price-slider-min').value);
    const maxPrice = parseInt(document.getElementById('price-slider-max').value);

    const filtered = products.filter(p => {
        const priceMatch = (() => {
            const matches = p.price_range.match(/(\d+)/g);
            if (!matches) return true;
            const [min, max] = matches.map(Number);
            if (!isNaN(minPrice) && max < minPrice) return false;
            if (!isNaN(maxPrice) && min > maxPrice) return false;
            return true;
        })();

        return (brand === "all" || p.brand === brand) &&
                (grip === "all" || p.grip_type.toLowerCase().includes(grip.toLowerCase())) &&
                (known === "all" || p.known_brand === (known === "true")) &&
                (polling === "all" || p.polling_rate === polling) &&
                (form === "all" || p.form === form) &&
                (color === "all" || p.color.split(',').map(c => c.trim()).includes(color)) &&
                priceMatch;
    });

    displayProducts(filtered);
}

function displayProducts(productList) {
    const container = document.getElementById('product-list');
    container.innerHTML = "";

    if (productList.length === 0) {
        container.innerHTML = "<p>No se encontraron productos.</p>";
        return;
    }

    productList.forEach((p, index) => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        productDiv.innerHTML = `
            <h2>${p.name}</h2>
            <p><strong>Marca:</strong> ${p.brand}</p>
            <p><strong>Agarre:</strong> ${p.grip_type}</p>
            <p><strong>Rango de precio:</strong> ${p.price_range}</p>
            <p><strong>Colores:</strong> ${p.color}</p>
            <button class="more-info-btn" onclick="toggleDetails(${index})">Más info</button>
            <div class="more-info hidden" id="more-info-${index}">
                <p><strong>Peso:</strong> ${p.weight}g</p>
                <p><strong>Tamaño:</strong> ${p.width}mm x ${p.height}mm x ${p.tall}mm</p>
                <p><strong>Polling rate:</strong> ${p.polling_rate}</p>
                <p><strong>Forma:</strong> ${p.form}</p>
                <p><strong>Marca conocida:</strong> ${p.known_brand ? "Sí" : "No"}</p>
                <p><strong>Tiendas:</strong> ${p.available_stores.join(', ')}</p>
            </div>
        `;

        container.appendChild(productDiv);
    });
}



function autoSetPriceBounds() {
    const priceValues = products
        .map(p => p.price_range.match(/\d+/g))
        .filter(Boolean)
        .flat()
        .map(Number);

    const min = Math.min(...priceValues);
    const max = Math.max(...priceValues);

    const sliderMin = document.getElementById('price-slider-min');
    const sliderMax = document.getElementById('price-slider-max');
    const labelMin = document.getElementById('min-price-label');
    const labelMax = document.getElementById('max-price-label');

    sliderMin.min = sliderMax.min = min;
    sliderMin.max = sliderMax.max = max;

    sliderMin.value = min;
    sliderMax.value = max;

    labelMin.textContent = `${min}€`;
    labelMax.textContent = `${max}€`;

    sliderMin.addEventListener("input", () => {
        labelMin.textContent = `${sliderMin.value}€`;
        if (parseInt(sliderMin.value) > parseInt(sliderMax.value)) {
            sliderMax.value = sliderMin.value;
            labelMax.textContent = `${sliderMax.value}€`;
        }
    });

    sliderMax.addEventListener("input", () => {
        labelMax.textContent = `${sliderMax.value}€`;
        if (parseInt(sliderMax.value) < parseInt(sliderMin.value)) {
            sliderMin.value = sliderMax.value;
            labelMin.textContent = `${sliderMin.value}€`;
        }
    });
}

function toggleDetails(index) {
    const details = document.getElementById(`more-info-${index}`);
    details.classList.toggle("hidden");
}

window.applyFilters = applyFilters;