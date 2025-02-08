document.addEventListener('DOMContentLoaded', function () {
  // Función para obtener los empleados del backend
  function loadEmployees() {
    fetch('/techpro-main/backend/CANTIDADEMPLEADOS/getempleados.php')  // Asegúrate de usar la ruta correcta a tu script PHP
      .then(response => response.json())
      .then(data => {
        const tableBody = document.getElementById('employeeTable').getElementsByTagName('tbody')[0];
        tableBody.innerHTML = '';  // Limpiar la tabla antes de agregar nuevos empleados

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
            `;
            tableBody.appendChild(row);
          });
        } else {
          const row = document.createElement('tr');
          row.innerHTML = '<td colspan="6">No hay empleados registrados.</td>';
          tableBody.appendChild(row);
        }
      })
      .catch(error => {
        console.error('Error al obtener los empleados:', error);
      });
  }

  // Función para mostrar el formulario de agregar empleado
  function showAddEmployeeForm() {
    const formHTML = `
      <div class="form-container">
        <h2>Agregar Nuevo Empleado</h2>
        <form id="addEmployeeForm">
          <label for="name">Nombre:</label>
          <input type="text" id="name" required>

          <label for="surname">Apellido:</label>
          <input type="text" id="surname" required>

          <label for="age">Edad:</label>
          <input type="number" id="age" required>

          <label for="position">Cargo:</label>
          <input type="text" id="position" required>

          <label for="hire_date">Fecha de Ingreso:</label>
          <input type="date" id="hire_date" required>

          <button type="submit">Agregar</button>
        </form>
        <button id="closeFormBtn">Cerrar</button>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', formHTML);
    
    // Añadir evento para enviar el formulario
    document.getElementById('addEmployeeForm').addEventListener('submit', function (event) {
      event.preventDefault();  // Prevenir la recarga de la página
      const name = document.getElementById('name').value;
      const surname = document.getElementById('surname').value;
      const age = document.getElementById('age').value;
      const position = document.getElementById('position').value;
      const hire_date = document.getElementById('hire_date').value;
      
      createEmployee(name, surname, age, position, hire_date);  // Enviar los datos al backend
      document.querySelector('.form-container').remove();  // Cerrar el formulario después de enviarlo
    });
    
    // Añadir evento para cerrar el formulario sin hacer nada
    document.getElementById('closeFormBtn').addEventListener('click', function () {
      document.querySelector('.form-container').remove();
    });
  }

  // Función para agregar un nuevo empleado al backend
  function createEmployee(name, surname, age, position, hire_date) {
    const employeeData = { name, surname, age, position, hire_date };
    
    fetch('/techpro-main/backend/CANTIDADEMPLEADOS/createempleados.php', {  // Ruta al archivo PHP que manejará la creación
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employeeData),
    })
      .then(response => response.json())  // Procesar la respuesta en formato JSON
      .then(data => {
        if (data.message) {
          alert(data.message);  // Si se creó con éxito
          loadEmployees();  // Recargar la lista de empleados
        } else {
          alert(data.error);  // Si hubo un error
        }
      })
      .catch(error => {
        console.error('Error al agregar el empleado:', error);
        alert('Hubo un error al agregar el empleado.');
      });
  }

  // Agregar evento al botón de añadir empleado
  const addEmployeeBtn = document.getElementById('addEmployeeBtn');
  addEmployeeBtn.addEventListener('click', showAddEmployeeForm);

  // Cargar empleados cuando la página se carga
  loadEmployees();
});
