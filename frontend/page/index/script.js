let slideIndex = 0;
const slides = document.querySelectorAll('.banner-slide');
const totalSlides = slides.length;

function showSlide(index) {
  // Asegurarse de que el índice esté en el rango correcto
  if (index >= totalSlides) {
    slideIndex = 0;
  } else if (index < 0) {
    slideIndex = totalSlides - 1;
  } else {
    slideIndex = index;
  }

  // Ocultar todas las diapositivas
  slides.forEach((slide, i) => {
    slide.style.display = i === slideIndex ? 'block' : 'none';
  });
}

// Avanzar o retroceder en las diapositivas
function moveSlide(step) {
  showSlide(slideIndex + step);
}

// Mostrar la primera diapositiva al cargar
showSlide(slideIndex);

// Cambiar diapositiva automáticamente cada 5 segundos
setInterval(() => {
  moveSlide(1);
}, 5000);

// desplegar la nvbar mobile

document.addEventListener("DOMContentLoaded", function() {
  const mobileNav = document.querySelector('.mobile_nav');
  const hamburger = document.querySelector('.hamburger');

  // Abre y cierra el menú móvil al hacer clic en la hamburguesa
  hamburger.addEventListener('click', () => {
      mobileNav.classList.toggle('active'); // Cambia la clase para mostrar/ocultar el menú
  });

  // Cierra el menú al hacer clic en cualquier enlace
  const navLinks = document.querySelectorAll('.mobile_nav_link');
  navLinks.forEach(link => {
      link.addEventListener('click', () => {
          mobileNav.classList.remove('active'); // Elimina la clase para ocultar el menú
      });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile_nav');

  hamburger.addEventListener('click', function() {
      mobileNav.classList.toggle('mobile_nav_hide'); // Alterna la clase para mostrar/ocultar
  });
});
