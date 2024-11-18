import CarritoDAo from "../../dao/CarritoDao.js";
import ProductosDAO from "../../dao/ProductoDao.js";

window.onload = () => {
    configurarMenuMovil();
    let productos = obtenerProductos();
    mostrarProductos(productos);
    actualizarResumen();
};

function configurarMenuMovil() {
    let menuMovil = document.querySelector('.mobile_nav');
    let botonHamburguesa = document.querySelector('.hamburger');
  
    botonHamburguesa.addEventListener('click', () => {
      menuMovil.classList.toggle('mobile_nav_hide');
    });
}
  
function obtenerProductos() {
    let carritoDAO = new CarritoDAo();
    return carritoDAO.obtenerCarrito();
    
}

function mostrarProductos(productos) {
    let tablaBody = document.querySelector("#cart-items");
    tablaBody.innerHTML = "";
    productos.forEach(producto => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${producto.nombre}</td>
            <td>${producto.precio}</td>
            <td>${producto.cantidad}</td>
            <td>${(producto.precio * producto.cantidad).toFixed(2)}</td>
        `;
        tablaBody.appendChild(tr);

        let tdAcciones = document.createElement("td");
        let divAcciones = document.createElement("div");
        tdAcciones.appendChild(divAcciones);
        let btnEliminar = document.createElement("button");
        btnEliminar.innerHTML = "Quitar carrito";
        btnEliminar.onclick = () => {
            eliminarProducto(producto.id);
        };
        divAcciones.appendChild(btnEliminar);

        let btnAumentar = document.createElement("button");
        btnAumentar.innerHTML = "Aumentar cantidad";
        btnAumentar.onclick = () => {
            aumentar(producto.id);
        };
        divAcciones.appendChild(btnAumentar);

        let btnDisminuir = document.createElement("button");
        btnDisminuir.innerHTML = "Disminuir cantidad";
        btnDisminuir.onclick = () => {
            disminuir(producto.id);
        };
        divAcciones.appendChild(btnDisminuir);

        tr.appendChild(tdAcciones);
    });
}

function eliminarProducto(id) {
    let carritoDAO = new CarritoDAo();
    console.log("Eliminando producto", id);
    carritoDAO.eliminarProductoCarrito(id);
    actualizarProductos();
}

function aumentar(id) {
    let carritoDAO = new CarritoDAo();
    let productos = obtenerProductos();
    let producto = productos.find(p => p.id === id);

    if (producto.cantidad < producto.stock) {
        console.log("Aumentando cantidad", id);
        carritoDAO.aumentarCantidadCarrito(id);
        actualizarProductos();
    } else {
        alert(`No puedes agregar más unidades de ${producto.nombre}. Stock máximo alcanzado.`);
    }

}

function disminuir(id) {
    let carritoDAO = new CarritoDAo();
    console.log("Disminuyendo cantidad", id);
    carritoDAO.disminuirCantidadCarrito(id);
    actualizarProductos();
}

function actualizarProductos() {
    let productos = obtenerProductos();
    mostrarProductos(productos);
    actualizarResumen();
}

function calcularTotal() {
    let productos = obtenerProductos();
    let subtotal = 0;
    productos.forEach(producto => {
        subtotal += producto.precio * producto.cantidad;
    });
    return subtotal;
}

function actualizarResumen() {
    const total = calcularTotal();
    document.getElementById("total").textContent = `$${total.toFixed(2)}`;
}

function verificarYRedirigir() {

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    if (carrito.length === 0) {
        alert("Tu carrito está vacío. Agrega productos para continuar con la compra.");
        window.location.href = '../productos/productos.html'
    } else {
        window.location.href = "../comprar/finalizarcompra.html";
    }
}

document.getElementById("confirmarcompra").addEventListener("click", verificarYRedirigir);
