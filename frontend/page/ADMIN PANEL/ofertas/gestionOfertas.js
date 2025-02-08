import OfertaDAO from "../../../dao/OfertasDao.js";
import ProductosDAO from "../../../dao/ProductoDao.js";

window.onload = async function(){
    let productos = await obtenerProductos();
    mostrarProductos(productos);
    agregarEventoForm();
}

function agregarEventoForm(){
    let formCrearElement = document.querySelector("#formCrear");
    formCrearElement.onsubmit = async(e)=>{
        e.preventDefault();
        let oferta = formCrearElement.offer.value;
        let fechaInicio = formCrearElement.startDate.value;
        let fechaFin = formCrearElement.endDate.value;
        let idProducto = formCrearElement.productId.value;
        agregarOferta(oferta,fechaInicio,fechaFin,idProducto);

    }
}

async function agregarOferta(oferta, fechaInicio, fechaFin, idProducto) {
    let ofertaDAO = new OfertaDAO();
    let response = await ofertaDAO.agregarOferta(oferta, fechaInicio, fechaFin, idProducto);

    if (response.estado) {
        alert("Oferta creada correctamente");
        console.log("Recargando la página...");
        location.reload();
    } else {
        alert("Error al crear la oferta");
    }
}

async function eliminarOferta(idOferta) {
    let ofertaDAO = new OfertaDAO(); 
    let response = await ofertaDAO.eliminarOferta(idOferta);  
console.log(response);
    if (response.estado) {
        alert("Oferta eliminada correctamente");
        location.reload();  
    } else {
        alert(response.mensaje); 
    }
}

async function obtenerProductos() {
    let productosDAO = new ProductosDAO();
    let productos = await productosDAO.obtenerProductos();
    console.log(productos);
    return productos.datos;
    
}

function mostrarProductos(productos) {
    let listElement = document.querySelector("#product-list");
    listElement.innerHTML = ""; 

    productos.forEach(producto => {
        let productElement = document.createElement("div");
        productElement.className = "product";

     
        let productTitle = document.createElement("h3");
        productTitle.textContent = producto.nombre;

        
        let productImage = document.createElement("img");
        let imagenSrc = producto.imagen;

        productImage.src = imagenSrc;
        productImage.alt = `Imagen de ${producto.nombre}`;
        let productPrice = document.createElement("p");
        productPrice.textContent = `Precio: $${producto.precio}`;

        productElement.appendChild(productTitle);
        productElement.appendChild(productImage);
        productElement.appendChild(productPrice);
        listElement.appendChild(productElement);

        productElement.onclick = () => {
            let inputElement = document.querySelector("#product-id");
            inputElement.value = producto.id;
        };
    });
}

document.querySelector('.hamburger').addEventListener('click', () => {
    const menu = document.querySelector('.navbar-menu');
    menu.classList.toggle('active');
});

document.getElementById("logout").addEventListener("click", cerrarSesion);

async function cerrarSesion() {

    localStorage.removeItem("token");
    localStorage.removeItem("usuario");

    alert("Has cerrado sesión. Redirigiendo al inicio de sesión.");
    window.location.href = "/techpro-main/frontend/page/index/index.html";
}

