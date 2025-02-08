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

    formElement.onsubmit = (e) => {
        e.preventDefault();
        let email = formElement.elements["email"].value; 
        let password = formElement.elements["password"].value; 
        iniciarSesion(email, password);
    }
    
}

async function iniciarSesion(email, password) {
  let respuesta = await new SesionDao().iniciarSesion(email, password);

  // Debugging: Log the entire response to verify what is returned
  console.log('Respuesta completa:', respuesta);

  if (respuesta && respuesta.estado === true) {
      // Access the 'isadmin' value and log it for debugging
      const isAdmin = respuesta.datos.usuario.isadmin;

      // Log 'isadmin' to see if it is coming as expected
      console.log('isadmin value:', isAdmin);

      // Explicitly convert isadmin to a number and compare
      if (Number(isAdmin) === 0) {
          alert("Bienvenido " + respuesta.datos.usuario.nombre);
          window.location.href = "../index/index.html"; // Regular user
      } else {
          alert("Bienvenido administrador");
          window.location.href = "../ADMIN%20PANEL/gestionarproductos.html"; // Admin user
      }
  } else {
      alert("No se ha encontrado la cuenta. Redirigiendo al registro.");
      window.location.href = "../registro/registro.html"; 
  }
}
