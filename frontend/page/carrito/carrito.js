import CarritoDAo from "../../dao/CarritoDao.js";

window.onload = ()=>{
    let productos = obtenerProductos();
    mostrarProductos(productos);
}

function obtenerProductos(){
    let carritoDAO = new CarritoDAo();
    return carritoDAO.obtenerCarrito();
}

function mostrarProductos(productos){
    let tablaBody = document.querySelector("#cart-items");
    tablaBody.innerHTML = "";
    productos.forEach(producto => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${producto.nombre}</td>
            <td>${producto.precio}</td>
            <td>${producto.cantidad}</td>
            <td>${producto.precio * producto.cantidad}</td>

        `;
        tablaBody.appendChild(tr);

        let tdAcciones = document.createElement("td");
        let divAcciones = document.createElement("div");
        tdAcciones.appendChild(divAcciones);
        let btnEliminar = document.createElement("button");
        btnEliminar.innerHTML = "Quitar carrito";
        btnEliminar.onclick = () => {
            eliminarProducto(producto.id);
        }
        divAcciones.appendChild(btnEliminar);

        let btnAumentar = document.createElement("button");
        btnAumentar.innerHTML = "Aumentar cantidad";
        btnAumentar.onclick = () => {
            aumentar(producto.id);
        }

        divAcciones.appendChild(btnAumentar);

        let btnDisminuir = document.createElement("button");
        btnDisminuir.innerHTML = "Disminuir cantidad";
        btnDisminuir.onclick = () => {
            disminuir(producto.id);
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