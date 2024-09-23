export default class productos{

    async verproductos(){

        let url = "http://localhost/techpro-main/backend/CONTROLLER/productos_controlador.php?function=ver";
        let respuestaConsulta = await fetch(url,config);
        let respuesta = await respuestaConsulta.json();   
    }


    async eliminarproductos(){

        let url = "http://localhost/techpro-main/backend/CONTROLLER/productos_controlador.php?function=eliminar";
        let respuestaConsulta = await fetch(url,config);
        let respuesta = await respuestaConsulta.json();        

    }

    async agregarproductos(nombre,stock,precio){

       
        let url = "http://localhost/techpro-main/backend/CONTROLLER/productos_controlador.php?function=agregar";
        let FormData = new FormData();
        FormData.append("nombre", nombre);
        FormData.append("stock", stock);
        FormData.append("precio", precio);

        let config = {

            method: "POST",
            body:FormData
        }


        let respuestaConsulta = await fetch(url,config);
        let respuesta = await respuestaConsulta.json();      

    }

    async buscarproductos(){

        let url = "http://localhost/techpro-main/backend/CONTROLLER/productos_controlador.php?function=buscar";
        let respuestaConsulta = await fetch(url,config);
        let respuesta = await respuestaConsulta.json();        

    }

}