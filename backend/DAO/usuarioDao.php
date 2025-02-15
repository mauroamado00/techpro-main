<?php

require_once __DIR__ . '/../CONEXION/conexion.php';
require_once __DIR__ . '/../DAO/respuesta.php';
    

class usuario{


    public function agregarusuario($isAdmin, $password, $nombre, $email, $apellido){
        
        $hash= $password;
        $hashedPassword = password_hash($hash, PASSWORD_BCRYPT);
        $sql = "INSERT INTO usuario (isAdmin, password, nombre, email, apellido) VALUES ($isAdmin, '$hashedPassword', '$nombre', '$email', '$apellido')";
        $connection = connection();
        try{
            $connection->query($sql);
            return new respuesta(true,"Usuario agregado",datos: null);
        }catch(Exception $e){
            return new respuesta(false,"Error al agregar el usuario",null);
        }
          
    }

    public function eliminarusuario($email){

        $sql = "DELETE FROM usuario where email='$email'";
        $connection = connection();
        try{
            $connection->query($sql);
            return new respuesta(true,"Usuario eliminado",null);
        }catch(Exception $e){
            return new respuesta(false,"Error al eliminar el usuario",null);
        }

    }


    public function obtenerusuario() {
        $connection = connection();
        $sql = 'SELECT * FROM usuario';
        $resultado = $connection->query($sql);
        if ($resultado) {
            return $resultado->fetch_all(MYSQLI_ASSOC);
        } else {
            return false; 
        }
    }

    public function modificarusuario($nombre, $apellido, $email, $password){

        $sql = "UPDATE `usuario` SET `nombre`='$nombre',`apellido`='$apellido',`email`='$email',`password`='$password' WHERE `email`='$email'";
        $connection = connection();
        try{
            $connection->query($sql);
            return new respuesta(true,"Usuario modificado",null);
        }catch(Exception $e){
            return new respuesta(false,"Error al modificar el usuario",null);
        }

    }

}
  
?>