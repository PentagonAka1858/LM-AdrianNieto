/* Esperaremos hasta que el documento esté cargado y listo 
* para ser procesado por nuestro programa  */
let obj_documento = $(document);

/* Cuando esté cargado ejecutaremos la función cuyo nombre aparezca aquí */
obj_documento.ready(inicio);

// Función que iniciará las funciones al poner el cursor encima o sacarlo
function inicio(){
    // Declaramos la función enlace1 para el elemento con id "#enlace_1"
    let enlace1=$("#enlace_1");
    // Si el objeto "#enlace_1" es clickeado, ejecutará la función "mostrarParrafo1"
    enlace1.click(mostrarParrafo1);
    
    // Declaramos la función enlace2 para el elemento con id "#enlace_2"
    let enlace2=$("#enlace_2");
    // Si el objeto "#enlace_2" es clickeado, ejecutará la función "mostrarParrafo2"
    enlace2.click(mostrarParrafo2);
    
    // Declaramos la función enlace1 para el elemento con id "#enlace_3"
    let enlace3=$("#enlace_3");
    // Si el objeto "#enlace_3" es clickeado, ejecutará la función "mostrarParrafo3"
    enlace3.click(mostrarParrafo3);
}

// Función para ocultar el elemento con id "#contenido_1"
function mostrarParrafo1(){
    let parrafo1=$("p#contenido_1");
    parrafo1.toggle();
    
    // Variable para cambiar el contenido del enlace
    let enlace1=$("#enlace_1");
    // Dependiendo del texto que haya en el elemento,
    // Cambiamos su texto para que sea correspondiente a su acción
    if (enlace1.text() == "Ocultar contenido"){
        enlace1.text("Mostrar contenido");
    } else {
        enlace1.text("Ocultar contenido");
    }
}

// Función para ocultar el elemento con id "#contenido_2"
function mostrarParrafo2(){
    let parrafo2=$("p#contenido_2");
    parrafo2.toggle();
    
    // Variable para cambiar el contenido del enlace
    let enlace2=$("#enlace_2");
    // Dependiendo del texto que haya en el elemento,
    // Cambiamos su texto para que sea correspondiente a su acción
    if (enlace2.text() == "Ocultar contenido"){
        enlace2.text("Mostrar contenido");
    } else {
        enlace2.text("Ocultar contenido");
    }
}

// Función para ocultar el elemento con id "#contenido_3"
function mostrarParrafo3(){
    let parrafo3=$("p#contenido_3");
    parrafo3.toggle();
    
    // Variable para cambiar el contenido del enlace
    let enlace3=$("#enlace_3");
    // Dependiendo del texto que haya en el elemento,
    // Cambiamos su texto para que sea correspondiente a su acción
    if (enlace3.text() == "Ocultar contenido"){
        enlace3.text("Mostrar contenido");
    } else {
        enlace3.text("Ocultar contenido");
    }
}
