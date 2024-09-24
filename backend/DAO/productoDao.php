<?php

    require_once '../CONEXION/conexion.php';
    require_once __DIR__ . "/respuesta.php";

class productos{


    public function verproductos($id, $nombre, $stock, $precio, $imagen_url) {
        $sql = "INSERT INTO producto (id, nombre, stock, precio, imagen_url) VALUES ('$id', '$nombre', '$stock', '$precio', '$imagen_url')";
        $connection = connection();
        try {
            $connection->query($sql);
            return new respuesta(true, "Producto obtenido", null);
        } catch (Exception $e) {
            return new respuesta(false, "Error al obtener el Producto", null);
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


    public function agregarproductos($id, $nombre, $stock, $precio) {
        $sql = "INSERT INTO producto (id, nombre, stock, precio) VALUES ('$id', '$nombre', '$stock', '$precio')";
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