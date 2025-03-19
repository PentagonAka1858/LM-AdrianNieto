/// <reference path="../examenJSAdrianNieto/jquery.js" />

// Realiza lo mismo que $(document).ready(inicio), solo que es una forma más actualizada
// https://api.jquery.com/ready/
$(inicio);

// Función para ejecutar una función al hacer submit
function inicio(){
    $(document).on("submit", mostrarResultado);
}

function mostrarResultado(event){
    // Prevent the default form submission
    event.preventDefault();
    
    // Create an array to store the selected values/labels
    let selectedValues = [];
    
    // Get all checked checkboxes and selected radio buttons
    $('input:checkbox:checked, input:radio:checked').each(function() {
        // Get the associated label text for each selected input
        let labelText = $("label[for='" + $(this).attr('id') + "']").text();
        selectedValues.push(labelText);
    });
    
    // Display the result (you can modify this part as needed)
    console.log("Selected values:", selectedValues);
    
    // If you want to display it on the page
    let resultHtml = "<p>Selected options: " + selectedValues.join(", ") + "</p>";
    // You can append this to a div instead of using alert
    $('body').append(resultHtml);
}
