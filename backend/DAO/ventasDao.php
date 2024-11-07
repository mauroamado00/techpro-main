<?php

require_once __DIR__ . "/../CONEXION/conexion.php";
require_once __DIR__ . "/sesionDao.php";
require_once __DIR__ . "/respuesta.php";

class VentasDao
{
    // Método para agregar una compra en la base de datos
    function obtenerCompras($nombreCompleto, $ciudad, $numeroDeTelefono, $email, $metodoDeEnvio, $direccion, $metodoDePago)
    {
        $session = (new SesionDAO())->obtenerSesion()->estado;
        $email = $session['email'];
        $direccion = $direccion ? "'$direccion'" : "NULL";
        $metodoDePago = ($metodoDePago == "Tarjeta") ? 1 : 0;
        $metodoDeEnvio = ($metodoDeEnvio == "Retiro") ? "En Espera en el local" : "En Espera de despachar el envío";

        $sql = "INSERT INTO `compra`(`nombrecompleto`, `ciudad`, `numerodetelefono`, `email`, `metododeenvio`, `direccion`, `metododepago`) 
                VALUES ('$nombreCompleto', '$ciudad', '$numeroDeTelefono', '$email', '$metodoDeEnvio', $direccion, '$metodoDePago')";
        $connection = connection();
        
        try {
            $connection->query($sql);
            $compraId = $connection->insert_id;
            $respuesta = new respuesta(true, "Compra agregada correctamente", null);
        } catch (Exception $e) {
            error_log($e);
            $respuesta = new respuesta(false, "No se pudo agregar la compra", null);
        }

        return $respuesta;
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
