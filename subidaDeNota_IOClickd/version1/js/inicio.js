window.addEventListener("DOMContentLoaded", () => {
    const loader = document.getElementById("loader");

    const start = performance.now();
    const minDisplayTime = 50; // 50 ms

    const hideLoader = () => {
        const elapsed = performance.now() - start;
        const wait = Math.max(0, minDisplayTime - elapsed);

        setTimeout(() => {
            loader.classList.add("hidden");
            setTimeout(() => loader.remove(), 500);
        }, wait);
    };

    hideLoader();
});

// Función para abrir el Nav, ajustando su ancho a 250px y un fondo oscuro al resto de la pagina
function openNav() {
    document.getElementById("mySidenav").style.width = "20%";
    document.getElementById("main").style.filter = "blur(3px)";
}

// Función para cerrar el Nav, ajustando su ancho a 0px y volviendo al fondo blanco
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.filter = "blur(0px)";
}

// Si se pulsa la tecla ESC, ejecuta el cerrar Nav
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        closeNav();
    }
});

// Función del menú dropdown
function menuProductos() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Evento para escuchar si se pulsa fuera del dropdown
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        document.getElementById("myDropdown").classList.remove("show");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const validPaths = [
        "/subidaDeNota_IOClickd/version1/html/inicio.html",
        "/subidaDeNota_IOClickd/version1/html/ratones.html",
        "/subidaDeNota_IOClickd/version1/html/wip.html",
        "https://pentagonaka1858.github.io/LM-AdrianNieto/subidaDeNota_IOClickd/version1/html/inicio.html",
        "https://pentagonaka1858.github.io/LM-AdrianNieto/subidaDeNota_IOClickd/version1/html/ratones.html",
        "https://pentagonaka1858.github.io/LM-AdrianNieto/subidaDeNota_IOClickd/version1/html/wip.html",
        "/LM-AdrianNieto/subidaDeNota_IOClickd/version1/html/inicio.html",
        "/LM-AdrianNieto/subidaDeNota_IOClickd/version1/html/ratones.html",
        "/LM-AdrianNieto/subidaDeNota_IOClickd/version1/html/wip.html"
    ];

    const current = window.location.pathname;

    // Si no coincide la ruta con ninguna válida, redirige a la página WIP
    if (!validPaths.includes(current)) {
        window.location.replace("../html/wip.html");  // Use correct relative path
    }
});
