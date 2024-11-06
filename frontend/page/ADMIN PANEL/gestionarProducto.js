const productList = document.getElementById("productList");
const productoForm = document.getElementById("productoForm");
const resultadoOperacion = document.getElementById("resultadoOperacion");
const imagenPreview = document.getElementById("imagenPreview");
const productos = new Map(); // Para almacenar productos y evitar duplicados

// Previsualizar imagen
document.getElementById("productoImagen").addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagenPreview.src = e.target.result;
            imagenPreview.style.display = 'block'; // Muestra la imagen
        };
        reader.readAsDataURL(file);
    }
});

// Manejar el envío del formulario
productoForm.addEventListener("submit", function(event) {
    event.preventDefault(); // Evita que el formulario se envíe

    const nombre = document.getElementById("productoNombre").value.trim();
    const precio = document.getElementById("productoPrecio").value;
    const stock = document.getElementById("productoStock").value;

    if (productos.has(nombre)) {
        resultadoOperacion.textContent = "El producto ya existe. Por favor, elige otro nombre.";
        return;
    }

    // Crear objeto producto
    const producto = {
        nombre,
        precio,
        stock,
        imagen: imagenPreview.src
    };

    // Almacenar producto en el mapa
    productos.set(nombre, producto);

    // Agregar producto a la tabla
    agregarProductoATabla(producto);
    
    // Reiniciar el formulario
    productoForm.reset();
    imagenPreview.style.display = 'none';
    resultadoOperacion.textContent = "Producto agregado con éxito.";
});

// Función para agregar producto a la tabla
function agregarProductoATabla(producto) {
    const row = document.createElement("tr");
    
    row.innerHTML = `
        <td><img src="${producto.imagen}" alt="${producto.nombre}" style="max-width:50px;"></td>
        <td>${producto.nombre}</td>
        <td>${producto.precio}</td>
        <td>${producto.stock}</td>
        <td>
            <button class="edit-btn">Modificar</button>
            <button class="delete-btn">Eliminar</button>
        </td>
    `;

    const editBtn = row.querySelector(".edit-btn");
    editBtn.addEventListener("click", function() {
        editarProducto(producto.nombre);
    });

    const deleteBtn = row.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", function() {
        productos.delete(producto.nombre);
        productList.removeChild(row);
        resultadoOperacion.textContent = "Producto eliminado con éxito.";
    });

    productList.appendChild(row);
}

// Función para editar un producto
function editarProducto(nombre) {
    const producto = productos.get(nombre);
    document.getElementById("productoNombre").value = producto.nombre;
    document.getElementById("productoPrecio").value = producto.precio;
    document.getElementById("productoStock").value = producto.stock;
    imagenPreview.src = producto.imagen;
    imagenPreview.style.display = 'block'; // Mostrar la imagen

    // Quitar el evento anterior y agregar uno nuevo para editar
    productoForm.removeEventListener("submit", agregarProducto);
    productoForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Evita que el formulario se envíe
        
        // Actualizar producto
        const nuevoNombre = document.getElementById("productoNombre").value.trim();
        if (nuevoNombre !== nombre && productos.has(nuevoNombre)) {
            resultadoOperacion.textContent = "El producto ya existe. Por favor, elige otro nombre.";
            return;
        }
        
        producto.nombre = nuevoNombre || producto.nombre;
        producto.precio = document.getElementById("productoPrecio").value;
        producto.stock = document.getElementById("productoStock").value;
        producto.imagen = imagenPreview.src;

        // Actualizar la tabla
        productList.innerHTML = ''; // Limpiar la tabla
        productos.forEach(p => agregarProductoATabla(p)); // Re-agregar productos
        resultadoOperacion.textContent = "Producto actualizado con éxito.";

        // Reiniciar el formulario
        productoForm.reset();
        imagenPreview.style.display = 'none';
        productoForm.removeEventListener("submit", arguments.callee); // Quitar el listener
        productoForm.addEventListener("submit", agregarProducto);
    });
}