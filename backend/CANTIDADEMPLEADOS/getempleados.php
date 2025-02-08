<?php

header('Content-Type: application/json');

$servername = "localhost"; // o la IP de tu servidor
$username = "root";
$password = "";
$dbname = "techpro";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}


// Consulta para obtener todos los empleados
$sql = "SELECT * FROM employees";
$result = $conn->query($sql);

// Verificar si la consulta fue exitosa
if ($result === false) {
    die("Error en la consulta: " . $conn->error);
}

// Array para almacenar los empleados
$employees = [];

// Si hay resultados, agregarlos al array
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $employees[] = $row;
    }
}

// Configurar el encabezado para devolver una respuesta en formato JSON
header('Content-Type: application/json');

// Devolver los empleados en formato JSON
echo json_encode($employees);

// Cerrar la conexión a la base de datos
$conn->close();
?>
