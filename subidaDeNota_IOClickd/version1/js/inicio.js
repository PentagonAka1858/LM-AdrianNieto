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

function hover(element) {
    element.setAttribute('src', '../img/logoClickd.svg');
    document.getElementById("audio").play();
}

function unhover(element) {
    element.setAttribute('src', '../img/logo.svg');
    document.getElementById('audio').pause();
    document.getElementById('audio').currentTime = 0;
}

//Evento para redireccionar a WIP en páginas no deseadas
document.addEventListener("DOMContentLoaded", () => {
    const validPages = [
        "inicio",
        "ratones",
        "wip",
        "aboutus"
    ];

    const currentPath = window.location.pathname;
    const currentPageAndExtension = currentPath.substring(currentPath.lastIndexOf("/") + 1);
    const currentPage = currentPageAndExtension.substring(currentPageAndExtension.lastIndexOf("."), -1);

    if (!validPages.includes(currentPage)) {
        window.location.replace("../html/wip.html");
    }
});
