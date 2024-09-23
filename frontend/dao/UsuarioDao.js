export default class usuario{

    async agregarusuario(nombre,apellido,email,password){

        let url = "http://localhost/techpro-main/backend/CONTROLLER/usuario_controlador.php?function=agregar";
        let FormData = new FormData();
        FormData.append("nombre", nombre);
        FormData.append("apellido", apellido);
        FormData.append("email", email);
        FormData.append("password", password);

        let config = {

            method: "POST",
            body:FormData
        }

        let respuestaConsulta = await fetch(url,config);
        let respuesta = await respuestaConsulta.json();
    }


    async eliminarusuario(){

        let url = "http://localhost/techpro-main/backend/CONTROLLER/usuario_controlador.php?function=eliminar";
        let respuestaConsulta = await fetch(url,config);
        let respuesta = await respuestaConsulta.json();        

    }

    async obtenerusuarios(){

        let url = "http://localhost/techpro-main/backend/CONTROLLER/usuario_controlador.php?function=obtener";
        let respuestaConsulta = await fetch(url,config);
        let respuesta = await respuestaConsulta.json();        

    }

    async modificarusuario(){

        let url = "http://localhost/techpro-main/backend/CONTROLLER/sesion_controller.php?function=cerrar";
        let respuestaConsulta = await fetch(url,config);
        let respuesta = await respuestaConsulta.json();        

    }

}