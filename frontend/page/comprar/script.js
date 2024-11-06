import CarritoDAo from "../../dao/CompraDao";

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
        let metodoEnvio = confirmarCompraElement.metodoEnvio.value;
        let metodoPago = confirmarCompraElement.metodoPago.value;
        let direccion = confirmarCompraElement.direccion.value;
        confirmarCompra(metodoEnvio,metodoPago,direccion);

        
    }
}

async function confirmarCompra(metodoEnvio,metodoPago,direccion){
    let carritoDAO = new CarritoDAo();
    let respuesta = await carritoDAO.confirmarCompra(direccion,metodoEnvio,metodoPago);
    console.log(respuesta.menssage);


}

