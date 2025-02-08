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
        // Primero, obtenemos la imagen asociada al producto
        $sql = "SELECT id_imagen FROM producto WHERE id = ?";
        $connection = connection();
        
        // Usamos una sentencia preparada para evitar inyección SQL
        if ($stmt = $connection->prepare($sql)) {
            $stmt->bind_param("i", $id); 
            $stmt->execute();
            $stmt->store_result();
            
            if ($stmt->num_rows > 0) {
                $stmt->bind_result($id_imagen);
                $stmt->fetch();
                
                // Si el producto tiene una imagen asociada, la eliminamos del servidor
                if ($id_imagen) {
                    $rutaImagen = 'images/' . $id_imagen . '.jpg';
                    if (file_exists($rutaImagen)) {
                        unlink($rutaImagen); 
                    }
                }
            }
            
            $stmt->close();
        }
    
        // Ahora eliminamos el producto
        $sql = "DELETE FROM producto WHERE id = ?";
        try {
            if ($stmt = $connection->prepare($sql)) {
                $stmt->bind_param("i", $id); // "i" para entero
                $stmt->execute();
                
                if ($stmt->affected_rows > 0) {
                    return new respuesta(true, "Producto eliminado correctamente", null);
                } else {
                    return new respuesta(false, "No se encontró el producto con ese ID", null);
                }
            } else {
                throw new Exception("Error al preparar la consulta de eliminación");
            }
        } catch (Exception $e) {
            return new respuesta(false, "Error al eliminar el Producto: " . $e->getMessage(), null);
        } finally {
            $connection->close(); // Asegúrate de cerrar la conexión
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

    public function buscarproductos($nombre, $precio) {
        $sql = "SELECT * FROM producto WHERE nombre = '$nombre' AND precio = '$precio'";
        $connection = connection();
        $resultado = $connection->query($sql);
        return $resultado ? $resultado->fetch_all(MYSQLI_ASSOC) : [];
    }
}
?>
