import SesionDao from "../../dao/SesionDao.js";

window.onload = () => {
    agregarEvento();
}

async function agregarEvento() {
    let formElement = document.querySelector("#frmInicio");

    formElement.onsubmit = (e) => {
        e.preventDefault();
        let email = formElement.elements["email"].value; 
        let password = formElement.elements["password"].value; 
        iniciarSesion(email, password);
    }
    
}

async function iniciarSesion(email, password) {
    let respuesta = await new SesionDao().iniciarSesion(email, password);
    
    if (respuesta && respuesta.estado === true) {
        if(respuesta.datos.usuario.isAdmin == 0){
            alert("Bienvenido " +respuesta.datos.usuario.nombre);
            window.location.href = "../index/index.html"; 
        }else{
            alert("Bienvenido administrador");
            window.location.href = "../ADMIN%20PANEL/admin-login.html";
        }
         
    } else {
        alert("No se ha encontrado la cuenta. Redirigiendo al registro.");
        window.location.href = "../registro/registro.html"; 
    }
}

