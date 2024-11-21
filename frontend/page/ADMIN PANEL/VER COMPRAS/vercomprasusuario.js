window.onload = async function(){
    let productos = await obtenerProductos();
    mostrarProductos(productos);
    agregarEventoForm();
}
