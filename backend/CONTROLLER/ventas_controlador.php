<?php
require_once __DIR__ . "/../config/config.php";
require_once  __DIR__."/../DAO/ventasDao.php";


// Evaluar la función solicitada
switch ($function) {
    case 'realizarCompra':
        realizarCompra(); 
        break;
    case 'obtenertodas':
        obtenerTodas();
        break;
    case 'obtenercomprasusuario':
        obtenerComprasUsuario();
        break;
    case 'updateCompra':
        actualizarCompra();
        break;
}

// Función para obtener compras
function realizarCompra(){
    $nombreCompleto = $_POST['nombrecompleto'];
    $ciudad = $_POST['ciudad'];
    $numeroDeTelefono = $_POST['numerodetelefono'];
    $email = $_POST['email'];
    $metodoDeEnvio = $_POST['metododeenvio'];
    $direccion = $_POST['direccion'];
    $metodoDePago = $_POST['metododepago'];
    $productos = json_decode($_POST['productos'], true);

    $respuesta = (new VentasDao())->realizarCompra($nombreCompleto, $ciudad, $numeroDeTelefono, $email, $metodoDeEnvio, $direccion, $metodoDePago,$productos);
    echo json_encode($respuesta);
}   

function obtenerTodas(): void{
    $respuesta = (new ventasDao())->obtenerTodas();
    echo json_encode($respuesta);
}

function obtenerComprasUsuario(){
    $respuesta = (new ventasDao())->obtenercomprasusuario();
    echo json_encode($respuesta);
}


function actualizarCompra(){
    $id = $_POST['id'];
    $metodoDeEnvio = $_POST['metododeenvio'];
    $direccion = $_POST['direccion'];
    $metodoDePago = $_POST['metododepago'];
    $nombreCompleto = $_POST['nombrecompleto'];
    $ciudad = $_POST['ciudad'];
    $numeroDeTelefono = $_POST['numerodetelefono'];
    $email = $_POST['email'];

    $respuesta = (new ventasDao())->actualizarCompra($id, $metodoDeEnvio, $direccion, $metodoDePago, $nombreCompleto, $ciudad, $numeroDeTelefono, $email);
    echo json_encode($respuesta);
}

?>
