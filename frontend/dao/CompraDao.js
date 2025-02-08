import Origen from "./origen.js";

export default class CompraDAO {
    
    // Método para registrar una compra
    async registrarCompra(compra) {
        const url = `${Origen}/backend/CONTROLLER/ventas_controlador.php?function=registrarcompra`;
        const formData = new FormData();
        
        // Agregar los datos de la compra al FormData
        formData.append("email", compra.email);
        formData.append("nombre", compra.nombre);
        formData.append("telefono", compra.telefono);
        formData.append("productos", JSON.stringify(compra.productos));

        try {
            const respuesta = await fetch(url, {
                method: "POST",
                body: formData,
            });

            // Comprobar si la respuesta fue exitosa
            if (!respuesta.ok) {
                throw new Error(`HTTP Error: ${respuesta.status} - ${respuesta.statusText}`);
            }

            const resultado = await respuesta.json();
            console.log("Compra registrada:", resultado);
            return resultado;  // Retornar el resultado de la compra registrada
        } catch (error) {
            console.error("Error al registrar la compra:", error.message || error);
            return null;  // Retornar null en caso de error
        }
    }
// Método para obtener las compras de un usuario
async obtenerComprasUsuario(email) {
    const url = `${Origen}/backend/CONTROLLER/ventas_controlador.php?function=obtenercompraUsuario`;
    const formData = new FormData();
    
    // Agregar el email al FormData
    formData.append("email", email);

    try {
        const respuesta = await fetch(url, {
            method: "POST",
            body: formData,
        });

        // Comprobar si la respuesta fue exitosa
        if (!respuesta.ok) {
            throw new Error(`HTTP Error: ${respuesta.status} - ${respuesta.statusText}`);
        }

        // Intentar convertir la respuesta a JSON
        const body = await respuesta.text(); // Obtener el cuerpo como texto
        let resultado;

        // Verificar si el cuerpo no está vacío antes de convertirlo a JSON
        if (body) {
            resultado = JSON.parse(body); // Convertir a JSON
        } else {
            throw new Error("La respuesta del servidor está vacía.");
        }

        // Verificar si el resultado tiene un estado de éxito
        if (typeof resultado !== 'object' || !resultado.status) {
            throw new Error(resultado.message || "Error desconocido en la respuesta del servidor.");
        }

        return resultado;  // Retornar el resultado de las compras obtenidas
    } catch (error) {
        console.error("Error al obtener las compras:", error.message || error);
        return null;  // Retornar null en caso de error
    }
}
}