<?php

    require_once __DIR__ . '/../conexion/conexion.php';
    require_once __DIR__ . "/respuesta.php";

class ofertas{


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