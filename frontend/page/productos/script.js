import ProductosDAO from "../../dao/ProductoDao.js";
import productos from "../../dao/ProductoDao.js";

let nombreFiltro = "";
let precioFiltro = "";
let allProductos = [];

window.onload = async () => {
    let productos = await obtenerProductos();
    allProductos = productos;
    mostrarProductos(productos);
    agregarEventosFiltro();
    agregarEvento();
}

async function obtenerProductos() {
    let respuesta = await new ProductosDAO().obtenerProductos();
    return respuesta.datos;
}



function mostrarProductos(productos) {
    let datosElement = document.querySelector("#datos");
    datosElement.innerHTML = "";
    console.log(productos);
    productos.forEach(producto => {
        datosElement.innerHTML += `
        <div class="producto">
        <img src="${producto.imagen != null ? producto.imagen : "../../image/banner1.jpg"}" alt="${producto.nombre}" class="producto-imagen">
        <div class="producto-info">
          
            <p>Nombre: ${producto.nombre}</p>
            <p>Precio: $${producto.precio}</p>
            <p>Stock: ${producto.stock}</p>
            <button class="btn-add">Agregar</button>
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
        precioFiltro = parseFloat(inputPrecio.value);
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

