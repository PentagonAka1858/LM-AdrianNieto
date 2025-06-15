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

        const moreInfoBtn = document.createElement('button');
        moreInfoBtn.className = 'more-info-btn';
        moreInfoBtn.textContent = 'Más info';
        moreInfoBtn.onclick = () => toggleDetails(index);

        const recommendBtn = document.createElement('button');
        recommendBtn.className = 'more-info-btn';
        recommendBtn.textContent = 'Consultar IA';
        recommendBtn.onclick = () => toggleRecommendation(index, p);

        productDiv.innerHTML = `
            <h2>${p.name}</h2>
            <p><strong>Marca:</strong> ${p.brand}</p>
            <p><strong>Agarre:</strong> ${p.grip_type}</p>
            <p><strong>Rango de precio:</strong> ${p.price_range}</p>
            <p><strong>Colores:</strong> ${p.color}</p>
            <div class="buttons-container"></div>
            <div class="more-info hidden" id="more-info-${index}">
                <p><strong>Peso:</strong> ${p.weight}g</p>
                <p><strong>Tamaño:</strong> ${p.width}mm x ${p.height}mm x ${p.tall}mm</p>
                <p><strong>Polling rate:</strong> ${p.polling_rate}</p>
                <p><strong>Forma:</strong> ${p.form}</p>
                <p><strong>Marca conocida:</strong> ${p.known_brand ? "Sí" : "No"}</p>
                <p><strong>Tiendas:</strong> ${p.available_stores.join(', ')}</p>
            </div>
            <div class="recommendation-message hidden" id="recommendation-${index}">
                <p id=recommendation-text-${index}></p>
            </div>
        `;

        const buttonsContainer = productDiv.querySelector('.buttons-container');
        buttonsContainer.appendChild(moreInfoBtn);
        buttonsContainer.appendChild(recommendBtn);

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
    const productDiv = details.parentElement;
    const recommendation = productDiv.querySelector(".recommendation-message");

    const isVisible = !details.classList.contains("hidden");

    if (isVisible) {
        details.classList.add("hidden");  // hide details
    } else {
        details.classList.remove("hidden");  // show details
        // Hide recommendation if visible
        if (recommendation && !recommendation.classList.contains("hidden")) {
            recommendation.classList.add("hidden");
        }
    }
}

async function toggleRecommendation(index, p) {
    const recommendation = document.getElementById(`recommendation-${index}`);
    const productDiv = recommendation.parentElement;
    const moreInfo = productDiv.querySelector(`#more-info-${index}`);
    const recommendationText = document.getElementById("recommendation-text-" + index);
    const isVisible = !recommendation.classList.contains("hidden");

        if (isVisible) {
        recommendation.classList.add("hidden");
    } else {
        recommendation.classList.remove("hidden");
        if (!moreInfo.classList.contains("hidden")) {
            moreInfo.classList.add("hidden");
        }
    }

    if (recommendationText.innerHTML === "") {
        recommendationText.innerHTML = "<em>Cargando recomendación...</em>";

        await new Promise(requestAnimationFrame);

        try {
            const jsonMouse = await magicLoopsAPI(p.name);
            recommendationText.innerHTML = jsonMouse.reason;
        } catch (error) {
            recommendationText.innerHTML = "<em>Error al cargar la recomendación.</em>";
            console.error(error);
        }
    }
}

async function magicLoopsAPI(mouseName) {
    const response = await fetch('https://magicloops.dev/api/loop/e130cee9-e647-424e-aa69-fb79ddd0f63c/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
        "mouse_name": `"${mouseName}"`
    })});
    const data = await response.json();
    console.log(data);
    console.log(data.reason);
    return data;
}

const driver = window.driver.js.driver;

function cargarTourRatones(){
    const driverObj = driver({
        prevBtnText: 'Atrás', 
        nextBtnText: 'Siguiente',
        doneBtnText: 'Finalizar',
        showProgress: true,
        progressText: 'Paso {{current}} de {{total}}',
        steps: [
            { popover: 
                { title: 'I/OClickd! tour', description: 'Para finalizar el tour pulsa el botón "x" o usa la tecla ESC. Puedes usar las flechas o los botones integrados para moverte por el tour.' }
            },
            { element: '#filter-panel', popover: 
                { title: 'Filtros', description: 'Para poder así filtrar los distintos ratones en la BD. Se autorellenan dependiendo de los datos de la BD.', side: "right", align: 'start' }
            },
            { element: '#brand-filter', popover: 
                { title: 'Marcas', description: 'Filtro por marcas.', side: "right", align: 'start' }
            },
            { element: '#grip-filter', popover: 
                { title: 'Agarre', description: 'Filtro por tipo de agarre.', side: "right", align: 'start' }
            },
            { element: '#polling-filter', popover: 
                { title: 'Tasa de refresco', description: 'Filtro por tasa de refresco.', side: "right", align: 'start' }
            },
            { element: '#form-filter', popover: 
                { title: 'Forma', description: 'Filtro por forma del ratón.', side: "right", align: 'start' }
            },
            { element: '#color-filter', popover: 
                { title: 'Color', description: 'Filtro por colores disponibles del ratón.', side: "right", align: 'start' }
            },
            { element: '#known-filter', popover: 
                { title: 'Marca conocida', description: 'Filtro para mostrar ratones de marcas conocidas o no.', side: "right", align: 'start' }
            },
            { element: '#price-slider-group', popover: 
                { title: 'Precio', description: 'Filtro por precio.', side: "right", align: 'start' }
            },
            { element: '#filter-btn', popover: 
                { title: 'Botón de filtrar', description: 'Pulsar el botón una vez configurado los filtros para filtrar los productos.', side: "right", align: 'start' }
            },
            { element: '#product-list', popover: 
                { title: 'Productos', description: 'Productos con sus características. Se puede usar el botón "Más info" para más características y el de "Consultar IA" para consultar a la IA de por qué usar ese ratón.', side: "top", align: 'start' }
            }
        ]
    });

    driverObj.drive();

}


window.applyFilters = applyFilters;