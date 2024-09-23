let nombreFiltro = "";
let precioFiltro = "";
let allProductos = [];

window.onload = () => {
    let productos = obtenerProductos();
    allProductos = productos;
    mostrarProductos(productos);
    agregarEventosFiltro();
}

function obtenerProductos() {
    const productos = [
        { nombre: 'Smartphone', precio: 699.99, stock: 50, imagen: '' },
        { nombre: 'Laptop', precio: 999.99, stock: 30 },
        { nombre: 'Auriculares', precio: 199.99, stock: 100 },
        { nombre: 'Smartwatch', precio: 249.99, stock: 75 },
        { nombre: 'Tablet', precio: 499.99, stock: 40 },
        { nombre: 'Teclado mecánico', precio: 89.99, stock: 150 },
        { nombre: 'Ratón óptico', precio: 29.99, stock: 200 },
        { nombre: 'Monitor 24"', precio: 199.99, stock: 20 },
        { nombre: 'Cámara web', precio: 79.99, stock: 60 },
        { nombre: 'Proyector', precio: 299.99, stock: 25 }
    ];

    return productos;
}


function mostrarProductos(productos) {
    let datosElement = document.querySelector("#datos");
    datosElement.innerHTML = "";
    productos.forEach(producto => {
        datosElement.innerHTML += `
        <div class="producto">
        <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-imagen">
        <div class="producto-info">
            <p>ID: ${producto.id}</p>
            <p>Nombre: ${producto.nombre}</p>
            <p>Precio: $${producto.precio.toFixed(2)}</p>
            <p>Stock: ${producto.stock}</p>
            <button>Ver Más</button>
        </div>
    </div>
    `;
    });
}

function agregarEventosFiltro() {
    let inputNombre = document.querySelector("#filtroNombre");
    let inputPrecio = document.querySelector("#filtroPrecio");

    inputNombre.onkeyup = () => {
        nombreFiltro = inputNombre.value.toLowerCase();
        filtrarProductos();
    }

    inputPrecio.oninput = () => {
        precioFiltro = parseFloat(inputPrecio.value); // Convierte a número o asigna Infinity si está vacío
        document.querySelector("#precioValor").textContent = `$${precioFiltro}`; // Actualiza el texto que muestra el valor
        filtrarProductos();
    }
}

function filtrarProductos() {
    let productosFiltrados = allProductos.filter(producto => {
        let nombreCoincide = producto.nombre.toLowerCase().startsWith(nombreFiltro);
        let precioCoincide = producto.precio <= precioFiltro;

        return nombreCoincide && precioCoincide; 
    });

    mostrarProductos(productosFiltrados); 
}

// slides

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
