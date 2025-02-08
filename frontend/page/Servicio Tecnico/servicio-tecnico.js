document.getElementById("formContacto").addEventListener("submit", function(event) {
    event.preventDefault(); // Evitar el envío tradicional del formulario

    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const mensaje = document.getElementById("mensaje").value;

    // Validar que todos los campos estén completos
    if (!nombre || !correo || !mensaje) {
        document.getElementById("respuesta").innerHTML = "Por favor, completa todos los campos.";
        return;
    }

    // Validar el formato del correo electrónico
    if (!validateEmail(correo)) {
        document.getElementById("respuesta").innerHTML = "Por favor, introduce un correo electrónico válido.";
        return;
    }

    const data = {
        nombre: nombre,
        correo: correo,
        mensaje: mensaje
    };

    console.log("Datos a enviar:", JSON.stringify(data));

    fetch("/techpro-main/backend/CONTACTO/contactomail.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(data) 
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }
        return response.json(); 
    })
    .then(data => {
        console.log("Respuesta del servidor:", data);  
        document.getElementById("respuesta").innerHTML = data.respuesta;

        // Si el límite de 3 mensajes ha sido alcanzado, recargar la página
        if (data.respuesta === "Has alcanzado el límite de 3 mensajes con este correo electrónico.") {
            setTimeout(function() {
                location.reload(); // Recargar la página después de 1.5 segundos para mostrar el mensaje
            }, 1500);
        }

        // Si el mensaje se envió correctamente, recargar la página
        if (data.respuesta === "Mensaje enviado correctamente.") {
            setTimeout(function() {
                location.reload(); // Recargar la página después de 1.5 segundos para mostrar el mensaje
            }, 1500);
        }
    })
    .catch(error => {
        console.error("Error:", error);
        document.getElementById("respuesta").innerHTML = "Hubo un error al enviar tu mensaje. Por favor, inténtalo de nuevo.";
    });
});

// Función para validar el formato del correo electrónico
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

