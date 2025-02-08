<?php

function connection() {
    try {
        $host = 'localhost';
        $usuario = 'root';
        $password = '';
        $bd = 'techpro';
        $puerto = 3306;

        // Crear la conexión
        $mysqli = new mysqli($host, $usuario, $password, $bd, $puerto);

        // Verificar si la conexión fue exitosa
        if ($mysqli->connect_error) {
            throw new Exception("Error en la conexión: " . $mysqli->connect_error);
        }

        return $mysqli;
    } catch (Exception $e) {
        // Manejar el error y mostrarlo de forma amigable
        echo json_encode(["respuesta" => "Error al conectar a la base de datos", "error" => $e->getMessage()]);
        exit; // Terminar la ejecución si ocurre un error
    }
}

?>
