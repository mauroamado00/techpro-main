import CarritoDAo from "../../dao/CarritoDao.js";

<<<<<<< HEAD
window.onload = () => {
    let productos = obtenerProductos();
    mostrarProductos(productos);
    actualizarResumen();
};

function obtenerProductos() {
=======
window.onload = ()=>{
    let productos = obtenerProductos();
    mostrarProductos(productos);
}

function obtenerProductos(){
>>>>>>> cd388766f64a9336c6f526ef1e6d3d569433fdfa
    let carritoDAO = new CarritoDAo();
    return carritoDAO.obtenerCarrito();
}

<<<<<<< HEAD
function mostrarProductos(productos) {
=======
function mostrarProductos(productos){
>>>>>>> cd388766f64a9336c6f526ef1e6d3d569433fdfa
    let tablaBody = document.querySelector("#cart-items");
    tablaBody.innerHTML = "";
    productos.forEach(producto => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${producto.nombre}</td>
            <td>${producto.precio}</td>
            <td>${producto.cantidad}</td>
<<<<<<< HEAD
            <td>${(producto.precio * producto.cantidad).toFixed(2)}</td>
=======
            <td>${producto.precio * producto.cantidad}</td>

>>>>>>> cd388766f64a9336c6f526ef1e6d3d569433fdfa
        `;
        tablaBody.appendChild(tr);

        let tdAcciones = document.createElement("td");
        let divAcciones = document.createElement("div");
        tdAcciones.appendChild(divAcciones);
<<<<<<< HEAD

=======
>>>>>>> cd388766f64a9336c6f526ef1e6d3d569433fdfa
        let btnEliminar = document.createElement("button");
        btnEliminar.innerHTML = "Quitar carrito";
        btnEliminar.onclick = () => {
            eliminarProducto(producto.id);
<<<<<<< HEAD
        };
=======
        }
>>>>>>> cd388766f64a9336c6f526ef1e6d3d569433fdfa
        divAcciones.appendChild(btnEliminar);

        let btnAumentar = document.createElement("button");
        btnAumentar.innerHTML = "Aumentar cantidad";
        btnAumentar.onclick = () => {
            aumentar(producto.id);
<<<<<<< HEAD
        };
=======
        }

>>>>>>> cd388766f64a9336c6f526ef1e6d3d569433fdfa
        divAcciones.appendChild(btnAumentar);

        let btnDisminuir = document.createElement("button");
        btnDisminuir.innerHTML = "Disminuir cantidad";
        btnDisminuir.onclick = () => {
            disminuir(producto.id);
<<<<<<< HEAD
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
=======
        }
        divAcciones.appendChild(btnDisminuir);
        tr.appendChild(tdAcciones);
        
    });



}


function eliminarProducto(id){
    let carritoDAO = new CarritoDAo();
    console.log("Eliminando producto", id);
    carritoDAO.eliminarProductoCarrito(id);

    let productos = carritoDAO.obtenerCarrito();
    mostrarProductos(productos);
}

function aumentar(id){
    let carritoDAO = new CarritoDAo();
    console.log("Aumentando cantidad", id);
    
    carritoDAO.aumentarCantidadCarrito(id);
    let productos = carritoDAO.obtenerCarrito();
    mostrarProductos(productos);
}

function disminuir(id){
    let carritoDAO = new CarritoDAo();
    console.log("Disminuyendo cantidad", id);
    
    carritoDAO.disminuirCantidadCarrito(id);
    let productos = carritoDAO.obtenerCarrito();
    mostrarProductos(productos);
}
>>>>>>> cd388766f64a9336c6f526ef1e6d3d569433fdfa
