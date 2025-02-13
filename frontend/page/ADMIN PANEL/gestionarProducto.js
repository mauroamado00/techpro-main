import ProductosDAO from "../../dao/ProductoDao.js";

let idProductoActivo = null;

window.onload = async function () {
    let productos = await obtenerProductos();
    mostrarProductos(productos);
    agregarEventoForm();
};

function agregarEventoForm() {
    let formCrearElement = document.querySelector("#productoForm");
    formCrearElement.onsubmit = async (e) => {
        e.preventDefault();
        let productoNombre = formCrearElement.productoNombre.value;
        let productoStock = formCrearElement.productoStock.value;
        let productoPrecio = formCrearElement.productoPrecio.value;
        let productoImagen = formCrearElement.productoImagen.files[0];
        let accion = formCrearElement.submit.value;

        if (accion == "Modificar") {
            modificarProducto(productoNombre, productoPrecio, productoStock, productoImagen, idProductoActivo);
        } else {
            agregarproductos(productoNombre, productoPrecio, productoStock, productoImagen);
        }
    };
}

async function modificarProducto(productoNombre, productoPrecio, productoStock, productoImagen, idProductoActivo) {
    let respuesta = await new ProductosDAO().modificarProducto(productoNombre, productoPrecio, productoStock, productoImagen, idProductoActivo);
    if (respuesta.estado) {
        alert("Producto modificado");
    }
    let formCrearElement = document.querySelector("#productoForm");
    formCrearElement.reset();
    formCrearElement.submit.value = "Crear producto";
    let productos = await obtenerProductos();
    mostrarProductos(productos);
}

function activarModificar(producto) {
    let formCrearElement = document.querySelector("#productoForm");
    let productoNombre = formCrearElement.productoNombre;
    let productoPrecio = formCrearElement.productoPrecio;
    let productoStock = formCrearElement.productoStock;
    let productoSubmit = formCrearElement.submit;
    idProductoActivo = producto.id;

    // Corregí los valores que se asignan a los campos del formulario
    productoNombre.value = producto.nombre;
    productoPrecio.value = producto.precio;  // Precio debe estar aquí
    productoStock.value = producto.stock;  // Stock debe estar aquí
    productoSubmit.value = "Modificar";
}

async function agregarproductos(productoNombre, productoPrecio, productoStock, productoImagen) {
    let productodao = new ProductosDAO();
    let response = await productodao.agregarproductos(productoNombre, productoPrecio, productoStock, productoImagen);

    if (response.estado) {
        alert("Producto creado correctamente");
        location.reload();
    } else {
        alert("Error al crear el producto");
        location.reload();
    }
}

async function obtenerProductos() {
    let productosDAO = new ProductosDAO();
    let productos = await productosDAO.obtenerProductos();
    return productos.datos;
}

async function mostrarProductos() {
    // Obtén los productos usando la función del DAO
    let productosDAO = new ProductosDAO();
    let respuesta = await productosDAO.obtenerProductos();

    if (respuesta.estado && respuesta.datos) {
        let productos = respuesta.datos;
        let listElement = document.querySelector("#productList");
        listElement.innerHTML = ""; // Limpiar tabla antes de mostrar los productos

        productos.forEach(producto => {
            let productElement = document.createElement("tr");

            // Mostrar la imagen
            let productImage = document.createElement("td");
            let imgElement = document.createElement("img");
            imgElement.src = producto.imagen || "../../../image/banner1.jpg";
            imgElement.alt = `Imagen de ${producto.nombre}`;
            imgElement.style.maxWidth = "100px";
            productImage.appendChild(imgElement);

            // Mostrar el nombre del producto
            let productTitle = document.createElement("td");
            productTitle.textContent = producto.nombre;

            // Mostrar el precio
            let productPrice = document.createElement("td");
            productPrice.textContent = `$${producto.precio}`;

            // Mostrar el stock
            let productStock = document.createElement("td");
            productStock.textContent = producto.stock;

            // Crear las acciones
            let tdEliminar = document.createElement('td');
            let btnEliminar = document.createElement('button');
            btnEliminar.classList.add('btnAccion');
            btnEliminar.classList.add('Eliminar');
            btnEliminar.textContent = 'Eliminar';

            let btnModificar = document.createElement("button");
            btnModificar.classList.add("btnModificar");
            btnModificar.innerHTML = "Modificar";
            btnModificar.onclick = () => {
                activarModificar(producto);
            };

            tdEliminar.appendChild(btnModificar);

            btnEliminar.addEventListener("click", function () {
                eliminarProducto(producto.id);
            });

            tdEliminar.appendChild(btnEliminar);
            productElement.appendChild(productImage);
            productElement.appendChild(productTitle);
            productElement.appendChild(productPrice);
            productElement.appendChild(productStock);
            productElement.appendChild(tdEliminar);

            listElement.appendChild(productElement);
        });
    } else {
        let listElement = document.querySelector("#productList");
        listElement.innerHTML = "<tr><td colspan='5'>No se pudieron obtener productos.</td></tr>";
    }
}

async function eliminarProducto(id) {
    console.log("Eliminar producto con id:", id); 
    if (!id) {
        return;
    }

    let respuesta = await new ProductosDAO().eliminarProducto(id);

    if (respuesta && respuesta.estado) { 
        console.log("Producto eliminado con éxito");
        let productos = await obtenerProductos();
        mostrarProductos(productos);
    } else {
        console.error("Error al eliminar el producto", respuesta);
    }
}