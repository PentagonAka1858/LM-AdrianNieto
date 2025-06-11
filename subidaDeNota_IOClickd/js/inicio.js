// Función para abrir el Nav, ajustando su ancho a 250px y un fondo oscuro al resto de la pagina
function openNav() {
    document.getElementById("mySidenav").style.width = "20%";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

// Función para cerrar el Nav, ajustando su ancho a 0px y volviendo al fondo blanco
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.body.style.backgroundColor = "white";
}

// Si se pulsa la tecla ESC, ejecuta el cerrar Nav
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape" && document.body.style.backgroundColor == "rgba(0, 0, 0, 0.4)") {
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
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}
