import CarritoDAo from "../../dao/CarritoDao.js";

window.onload = () => {
  agregarevento();
  actualizarTotalesCarrito();
};

function agregarevento() {
  let metodoEnvio = document.querySelector("#metodoEnvio");
  let direccionInput = document.querySelector("#direccion");
  let direccionLabel = document.querySelector("label[for='direccion']"); 
  let confirmarCompraElement = document.querySelector("#realize-order");

  metodoEnvio.onchange = () => {
    let valor = metodoEnvio.value;
    if (valor === "local") {
      direccionInput.style.display = "none";
      direccionLabel.style.display = "none"; 
    } else {
      direccionInput.style.display = "block";  
      direccionLabel.style.display = "block";  
    }
  };

  confirmarCompraElement.onsubmit = (e) => {
    e.preventDefault();
    let nombreCompleto = confirmarCompraElement.nombreCompleto.value.trim();
    let ciudad = confirmarCompraElement.ciudad.value.trim();
    let numeroDeTelefono = confirmarCompraElement.numerodetelefono.value.trim();
    let email = confirmarCompraElement.email.value.trim();
    let metodoEnvio = confirmarCompraElement.metodoEnvio.value;
    let direccion = confirmarCompraElement.direccion.value.trim();
    let metodoPago = confirmarCompraElement.metodoPago.value;

    if (!nombreCompleto || !ciudad || !numeroDeTelefono || !email || !metodoEnvio || !metodoPago) {
      alert("Por favor, completa todos los campos requeridos.");
      return;
    }

    if (metodoEnvio === "direccion" && !direccion) {
      alert("Por favor, ingresa la dirección de envío.");
      return;
    }

    confirmarCompra(nombreCompleto, ciudad, numeroDeTelefono, email, metodoEnvio, direccion, metodoPago);
  };
}

async function confirmarCompra(nombreCompleto, ciudad, numeroDeTelefono, email, metodoEnvio, direccion, metodoPago) {
  let carritoDAO = new CarritoDAo();
  let respuesta = await carritoDAO.confirmarCompra(nombreCompleto, ciudad, numeroDeTelefono, email, metodoEnvio, direccion, metodoPago);
  
  if (respuesta.estado) {
    alert("Compra realizada con éxito");
    localStorage.removeItem('carrito');
    console.log("carrito")
    window.location.href = "../productos/productos.html";
} else {
    alert("Error al confirmar la compra. Inténtalo nuevamente.");
}

}

const costoEnvioUYU = 100; 

function actualizarTotalesCarrito() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let subtotalUSD = carrito.reduce((acumulador, producto) => {
        return acumulador + producto.precio * producto.cantidad;
    }, 0);

    let shippingCostUYU = 0; 
    if (subtotalUSD <= 1000) {
        shippingCostUYU = costoEnvioUYU; 
    }
    document.getElementById("shipping-cost").textContent = 
        shippingCostUYU === 0 ? "Gratis" : `$${shippingCostUYU} UYU`;

    document.getElementById("total-price").textContent = 
        `$${subtotalUSD.toFixed(2)} USD`;
    localStorage.setItem("ultimaActualizacionCarrito", JSON.stringify(Date.now()));
}

