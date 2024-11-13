import CarritoDAo from "../../dao/CarritoDao.js";

window.onload = () => {
  agregarevento();
};

function agregarevento() {
  let metodoEnvio = document.querySelector("#metodoEnvio");
  let confirmarCompraElement = document.querySelector("#realize-order");

  metodoEnvio.onchange = () => {
    let valor = metodoEnvio.value;
    if (valor == "direccion") {
      confirmarCompraElement.classList.add("tipoEnvio");
    } else {
      confirmarCompraElement.classList.remove("tipoEnvio");
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