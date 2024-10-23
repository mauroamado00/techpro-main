import Origen from "./origen.js";

export default class ProductosDAO{

    async verproductos(){

        let url = Origen+"/backend/CONTROLLER/productos_controlador.php?function=ver";
        let respuestaConsulta = await fetch(url,config);
        let respuesta = await respuestaConsulta.json();   
    }


    async eliminarproductos(){

        let url = Origen+"/backend/CONTROLLER/productos_controlador.php?function=eliminar";
        let respuestaConsulta = await fetch(url,config);
        let respuesta = await respuestaConsulta.json();        

    }

    async agregarproductos(nombre,stock,precio,imagen){

       
        let url =  Origen+"/backend/CONTROLLER/productos_controlador.php?function=agregar";
        let formData = new FormData();
        formData.append("nombre", nombre);
        formData.append("stock", stock);
        formData.append("precio", precio);
        formData.append("imagen", imagen);

        let config = {

            method: "POST",
            body:formData
        }


        let respuestaConsulta = await fetch(url,config);
        let respuesta = await respuestaConsulta.json();  
        return respuesta;    

    }

    async obtenerProductos(){
            
            let url =  Origen+"/backend/CONTROLLER/productos_controlador.php?function=obtener";
            let respuestaConsulta = await fetch(url);
            let respuesta = await respuestaConsulta.json();
            return respuesta;
    }


}