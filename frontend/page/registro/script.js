import usuario from "../../dao/UsuarioDao.js";

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
  
function agregarEvento() {
    let formElement = document.querySelector("#frmRegistro");

    formElement.onsubmit = (e) => {
        e.preventDefault();
        let password = formElement.elements["password"].value;
        let confirmpassword = formElement.elements["confirmpassword"].value;
        let nombre = formElement.elements["nombre"].value;
        let email = formElement.elements["email"].value;
        let apellido = formElement.elements["apellido"].value;

        console.log("Nombre:", nombre);
        console.log("Apellido:", apellido);
        console.log("Email:", email);
        console.log("password:", password);
        Registrarse(nombre, apellido, email, password, confirmpassword);
    }
}

async function Registrarse(nombre, apellido, email, password, confirmpassword) {

    if (password === confirmpassword) {
        let Usuario = new usuario();
        let respuesta = await Usuario.agregarusuario(nombre, apellido, email, password);
        if (respuesta && respuesta.estado) {
            console.log('respuesta', respuesta)
            alert('Usuario registrado correctamente.');
            window.location.href = "../index/index.html";
        } else {
            alert('Inténtelo nuevamente.');
        }
    } else {
        alert('Las contraseñas no coinciden.');
    }


}
