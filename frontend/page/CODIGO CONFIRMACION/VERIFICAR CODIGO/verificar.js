document.querySelector("#frmRecuperar").onsubmit = async (e) => {
    e.preventDefault();  // Evita el comportamiento por defecto del formulario

    const email = e.target.elements["email"].value.trim();  // Obtenemos el correo del formulario
    const message = document.getElementById("message");  // Elemento para mostrar los mensajes

    // Validamos si el campo de correo está vacío
    if (!email) {
        mostrarMensaje(message, "⚠️ Por favor, ingresa tu correo electrónico.", "error");
        return;
    }

    // Hacemos la solicitud AJAX al backend
    try {
        const response = await fetch('CODIGOCORREO.PHP', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `email=${encodeURIComponent(email)}`  // Enviamos el correo por POST
        });

        const result = await response.json();  // Obtenemos la respuesta en formato JSON

        console.log(result); // Muestra la respuesta en la consola para depuración

        if (result.estado === "exito") {
            mostrarMensaje(message, `✅ Código enviado. Revisa tu correo.`, "success");

            // Aquí redirigimos a la página donde el usuario ingresará el código
            setTimeout(() => {
                window.location.href = "verificar_codigo.html"; // Redirige a la página de verificación
            }, 2000);
        } else {
            mostrarMensaje(message, `⚠️ Error al enviar el código: ${result.mensaje}`, "error");
        }

    } catch (error) {
        mostrarMensaje(message, "⚠️ Error al enviar el código. Inténtalo nuevamente.", "error");
    }
};

// Función para mostrar el mensaje de éxito o error
function mostrarMensaje(elemento, texto, tipo) {
    elemento.textContent = texto;
    elemento.className = tipo; // Cambia la clase según el tipo (error o success)
}
