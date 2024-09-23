<?php

require_once  __DIR__."/../DAO/usuarioDao.php";


$function = $_GET['function'];


switch($function){

    case 'agregar';
    agregarusuario();
    break;
    case 'eliminar';
    eliminarusuario();
    break;
    case 'obtener';
    obtenerusuario();
    break;
    case 'modificar';
    modificarusuario();
    break;

}

    function agregarusuario(){

    $nombre = $_POST['nombre'];
    $apellido = $_POST['apellido'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $resultado = (new usuario())->agregarusuario($nombre, $apellido, $email, $password);
    if($resultado){
        echo "Usuario registrado";
    }else{
        echo 'Hubo un error al registrar el usuario';
    }

    }

    function eliminarusuario() {

        $email = $_POST['email'];
        $resultado = (new usuario())->eliminarusuario($email);
        if($resultado){
            echo "Usuario eliminado";
        }else{
            echo 'hubo un error al eliminar el usuario';
        }
        
    }
    
    function obtenerusuario() {

        $resultado = (new usuario())->obtenerusuario();
        if($resultado){
            echo "Usuario obtenido";
        }else{
            echo 'hubo un error al obtener el usuario';
        }
    }
    
    function modificarusuario() {

        $nombre = $_POST['nombre'];
        $apellido = $_POST['apellido'];
        $email = $_POST['email'];
        $password = $_POST['password'];
        $resultado = (new usuario())->modificarusuario($nombre, $apellido, $email, $password);
        if($resultado){
            echo "Usuario modificado";
        }else{
            echo 'hubo un error al modificar el usuario';
        }
    }





?>