import CarritoDAo from "../../dao/CarritoDao.js";


window.onload =()=>{
    addEvent();
}



function addEvent(){
    let metodoEnvio = document.querySelector("#metodoEnvio");
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
        let nombreCompleto = confirmarCompraElement.nombreCompleto.value;
        let metodoPago = confirmarCompraElement.metodoPago.value;
        let direccion = confirmarCompraElement.direccion.value;

        confirmarCompra(nombreCompleto,metodoPago,direccion);

        
    }
}

async function confirmarCompra(nombreCompleto,metodoPago,direccion){
    let carritoDAO = new CarritoDAo();
    let respuesta = await carritoDAO.confirmarCompra()
    console.log(respuesta.menssage);


}

