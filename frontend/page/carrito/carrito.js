import CarritoDAo from "../../dao/CarritoDao.js";

window.onload = () => {
    let productos = obtenerProductos();
    mostrarProductos(productos);
    actualizarResumen();
};

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

// Funciones para modificar el carrito y actualizar los productos mostrados
function eliminarProducto(id) {
    let carritoDAO = new CarritoDAo();
    console.log("Eliminando producto", id);
    carritoDAO.eliminarProductoCarrito(id);
    actualizarProductos();
}

function aumentar(id) {
    let carritoDAO = new CarritoDAo();
    console.log("Aumentando cantidad", id);
    carritoDAO.aumentarCantidadCarrito(id);
    actualizarProductos();
}

function disminuir(id) {
    let carritoDAO = new CarritoDAo();
    console.log("Disminuyendo cantidad", id);
    carritoDAO.disminuirCantidadCarrito(id);
    actualizarProductos();
}

// Función para actualizar el carrito y el resumen
function actualizarProductos() {
    let productos = obtenerProductos();
    mostrarProductos(productos);
    actualizarResumen();
}

// Función para calcular el subtotal
function calcularSubtotal() {
    let productos = obtenerProductos();
    let subtotal = 0;
    productos.forEach(producto => {
        subtotal += producto.precio * producto.cantidad;
    });
    return subtotal;
}

// Función para calcular el total con un impuesto o descuento, por ejemplo
function calcularTotal() {
    const subtotal = calcularSubtotal();
    const impuesto = 0.15; // 15% de impuesto
    const total = subtotal * (1 + impuesto);
    return total;
}

// Función para actualizar el DOM
function actualizarResumen() {
    const subtotal = calcularSubtotal();
    const total = calcularTotal();

    document.getElementById("subtotal").textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById("total").textContent = `$${total.toFixed(2)}`;
}

document.getElementById("confirmarcompra").addEventListener("click", () => {
    // Redirigir a finalizarcompra.html
    window.location.href = "../comprar/finalizarcompra.html";
});
