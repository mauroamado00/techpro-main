<?php

require_once __DIR__ . "/../CONEXION/conexion.php";
require_once __DIR__ . "/sesionDao.php";
require_once __DIR__ . "/respuesta.php";

class VentasDao
{
    // Método para agregar una compra en la base de datos
    function realizarCompra($nombreCompleto, $ciudad, $numeroDeTelefono, $email, $metodoDeEnvio, $direccion, $metodoDePago,$productos)
    {
        $sql = "INSERT INTO `compra` (`nombrecompleto`, `ciudad`, `numerodetelefono`, `email`, `metododeenvio`, `direccion`, `metododepago`, `id`) VALUES ('$nombreCompleto', '$ciudad', '$numeroDeTelefono', '$email', '$metodoDeEnvio', '$direccion', '$metodoDePago', NULL);";
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
            $respuesta = new respuesta(true, "stock reducido correctamente", null);
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
    
    function obtenerComprasUsuario($email) {
        $connection = connection();  // Establish database connection
    
        if ($connection === false) {
            error_log("Error connecting to the database.");
            return null; // Or throw an exception
        }
    
        if (empty($email)) {
            error_log("The provided email is empty.");
            return []; // Or throw an exception
        }
    
        // Use a prepared statement to avoid SQL injection
        $sql = "SELECT c.*, u.email FROM compra c INNER JOIN usuario u ON c.email = u.email WHERE u.email = ?";
    
        // Prepare the query
        $stmt = $connection->prepare($sql);
        
        if ($stmt === false) {
            error_log("Error preparing the query: " . $connection->error);
            return null; // Or throw an exception
        }
    
        // Bind the parameter for the query (s is for string)
        $stmt->bind_param('s', $email);
        
        // Execute the query
        if (!$stmt->execute()) {
            error_log("Error executing the query: " . $stmt->error);
            return null; // Or throw an exception
        }
        
        // Get the result
        $result = $stmt->get_result();
        
        // Check if any purchases were found
        if ($result->num_rows > 0) {
            $compras = $result->fetch_all(MYSQLI_ASSOC);
            return $compras;
        } else {
            return [];  // Return an empty array if no purchases found
        }
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
