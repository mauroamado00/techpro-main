import Origen from "./origen.js";

export default class SesionDao{

    async iniciarSesion(email, password) {
        let url = Origen+"/backend/CONTROLLER/sesion_controller.php?function=iniciarSesion";
        let formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);
    
        let config = {
            method: "POST",
            body: formData,
        };
        
        let respuestaConsulta = await fetch(url,config);
        let respuesta = await respuestaConsulta.json(); 
        console.log("r",respuesta); 
        return respuesta;      
    }
    
    async obtenerSesion(){

        let url = Origen+"/backend/CONTROLLER/sesion_controller.php?function=obtener";
        let respuestaConsulta = await fetch(url,config);
        let respuesta = await respuestaConsulta.json();  
        return respuesta;      

    }

    async cerrarSesion(){

        let url = Origen+"/backend/CONTROLLER/sesion_controller.php??function=cerrar";
        let respuestaConsulta = await fetch(url,config);
        let respuesta = await respuestaConsulta.json();  
        return respuesta;      

    }

    async estaloggeado(){

        let url = Origen+"/backend/CONTROLLER/sesion_controller.php??function=estaloggeado";
        let respuestaConsulta = await fetch(url,config);
        let respuesta = await respuestaConsulta.json();  
        return respuesta;      

    }





}