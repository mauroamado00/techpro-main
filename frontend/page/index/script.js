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
