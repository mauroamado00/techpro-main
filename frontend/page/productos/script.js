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
    
    let carritoDAO = new CarritoDAo();
    let item = JSON.parse(localStorage.getItem('carrito')) || [];

    // Verificar si el producto ya está en el carrito
    let existe = item.some(p => p.id === producto.id);

    if (existe) {
        mostrarMensaje("⚠️ El producto ya está en el carrito.", "error");
    } else {
        producto.cantidad = 1;
        carritoDAO.agregarProductoCarrito(producto);
        item = JSON.parse(localStorage.getItem('carrito')) || [];
        document.getElementById('largo-carrito').innerText = item.length;
        mostrarMensaje("✅ Producto agregado con éxito.", "success");
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

// Estilos para móviles
const estilo = document.createElement("style");
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

