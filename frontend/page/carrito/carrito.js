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
        mostrarMensaje("⚠️ Tu carrito está vacío. Agrega productos para continuar.", "error");
    } else {
        window.location.href = "../comprar/finalizarcompra.html";
    }
}

function mostrarMensaje(texto, tipo) {
    let mensaje = document.createElement("p");
    mensaje.innerText = texto;
    mensaje.classList.add("mensaje", tipo); 

    document.body.appendChild(mensaje);

    // Animación de aparición
    setTimeout(() => {
        mensaje.classList.add("mostrar");
    }, 100);

    // Animación de desaparición
    setTimeout(() => {
        mensaje.classList.remove("mostrar");
        setTimeout(() => mensaje.remove(), 500);
    }, 3000);
}

// Agregar estilos si no existen
if (!document.querySelector("#mensaje-estilos")) {
    const estilo = document.createElement("style");
    estilo.id = "mensaje-estilos";
    estilo.innerHTML = `
        .mensaje {
            position: fixed;
            bottom: 10%;
            left: 50%;
            transform: translateX(-50%);
            padding: 12px 18px;
            border-radius: 12px;
            font-size: 14px;
            font-weight: bold;
            max-width: 90%;
            text-align: center;
            opacity: 0;
            transition: opacity 0.4s ease-in-out, bottom 0.4s ease-in-out;
            z-index: 1000;
        }
        .mensaje.mostrar {
            opacity: 1;
            bottom: 12%;
        }
        .mensaje.success {
            background-color: #4CAF50;
            color: white;
        }
        .mensaje.error {
            background-color: #FF5733;
            color: white;
        }
    `;
    document.head.appendChild(estilo);
}


document.getElementById("confirmarcompra").addEventListener("click", verificarYRedirigir);