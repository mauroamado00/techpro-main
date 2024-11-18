window.onload = () => {
    configurarMenuMovil();
}

function configurarMenuMovil() {
    let menuMovil = document.querySelector('.mobile_nav');
    let botonHamburguesa = document.querySelector('.hamburger');
  
    botonHamburguesa.addEventListener('click', () => {
      menuMovil.classList.toggle('mobile_nav_hide');
    });
}
  
