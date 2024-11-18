import Origen from "./origen.js";

export default class OfertaDAO{

    async agregarOferta(oferta,fechaInicio,fechaFin,idProducto){
        let url = Origen + "/backend/CONTROLLER/ofertas_controller.php?function=crear";
        let formData = new FormData();
        formData.append("oferta",oferta);
        formData.append("fechaInicio",fechaInicio);
        formData.append("fechaFin",fechaFin);
        formData.append("idProducto",idProducto);
        let response = await fetch(url,{
            method: "POST",
            body: formData
        });
        let responseData = await response.json();
        return responseData;
      
    }

    async obtenerOfertas(){
        let url = Origen + "/backend/CONTROLLER/ofertas_controller.php?function=obtenerOfertas";
        let formData = new FormData();
        formData.append("fecha", new Date().toISOString().split('T')[0].replace(/-/g, '/'));
        let config = {
            method: "POST",
            body: formData
        }
        let response = await fetch(url,config);
        let responseData = await response.json();
        return responseData;
    }
    

}

