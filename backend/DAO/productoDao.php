<?php

    require_once '../CONEXION/conexion.php';
    require_once __DIR__ . "/respuesta.php";
    require_once __DIR__ . "/Origen.php";
    require_once __DIR__ . "/ImagenDAO.php";

class productos{
 
    public function modificarProducto($nombre, $stock, $precio, $imagen,$id){
    
        if(isset($imagen)){
            $imagenDAO = new ImagenDAO();
            $respuesta = $imagenDAO->agregarImagen($imagen);
            $imagen = $respuesta->datos;
            $sql = "UPDATE `producto` SET `nombre` = '$nombre',`stock` = '$stock',`precio` = '$precio',`idImagen` = '$imagen' WHERE `producto`.`id` = $id;";
        }else{
            $sql = "UPDATE `producto` SET `nombre` = '$nombre',`stock` = '$stock',`precio` = '$precio' WHERE `producto`.`id` = $id;";

        }
        $connection = connection();
        try {
            $connection->query($sql);
            return new respuesta(true, "Producto modificado", null);
        } catch (Exception $e) {
            return new respuesta(false, "Error al modificar el Producto", null);
        }
    }

    public function verproductos($id, $nombre, $stock, $precio, $imagen_url) {
        $sql = "INSERT INTO `producto`(`id`, `stock`, `precio`, `nombre`, `idImagen`) VALUES ('$id', '$nombre', '$stock', '$precio', '$imagen_url')";
        $connection = connection();
        try {
            $connection->query($sql);
            return new respuesta(true, "Producto obtenido", null);
        } catch (Exception $e) {
            return new respuesta(false, "Error al obtener el Producto", null);
        }
    }

    public function obtener():respuesta {
        $sql = "SELECT p.id,p.stock,p.precio,p.nombre,i.id AS idImagen, i.extension FROM `producto` p LEFT JOIN imagen i ON p.idImagen = i.id";
        $connection = connection();
        try {
            $resultado = $connection->query($sql);
            $productos = [];
            while ($row = $resultado->fetch_assoc()) {
                $origen = getOrigen();
                $idImagen = $row["idImagen"];
                $extension = $row["extension"];
                $url = "$origen/backend/imagenes/$idImagen.$extension";
                $productos[] = [
                    "id" => $row["id"],
                    "stock" => $row["stock"],
                    "precio" => $row["precio"],
                    "nombre" => $row["nombre"],
                    "imagen" => isset($idImagen) ? $url : null
                ];
            }
            
            return new respuesta(true, "Productos obtenidos", $productos);
        } catch (Exception $e) {
            return new respuesta(false, "Error al obtener los productos", null);
        }
        
    }
    

    public function eliminarproductos($id){

        $sql = "DELETE FROM producto where id='$id'";
        $connection = connection();
        try{
            $connection->query($sql);
            return new respuesta(true,"Producto eliminado correctamente",null);
        }catch(Exception $e){
            return new respuesta(false,"Error al eliminar el Producto",null);
        }
        

    }


    public function agregarproductos($nombre, $stock, $precio,$imagen) {
        if(isset($imagen)){
            $imagenDAO = new ImagenDAO();
            $respuesta = $imagenDAO->agregarImagen($imagen);
            $imagen = $respuesta->datos;
        }
        $sql = "INSERT INTO `producto` (`id`, `stock`, `precio`, `nombre`, `idImagen`) VALUES (NULL, '$stock', '$precio', '$nombre', $imagen);";
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