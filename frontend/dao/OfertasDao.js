import Origen from "./origen.js";

export default class ofertas{

    async verproductos(){

        let url = Origen+"/backend/CONTROLLER/ofertas_controller.php?function=ver";
        let respuestaConsulta = await fetch(url,config);
        let respuesta = await respuestaConsulta.json();   
    }


    async eliminarproductos(){

        let url = Origen+"/backend/CONTROLLER/ofertas_controller.php?function=modificar";
        let respuestaConsulta = await fetch(url,config);
        let respuesta = await respuestaConsulta.json();        

    }

    async buscarproductos(){

        let url = Origen+"/backend/CONTROLLER/ofertas_controller.php?function=eliminar";
        let respuestaConsulta = await fetch(url,config);
        let respuesta = await respuestaConsulta.json();        

    }

    async obtenerOfertas(){
            
        let url =  Origen+"/backend/CONTROLLER/ofertas_controller.php?function=obtener";
        let respuestaConsulta = await fetch(url);
        let respuesta = await respuestaConsulta.json();
        return respuesta;
}


}