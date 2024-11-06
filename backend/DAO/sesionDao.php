<?php

    session_start();
    require_once __DIR__ . '/../conexion/conexion.php';
    require_once __DIR__ . "/respuesta.php";


class SesionDao{

    public $email;
    public $password;

    public function iniciarSesion($email, $password){
        $conection = connection();
        $sql = "SELECT * FROM usuario WHERE email = '$email' AND password = '$password'";
        $respuesta = $conection->query($sql);
        $fila = $respuesta->fetch_assoc();
        if ($fila !=null){
            $respuesta =  new Respuesta(estado: true,mensaje: "Sesion Iniciada", datos: $_SESSION['sesion']);
            $_SESSION['sesion']=["usuario"=>$fila];

                
        }else{
            $respuesta = new Respuesta(estado: false,mensaje: "Error al iniciar", datos: null);
            $_SESSION['sesion']=["usuario"=>$fila];
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