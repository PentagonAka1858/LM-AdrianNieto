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

    //  EJEMPLO DE RESPUESTA API DE MAGICLOOPS PARA DEPURACIÓN
    /*
        const coche = {
                [
        {
            "name": "Toyota RAV4",
            "description": "A versatile and reliable compact SUV that offers ample interior space, advanced safety features, and the capability of all-wheel drive for diverse driving conditions.",
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqmzhn2HV2i06wEO7eIoE8S1ZRCLhQYxjK7K6y_7utZeXKiVXzrHfoRaDfwg&s"
        },
        {
            "name": "Subaru Forester",
            "description": "A compact SUV well-known for its excellent all-wheel-drive system, spacious passenger room, and impressive off-road capabilities, making it ideal for adventure seekers.",
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUQ7qtdZsE-YZMPPPwJ-lZsJPsIosyEqz9TUPc4J8pZ2n3-vwt9m2szbvx5w&s"
        },
        {
            "name": "Honda CR-V",
            "description": "A popular SUV combining comfort, practicality, and fuel efficiency, featuring a roomy interior with plenty of cargo space, and available all-wheel drive for enhanced traction.",
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuhMHrQu4_HooQ0FfOAF44-gUpUnHKi-tHPOtLhOfQW8knTXKlcBi-gqKcHQ&s"
        }
        ]
        }
        
        

    console.log(coche.response[0].name);
    console.log(coche.response[0].description);
    console.log(coche.response[0].image);
    
    console.log(coche.response[1].name);
    console.log(coche.response[1].description);
    console.log(coche.response[1].image);
    
    console.log(coche.response[2].name);
    console.log(coche.response[2].description);
    console.log(coche.response[2].image);
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
        const url = 'https://magicloops.dev/api/loop/66e62c02-fcb1-49dc-a75f-4ec23717745e/run';

        const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({ "prompt": prompt }),
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
        console.log(obj_coches[0].name);
        console.log(obj_coches[0].description);
        
        console.log(obj_coches[1].name);
        console.log(obj_coches[1].description);
        
        console.log(obj_coches[2].name);
        console.log(obj_coches[2].description);
        
        // Muestra con una tabla los 3 coches más recomendados
        $("#resultados").html(`
            <table class="tabla-resultados">
            <tr>
                <th><strong>` + obj_coches[0].name + `</strong></th>
                <th><strong>` + obj_coches[1].name + `</strong></th>
                <th><strong>` + obj_coches[2].name + `</strong></th>
            </tr>
            <tr>
                <td>` + obj_coches[0].description + `</td>
                <td>` + obj_coches[1].description + `</td>
                <td>` + obj_coches[2].description + `</td>
            </tr>
            <tr>
                <td><img style="display:block;" width="100%" height="100%" src='` + obj_coches[0].image + `'></td>
                <td><img style="display:block;" width="100%" height="100%" src='` + obj_coches[1].image + `'></td>
                <td><img style="display:block;" width="100%" height="100%" src='` + obj_coches[2].image + `'></td>
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
