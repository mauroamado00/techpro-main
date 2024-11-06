import Origen from "./origen.js";
//import usuarios from "../src/dao/script.js";

export default class usuario{

    async agregarusuario(isadmin, nombre, apellido, email, password) {
        let url = Origen + "/backend/CONTROLLER/usuario_controlador.php?function=agregar";
        let formData = new FormData();
        formData.append("isadmin", isadmin);
        formData.append("nombre", nombre);
        formData.append("apellido", apellido);
        formData.append("email", email);
        formData.append("password", password);
    
        let config = {
            method: "POST",
            body: formData
        };
    
        let respuestaConsulta = await fetch(url, config);
        let respuesta = await respuestaConsulta.json();
        
        return respuesta; 
    }
    

    async eliminarusuario(){

        let url = Origen+"/backend/CONTROLLER/usuario_controlador.php?function=eliminar";
        let respuestaConsulta = await fetch(url,config);
        let respuesta = await respuestaConsulta.json();        

    }

    async obtenerusuarios(){

        let url = Origen+"/backend/CONTROLLER/usuario_controlador.php?function=obtener";
        let respuestaConsulta = await fetch(url,config);
        let respuesta = await respuestaConsulta.json();        

    }

    async modificarusuario(){

        let url = Origen+"/backend/CONTROLLER/usuario_controlador.php?function=modificar";
        let respuestaConsulta = await fetch(url,config);
        let respuesta = await respuestaConsulta.json();        

    }

}