/// <reference path="../examenJSAdrianNieto/jquery.js" />

// Realiza lo mismo que $(document).ready(inicio), solo que es una forma más actualizada
// https://api.jquery.com/ready/
$(inicio);

// Función para ejecutar una función al hacer submit
function inicio(){
    $(document).on("submit", mostrarResultado);
}

function mostrarResultado(event){
    // Prevención para que no cargue el formulario por defecto
    event.preventDefault();
    
    // Creamos un array para guardar los valores marcados
    let valoresMarcados = [];
    
    // CAda checkbox y radio marcado, será "Pusheado" o empujado a "valoresMarcados"
    $('input:checkbox:checked, input:radio:checked').each(function() {
        // Guardamos en una variable el texto que hay en los label que tienen el parametro
        // for igual que el id del checkbox/radio
        let textoLabel = $("label[for='" + $(this).attr('id') + "']").text();
        // Empujamos la variable anterior al array de valores seleccionados
        valoresMarcados.push(textoLabel);
    });
    
    // Mostramos el resultado en la consola para depuración
    console.log("Selected values:", valoresMarcados);
    
    // Guardamos en una variable los valores seleccionados separados con una ,
    let resultHtml = "<p>Selected options: " + valoresMarcados.join(", ") + "</p>";
    
    // La siguiente linea se puede descomentar para mostrar al usuario los valores seleccionados al final del documento
//    $('body').append(resultHtml);

    // Creamos un prompt que pasaremos a la IA para conseguir los coches recomendados
    let prompt = valoresMarcados.join(", ");

    // Una prompt para pasarlo a una IA de forma más manual.
    let manualPrompt = "Quiero que me recomiendes 3 coches con las siguientes caracteristicas: " + valoresMarcados.join(", ");
    manualPrompt = manualPrompt + ". Quiero el siguiente formato: nombreDelCocheRecomendado, descripcionBreveDelCocheRecomendado";
    console.log("Prompt manual: ", manualPrompt);
    
    // Para depuración, mostramos el prompt que pasará a la IA automaticamente
    console.log("Prompt:", prompt);

    /* EJEMPLO DE RESPUESTA API DE MAGICLOOPS PARA DEPURACIÓN
        const coche = [
            {
                "coches": [
                {
                    "nombre": "Tesla",
                    "modelo": "Model Y",
                    "descripcion": "El Tesla Model Y es un SUV totalmente eléctrico que ofrece tracción total (AWD) y espacio para 5 pasajeros. Equipado con una pantalla táctil central, es compatible con Android Auto y Apple CarPlay, además de contar con cargador inalámbrico, frenado autónomo de emergencia y cámara 360°."
                },
                {
                    "nombre": "Ford",
                    "modelo": "Mustang Mach-E",
                    "descripcion": "El Ford Mustang Mach-E es un SUV eléctrico que proporciona una experiencia de manejo automatizada con tracción total. Con 5 puertas y espacio para 5 ocupantes, presenta una pantalla táctil de gran tamaño, compatibilidad con Android Auto y Apple CarPlay, y cuenta con cargador inalámbrico, sistema de frenado autónomo de emergencia y cámara 360°."
                },
                {
                    "nombre": "Volkswagen",
                    "modelo": "ID.4",
                    "descripcion": "El Volkswagen ID.4 es un SUV eléctrico que combina sostenibilidad y funcionalidad. Su sistema de tracción total y capacidad para 5 pasajeros lo hacen ideal para familias. Incorpora una pantalla táctil, tecnología de carga inalámbrica, frenado autónomo de emergencia y cámara 360°, además de ser compatible con Android Auto y Apple CarPlay."
                }
                ]
            }
        ]

    console.log(coche[0].coches[0].nombre);
    console.log(coche[0].coches[0].descripcion);
    
    console.log(coche[0].coches[1].nombre);
    console.log(coche[0].coches[1].descripcion);
    
    console.log(coche[0].coches[2].nombre);
    console.log(coche[0].coches[2].descripcion);
    */
    
    // Mandamos el prompt a la función enviarAMagicLoops que se encargará de llamar a la API
    enviarAMagicLoops(prompt);

}

// Usamos una función asincrona para poder esperar a que se resuelva la petición de la API
async function enviarAMagicLoops(prompt) {
    // Usamos un bloque try/catch para controlar errores que puedan ocurrir
    try {
        // Mostramos un mensaje de que se está procesando la solicitud de la API
        $("#resultados").html("<p>Procesando tu solicitud...</p>");
        
        // Deslizamos el cursor a los resultados
        $('html, body').animate({
            scrollTop: $("#resultados").offset().top
        }, 500);
        
        /*####################    LLAMADA A LA API PARA LA IA      #########################*/
        const url = 'https://magicloops.dev/api/loop/45fcf5c6-3233-4b2f-9221-aec31289a5cf/run';
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "prompt": prompt })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const responseJson = await response.json();

        /*###############    TERMINA LA LLAMADA A LA API PARA LA IA      ###################*/
        
        // Depuración de la respuesta de la API
        console.log("API Response:", responseJson);
        console.log("Response type:", typeof responseJson);
        console.log("Response has output property:", responseJson.hasOwnProperty('output'));
        console.log("Output value:", responseJson.output);
        
        // Comprobamos la respuesta de las propiedades del JSON
        console.log("All response properties:", Object.keys(responseJson));

        console.log("Mensaje: ", responseJson.message);

        if (responseJson.message === "Loop is not activated") {
            throw new Error(`Se debe activar la API de MagicLoops`);
        }

        // Variable para saber sobre que trata la respuesta de la API
        let obj_coches = "";

        // Le damos a la variable obj_coches el valor de responseJson
        obj_coches = responseJson;
        
        // DEBUG PARA VER LOS DISTINTOS COCHES EN CONSOLA
        console.log(obj_coches.coches[0].nombre);
        console.log(obj_coches.coches[0].descripcion);
        
        console.log(obj_coches.coches[1].nombre);
        console.log(obj_coches.coches[1].descripcion);
        
        console.log(obj_coches.coches[2].nombre);
        console.log(obj_coches.coches[2].descripcion);
        
        // Muestra con una tabla los 3 coches más recomendados
        $("#resultados").html(`
            <table class="tabla-resultados">
            <tr>
                <th><strong>` + obj_coches.coches[0].nombre + `</strong></th>
                <th><strong>` + obj_coches.coches[1].nombre + `</strong></th>
                <th><strong>` + obj_coches.coches[2].nombre + `</strong></th>
            </tr>
            <tr>
                <td>` + obj_coches.coches[0].descripcion + `</td>
                <td>` + obj_coches.coches[1].descripcion + `</td>
                <td>` + obj_coches.coches[2].descripcion + `</td>
            </tr>
            </table>
        `);
        
        // Deslizar el cursor hasta abajo
        $('html, body').animate({
            scrollTop: $("#resultados").offset().top
        }, 500);
        
    } catch (error) {
        console.error('Error:', error);
        $("#resultados").html(`
            <p class="mensaje-error">Error al procesar la solicitud: ${error.message}</p>
        `);
        
        // Deslizar el cursor hasta abajo
        $('html, body').animate({
            scrollTop: $("#resultados").offset().top
        }, 500);
    }
}