import ProductosDAO from "../../dao/ProductoDao.js";

window.onload = ()=>{
    agregarEvento();
}

function agregarEvento(){

    let productoForm = document.querySelector("#productoForm");
    productoForm.onsubmit = async (e) => {
        e.preventDefault();
        console.log("dddd");
        let nombre = productoForm.productoNombre.value;
        let stock = productoForm.productoStock.value;
        let precio = productoForm.productoPrecio.value;
        let imagen = productoForm.productoImagen.files[0];
        agregarProducto(nombre,stock,precio,imagen);
    }


    let inputFile = document.querySelector("#productoImagen");
    let imagenPreview = document.querySelector("#imagenPreview");

    inputFile.onchange = (e) => {
        let  imagen = inputFile.files[0];
        let url = URL.createObjectURL(imagen);

        imagenPreview.src = url;
    }
       

}

async function agregarProducto(nombre,stock,precio,imagen){
    let respuesta = await new ProductosDAO().agregarproductos(nombre,stock,precio,imagen);
    console.log(respuesta);
    if(respuesta.estado){
        alert("Producto agregado correctamente");
    }else{
        alert("Error al agregar el producto");
    }

}