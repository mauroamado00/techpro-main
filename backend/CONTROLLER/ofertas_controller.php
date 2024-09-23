<?php

require_once '../DAO/ofertasDao.php';

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


?>