import productoDAO from "../../dao/ProductoDao.js";

window.onload = async () => {
    let productos = await obtenerProductos();
    mostrarProductos(productos);
    agregarEventosFiltro();
   
}

async function mostrarProductos(productos) {
    const contenedorProductos = document.getElementById('lista-productos');
    
    productos.forEach(producto => {
        const productoElemento = document.createElement('div');
        productoElemento.classList.add('producto');
        
        productoElemento.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <p>Precio: $${producto.precio}</p>
            <button>Editar</button>
            <button>Eliminar</button>
        `;
        
        contenedorProductos.appendChild(productoElemento);
    });
}
