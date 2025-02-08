import OfertaDAO from "../../dao/OfertasDao.js";

window.onload = async () => {
  configurarMenuMovil();
  let ofertas = await obtenerOfertas();
  mostrarOfertas(ofertas);
}

// muestra los banners y hace el slide
let slideIndex = 0;
const slides = document.querySelectorAll('.banner-slide');

function mostrarSlide(index) {
  slideIndex = (index + slides.length) % slides.length; 
  slides.forEach((slide, i) => slide.style.display = i === slideIndex ? 'block' : 'none');
}

function cambiarSlide() {
  mostrarSlide(slideIndex + 1); 
}

setInterval(cambiarSlide, 5000);
mostrarSlide(slideIndex);


// desplegar y ocultar la nvbar mobile

function configurarMenuMovil() {
  let menuMovil = document.querySelector('.mobile_nav');
  let botonHamburguesa = document.querySelector('.hamburger');

  botonHamburguesa.addEventListener('click', () => {
    menuMovil.classList.toggle('mobile_nav_hide');
  });
}

async function obtenerOfertas() {
  let respuesta = await new OfertaDAO().obtenerOfertas();
  return respuesta.datos;
}

function mostrarOfertas(ofertas) {
  let ofertasElement = document.querySelector("#listaOferta");
  ofertasElement.innerHTML = "";  // Limpiar la lista de ofertas

  ofertas.forEach(oferta => {
      let divOferta = document.createElement("div");
      divOferta.classList.add("oferta");
      
      divOferta.innerHTML = `
          <img src="${oferta.imagen != null ? oferta.imagen : "../../image/banner1.jpg"}" alt="${oferta.nombre}" class="oferta-imagen">
          <div class="oferta-info">
              <h3>${oferta.nombre}</h3>
              <p>Descuento: ${oferta.oferta}%</p>
              <button class="btn-ver-oferta" data-oferta-id="${oferta.id}" data-oferta-descuento="${oferta.oferta}">
                  Ver oferta
              </button>
          </div>
      `;
      
      // Agregar el evento para aplicar la oferta al producto correspondiente
      let btnVerOferta = divOferta.querySelector(".btn-ver-oferta");
      btnVerOferta.onclick = function() {
          aplicarOferta(oferta);
      };

      ofertasElement.appendChild(divOferta);
  });
}


