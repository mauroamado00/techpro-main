<?php

    require_once __DIR__ . '/../conexion/conexion.php';
    require_once __DIR__ . "/respuesta.php";
    require_once __DIR__ . "/Origen.php";


class Ofertas{

    public function verofertas($id,$oferta, $fechainicio, $fechafin){

        $sql = "INSERT INTO oferta(id,oferta,fechainicio,fechafin) VALUES ('$id, $oferta','$fechainicio', '$fechafin')";
        $connection = connection();
        try{
            $connection->query($sql);
            return new respuesta(true,"Ofertas obtenidas",null);
        }catch(Exception $e){
            return new respuesta(false,"Error al Obtener las Ofertas",null);
        }
    }

    public function crear($oferta, $fechainicio, $fechafin, $idProducto) {

            $sql = "INSERT INTO `oferta` (`id`, `oferta`, `fechaInicio`, `fechaFin`, `idProducto`) VALUES (NULL, '$oferta', '$fechainicio', '$fechafin', '$idProducto');";
            $connection = connection();
            try{
                $connection->query($sql);
                return new respuesta(true,"Ofertas Creadas",null);
            }catch(Exception $e){
                return new respuesta(false,"Error al Crear las Ofertas",null);
            }
    }

    public function obtenerOfertas($fecha){
        error_log("fecha: $fecha");
        $sql = "SELECT o.oferta,p.* FROM `oferta` o LEFT JOIN producto p ON o.idProducto = p.id WHERE o.fechaInicio <= '$fecha' AND o.fechaFin >= '$fecha'";
        error_log($sql);
        $connection = connection();
        try{
            $result = $connection->query($sql);
            $productos = [];
            while ($row = $result->fetch_assoc()) {
                $origen = getOrigen();
                $idImagen = $row["idImagen"];
                $extension = $row["extension"];
                $url = "$origen/backend/imagenes/$idImagen.$extension";
                $productos[] = [
                    "id" => $row["id"],
                    "stock" => $row["stock"],
                    "precio" => $row["precio"],
                    "nombre" => $row["nombre"],
                    "imagen" => isset($idImagen) ? $url : null,
                    "oferta" => $row["oferta"]
                ];
            }
            return new respuesta(true,"Ofertas obtenidas",$productos);
        }catch(Exception $e){
            return new respuesta(false,"Error al Obtener las Ofertas",null);
        }

    }


    public function modificaroferta($id, $oferta, $fechainicio, $fechafin){

        $sql = "UPDATE `oferta` SET `id`='$id',`oferta`='$oferta',`fechainicio`='$fechainicio',`fechafin`='$fechafin' WHERE `oferta`. `id` = $id;";
        $connection = connection();
        try{
            $connection->query($sql);
            return new respuesta(true,"Ofertas Modficiadas",null);
        }catch(Exception $e){
            return new respuesta(false,"Error al Modificar las Ofertas",null);
        }


    }

     
    public function eliminaroferta($id){

        $sql = "DELETE FROM oferta where id='$id'";
        $connection = connection();
        try{
            $connection->query($sql);
            return new respuesta(true,"Ofertas eliminadas correctamente",null);
        }catch(Exception $e){
            return new respuesta(false,"Error al eliminar las Ofertas",null);
        }
    }

}


?>