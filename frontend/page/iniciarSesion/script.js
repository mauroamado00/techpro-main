import SesionDao from "../../dao/SesionDao.js";

window.onload = () => {
    configurarMenuMovil();
    agregarEvento();
}
  
function configurarMenuMovil() {
    let menuMovil = document.querySelector('.mobile_nav');
    let botonHamburguesa = document.querySelector('.hamburger');
  
    botonHamburguesa.addEventListener('click', () => {
      menuMovil.classList.toggle('mobile_nav_hide');
    });
}
  
async function agregarEvento() {
    let formElement = document.querySelector("#frmInicio");
    let mensajeElemento = document.querySelector("#mensaje"); // Se usa el div que ya tienes en el HTML

    formElement.onsubmit = (e) => {
        e.preventDefault();
        
        let email = formElement.elements["email"].value.trim(); 
        let password = formElement.elements["password"].value.trim(); 
        
        // Validación de campos vacíos
        if (email === "" || password === "") {
            mostrarMensaje(mensajeElemento, "⚠️ Por favor, complete ambos campos antes de iniciar sesión.", "error");
            return;
        }

        iniciarSesion(email, password, mensajeElemento);
    }
}

async function iniciarSesion(email, password, mensajeElemento) {
    let respuesta = await new SesionDao().iniciarSesion(email, password);

    console.log('Respuesta completa:', respuesta);

    if (respuesta && respuesta.estado === true) {
        if (!respuesta.datos || !respuesta.datos.usuario) {
            mostrarMensaje(mensajeElemento, "⚠️ Error en la respuesta del servidor. Usuario no encontrado.", "error");
            return;
        }

        if (!("isAdmin" in respuesta.datos.usuario)) {
            mostrarMensaje(mensajeElemento, "⚠️ Error: la propiedad isAdmin no está presente en la respuesta.", "error");
            console.log("Usuario recibido:", respuesta.datos.usuario);
            return;
        }

        const isAdmin = Number(respuesta.datos.usuario.isAdmin); // Convertimos a número
        console.log('isAdmin value:', isAdmin);

        if (isAdmin === 0) {
            mostrarMensaje(mensajeElemento, `✅ Bienvenido ${respuesta.datos.usuario.nombre}. Redirigiendo...`, "success");
            setTimeout(() => {
                window.location.href = "../index/index.html"; // Redirigir usuario normal
            }, 2000);
        } else if (isAdmin === 1) {
            mostrarMensaje(mensajeElemento, "✅ Bienvenido administrador. Redirigiendo...", "success");
            setTimeout(() => {
                window.location.href = "../ADMIN%20PANEL/gestionarproductos.html"; // Redirigir admin
            }, 2000);
        } else {
            mostrarMensaje(mensajeElemento, `⚠️ Valor inesperado para isAdmin: ${isAdmin}`, "error");
        }
    } else {
        mostrarMensaje(mensajeElemento, "⚠️ No se ha encontrado la cuenta. Redirigiendo al registro...", "error");
        setTimeout(() => {
            window.location.href = "../registro/registro.html";
        }, 2000);
    }
}

// Función para mostrar mensajes con estilos animados dentro del formulario
function mostrarMensaje(elemento, texto, tipo) {
    elemento.textContent = texto;
    elemento.className = `mensaje ${tipo}`;
    elemento.style.display = "block";

    // Desaparecer el mensaje después de 3 segundos
    setTimeout(() => {
        elemento.style.opacity = "0";
        setTimeout(() => {
            elemento.style.display = "none";
            elemento.style.opacity = "1"; // Restablecer opacidad para futuros mensajes
        }, 500);
    }, 3000);
}

// Agregar estilos si no existen
if (!document.querySelector("#mensaje-estilos")) {
    const estilo = document.createElement("style");
    estilo.id = "mensaje-estilos";
    estilo.innerHTML = `
        .mensaje {
            text-align: center;
            font-size: 14px;
            font-weight: bold;
            padding: 10px;
            border-radius: 8px;
            margin-top: 10px;
            display: none;
            transition: opacity 0.4s ease-in-out;
        }
        .mensaje.success {
            background-color: #4CAF50;
            color: white;
        }
        .mensaje.error {
            background-color: #FF5733;
            color: white;
        }
    `;
    document.head.appendChild(estilo);
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".toggle-password").forEach(button => {
        button.addEventListener("click", () => {
            const input = document.getElementById(button.dataset.target);
            if (input.type === "password") {
                input.type = "text";
                button.classList.add("show"); // Cambia el candado a abierto
            } else {
                input.type = "password";
                button.classList.remove("show"); // Cambia el candado a cerrado
            }
        });
    });
});
