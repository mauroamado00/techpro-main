document.querySelector("#frmCambiar").onsubmit = (e) => {
    e.preventDefault();

    const password = e.target.elements["password"].value.trim();
    const confirmpassword = e.target.elements["confirmpassword"].value.trim();
    const message = document.getElementById("message");

    if (!password || !confirmpassword) {
        mostrarMensaje(message, "⚠️ Por favor, completa todos los campos.", "error");
        return;
    }

    if (password.length < 8) {
        mostrarMensaje(message, "⚠️ La contraseña debe tener al menos 8 caracteres.", "error");
        return;
    }

    if (password !== confirmpassword) {
        mostrarMensaje(message, "⚠️ Las contraseñas no coinciden.", "error");
        return;
    }

    // Aquí puedes implementar la lógica para guardar la nueva contraseña
    mostrarMensaje(message, "✅ Contraseña cambiada correctamente.", "success");
    setTimeout(() => {
        window.location.href = "iniciarSesion.html"; // Redirige al inicio de sesión
    }, 2000);
};

// Función para mostrar mensajes
function mostrarMensaje(elemento, texto, tipo) {
    elemento.textContent = texto;
    elemento.className = tipo; // Agrega clase 'error' o 'success'
}
