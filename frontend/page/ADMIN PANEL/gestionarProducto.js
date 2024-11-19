import ProductosDAO from "../../dao/ProductoDao.js";

window.onload = async function() {
    let productos = await obtenerProductos();
    mostrarProductos(productos);
    agregarEventoForm();
};


function agregarEventoForm() {

    let formCrearElement = document.querySelector("#productoForm");
    formCrearElement.onsubmit = async (e) => {
        e.preventDefault();
        let productoNombre = formCrearElement.productoNombre.value;
        let productoPrecio = formCrearElement.productoPrecio.value;
        let productoStock = formCrearElement.productoStock.value;
        let productoImagen = formCrearElement.productoImagen.files[0];

        agregarproductos(productoNombre, productoPrecio, productoStock, productoImagen);
    };
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
    console.log(productos);
    return productos.datos;
}

function mostrarProductos(productos) {
    let listElement = document.querySelector("#productList");
    listElement.innerHTML = ""; 

    productos.forEach(producto => {
        let productElement = document.createElement("tr");
    
        let productImage = document.createElement("td");
        let imgElement = document.createElement("img");
        imgElement.src = producto.imagen || "../../../image/banner1.jpg"; 
        imgElement.alt = `Imagen de ${producto.nombre}`;
        imgElement.style.maxWidth = "100px"; 
        productImage.appendChild(imgElement);        
    
        let productTitle = document.createElement("td");
        productTitle.textContent = producto.nombre;
    
        let productPrice = document.createElement("td");
        productPrice.textContent = `$${producto.precio}`;
    
        let productStock = document.createElement("td");
        productStock.textContent = producto.stock;
    
        let tdEliminar = document.createElement('td');
        let btnEliminar = document.createElement('button');
        
        btnEliminar.classList.add('btnAccion');        
        btnEliminar.classList.add('Eliminar'); 
        btnEliminar.textContent = 'Eliminar';
    
        btnEliminar.addEventListener("click", function() {
            console.log("ID del producto a eliminar:", producto.id);  
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
    
}

async function eliminarProducto(id) {
    console.log("Eliminar producto con id:", id); 
    if (!id) {
        console.error("El ID es undefined o no válido.");
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

document.getElementById("logout").addEventListener("click", cerrarSesion);

async function cerrarSesion() {

    localStorage.removeItem("token");
    localStorage.removeItem("usuario");

    alert("Has cerrado sesión. Redirigiendo al inicio de sesión.");
    window.location.href = "/techpro-main/frontend/page/index/index.html";
}

