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
  ofertasElement.innerHTML = "";
  console.log(ofertas);
  ofertas.forEach(oferta => {

      let divOferta = document.createElement("div");
      divOferta.classList.add("oferta");
      divOferta.innerHTML = `
          <img src="${oferta.imagen != null ? oferta.imagen : "../../image/banner1.jpg"}" alt="${oferta.nombre}" class="oferta-imagen">
      `;
      console.log("Imagen de la oferta:", oferta.imagen);


      let divInfoOferta = document.createElement("div");
      divInfoOferta.classList.add("oferta-info");
      let precio = parseFloat(oferta.precio) - (parseFloat(oferta.precio) * (parseFloat(oferta.oferta) / 100));
      divInfoOferta.innerHTML = `
          <p>Nombre: ${oferta.nombre}</p>
          <p>Precio: $${oferta.precio}</p>
          <p>Descuento: ${oferta.oferta}%</p>
          <p>Precio con oferta: $${precio}</p>
      `;

      divOferta.appendChild(divInfoOferta);

     

      ofertasElement.appendChild(divOferta);

  });
}
