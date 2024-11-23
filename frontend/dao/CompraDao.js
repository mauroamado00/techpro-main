import Origen from "./origen.js";

export default class CompraDAO {

        // Método para registrar una compra
        async registrarCompra(compra) {
            const url = `${Origen}/backend/CONTROLLER/ventas_controlador.php?function=registrarcompra`;
            const formData = new FormData();
    
            formData.append("email", compra.email);
            formData.append("nombre", compra.nombre);
            formData.append("telefono", compra.telefono);
            formData.append("productos", JSON.stringify(compra.productos));
    
            try {
                const respuesta = await fetch(url, {
                    method: "POST",
                    body: formData,
                });
    
                if (!respuesta.ok) {
                    throw new Error(`HTTP Error: ${respuesta.status}`);
                }
    
                const resultado = await respuesta.json();
                console.log("Compra registrada:", resultado);
                return resultado;
            } catch (error) {
                console.error("Error al registrar la compra:", error.message || error);
                return null;
            }
        }
    
        // Método para obtener compras de un usuario por email
        async obtenerComprasUsuario(email) {
            const url = `${Origen}/backend/CONTROLLER/ventas_controlador.php?function=obtenercompras&email=${encodeURIComponent(email)}`;
    
            try {
                const respuesta = await fetch(url);
    
                if (!respuesta.ok) {
                    throw new Error(`HTTP Error: ${respuesta.status}`);
                }
    
                const resultado = await respuesta.json();
                console.log("Compras del usuario obtenidas:", resultado);
                return resultado;
            } catch (error) {
                console.error("Error al obtener compras del usuario:", error.message || error);
                return null;
            
            }
    }
}        

