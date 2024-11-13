<?php

require_once '../DAO/ofertasDao.php';
require_once __DIR__ . "/../config/Configuracion.php";

$function = $_GET['function'];


switch($function){

    case 'ver';
    verofertas();
    break;
    case 'modificar';
    modificaroferta();
    break;
    case 'eliminar';
    eliminaroferta();
    break;

    case 'crear';
    crear();
    break;

    case 'obtenerOfertas':
    obtenerOfertas();
    break;

}

function obtenerOfertas(){
    $fecha = $_POST['fecha'];
    $resultado = (new Ofertas())->obtenerOfertas($fecha);
    echo json_encode($resultado);
}

function crear(){
    
        $oferta = $_POST['oferta'];
        $fechainicio = $_POST['fechaInicio'];
        $fechafin = $_POST['fechaFin'];
        $idProducto = $_POST['idProducto'];
        $resultado = (new Ofertas())->crear($oferta, $fechainicio, $fechafin, $idProducto);
        echo json_encode($resultado);
}

    function verofertas(){

        $id = $_POST['id'];
        $oferta = $_POST['oferta'];
        $fechainicio = $_POST['fechainicio'];
        $fechafin = $_POST['fechafin'];
        $resultado = (new ofertas())->verofertas($id, $oferta, $fechainicio, $fechafin);
        echo json_encode($resultado);

    }

    function modificaroferta() {
        
        $id = $_POST['id'];
        $oferta = $_POST['oferta'];
        $fechainicio = $_POST['fechainicio'];
        $fechafin = $_POST['fechafin'];
        $resultado = (new ofertas())->modificaroferta($id, $oferta, $fechainicio, $fechafin);
        echo json_encode($resultado);
    }
    
    function eliminaroferta() {

        $id = $_POST['id'];
        $resultado = (new ofertas())->eliminaroferta($id);
        echo json_encode($resultado);
     

    }

    function obtener() {
        $resultado = (new ofertas())->obtener();
        echo json_encode($resultado);
        
    }


?>