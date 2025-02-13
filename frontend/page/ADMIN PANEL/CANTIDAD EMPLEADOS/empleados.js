document.addEventListener('DOMContentLoaded', function () {
  // Función para obtener los empleados desde el backend
  function loadEmployees() {
    fetch('/techpro-main/backend/CANTIDADEMPLEADOS/getempleados.php')
      .then(response => response.json())
      .then(data => {
        const tableBody = document.querySelector('#employeeTable tbody');
        tableBody.innerHTML = ''; // Limpiar la tabla antes de agregar nuevos empleados

        if (data.length > 0) {
          data.forEach(employee => {
            const row = document.createElement('tr');
            row.innerHTML = `
              <td>${employee.id}</td>
              <td>${employee.name}</td>
              <td>${employee.surname}</td>
              <td>${employee.age}</td>
              <td>${employee.position}</td>
              <td>${employee.hire_date}</td>
              <td>
                <button class="delete-btn" data-id="${employee.id}">Eliminar</button>
              </td>
            `;
            tableBody.appendChild(row);
          });

          // Agregar eventos a los botones de eliminar
          document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', function () {
              const employeeId = this.getAttribute('data-id');
              deleteEmployee(employeeId);
            });
          });

        } else {
          const row = document.createElement('tr');
          row.innerHTML = '<td colspan="7">No hay empleados registrados.</td>';
          tableBody.appendChild(row);
        }
      })
      .catch(error => {
        console.error('Error al obtener los empleados:', error);
      });
  }

  // Función para mostrar el modal con el formulario de agregar empleado
  function showAddEmployeeForm() {
    const modalHTML = `
      <div class="modal-overlay">
        <div class="modal-content">
          <h2>Agregar Nuevo Empleado</h2>
          <form id="addEmployeeForm">
            <label for="name">Nombre:</label>
            <input type="text" id="name" required>

            <label for="surname">Apellido:</label>
            <input type="text" id="surname" required>

            <label for="age">Edad:</label>
            <input type="number" id="age" required min="18">

            <label for="position">Cargo:</label>
            <input type="text" id="position" required>

            <label for="hire_date">Fecha de Ingreso:</label>
            <input type="date" id="hire_date" required>

            <button type="submit">Agregar</button>
          </form>
          <button id="closeModalBtn">Cerrar</button>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Evento para enviar el formulario
    document.getElementById('addEmployeeForm').addEventListener('submit', function (event) {
      event.preventDefault();  // Prevenir la recarga de la página
      const name = document.getElementById('name').value.trim();
      const surname = document.getElementById('surname').value.trim();
      const age = document.getElementById('age').value;
      const position = document.getElementById('position').value.trim();
      const hire_date = document.getElementById('hire_date').value;

      if (!name || !surname || !age || !position || !hire_date) {
        alert("Por favor, completa todos los campos.");
        return;
      }

      createEmployee(name, surname, age, position, hire_date);
      document.querySelector('.modal-overlay').remove(); // Cerrar el modal después de enviarlo
    });

    // Evento para cerrar el modal
    document.getElementById('closeModalBtn').addEventListener('click', function () {
      document.querySelector('.modal-overlay').remove();
    });
  }

  function createEmployee(name, surname, age, position, hire_date) {
    const employeeData = { name, surname, age, position, hire_date };

    console.log("📤 Enviando datos al backend:", JSON.stringify(employeeData));

    fetch('/techpro-main/backend/CANTIDADEMPLEADOS/createempleados.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeData),
    })
    .then(response => response.text())  // 🔴 Leer respuesta como texto
    .then(text => {
        console.log("📥 Respuesta del servidor:", text); // 🔍 Ver qué devuelve PHP
        return JSON.parse(text); // ❌ Aquí es donde puede fallar si no es JSON
    })
    .then(data => {
        if (data.message) {
            alert(data.message);
            loadEmployees();
        } else {
            alert(data.error);
        }
    })
    .catch(error => {
        console.error('⚠️ Error al agregar el empleado:', error);
        alert('Hubo un error al agregar el empleado.');
    });
  }

  function deleteEmployee(employeeId) {
    if (!confirm("¿Seguro que deseas eliminar este empleado?")) return;

    fetch(`/techpro-main/backend/CANTIDADEMPLEADOS/createempleados.php`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `id=${employeeId}`
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message || data.error);
        loadEmployees(); // Recargar la lista de empleados después de eliminar uno
    })
    .catch(error => {
        console.error('⚠️ Error al eliminar el empleado:', error);
        alert('Hubo un error al eliminar el empleado.');
    });
  }

  // Agregar evento al botón de añadir empleado
  document.getElementById('addEmployeeBtn').addEventListener('click', showAddEmployeeForm);

  // Cargar empleados cuando la página se carga
  loadEmployees();
});
