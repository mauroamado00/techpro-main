import usuario from "../../dao/UsuarioDao.js";

window.onload = () => {
    configurarMenuMovil();
    agregarEvento();
    configurarShowPassword();

    // Si el usuario vuelve al formulario después de haber sido redirigido, se recarga la página
    if (performance.navigation.type === 2) {
        location.reload();
    }
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
    const message = document.getElementById("message");

    formElement.onsubmit = (e) => {
        e.preventDefault();

        let nombre = formElement.elements["nombre"].value.trim();
        let apellido = formElement.elements["apellido"].value.trim();
        let email = formElement.elements["email"].value.trim();
        let password = formElement.elements["password"].value.trim();
        let confirmpassword = formElement.elements["confirmpassword"].value.trim();

        if (!nombre || !apellido || !email || !password || !confirmpassword) {
            mostrarMensaje(message, "⚠️ Por favor, completa todos los campos.", "warning");
            return;
        }

        if (!validarSoloLetras(nombre) || !validarSoloLetras(apellido)) {
            mostrarMensaje(message, "🔤 El nombre y apellido solo deben contener letras.", "warning");
            return;
        }

        if (password.length < 8) {
            mostrarMensaje(message, "🔑 La contraseña debe tener al menos 8 caracteres.", "warning");
            return;
        }

        if (password !== confirmpassword) {
            mostrarMensaje(message, "❌ Las contraseñas no coinciden, revisa nuevamente.", "warning");
            return;
        }

        Registrarse(nombre, apellido, email, password, message);
    };
}

async function Registrarse(nombre, apellido, email, password, message) {
    try {
        let Usuario = new usuario();
        let respuesta = await Usuario.agregarusuario(nombre, apellido, email, password);

        if (respuesta && respuesta.estado) {
            mostrarMensaje(message, "✅ Usuario registrado correctamente. Redirigiendo...", "success");
            setTimeout(() => {
                window.location.href = "../index/index.html";
            }, 2000);
        } else {
            mostrarMensaje(message, "⚠️ Error al registrar el usuario. Inténtelo nuevamente.", "error");
        }
    } catch (error) {
        mostrarMensaje(message, "⚠️ Ha ocurrido un error inesperado.", "error");
        console.error(error);
    }
}

// Función para mostrar mensajes con estilos mejorados
function mostrarMensaje(elemento, texto, tipo) {
    elemento.textContent = texto;
    elemento.className = `message ${tipo}`;
    elemento.style.display = "block";

    setTimeout(() => {
        elemento.style.opacity = "0";
        setTimeout(() => {
            elemento.style.display = "none";
            elemento.style.opacity = "1";
        }, 500);
    }, 3000);
}

// Función para validar solo letras
function validarSoloLetras(texto) {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    return regex.test(texto);
}

// Función para alternar la visibilidad de las contraseñas
function configurarShowPassword() {
    document.querySelectorAll(".toggle-password").forEach(button => {
        button.addEventListener("click", () => {
            let input = button.previousElementSibling;
            if (input.type === "password") {
                input.type = "text";
                button.textContent = "🔒"; // Cambia el icono
            } else {
                input.type = "password";
                button.textContent = "👁"; // Cambia el icono
            }
        });
    });
}

