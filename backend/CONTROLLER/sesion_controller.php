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

    function iniciarsesion(){
        $email = $_POST['email'];
        $contraseña = $_POST['contraseña'];
        $respusta = (new SesionDao)->iniciarsesion($email,$contraseña);
        echo json_encode($respusta);
    }

    function obtenerSesion(){

        $respusta = (new SesionDao)->obtenerSesion();
        echo json_encode($respusta);
    }


    function cerrarSesion(){
    
        $respusta = (new SesionDao)->cerrarSesion();
        echo json_encode($respusta);

    }


    function estaloggeado(){

        $respusta = (new SesionDao)->estaloggeado();
        echo json_encode($respusta);

    }

?>