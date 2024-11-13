import CarritoDAo from "../../dao/CarritoDao.js";
import ProductosDAO from "../../dao/ProductoDao.js";

let nombreFiltro = "";
let precioFiltro = "";
let allProductos = [];

window.onload = async () => {
    
    let productos = await obtenerProductos();
    allProductos = productos;
    mostrarProductos(productos);
    agregarEventosFiltro();

    
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

        let divProducto = document.createElement("div");
        divProducto.classList.add("producto");
        divProducto.innerHTML = `
            <img src="${producto.imagen != null ? producto.imagen : "../../image/banner1.jpg"}" alt="${producto.nombre}" class="producto-imagen">
        `;



        let divInfoProducto = document.createElement("div");
        divInfoProducto.classList.add("producto-info");
        divInfoProducto.innerHTML = `
            <p>Nombre: ${producto.nombre}</p>
            <p>Precio: $${producto.precio}</p>
            <p>Stock: ${producto.cantidad}</p>
        `;

        divProducto.appendChild(divInfoProducto);


        let btn = document.createElement("button");
        btn.classList.add("btn-add");
        btn.textContent = "Agregar";
        btn.onclick = () => {
            agregarProducto(producto);
        }
        divInfoProducto.appendChild(btn);


        datosElement.appendChild(divProducto);

    });
}


function agregarProducto(producto){
    console.log("Agregando producto", producto);
    producto.cantidad = 1;
    let carritoDAO = new CarritoDAo();
    CarritoDAo.agregarProductoCarrito(producto);
    let item = JSON.parse(localStorage.getItem('carrito'))
    document.getElementById('largo-carrito').innerText = item.length;
    
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
        document.querySelector("#precioValor").textContent = `$${precioFiltro}`;
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
