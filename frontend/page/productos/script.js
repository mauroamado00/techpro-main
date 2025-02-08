import CarritoDAo from "../../dao/CarritoDao.js";
import ProductosDAO from "../../dao/ProductoDao.js";


window.onload = async () => {
    let productos = await obtenerProductos();
    mostrarProductos(productos);
}

async function obtenerProductos() {
    let respuesta = await new ProductosDAO().obtenerProductos();
    return respuesta.datos;
}

function mostrarProductos(productos) {
    let datosElement = document.querySelector("#datos");
    datosElement.innerHTML = "";
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
            ${producto.stock > 0 ? `<p>Stock: ${producto.stock}</p>` : "Sin Stock"}
        `;

        divProducto.appendChild(divInfoProducto);

        let btn = document.createElement("button");
        btn.classList.add("btn-add");
        btn.textContent = "Agregar";
        btn.onclick = () => {
            agregarProducto(producto);
        }
        if(producto.stock > 0 ){divInfoProducto.appendChild(btn)};

        datosElement.appendChild(divProducto);
    });
}

function agregarProducto(producto) {
    console.log("Agregando producto", producto);
    producto.cantidad = 1;
    let carritoDAO = new CarritoDAo();
    carritoDAO.agregarProductoCarrito(producto); 
    let item = JSON.parse(localStorage.getItem('carrito')) || [];
    document.getElementById('largo-carrito').innerText = item.length;
}
