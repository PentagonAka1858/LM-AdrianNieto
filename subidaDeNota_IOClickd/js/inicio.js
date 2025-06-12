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

