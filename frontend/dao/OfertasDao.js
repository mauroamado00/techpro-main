export default class ofertas{

    async verproductos(){

        let url = "http://localhost/techpro-main/backend/CONTROLLER/ofertas_controller.php?function=ver";
        let respuestaConsulta = await fetch(url,config);
        let respuesta = await respuestaConsulta.json();   
    }


    async eliminarproductos(){

        let url = "http://localhost/techpro-main/backend/CONTROLLER/ofertas_controller.php?function=modificar";
        let respuestaConsulta = await fetch(url,config);
        let respuesta = await respuestaConsulta.json();        

    }

    async buscarproductos(){

        let url = "http://localhost/techpro-main/backend/CONTROLLER/ofertas_controller.php?function=eliminar";
        let respuestaConsulta = await fetch(url,config);
        let respuesta = await respuestaConsulta.json();        

    }

}