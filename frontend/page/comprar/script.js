import CarritoDAo from "../../dao/CarritoDao.js";
<<<<<<< HEAD
=======

>>>>>>> cd388766f64a9336c6f526ef1e6d3d569433fdfa

window.onload =()=>{
    agregarevento();
}

<<<<<<< HEAD
function agregarevento(){
=======


function addEvent(){
>>>>>>> cd388766f64a9336c6f526ef1e6d3d569433fdfa
    let metodoEnvio = document.querySelector("#metodoEnvio");
    let metodoPago = document.querySelector("#metodoPago");
    let confirmarCompraElement = document.querySelector("#realize-order");

  metodoEnvio.onchange = () => {
        let valor = metodoEnvio.value;
        if(valor == "direccion"){
            confirmarCompraElement.classList.add("tipoEnvio");
        }else{
            confirmarCompraElement.classList.remove("tipoEnvio");

        }
        
    }

    confirmarCompraElement.onsubmit = (e) => {
        e.preventDefault();
<<<<<<< HEAD
        let nombrecompleto = confirmarCompraElement.nombrecompleto.value;
        let ciudad = confirmarCompraElement.ciudad.value;
        let numerodetelefono = confirmarCompraElement.numerodetelefono.value;
        let email = confirmarCompraElement.email.value;
        let metodoEnvio = confirmarCompraElement.metodoEnvio.value;
        let direccion = confirmarCompraElement.direccion.value;
        let metodoPago = confirmarCompraElement.direccion.value;
        confirmarCompra(nombrecompleto,ciudad,numerodetelefono,email,metodoEnvio,direccion,metodoPago);
=======
        let nombreCompleto = confirmarCompraElement.nombreCompleto.value;
        let metodoPago = confirmarCompraElement.metodoPago.value;
        let direccion = confirmarCompraElement.direccion.value;

        confirmarCompra(nombreCompleto,metodoPago,direccion);

>>>>>>> cd388766f64a9336c6f526ef1e6d3d569433fdfa
        
    }
}

<<<<<<< HEAD
async function confirmarCompra(nombrecompleto,ciudad,numerodetelefono,email,metodoEnvio,direccion,metodoPago){
    let carritoDAO = new CarritoDAo();
    let respuesta = await carritoDAO.confirmarCompra(nombrecompleto,ciudad,numerodetelefono,email,metodoEnvio,direccion,metodoPago)
=======
async function confirmarCompra(nombreCompleto,metodoPago,direccion){
    let carritoDAO = new CarritoDAo();
    let respuesta = await carritoDAO.confirmarCompra()
>>>>>>> cd388766f64a9336c6f526ef1e6d3d569433fdfa
    console.log(respuesta.menssage);

}



