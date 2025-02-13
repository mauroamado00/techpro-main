<?php

require_once '../CONEXION/conexion.php';
require_once __DIR__ . "/respuesta.php";
require_once __DIR__ . "/Origen.php";
require_once __DIR__ . "/ImagenDAO.php";

class productos {

    public function modificarProducto($nombre, $precio, $stock, $imagen, $id) {
        if (isset($imagen)) {
            $imagenDAO = new ImagenDAO();
            $respuesta = $imagenDAO->agregarImagen($imagen);
            $imagen = $respuesta->datos;
            $sql = "UPDATE `producto` SET `nombre` = '$nombre', `precio` = '$precio', `stock` = '$stock', `idImagen` = '$imagen' WHERE `producto`.`id` = $id;";
        } else {
            $sql = "UPDATE `producto` SET `nombre` = '$nombre', `precio` = '$precio', `stock` = '$stock' WHERE `producto`.`id` = $id;";
        }
        $connection = connection();
        try {
            $connection->query($sql);
            return new respuesta(true, "Producto modificado", null);
        } catch (Exception $e) {
            return new respuesta(false, "Error al modificar el Producto", null);
        }
    }

    public function verproductos($id, $nombre, $precio, $stock, $imagen_url) {
        $sql = "INSERT INTO `producto`(`id`, `precio`, `stock`, `nombre`, `idImagen`) VALUES ('$id', '$nombre', '$precio', '$stock', '$imagen_url')";
        $connection = connection();
        try {
            $connection->query($sql);
            return new respuesta(true, "Producto obtenido", null);
        } catch (Exception $e) {
            return new respuesta(false, "Error al obtener el Producto", null);
        }
    }

    public function obtener(): respuesta {
        $sql = "SELECT p.id, p.precio, p.stock, p.nombre, i.id AS idImagen, i.extension 
                FROM `producto` p LEFT JOIN imagen i ON p.idImagen = i.id";
        $connection = connection();
        try {
            $resultado = $connection->query($sql);
            
            // Verifica si la consulta falló
            if ($resultado === false) {
                throw new Exception("Error en la consulta SQL: " . $connection->error);
            }
    
            $productos = [];
            while ($row = $resultado->fetch_assoc()) {
                $origen = getOrigen();
                $idImagen = $row["idImagen"];
                $extension = $row["extension"];
                $url = isset($idImagen) && isset($extension) ? "$origen/backend/imagenes/$idImagen.$extension" : null;
                $productos[] = [
                    "id" => $row["id"],
                    "precio" => $row["precio"],  // Asegúrate de que este valor sea el correcto
                    "stock" => $row["stock"],  // Asegúrate de que este valor sea el correcto
                    "nombre" => $row["nombre"],  // Asegúrate de que este valor sea el correcto
                    "imagen" => $url
                ];
            }
    
            return new respuesta(true, "Productos obtenidos", $productos);
        } catch (Exception $e) {
            return new respuesta(false, "Error al obtener los productos: " . $e->getMessage(), null);
        }
    }
    
    public function eliminarproductos($id) {
        $sql = "DELETE FROM producto where id='$id'";
        $connection = connection();
        try {
            $connection->query($sql);
            return new respuesta(true, "Producto eliminado correctamente", null);
        } catch (Exception $e) {
            return new respuesta(false, "Error al eliminar el Producto", null);
        }
    }
    

    public function agregarproductos($nombre, $stock, $precio, $imagen) {
        if (isset($imagen)) {
            $imagenDAO = new ImagenDAO();
            $respuesta = $imagenDAO->agregarImagen($imagen); // $imagen debería ser el archivo de imagen
            if ($respuesta->estado) {
                $idImagen = $respuesta->datos;
            } else {
                return new respuesta(false, "Error al agregar la imagen", null);
            }
        } else {
            $idImagen = "NULL"; // Si no se proporciona imagen, asignamos NULL
        }
    
        // Insertar el producto en la base de datos, sin la columna 'descripcion'
        $sql = "INSERT INTO `producto` (`precio`, `stock`, `nombre`, `idImagen`) 
                VALUES ('$stock', '$precio', '$nombre', $idImagen);";
        $connection = connection();
        
        try {
            $connection->query($sql);
            return new respuesta(true, "Producto agregado", null);
        } catch (Exception $e) {
            return new respuesta(false, "Error al agregar el Producto", null);
        }
    }

    public function buscarProductos($nombre) {
        try {
            $sql = "SELECT * FROM producto WHERE nombre LIKE :nombre";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindValue(":nombre", "%" . $nombre . "%", PDO::PARAM_STR);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            error_log("Error al buscar productos: " . $e->getMessage());
            return [];
        }
    }
    
    
}
?>
