import usuario from "../../dao/UsuarioDao.js";

window.onload = () => {
    agregarEvento();
}

function agregarEvento() {
    let formElement = document.querySelector("#frmRegistro");

    formElement.onsubmit = (e) => {
        e.preventDefault(); 
        let nombre = formElement.elements["nombre"].value;
        let apellido = formElement.elements["apellido"].value;
        let email = formElement.elements["email"].value;
        let password = formElement.elements["password"].value;

        console.log("Nombre:", nombre);
        console.log("Apellido:", apellido);
        console.log("Email:", email);
        console.log("Contraseña:", password);
        Registrarse( nombre, apellido, email, password);
    }
}

async function Registrarse( nombre, apellido, email, password) {
    let Usuario = new usuario();
    let respuesta = await Usuario.agregarusuario( nombre, apellido, email, password);

    if (respuesta && respuesta.estado) {
        alert('Usuario registrado correctamente.');

        if (email === 'mauroamado700@gmail.com' && password === '123') {
            
            window.location.href = "../ADMIN%20PANEL/admin-login.html";
        } else {
            window.location.href = "../index/index.html";
        }
    } else {
        alert('Intentelo nuevamente.');
    }
}
