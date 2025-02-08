// Función para eliminar un mensaje
async function eliminarMensaje(id) {
    try {
        // Solicitar al backend la eliminación del mensaje
        const response = await fetch(`/techpro-main/backend/CONTACTO/vercontactoadmin.php?id=${id}`, {
            method: 'DELETE', // Si usas POST, cambia a POST
        });

        if (!response.ok) {
            throw new Error('Error al eliminar el mensaje');
        }

        // Si la eliminación es exitosa, recargar los mensajes
        cargarMensajes();
    } catch (error) {
        console.error('Error al eliminar el mensaje:', error);
    }
}

// Función para cargar los mensajes
async function cargarMensajes() {
    try {
        const response = await fetch('/techpro-main/backend/CONTACTO/vercontactoadmin.php');

        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }

        const mensajes = await response.json();

        const tbody = document.getElementById('mensajes-tbody');
        tbody.innerHTML = ''; // Limpiar la tabla antes de llenarla

        if (mensajes.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = `  
                <td colspan="6" style="text-align: center;">No hay mensajes disponibles</td>
            `;
            tbody.appendChild(row);
        } else {
            mensajes.forEach(mensaje => {
                const row = document.createElement('tr');

                // Construcción del enlace para abrir Gmail con los parámetros adecuados
                const gmailLink = `https://gmail.google.com/mail/?view=cm&fs=1&to=${mensaje.correo || ''}&subject=Mensaje%20de%20TechPro&body=${encodeURIComponent(`
                    Hola ${mensaje.nombre},

                    Gracias por ponerte en contacto con TechPro.

                    Tu mensaje: 
                    "${mensaje.mensaje}"

                    Saludos, El equipo de TechPro

        
                `)}`;

                row.innerHTML = `
                    <td>${mensaje.id}</td>
                    <td>${mensaje.nombre}</td>
                    <td>
                        <a href="${gmailLink}" style="color: blue; text-decoration: underline;">
                            ${mensaje.correo || 'No disponible'}
                        </a>
                    </td>
                    <td>${mensaje.mensaje}</td>
                    <td>${mensaje.fecha || 'No disponible'}</td>
                    <td>
                        <button onclick="eliminarMensaje(${mensaje.id})">Eliminar</button>
                    </td>
                `;

                tbody.appendChild(row);
            });
        }
    } catch (error) {
        console.error('Error al cargar los mensajes:', error);

        const tbody = document.getElementById('mensajes-tbody');
        tbody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; color: red;">
                    Error al cargar los mensajes. Por favor, inténtelo más tarde.
                </td>
            </tr>
        `;
    }
}

// Cargar los mensajes al cargar la página
window.onload = cargarMensajes;
