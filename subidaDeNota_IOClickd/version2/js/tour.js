const driver = window.driver.js.driver;

window.addEventListener("DOMContentLoaded", () => {

    var firstTime = localStorage.getItem("first_time");
    if(!firstTime) {
        // first time user
        cargarTourInicio();
        localStorage.setItem("first_time","1");
    }
});

function cargarTourInicio(){
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
            { element: '#logo', popover: 
                { title: 'Logo', description: 'Aquí podrás ver el logo de la web, además de poder usarlo para abrir el menú desplegable.', side: "bottom", align: 'start' }
            },
            { element: '#volverAInicio', popover: 
                { title: 'Inicio', description: 'Con este botón podrás volver al inicio de la web.', side: "bottom", align: 'start' }
            },
            { element: '#nuevaVersion', popover: 
                { title: 'Nueva versión', description: 'Aquí podrás ir a la web con los cambios realizados el día de la presentación.', side: "bottom", align: 'start' }
            },
            { element: '#empezarTour', popover: 
                { title: 'Tour', description: 'Con este botón empezará de nuevo el tour, en caso de querer volver a verlo. También se abrirá el tour al entrar por primera vez en la página.', side: "bottom", align: 'start' }
            },
            { element: '#aboutus', popover: 
                { title: 'Sobre nosotros', description: 'Para saber mas información sobre la web y sobre el creador, puedes usar este botón.', side: "bottom", align: 'start' }
            },
            { element: '#productosDropdown', popover: 
                { title: 'Productos', description: 'Botón alternativo para ver los productos y volver al inicio.', side: "left", align: 'start' }
            },
            {
                element: '#productos', popover: 
                { title: 'Páginas de productos', description: 'Para entrar a los productos, podemos usar estos enlaces.', side: "top", align: 'start' }
            },
            { popover: 
                { title: 'Feliz navegación', description: '¡Eso es todo, se aceptan críticas constructivas y sugerencias!' }
            }
        ]
    });

    driverObj.drive();

}

