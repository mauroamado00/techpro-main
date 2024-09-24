let nombreFiltro = "";
let precioFiltro = "";
let allProductos = [];

window.onload = () => {
    let productos = obtenerProductos();
    allProductos = productos;
    mostrarProductos(productos);
    agregarEventosFiltro();
}

function obtenerProductos() {
    const productos = [
        { nombre: 'Smartphone', precio: 699.99, stock: 50, imagen: 'https://smartphonecash.es/wp-content/uploads/2023/07/iphone-14-pro-max-morado-oscuro-01.jpg' },
        { nombre: 'Laptop', precio: 999.99, stock: 30, imagen: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6583/6583789_sd.jpg;maxHeight=640;maxWidth=550;format=webp'},
        { nombre: 'Auriculares', precio: 199.99, stock: 100, imagen: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/665589cb-53f9-4d3e-a86d-739d85408620.jpg;maxHeight=640;maxWidth=550;format=webp' },
        { nombre: 'Smartwatch', precio: 249.99, stock: 75, imagen: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6584/6584970_sd.jpg;maxHeight=640;maxWidth=550;format=webp' },
        { nombre: 'Tablet', precio: 499.99, stock: 40, imagen: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6566/6566195_sd.jpg;maxHeight=640;maxWidth=550;format=webp' },
        { nombre: 'Teclado mecánico', precio: 89.99, stock: 150, imagen: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6412/6412548_sd.jpg;maxHeight=640;maxWidth=550;format=webp' },
        { nombre: 'Ratón óptico', precio: 29.99, stock: 200, imagen: 'https://thumb.pccomponentes.com/w-530-530/articles/19/191822/atreo-web-000.jpg' },
        { nombre: 'Monitor 24"', precio: 199.99, stock: 20, imagen: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/08fe3bbf-1472-4f99-8295-c24b8a375265.jpg;maxHeight=640;maxWidth=550;format=webp' },
        { nombre: 'Cámara web', precio: 79.99, stock: 60, imagen: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6550/6550199_sd.jpg;maxHeight=640;maxWidth=550;format=webp' },
        { nombre: 'Proyector', precio: 299.99, stock: 25, imagen: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/74f4a228-d58d-44d8-861f-f86080d43ecf.jpg;maxHeight=640;maxWidth=550;format=webp' }
    ];

    return productos;
}


function mostrarProductos(productos) {
    let datosElement = document.querySelector("#datos");
    datosElement.innerHTML = "";
    productos.forEach(producto => {
        datosElement.innerHTML += `
        <div class="producto">
        <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-imagen">
        <div class="producto-info">
            <p>ID: ${producto.id}</p>
            <p>Nombre: ${producto.nombre}</p>
            <p>Precio: $${producto.precio.toFixed(2)}</p>
            <p>Stock: ${producto.stock}</p>
            <button>Ver Más</button>
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
