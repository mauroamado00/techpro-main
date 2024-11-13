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

    $isAdmin = $_POST['isadmin'];
    $password = $_POST['password'];
    $nombre = $_POST['nombre'];
    $email = $_POST['email'];
    $apellido = $_POST['apellido'];
    $resultado = (new usuario())->agregarusuario($isAdmin, $password, $nombre, $email,$apellido);
    if($resultado){
        echo json_encode($resultado);
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