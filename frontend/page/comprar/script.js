import CarritoDAo from "../../dao/CarritoDao.js";

window.onload = () => {
  agregarEventos();
  actualizarTotalesCarrito();
  listarProductosCarrito(); // Mostrar productos en el carrito
};

function agregarEventos() {
  const metodoEnvio = document.querySelector("#metodoEnvio");
  const direccionInput = document.querySelector("#direccion");
  const direccionLabel = document.querySelector("label[for='direccion']");
  const metodoPago = document.querySelector("#metodoPago");
  const paypalButton = document.getElementById("paypal-button");
  const confirmarCompraElement = document.querySelector("#realize-order");

  // Mostrar u ocultar la dirección según el método de envío
  metodoEnvio.onchange = () => {
    if (metodoEnvio.value === "local") {
      direccionInput.style.display = "none";
      direccionLabel.style.display = "none";
    } else {
      direccionInput.style.display = "block";
      direccionLabel.style.display = "block";
    }
  };

  // Mostrar u ocultar el botón de PayPal según el método de pago
  metodoPago.onchange = () => {
    if (metodoPago.value === "paypal") {
      paypalButton.style.display = "block";
    } else {
      paypalButton.style.display = "none";
    }
  };

  paypalButton.onclick = () => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const total = obtenerTotalCarrito();

    if (carrito.length > 0) {
      // Crear un formulario dinámico para enviar los productos a PayPal
      const paypalForm = document.createElement("form");
      paypalForm.action = "https://www.paypal.com/cgi-bin/webscr"; // URL correcta de PayPal
      paypalForm.method = "post";
      paypalForm.target = "_blank";

      // Comando para carrito de PayPal
      paypalForm.innerHTML += `<input type="hidden" name="cmd" value="_cart">`;
      paypalForm.innerHTML += `<input type="hidden" name="upload" value="1">`;
      paypalForm.innerHTML += `<input type="hidden" name="business" value="mauroamado937@gmail.com">`; // Usa el correo correcto de PayPal
      paypalForm.innerHTML += `<input type="hidden" name="currency_code" value="USD">`;

      // Agregar productos al carrito
      carrito.forEach((producto, index) => {
        const itemNumber = index + 1;

        paypalForm.innerHTML += `<input type="hidden" name="item_name_${itemNumber}" value="${producto.nombre}">`;
        paypalForm.innerHTML += `<input type="hidden" name="quantity_${itemNumber}" value="${producto.cantidad}">`;
        paypalForm.innerHTML += `<input type="hidden" name="amount_${itemNumber}" value="${producto.precio.toFixed(2)}">`;
        paypalForm.innerHTML += `<input type="hidden" name="item_number_${itemNumber}" value="${itemNumber}">`;
        paypalForm.innerHTML += `<input type="hidden" name="description_${itemNumber}" value="${producto.nombre} x${producto.cantidad}">`;
      });

      // Enviar el monto total
      paypalForm.innerHTML += `<input type="hidden" name="amount" value="${total.toFixed(2)}">`;

      // Opcional: Agregar detalles del comprador
      paypalForm.innerHTML += `<input type="hidden" name="custom" value="Compra en TechPro">`;
      paypalForm.innerHTML += `<input type="hidden" name="return" value="http://localhost/finalizarcompra.html">`; // Redirige después del pago
      paypalForm.innerHTML += `<input type="hidden" name="cancel_return" value="http://localhost/finalizarcompra.html">`; // Redirige si cancela

      // Agregar el formulario al documento y enviarlo
      document.body.appendChild(paypalForm);
      paypalForm.submit();

      // Eliminar el formulario dinámico después del envío
      document.body.removeChild(paypalForm);
    } else {
      alert("El carrito está vacío. Agrega productos antes de proceder al pago.");
    }
  };

  // Validar y procesar el formulario de compra
  confirmarCompraElement.onsubmit = (e) => {
    e.preventDefault();
    const nombreCompleto = confirmarCompraElement.nombreCompleto.value.trim();
    const ciudad = confirmarCompraElement.ciudad.value.trim();
    const numeroDeTelefono = confirmarCompraElement.numerodetelefono.value.trim();
    const email = confirmarCompraElement.email.value.trim();
    const metodoEnvioValue = confirmarCompraElement.metodoEnvio.value;
    const direccion = confirmarCompraElement.direccion.value.trim();
    const metodoPagoValue = confirmarCompraElement.metodoPago.value;

    if (!nombreCompleto || !ciudad || !numeroDeTelefono || !email || !metodoEnvioValue || !metodoPagoValue) {
      alert("Por favor, completa todos los campos requeridos.");
      return;
    }

    if (metodoEnvioValue === "direccion" && !direccion) {
      alert("Por favor, ingresa la dirección de envío.");
      return;
    }

    if (metodoPagoValue === "paypal") {
      alert("Por favor, completa el pago a través de PayPal.");
      return; // El pago será manejado después de PayPal
    }

    confirmarCompra(nombreCompleto, ciudad, numeroDeTelefono, email, metodoEnvioValue, direccion, metodoPagoValue);
  };
}

async function confirmarCompra(nombreCompleto, ciudad, numeroDeTelefono, email, metodoEnvio, direccion, metodoPago) {
  const carritoDAO = new CarritoDAo();
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const productosComprados = carrito
    .map((producto) => `${producto.nombre} x${producto.cantidad}`)
    .join("\n");

  const respuesta = await carritoDAO.confirmarCompra(
    nombreCompleto,
    ciudad,
    numeroDeTelefono,
    email,
    metodoEnvio,
    direccion,
    metodoPago
  );

  if (respuesta.estado) {
    alert(`Compra realizada con éxito.\n\nProductos comprados:\n${productosComprados}`);
    localStorage.removeItem("carrito");
    window.location.href = "../productos/productos.html";
  } else {
    alert("Error al confirmar la compra. Inténtalo nuevamente.");
  }
}

function actualizarTotalesCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const subtotalUSD = carrito.reduce((acumulador, producto) => {
    return acumulador + producto.precio * producto.cantidad;
  }, 0);

  document.getElementById("total-price").textContent = `$${subtotalUSD.toFixed(2)} USD`;
}

function obtenerTotalCarrito() {
  const totalElement = document.getElementById("total-price");
  return parseFloat(totalElement.textContent.replace("$", "").trim());
}

function listarProductosCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const productosContenedor = document.getElementById("productos-carrito");

  productosContenedor.innerHTML = "";

  if (carrito.length === 0) {
    productosContenedor.innerHTML = "<p>No has agregado productos al carrito.</p>";
    return;
  }

  carrito.forEach((producto) => {
    const productoDiv = document.createElement("div");
    productoDiv.classList.add("producto-carrito");

    productoDiv.innerHTML = `
      <div class="producto-info">
          <p><strong>Producto:</strong> ${producto.nombre}</p>
          <p><strong>Cantidad:</strong> ${producto.cantidad}</p>
          <p><strong>Precio:</strong> $${(producto.precio * producto.cantidad).toFixed(2)}</p>
      </div>
      <hr>
    `;

    productosContenedor.appendChild(productoDiv);
  });
}

