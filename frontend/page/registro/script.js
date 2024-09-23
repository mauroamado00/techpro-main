import usuario from "../../dao/UsuarioDao.js";

window.onload = () => {
    agregarEvento();
}

function agregarEvento() {
    
    let formElement = document.querySelector("#frmRegistro");

    formElement.onsubmit = (e) => {
        e.preventDefault();
        let nombre = formElement.nombre.value;
        let apellido = formElement.apellido.value;
        let email = formElement.email.value;
        let password = formElement.password.value;
        Registrarse(nombre, apellido, email, password);
    }
}

async function Registrarse(nombre, apellido, email, password) {
    try {
        let respuesta = await new usuario().Registrarse(nombre, apellido, email, password);

        if (respuesta.estado) {
            alert('Usuario registrado correctamente.');
            window.location.href = "../index/index.html";  
        } else {
            alert(respuesta.mensaje); 
        }
    } catch (error) {
        console.error('Error en el registro:', error);
        alert('Ocurrió un error durante el registro. Por favor, intente nuevamente.');
    }
}
