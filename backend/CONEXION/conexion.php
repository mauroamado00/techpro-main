<?php

function connection(){

try { 

    $host = 'localhost';
    $usuario = 'root';
    $password = '';
    $bd = 'techpro';
    $puerto = 3306;
    $mysqli = new mysqli($host,$usuario,$password,$bd,$puerto);
    return $mysqli;
}catch (exception $e){

    $error = $e->getmessage();
    echo $error;
}

}

?>