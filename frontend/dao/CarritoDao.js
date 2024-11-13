import Origen from "./origen.js";

export default class CarritoDAo {
    constructor() {

    }
    // Función para obtener el carrito desde la base de datos y devolverlo en formato JSON
    obtenerCarrito() {
        let carrito = JSON.parse(localStorage.getItem("carrito"));
        if (carrito == null) {
            carrito = [];
        }
        return carrito;

    }

    // Función para eliminar un producto del carrito
    eliminarProductoCarrito(id) {
        let carrito = this.obtenerCarrito();
        let nuevoCarrito = carrito.filter(producto => producto.id != id);
        this.guardarCarrito(nuevoCarrito);
    }

    guardarCarrito(carrito) {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }

    
    // Función para modificar el stock de un producto en el carrito
    modificarStockCarrito(id, cantidad) {

        let carrito = this.obtenerCarrito();
        let nuevoCarrito = carrito.map(producto => {
            if (producto.id == id) {
                producto.cantidad = cantidad;
            }
            return producto;
        });
        this.guardarCarrito(nuevoCarrito);

       
    }

    aumentarCantidadCarrito(id_producto) {
        let carrito = this.obtenerCarrito();
        let nuevoCarrito = carrito.map(producto => {
            if (producto.id == id_producto) {
                producto.cantidad++;
            }
            return producto;
        });
        this.guardarCarrito(nuevoCarrito);
    }

    disminuirCantidadCarrito(id) {
        let carrito = this.obtenerCarrito();
        let nuevoCarrito = carrito.map(producto => {
            if (producto.id == id && producto.cantidad > 1) {
                producto.cantidad--;
            }
            return producto;
        });
        this.guardarCarrito(nuevoCarrito);
    }

    // Función para agregar un producto al carrito
    agregarProductoCarrito(producto) {
        console.log(producto);
        let carrito = this.obtenerCarrito();
        let productoExistente = carrito.find(productoc => productoc.id == producto.id);
        console.log(productoExistente);
        if (productoExistente == null) {
            carrito.push(producto);
            this.guardarCarrito(carrito);
            
        }else{
            this.eliminarProductoCarrito(producto.id);
            productoExistente.cantidad += producto.cantidad;
            let carritoSinExistente = this.obtenerCarrito();
            carritoSinExistente.push(productoExistente);
            this.guardarCarrito(carritoSinExistente);

        }
       
       

        /*    [
                    {
                        id_producto: 1,
                        id_compra: 1,
                        cantidad: 2,
                       
                    },
                   {
                        id_producto: 2,
                        id_compra: 2,
                        cantidad: 5,
                    },
                ]
         */

    }

    async confirmarCompra(nombrecompleto,ciudad,numerodetelefono,email,metodoEnvio,direccion,metodoPago) {
        

        if(metodoEnvio == "local"){
            direccion = null;
        }
        let products = this.obtenerCarrito();


        let formData = new FormData();
        formData.append("nombrecompleto", nombrecompleto);
        formData.append("ciudad", ciudad);
        formData.append("numerodetelefono", numerodetelefono);
        formData.append("email", email);
        formData.append("metodoEnvio", metodoEnvio);
        formData.append("direccion", direccion);
        formData.append("metodoPago", metodoPago);
        formData.append("productos", JSON.stringify(products));

        let config = {
            method: "POST",
            body: formData
        }
        console.log(products);
        let url = Origen+"/backend/CONTROLLER/ventas_controlador.php?function=realizarCompra";
        let response = await fetch(url, config);
        let data = await response.json();
        console.log(data);
       return data;

    }
}