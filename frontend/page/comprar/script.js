import CarritoDAo from "../../dao/CarritoDao.js";

window.onload =()=>{
    agregarevento();
}

function agregarevento(){
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
        let nombrecompleto = confirmarCompraElement.nombrecompleto.value;
        let ciudad = confirmarCompraElement.ciudad.value;
        let numerodetelefono = confirmarCompraElement.numerodetelefono.value;
        let email = confirmarCompraElement.email.value;
        let metodoEnvio = confirmarCompraElement.metodoEnvio.value;
        let direccion = confirmarCompraElement.direccion.value;
        let metodoPago = confirmarCompraElement.direccion.value;
        confirmarCompra(nombrecompleto,ciudad,numerodetelefono,email,metodoEnvio,direccion,metodoPago);
        
    }
}

async function confirmarCompra(nombrecompleto,ciudad,numerodetelefono,email,metodoEnvio,direccion,metodoPago){
    let carritoDAO = new CarritoDAo();
    let respuesta = await carritoDAO.confirmarCompra(nombrecompleto,ciudad,numerodetelefono,email,metodoEnvio,direccion,metodoPago)
    console.log(respuesta.menssage);

}



