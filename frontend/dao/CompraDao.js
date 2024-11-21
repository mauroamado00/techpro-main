export default class CompraDAO {
    
    async obtenerComprasUsuario(){
        let url = Origen + "/backend/CONTROLLER/ventas_controlador.php?function=obtenercomprasusuario";
        let formData = new FormData();
        formData.append("email", email);
        let config = {
            method: "POST",
            body: formData
        };
    
        let respuestaConsulta = await fetch(url, config);
        let respuesta = await respuestaConsulta.json();
        
        return respuesta; 
    }


}