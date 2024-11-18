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

async function agregarOferta(oferta,fechaInicio,fechaFin,idProducto){
    let ofertaDAO = new OfertaDAO();
    let response = await ofertaDAO.agregarOferta(oferta,fechaInicio,fechaFin,idProducto);
    if(response.estado){
        alert("Oferta creada correctamente");
    }else{
        alert("Error al crear la oferta");
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
    listElement.innerHTML = ""; // Limpiar la lista de productos
    
    const validExtensions = ['jpg', 'jpeg', 'png', 'gif']; // Extensiones válidas

    productos.forEach(producto => {
        let productElement = document.createElement("div");
        productElement.className = "product";

        // Título del producto
        let productTitle = document.createElement("h3");
        productTitle.textContent = producto.nombre;

        // Imagen del producto
        let productImage = document.createElement("img");
        let imagenSrc = producto.imagen;

        if (imagenSrc && imagenSrc.includes('.')) {
            productImage.src = `http://localhost/images/${imagenSrc}`;
        } else {
            productImage.src = "../../../image/banner1.jpg"; // Imagen predeterminada
        }
        

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
