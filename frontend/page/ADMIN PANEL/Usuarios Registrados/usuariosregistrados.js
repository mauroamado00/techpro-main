// Función para cargar los usuarios
function cargarUsuarios() {
    fetch('/techpro-main/backend/dao/admin.php')
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
            } else {
                const tbody = document.querySelector('#usuariosTable tbody');
                tbody.innerHTML = ''; // Limpiar tabla antes de añadir datos

                // Iterar sobre los usuarios y añadir filas a la tabla
                data.forEach(usuario => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${usuario.nombre}</td>
                        <td>${usuario.apellido}</td>
                        <td>${usuario.email}</td>
                        <td>${usuario.isAdmin == 1 ? 'Admin' : 'Usuario'}</td>
                        <td>
                            <button onclick="eliminarUsuario('${usuario.email}')">Eliminar</button>
                             <button onclick="mostrarModal('${usuario.email}')">Enviar Correo</button>
                        </td>
                    `;
                    tbody.appendChild(tr);
                });
            }
        })
        .catch(error => {
            console.error('Error al cargar los usuarios:', error);
        });
}

// Función para eliminar un usuario
function eliminarUsuario(email) {
    console.log('Eliminando usuario con email:', email); // Para verificar si llega el email

    if (!email) {
        alert('El correo electrónico no es válido.');
        return;
    }

    if (confirm('¿Estás seguro de que quieres eliminar a este usuario?')) {
        fetch('/techpro-main/backend/dao/eliminar_usuario.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Usuario eliminado exitosamente');
                cargarUsuarios(); // Recargar la lista de usuarios
            } else {
                alert('Error al eliminar el usuario');
            }
        })
        .catch(error => console.error('Error al eliminar el usuario:', error));
    }
}

// Función para mostrar el modal y cargar el correo del usuario
function mostrarModal(email) {
    // Establece el correo electrónico del usuario en el modal
    document.getElementById('emailUsuario').innerText = email;
    
    // Muestra el modal
    document.getElementById('modal').style.display = 'block';
}

// Función para cerrar el modal
function cerrarModal() {
    document.getElementById('modal').style.display = 'none';
}

// Agregar evento para cerrar el modal al hacer clic en la "X"
document.getElementById('closeModal').onclick = cerrarModal;

// Cerrar el modal si se hace clic fuera de él
window.onclick = function(event) {
    if (event.target == document.getElementById('modal')) {
        cerrarModal();
    }
}

// Cargar usuarios cuando se carga la página
window.onload = cargarUsuarios;
