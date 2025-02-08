import usuario from "../../dao/UsuarioDao.js";

window.onload = () => {
    configurarMenuMovil();
    agregarEvento();
};

function configurarMenuMovil() {
    let menuMovil = document.querySelector('.mobile_nav');
    let botonHamburguesa = document.querySelector('.hamburger');

    botonHamburguesa.addEventListener('click', () => {
        menuMovil.classList.toggle('mobile_nav_hide');
    });
}

function agregarEvento() {
    let formElement = document.querySelector("#frmRegistro");
    const message = document.getElementById("message"); // Elemento para mostrar mensajes

    formElement.onsubmit = (e) => {
        e.preventDefault();

        let nombre = formElement.elements["nombre"].value.trim();
        let apellido = formElement.elements["apellido"].value.trim();
        let email = formElement.elements["email"].value.trim();
        let password = formElement.elements["password"].value.trim();
        let confirmpassword = formElement.elements["confirmpassword"].value.trim();

        // Validaciones
        if (!nombre || !apellido || !email || !password || !confirmpassword) {
            mostrarMensaje(message, "⚠️ Por favor, completa todos los campos.", "error");
            return;
        }

        if (!validarSoloLetras(nombre) || !validarSoloLetras(apellido)) {
            mostrarMensaje(message, "⚠️ El nombre y apellido deben contener solo letras.", "error");
            return;
        }

        if (password.length < 8 || confirmpassword.length < 8) {
            mostrarMensaje(message, "⚠️ La contraseña debe tener al menos 8 caracteres.", "error");
            return;
        }

        if (password !== confirmpassword) {
            mostrarMensaje(message, "⚠️ Las contraseñas no coinciden.", "error");
            return;
        }

        // Si todo está correcto, registramos al usuario
        Registrarse(nombre, apellido, email, password, confirmpassword, message);
    };
}

async function Registrarse(nombre, apellido, email, password, confirmpassword, message) {
    try {
        let Usuario = new usuario();
        let respuesta = await Usuario.agregarusuario(nombre, apellido, email, password);

        if (respuesta && respuesta.estado) {
            mostrarMensaje(message, "✅ Usuario registrado correctamente.", "success");
            setTimeout(() => {
                window.location.href = "../index/index.html"; // Redirigir después de un tiempo
            }, 2000);
        } else {
            mostrarMensaje(message, "⚠️ Error al registrar el usuario. Inténtelo nuevamente.", "error");
        }
    } catch (error) {
        mostrarMensaje(message, "⚠️ Ha ocurrido un error inesperado.", "error");
        console.error(error);
    }
}

// Función para mostrar mensajes
function mostrarMensaje(elemento, texto, tipo) {
    elemento.textContent = texto;
    elemento.className = tipo; // Agrega la clase 'error' o 'success' según el tipo
}

// Función para validar que solo contenga letras
function validarSoloLetras(texto) {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    return regex.test(texto);
}
