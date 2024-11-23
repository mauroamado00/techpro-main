import CompraDAO from "../../../dao/CompraDao.js";

window.onload = async function () {
    try {
        await mostrarCompras();
    } catch (error) {
        console.error("Error al cargar las compras:", error.message || error);
    }
};

// Función para obtener las compras del usuario
async function obtenerComprasUsuario() {
    const compradao = new CompraDAO();
    const email = localStorage.getItem("userEmail"); // Obtener email desde localStorage

    if (!email) {
        console.warn("El email del usuario no está definido en localStorage.");
        return [];
    }

    try {
        // Llamada al método del DAO para obtener las compras del usuario
        const respuesta = await compradao.obtenerComprasUsuario(email);

        // Verificación de la respuesta
        if (respuesta && respuesta.datos && Array.isArray(respuesta.datos)) {
            return respuesta.datos; // Retorna las compras si existen
        } else {
            console.warn("No se encontraron compras para el usuario.");
            return [];
        }
    } catch (error) {
        console.error("Error al obtener las compras del usuario:", error.message || error);
        return []; // Retorna un array vacío si ocurre un error
    }
}

// Función para mostrar las compras en el DOM
async function mostrarCompras() {
    const compras = await obtenerComprasUsuario();
    const listElement = document.querySelector("#compras");

    // Limpiar el contenido de la lista antes de mostrar nuevos elementos
    listElement.innerHTML = "";

    // Si no hay compras, mostrar un mensaje
    if (compras.length === 0) {
        listElement.innerHTML = "<li>No hay compras registradas.</li>";
        return;
    }

    // Mostrar las compras obtenidas en el DOM
    compras.forEach((compra) => {
        const item = document.createElement("li");
        item.textContent = `Compra ID: ${compra.id}, Producto: ${compra.producto}, Cantidad: ${compra.cantidad}, Precio: ${compra.precio}`;
        listElement.appendChild(item);
    });
}
