<?php

require_once  __DIR__."/../DAO/ventasDao.php";


// Evaluar la función solicitada
switch ($function) {
    case 'obtener':
        obtenerCompras(); 
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
function obtenerCompras(){
    $nombreCompleto = $_POST['nombrecompleto'];
    $ciudad = $_POST['ciudad'];
    $numeroDeTelefono = $_POST['numerodetelefono'];
    $email = $_POST['email'];
    $metodoDeEnvio = $_POST['metododeenvio'];
    $direccion = $_POST['direccion'];
    $metodoDePago = $_POST['metododepago'];

    $respuesta = (new VentasDao())->obtenerCompras($nombreCompleto, $ciudad, $numeroDeTelefono, $email, $metodoDeEnvio, $direccion, $metodoDePago);
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
