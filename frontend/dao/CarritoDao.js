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
            if (producto.id_producto == id_producto) {
                producto.quantity++;
            }
            return producto;
        });
        this.guardarCarrito(nuevoCarrito);
    }

    disminuirCantidadCarrito(id) {
        let carrito = this.obtenerCarrito();
        let nuevoCarrito = carrito.map(producto => {
            if (producto.id == id && producto.quantity > 1) {
                producto.quantity--;
            }
            return producto;
        });
        this.guardarCarrito(nuevoCarrito);
    }

    // Función para agregar un producto al carrito
    agregarProductoCarrito(producto) {
        let carrito = this.obtenerCarrito();
        let productoExistente = carrito.find(producto => producto.id == producto.id);
        if (productoExistente == null) {
            carrito.push(producto);
            this.guardarCarrito(carrito);
            
        }else{
            this.eliminarProductoCarrito(producto.id);
            productoExistente.id += producto.id;
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

    async confirmarCompra(nombre, stock, precio) {
        if(metodoEnvio == "Retiro en el local"){
            direccion = null;
        }
        let products = this.obtenerCarrito();
        let venta = {
            nombre: nombre,
            stock: stock,
            precio: precio,
        }

        let formData = new FormData();
        formData.append("nombre", nombre);
        formData.append("stock", stock);
        formData.append("precio", precio);
        let config = {
            method: "POST",
            body: formData
        }
        console.log(products);
       // let response = await fetch("http://localhost:3000/ventas", config);
       // let data = await response.json();
     //   return data;

    }
}