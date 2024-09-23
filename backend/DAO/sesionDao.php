<?php

    session_start();
    require_once __DIR__ . '/../conexion/conexion.php';
    require_once __DIR__ . "/respuesta.php";


class SesionDao{

    public $email;
    public $password;

    public function iniciarSesion($email,$password){
        
      
        $connection = connection();
        $sql = "SELECT * FROM usuario WHERE email='$email'";
        $respuesta = $connection->query($sql);
        $fila = $respuesta->fetch_assoc();
        if($fila != null && password_verify($password,$fila['password'])){

            $respuesta = new respuesta(true,"Sesion Iniciada",null);
            $_SESSION['sesion'] = ['usuario'=>$fila['nombre'],"email"=>$fila['email'],"isadmin"=>$fila['isadmin']==1 ? true:false];
        }else{

            $respuesta = new respuesta(false,"Credenciales Incorrectas", null);
            $_SESSION['sesion'] = null;
        }
        return $respuesta;

    }

    public function obtenerSesion(){

        $respuesta = new respuesta(true,"Sesion Iniciada",null);
        if(isset($_SESSION['sesion'])){

            $respuesta = new respuesta(true,"Sesion obtenida",$_SESSION['sesion']);
        }
        else{

            $respuesta = new respuesta(true,"No se ha encontrado una sesion",null);
        }
        return $respuesta;
    }

    public function cerrarSesion(): void{

        $_SESSION['sesion'] = null;
    }

    public function estaloggeado(): respuesta{

        $respuesta = new respuesta(true,"Sesion Iniciada",null);
        if(isset($_SESSION['sesion'])){

            $respuesta = new respuesta(true,"Sesion obtenida",$_SESSION['sesion']);
        }
        else{

            $respuesta = new respuesta(true,"No se ha encontrado una sesion",null);


        }
        return $respuesta;
    
    }
}   
  
?>