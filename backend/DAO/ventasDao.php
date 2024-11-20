<?php

require_once __DIR__ . "/../CONEXION/conexion.php";
require_once __DIR__ . "/sesionDao.php";
require_once __DIR__ . "/respuesta.php";

class VentasDao
{
    // Método para agregar una compra en la base de datos
    function realizarCompra($nombreCompleto, $ciudad, $numeroDeTelefono, $email, $metodoDeEnvio, $direccion, $metodoDePago,$productos)
    {
        
        

        $sql = "INSERT INTO `compra` (`nombrecompleto`, `ciudad`, `numerodetelefono`, `email`, `metododeenvio`, `direccion`, `metododepago`, `id`) VALUES ('$nombreCompleto', '$ciudad', '$$numeroDeTelefono', '$email', '$metodoDeEnvio', '$direccion', '$metodoDePago', NULL);";
        $connection = connection();
        
        try {
            $connection->query($sql);
            $compraId = $connection->insert_id;
            $this->insertarProductoCompra($productos, $compraId);
            $respuesta = new respuesta(true, "Compra agregada correctamente", null);
        } catch (Exception $e) {
            error_log($e);
            $respuesta = new respuesta(false, "No se pudo agregar la compra", null);
        }
        return $respuesta;
    }

    function actualizarStockProducto($producto){
        $connection = connection();
        $idProducto = $producto["id"];
        $cantidad = $producto["cantidad"];

        $sql="UPDATE `producto` SET `stock` = stock - $cantidad  WHERE `producto`.`id` = '$idProducto';";
        try{
            $connection->query($sql);
            $respuesta = new respuesta(true, "stick reducido correctamente", null);
        }catch (Exception $e) {
            error_log($e);
            $respuesta = new respuesta(false, "No se pudo reducir el stock", null);
        }
        return $respuesta;


    }

    function insertarProductoCompra($productos,$idCompra){
        $connection = connection();
        foreach ($productos as $producto) {
            error_log(json_encode($producto));
            $this->actualizarStockProducto($producto);
            $idProducto = $producto["id"];
            $cantidad = $producto["cantidad"];

           $sql = "INSERT INTO `productocompra` (`idCompra`, `idProducto`, `cantidad`) VALUES ( '$idCompra', '$idProducto', '$cantidad');";

            $connection->query($sql);
        }
       
    }

    function obtenerComprasUsuario()
    {
        $session = (new SesionDAO())->obtenerSesion()->estado;
        $email = $session['email'];
        $connection = connection();
        
        $sql = "SELECT * FROM `compra` WHERE `email` = '$email'";
        $result = $connection->query($sql);
        $compras = $result->fetch_all(MYSQLI_ASSOC);
        
        $respuesta = new respuesta(true, "Compras obtenidas correctamente", $compras);
        return $respuesta;
    }

    function obtenerUltimasCompras($email)
    {
        $connection = connection();
        
        $sql = "SELECT * FROM `compra` WHERE `email` >= '$email'";
        $result = $connection->query($sql);
        $compras = $result->fetch_all(MYSQLI_ASSOC);
        
        $respuesta = new respuesta(true, "Últimas compras obtenidas", $compras);
        return $respuesta;
    }

    function actualizarCompra($metodoDeEnvio, $direccion, $metodoDePago, $nombreCompleto, $ciudad, $numeroDeTelefono, $email)
    {
        $direccion = $direccion ? "'$direccion'" : "NULL";
        $sql = "UPDATE `compra` 
                SET `metododeenvio` = '$metodoDeEnvio', `direccion` = $direccion, `metododepago` = '$metodoDePago',
                    `nombrecompleto` = '$nombreCompleto', `ciudad` = '$ciudad', `numerodetelefono` = '$numeroDeTelefono', 
                    `email` = '$email' 
                WHERE `email` = '$email'";
        $connection = connection();
        
        try {
            $connection->query($sql);
            $respuesta = new respuesta(true, "Compra actualizada correctamente", null);
        } catch (Exception $e) {
            error_log($e);
            $respuesta = new respuesta(false, "No se pudo actualizar la compra", null);
        }

        return $respuesta;
    }
}
?>
