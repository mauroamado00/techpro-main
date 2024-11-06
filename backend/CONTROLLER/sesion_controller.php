<?php

require_once  __DIR__."/../DAO/sesionDao.php";


$function = $_GET['function'];


switch($function){

    case 'iniciarSesion';
    iniciarSesion();
    break;
    case 'obtener';
    obtenersesion();
    break;
    case 'cerrar';
    cerrarSesion();
    break;
    case 'estaloggeado';
    estaloggeado();
    break;

}

    function iniciarSesion(){
        $email = $_POST['email'];
        $password = $_POST['password'];
        $respuesta = (new SesionDao)->iniciarSesion($email,$password);
        echo json_encode($respuesta);
    }

    function obtenerSesion(){

        $respuesta = (new SesionDao)->obtenerSesion();
        echo json_encode($respuesta);
    }


    function cerrarSesion(){
    
        $respuesta = (new SesionDao)->cerrarSesion();
        echo json_encode($respuesta);

    }


    function estaloggeado(){

        $respuesta = (new SesionDao)->estaloggeado();
        echo json_encode($respuesta);

    }

?>